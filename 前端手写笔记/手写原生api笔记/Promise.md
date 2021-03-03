# Promise

### 一、架构

```javascript
function MyPromise(callback) {
	let self = this
	self.status = 'pending'
	self.data = null
	self.onResolvedCallback = []
	sele.onRejectedCallback = []
	callback(resolve, reject)
	
	function resolve(value) {
		if(this.status === 'pending') {
		
		}
	}
	
	function reject(error) {
		if(this.status === 'pending') {
		
		}
	}
}
MyPromise.prototype.then = function(onResolved, onRejected) {

}
MyPromise.prototype.catch = function(onRejected) {
	this.then(null, onRejected)
}
```

### 二、思想

2.1 自身

1. 简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果

2. 状态变化 ,只有两种状态变化，只能从'pending' ->'fulfilled'或'pending'->'rejected',且状态一旦改变，就不逆

3. 每个promise都有自己的状态以及data（error），加两个状态改变函数

2.2 原型上的then方法

1. 接收两个参数，一个成功的回调，一个失败的回调（必须是函数）

   ```
   MyPromise.prototype.then = function(onResolved, onRejected) {
   	let self = this
   	
   	//保证都是函数,其第一个参数是self.data, 即resolve或reject传过来的值
   	//当还处于pending状态时不能被调用，且至多调用一次
   	onResolved = onResolved instanceof Function? onResolved: function(value) {}
   	onRejected = onRejected instanceof Function? onRejected: function(error) {}
   } 
   ```

2. 返回值是一个promise对象，如果不是，就封装一个,如果出现异常，

   ```javascript
   if(self.status === 'resolve') {
       return new Promise(funciton(resolve, reject) {
              try {
               //判断用户是不是自己返回了promise对象
               let x = onResolved(self.data)
       		if(x instanceof MyPromise) {
   				x.then(resolve, reject)
               }
       		resolve(x)
              } catch(e) {
               reject(e)        
              }        
       })
   }
   ```
   
3. 如果状态处于'pending',就把执行函数添加到callback里面

### 三、实现

```javascript
function MyPromise(fn) {
  const self = this;
  self.status = "pending";
  self.data = null;
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];
  fn(resolve, reject);

  // 成功的回调
  function resolve(value) {
    if (self.status === "pending") {
      self.data = value;
      self.status = "resolved";
      setTimeout(function () {
        for (const eachCallback of self.onResolvedCallback) {
          eachCallback(value);
        }
      });
    }
  }

  // 拒绝的回调
  function reject(error) {
    if (self.status === "pending") {
      self.status = "rejected";
      self.data = error;
      setTimeout(function () {
        for (const eachCallback of self.onRejectedCallback) {
          eachCallback(error);
        }
      });
    }
  }
}

// MyPromise的then方法

MyPromise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  // 传入的回调不是函数，默认忽略
  onResolved = onResolved instanceof Function ? onResolved : function () {};
  onRejected = onRejected instanceof Function ? onRejected : function () {};

  // 状态为resolved的回调
  if (self.status === "resolved") {
    return new MyPromise(function (resolve, reject) {
      try {
        const ret = onResolved(self.data);
        if (ret instanceof MyPromise) {
          ret.then(resolve, reject);
        } else {
          resolve(ret);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  // 状态为rejected的回调
  if (self.status === "rejected") {
    return new MyPromise(function (resolve, reject) {
      try {
        const ret = onRejected(self.data);
        if (ret instanceof MyPromise) {
          ret.then(resolve, reject);
        } else {
          resolve(ret);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  if (self.status === "pending") {
    return new MyPromise(function (resolve, reject) {
      // 保存成功的回调
      self.onResolvedCallback.push(function (value) {
        try {
          const ret = onResolved(self.data);
          if (ret instanceof MyPromise) {
            ret.then(resolve, reject);
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      });

      //保存失败的回调
      self.onRejectedCallback.push(function (error) {
        try {
          const ret = onRejected(self.data);
          if (ret instanceof MyPromise) {
            ret.resolve(resolve, reject);
          } else {
            resolve(ret);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  }
};


MyPromise.prototype.catch = function (onRejected) {
  this.then(null, onRejected);
};

```

### 四、Promise.all方法实现

一、思想

实现一个函数，返回一个promsie，在promise内部形成一个计数，计值的闭包，然后把每一项都执行了

二、代码：

```javascript
funciton PromiseAll(promises) {
	if(!Array.isArray(promises)) {
		throw new Error('not a array')
	}
    return new Promise((resolve, reject) => {
		let count = 0
        let res = []
        for(let i = 0;i < promises.length;i++) {
            Promise.resolve(promises[i]).then((data) => {
				count++
                res.push(data)
                if(count === promises.length) {
					resolve(res)	
                }
            }, err => {
				reject(err)
            })
        }
    })
}
```

### 五、Promise.race 的实现

一、思想：

实现一个函数，返回一个promise，在promise内部返回第一个成功的

二、代码：

```
function PromiseRace(promises) {
	if(!Array.isArray(promises)) {
		throw Error('in not a array')
	}
	for(let i = 0;i < promises.length;i++) {
		Promise.resolve(promise[i]).then(data => {
			resolve(data)
		}, err => {
			reject(err)
		})
	}
}
```

### 六、Promise.resolve()

一、思想：

如果输入不是Promise 转换为promise，否则直接返回

二、代码：

```javascript
function PromiseResolve(target) {
	if(target instanceof Promise) {
		return target
    }
    return new Promise((resolve, reject) {
    	resolve(target)                   
    })
}
```





### 七、总结

1. 创建原函数，初始化状态包括:data、status、onResolvedCallback、onRekectedCallback、执行fn
2. 完成状态转换函数resolve、reject
3. 写then方法
4. then方法传入传输判断
5. then方法根据不同状态返回promise，如果是pending，将回调保存到对应callback中



   

   
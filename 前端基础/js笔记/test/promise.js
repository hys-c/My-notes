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

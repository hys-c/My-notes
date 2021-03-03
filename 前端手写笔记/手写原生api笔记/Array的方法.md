### 1. Array.map

```js
Array.prototype._map = function(fn) {
    const res = []
    for(let i = 0;i < this.length;i++) {
        res.push(fn(this[i], i, this))
    }
    return res
}
```

### 2. Array.fill

   ```
Array.prototype._fill = function(value, begin, end) {
	const len = this.length
	begin = begin === undefined ? 0 : begin
	end = end === undefined ? len : end
    for(let i = begin; i < end;i++) {
		this[i] = value
	}
	return this
}
   ```

### 3. Array.reduce

```
Array.prototype._reduce = function(fn, initVal) {
	let res = initVal === undefined ? this[0] : initVal
	for(let i = res === this[0] ? 1 ： 0;i < this.length;i++) {
		res = fn(res, this[i], this)
	}
	return res
}
```

### 4. Array.filter

```
Array.prototype._filter = function(fn, thisVal) {
	let resArr = []
	for(let i = 0;i < this.length;i++) {
		if(fn.call(thisVal, this[i], i, this)) {
			resArr.push(this[i])
		}
	}
	return resArr
}
```

### 5.Arrat.find

```
Array.prototype._find = function(fn, thisVal) {
	for(let i = 0;i < this.length;i++) {
		if(fn.call(thisVal, this[i], i, this)) {
			return this[i]
		}
	}
}
```

### 6. Array.findIndex

```
Array.prototype._findIndex = function(fn, thisVal) {
	for(let i = 0;i < this.length;i++) {
		if(fn.call(thisVal, this[i], i, this)) {
			return i
		}
	}
}
```


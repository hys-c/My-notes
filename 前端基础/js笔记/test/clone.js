function shadowClone(target) {
    let cloneTarget = {}
    for(let i in target) {
        if(target.hasOwnProperty(i)) {
            cloneTarget[i] = target[i]
        }
    }
    return cloneTarget
}

function deepClone(target, map = new WeakMap()) {
    if(target instanceof Function) {
        return target
    }
    if(target instanceof RegExp) {
        return target
    }
    if(target instanceof Object) {
        let cloneTarget = Array.isArray(target)?[]:{}
        if(map.get(target)) {
            return map.target
        }
        map.set(target, cloneTarget)
        for(let i in target) {
            if(target.hasOwnProperty(i)) {
                cloneTarget[i] = deepClone(target[i], map)
            }
        }
        return cloneTarget
    } else {
        return target
    }
}

function clone(target) {
    if(target instanceof Object) {
        let cloneTarget = Array.isArray(target)? []: {}
        for(let i in target) {
            if(target.hasOwnProperty(i)) {
                cloneTarget[i] = clone(target[i])
            }
        }
        return cloneTarget
    } else {
        return target
    }
}
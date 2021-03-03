function throttle(fn, wait) {
  let pre = Date.now();
  return function () {
    let now = Date.now();
    if (now - pre > wait) {
      fn.call(this, arguments);
      pre = Date.now();
    }
  };
}

function time_throttle(fn, wait) {
  let timer = null;
  return function () {
    if (!timer) {
      let args = arguments;
      timer = setTimeout(() => {
        fn.call(this, args);
        timer = null;
      }, wait);
    }
  };
}

function final_throttle(fn, wait) {
  let timer = null;
  let pre = Date.now();
  return function () {
    let args = [].slice.call(arguments);
    let curTimer = Date.now();
    let remainTime = wait - (curTimer - pre);
    if (remainTime < 0) {
      fn.apply(this, args);
    } else {
      if (!timer) {
        setTimeout(() => {
          fn.call(this, args);
          tiemr = null;
        }, wait);
      }
    }
  };
}

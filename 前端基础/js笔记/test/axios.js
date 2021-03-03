const ajax = ({
  url,
  data = {},
  method = 'get', // 默认为'get'请求
  header,
  async = true, // 默认为异步请求
  timeout = 60 * 1000, //默认60s
}) => {
  return new Promise((resolve, reject) => {
      const requestURL = method === 'get' ? this.addURL(url, data) : url;
      const sendData = method === 'get' ? null : data;
      const xhr = new XMLHttpRequest();
      if(header && Object.keys(header).length) {
          Object.keys(header).map(key => {
             xhr.setRequestHeader(key, header[key]);
          })
      }
      xhr.onreadystatechange = () => {
          if(xhr.readyState === 4) {
              try {
                  if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                     const response = xhr.responseText;
                     resolve(response);
                  } else {
                     const error = xhr.status + xhr.statusText;
                     reject(error);
                  }
              } catch (ex) {
                  // 
              }
          }
      }
      xhr.open(method, requestURL, async);
      xhr.timeout = timeout;
      xhr.ontimeout = () => {
          console.log('timeout');
      }
      xhr.send(sendData);
  })
}
// 拼接url
addURL = (url, param) => {
  if(param && Object.keys(param).length) {
      url += (url.indexOf('?') === -1 ? '?' : '&');
      Object.keys(param).map(key => {
          url += encodeURIComponent(key) + '=' + encodeURIComponent(param[key])
      })
  }
  return url;
}
// get请求
ajax.get = (url, data) => {
  return ajax({
      url,
      data,
  })
}
// post请求
ajax.post = (url, data) => {
  return ajax({
      url,
      data,
      method = 'post',
  })
}
# XMLHttpRequest封装

```
function axios(method, url, data) {
  return new Promise(function (resolve, reject) {
    const requestURL = method === "get" ? this.addURL(url, data) : url;
    const sendData = method === "get" ? null : data;
    xhr = new XMLHttpRequest();
        xhr.onreadystatechange(() => {
      if (xhr.readyState === 4) {
        try {
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            resolve(xhr.responseText);
          } else {
            resolve(xhr.status + xhr.statusText);
          }
        } catch (error) {
          reject();
        }
      }
    });
    xhr.open(method, requestURL, true);
    xhr.timeout = timeout;
    xhr.ontimeout = () => {
      console.log("timeout");
    };
    xhr.send(sendData);
  });
}
function addURL(url, params) {
  if (params && Object.keys(params).length) {
    url += "?";
    Object.keys(params).forEach((element) => {
      url +=
        encodeURIComponent(element) + "=" + encodeURIComponent(params[element]);
    });
  }
}
```

思路

1. 根据请求参数，确定requestURL和sendData

1. 创建一个xhr对象，然后监听onreadystatechange
2. 当xhr.readyState === 4时，说明消息完全返回了
3. 判断状态码xhr.status 是否在200-300之间或者为304，如果未则resolve（xhr.responseText）
4. 否则返回resolve(xhr.status + xhr.statusText)
5. xhr.open(method, url, async)
6. xhr.timeout
7. xhr.send(sendData)
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

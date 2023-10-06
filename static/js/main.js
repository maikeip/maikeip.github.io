// 获取链接字段
function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null)
    return unescape(r[2]);
  return null; // 返回参数值
}

// 生成 uuid
function generateUUID() {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
  return uuid;
}

function changeHref(url, arg, val) {
  var pattern = arg + '=([^&]*)';
  var replaceText = arg + '=' + val;
  return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'),
      replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' +
      replaceText);
}

// 获取cookie值
function getCookie(name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

// 设置cookie值
function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';expires=' +
      exp.toGMTString();
}

// 删除cookie（将cookie设置过期即可）
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

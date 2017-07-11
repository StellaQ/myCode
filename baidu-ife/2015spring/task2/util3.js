// 5. BOM
// 5.1 任务描述
// 实现以下函数

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var ua = navigator.userAgent.toLowerCase();
    var ie = ua.match(/rv:([\d.]+)/) || ua.match(/msie([\d.]+)/) ;
    if (ie) {
        return ie[1];
    } else {
        return -1;
    };
};

// 设置cookie
function setCookie (cookieName, cookieValue, expiredays) {
    var cookie = encodeURIComponent(cookieName) + '=' + encodeURIComponent(cookieValue);
    if (expiredays instanceof Number) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        cookie += '; expires=' + exdate.toGMTString();
    }
    document.cookie = cookie;
};

// 获取cookie值
function getCookie (cookieName) {
    var cookie = {};
    var arrCookie = document.cookie.split('; ');
    for (var i = 0; i < arrCookie.length; i++) {
        var index = arrCookie[i].indexOf('=');
        var name = arrCookie[i].substr(0, index);
        var value = arrCookie[i].substr(index+1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    };
    return cookie.cookieName;
};

// 6. Ajax
// 6.1 任务描述
// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：

function ajax(url, options) {
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            options.onsuccess(xhr.responseText, xhr);
        else {
            options.onfail(xhr.responseText, xhr);
        };
    };

    var type = options.type ? options.type.toUpperCase() : 'GET';
    var data = options.data ? options.data : {};
    var params = '';
    for (key in data) {
        params += encodeURIComponent(key) + '=' + encodeURIComponent(data.key) + '&';
    };
    params = params.slice(0, -1);

    if (type == 'GET') {
        url += '?' + params;
        xhr.open(type, url, true);
        xhr.send(null);
    } else if (type == 'POST') {
        xhr.open(type, url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    };
}

// 使用示例：
// ajax(
//     'http://localhost:8080/server/ajaxtest',
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );

// options是一个对象，里面可以包括的参数为：
// type: post或者get，可以有一个默认值
// data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
// onsuccess: 成功时的调用函数
// onfail: 失败时的调用函数



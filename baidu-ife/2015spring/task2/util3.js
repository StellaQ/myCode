// 5. BOM
// 5.1 任务描述
// 实现以下函数

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
}

// 设置cookie
function setCookie (cookieName, cookieValue, expiredays) {
}

// 获取cookie值
function getCookie (cookieName) {
}

//移除cookie
function removeCookie(cookieName) {
}

// 6. Ajax
// 6.1 任务描述
// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：

function ajax(url, options) {

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



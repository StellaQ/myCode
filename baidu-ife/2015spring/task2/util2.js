// 3. DOM
// 先来一些简单的，在你的util.js中完成以下任务：

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (Object.prototype.toString.call(newClassName) !== '[object String]') {
        console.log('newClassName must be a string');
        return;
    };
    if (newClassName.split(' ').length > 1) {
        console.log('spaces cannot exits in newClassName');
        return;
    };
    var elementClassName = element.className;
    var arrClassName = elementClassName.split(' ');
    if (arrClassName.length > 0) {
        for (var i = 0; i < arrClassName.length; i++) {
            if (arrClassName[i] == newClassName) {
                console.log('newClassName is repeated with oldClassName');
                return;
            };
        };
    };
    elementClassName += ' ' + newClassName;
    return element.className = elementClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (Object.prototype.toString.call(oldClassName) !== '[object String]') {
        console.log('oldClassName must be a string');
        return;
    };
    if (oldClassName.split(' ').length > 1) {
        console.log('spaces cannot exits in oldClassName');
        return;
    };
    var elementClassName = element.className;
    var arrClassName = elementClassName.split(' ');
    var strClassName = '';
    if (arrClassName.length > 0) {
        for (var i = 0; i < arrClassName.length; i++) {
            if (arrClassName[i] !== oldClassName) {
                if (i < arrClassName.length-1) {
                    strClassName += arrClassName[i] + ' '
                } else {
                    strClassName += arrClassName[i]
                };
            };
        };
    };
    return element.className = strClassName;
};
var dom1 = document.getElementById('dom1');
// addClass(dom1, '1233');
// removeClass(dom1, '789');

// dom1.classList.add('222');  //h5
// dom1.classList.remove('123'); //h5

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    if (element.parentNode == siblingNode.parentNode) {
        return true;
    } else {
        return false;
    };
};

var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
// console.log(isSiblingNode(p1, p2));

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var actualLeft = element.offsetLeft;
    var actualTop = element.offsetTop;
    var current = element.offsetParent;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        actualTop += current.offsetTop;
        current = current.offsetParent;
    };

    return {left: actualLeft, top: actualTop};
}

// console.log(getPosition(p1));
// console.log(getPosition(p2));

// 接下来挑战一个mini $，它和之前的$是不兼容的，
// 它应该是document.querySelector的功能子集，
// 在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

// 实现一个简单的Query
function $(selector) {
}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象



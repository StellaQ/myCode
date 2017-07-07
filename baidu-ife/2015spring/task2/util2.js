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
function $(selector, parent) {
    parent = parent ? parent : document;
    var arrSelector = selector.split(' ');
    if (arrSelector.length == 1) {
        var obj;
        switch (selector.substr(0,1)) {
            case '#':  // id
                console.log('id');
                obj = parent.getElementById(selector.substr(1));
                break;
            case '.':  // class
                console.log('class');
                obj = parent.getElementsByClassName(selector.substr(1))[0];
                break;
            case '[':  // attribute
                if (selector.substr(-1, 1) == ']') {
                    if (selector.indexOf('=') == -1) {  // [data-time]
                        console.log('attribute');
                        var allChildren = parent.getElementsByTagName('*');
                        var key = selector.slice(1,-1);
                        for (var i = 0; i < allChildren.length; i++) {
                            if (allChildren[i].getAttribute(key)) {
                                obj = allChildren[i];
                                break;
                            };
                        };
                    } else {  // [data-time=2015]
                        console.log('attribute=value');
                        obj = [];
                        var key = selector.slice(1,-1).split('=')[0];
                        var value = selector.slice(1,-1).split('=')[1];
                        var allChildren = parent.getElementsByTagName('*');
                        for (var i = 0; i < allChildren.length; i++) {
                            if (allChildren[i].getAttribute(key) == value) {
                                obj = allChildren[i];
                                break;
                            };
                        };
                    }
                } else {  // [data-time
                    console.log('wrong pattern');
                    obj = null;
                }
                break;
            default:   // tagName
                console.log('get by tagname');
                obj = parent.getElementsByTagName(selector)[0];
        };
        return obj;
    } else {
        var indexSpace = selector.indexOf(' ');
        parent = $(arrSelector[0]);
        selector = selector.substr(indexSpace+1);
        return $(selector, parent);
    }
}

// 可以通过id获取DOM对象，通过#标示，例如
// console.log($('#dom1'));

// 可以通过tagName获取DOM对象，例如
// console.log($('p'));

// 可以通过样式名称获取DOM对象，例如
// console.log($('.123'));

// 可以通过attribute匹配获取DOM对象，例如
// console.log($('[id]'));
// console.log($('[id=dom1]'));

// 可以通过简单的组合提高查询便利性，例如
// console.log($('#dom1 [id=p1]'));
// console.log($('div [id]'));

// 4. 事件
// 4.1 任务描述

// 我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，
// 还是在你的util.js，实现以下函数

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    // your implement
}

// 例如：
function clicklistener(event) {

}
// addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    // your implement
}

// 接下来我们实现一些方便的事件方法

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    // your implement
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    // your implement
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法

// addEvent(element, event, listener) -> $.on(element, event, listener);
// removeEvent(element, event, listener) -> $.un(element, event, listener);
// addClickEvent(element, listener) -> $.click(element, listener);
// addEnterEvent(element, listener) -> $.enter(element, listener);
// 接下来考虑这样一个场景，我们需要对一个列表里所有的<li>增加点击事件的监听

// 最笨的方法
// <ul id="list">
//     <li id="item1">Simon</li>
//     <li id="item2">Kenner</li>
//     <li id="item3">Erik</li>
// </ul>
// function clickListener(event) {
//     console.log(event);
// }

// $.click($("#item1"), clickListener);
// $.click($("#item2"), clickListener);
// $.click($("#item3"), clickListener);
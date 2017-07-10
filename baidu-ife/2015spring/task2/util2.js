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
                // console.log('id');
                obj = parent.getElementById(selector.substr(1));
                break;
            case '.':  // class
                // console.log('class');
                obj = parent.getElementsByClassName(selector.substr(1))[0];
                break;
            case '[':  // attribute
                if (selector.substr(-1, 1) == ']') {
                    if (selector.indexOf('=') == -1) {  // [data-time]
                        // console.log('attribute');
                        var allChildren = parent.getElementsByTagName('*');
                        var key = selector.slice(1,-1);
                        for (var i = 0; i < allChildren.length; i++) {
                            if (allChildren[i].getAttribute(key)) {
                                obj = allChildren[i];
                                break;
                            };
                        };
                    } else {  // [data-time=2015]
                        // console.log('attribute=value');
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
                    // console.log('wrong pattern');
                    obj = null;
                }
                break;
            default:   // tagName
                // console.log('get by tagname');
                obj = parent.getElementsByTagName(selector)[0];
        };
        return obj;
    } else {
        var indexSpace = selector.indexOf(' ');
        parent = $(arrSelector[0]);
        selector = selector.substr(indexSpace+1);
        // return $(selector, parent);
        return arguments.callee(selector, parent);
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
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener);
    } else {
        element['on'+event] = listener;
    };
};
// function clickListener(event) {
//     console.log('dddd');
// };
// addEvent($('#dom1'), 'click', clickListener);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    } else if (element.detachEvent) {
        element.detachEvent('on'+type, handler);
    } else {
        element['on'+type] = null;
    };
};
// removeEvent($('#dom1'), 'click', clickListener);

// 接下来我们实现一些方便的事件方法
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
};
// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function(event){
        if (event.keyCode == 13) {
            listener();
        };
    });
};
// function enterListener () {
//     console.log('999');
// };
// addEnterEvent($('#text1'), enterListener);

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
// addEvent(element, event, listener) -> $.on(element, event, listener);
// removeEvent(element, event, listener) -> $.un(element, event, listener);
// addClickEvent(element, listener) -> $.click(element, listener);
// addEnterEvent(element, listener) -> $.enter(element, listener);

$.on = function (element, event, listener) {
    addEvent(element, event, listener);
};
$.un = function (element, event, listener) {
    removeEvent(element, event, listener);
};
$.click = function (element, listener) {
    addClickEvent(element, listener);
};
$.enter = function (element, listener) {
    addEnterEvent(element, listener);
}
// $.on($('#dom1'), 'click', clickListener);
// $.un($('#dom1'), 'click', clickListener);
// $.click($('#dom1'), clickListener);
// $.enter($('#text1'), enterListener);

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

// 上面这段代码要针对每一个item去绑定事件，这样显然是一件很麻烦的事情。

// 稍微好一些的
// <ul id="list">
//     <li>Simon</li>
//     <li>Kenner</li>
//     <li>Erik</li>
// </ul>
// 我们试图改造一下
function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        fn(arr[i], i)
    };
};
// function clickListener(event) {
//     console.log(event);
// };
// each($("#list").getElementsByTagName('li'), function(li) {
//     addClickEvent(li, clickListener);
// });

// 我们通过自己写的函数，取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。
// 这样我们就不需要一个一个去绑定了。但是看看以下代码：

// <ul id="list">
//     <li id="item1">Simon</li>
//     <li id="item2">Kenner</li>
//     <li id="item3">Erik</li>
// </ul>
// <button id="btn">Change</button>

function clickListener(event) {
    console.log(event);
}
function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}
// function init() {
//     each($("#list").getElementsByTagName('li'), function(item, i) {
//         $.click(item, clickListener);
//     });
//     $.click($("#btn"), renderList);
// }
// init();

// 我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，
// 绑定事件不再生效了。那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？
// 当然不会这么笨，接下来学习一下事件代理，然后实现下面新的方法：

// 先简单一些
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
        var target = event.target || event.srcElement;
        if (target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        };
    });
}
$.delegate = delegateEvent;

$.delegate($('#list'), 'li', 'click', clickListener);
$.click($("#btn"), renderList);

// 估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，
// 那么接下来把我们的事件函数做如下封装改变：

// $.on(selector, event, listener) {
//     // your implement
// }

// $.click(selector, listener) {
//     // your implement
// }

// $.un(selector, event, listener) {
//     // your implement
// }

// $.delegate(selector, tag, event, listener) {
//     // your implement
// }

// 使用示例：
// $.click("[data-log]", logListener);
// $.delegate('#list', "li", "click", liClicker);
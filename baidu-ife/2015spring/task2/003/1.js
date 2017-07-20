
var intervalId = null;
var config = {
    forward: true,
    loop: true,
    time: 1500
};

// 页面进入后开始间歇调用
window.addEventListener('focus', function(){
    // 初始化默认设置
    intervalId = setInterval(function(){ imageLoop(config.forward, config.loop) }, config.time);
}, false);
// 页面离开时停止间歇调用,解决离开页面一段时间后再返回页面动画出错的bug
window.addEventListener('blur', function(){
    clearInterval(intervalId);
}, false);

window.onload = function () {
    $.on('.config #posOrder', 'change', listener1);
    $.on('.config #revOrder', 'change', listener1);

    $.on('.config #yesloop', 'change', listener2);
    $.on('.config #notloop', 'change', listener2);

    $.on('.config button', 'click', listener3);

    // $.delegate('#dotList', 'li', 'click', listener4);
    // 如何在事件委托下查找到元素索引index值？？
};
function listener1 () {
    clearInterval(intervalId);
    config.forward = !config.forward;
    intervalId = setInterval(function(){  imageLoop(config.forward, config.loop) }, config.time);
}
function listener2 () {
    clearInterval(intervalId);
    config.loop = !config.loop;
    intervalId = setInterval(function(){  imageLoop(config.forward, config.loop) }, config.time);
}
function listener3 () {
    var str = $('.config [name=lasttime]').value;
    if (str == '') {
        console.log('cant be null string');
        return;
    };
    var num = parseInt(str);
    if (Object.prototype.toString.call(num) == '[object Number]') {
        if (num < 1500) {
            console.log('num need to over 1500 ms');
            return;
        };
        config.time = num;
        clearInterval(intervalId);
        intervalId = setInterval(function(){ imageLoop(config.forward, config.loop) }, config.time);
    };
}
// function getDotIndex () {
//     var arrDot = $('#dotList').getElementsByTagName('li');
//     for (var i = 0; i < arrDot.length; i++) {
//         (function(i){
//             arrDot[i].onclick = function () {
//                 console.log(i);
//             }
//         })(i)
//     };
// }
// function listener4 () {
//     var a = getDotIndex();
//     console.log(a);
// }
var arrDot = $('#dotList').getElementsByTagName('li');
for (var i = 0; i < arrDot.length; i++) {
    (function(i){
        arrDot[i].onclick = function () {
            // 此处交互有bug
            // console.log(intervalId);
            // https://github.com/hushicai/ife-task0002/blob/master/src/Slider.js
            // 待研究
            tabDot(i);
            clearInterval(intervalId);
            var pace = parseInt(getStyle($('#imageList li')).width),
                start = -pace*i;
            $('#imageList').style.left = start + 'px';
            intervalId = setInterval(function(){ imageLoop(config.forward, config.loop) }, config.time);
            // console.log(intervalId);
        }
    })(i);
};
function imageLoop (forward, loop) {
// forward true: 往左滑图片向前 false: 往右滑图片向后
// loop true: 图片从最后一张过渡到第一张循环 false: 图片由最后一张快速到第一张不循环

    var start = parseInt(getStyle($('#imageList')).left),      // 当前左偏移值
        pace = parseInt(getStyle($('#imageList li')).width),   // 600px -> 600
        num = $('#imageList').getElementsByTagName('li').length, // 图片个数
        boundary1 = -pace*(num-1),
        boundary2 = pace*(num-2),
        direct = forward;

    if (start == boundary1 && forward && loop) {
        start = 0;
    };
    if (start == 0 && !forward && loop) {
        start = boundary1;
    };
    if (start == -boundary2 && forward && !loop) {
        pace = boundary2;
        direct = !forward;
    };
    if (start == 0 && !forward && !loop) {
        pace = boundary2;
        direct = !forward;
    };

    var index = getDotIndex(start, forward, loop, num);
    // console.log(index);
    tabDot(index);
    moveMent($('#imageList'), start, pace, direct);

}
function moveMent (element, start, pace, direct) {
    var counter = 10,                                          // 每一帧切换时移动次数
        speed = direct ? (-pace/counter) : (pace/counter);    // 算出正负速率

    var intervalId = null;
    intervalId = setInterval(function(){ move() }, 100);

    function move () {
        counter--;
        start += speed;
        element.style.left = start + 'px';
        if (counter == 0) {
            clearInterval(intervalId);
        };
    };
}
function getDotIndex (start, forward, loop, num) {
    var index,
        pace = parseInt(getStyle($('#imageList li')).width);

    // console.log(start);
    // true true 0 -600 -1200 -1800
    // true false 0 -600 -1200 -1800
    // false false 0 -1800 -1200 -600
    // false true -2400 -1800 -1200 -600

    if (start == 0) {
        index = 0 + 1;
    } else {
        index = (-start/pace + 1) % (num - 1);
    };
    // console.log(index);
    // true true 1 2 3 0
    // true false 1 2 3 0
    // false false 1 0 3 2
    // false true 1 0 3 2

    if (!forward) {
        index = (index + 2) % (num - 1);
    };
    // console.log(index);
    // true true 1 2 3 0
    // true false 1 2 3 0
    // false false 3 2 1 0
    // false true 3 2 1 0

    return index;
}
function tabDot (index) {
    var arrDot = $('#dotList').getElementsByTagName('li');
    for (var i = 0; i < arrDot.length; i++) {
        removeClass(arrDot[i], 'whiteDot');
    };
    addClass(arrDot[index], 'whiteDot');
}
function getStyle (element) {
    return document.defaultView.getComputedStyle ?
    document.defaultView.getComputedStyle(element, null) :
    element.currentStyle;
}


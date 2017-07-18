
var intervalId = null;

// 页面进入后开始间歇调用
window.addEventListener('focus', function(){
    // 初始化默认设置
    intervalId = setInterval(function(){ imageLoop(true, true) }, 1500);
}, false);
// 页面离开时停止间歇调用,解决离开页面一段时间后再返回页面动画出错的bug
window.addEventListener('blur', function(){
    clearInterval(intervalId);
}, false);


window.onload = function () {
    $.on('.config [name=order]', 'change', listener1);
};
function listener1 () {
    console.log('good');
    console.log(this.value);

};

function imageLoop (forward, loop) {
// forward true: 往左滑图片向前 false: 往右滑图片向后
// loop true: 图片从最后一张过渡到第一张循环 false: 图片由最后一张快速到第一张不循环

    var start = parseInt(getStyle($('#imageList')).left),      // 当前左偏移值
        pace = parseInt(getStyle($('#imageList li')).width),   // 600px -> 600
        num = $('#imageList').getElementsByTagName('li').length, // 图片个数
        boundary1 = -pace*(num-1),
        boundary2 = pace*(num-2);

    if (start == boundary1 && forward && loop) {
        start = 0;
    };
    if (start == 0 && !forward && loop) {
        start = boundary1;
    };
    if (start == -boundary2 && forward && !loop) {
        pace = boundary2;
        forward = !forward;
    };
    if (start == 0 && !forward && !loop) {
        pace = boundary2;
        forward = !forward;
    };

    moveMent($('#imageList'), start, pace, forward);

};
function moveMent (element, start, pace, forward) {
    var counter = 10,                                          // 每一帧切换时移动次数
        speed = forward ? (-pace/counter) : (pace/counter);    // 算出正负速率

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
};
function getStyle (element) {
    return document.defaultView.getComputedStyle ?
    document.defaultView.getComputedStyle(element, null) :
    element.currentStyle;
};


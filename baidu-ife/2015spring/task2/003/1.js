
var intervalId = null;

// 页面进入后开始间歇调用
window.addEventListener('focus', function(){
    intervalId = setInterval(function(){ imageLoop(true, true) }, 1500);
}, false);
// 页面离开时停止间歇调用
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

    var start = parseInt(getStyle($('#imageList')).left),      // 当前左偏移值
        pace = parseInt(getStyle($('#imageList li')).width),   // 600px -> 600
        num = $('#imageList').getElementsByTagName('li').length, // 图片个数
        boundary = -pace*(num-1);

    if (start == boundary && forward && loop) {
        start = 0;
    };
    if (start == 0 && !forward && loop) {
        start = boundary;
    };

    moveMent($('#imageList'), start, pace, forward);

};
function moveMent (element, start, pace, forward) {
    var counter = 10,                                          // 每一幅图片切换移动次数
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
































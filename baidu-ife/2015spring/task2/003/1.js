window.onload = function () {
    var leftDis = getStyle($('#imageList')).left;
    var max = $('#imageList').getElementsByTagName('li').length;
    var pace = parseInt(getStyle($('#imageList li')).width);
    moveMent($('#imageList'), -600, 10, parseInt(getStyle($('#imageList')).left));
    imageLoop(max);
};
function imageLoop (max) {
    var intervalId = null;
    var loopCounter = 0;
    var start = 0;
    intervalId = setInterval(function(){loop()}, 2000);
    function loop () {
        loopCounter ++;
        // console.log(loopCounter);
        start = parseInt(getStyle($('#imageList')).left);
        if (start == -2400) {
            start = 0;
        };
        // console.log(start);
        moveMent($('#imageList'), -600, 10, start);
    };
};
function moveMent (element, pace, counter, start) {
    var speed = pace/counter;
    var intervalId = null;
    intervalId = setInterval(function(){move()}, 100);
    function move () {
        counter--;
        // console.log(counter);
        start += speed;
        // console.log(start);
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
































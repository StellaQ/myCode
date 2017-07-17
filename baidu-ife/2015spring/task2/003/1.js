window.onload = function () {
    var leftDis = getStyle($('#imageList')).left;
    var maxNum = $('#imageList').getElementsByTagName('li').length;
    console.log(maxNum);
    // setInterval(function(){moveMent($('#imageList'), -600, 10, parseInt( getStyle($('#imageList')).left));}, 2000);
};
function moveMent (element, pace, seconds, start) {
    var speed = pace/seconds;
    var intervalId = null;
    intervalId = setInterval(function(){move()}, 100);
    function move () {
        seconds--;
        // console.log(seconds);
        start += speed;
        console.log(start);
        element.style.left = start + 'px';
        if (seconds == 0) {
            clearInterval(intervalId);
        };
    };
};
function getStyle (element) {
    return document.defaultView.getComputedStyle ?
    document.defaultView.getComputedStyle(element, null) :
    element.currentStyle;
};
































window.onload = function () {
    // moveMent($('#imageList'), parseInt(getStyle($('#imageList')).left), true);
    imageLoop(false);

    $.on('.config [name=order]', 'click', listener1);
};
function listener1 () {
    console.log(this.value);
    // console.log('im here');
    // clearInterval(intervalId);
};
var intervalId = null;
function imageLoop (forward) {

    intervalId = setInterval(function(){loop()}, 1500);

    function loop () {

        var start = parseInt(getStyle($('#imageList')).left);
        if (start == -2400 && forward) {
            start = 0;
        };
        if (start == 0 && !forward) {
            start = -2400;
        };

        moveMent($('#imageList'), start, forward);
    };
};
function moveMent (element, start, forward) {
    var pace = parseInt(getStyle($('#imageList li')).width),
        counter = 10,
        speed = forward ? (-pace/counter) : (pace/counter);

    var intervalId = null;
    intervalId = setInterval(function(){move()}, 100);

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
































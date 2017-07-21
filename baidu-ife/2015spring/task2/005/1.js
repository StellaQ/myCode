window.onload = function () {
    $.on('.listOne', 'dragover', listener1);
};
function listener1 (ev) {
    console.log('dede');
    preventDefault(ev);
}
function preventDefault (event) {  // javascript高级程序设计13.3.3跨浏览器的事件对象
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
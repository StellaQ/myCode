window.onload = function () {

    $.delegate('.listOne', 'li', 'dragstart', listenerDragStart);
    $.delegate('.listOne', 'li', 'dragend', listenerDragEnd);

    $.delegate('.listTwo', 'li', 'dragstart', listenerDragStart);
    $.delegate('.listTwo', 'li', 'dragend', listenerDragEnd);

    $.on('.listTwo', 'dragover', listenerDragOver);
    $.on('.listTwo', 'drop', listenerDrop);

    $.on('.listOne', 'dragover', listenerDragOver);
    $.on('.listOne', 'drop', listenerDrop);

};
function listenerDragStart (ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text', ev.target.innerHTML);
    ev.dataTransfer.setData('el', ev.target);
    ev.target.style.opacity = '0.5';
}
function listenerDragEnd (ev) {
    ev.target.style.opacity = '1';
}
function listenerDragOver (ev) {
    preventDefault(ev);
    ev.dropEffect = 'move';
}
function listenerDrop (ev) {
    var li = document.createElement('li');
    li.innerHTML = ev.dataTransfer.getData('text');
    li.draggable = true;
    ev.target.appendChild(li);
    var el = ev.dataTransfer.getData('el');
    console.log(el);
    console.log(el.parentNode);
}
function preventDefault (event) {  // javascript高级程序设计13.3.3跨浏览器的事件对象
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
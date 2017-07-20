window.onload = function () {
    $.on('[name=search]', 'keypress', listener1);
};
function listener1 (ev) {
    var charCode = getCharCode(ev);
    if (charCode == 13) {  //13 == enter
        var str = $('[name=search]').value;
        if (str == '') { return }
        searchText(str);
    };
}
function getCharCode (event) {
    if (typeof event.charCode == 'number') {
        return event.charCode;
    } else {
        return event.keyCode;
    }
}
function searchText (str) {
    console.log(str);
}
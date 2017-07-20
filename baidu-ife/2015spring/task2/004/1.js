var searchResult = ['djfjf', 'ffrrf', 'frferer', 'frfrfrfr'];
window.onload = function () {
    $.on('[name=search]', 'keypress', listener1);
    $.delegate('.result', 'li', 'click', listener2);
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
    // ajax
    var strResult = '';
    for (var i = 0; i < searchResult.length; i++) {
        strResult += '<li>' + searchResult[i] + '</li>';
    };
    $('.result').innerHTML = strResult;
    $('.result').style.display = 'block';
}
function listener2 () {
    $('[name=search]').value = this.innerHTML;
    $('.result').style.display = 'none';
}
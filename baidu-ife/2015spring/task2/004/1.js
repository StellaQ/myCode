var searchResult = ['djfjf', 'ffrrf', 'frferer', 'frfrfrfr'];
var i = -1;

window.onload = function () {
    $.on('[name=search]', 'keydown', listener1);
    $.delegate('.result', 'li', 'click', listener2);
};
function listener1 (ev) {
    var charCode = ev.keyCode;
    // console.log(charCode);
    if (!(charCode == 40 || charCode == 38 || charCode == 13)) {
        // console.log('not target keyCode');
        return;
    };
    if (charCode == 13) {  //13 == enter
        // console.log($('.result').style.display);
        if ($('.result').style.display !== 'block') {
            var str = $('[name=search]').value;
            if (str == '') { return }
            searchText(str);
        } else {
            console.log(i);
            $('[name=search]').value = $('.result').getElementsByTagName('li')[i].innerHTML;
            $('.result').style.display = 'none';
        }

    };
    if (charCode == 40) {
        i++;
        if (i > 3) {
            i = 3;
        };
        // console.log(i);
        tabLi(i);
    } else if (charCode == 38) {
        i--;
        if (i < 0) {
            i = 0;
        };
        // console.log(i);
        tabLi(i);
    };
    // console.log();
}
function tabLi (index) {

    var arrLi = $('.result').getElementsByTagName('li');
    for (var i = 0; i < arrLi.length; i++) {
        removeClass(arrLi[i], 'active');
    };
    addClass(arrLi[index], 'active');
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
var searchResult = ['djfjf', 'ffrrf', 'frferer', 'frfrfrfr'];
var indexLi = -1;

window.onload = function () {
    $.on('[name=search]', 'keydown', listener1);
    $.delegate('.result', 'li', 'click', listener2);
};
function listener1 (ev) {
    var charCode = ev.keyCode;
    if (!(charCode == 40 || charCode == 38 || charCode == 13)) {
        return;
    };
    if (charCode == 13) {  // enter
        if ($('.result').style.display !== 'block') {
            var str = $('[name=search]').value;
            if (str == '') { return }
            searchText(str);
        } else {
            if ( indexLi < 0 ) {return};
            $('[name=search]').value = $('.result').getElementsByTagName('li')[indexLi].innerHTML;
            $('.result').style.display = 'none';
            indexLi = -1;
        };
    } else if (charCode == 40) {  // down arrow
        indexLi++;
        if (indexLi > 3) {
            indexLi = 3;
        };
        tabLi(indexLi);
    } else if (charCode == 38) {  // up arrow
        indexLi--;
        if (indexLi < 0) {
            indexLi = 0;
        };
        tabLi(indexLi);
    };
}
function listener2 () {
    $('[name=search]').value = this.innerHTML;
    $('.result').style.display = 'none';
}
function searchText (str) {
    // ajax need to add...
    var strResult = '';
    for (var i = 0; i < searchResult.length; i++) {
        strResult += '<li>' + searchResult[i] + '</li>';
    };
    $('.result').innerHTML = strResult;
    $('.result').style.display = 'block';
}
function tabLi (index) {

    var arrLi = $('.result').getElementsByTagName('li');
    for (var i = 0; i < arrLi.length; i++) {
        removeClass(arrLi[i], 'active');
    };
    addClass(arrLi[index], 'active');
}
window.onload = function () {
    function listener1 () {
        var str = $('input').value;
        var arrInput = str.split(',');
        arrInput = trimArray(arrInput);
        arrInput = uniqArray(arrInput);
        rewriteUl(arrInput);
    };
    function trimArray (arr) {
        var arrNew = [];
        for (var i = 0; i < arr.length; i++) {
            arr[i] = trim(arr[i]);
            if (arr[i] !== '') {
                arrNew.push(arr[i]);
            };
        };
        return arrNew;
    };
    function rewriteUl (arr) {
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            str += '<li>'+ arr[i] +'</li>';
        }
        $('ul').innerHTML = str;
    };
    $.on('button', 'click', listener1);
}
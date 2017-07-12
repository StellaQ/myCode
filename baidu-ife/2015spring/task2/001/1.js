window.onload = function () {
    // 第一阶段
    function listener1 () {
        var str = $('input').value;
        var arrInput = str.split(',');
        arrInput = trimArray(arrInput);
        arrInput = uniqArray(arrInput);
        rewriteUl($('ul'), arrInput);
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
    function rewriteUl (obj,arr) {
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            str += '<li>'+ arr[i] +'</li>';
        }
        obj.innerHTML = str;
    };
    $.on('button', 'click', listener1);

    // 第二阶段
    $.on('#button1', 'click', listener2);
    function listener2 () {
        var str = $('#text1').value;
        var arrInput = str.split(/\n|\s+|,|，|;|；|、/);
        // 允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔
        arrInput = trimArray(arrInput);
        arrInput = uniqArray(arrInput);
        rewriteUl($('#ul1'), arrInput);
    };

    // 第三阶段
    $.on('#button2', 'click', listener3);
    function listener3 () {
        var str = $('#text2').value,
            maxNum = 10;

        if (str == '') {
            $('#span1').innerHTML = '不能为空';
            $('#ul2').innerHTML = '';
            return;
        } else {
            $('#span1').innerHTML = '';
        };

        var arrInput = str.split(/\n|\s+|,|，|;|；|、/);
        if (arrInput.length > maxNum) {
            $('#span1').innerHTML = '最多只能写' + maxNum + '个';
            $('#ul2').innerHTML = '';
            return;
        } else {
            $('#span1').innerHTML = '';
        };

        arrInput = trimArray(arrInput);
        arrInput = uniqArray(arrInput);
        rewriteUl2($('#ul2'), arrInput);
    };
    function rewriteUl2 (obj, arr) {
        var str = '';
        for (var i = 0; i < arr.length; i++) {
            str += '<li><label for="' + i + '">' + arr[i] +
            '</label><input type="checkbox" id="' + i + '"></li>';
        };
        obj.innerHTML = str;
    };
}
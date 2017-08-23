$(document).ready(function(){
    $('.item').on('tap', function(){
        if ($('.calContainer').css('display') == 'none') {
            $('.calContainer').show();
        };
        name = $(this).children().eq(1).text();
        iconClass = $(this).children().eq(0).attr('class');
        $('.output').children().eq(0).attr('class', iconClass + ' fl');
        $('.output .type').html(name);

        $('.btnReset').trigger('tap');
    });

    $('.btnCancel').on('tap', function(){
        $('.calContainer').hide();

        $('.btnReset').trigger('tap');
    });

    $('.btnReset').on('tap', function(){
        $('.output .total').html('¥0');
        current_num = 0;
        prev_arr = [];
    });

    $('.btnNum').on('tap', function(){
        calCurrent($(this).text());
    });
    $('.btnDot').on('tap', function(){
        current_dot = true;
    });

    $('.btnAdd').on('tap', function(){
        prev_arr.push({num: current_num, type: '+'});
        current_num = 0;
    });
    $('.btnMinus').on('tap', function(){
        prev_arr.push({num: current_num, type: '-'});
        current_num = 0;
    });
    $('.btnEqual').on('tap', function(){
        is_end = true;
        getTotal(prev_arr, current_num);
    });
    // 键盘输入键 增强交互
    $('.cal ul li').on('touchstart touchmove touchend', function(ev){
        ev.preventDefault();
        switch (ev.type) {
            case 'touchstart' :
                $(this).addClass('btnActive');
                break;
            case 'touchend' :
                $(this).removeClass('btnActive');
                break;
        }
    });

    var id = JSON.parse(storage.getItem('id'))? JSON.parse(storage.getItem('id')) : 0;
    // console.log(id);

    $('.publish').on('tap', function(){
        $('.btnEqual').trigger('tap');
        var timeStr = getTimeStr();

        if (total == 0) { return; }

        var obj = {
            name: name,
            icon: iconClass,
            total: total,
            time: timeStr,
            id: id++
        };
        var list = JSON.parse(storage.getItem('list')) ?
        JSON.parse(storage.getItem('list')) : [];
        // console.log(list);
        list.push(obj);
        // console.log('^^^');
        // console.log(list);
        storage.setItem('list', JSON.stringify(list));
        // console.log(id);
        storage.setItem('id', JSON.stringify(id));
    });
});

var current_num = 0,
    prev_arr = [],
    current_dot = false,
    is_end = false,
    name = '',
    iconClass = '',
    total = 0;

var storage = getLocalStorage();
// storage.clear();

function calCurrent (num) {
    // 上一次=计算总数后再按btnNum，开始重新计数
    if (is_end) {
        $('.btnReset').trigger('tap');

        is_end = false;
    };
    if (!current_dot) {
        var arr = current_num.toString().split('.');
        // 防止1.222超2位小数的出现
        if (arr.length > 1 && arr[1].length == 2) { return; };

        current_num = Number(current_num + num);
    } else{
        current_dot = false;

        // 防止类似1.2.2格式出现
        var arr = (current_num + '.' + num).split('.');
        if (arr.length > 2) { return };

        current_num = Number(current_num + '.' + num);
    };

    $('.output .total').html('¥' + current_num);
}
function getTotal (arr, num){
    // 考虑到按下1个数字后直接算总数的情况
    if (arr.length == 0) {
        total = num;
        $('.output .total').html('¥' + num);
        return;
    };

    total = 0;
    for (var i = 0; i < arr.length; i++) {
        if (i == 0) {
            total += arr[i].num;
        } else {
            if (arr[i-1].type == '+') {
                total += arr[i].num;
            } else if (arr[i-1].type == '-') {
                total -= arr[i].num;
            }
        };
    };
    if (arr[arr.length-1].type == '+') {
        total += num;
    } else if (arr[arr.length-1].type == '-') {
        total -= num;
    };
    // console.log(total);
    $('.output .total').html('¥' + total);
}
function getTimeStr () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return day + '/' + month + '/' + year;
}
function getLocalStorage () {
    if (typeof localStorage == 'object') {
        return localStorage;
    } else if (typeof globalStorage == 'object') {
        return globalStorage[location.host];
    } else {
        throw new Error('Local storage not available.');
    }
}
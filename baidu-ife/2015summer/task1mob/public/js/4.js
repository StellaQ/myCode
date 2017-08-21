$(document).ready(function(){
    // $('.item').on('click', function(){
    $('.item').on('tap', function(){
        if ($('.calContainer').css('display') == 'none') {
            $('.calContainer').show();
        };
        var className = $(this).children().eq(0).attr('class');
        var text = $(this).children().eq(1).text();
        $('.output').children().eq(0).attr('class', className + ' fl');
        $('.output .type').html(text);

        $('.output .total').html('¥0');
        current_num = 0;
    });
    $('.btnCancel').on('tap', function(){
        $('.calContainer').hide();

        $('.output .total').html('¥0');
        current_num = 0;
    });
    $('.btnNum').on('tap', function(){
        cal($(this).text());
        // console.log(current_num);
    });
    $('.btnDot').on('tap', function(){
        current_dot = true;
    });
    $('.btnReset').on('tap', function(){
        $('.output .total').html('¥0');
        current_num = 0;
    });
    $('.btnAdd').on('tap', function(){
        btn_add = true;
        prev_num.push({num: current_num, type: '+'});
        console.log(prev_num);
        current_num = 0;
    });
    $('.btnEqual').on('tap', function(){
        console.log(prev_num);
        console.log(current_num);
    })
});
var current_num = 0;
var current_dot = false;
var btn_add = false;
var prev_num = [];
function cal (num) {
    if (!current_dot) {
        var arr = current_num.toString().split('.');
        if (arr.length > 1 && arr[1].length == 2) {
            return;
        };
        current_num = Number(current_num + num);
    } else{
        current_num = Number(current_num + '.' + num);
        current_dot = false;
    };
    $('.output .total').html('¥' + current_num);
}
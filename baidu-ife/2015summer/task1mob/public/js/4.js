$(document).ready(function(){
    // $('.item').on('click', function(){
    $('.item').on('tap', function(){
        if ($('.calContainer').css('display') == 'none') {
            $('.calContainer').show();
        };
        var className = $(this).children().eq(0).attr('class');
        var text = $(this).children().eq(1).text();
        $('.output').children().eq(0).attr('class', className + ' fl');
        $('.output').children('.type').html(text);
    });
    $('.btnCancel').on('tap', function(){
        $('.calContainer').hide();
    });
    $('.btnNum').on('tap', function(){
        cal($(this).text());
        console.log(current_num);
        current_i++;
    });
    $('.btnDot').on('tap', function(){
        current_dot = true;
    });
});
var current_num = 0;
var current_i = 0;
var current_dot = false;
function cal (num) {
    current_num = current_i == 0
    ? (current_num * 0 + Number(num))
    : (current_num * 10 + Number(num));
}
$(document).ready(function(){
    $('h6').click(function(){
        $('.list-task').removeClass('list-active');
        $('.list-task li').removeClass('task-active');
        $(this).children('.list-task').addClass('list-active');
        $(this).children('.list-task').children().first().addClass('task-active');
    });
    $('.list-task li').click(function(){
        event.stopPropagation();
        $('.list-task li').removeClass('task-active');
        $(this).addClass('task-active');
    });
});
$(document).ready(function(){
    $('aside.list').delegate('h6', 'click', listener1);
    $('aside.list').delegate('.list-task li', 'click', listener2);
    $('aside.list').delegate('h6 div a', 'click', listener3);
});
function listener1 () {
    $('.list-task').removeClass('list-active');
    $('.list-task li').removeClass('task-active');
    $(this).children('.list-task').addClass('list-active');
    $(this).children('.list-task').children().first().addClass('task-active');
};
function listener2 (event) {
    event.stopPropagation();
    $('.list-task li').removeClass('task-active');
    $(this).addClass('task-active');
};
function listener3 (event) {
    event.stopPropagation();
    console.log('delete');
}
var deleteObj = {};
$(document).ready(function(){
    $('aside.list').delegate('h6', 'click', listener1);
    $('aside.list').delegate('.list-task li', 'click', listener2);
    $('aside.list').delegate('h6 div a', 'click', listener3);

    $('.button-cancel').click(function(){
        deleteObj = {};
        $('.alert-panel').removeClass('animation-show');
    });
    $('.button-check').click(function(){
        $('[data-id='+deleteObj.id+']').remove();
        $('.alert-panel').removeClass('animation-show');
    });
});
function listener1 () {
    $('.list-task').removeClass('list-active');
    $('.list-task li').removeClass('task-active');
    $(this).children('.list-task').addClass('list-active');
    $(this).children('.list-task').children().first().addClass('task-active');
}
function listener2 (event) {
    event.stopPropagation();
    $('.list-task li').removeClass('task-active');
    $(this).addClass('task-active');
}
function listener3 (event) {
    event.stopPropagation();
    // $('.alert-panel').removeClass('animation-show');
    var name = $(this).prev().text();
    var id = $(this).parent().parent().data('id');
    deleteObj.name = name;
    deleteObj.id = id;
    // console.log(deleteObj);
    $('.alert-panel .alert-body span').html(deleteObj.name);
    $('.alert-panel').addClass('animation-show');
}
function deleteTask (name, id) {
}





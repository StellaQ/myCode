var deleteObj = {};
$(document).ready(function(){
    init();

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
    // $('.alert-panel').removeClass('animation-show');？？
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
function init () {
    var str = '<h4>所有任务(<span>11</span>)</h4><h5>分类列表</h5>';
    for (var i = 0; i < task.length; i++) {
        str += renderTask(task[i]);
    };
    $('.list-container').html(str);
    $('.list-container h6:first .list-task').addClass('list-active');
    $('.list-container h6:first .list-task li:first').addClass('task-active');
}
function renderTask (obj) {
    var str = '',
        liststr = '',
        arr = obj.list,
        len = arr.length;

    if (len > 0) {
        for (var i = 0; i < arr.length; i++) {
            liststr += '<li class="clearfix"><span class="icon icon-book fl mr5"></span>'+
            '<p class="fl">'+ arr[i].name +'<span>('+ arr[i].num +')</span></p>'+
            '<a href="javascript:;" class="icon icon-delete fr"></a></li>'
        }
    };
    str = '<h6 class="clearfix" data-id='+ obj.id
    +'><div><span class="icon icon-star fl mr5"></span><p class="fl">'+
    obj.name +'<span>('+ obj.num +
    ')</span></p><a href="javascript:;" class="icon icon-delete fr"></a></div>'+
    '<ul class="list-task fl">'+ liststr + '</ul></h6>';
    return str;
}



















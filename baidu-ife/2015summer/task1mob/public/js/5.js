$(document).ready(function(){
    var list = JSON.parse(storage.getItem('list'));
    // console.log(list);
    render(list);

    $('.list').delegate('li', 'swipeLeft swipeRight', function(ev){
        switch (ev.type) {
            case 'swipeLeft':
                $(this).siblings().children('.item').css('transform', 'translate3d(0,0,0)');
                $(this).siblings().children('.menu').hide();

                $(this).children('.item').css('transform', 'translate3d(-120px,0,0)');
                $(this).children('.menu').show();
                break;
            case 'swipeRight':
                $(this).children('.item').css('transform', 'translate3d(0,0,0)');
                $(this).children('.menu').hide();
                break;
        }
    });
    $('.menu .icon-bin').on('tap', function(){
        console.log('delete');
    });
    $('.menu .icon-pencil').on('tap', function(){
        console.log('edit');
    });
});
var storage = getLocalStorage();
function getLocalStorage () {
    if (typeof localStorage == 'object') {
        return localStorage
    } else if (typeof globalStorage == 'object') {
        return globalStorage
    } else {
        throw new Error('Local storage not available.');
    }
}
function render (arr) {
    var str = '';
    for (var i = 0; i < arr.length; i++) {
        var income = arr[i].name == '收入' ? ' income' : '';
        var add = arr[i].name == '收入' ? '+' : '-';
        str += '<li class="clearfix"><div class="item"><span class="fl '+ arr[i].icon +
        '"></span><span class="fl type">'+ arr[i].name +'</span>'+'<p class="fl num'+ income +'">'
        + add + arr[i].total + '</p><time class="fr">'+ arr[i].time +'</time></div><div class="menu clearfix">'+
        '<span class="fr icon-bin"></span><span class="fr icon-pencil"></span></div></li>';
    };
    $('.list').html(str);
}
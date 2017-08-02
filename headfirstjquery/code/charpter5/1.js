$(document).ready(function(){

    var pic_num = 9,  // 一张大图片由9张小图片组成
        speed = 367,  // 每张小图片平均宽
        time = 500;   // 每张图片移动的时间

    lightning($('#lightning1'), 250, 2000);
    lightning($('#lightning2'), 'fast', 3000);
    lightning($('#lightning3'), 'fast', 4000);

    $("#head").click(function(){ animation($(this), speed, time); });
    $("#eyes").click(function(){ animation($(this), speed, time); });
    $("#nose").click(function(){ animation($(this), speed, time); });
    $("#mouth").click(function(){ animation($(this), speed, time); });

});
function lightning (obj, speed, time) {
    // console.log(obj);
    obj.fadeIn(speed).fadeOut(speed);
    setTimeout(function(){lightning(obj, speed, time)}, time);
}
function animation (obj, speed, time) {
    var offsetLeft = obj.offset().left;
    if (offsetLeft > -3112) {
        obj.animate({left:'-='+ speed +'px'}, time);
    }else {
        obj.animate({left:'0px'}, time);
    }
}




window.onload = function () {
    $.on('button', 'click', listener1);
    function listener1 () {
        // console.log(timer);
        clearInterval(timer);

        // yyyy-mm-dd
        var regEx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
            str = $('textarea').value;

        if (!regEx.test(str)) {
            console.log('wrong params');
            return;
        };

        var futureDate = new Date(str),
            currentDate = new Date();

        if (futureDate < currentDate) {
            console.log('not future time');
            return;
        };

        var arr = str.split('-');
        $('span').innerHTML = '距离'+ arr[0] + '年' + arr[1] + '月' + arr[2] + '日';

        calculateBetween(str);
        // var timer = setInterval(function(){console.log('0l')}, 1000);
        var timer = setInterval(function(){calculateBetween(str, timer)}, 1000);

    };
    function calculateBetween (future, intervalId) {
        var futureDate = new Date(future),
            currentDate = new Date(),
            futureMilliseconds = futureDate.getTime(),
            currentMilliseconds = currentDate.getTime();

        var betweenMilliseconds = futureMilliseconds - currentMilliseconds;
        console.log(betweenMilliseconds);
        if (betweenMilliseconds > 0) {
        // if (betweenMilliseconds > 15100000) {
            var day = Math.floor(betweenMilliseconds/(1000*60*60*24));
            var hour = Math.floor(betweenMilliseconds%(1000*60*60*24)/(1000*60*60));
            var minute = Math.floor(betweenMilliseconds%(1000*60*60*24)%(1000*60*60)/(1000*60));
            var seconds = Math.floor(betweenMilliseconds%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);

            $('time').innerHTML = day + '天' + hour + '小时' + minute + '分' + seconds + '秒';
        } else {
            clearInterval(intervalId);
        };
    };
};









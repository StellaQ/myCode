window.onload = function () {
    $.on('button', 'click', listener1);

    var intervalId = null;

    function listener1 () {
        clearInterval(intervalId);

        // yyyy-mm-dd
        var regEx = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
            str = $('textarea').value,
            futureDate = new Date(str),
            currentDate = new Date(),
            arr = str.split('-');

        if (!regEx.test(str)) {
            console.log('wrong params');
            return;
        };

        if (futureDate < currentDate) {
            console.log('not future time');
            return;
        };

        $('span').innerHTML = '距离'+ arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
        calculateBetween(futureDate,intervalId);

        intervalId = setInterval(function(){calculateBetween(futureDate,intervalId)}, 1000);
    };
    function calculateBetween (futureDate,intervalId) {
        var futureMilliseconds = futureDate.getTime(),
            currentMilliseconds = new Date().getTime();

        var betweenMilliseconds = futureMilliseconds - currentMilliseconds;
        // console.log(intervalId);
        // console.log(betweenMilliseconds);

        if (betweenMilliseconds > 0) {
        // if (betweenMilliseconds > 32700000) {
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









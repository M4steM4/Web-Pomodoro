$(document).ready(function() {
    var kippingTime;
    function timer(kippingTime, min, sec) {
        var min1, sec1, time;
        var element = document.getElementById("time");
        var finishTime = (+new Date) + 1000 * (60 * min + sec) + 500;

        function addZero(n) {
            return (n <= 9 ? "0" + n : n);
        }

        function startTimer(kippingTime) {
            nowTime = finishTime - (+new Date);
            if(nowTime < 1000) {
                element.innerHTML = "OVER!";
            } else {
                time = new Date(nowTime);
                min1 = time.getUTCMinutes();
                sec1 = time.getUTCSeconds();
                kippingTime = [min1, sec1];
                console.log(kippingTime);
                element.innerHTML = addZero(min1) + ':' + addZero(sec1);
                setTimeout(startTimer, time.getUTCMilliseconds() + 500);
            }
        }

        startTimer();
    }
    /*
    $("#startButton").click(function() {
        if(timerStop == 1) {
            countdown("time", 0, 5);
            timerStop = 0;
        } else {

        }
    });
    */
    timer(kippingTime, 0, 5);
});

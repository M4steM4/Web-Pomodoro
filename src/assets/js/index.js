$(document).ready(function() {
    var stopCheck = true;
    var mainTime = [0, 15];

    function timer(setTime) {
        var element = document.getElementById("time");
        var button = document.getElementById("startButton");
        var finishTime = (+new Date) + 1000 * (60 * setTime[0] + setTime[1]) + 200;
        if(stopCheck === true) {
            button.innerHTML = "STOP!";
            stopCheck = !stopCheck;
        } else {
            button.innerHTML = "START!";
            stopCheck = !stopCheck;
        }

        function addZero(n) {
            return (n <= 9 ? "0" + n : n);
        }

        function startTimer() {
            var min, sec, time;
            nowTime = finishTime - (+new Date);
            if(nowTime < 1000) {
                element.innerHTML = "OVER!";
            } else if(stopCheck === true) {
            } else {
                time = new Date(nowTime);
                min = time.getUTCMinutes();
                sec = time.getUTCSeconds();
                mainTime = [min, sec];
                element.innerHTML = addZero(min) + ':' + addZero(sec);
                setTimeout(startTimer, time.getUTCMilliseconds() + 200);
            }
        }
        startTimer();
    }

    $("#startButton").click(function() {
        timer(mainTime);
    });
});

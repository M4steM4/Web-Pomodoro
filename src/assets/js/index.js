$(document).ready(function() {
    var timerHandle = true;
    var changeTime = true;
    var mainTime = [0, 1];
    var mainProgress = 60 * mainTime[0] + mainTime[1];

    function timer(setTime) {
        var setProgress, ratio;
        var element = document.getElementById("time");
        var button = document.getElementById("startButton");
        var finishTime = (+new Date) + 1000 * (60 * setTime[0] + setTime[1]) + 200;

        if(timerHandle === true) {
            button.innerHTML = "STOP!";
            timerHandle = !timerHandle;
        } else {
            button.innerHTML = "START!";
            timerHandle = !timerHandle;
        }

        function addZero(n) {
            return (n <= 9 ? "0" + n : n);
        }

        function changeMode() {
            changeTime = !changeTime;
            timerHandle = !timerHandle;
            mainTime = changeTime ? [0, 25] : [0, 5];
            $("#tomato").css("background-color", changeTime ? "#df3c32" : "#3e4b5e");
            $("#startButton").css("background-color", changeTime ? "#df3c32" : "#3e4b5e");
            $("#mainTitle").css("color", changeTime ? "#df3c32" : "#3e4b5e");
            mainProgress = 60 * mainTime[0] + mainTime[1];
        }

        function startTimer() {
            var min, sec, time;
            nowTime = finishTime - (+new Date);
            if(nowTime < 1000) {
                $("#meter").text("100%");
                $("#meter").css("width", "100%");
                element.innerHTML = "OVER!";
                button.innerHTML = "START!";
                var check = confirm("Pomodoro time over! \n Take a breaktime");

                if(check === true) {
                    changeMode();
                } else {
                    check = confirm("Pomodoro time over! \n Take a breaktime");
                }

            } else if(timerHandle === true) {
            } else {
                time = new Date(nowTime);
                min = time.getUTCMinutes();
                sec = time.getUTCSeconds();
                mainTime = [min, sec];
                setProgress = (60 * mainTime[0] + mainTime[1]);
                ratio = parseInt(100 * ((mainProgress - setProgress)/mainProgress));
                $("#meter").css("width", ratio + "%");
                $("#meter").text(ratio + "%");
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

$(document).ready(function() {
    var timerHandle = true;
    var changeTime = true;
    var mainTime = [25, 0];
    var mainProgress = 60 * mainTime[0] + mainTime[1];
    var tomatoBoxDate = $(".tomatoBoxDate");
    var now = new Date();

    localReset();

    function localReset() {
        localStorage.count = 1;
        localStorage.date = [];
    }

    function loadTomato() {
        for(var i = 1; i < localStorage.count; i++) {
            $("#case" + i).html('<img src="assets/images/tomato.png" alt="" data-toggle="tooltip" data-placement="top" title="' + localStorage.getItem(i) + '">');
        }
        for(var j = 0; j < 10; j++) {
            $(tomatoBoxDate[j]).html("<p>" + Number(now.getMonth() + 1) + "/" + Number(now.getDate() + j) + "</p>");
        }
    }

    function makeTomato() {
        if(typeof(Storage) !== "undefined") {
            var now = new Date();
            var date = (now.getMonth() + 1) + "/" + now.getDate() + "\n" + now.getHours() + " : " + now.getMinutes() + " : " + now.getSeconds();
            $("#case" + localStorage.count).html('<img src="assets/images/tomato.png" alt="" data-toggle="tooltip" data-placement="top" title="">');
            localStorage.setItem(localStorage.count, date);
            localStorage.count = Number(localStorage.count) + 1;
        } else {
            console.log("Browser does not support web storage...");
        }
    }

    function timer(setTime) {
        var setProgress, ratio;
        var element = $("#time");
        var button = $("#startButton");
        var meter = $("#meter");
        var finishTime = (+new Date) + 1000 * (60 * setTime[0] + setTime[1]) + 200;

        if(timerHandle === true) {
            button.text("STOP!");
            timerHandle = !timerHandle;
        } else {
            button.text("START!");
            timerHandle = !timerHandle;
        }

        function addZero(n) {
            return (n <= 9 ? "0" + n : n);
        }

        function changeMode() {
            if(changeTime === true) {
                makeTomato();
            }
            changeTime = !changeTime;
            timerHandle = !timerHandle;
            mainTime = changeTime ? [25, 0] : [5, 0];
            $("#tomato").css("background-color", changeTime ? "#df3c32" : "#3e4b5e");
            $("#mainTitle").css("color", changeTime ? "#df3c32" : "#3e4b5e");
            button.css("background-color", changeTime ? "#df3c32" : "#3e4b5e");
            mainProgress = 60 * mainTime[0] + mainTime[1];
        }

        function startTimer() {
            var min, sec, time;
            nowTime = finishTime - (+new Date);
            if(nowTime < 1000) {
                var message = changeTime ? "Pomodoro time over! \nTake a break time" : "Break time over! \nDo your work!";
                var check = alert(message);
                meter.text("100%");
                meter.css("width", "100%");
                element.text("OVER!");
                button.text("START!");
                changeMode();
            } else if(timerHandle === true) {
                console.log("Click event exception");
            } else {
                time = new Date(nowTime);
                min = time.getUTCMinutes();
                sec = time.getUTCSeconds();
                mainTime = [min, sec];
                setProgress = (60 * mainTime[0] + mainTime[1]);
                ratio = parseInt(100 * ((mainProgress - setProgress) / mainProgress));
                meter.css("width", ratio + "%");
                meter.text(ratio + "%");
                element.text(addZero(min) + ':' + addZero(sec));
                setTimeout(startTimer, time.getUTCMilliseconds() + 200);
            }
        }
        startTimer();
    }
    loadTomato();

    $("#startButton").click(function() {
        timer(mainTime);
    });
});

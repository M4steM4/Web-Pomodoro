// if(module.hot){
//   module.hot.accept()
// }

var handler = {
    stop: true,
    change: true
};

$(document).ready(function() {
    var mainTime = [25, 0];
    var mainProgress = 60 * mainTime[0] + mainTime[1];
    var tomatoBoxDate = $(".tomatoList .date");
    var tomatoCase = $(".tomatoCase");
    var now = new Date();
    var name = 'tomato';
    var list = [];

    function localReset() {
        localStorage.count = 1;
    }

    function virTomato() {
        var today = now.getDate();
        for(var i = 0; i < 10; i ++) {
            list.push(today + i + 't');
            localStorage.setItem(list[i], 2 + i);
        }
    }
    virTomato();

    function loadTomato() {
        // TODO: save daily tomato
        for(var i = 1; i < localStorage.count; i++) {
            $("#case" + i).html('<img src="assets/images/tomato.png" alt="" data-toggle="tooltip" data-placement="top" title="' + localStorage.getItem(i) + '">');
        }

        for(var j = 0; j < 10; j++) {
            $(tomatoBoxDate[j]).html("<p>" + Number(now.getMonth() + 1) + "/" + Number(now.getDate() + j) + "</p>");
            $(tomatoCase[j]).html( () => {
                var string = '<img src="assets/images/tomato.png" alt="">';
                var count = Number(localStorage.getItem(list[j]));
                return string.repeat(count);
            });
        }
        localTest();
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
        var button = $("#button");
        var meter = $("#meter");
        var finishTime = (+new Date) + 1000 * (60 * setTime[0] + setTime[1]) + 200;

        if(handler.stop === true) {
            button.text("STOP!");
            handler.stop = !handler.stop;
        } else {
            button.text("START!");
            handler.stop = !handler.stop;
        }

        function addZero(n) {
            return (n <= 9 ? "0" + n : n);
        }

        function changeMode() {
            if(handler.change === true) {
                makeTomato();
            }
            handler.change = !handler.change;
            handler.stop = !handler.stop;
            mainTime = handler.change ? [0, 1] : [0, 1];
            $("#tomato").css("background-color", handler.change ? "#df3c32" : "#3e4b5e");
            $("#mainTitle").css("color", handler.change ? "#df3c32" : "#3e4b5e");
            button.css("background-color", handler.change ? "#df3c32" : "#3e4b5e");
            mainProgress = 60 * mainTime[0] + mainTime[1];
        }

        function startTimer() {
            var min, sec, time;
            var nowTime = finishTime - (+new Date);
            if(nowTime < 1000) {
                var message = handler.change ? "Pomodoro time over! \nTake a break time" : "Break time over! \nDo your work!";
                var check = alert(message);
                meter.text("100%");
                meter.css("width", "100%");
                element.text("OVER!");
                button.text("START!");
                changeMode();
            } else if(handler.stop === true) {
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

    function localTest () {
        let count = Number(localStorage.getItem('case'));
        let list = [];

        for (var i = 0; i < count; i++) {
            list.push(`<div id="case${i+1}" class="box"></div>`);
        }
        $("#tomatoStore").html(list);
    }


    $("#button").click( () => timer(mainTime) );
    $("#option").click( () => {
        let test = $(".modal-body input");
        let length = $(test[2]).val();
        mainTime
        localStorage.setItem('case', length);
        localStorage.setItem('time', length);
        localTest();
    });
});

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-11
 * Time: 下午3:15
 * To change this template use File | Settings | File Templates.
 */
this.timeCountDown = this.timeCountDown || {};
(function(){
    var modesTime = localStorage.getItem("timeCountDown.modesTime");
    if(modesTime){
        timeCountDown.modesTime = JSON.parse(modesTime);
    }else{
        timeCountDown.modesTime = {
            mode1:900,
            mode2:900,
            mode3:900,
            mode4:900
        }
    }
//    this.timeCountDown.modesTime = {
//        mode1:900,
//        mode2:900,
//        mode3:900,
//        mode4:900
//    }
    this.timeCountDown.loop = function(){
        LTimer.waitToDo(1,timeCountDown.onSecond,this);
    }

    this.timeCountDown.onSecond = function(onfocus){
        for(var i = 1;i<=4;i++){
            var mode = "mode"+i;
            if(gameUI.modePanel){
                gameUI.modePanel[mode].star.starAnimation.stop = true;
            }

            if(userInfo.modes[mode].count < 5  && !userInfo.modes[mode].unlimited){
                timeCountDown.modesTime[mode]--;
                if(gameUI.modePanel){
                    gameUI.modePanel[mode].star.starAnimation.stop = false;
                    gameUI.modePanel[mode].star.time.text = util.convertTimeFormat(timeCountDown.modesTime[mode]);
                }

                if(timeCountDown.modesTime[mode] <= 0){
                    timeCountDown.modesTime[mode] = 900;
                    userInfo.modes[mode].count++;
                    userProfile.saveModesInfo();
                    if(gameUI.modePanel){
                        gameUI.modePanel[mode].setModeCount(userInfo.modes[mode].count);
                    }
                }
            }
        }
        if(!onfocus){
            timeCountDown.loop();
        }

    }
    this.timeCountDown.setTimeMark = function(){
        var date = new Date();
        var time = date.getTime();
        console.log("timeMark:  "+date.getTime());
        localStorage.setItem("userInfo.timeMark",date.getTime());
    }
    this.timeCountDown.getLastTimeMark = function(){
        var timeStr = localStorage.getItem("userInfo.timeMark");
        return timeStr;
    }

    timeCountDown.loop();
})()

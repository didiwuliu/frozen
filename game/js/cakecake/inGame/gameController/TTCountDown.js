/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-12
 * Time: 下午12:03
 * To change this template use File | Settings | File Templates.
 */
this.runtimeData.timeCountDown = function(){
    gameUI.timeLine.visible = true;
    runtimeData.timer = new LTimer(1,
        function(){
            runtimeData.passedTime++;
            //assistant
            if(assistantHandler.addScore20S && runtimeData.passedTime%20 == 0 ){
                runtimeData.grantedScore(Math.round(runtimeData.score*0.05));
            }
            var remainTime = runtimeData.totalTime - runtimeData.passedTime;
            if(remainTime<=5 && !runtimeData.warning){
                runtimeData.warning = true;
                soundManager.play("time_warning",true);
            }
            if(remainTime > 5 && runtimeData.warning){
                runtimeData.warning = false;
                soundManager.pause("time_warning",true);
            }
            gameUI.timeLine.setRemainTime(remainTime);
            gameUI.targetText.text = util.convertTimeFormat(runtimeData.totalTime - runtimeData.passedTime);
            if(runtimeData.passedTime >= runtimeData.totalTime){
                LTimer.waitToDo(1,runtimeData.gameOver,this);

                runtimeData.timer.stop();
                runtimeData.timer.remove();
                runtimeData.timer = null;
                runtimeData.passedTime = 0;
                runtimeData.totalTime = 0;
            }
            console.log("本回合使用时间:  "+ runtimeData.passedTime);
        },
        null,null
    );
    runtimeData.timer.start();
};
this.runtimeData.roundCountDown = function(){
    runtimeData.passedRound++;
    if(assistantHandler.add1TEvery15 && runtimeData.passedRound%15 == 0 && runtimeData.passedRound>0){
        runtimeData.totalRound++;
    }
    if(assistantHandler.addScoreEvery10T && runtimeData.passedRound%10 == 0){
        runtimeData.grantedScore(Math.round(runtimeData.score*0.02));
    }
    if(this.currentMode != "mode3")return;
    gameUI.targetText.visible = true;
    var remainedRound = runtimeData.totalRound - runtimeData.passedRound;
    gameUI.targetText.text =  remainedRound;
    gameUI.timeLine.setRemainTime(remainedRound);
    if(remainedRound <= 5){
        soundManager.play("time_warning");
    }
    if(runtimeData.passedRound >= runtimeData.totalRound){
        console.log("turnsOver");
//            runtimeData.gameOver();
        LTimer.waitToDo(1,runtimeData.gameOver,this);
        runtimeData.passedRound = -1;
        runtimeData.totalRound = 0;
        runtimeData.timer = null;
    }
    console.log("本回合使用回合数:  "+ runtimeData.passedRound);
};
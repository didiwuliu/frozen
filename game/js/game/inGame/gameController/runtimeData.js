/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-5
 * Time: 上午9:48
 * To change this template use File | Settings | File Templates.
 */
this.runtimeData = this.runtimeData || {};
(function(){
    this.runtimeData.resetRuntimeData = function(){
        runtimeData.currentMode = "";
        runtimeData.currentProbability = null;
        runtimeData.totalTime = 0;
        runtimeData.passedTime = 0;
        runtimeData.totalRound = 0;
        runtimeData.passedRound = -1;
        runtimeData.superHamsterCount = 0;
        runtimeData.score = 0;
        runtimeData.coins = 0;
        runtimeData.goal = null;
        runtimeData.assistantItems = null;
        if(runtimeData.warning){
            runtimeData.warning = false;
            soundManager.pause("time_warning",true);
        }
        runtimeData.destructionCost = gameConfig.destructionCost;
        runtimeData.trapedHamster = 0;
        runtimeData.reachedHighestLevel= 100;
        runtimeData.destructionRound = 6;
        runtimeData.animalWalk = 0;
        runtimeData.animalWalkComplete = 0;
        //用于计时模式
        if(runtimeData.timer){
            runtimeData.timer.stop();
            runtimeData.timer.remove();
        }

    }
    this.runtimeData.selectAssistant = function(mode){
        runtimeData.currentMode = mode;
        //获取可用的assistant
        var rightAssistantItems = [];
        for(var key in gameConfig.assistantItem){
            var modes = gameConfig.assistantItem[key].exceptMode;
            var canuse = true;
            for(var key2 in modes){
                if(modes[key2] == mode){
                    canuse = false;
                    break;
                }
            }
            if(canuse){
                rightAssistantItems.push(gameConfig.assistantItem[key]);
            }
        }
        //显示可用的assistantItem
        visibleManager.showPanel("assistant");
        visibleManager.gotoMode(false);
        gameUI.assistantPanel.setData(rightAssistantItems);
    }


    this.runtimeData.trappedHamsterCount = function(count){
        runtimeData.trapedHamster += count
        if(runtimeData.currentMode == "mode4"){
            var rewardCoins = gameUI.goalBar.setMode4Progress(count);
            runtimeData.grantedCoins(rewardCoins);
        }
    }
    this.runtimeData.grantedScore = function(score){
        //prepared for gloves
        var rewardScore =0;
        if(runtimeData.currentMode == "mode1" || runtimeData.currentMode == "mode5"){
            rewardScore = gameUI.goalBar.setMode1Progress(score);
        }
        soundManager.play("score_increment");

        runtimeData.score += score + rewardScore;
        if(runtimeData.score<0){
            runtimeData.score = 0;
        }
        if(typeof runtimeData.score != "number"){
            console.log("分数数据格式错误");
        }
        if(gameUI.scoreText){
            gameUI.scoreText.text = util.convertIntFormat(runtimeData.score);
        }
    };
    this.runtimeData.grantedCoins = function(coins){
        if(coins<=0){
            return;
        }
        //统计进行时获得的金币
//        runtimeData.coins += coins;
        //用户金币总数
        userInfo.coins += coins;
        userProfile.saveCoinsInfo();
    };


    this.runtimeData.showResultPanel = function(score,coins,highestLevel,currentMode){
        visibleManager.hidePanel("over");
        visibleManager.showPanel("gameResult");
        soundManager.play("congratulation");
//        setTimeout("soundManager.play('cakeEnding',true)",2500);
        LTimer.waitToDo(2.5,soundManager.play,null,["cakeEnding",false]);
        gameUI.resultPanel.setData(score,coins,highestLevel,currentMode);
    }
    this.runtimeData.gameResult = function(resultData){
        //var resultData = {mode:runtimeData.currentMode,score:runtimeData.score,coins:runtimeData.coins,highestLevel:runtimeData.reachedHighestLevel};
//        if(resultData.mode == "mode1" || resultData.mode == "mode4" || resultData.mode == "mode5" || resultData.remain>1){
//            runtimeData.showResultPanel(resultData.score,resultData.coins,resultData.highestLevel,resultData.mode);
//        }else

        //if(resultData.mode == "mode2" || resultData.mode == "mode3"){
            //overPanel
            visibleManager.showPanel("over");
            soundManager.play("timeover");
            gameUI.overPanel.startAnimation();
            gameUI.overPanel.setCurrentMode(resultData.mode,resultData.remain>1);
            //resultPanle
            LTimer.waitToDo(1.8,runtimeData.showResultPanel,this,[resultData.score,resultData.coins,resultData.highestLevel,resultData.mode]);
        //}
    }

    this.runtimeData.resetRuntimeData();
}())


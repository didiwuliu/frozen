/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-12
 * Time: 上午11:58
 * To change this template use File | Settings | File Templates.
 */
this.runtimeData.startGameByMode = function(mode){
    runtimeData.currentMode = mode;
    //初始化场景
    if(!initializeGame){
        initializeGame = true;
        map.initGridContainer();//初始化36个单元格
    }
    map.initToolsGrids();
    gameUI.initGameUI();
    //添加模式图标
    gameUI.modeIcon.setModeIcon(mode);
    //验证消耗、产生的数据
    if(mode == "mode5"){
        // gameUI.forecastAnimation.visible = false;//新手引导阶段，没有预测框，所以不显示动画
    }else{
        //gameUI.forecastAnimation.visible = true;
        if(!userInfo.modes[mode].unlimited){
            if(userInfo.modes[mode].count<1){
                visibleManager.gotoGame(false);
                visibleManager.gotoMode(true);
                return;
            }
            //修改userInfo.modes数据,
            userInfo.modes[mode].count--;
            userProfile.saveModesInfo();
        }
        //记录玩的次数
        userInfo.playTime[mode].time++;
        userProfile.savePlayTimes();
    }

    //当前参数
    if(mode == "mode1"){//普通模式
        runtimeData.currentProbability = util.clone(gameConfig.commonModeProbability);
        //成就
        if(userInfo.playTime[mode].time >= 10){achievement.finishAchievement("achievement_adventurer_010")}
    }else if(mode == "mode2"){//时间模式
        runtimeData.currentProbability = util.clone(gameConfig.commonModeProbability);
        runtimeData.totalTime = gameConfig.roundTime;
        if(assistantHandler.addMore5s){
            runtimeData.totalTime += 5;
        }
        runtimeData.passedTime = 0;
    }else if(mode == "mode3"){//回合限制模式
        runtimeData.currentProbability = util.clone(gameConfig.commonModeProbability);
        runtimeData.totalRound = gameConfig.totalRound;
//            runtimeData.passedRound = 0;
        gameUI.targetText.visible = true;
//            runtimeData.roundCountDown();
    }else if(mode == "mode4"){//老鼠模式
        runtimeData.currentProbability = util.clone(gameConfig.hamsterModeProbability);
    }else if(mode == "mode5"){//practice
        runtimeData.currentProbability = util.clone(gameConfig.commonModeProbability);
    }
    //根据assistantHandler.reduceHamsterRatio做调整
    if(assistantHandler.reduceHamsterRatio){
        runtimeData.currentProbability.hamster = runtimeData.currentProbability.hamster/2;
        runtimeData.currentProbability.wheat += runtimeData.currentProbability.hamster;
    }
    if( assistantHandler.twoTwiceHamster){
        runtimeData.currentProbability.wheat -= runtimeData.currentProbability.hamster;
        runtimeData.currentProbability.hamster = runtimeData.currentProbability.hamster*2;
    }
    if(assistantHandler.twoTwiceSmallCake){
        runtimeData.currentProbability.wheat -= runtimeData.currentProbability.smallcake;
        runtimeData.currentProbability.smallcake = runtimeData.currentProbability.smallcake*2;
    }
    //设置goals
    if(mode == "mode1" || mode == "mode5"){
        gameUI.goalBar = new GoalsBar();
        gameUI.goalBar.isMouseEnable = false;
        gameUI.componentLayer.addChild(gameUI.goalBar,true);

        runtimeData.goal = gameConfig.goals["mode1"].slice();
        gameUI.goalBar.setData(runtimeData.goal,mode);
    }else if(mode == "mode4"){
        gameUI.goalBar = new GoalsBar();
        gameUI.goalBar.isMouseEnable = false;
        gameUI.componentLayer.addChild(gameUI.goalBar,true);

        gameUI.goalBar.setData(null,mode);
    }
    //设置倒计时/回合倒数
    if(mode == "mode2"){
        gameUI.timeLine.setTotalTime(runtimeData.totalTime);
        gameUI.timeLine.visible = true;
        gameUI.targetText.visible = true;
        gameUI.targetText.text = util.convertTimeFormat(runtimeData.totalTime);
        gameUI.timeLine.setRemainTime(runtimeData.totalTime);

    }else if(mode == "mode3"){
        gameUI.timeLine.setTotalTime(runtimeData.totalRound);
        gameUI.timeLine.visible = true;
        gameUI.targetText.visible = true;
        gameUI.targetText.text = runtimeData.totalRound;
        gameUI.timeLine.setRemainTime(runtimeData.totalRound);

    }


    //开始游戏
    if(mode == "mode5"){
        map.initializePracticeMap();//新手引导地图
    }else{
        map.randomMap();
    }

    gameTools.goon(0);
    runtimeData.cakeAnimationStart();
    visibleManager.gotoMode(false);
    visibleManager.gotoGame(true);

//        setTimeout(runtimeData.gameOver,6000);
//        return;


    //游戏介绍2次
    if(mode!="mode5" && mode!="mode1" && userInfo.playTime[mode].time <= 2){
        gameUI.addMask(true);
        if(mode == "mode2" || mode == "mode3" || mode == "mode4"){
            gameUI.mask[gameUI.mask.length-1].setHollow(new LRectangle(148,177,480,61));
        }
        var descriptionPanel = new ModeTipDialogBox(420,mode);
        descriptionPanel.y = 486;
        descriptionPanel.x = 85;
        descriptionPanel.setData(gameConfig.ModeDescription[mode].description);
        gameUI.uiLayer.addChild(descriptionPanel);

        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.newbie_guide_light);
        var bp = new LBitmap(bpd);
        var lightBorder = new LSprite();
        lightBorder.addChild(bp);
        lightBorder.centerX = 10;//25,border外边框空白边
        lightBorder.centerY = 10;
        lightBorder.scaleX = 5.8;
        lightBorder.scaleY = 0.7;
        lightBorder.y = -295-63;
        lightBorder.x = 60;
        descriptionPanel.addChild(lightBorder);
        return;
    }
    if(mode == "mode2"){
        runtimeData.timeCountDown();
    }

}

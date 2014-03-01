/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-27
 * Time: 下午9:48
 * To change this template use File | Settings | File Templates.
 */
function ResultPanel(){
    LSprite.call(this);
    //背景
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.result);
    var bp = new LBitmap(bpd);
    this.addChild(bp);

    //面板头
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.congratulations_top);
    var bp = new LBitmap(bpd);
    bp.x = -25;
    bp.y = -70;
    this.addChild(bp);

    //穿过congratulations 烟花动画
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.result_congratulations.cross.rectsData}];
    this.acrossAnimation = LAnimation.getAnimation(assetsData.effectAnimation.result_congratulations.image,animationArr,"animation",1,false);

    //firework1 烟花动画
//    this.firework1Data = [{name:"animation",imageArr:assetsData.effectAnimation.result_firework1.firework1.rectsData}];

    //firework2 烟花动画
//    this.firework2Data = [{name:"animation",imageArr:assetsData.effectAnimation.result_firework2.firework2.rectsData}];

    //congratulations文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.congratulations);
    var bp = new LBitmap(bpd,"congratulations");
    bp.setCP(320-27,0);
    this.congratulationsTitle = new LSprite();
    this.congratulationsTitle.addChild(bp);
//    this.congratulationsTitle.centerX = parseInt(assetsData.text.congratulations.w)/2;
//    this.congratulationsTitle.centerY = parseInt(assetsData.text.congratulations.h)/2;
    this.congratulationsTitle.centerX = 320-27;
    this.congratulationsTitle.centerY = parseInt(assetsData.text.congratulations.h)/2;
    this.addChild(this.congratulationsTitle);
    //分割线-------------------------------
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.line);
    this.upLine = new LBitmap(bpd);
    this.upLine.x = 77;
    this.upLine.y = 255;
    this.upLine.visible = false;
    this.addChild(this.upLine);

    //result_score bg
    this.scoreComponent = new ResultScore();
    this.scoreComponent.visible = false;
    this.addChild(this.scoreComponent);

    //分割线-------------------------------
    this.downLine = new LBitmap(bpd);
    this.downLine.x = 77;
    this.downLine.y = 495;
    this.downLine.visible = false;
    this.addChild(this.downLine);

    //result_items bg
    this.highestObjComponent  = new ResultHighestObject();
    this.highestObjComponent.visible = false;
    this.addChild(this.highestObjComponent);

    //shareButton,
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.green_short);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.green_short_h);
    var bph = new LBitmap(bpdh);

    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.share);
    var bpt = new LBitmap(bpdt,"share");

    this.shareBtn = new LButton(bp,this.onShare,this,bph,true,null,bpt,{x:78,y:27});
    this.shareBtn.x = 84;
    this.shareBtn.y = 704;
    this.shareBtn.centerX = parseInt(assetsData.public.green_short.w)/2;
    this.shareBtn.centerY = parseInt(assetsData.public.green_short.h)/2;
    this.shareBtn.y = parseInt(assetsData.public.green_short.h)/2;
    this.addChild(this.shareBtn);
    //okBtn
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.short_btn);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.short_btn_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.ok);
    var bpt = new LBitmap(bpdt,"ok");

    this.okBtn = new LButton(bp,this.onOK,this,bph,true,null,bpt,{x:78,y:27});
    this.okBtn.x = 345;
    this.okBtn.y = 704;
    this.okBtn.centerX = parseInt(assetsData.public.short_btn.w)/2;
    this.okBtn.centerY = parseInt(assetsData.public.short_btn.h)/2;
    this.addChild(this.okBtn);
}
ResultPanel.prototype = Object.create(LSprite.prototype);
ResultPanel.prototype.onShare = function(event){
    event.stopGoOn = true;
    var message = string.currentString[gameConfig.stringOfShare.FB_Level_body_01.name];
    var linkCaption = "cake & cake";
    var url = "http://zhangchunsheng.github.io/cakeandcake/images/highscore.png";
    var mediaURL = url;
    var linkURL = string.currentString[gameConfig.stringOfShare.FB_general_body_01.name];
    var linkText = string.currentString[gameConfig.stringOfShare.FB_Level_title_01.name];

    // var coins = gameConfig.dailyReward[userInfo.login.successiveLoginTime-1];
    var resultArr = userInfo.gameResultLog[this.mode == "mode5"?"mode1":this.mode];
    if(resultArr.length >0){
        score = resultArr[0].score;
    }else{
        score = 0;
    }
    message = message.replace(/{HIGH SCORE}/,score);
    facebook.publishAMessage(message, mediaURL, linkURL, linkText, linkCaption);
}
ResultPanel.prototype.onOK = function(event){
    event.stopGoOn = true;
    visibleManager.hidePanel("gameResult");

    //测试ACHIEVEMENT特效，假数据/////////////////////////////////////////
//    achievement.newAchievement = [];
//    achievement.openNewAchievement = true;
//    var count = 0;
//    for(var key in userInfo.achievements){
//        count++;
//        achievement.newAchievement.push(key);
//        if(count >=7 )break;
//    }
    ///////////////////////////////////////

//    if(gameUI.resultPanel.timer){
//        gameUI.resultPanel.timer.stop();
//        gameUI.resultPanel.timer.remove();
//    }
//    if(gameUI.resultPanel.timer2){
//        gameUI.resultPanel.timer2.stop();
//        gameUI.resultPanel.timer2.remove();
//    }
    if(achievement.openNewAchievement){
        achievement.openNewAchievement = false;
        visibleManager.showPanel("achievementOpening");
        gameUI.achievementPanelOpening.setData(achievement.newAchievement);
        achievement.newAchievement = [];
    }else{
//        visibleManager.gotoMode(true);
        assetsData.destroyManifest3();
        assetsData.loadGotoMenuAssets();
    }


}
ResultPanel.prototype.waitAMoment = function(fun){
    soundManager.pause("score_increment",true);
    LTimer.waitToDo(0.6,fun);
};
ResultPanel.prototype.playFireworks = function(){
    var c = ~~util.getRandom(1,2);
    while(c>0){
        c--;
        var r = util.getRandom(0,10);
        if(r>7){
            var fw = LAnimation.getAnimation(assetsData.effectAnimation.result_firework1.image,gameUI.resultPanel.firework1Data,"animation",2,false);
        }else{
            var fw = LAnimation.getAnimation(assetsData.effectAnimation.result_firework2.image,gameUI.resultPanel.firework2Data,"animation",2,false);
        }
        gameUI.resultPanel.playFirework(fw);
    }

}
ResultPanel.prototype.playFirework = function(fw){
    var t = gameUI.resultPanel;
    t.addChild(fw);
    fw.x = ~~util.getRandom(-100,360);
    fw.y = ~~util.getRandom(93,500);
    fw.playOnce();
    fw.setComplete(
        function(){
            gameUI.resultPanel.removeChild(this);
        }
    );

};
ResultPanel.prototype.startAct = function(){
    this.originalState();
   LGlobal.TweenLite.to(this.congratulationsTitle,900,{y:375,scaleX:1,scaleY:1,onComplete:gameUI.resultPanel.showCrossAnimation,ease:Bounce.easeOut});
   // LGlobal.TweenLite.to(this.congratulationsTitle,900,{y:375,scaleX:1,scaleY:1,onComplete:gameUI.resultPanel.waitAMoment,params:gameUI.resultPanel.showCrossAnimation,ease:Bounce.easeOut});
};
ResultPanel.prototype.showCrossAnimation = function(){
    gameUI.resultPanel.acrossAnimation.x = 55;
    gameUI.resultPanel.acrossAnimation.y  = 375;
    gameUI.resultPanel.acrossAnimation.visible = true;
    gameUI.resultPanel.addChild(gameUI.resultPanel.acrossAnimation);

    gameUI.resultPanel.acrossAnimation.playOnce();
    gameUI.resultPanel.acrossAnimation.setComplete( gameUI.resultPanel.congratulationsFloat);
}
ResultPanel.prototype.congratulationsFloat = function(){
    gameUI.resultPanel.removeChild(gameUI.resultPanel.acrossAnimation);
    LGlobal.TweenLite.to(gameUI.resultPanel.congratulationsTitle,600,{y:210,onComplete:gameUI.resultPanel.showScoreComponent,ease:Bounce.easeOut});
}
ResultPanel.prototype.showScoreComponent = function(){
    //congratulationsFloat完成后，开始播放烟花
//    gameUI.resultPanel.playFireworks();//先播放一次
//    gameUI.resultPanel.timer = new LTimer(2,gameUI.resultPanel.playFireworks);
//    gameUI.resultPanel.timer.start();
//    gameUI.resultPanel.timer2 = new LTimer(3.5,gameUI.resultPanel.playFireworks);

    LGlobal.TweenLite.to(gameUI.resultPanel.scoreComponent,600,{y:335,scaleX:1,scaleY:1,onComplete:gameUI.resultPanel.increaseScoreAnimation,ease:Bounce.easeOut});
    gameUI.resultPanel.scoreComponent.visible = true;
    gameUI.resultPanel.upLine.visible = true;
}
ResultPanel.prototype.increaseScoreAnimation = function(){
    //gameUI.resultPanel.scoreComponent.increaseAnimation(gameUI.resultPanel.showHighestObjComponent);
    gameUI.resultPanel.scoreComponent.increaseAnimation(gameUI.resultPanel.waitAMoment,gameUI.resultPanel.showHighestObjComponent);
    soundManager.play("score_increment",true);
}
ResultPanel.prototype.showHighestObjComponent = function(){
    LGlobal.TweenLite.to(gameUI.resultPanel.highestObjComponent,800,{y:520,scaleX:1,scaleY:1,onComplete:gameUI.resultPanel.increaseHighestObjAnimation,ease:Bounce.easeOut});
    gameUI.resultPanel.highestObjComponent.visible = true;
    gameUI.resultPanel.downLine.visible = true;
}
ResultPanel.prototype.increaseHighestObjAnimation = function(){
    soundManager.play("score_increment",true);
    gameUI.resultPanel.highestObjComponent.increaseAnimation(gameUI.resultPanel.waitAMoment,gameUI.resultPanel.showButtons);
}
ResultPanel.prototype.showButtons = function(){
    gameUI.resultPanel.okBtn.visible = true;
    gameUI.resultPanel.shareBtn.visible = true;

//    LGlobal.TweenLite.to(gameUI.resultPanel.shareBtn,800,{y:704,scaleX:1,scaleY:1,ease:Bounce.easeOut});
//    LGlobal.TweenLite.to(gameUI.resultPanel.okBtn,800,{y:704,scaleX:1,scaleY:1,ease:Bounce.easeOut});
    LGlobal.TweenLite.to(gameUI.resultPanel.shareBtn,800,{scaleX:1,scaleY:1,ease:Bounce.easeOut});
    LGlobal.TweenLite.to(gameUI.resultPanel.okBtn,800,{scaleX:1,scaleY:1,ease:Bounce.easeOut});
}
ResultPanel.prototype.originalState = function(){
    this.congratulationsTitle.y = 180;//180/375/180
    this.congratulationsTitle.x = 0;
    this.congratulationsTitle.scaleX = this.congratulationsTitle.scaleY = 4;

    this.acrossAnimation.visible = false;

    this.upLine.visible = false;
    this.downLine.visible = false;

    this.scoreComponent.visible = false;
    this.scoreComponent.x = 67;
    this.scoreComponent.y = 0;// 0/275
    this.scoreComponent.scaleX = this.scoreComponent.scaleY = 1.5;

    this.highestObjComponent.visible = false;
    this.highestObjComponent.x = 89;
    this.highestObjComponent.y = 0;//0/490
    this.highestObjComponent.scaleX = this.highestObjComponent.scaleY = 1.3;

    this.shareBtn.x = 84;
    this.shareBtn.y = 704;
    this.shareBtn.scaleX = this.shareBtn.scaleY = 0.1;
    this.shareBtn.visible = false;

    this.okBtn.x = 345;
    this.okBtn.y = 704;//100/704
    this.okBtn.scaleX = this.okBtn.scaleY = 0.1;
    this.okBtn.visible = false;
}
ResultPanel.prototype.setData = function(score,coins,highestLevel,currentMode){
    //coins: 打开钱包获得的钱
    //score:分数
    //scoreCoins：根据分数获得的钱
    //highestLevel：最高等级
    this.mode = currentMode;
    var scoreCoins;
    if(score <= 100000){
        scoreCoins = parseInt(score*0.005);
    }else if(score > 100000 && score <= 1000000 ){
        scoreCoins = 500+parseInt(score*0.0005);
    }else if(score > 1000000 && score <= 10000000){
        scoreCoins = 1000+parseInt(score*0.00005);
    }else if(score > 10000000){
        scoreCoins = 1500;
    }
    this.scoreComponent.setData(score,scoreCoins,currentMode);

    //highestLevel
//    var plant = new Plant(highestLevel);
    var cakeCoins = gameConfig.gameObjects["level_"+highestLevel].rewardCoins;
    this.highestObjComponent.setData(highestLevel,cakeCoins);

    userInfo.coins += (cakeCoins + coins + scoreCoins);
    userProfile.saveCoinsInfo();

    this.startAct();
}
ResultPanel.prototype.destroy = function(){
    this.removeAllChild();
    this.okBtn.destroy();
    this.shareBtn.destroy();

}
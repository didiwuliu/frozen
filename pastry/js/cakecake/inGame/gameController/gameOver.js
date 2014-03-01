/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-12
 * Time: 下午12:01
 * To change this template use File | Settings | File Templates.
 */
this.runtimeData.gameOver = function(){
//        if(inventory.previousGloves && runtimeData.currentMode != "mode2" && runtimeData.currentMode != "mode3"){
//            inventory.currentGloves = inventory.previousGloves;
//            //gameTools.remove
//            inventory.previousGloves = null;
//            gameTools.removeStorageTip();
//            gameTools.drawTip(inventory.currentGloves);
//            //提示可以使用手套
//            var lockTip = new LockTipDialogBox(420);
//            lockTip.setData("You still have the gloves in the storage area, use them before ending the game.");
//            lockTip.x = 85;lockTip.y = 486;
//            visibleManager.showDialog(lockTip);
//            return;
//        }
    if(runtimeData.warning){
        runtimeData.warning = false;
        soundManager.pause("time_warning",true);
    }
    soundManager.pause("bgMusic",true);

    //成就
    achievement.finishAchievement("achievement_novice_002");
    if(runtimeData.score >= 10000){
        if(runtimeData.currentMode == "mode3"){
            achievement.finishAchievement("achievement_novice_009");
        }else{
            achievement.finishAchievement("achievement_adventurer_003");
        }
    }
    if(runtimeData.score >= 25000){
        achievement.finishAchievement("achievement_adventurer_004");
    }
    if(runtimeData.currentMode == "mode2" && runtimeData.score >= 15000){
        achievement.finishAchievement("achievement_adventurer_013");
    }
    if(runtimeData.score >= 50000){
        achievement.finishAchievement("achievement_adventurer_005");
        if(runtimeData.currentMode = "mode3"){
            achievement.finishAchievement("achievement_adventurer_012");
        }
    }

    if(runtimeData.currentMode == "mode2" && runtimeData.score >= 5000){
        achievement.finishAchievement("achievement_novice_010");
    }
    if(runtimeData.currentMode == "mode4"){
        if(runtimeData.trapedHamster >= 10){
            achievement.finishAchievement("achievement_novice_008");
        }else if(runtimeData.trapedHamster >= 100){
            achievement.finishAchievement("achievement_adventurer_011");
        }
    }
    //  计分
    if(runtimeData.currentMode && runtimeData.currentMode != "mode5" && runtimeData.score >0){
        userInfo.gameResultLog[runtimeData.currentMode].push({score:runtimeData.score,coins:runtimeData.coins});
        var score = userInfo.gameResultLog[runtimeData.currentMode].length>1?userInfo.gameResultLog[runtimeData.currentMode][0].score:0;
        if(runtimeData.score > score){
            var mode = "M"+runtimeData.currentMode.slice(1);
            var leaderBoardId = mode+"_LeaderBoard.cakeandcake.wozlla.com";

//                gamecenter.submitScore(runtimeData.score,null,{leaderboardID:leaderBoardId});
        }
        userProfile.saveGameResultLog();
    }


    visibleManager.gotoGame(false);
    //游戏结果
    var remain = runtimeData.currentMode == "mode2"?runtimeData.totalTime - runtimeData.passedTime : runtimeData.totalRound - runtimeData.passedRound;
    var resultData = {mode:runtimeData.currentMode,remain:remain,score:runtimeData.score,coins:runtimeData.coins,highestLevel:runtimeData.reachedHighestLevel};
    runtimeData.tempResultData = resultData;
    assetsData.loadResultAssets();
    assetsData.destroyManifest2();
    map.resetGame();
};
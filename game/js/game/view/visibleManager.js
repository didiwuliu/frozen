/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-25
 * Time: 上午10:16
 * To change this template use File | Settings | File Templates.
 */
this.visibleManager = this.visibleManager || {};
(function(){
    this.visibleManager.previousView = null;

    this.visibleManager.gotoPreviousView = function(){
        if(visibleManager.previousView == "game"){
            visibleManager.gotoGame(true);
        }else if(visibleManager.previousView == "mode"){
            visibleManager.gotoMode(true);
        }else if(visibleManager.previousView == "setting"){
            visibleManager.gotoSetting(true);
        }
    }

    this.visibleManager.gotoGame = function(enterInto){
        if(enterInto){
            visibleManager.currentView = "game";
            mouseHandler.responseEvent();

            if(runtimeData.timer){
                runtimeData.timer.start();
            }
            if(runtimeData.warning && runtimeData.currentMode == "mode2"){
                soundManager.play("time_warning",true);
            }
            soundManager.play("bgMusic",true);
            soundManager.pause("prelude",true);
        }else{
            visibleManager.previousView = "game";

            mouseHandler.notResponseEvent();
            if(runtimeData.timer){
                runtimeData.timer.stop();
            }
            if(runtimeData.warning && runtimeData.currentMode == "mode2"){
                soundManager.pause("time_warning",true);
            }
        }
    }
    this.visibleManager.gotoMode = function(enterInto){
        if(enterInto){
            visibleManager.currentView = "mode";
            if(gameUI.settingPanel){
                gameUI.settingPanel.visible = true;
            }

            soundManager.play("prelude",true);
            soundManager.pause("bgMusic",true);

            //解锁
            for(var i = 1;i<=3;i++){
                if(userInfo.playTime["mode"+i].time>=3 && !userInfo.playTime["mode"+(i+1)].unlock){
                    if(gameUI.modePanel){
                        gameUI.modePanel["mode"+(i+1)].setEnable(true,true);
                    }
                    userInfo.playTime["mode"+(i+1)].unlock = true;
                    userProfile.savePlayTimes();
                    break;
                }
            }

        }else{
            visibleManager.previousView = "mode";
            if(gameUI.settingPanel){
                gameUI.settingPanel.visible = false;
            }
        }
    }
    this.visibleManager.gotoSetting = function(enterInto){
        if(enterInto){
            visibleManager.currentView = "setting";
            gameUI.addMask();
            gameUI.settingLayer.jumpToTop();
            gameUI.settingPanel.visible = true;
        }else{
            visibleManager.previousView = "setting";
            //visible
            gameUI.removeMask();
            gameUI.settingPanel.visible = false;
        }
    }

    this.visibleManager.showPanel = function(panelName,params){
        gameUI.addMask();
        gameUI.panelLayer.jumpToTop();
        if(panelName == "store"){
            gameUI.getStorePanel(params);
        }else if(panelName == "achievementInMode"){
            gameUI.getAchievementPanel();
        }else if(panelName == "pause"){
            gameUI.componentLayer.isMouseEnable = false;
            gameUI.tutorialLayer.isMouseEnable = false;
            gameUI.getPausePanel();
        }else if(panelName == "dailyReward"){
            gameUI.getDailyRewardPanel();
        }else if(panelName == "over"){
            gameUI.getOverPanel();
        }else if(panelName == "gameResult"){
            gameUI.getResultPanel();
        }else if(panelName == "achievementOpening"){
            gameUI.getOpeningAchievementPanel();
        }else if(panelName == "leaderBorder"){
            gameUI.getLeaderBoardPanel();
        }else if(panelName == "assistant"){
            gameUI.getAssistantPanel();
        }else if(panelName == "social"){
            gameUI.getSocialPanel();
        }else if(panelName == "language"){
            gameUI.getLanguagePanel();
        }
    }
    this.visibleManager.hidePanel = function(panelName,params){
        gameUI.removeMask();
        if(panelName == "store"){
            gameUI.destroyStorePanel();
        }else if(panelName == "achievementInMode"){
            gameUI.destroyAchievementPanel();
        }else if(panelName == "pause"){
            gameUI.componentLayer.isMouseEnable = true;
            gameUI.tutorialLayer.isMouseEnable = true;
            gameUI.destroyPausePanel();
        }else if(panelName == "dailyReward"){
            gameUI.destroyDailyRewardPanel();
        }else if(panelName == "over"){
            gameUI.destroyOverPanel();
        }else if(panelName == "gameResult"){
            gameUI.destroyResultPanel();
        }else if(panelName == "achievementOpening"){
            gameUI.destroyOpeningAchievementPanel();
        }else if(panelName == "leaderBorder"){
            gameUI.destroyLeaderBoardPanel();
        }else if(panelName == "assistant"){
            gameUI.destroyAssistantPanel();
        }else if(panelName == "social"){
            gameUI.destroySocialPanel();
        }else if(panelName == "language"){
            gameUI.destroyLanguagePanel();
        }
    }
    this.visibleManager.showDialog = function(panel){
        gameUI.addMask();
        gameUI.dialogLayer.jumpToTop();
        gameUI.dialogLayer.addChild(panel);
        gameUI.dialogs.push(panel);
    }
    this.visibleManager.hideDialog = function(){
        gameUI.removeMask();
        var panel = gameUI.dialogs.pop();
        gameUI.dialogLayer.removeChild(panel);
    }
})()

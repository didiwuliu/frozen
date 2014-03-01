/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-1
 * Time: 下午6:23
 * To change this template use File | Settings | File Templates.
 */
//暂停面板
function PausePanel(){
    LSprite.call(this);
    //背景
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.settingPanel);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    //按钮pause
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.pause_f);
    var bp = new LBitmap(bpd,"pause_f");
    bp.x = 203;
    bp.y = 115;
    this.addChild(bp);
    //按钮down
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.down);
    var bp = new LBitmap(bpd);
    var downBtn = new LButton(bp,this.onDown,this);
    downBtn.addChild(bp);
    downBtn.x = 202;
    downBtn.y = 737;
    this.addChild(downBtn);

    //music文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.music_f);
    var bp = new LBitmap(bpd,"music_f");
    bp.setCP(345,267);
    this.addChild(bp);
    //sound文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.sound_f);
    var bp = new LBitmap(bpd,"sound_f");
    bp.setCP(102,267);
    this.addChild(bp);
    //声音按钮
    this.addChild(gameUI.getSoundBtn());
    this.addChild(gameUI.getMusicBtn());
    //help文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.help_text);
    var bp = new LBitmap(bpd,"help_text");
    bp.setCP(102,385);
    this.addChild(bp);
    //about文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.about_text);
    var bp = new LBitmap(bpd,"about_text");
    bp.setCP(345,385);
    this.addChild(bp);
    //restart文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.restart_f);
    var bp = new LBitmap(bpd,"restart_f");
    bp.setCP(102,518);
    this.addChild(bp);
    //menu文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.menu_f);
    var bp = new LBitmap(bpd,"menu_f");
    bp.setCP(345,518);
    this.addChild(bp);
    //language文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.language_text);
    var bp = new LBitmap(bpd,"language_text");
    bp.setCP(102,647);
    this.addChild(bp);
    //按钮help
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help_h);
    var sbp = new LBitmap(sbpd);
    var helpBtn = new LButton(bp,this.onHelp,null,sbp,true);
    helpBtn.x = 166;
    helpBtn.y = 389-25-32;
    this.addChild(helpBtn);
    //按钮about
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.about);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.about_h);
    var sbp = new LBitmap(sbpd);
    var aboutBtn = new LButton(bp,this.onAbout,null,sbp,true);
    aboutBtn.x = 422;
    aboutBtn.y = 390-25-32;
    this.addChild(aboutBtn);
    //按钮menu
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.menu);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.menu_h);
    var sbp = new LBitmap(sbpd);
    var menuBtn = new LButton(bp,this.onMenu,null,sbp,true);
    menuBtn.x = 420;
    menuBtn.y = 540-75;
    this.addChild(menuBtn);

    //按钮restart
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.restart);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.restart_h);
    var sbp = new LBitmap(sbpd);
    var restartBtn = new LButton(bp,this.onRestart,null,sbp,true);
    restartBtn.x = 167;
    restartBtn.y = 540-75;
    this.addChild(restartBtn);

    //按钮language
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.language);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.language_h);
    var sbp = new LBitmap(sbpd);
    var languageBtn = new LButton(bp,this.onLanguage,null,sbp,true);
    languageBtn.x = 173;
    languageBtn.y = 628-30;
    this.addChild(languageBtn);

}
PausePanel.prototype = Object.create(LSprite.prototype);
PausePanel.prototype.onDown = function(event,goOut){
    soundManager.play("confirm_next");
    LGlobal.TweenLite.to(gameUI.pausePanel,800,{y:1136,ease:Bounce.easeOut,onComplete:visibleManager.hidePanel,params:"pause"});
    if(!goOut)
        visibleManager.gotoGame(true);
    if(event)event.stopGoOn = true;
}
PausePanel.prototype.onAbout = function(event){
    //event.stopGoOn = true;
    var panel = new AboutPanel("pausePanel");
    gameUI.uiLayer.addChild(panel);
    gameUI.pausePanel.visible = false;

}
PausePanel.prototype.onMenu = function(event){
    event.stopGoOn = true;
//    gameUI.addMask();
    var confirmPanel = new ConfirmPanel(420);
    confirmPanel.setData(gameConfig.confirmText.gotoMenu.title,gameConfig.confirmText.gotoMenu.content,
        function(event){
            this.yesBtn.destroy();
            this.noBtn.destroy();
            gameUI.pausePanel.isMouseEnable = true;
            event.stopGoOn = true;
            gameUI.removeMask();
            this.removeFromParent();
            if(runtimeData.currentMode == "mode5"){
                tutorialManager.stop();
            }
            visibleManager.gotoGame(false);
            assetsData.destroyManifest2();
            assetsData.loadGotoMenuAssets();

            gameUI.pausePanel.onDown(null,true);
            map.resetGame();
            event.stopGoOn = true;
        },
        function(event){
            this.yesBtn.destroy();
            this.noBtn.destroy();
            gameUI.pausePanel.isMouseEnable = true;
            event.stopGoOn = true;
            gameUI.removeMask();
            this.removeFromParent();
        }
    );
    visibleManager.showDialog(confirmPanel);
    return;
}
PausePanel.prototype.onRestart = function(event){
//    gameUI.addMask();
    event.stopGoOn = true;
    soundManager.play("confirm_next");
    var confirmPanel = new ConfirmPanel(420);
    confirmPanel.setData(gameConfig.confirmText.restart.title,gameConfig.confirmText.restart.content,
        function(event){
            this.yesBtn.destroy();
            this.noBtn.destroy();
            gameUI.pausePanel.isMouseEnable = true;
            event.stopGoOn = true;
            gameUI.removeMask();
            this.removeFromParent();
//            return;

            if(runtimeData.currentMode == "mode5"){
                LGlobal.TweenLite.to(gameUI.pausePanel,800,{y:1230,ease:Bounce.easeOut});
                visibleManager.hidePanel("pause");
                tutorialManager.stop();
                var mode = runtimeData.currentMode;
                map.resetGame();
                tutorialManager.start();
                runtimeData.startGameByMode(mode);

            }else if(userInfo.modes[runtimeData.currentMode].count<1){
                var toStorePanel = new ConfirmPanel(420,"store","store_h","ok","ok_h");
                toStorePanel.setData(gameConfig.confirmText.noStar.title,gameConfig.confirmText.noStar.content,
                    function(event){
                        this.yesBtn.destroy();
                        this.noBtn.destroy();
                        event.stopGoOn = true;
                        gameUI.removeMask();
                        this.removeFromParent();

                        LGlobal.TweenLite.to(gameUI.pausePanel,800,{y:1230,ease:Bounce.easeOut});
                        visibleManager.hidePanel("pause");
                        gameUI.pausePanel.isMouseEnable = true;
//                        map.resetGame();
//                        visibleManager.gotoGame(false);
//                        visibleManager.gotoMode(true);
//                        visibleManager.gotoMode(false);
                        visibleManager.showPanel("store",1);
                    },
                    function(event){
                        this.yesBtn.destroy();
                        this.noBtn.destroy();
                        gameUI.pausePanel.isMouseEnable = true;
                        event.stopGoOn = true;
                        gameUI.removeMask();
                        this.removeFromParent();
                        if(runtimeData.currentMode == "mode5"){
                            tutorialManager.stop();
                        }
                        visibleManager.gotoGame(false);
                        assetsData.destroyManifest2();
                        assetsData.loadGotoMenuAssets();

                        gameUI.pausePanel.onDown(null,true);
                        map.resetGame();
                        event.stopGoOn = true;
                        //返回pausePanel
//                        event.stopGoOn = true;
//                        gameUI.removeMask();
//                        this.removeFromParent();
//                        gameUI.pausePanel.isMouseEnable = true;

//                        LGlobal.TweenLite.to(gameUI.pausePanel,800,{y:1230,ease:Bounce.easeOut});
//                        visibleManager.hidePanel("pause");
//                        var mode = runtimeData.currentMode;
//                        map.resetGame();
//                        runtimeData.startGameByMode(mode);
                    }
                );
//                gameUI.addMask();
//                gameUI.dialogLayer.addChild(toStorePanel);
                visibleManager.showDialog(toStorePanel);

            }else{
                LGlobal.TweenLite.to(gameUI.pausePanel,800,{y:1230,ease:Bounce.easeOut});
                visibleManager.hidePanel("pause");
//                visibleManager.gotoGame(true);
//                tutorialManager.stop();
                var mode = runtimeData.currentMode;
                map.resetGame();
//                runtimeData.startGameByMode(mode);
                runtimeData.selectAssistant(mode);
            }
        },
        function(event){
            this.yesBtn.destroy();
            this.noBtn.destroy();
            gameUI.pausePanel.isMouseEnable = true;
            event.stopGoOn = true;
            gameUI.removeMask();
            this.removeFromParent();
        }
    );
    visibleManager.showDialog(confirmPanel);
}
PausePanel.prototype.onHelp = function(event){
    //event.stopGoOn = true;

    var panel = new HelpPanel("pausePanel");
    gameUI.panelLayer.addChild(panel);
    gameUI.pausePanel.visible = false;
}
PausePanel.prototype.onLanguage = function(event){
    //event.stopGoOn = true;
    var panel = new LanguagePanel("pausePanel");
    gameUI.panelLayer.addChild(panel);
    gameUI.pausePanel.visible = false;
}
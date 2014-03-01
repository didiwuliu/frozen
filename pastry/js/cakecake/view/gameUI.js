/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-19
 * Time: 下午6:47
 * To change this template use File | Settings | File Templates.
 */
this.gameUI = this.gameUI || {};
(function(){
    this.gameUI.uiLayer =  new LSprite();
//分层
    this.gameUI.componentLayer = new LSprite();
    this.gameUI.menuLayer = new LSprite();
    this.gameUI.panelLayer = new LSprite();
    this.gameUI.dialogLayer = new LSprite();
    this.gameUI.tutorialLayer = new LSprite();
    this.gameUI.settingLayer = new LSprite();
    this.gameUI.uiLayer.addChild(gameUI.componentLayer);
    this.gameUI.uiLayer.addChild(gameUI.menuLayer);
    this.gameUI.uiLayer.addChild(gameUI.settingLayer);
    this.gameUI.uiLayer.addChild(gameUI.panelLayer);
    this.gameUI.uiLayer.addChild(gameUI.dialogLayer);
    this.gameUI.uiLayer.addChild(gameUI.tutorialLayer);
//存储确认面板
    this.gameUI.dialogs = [];

    this.gameUI.mask = [];

//初始化显示列表结构
    this.gameUI.initBaseUI = function(){
        cakecake.gameAnimationCanvas = document.getElementById("gameAnimation");//存储老鼠、蛋糕等动画，在LGlobal内初始化，cakecake.animationLayer
        map.initCanvasSize();

        cakecake.gameAnimationContext = cakecake.gameAnimationCanvas.getContext("2d");

        LGlobal.initialize(40);
        //游戏阶段背景、地格背景
        cakecake.mapBgLayer = new LSprite();
        cakecake.mapBgLayer.y = -mapConfig.clipTop;
        cakecake.mapBgLayer.isMouseEnable = false;

        cakecake.gamePhaseBg = new LSprite();
        cakecake.mapBgLayer.addChild(cakecake.gamePhaseBg);
        cakecake.gamePhaseBg.isMouseEnable = false;
        cakecake.gameGridBg = new LSprite();
        cakecake.mapBgLayer.addChild(cakecake.gameGridBg);
        cakecake.gameGridBg.isMouseEnable = false;


        //老鼠、蛋糕 ，动画层
        cakecake.animationLayer = new LSprite();
        cakecake.animationLayer.y = -mapConfig.clipTop;
        cakecake.animationLayer.isMouseEnable = false;

        var animationGlobal = new LGlobal();
        animationGlobal.setCanvas("gameAnimation",true);
        LGlobal.globals["animation"] = animationGlobal;
        LGlobal.globals["animation"].addChild(cakecake.mapBgLayer);
        LGlobal.globals["animation"].addChild(cakecake.animationLayer);
        //ui
        LGlobal.globals["animation"].addChild(gameUI.uiLayer);
        gameUI.uiLayer.y = -mapConfig.clipTop;
    }
        //menuUI
    this.gameUI.initMenuUI = function(){
        gameUI.getMenuPanel();
        gameUI.getSettingPanel();
    }
    this.gameUI.destroyMenuUI = function(){
        gameUI.destroyMenuPanel();
        gameUI.destroySettingPanel();
    }
//游戏UI
    this.gameUI.initGameUI = function(){
//        var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.game_forecastBoard.forecastBorderEff.rectsData}];
//        gameUI.forecastAnimation = LAnimation.getAnimation(assetsData.effectAnimation.game_forecastBoard.image,animationArr,"animation",1,false);
//        gameUI.forecastAnimation.x = 15;gameUI.forecastAnimation.y = 176;
//        gameUI.componentLayer.addChild(gameUI.forecastAnimation);
        //地图背景
        var bpd = new LBitmapData(assetsData.game.image,assetsData.game.game_bg_smaller);
        var bp = new LBitmap(bpd);
        bp.scaleX = bp.scaleY = 2;
        cakecake.mapBgLayer.addChild(bp,true);
        //商店组件
        gameUI.shop = new ShopButton();
        gameUI.shop.x = 402;
        gameUI.shop.y = 246;
        gameUI.componentLayer.addChild(gameUI.shop);

        //合成提示容器
        gameUI.combinedTipContainer = new LSprite();
        gameUI.combinedTipContainer.y = 328;//328
        gameUI.combinedTipContainer.x = 30;
        gameUI.componentLayer.addChild(gameUI.combinedTipContainer);
        //时间线
        gameUI.timeLine = new TimeLine();
        gameUI.timeLine.y = 188;
        gameUI.timeLine.x = 171;
        gameUI.timeLine.visible = false;
        gameUI.componentLayer.addChild(gameUI.timeLine);
        //goal
//        gameUI.goalBar = new GoalsBar();
//        gameUI.goalBar.visible = true;
//        gameUI.goalBar.isMouseEnable = false;
//        gameUI.componentLayer.addChild(gameUI.goalBar);
        // NEXT 文本
        var bpd = new LBitmapData(assetsData.text.image,assetsData.text.next_f);
        cakecake.nextBp = new LBitmap(bpd,"next_f");
        cakecake.nextBp.setCP(83,188);
        cakecake.animationLayer.addChild(cakecake.nextBp);
        //游戏目标框文本
        gameUI.targetText = new LTextField();
        gameUI.targetText.text = "game target";
        gameUI.targetText.size = 30;
        gameUI.targetText.font_weight = "bold";
        gameUI.targetText.color = "#203d02";
        gameUI.targetText.textAlign = "center";
        gameUI.targetText.x = 390;
        gameUI.targetText.y = 180;
        gameUI.targetText.visible = false;
        gameUI.componentLayer.addChild(gameUI.targetText);

        //游戏模式图标
        gameUI.modeIcon = new ModeIcon();
        gameUI.modeIcon.visible = false;
        gameUI.modeIcon.addChild(gameUI.modeIcon);
        gameUI.componentLayer.addChild(gameUI.modeIcon);
        //游戏分数框
        gameUI.scoreText = new LTextField();
        gameUI.scoreText.text = "0";
        gameUI.scoreText.size = 30;
        gameUI.scoreText.font_weight = "bold";
        gameUI.scoreText.color = "#612603";
        gameUI.scoreText.textAlign = "center";
        gameUI.scoreText.x = 278;
        gameUI.scoreText.y = 250;
        gameUI.scoreText.visible = true;
        gameUI.componentLayer.addChild(gameUI.scoreText);
        //销毁蛋糕价格提示
        gameUI.destructionCostBg = new LSprite();
        gameUI.destructionCostBg.x = 524;
        gameUI.destructionCostBg.y = 964;
        var bpd = new LBitmapData(assetsData.game.image,assetsData.game.dustbin_money);
        var bp = new LBitmap(bpd);
        gameUI.destructionCostBg.addChild(bp);

        gameUI.destructionCost = new LTextField();
        gameUI.destructionCost.text = runtimeData.destructionCost;
        gameUI.destructionCost.size = 25;
        gameUI.destructionCost.x = 49;
        gameUI.destructionCost.y = -5;
        gameUI.destructionCost.font_weight = "bold";
        gameUI.destructionCost.color = "#203d02";
        gameUI.destructionCost.textAlign = "center";
        gameUI.destructionCostBg.addChild(gameUI.destructionCost);

        gameUI.componentLayer.addChild(gameUI.destructionCostBg);
        //暂停按钮
        var bpd = new LBitmapData(assetsData.game.image,assetsData.game.stop);
        var bp = new LBitmap(bpd);
        var bpdh = new LBitmapData(assetsData.game.image,assetsData.game.stop_h);
        var bph = new LBitmap(bpdh);
        bp.hitRect = new LRectangle(-7,-7,76,75);
        bph.hitRect = new LRectangle(-7,-7,76,75);
        gameUI.pauseBtn = new LButton(bp,gameTools.onPause,this,bph,true,"pause_button");
        gameUI.pauseBtn.x = 550;
        gameUI.pauseBtn.y = 100;
        gameUI.componentLayer.addChild(gameUI.pauseBtn);
        //刷新商店cakeItemRender价格
        if(gameUI.storePanel){
            gameUI.storePanel.ItemsGoods.refreshData(util.clone(gameConfig.items));
        }
    }
    this.gameUI.destroyGameUI = function(){
//        gameUI.componentLayer.removeChild(gameUI.forecastAnimation);
//        gameUI.forecastAnimation = null;
        //商店组件
        gameUI.componentLayer.removeChild(gameUI.shop);
        gameUI.shop.destroy();
        gameUI.shop = null;
        //destroy goal bar
        if(gameUI.goalBar){
            gameUI.componentLayer.removeChild(gameUI.goalBar);
            gameUI.goalBar.destroy();
            gameUI.goalBar = null;
        }
        //合成提示容器
        gameUI.componentLayer.removeChild(gameUI.combinedTipContainer);
        gameUI.combinedTipContainer = null;
        //时间线
        gameUI.componentLayer.removeChild(gameUI.timeLine);
        gameUI.timeLine = null;
        //游戏目标框文本
        gameUI.componentLayer.removeChild(gameUI.targetText);
        gameUI.targetText = null;

        //游戏模式图标
        gameUI.componentLayer.removeChild(gameUI.modeIcon);
        gameUI.modeIcon = null;
        //游戏分数框
        gameUI.componentLayer.removeChild(gameUI.scoreText);
        gameUI.scoreText = null;

        //销毁蛋糕价格提示
        gameUI.destructionCostBg.removeAllChild();
        gameUI.componentLayer.addChild(gameUI.destructionCostBg);
        gameUI.destructionCost = null;
        gameUI.destructionCostBg = null;
        //暂停按钮
        gameUI.componentLayer.removeChild(gameUI.pauseBtn);
        gameUI.pauseBtn.destroy();
        gameUI.pauseBtn = null;
    }
//loadingUI
    this.gameUI.initLoadingUI = function(){
        gameUI.loadingPanle = new LoadingPanel();
        gameUI.panelLayer.addChild(gameUI.loadingPanle );
    }
//蛋糕提示框
    this.gameUI.initTipContainer = function(){
        cakecake.tipContainer = new LSprite();
        cakecake.tipContainer.centerX = 54;
        cakecake.tipContainer.centerY = 50;
        cakecake.animationLayer.addChild(cakecake.tipContainer);
        LGlobal.TweenLite.to(cakecake.tipContainer,500,{scaleX:1.4,scaleY:1.4,yoyo:true});

        cakecake.forecastTipContainer = new LSprite();
        cakecake.forecastTipContainer.x = 38;
        cakecake.forecastTipContainer.y = 208;
        cakecake.animationLayer.addChild(cakecake.forecastTipContainer);

        cakecake.combineTipContainer = new LSprite();
        cakecake.combineTipContainer.scaleX = cakecake.combineTipContainer.scaleY = 0.65;
        cakecake.combineTipContainer.centerX = 54;
        cakecake.combineTipContainer.centerY = 50;
        cakecake.combineTipContainer.x = 30;
        cakecake.combineTipContainer.y = 292;
        cakecake.animationLayer.addChild(cakecake.combineTipContainer);

        cakecake.combineResultTipContainer = new LSprite();
        cakecake.combineResultTipContainer.scaleX = cakecake.combineResultTipContainer.scaleY = 0.65;
        cakecake.combineResultTipContainer.centerX = 54;
        cakecake.combineResultTipContainer.centerY = 50;
        cakecake.combineResultTipContainer.x = 130;
        cakecake.combineResultTipContainer.y = 292;
        cakecake.animationLayer.addChild(cakecake.combineResultTipContainer);
    }

//顶部星星，淡入淡出
    this.gameUI.initStarEffectInGame = function(){
        return;
        var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_fadeInOutStar.star.rectsData}];
        var animation = LAnimation.getAnimation(assetsData.effectAnimation.menu_fadeInOutStar.image,animationArr,"animation",6,false);
        animation.scaleX = animation.scaleY = 1.3;
        animation.x = 25;animation.y = -44;
        animation.stop = true;
        //animation.setCurrentFrame(4);
        gameUI.uiLayer.addChild(animation);

        var animation2 = LAnimation.getAnimation(assetsData.effectAnimation.menu_fadeInOutStar.image,animationArr,"animation",6,false);
        animation2.x = 325;animation.y = -24;
        animation2.stop = true;
        animation2.alpha = 0;
        animation2.setCurrentFrame(4);
        gameUI.uiLayer.addChild(animation2);
        function a(){
            var _alpha = animation.alpha?0:1;
            if(_alpha){
                if(animation.currentFrame>5){
                    animation.currentFrame = 0;
                }
                animation.setCurrentFrame(animation.currentFrame+1);
            }
            LGlobal.TweenLite.to(animation,1500,{alpha:_alpha});
        }
        function b(){
            var _alpha2 = animation2.alpha?0:1;
            if(_alpha2){
                if(animation2.currentFrame>5){
                    animation2.currentFrame = 0;
                }
                animation2.setCurrentFrame(animation2.currentFrame+1);
            }
            LGlobal.TweenLite.to(animation2,1500,{alpha:_alpha2});
        }
        var timer = new LTimer(1.5,a,this);
        timer.start();

        LTimer.waitToDo(0.9,function(){
            var timer = new LTimer(1.5,b,this);
            timer.start();
        },this)
    }
    //获得面板。
    this.gameUI.getMenuPanel = function(){
        //ModePanel
        if( !gameUI.modePanel){
            gameUI.modePanel =  new ModePanel();
            gameUI.menuLayer.addChild(gameUI.modePanel);
//            gameUI.modePanel.isMouseEnable = false;
        }
    }
    this.gameUI.destroyMenuPanel = function(){
       if(gameUI.modePanel){
            gameUI.menuLayer.removeChild(gameUI.modePanel);
            gameUI.modePanel.destroy();
            gameUI.modePanel =  null;
       }

    }
    this.gameUI.getSettingPanel = function(){
        //settingPanel
        if(!gameUI.settingPanel){
            gameUI.settingPanel =  new SettingPanel();
            gameUI.settingPanel.y = 1072-mapConfig.clipTop;//1072
            gameUI.settingPanel.x = 37;
            gameUI.settingLayer.addChild(gameUI.settingPanel);
            gameUI.settingPanel.visible = false;
        }
    }
    this.gameUI.destroySettingPanel = function(){
        gameUI.settingLayer.removeChild(gameUI.settingPanel);
        gameUI.settingPanel =  null;
    }

    this.gameUI.getPausePanel = function(){
        if(!gameUI.pausePanel){
            gameUI.pausePanel =  new PausePanel();
            gameUI.pausePanel.y = 1136;
            gameUI.pausePanel.x = 37;
        }
        gameUI.pausePanel.visible = true;
        gameUI.panelLayer.addChild(gameUI.pausePanel);
        LGlobal.TweenLite.to(gameUI.pausePanel,800,{y:123,ease:Bounce.easeOut});
        visibleManager.gotoGame(false);
    }
    this.gameUI.destroyPausePanel = function(){
        if(gameUI.pausePanel){
            gameUI.panelLayer.removeChild(gameUI.pausePanel);
            gameUI.pausePanel.visible = false;
        }
    }
    this.gameUI.getStorePanel = function(pageIndex){
        if(!gameUI.storePanel){
            gameUI.storePanel =  new StorePanel();
            gameUI.storePanel.y = 168;
            gameUI.storePanel.x = 27;
            gameUI.storePanel.initialPrice();
        }
        gameUI.storePanel.setCurrentPage(pageIndex?pageIndex:0);
        gameUI.panelLayer.addChild(gameUI.storePanel);
        //变灰色
        if(pageIndex == 1 || pageIndex == 2){
           // gameUI.storePanel.ItemsGoods.gray = true;
            gameUI.storePanel.ItemsGoods.setEnable(false);
//            gameUI.storePanel.ItemsGoods.isMouseEnable = false;
        }else{
            gameUI.storePanel.ItemsGoods.setEnable(true);
//            gameUI.storePanel.ItemsGoods.isMouseEnable = true;
        }
    }
    this.gameUI.destroyStorePanel = function(){
        if(gameUI.storePanel){
            gameUI.panelLayer.removeChild(gameUI.storePanel);
        }

    }
    this.gameUI.getAchievementPanel = function(){
        console.log("getAchievementPanel....")
        if(!gameUI.achievementPanelInMode){
            gameUI.achievementPanelInMode =  new AchievementPanelInMode();
            gameUI.achievementPanelInMode.initializeItem();
            gameUI.achievementPanelInMode.y = 168;
            gameUI.achievementPanelInMode.x = 27;
            gameUI.panelLayer.addChild(gameUI.achievementPanelInMode);
        }
    }
    this.gameUI.destroyAchievementPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.achievementPanelInMode);
        gameUI.achievementPanelInMode.destroy();
        gameUI.achievementPanelInMode =  null;
    }
    this.gameUI.getLeaderBoardPanel = function(){
        if(!gameUI.leaderBoardPanel){
            gameUI.leaderBoardPanel =  new LeaderBoardPanel();
            gameUI.leaderBoardPanel.y = 168;
            gameUI.leaderBoardPanel.x = 27;
        }
        gameUI.panelLayer.addChild(gameUI.leaderBoardPanel);
    }
    this.gameUI.destroyLeaderBoardPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.leaderBoardPanel);
//        gameUI.leaderBoardPanel =  null;
    }

    this.gameUI.getDailyRewardPanel = function(){
        gameUI.dailyRewardPanel =  new DailyRewardPanel();
        gameUI.dailyRewardPanel.x = 27;
        gameUI.dailyRewardPanel.y = 133;
        gameUI.panelLayer.addChild(gameUI.dailyRewardPanel);
    }
    this.gameUI.destroyDailyRewardPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.dailyRewardPanel);
        gameUI.dailyRewardPanel =  null;
    }
    this.gameUI.getOverPanel = function(){
//        if(!gameUI.overPanel){
        gameUI.overPanel =  new OverPanel();
        gameUI.overPanel.y = 168;
        gameUI.overPanel.x = 27;
//        }
        gameUI.panelLayer.addChild(gameUI.overPanel);
    }
    this.gameUI.destroyOverPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.overPanel);
        gameUI.overPanel =  null;
    }
    this.gameUI.getResultPanel = function(){
        if(!gameUI.resultPanel){
            gameUI.resultPanel =  new ResultPanel();
            gameUI.resultPanel.y = 168;
            gameUI.resultPanel.x = 27;
        }
        gameUI.panelLayer.addChild(gameUI.resultPanel);
    }
    this.gameUI.destroyResultPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.resultPanel);
        gameUI.resultPanel.destroy();
        gameUI.resultPanel =  null;
    }
    this.gameUI.getOpeningAchievementPanel = function(){
        if(!gameUI.achievementPanelOpening){
            gameUI.achievementPanelOpening =  new AchievementPanel();
            gameUI.achievementPanelOpening.y = 168;
            gameUI.achievementPanelOpening.x = 27;
        }
        gameUI.panelLayer.addChild(gameUI.achievementPanelOpening );
    }
    this.gameUI.destroyOpeningAchievementPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.achievementPanelOpening );
        gameUI.achievementPanelOpening  =  null;
    }
    this.gameUI.getAssistantPanel = function(){
        if(!gameUI.assistantPanel){
            gameUI.assistantPanel =  new AssistantPanel();
            gameUI.assistantPanel.y = 168;
            gameUI.assistantPanel.x = 27;
        }
        gameUI.panelLayer.addChild(gameUI.assistantPanel );
    }
    this.gameUI.destroyAssistantPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.assistantPanel);
        gameUI.assistantPanel.destroy();
        gameUI.assistantPanel  =  null;
    }
    this.gameUI.getSocialPanel = function(){
        if(!gameUI.socialPanel){
            gameUI.socialPanel =  new SocialPanel();
            gameUI.socialPanel.y = 168;
            gameUI.socialPanel.x = 27;
        }
        gameUI.panelLayer.addChild(gameUI.socialPanel );
    }
    this.gameUI.destroySocialPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.socialPanel );
        //gameUI.achievementPanelOpening  =  null;
    }
    this.gameUI.getLanguagePanel = function(){
        if(!gameUI.languagePanel){
            gameUI.languagePanel =  new LanguagePanel();
            gameUI.languagePanel.y = 168;
            gameUI.languagePanel.x = 27;
        }
        gameUI.panelLayer.addChild(gameUI.languagePanel );
    }
    this.gameUI.destroyLanguagePanel = function(){
        gameUI.panelLayer.removeChild(gameUI.languagePanel );
        //gameUI.achievementPanelOpening  =  null;
    }
    this.gameUI.getSoundBtn = function(){
        if(!gameUI.soundBtn){
            gameUI.soundBtn = new VolumeButton("sound");
            gameUI.soundBtn.x = 182;
            gameUI.soundBtn.y = 239;
        }
        return gameUI.soundBtn;
    }
    this.gameUI.getMusicBtn = function(){
        if(!gameUI.musicBtn){
            gameUI.musicBtn = new VolumeButton("music");
            gameUI.musicBtn.x = 438;
            gameUI.musicBtn.y = 239;
        }
        return gameUI.musicBtn;
    }

    this.gameUI.addWaitingPanel = function(){
        gameUI.waitingMask = new BackgroundMask();
        gameUI.panelLayer.addChild(gameUI.waitingMask);
        gameUI.waitingMask.addWaiting();
    }
    this.gameUI.removeWaitingPanel = function(){
        gameUI.panelLayer.removeChild(gameUI.waitingMask);
        gameUI.waitingMask.removeWaiting();
    }
    //新手引导遮罩
    this.gameUI.addTutorialMask = function(){
        gameUI.tutorialMask = new BackgroundMask();
        gameUI.tutorialLayer.addChild(gameUI.tutorialMask);
    }
    this.gameUI.removeTutorialMask = function(){
        gameUI.tutorialLayer.removeChild(gameUI.tutorialMask);
        gameUI.tutorialMask = null;
    }
    //添加金币信息
    this.gameUI.getCoinsInfoComponent = function(){
        //金币信息组件，显示在store和assistant面板内。
        if(!gameUI.coinInfoComponent){
            gameUI.coinInfoComponent = new CoinInfoComponent();
            gameUI.coinInfoComponent.x =65;
            gameUI.coinInfoComponent.y =128;
//            gameUI.coinInfoComponent.visible = false;
//            gameUI.coinInfoComponent.isMouseEnable = false;
        }
        return gameUI.coinInfoComponent;

    }
    //面板底板遮罩
    this.gameUI.addMask = function(shield){
        if(shield){
//            if(gameUI.modePanel)
//                gameUI.modePanel.isMouseEnable = false;
            mouseHandler.notResponseEvent();
        }

        var mask = new BackgroundMask();
        gameUI.mask.push(mask);
        gameUI.uiLayer.addChild(mask);
    }
    this.gameUI.removeMask = function(beShielded){
        if(beShielded){
//            if(gameUI.modePanel)
//                gameUI.modePanel.isMouseEnable = true;
            mouseHandler.responseEvent();
        }

        if(gameUI.mask.length){
            var mask = gameUI.mask.pop();
            gameUI.uiLayer.removeChild(mask);
        }
    }

    this.gameUI.reset = function(){
        gameUI.scoreText.text = "0";
        gameUI.targetText.text = "";
        gameUI.targetText.visible = true;
        gameUI.destructionCost.text = gameConfig.destructionCost;
//        gameUI.destructionCostBg.visible = false;
        gameUI.timeLine.reset();
        gameUI.destroyGameUI();
        //inittipContainer
        cakecake.tipContainer.removeAllChild();

        cakecake.forecastTipContainer.removeAllChild();
        cakecake.animationLayer.removeChild(cakecake.nextBp);
        cakecake.nextBp = null;

        cakecake.combineTipContainer.removeAllChild();
        cakecake.combineResultTipContainer.removeAllChild();
        cakecake.gamePhaseBg.removeAllChild();
    }
}())




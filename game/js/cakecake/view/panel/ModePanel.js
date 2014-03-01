/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午5:03
 * To change this template use File | Settings | File Templates.
 */
function ModePanel(){
    LSprite.call(this);
    this.modes = [];
    //背景
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.menu_bg);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    //4个模式
    // function
    this.mode1 = new ModeBtn(assetsData.menu.image,assetsData.menu.model_btn1,null,assetsData.menu.model_btn1_h,null,assetsData.menu.model_btn1_lock,null,assetsData.menu.light,null,assetsData.menu.start_h,null,assetsData.menu.modes_name1,assetsData.text.image,assetsData.text.modes_name1_text,"mode1");
    this.mode1.x = 38;
    this.mode1.y = 191;
    this.addChild(this.mode1);

    this.mode2 = new ModeBtn(assetsData.menu.image,assetsData.menu.model_btn2,null,assetsData.menu.model_btn2_h,null,assetsData.menu.model_btn2_lock,null,assetsData.menu.light,null,assetsData.menu.start_h,null,assetsData.menu.modes_name2,assetsData.text.image,assetsData.text.modes_name2_text,"mode2");
    this.mode2.x = 327;
    this.mode2.y = 191;
    this.addChild(this.mode2);

    this.mode3 = new ModeBtn(assetsData.menu.image,assetsData.menu.model_btn3,null,assetsData.menu.model_btn3_h,null,assetsData.menu.model_btn3_lock,null,assetsData.menu.light,null,assetsData.menu.start_h,null,assetsData.menu.modes_name3,assetsData.text.image,assetsData.text.modes_name3_text,"mode3");
    this.mode3.x = 38;
    this.mode3.y = 510;
    this.addChild(this.mode3);

    this.mode4 = new ModeBtn(assetsData.menu.image,assetsData.menu.model_btn4,null,assetsData.menu.model_btn4_h,null,assetsData.menu.model_btn4_lock,null,assetsData.menu.light,null,assetsData.menu.start_h,null,assetsData.menu.modes_name4,assetsData.text.image,assetsData.text.modes_name4_text,"mode4");
    this.mode4.x = 327;
    this.mode4.y = 510;
    this.addChild(this.mode4);
    this.modes.push(this.mode1,this.mode2,this.mode3,this.mode4);
    //商店，-------------排名，练习，分享，成
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_btn_animation.model2_btn1.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.menu_btn_animation.image,animationArr,"animation",5,true);
    animation.stop = true;
    var sbpd = new LBitmapData(assetsData.effectAnimation.menu_btn_animation.image,assetsData.effectAnimation.menu_btn_animation.model2_btn1_h.rectsData[0]);
    var sbp = new LBitmap(sbpd);
    // bp.setHitRect(40,30,120,73);
    this.shopBtn = new LButton(animation,this.openShop,null,sbp,true);
    this.shopBtn.x = -2;
    this.shopBtn.y = 785;
    this.addChild(this.shopBtn);
    //排名
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_btn_animation.model2_btn2.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.menu_btn_animation.image,animationArr,"animation",8,true);
    animation.stop = true;
    var sbpd = new LBitmapData(assetsData.effectAnimation.menu_btn_animation.image,assetsData.effectAnimation.menu_btn_animation.model2_btn2_h.rectsData[0]);
    var sbp = new LBitmap(sbpd);
    // bp.setHitRect(40,30,120,73);
    this.rankingBtn = new LButton(animation,this.openRanking,null,sbp,true);
    this.rankingBtn.x = 113;
    this.rankingBtn.y = 797;
    this.addChild(this.rankingBtn);
    //练习按钮
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.model3_btn);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.menu.image,assetsData.menu.model3_btn_h);
    var sbp = new LBitmap(sbpd);
    this.practiceBtn = new LButton(bp,this.openPractice,null,sbp,true,null);
    this.practiceBtn.x = 241;
    this.practiceBtn.y = 810;
    this.addChild(this.practiceBtn);
    //练习文字背景
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.practice);
    var bp = new LBitmap(bpd);
    bp.x = 231;
    bp.y = 909;
    this.addChild(bp);
    //练习文字
    var sbpt = new LBitmapData(assetsData.text.image,assetsData.text.practice_text);
    var sbt = new LBitmap(sbpt,"practice_text");
    sbt.setCP(317,939);
    this.addChild(sbt);

    //分享
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_btn_animation.model2_btn3.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.menu_btn_animation.image,animationArr,"animation",3,true);
    animation.stop = true;
    var sbpd = new LBitmapData(assetsData.effectAnimation.menu_btn_animation.image,assetsData.effectAnimation.menu_btn_animation.model2_btn3_h.rectsData[0]);
    var sbp = new LBitmap(sbpd);
    // bp.setHitRect(40,30,120,73);
    this.shareBtn = new LButton(animation,this.openSocial,null,sbp,true);
    this.shareBtn.x = 400;
    this.shareBtn.y = 797;
    this.addChild(this.shareBtn);
    //成就
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_btn_animation.model2_btn4.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.menu_btn_animation.image,animationArr,"animation",4,true);
    var sbpd = new LBitmapData(assetsData.effectAnimation.menu_btn_animation.image,assetsData.effectAnimation.menu_btn_animation.model2_btn4_h.rectsData[0]);
    var sbp = new LBitmap(sbpd);
    // bp.setHitRect(40,30,120,73);
    this.achievementBtn = new LButton(animation,this.openAchievement,null,sbp,true);
    this.achievementBtn.x = 517;
    this.achievementBtn.y = 785;
    this.addChild(this.achievementBtn);
}
ModePanel.prototype = Object.create(LSprite.prototype);
ModePanel.prototype.recoverOtherState = function(mode){
    for(var m in this.modes){
        if(mode == this.modes[m])
            continue;
        this.modes[m].shopSprite.visible = false;//在显示商店状态下，如果点击其他modebtn，也显示商店，则需要清除上一个商店。
        this.modes[m].modeBtn.visible = true;
//        if(this.modes[m].selected){//从通往商店状态，切换到未被选中状态
            this.modes[m].setState(null,false);
//        }
    }
}
ModePanel.prototype.openShop = function(){
    // soundManager.play("Break");
//    gameUI.storePanel.setCurrentPage(2);
    visibleManager.gotoMode(false);
    visibleManager.showPanel("store",2);
//    alert("nativeExtensionObjectAvailable: "+CocoonJS.Store.nativeExtensionObjectAvailable);
//    alert("canPurchase: "+CocoonJS.Store.canPurchase());
//    alert("getStoreType: "+CocoonJS.Store.getStoreType());
//    if(store.products){alert("products: "+store.products.length);}
//    for(var key in store.products){
//        for(var key2 in store.products[key]){
//            alert(key2+": "+store.products[key][key2]);
//        }
//    }
}
ModePanel.prototype.openRanking = function(){

    visibleManager.gotoMode(false);
    visibleManager.showPanel("leaderBorder");
    gameUI.leaderBoardPanel.setData("mode1",0);
}
ModePanel.prototype.openSocial = function(){
//    alert("Activated on next versiion");
//    return;
    visibleManager.gotoMode(false);
    visibleManager.showPanel("social");
}
ModePanel.prototype.openAchievement = function(){
    visibleManager.gotoMode(false);
    visibleManager.showPanel("achievementInMode");
}
ModePanel.prototype.openPractice = function(){
    soundManager.play("confirm_next");
    tutorialManager.start();
    //runtimeData.startGameByMode("mode5");
    assetsData.loadGameAssets("mode5");
}
ModePanel.prototype.destroy = function(){
    //destroy modebtn
    while(this.modes.length){
        var modeBtn = this.modes.shift();
        modeBtn.destroy()
    };
    this.mode1 = this.mode2 = this.mode3 = this.mode4 = null;
    this.modes = null;

    //destroy for button at bottom
    this.shopBtn.destroy();
    this.achievementBtn.destroy();
    this.shareBtn.destroy();
    this.practiceBtn.destroy();
    this.rankingBtn.destroy();

    this.removeAllChild();
}

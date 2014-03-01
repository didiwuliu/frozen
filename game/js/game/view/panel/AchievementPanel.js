/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-29
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */
function AchievementPanel(){
    LSprite.call(this);
    //背景
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.result);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    //面板头
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.acheievement_top);
    var bp = new LBitmap(bpd);
    bp.x = -25;
    bp.y = -83;
    this.addChild(bp);

    //黑色背景框
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.achievement_bg);
    var bp = new LBitmap(bpd);
    bp.y = 296+13;
    bp.x = 65;
    bp.scaleY = 1.1;
    this.addChild(bp);
    //congratulations
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.congratulations);
    var bp = new LBitmap(bpd,"congratulations");
    bp.setCP(320-27,167);
//    bp.x = 55;
//    bp.y = 180-18-13;
    this.addChild(bp);
    //new achievement
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.new_achievements);
    var bp = new LBitmap(bpd,"new_achievements");
    bp.setCP(320-27,183+68+20)
    this.addChild(bp);
    //分割线-------------------------------
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.line);
    var bp = new LBitmap(bpd);
    bp.x = 77;
    bp.y = 255-18-13;
    this.addChild(bp);
    //itemContainer
    this.itemContainer = new LSprite();
    this.itemContainer.viewPort = new LRectangle(0,0,450,322+18+13);
    this.addChild(this.itemContainer);
    this.itemContainer.x = 79;
    this.itemContainer.y = 353-18-13;
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
    this.addChild(this.okBtn);
    this.openedCount = 0;

    this.addEventListener(LMouseEvent.MOUSE_DOWN,this.onScrollDown,this);
}
AchievementPanel.prototype = Object.create(LSprite.prototype);
AchievementPanel.prototype.onShare = function(event){
    event.stopGoOn = true;
    var message = string.currentString[gameConfig.stringOfShare.FB_Achievement_body_01.name];
    var linkCaption = "cake & cake";
    var url = "http://zhangchunsheng.github.io/cakeandcake/images/Achievement/ad01.png";
    var mediaURL = url;
    var linkURL = string.currentString[gameConfig.stringOfShare.FB_general_body_01.name];
    var linkText = string.currentString[gameConfig.stringOfShare.FB_Achievement_title_01.name];

    // var coins = gameConfig.dailyReward[userInfo.login.successiveLoginTime-1];
    var achievementCount = 0;
    for(var key in userInfo.achievements){
        if(userInfo.achievements[key])achievementCount++;
    }
    message = message.replace(/{TOTAL_ACHIEVEMENTS}/,achievementCount);
    facebook.publishAMessage(message, mediaURL, linkURL, linkText, linkCaption);
}
AchievementPanel.prototype.onScrollDown = function(event){
    if(this.achievementsList.showLength > this.achievementsList.items.length){
        return;
    }
    this.addEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove,this);
    this.addEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp,this);

    this.startPoint = {x:event.x,y:event.y};
}
AchievementPanel.prototype.onScrollUp = function(event){
    this.removeEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove);
    this.removeEventListener(LTouchEvent.TOUCH_MOVE,this.onScrollMove);

    this.removeEventListener(LTouchEvent.TOUCH_END,this.onScrollUp);
    this.removeEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp);

    this.achievementsList.y = -(this.achievementsList.itemHeight+10)*this.achievementsList.startIndex;
    delete this.startPoint;
}
AchievementPanel.prototype.onScrollMove = function(event){
    if(!this.startPoint)return;
    var itemContainer = this.achievementsList;
    var ty = event.y - this.startPoint.y;
    itemContainer.y += ty;
    if(itemContainer.y>0){
        itemContainer.y = 0;
    }else if(itemContainer.y < -((itemContainer.itemHeight+10)*(itemContainer.items.length - itemContainer.showLength+1))){
        itemContainer.y = -((itemContainer.itemHeight+10)*(itemContainer.items.length - itemContainer.showLength+1));
    }
    this.startPoint = {x:event.x,y:event.y};

    var si = ~~Math.abs(itemContainer.y/(itemContainer.itemHeight+10));
    itemContainer.showItemFrom(si);
}
AchievementPanel.prototype.openAchievements = function(achievementsList){
    if(this.openedCount >= achievementsList.length){
        return;
    }
    var item = achievementsList[this.openedCount];
    item.open(
        function(){
            this.removeFromParent();
            this.openAnimation = null;
            gameUI.achievementPanelOpening.openAchievements(gameUI.achievementPanelOpening.achievementsList.items);
        }
    );
    this.openedCount++;
}
AchievementPanel.prototype.setData = function(achievementArr){
    var ac = [];
    for(var key in achievementArr){
        ac.push(gameConfig.achievements[achievementArr[key]]);
    }
    this.achievementsList = new ItemsContainer(ac,AchievementItemOpening,7,80,0,436,"mode2");
    this.achievementsList.showLength = 5;
    this.achievementsList.initializeItem();
    this.achievementsList.showItemFrom(0);
    this.itemContainer.addChild( this.achievementsList);

    this.openAchievements(this.achievementsList.items);

}
AchievementPanel.prototype.onOK = function(event){
    event.stopGoOn = true;
    visibleManager.hidePanel("achievementOpening");
    for(var key in this.achievementsList.data){
        var obj = this.achievementsList.data[key];
        if(gamecenter && gamecenter.submitAchievement){
            gamecenter.submitAchievement(obj.id);
        }
    }
    this.destroy();

    assetsData.destroyManifest3();
    //visibleManager.gotoMode(true);
    assetsData.loadGotoMenuAssets();
}
AchievementPanel.prototype.destroy = function(){
    this.removeAllChild();
    this.itemContainer.removeAllChild();
    this.achievementsList.removeAllChild();
    this.openedCount = 0;
    this.achievementsList = null;

    this.okBtn.destroy();
    this.shareBtn.destroy();
}

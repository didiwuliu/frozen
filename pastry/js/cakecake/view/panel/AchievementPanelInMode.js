/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-28
 * Time: 下午4:47
 * To change this template use File | Settings | File Templates.
 */
function AchievementPanelInMode(){
    CommonSubPanel.call(this);
    this.init();
    this.initContent();
    this.addEventListener(LMouseEvent.MOUSE_DOWN,this.onScrollDown,this);
}
AchievementPanelInMode.prototype = Object.create(CommonSubPanel.prototype);
AchievementPanelInMode.prototype.onScrollDown = function(event){
    this.addEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove,this);
    this.addEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp,this);

    this.startPoint = {x:event.x,y:event.y};
}
AchievementPanelInMode.prototype.onScrollUp = function(event){
    this.removeEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove);
    this.removeEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp);

    this.removeEventListener(LTouchEvent.TOUCH_MOVE,this.onScrollMove);
    this.removeEventListener(LTouchEvent.TOUCH_END,this.onScrollUp);

    this.achievementsList.y = -(this.achievementsList.itemHeight+10)*this.achievementsList.startIndex;
    delete this.startPoint;
}
AchievementPanelInMode.prototype.onScrollMove = function(event){
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

AchievementPanelInMode.prototype.initContent = function(){
    //achievements文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.achivevments);
    var bp = new LBitmap(bpd,"achivevments");
    bp.setCP(292,79);
    this.addChild(bp);
    //黑色背景框
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.message_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,456-28,436+24-28);
    bp.y = 304-24;
    bp.x = 66;
    this.addChild(bp);
    //AchievementList
    this.achievementsList = new ItemsContainer(gameConfig.achievements,BaseAchievementItem,7,80,0,436,"mode1");
    this.achievementsList.showLength = 6;
    this.achievementsContainer = new LSprite();
    this.achievementsContainer.viewPort = new LRectangle(0,0,450,413+24);
    this.achievementsContainer.addChild(this.achievementsList);

    this.achievementsContainer.x = 76;
    this.achievementsContainer.y = 319-24;
    this.addChild(this.achievementsContainer);

    //localButton
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.local);
    var bp = new LBitmap(bpd,"local");
    bp.setCP(135,188);
    this.addChild(bp);
    //gameCenterButton
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.gamesenter);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.gamesenter_h);
    var bph = new LBitmap(bpdh);
    this.gameCenterBtn = new LButton(bp,function(){
        gamecenter.socialService.showAchievements();
        console.log("gameCenter");
    },this,bph,true);
    this.addChild(this.gameCenterBtn);
    this.gameCenterBtn.x = 262;
    this.gameCenterBtn.y = 173-24;
    //成就完成数量
    var count = 0;
    for(var key in userInfo.achievements){
        if(userInfo.achievements[key])
            count++;
    }
    this.finishedCount = new LTextField();
    this.finishedCount.text = count+"/32"+" "+string.currentString.s188;
    this.finishedCount.size =24;
    this.finishedCount.color ="#01273e";
    this.finishedCount.font_weight = "bold";
    this.finishedCount.x = 70;
    this.finishedCount.y = 257-24;
    this.addChild(this.finishedCount);
    //"Achievement"
    var ach = new LTextField();
    ach.setText({name:"s188"});
    ach.size =24;
    ach.color ="#01273e";
    ach.font_weight = "bold";
    ach.x = 125;
    ach.y = 257-24;
    this.addChild(ach);
};
AchievementPanelInMode.prototype.onBack = function(event){
    event.stopGoOn = true;
    soundManager.play("cancel_back");
    visibleManager.hidePanel("achievementInMode");
    visibleManager.gotoMode(true);
    this.destroy();
}
AchievementPanelInMode.prototype.initializeItem = function(){
    //this.achievementsList.removeAllChild();
    this.achievementsList.initializeItem();
    this.achievementsList.showItemFrom(0);
}

AchievementPanelInMode.prototype.destroy = function(){
    this.removeAllChild();
    this.achievementsList.y = 0;
    this.startPoint = null;
    this.achievementsList.items = [];

    this.removeEventListener(LMouseEvent.MOUSE_MOVE,this.onScrollMove);
    this.removeEventListener(LMouseEvent.MOUSE_UP,this.onScrollUp);

    this.removeEventListener(LTouchEvent.TOUCH_MOVE,this.onScrollMove);
    this.removeEventListener(LTouchEvent.TOUCH_END,this.onScrollUp);

    this.removeEventListener(LMouseEvent.MOUSE_DOWN,this.onScrollDown);
    this.removeEventListener(LTouchEvent.TOUCH_END,this.onScrollDown);
}
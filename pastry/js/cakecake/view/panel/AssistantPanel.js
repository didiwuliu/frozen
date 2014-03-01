/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-16
 * Time: 下午4:51
 * To change this template use File | Settings | File Templates.
 */
function AssistantPanel(parentName){
    CommonSubPanel.call(this);
    this.parentName = parentName;
    this.init();
    this.initContent();
}
AssistantPanel.prototype = Object.create(CommonSubPanel.prototype);
//AssistantPanel.prototype.onBack = function(event){
//    event.stopGoOn = true;
//    soundManager.play("cancel_back");
//    this.removeFromParent();
//    if(this.parentName == "settingPanel"){
//        gameUI.settingPanel.visible = true;
//    }else if(this.parentName == "pausePanel"){
//        gameUI.pausePanel.visible = true;
//    }
//    this.onOK();
//}
AssistantPanel.prototype.initContent = function(){
    //assistant文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.assistants_f);
    var bp = new LBitmap(bpd,"assistants_f");
    bp.setCP(292,79);
    this.addChild(bp);

    this.addChild(gameUI.getCoinsInfoComponent());
    //选项描述，黑色背景框
    var description = new LSprite();
    description.y = 177;
    description.x = 62;
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.message_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,463-28,112-28);
    description.addChild(bp);
    //描述头assistants
    this.contentTitle = new LTextField();
    this.contentTitle.x = 231;
    this.contentTitle.y = 2;
    this.contentTitle.font_weight = "bold";
    this.contentTitle.textAlign = "center";
    this.contentTitle.color = "#65efdc";
    this.contentTitle.size = 23;
    description.addChild(this.contentTitle);
    //描述内容
    this.contentText = new LTextField();
    this.contentText.x = 30;
    this.contentText.y = 30;
    this.contentText.font_weight = "bold";
    this.contentText.color = "#FFFFFF";
    this.contentText.size = 20;
    this.contentText.width = 410;
    description.addChild(this.contentText);

    this.addChild(description);
    //选项描述，黑色背景框
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.message_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,463-28,366-28);
    this.itemsContainer = new LSprite();
    this.itemsContainer.x = 62;
    this.itemsContainer.y = 303;
    this.itemsContainer.addChild(bp);
    this.addChild(this.itemsContainer);

    //一个简短介绍
    var shortDescription = new LTextField();
    shortDescription.y = 666;
    shortDescription.x = 48;
    shortDescription.size = 19;
    shortDescription.text = "Need some helping hands? Choose up to 3 for your game."
    this.addChild(shortDescription);

    //store 和 ok 按钮
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.green_short);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.green_short_h);
    var bph = new LBitmap(bpdh);

    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.store_btn);
    var bpt = new LBitmap(bpdt,"store_btn");
    this.storeBtn= new LButton(bp,this.onStore,this,bph,true,null,bpt,{x:78,y:27});
    this.storeBtn.x = 77;
    this.storeBtn.y = 710;
    this.addChild(this.storeBtn);

    //ok 按钮
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.short_btn);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.short_btn_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.ok);
    var bpt = new LBitmap(bpdt,"ok");
    this.okBtn = new LButton(bp,this.onOK,this,bph,true,null,bpt,{x:78,y:27});
    this.okBtn.x = 350;
    this.okBtn.y = 710;
    this.addChild(this.okBtn);

    //去掉返回按钮
    this.removeChild(this.backBtn);
    this.backBtn.destroy();
    this.backBtn = null;
}
AssistantPanel.prototype.onOK = function(){
    var coins = 0;
    for(var key in this.itemList.selectedItems){
        var item = this.itemList.selectedItems[key];
        coins += parseInt(item.data.price);
    }
    if(coins > userInfo.coins){
        alert(string.currentString.s182);
        return;
    }else{
        userInfo.coins -= coins;
        userProfile.saveCoinsInfo();
    }
    assistantHandler.setAssistantHandlerData(this.itemList.selectedItems);
//    runtimeData.startGameByMode(runtimeData.currentMode);
    assetsData.loadGameAssets(runtimeData.currentMode);
    this.itemList.selectedItems = null;
    visibleManager.hidePanel("assistant");
}
AssistantPanel.prototype.onStore = function(){
//    assistantHandler.setAssistantHandlerData(runtimeData.currentMode,this.itemList.selectedItems);
//    runtimeData.startGameByMode(runtimeData.currentMode);
//    this.itemList.selectedItems = null;
//    visibleManager.hidePanel("assistant");
      this.isMouseEnable = false;
      visibleManager.showPanel("store",2);
}
AssistantPanel.prototype.setData = function(dataArr){
    this.itemsContainer.removeAllChild();
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.message_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,463-28,366-28);
    if(this.itemList)
    {
        this.itemList.destroy()
    }
    this.itemsContainer.addChild(bp);
    this.itemList = new AssistantList(AssistantItem,dataArr,210,70);
    this.itemList.x = 16;
    this.itemList.y = 35;
    this.itemsContainer.addChild(this.itemList);
}
AssistantPanel.prototype.destroy = function(){
    this.okBtn.destroy();
    this.okBtn = null;
    this.storeBtn.destroy();
    this.storeBtn = null;
//    this.contentTitle.removeFromParent();

    this.itemList.destroy();
    this.itemsContainer.removeChild(this.itemList);
    this.itemsContainer = null;
    this.itemList = null;

    //
    this.removeChild(gameUI.getCoinsInfoComponent());
    this.removeChild(this.line);
    this.removeAllChild();
}
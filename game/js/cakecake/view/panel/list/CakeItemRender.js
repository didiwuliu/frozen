/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
function CakeItemRender(data,middleX,itemWidth,itemHeight){
    ProductItemRender.call(this,itemWidth,itemHeight);
    this.data = data;
    //wheat:{name:"Wheat",price:35,picName:"it01",notes:"Object to use is changed to wheat"}
    //正常背景
//    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
//    this.bitmap = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
//    this.addChild(this.bitmap);

    //icon
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel[data.picName]);
    this.icon = new LBitmap(bpd);
    this.icon.scaleX = this.icon.scaleY = 0.9;
    this.icon.x = 16;
    this.icon.hitRect = new LRectangle(0,0,itemWidth-30,itemHeight);
    //bp.y = 4;
    this.addChild(this.icon);
    //name
    var name = new LTextField();
    name.size = 24;
    name.width = 290;name.height = 25;
    name.setText(data.name);
    name.x = middleX;
    name.y = 7;
    name.font_weight = "bold";
    name.lineWidth  =1;
    name.textAlign = "center";
    name.color = "#01273e";
    this.addChild(name);
    //coins图标
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon);
    var bp = new LBitmap(bpd);
    bp.x = 323;
    bp.y = 18;
    bp.scaleX = bp.scaleY = 1.1;
    this.addChild(bp);
    //price
    this.price = new LTextField();
    this.price.size = 26;
    this.price.setText(util.convertIntFormat(data.price));
    this.price.textAlign = "left";
    this.price.font_weight = "bold";
    this.price.color = "#fffc00";
    this.price.x = 353;
    this.price.y = 8;
    this.addChild(this.price);

//    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.gray);
//    this.maskBp = new L9ScaleBitmap(bpd,14,14,itemWidth-28-325,itemHeight-28);
//    this.maskBp.alpha = 0.6;
//    this.maskBp.visible = true;
//    this.addChild(this.maskBp);

    this.addEventListener(LMouseEvent.MOUSE_UP,this.onActivated,this);
}
CakeItemRender.prototype = Object.create(ProductItemRender.prototype);
CakeItemRender.prototype.onActivated = function(event){
    if(!this.enable){
        alert(string.currentString.s184);
        return;
    }

    if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
//        tutorialManager.processTutorial(gameConfig.tutorialItems[tutorialManager.tutorialIndex]);
        if(this.data.level != 101)
            return;
        tutorialManager.arrow.visible = false;
        tutorialManager.lightBorder.visible = false;
        tutorialManager.dialogTip.visible = false;
        tutorialManager.dialogBox.visible = false;
        gameUI.tutorialMask.visible = false;
    }else{
        if(userInfo.coins < this.data.price){
            alert(string.currentString.s182);
            return;
        }

        userInfo.coins -= this.data.price;
        this.data.price = Math.floor(this.data.price*1.1);
        this.price.text = util.convertIntFormat(this.data.price);
        userProfile.saveCoinsInfo();
    }
    soundManager.play("purchase_with_coins");
    assistForStore.buyPlant(this.data.level);
    visibleManager.hidePanel("store");
    visibleManager.gotoPreviousView();
    event.stopGoOn = true;
}
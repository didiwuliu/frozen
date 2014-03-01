/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午4:42
 * To change this template use File | Settings | File Templates.
 */
function CoinsItemRender(data,middleX,itemWidth,itemHeight){
    ProductItemRender.call(this,itemWidth,itemHeight);
    this.data = data;
//背景
//    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
//    var bp = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
//    this.addChild(bp);
    // Pocket:{name:"Coins in my pocket",price:1,coins:"2500",picName:"c01",type:"coins",notes:"2,500 coins"},
    //icon
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel[data.picName]);
    var bp = new LBitmap(bpd);
    bp.x = 19;bp.y = -10;
    bp.hitRect = new LRectangle(0,0,itemWidth-30,itemHeight);
    bp.scaleX = bp.scaleY = 0.9;
    this.addChild(bp);
    //coin icon
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon);
    var bp = new LBitmap(bpd);
    bp.x = 140;bp.y = 19;
    bp.hitRect = new LRectangle(0,0,itemWidth-30,itemHeight);
    bp.scaleX = bp.scaleY = 1.1;
    this.addChild(bp);

    //name
    var name = new LTextField();
    name.size = 28;

    name.font_weight = "bold";
    name.text = util.convertIntFormat(data.coins);
    name.x = 169; name.y = 7;
    name.textAlign = "left";
    name.color = "#fffc00";
    this.addChild(name);
    //coins = 文字
//    var coinsStr = new LTextField();
//    coinsStr.size = 28;
//    coinsStr.font_weight = "bolder";
//    coinsStr.text = "Coins = ";
//    coinsStr.x = 203; coinsStr.y = 7;
//    coinsStr.textAlign = "left";
//    coinsStr.color = "#01273e";
//    this.addChild(coinsStr);
    //price
    this.price = new LTextField();
    this.price.size = 26;
    this.price.font_weight = "bold";
    //price.text = "AU$"+data.price;
    this.price.text = "Unavailable";
    this.price.x = 297; this.price.y = 5;
    this.price.color = "#d10101";
    this.addChild(this.price);
    this.addEventListener(LMouseEvent.MOUSE_UP,this.onActivated,this);
}
CoinsItemRender.prototype = Object.create(ProductItemRender.prototype);
CoinsItemRender.prototype.setPrice = function(priceStr){
    if(priceStr){
        this.price.text = priceStr;
    }else{
        this.price.text = "Unavailable";
    }

}
CoinsItemRender.prototype.onActivated = function(event){
    event.stopGoOn = true;
    if(this.data.type == "coins"){
//        alert("准备购买 coins: "+gameConfig.products[0]);
        gameUI.storePanel.onBack();
        store.purchaseProduct(this.data.productId);
//        visibleManager.hidePanel("store");
    }
}
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午4:41
 * To change this template use File | Settings | File Templates.
 */
function SpecialItemRender(data,middleX,itemWidth,itemHeight){
    ProductItemRender.call(this,itemWidth,itemHeight);
    this.data = data;
    //wheat:{name:"Wheat",price:35,picName:"it01",notes:"Object to use is changed to wheat"}
//    //正常背景
//    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
//    this.bitmap = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
//    this.addChild(this.bitmap);
//    //选中背景
//    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.gray);
//    this.selectedBitmap = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
//    this.addChild(this.selectedBitmap);
    //icon
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel[data.picName]);
    this.icon = new LBitmap(bpd);
    this.icon.hitRect = new LRectangle(0,0,itemWidth-30,itemHeight);
    this.icon.x = 16;
    //bp.y = 5;
    //bp.scaleX = bp.scaleY = 0.8;
    this.addChild(this.icon);
    //name
    var name = new LTextField();
    name.size = 20;
    name.font_weight = "bold";
    name.width = 200;name.height = 25;
    name.setText(data.name);
    name.x = middleX;
    name.y = -4;
    name.color = "#01273e";
    this.addChild(name);
    //price
    this.price = new LTextField();
    this.price.size = 26;
    this.price.font_weight = "bold";
    this.price.text ="Unavailable";
    this.price.textAlign = "left";
    this.price.color = "#fffc00";
    this.price.x = 332;
    this.price.y = 7;
    //coins图标
    if(!this.data.productId){
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon);
        var bp = new LBitmap(bpd);
        bp.x = 303;
        bp.y = 19;
        this.addChild(bp);
        this.price.text = util.convertIntFormat(data.price);
    }else{
        this.price.x = 307;
    }
    this.addChild(this.price);
    this.addEventListener(LMouseEvent.MOUSE_UP,this.onActivated,this);
    if(this.data.mode == "all"){
        if(userInfo.modes["mode2"].unlimited && userInfo.modes["mode3"].unlimited && userInfo.modes["mode4"].unlimited){
            this.setEnable(false);
        }
    }else if(userInfo.modes[this.data.mode].unlimited){
        this.setEnable(false);
    }
}
SpecialItemRender.prototype = Object.create(ProductItemRender.prototype);
SpecialItemRender.prototype.setPrice = function(priceStr){
    if(priceStr){
        this.price.text = priceStr;
    }else{
        this.price.text = "Unavailable";
    }
}
SpecialItemRender.prototype.onActivated = function(event){
        event.stopGoOn = true;
        if(gameUI.storePanel.move)
            return;
        if(!this.enable){
            alert(string.currentString.s185);
            return;
        }
        if(this.data.productId){
            store.purchaseProduct(this.data.productId);
        }else {
            if(userInfo.coins < this.data.price){
                alert(string.currentString.s182);
                return;
            }
            soundManager.play("purchase_with_coins");
            userInfo.coins -= this.data.price;
            userProfile.saveCoinsInfo();

            userInfo.modes[this.data.mode].count += 5;
            if(gameUI.modePanel){
                gameUI.modePanel[this.data.mode].setModeCount(userInfo.modes[this.data.mode].count);
                gameUI.modePanel[this.data.mode].setState(null,false);
            }

            userProfile.saveModesInfo();
            gameUI.storePanel.onBack();
        }
   // }

}
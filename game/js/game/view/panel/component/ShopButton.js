/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:13
 * To change this template use File | Settings | File Templates.
 */
function ShopButton(){
    LSprite.call(this);
    //背景
    var bpd1 = new LBitmapData(assetsData.game.image,assetsData.game.shop);
    this.bitmap = new LBitmap(bpd1);
    this.addChild(this.bitmap);

    var bpd = new LBitmapData(assetsData.game.image,assetsData.game.shop_h);
    this.selectedBitmap = new LBitmap(bpd);
    this.selectedBitmap.visible = false;
    this.addChild(this.selectedBitmap);

    //显示钱币数量
    //this.coins = 0;
    this.coinText = new LTextField();
    this.coinText.font_weight = 30;
    this.coinText.font_weight = "bolder";
    this.coinText.color = "#08494a";
    this.coinText.textAlign = "center";
    this.coinText.x = 142;
    this.coinText.y = 11;
    this.coinText.size = 25;
    this.setCoins();
    this.addChild( this.coinText);

    this.addEventListener(LMouseEvent.MOUSE_UP,this.onShop,this);
    this.addEventListener(LMouseEvent.MOUSE_DOWN,this.onDown,this);
}
ShopButton.prototype = Object.create(LSprite.prototype);
ShopButton.prototype.setCoins = function(){
    this.coinText.text = util.convertIntFormat(userInfo.coins);
    if(this.coinText.text == "NaN"){
        "";
    }
};
ShopButton.prototype.onShop = function(){
    soundManager.play("confirm_next");
    visibleManager.gotoGame(false);
    visibleManager.showPanel("store",0);
    if(runtimeData.currentMode == "mode5" && tutorialManager.tutorialIndex == 41){
        tutorialManager.toTop();
        gameTools.goon(6);
    }
}
ShopButton.prototype.onDown = function(event){
    event.stopGoOn = true;
    this.bitmap.visible = false;
    this.selectedBitmap.visible = true;
    cakecake.downButtons.push(this);
}
ShopButton.prototype.destroy = function(){
    this.removeEventListener(LMouseEvent.MOUSE_UP,this.onShop);
    this.removeEventListener(LTouchEvent.TOUCH_END,this.onShop);
    this.removeEventListener(LMouseEvent.MOUSE_DOWN,this.onDown);
    this.removeEventListener(LTouchEvent.TOUCH_START,this.onDown);

}
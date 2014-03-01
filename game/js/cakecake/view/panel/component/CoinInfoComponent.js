/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-26
 * Time: 下午4:20
 * To change this template use File | Settings | File Templates.
 */
function CoinInfoComponent(){
    LSprite.call(LSprite.prototype)


    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.player_coin_message);
    var bp = new LBitmap(bpd);
    this.addChild(bp);

    this.coinText = new LTextField();
    this.coinText.textAlign = "center";
    this.coinText.x = 106;
    this.coinText.y = -4;
    this.coinText.size = 30;
    this.coinText.color = "#ffff00";
    this.addChild(this.coinText);
    this.coinText.text = util.convertIntFormat(userInfo.coins);
}
CoinInfoComponent.prototype = Object.create(LSprite.prototype);
CoinInfoComponent.prototype.setCoinsQuantity = function(coinsAmount){
    this.coinText.text = util.convertIntFormat(coinsAmount);
}

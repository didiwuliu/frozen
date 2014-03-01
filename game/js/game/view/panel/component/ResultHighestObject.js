/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-27
 * Time: 下午8:31
 * To change this template use File | Settings | File Templates.
 */
function ResultHighestObject(){
    LSprite.call(this);
    //result_items 背景
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.reached);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    this.centerX = parseInt(assetsData.result.reached.w)/2;
    this.centerY = parseInt(assetsData.result.reached.h)/2;

    //reached
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.reached_text);
    var finalScore= new LBitmap(bpd,"reached_text");
    finalScore.setCP(60,140);
    this.addChild(finalScore);
    //reward coins
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.reward_coins_text);
    var rewardCoins= new LBitmap(bpd,"reward_coins_text");
    rewardCoins.setCP(327,140);
    this.addChild(rewardCoins);
    //highestLevel
    this.highestLevel = new LSprite();
    this.highestLevel.x = 10;
    this.highestLevel.y = -2;
    this.addChild(this.highestLevel);
    //金币背景
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.coin_icon_bg);
    var bp = new LBitmap(bpd);
    bp.x = 236;
    bp.y = 26;
    this.addChild(bp);
    //对应金币
    this.cakeObjectCoins= new LSetterTextField();
    this.cakeObjectCoins.text = "0000";
    this.cakeObjectCoins.color = "#ffea00";
    this.cakeObjectCoins.textAlign = "center";
    this.cakeObjectCoins.font_weight = "bolder";
    this.cakeObjectCoins.x = 330;
    this.cakeObjectCoins.y = 26;
    this.cakeObjectCoins.size = 35;
    this.addChild(this.cakeObjectCoins);
}
ResultHighestObject.prototype = Object.create(LSprite.prototype);
ResultHighestObject.prototype.setData = function(level,coins){
    this.cakeObjectCoins.value = 0;//初始化
    this.highestLevel.removeAllChild();

    //get cake bitmap with level
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result["level_"+level]);
    var bp = new LBitmap(bpd);
    this.highestLevel.addChild(bp);
    this.coins = coins;
}
ResultHighestObject.prototype.increaseAnimation = function(onComplete,params){
    this.cakeObjectCoins.value = 0;
    LGlobal.TweenLite.to(this.cakeObjectCoins,1000,{value:this.coins,onComplete:onComplete,params:params});
}
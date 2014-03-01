/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-27
 * Time: 下午8:20
 * To change this template use File | Settings | File Templates.
 */
//ResultPanel内分数组件
function ResultScore(){
    LSprite.call(this);

    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.result_score_icon);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    this.centerX =parseInt( assetsData.result.result_score_icon.w)/2;
    this.centerY = parseInt(assetsData.result.result_score_icon.h)/2;
    //game completed
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.game_completed_text);
    var finalScore= new LBitmap(bpd,"game_completed_text");
    finalScore.setCP(109+116,85-121);
    this.addChild(finalScore);
    //final score
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.final_score_text);
    var finalScore= new LBitmap(bpd,"final_score_text");
    finalScore.setCP(109,85);
    this.addChild(finalScore);
    //reward coins
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.reward_coins_text);
    var rewardCoins= new LBitmap(bpd,"reward_coins_text");
    rewardCoins.setCP(344,85);
    this.addChild(rewardCoins);

    //最高分提示
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.personal_high_score);
    this.highestSign= new LBitmap(bpd,"personal_high_score");
    this.highestSign.x = 96;
    this.highestSign.y = 110;
    this.highestSign.setCP(225,124);
//    this.highestSign.visible = false;
    this.addChild(this.highestSign);

    //分数2
    this.scoreText = new LSetterTextField();
    this.scoreText.font_weight = "bolder";
    this.scoreText.text = "0000";
    this.scoreText.color = "#ffea00";
    this.scoreText.size = 35;
    this.scoreText.x = 97-25;
    this.scoreText.y = 2;
    this.addChild(this.scoreText);
    //金币
    this.coinsText= new LSetterTextField();
    this.coinsText.font_weight = "bolder";
    this.coinsText.text = "0000";
    this.coinsText.color = "#ffea00";
    this.coinsText.x = 339;
    this.coinsText.y = 2;
    this.coinsText.size = 35;
    this.addChild(this.coinsText);

}
ResultScore.prototype = Object.create(LSprite.prototype);
ResultScore.prototype.setData = function(score,coins,currentMode){
    this.scoreText.value = 0;
    this.coinsText.value = 0;
    this.score = score;
    this.coins = coins;

    if(currentMode != "mode5" && userInfo.gameResultLog[currentMode].length>0 && score >= userInfo.gameResultLog[currentMode][0].score){
        this.highestSign.visible = true;
    };
}
ResultScore.prototype.increaseAnimation = function(onComplete,params){
    this.scoreText.value = 0;
//    this.score = 10000000;
    LGlobal.TweenLite.to(this.scoreText,800,{value:this.score,onComplete:onComplete,params:params});

    this.coinsText.value = 0;
    LGlobal.TweenLite.to(this.coinsText,800,{value:this.coins});
}
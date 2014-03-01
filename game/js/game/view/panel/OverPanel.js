/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-28
 * Time: 下午1:42
 * To change this template use File | Settings | File Templates.
 */
function OverPanel(){
    LSprite.call(this);
    var animationContainer = new LSprite();
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.result_gameOver.gameover.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.result_gameOver.image,animationArr,"animation",2,false);
    animation.playOnce();
    animation.setComplete(function(){
        this.visible = false;
    });

    animationContainer.x = 236;
    animationContainer.y = 236;
    animationContainer.scaleX = animationContainer.scaleY = 5;
    animationContainer.centerX = 64;
    animationContainer.centerY = 96;
    animationContainer.addChild(animation);
    this.addChild(animationContainer);

    //light
    var bpd = new LBitmapData(assetsData.result.image,assetsData.result.light3);
    var bp = new LBitmap(bpd);
    this.light = new LSprite();
    this.light.addChild(bp);
    this.light.x = -13;
    this.light.centerX = parseInt(assetsData.result.light3.w)/2;
    this.light.centerY = parseInt(assetsData.result.light3.h)/2;
    this.light.y = 118;
    this.light.scaleX = this.light.scaleY = 0.1;
    this.addChild(this.light);
}
OverPanel.prototype = Object.create(LSprite.prototype);
OverPanel.prototype.startAnimation = function(){
    var targetTween = LGlobal.TweenLite.to(this.light,1000,{scaleX:0.9,scaleY:0.9,ease:Quint.easeInOut});
}
OverPanel.prototype.setCurrentMode = function(mode,complete){
    var bpName;
    if(mode == "mode1" || mode == "mode4" || mode == "mode5" || complete){
        bpName = "game_completed";
    }else if(mode == "mode2"){
        bpName = "timeover";
    }else if(mode == "mode3"){
        bpName = "turnover";
    }
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text[bpName]);
    var bp = new LBitmap(bpd,bpName);
    bp.setCP(308,334);
    this.addChild(bp);
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:18
 * To change this template use File | Settings | File Templates.
 */
function DailyCake(cakeBp,dayText,checkMarkBp,coinIcon,dayIndex,coinQuantities){
    LSprite.call(this);
//    var g = new LGraphics();
//    g.width = 300;
//    g.height = 300;
//    this.addChild(g);

    //day text
    this.addChild(dayText);
    dayText.x = 10;
    //dayIndex
    var rect = assetsData.text.day_number;
    rect.oW = parseInt(rect.oW);
    rect.oH = parseInt(rect.oH);
    rect.oX = parseInt(rect.oX);
    rect.oY = parseInt(rect.oY);
    rect.x = parseInt(rect.x);
    rect.y = parseInt(rect.y);
    rect.w = parseInt(rect.w);
    rect.h = parseInt(rect.h);

    var tw = rect.oW/5;
    var sx = 0;
    var sy = 0;
    if(dayIndex>0){
        sx = rect.x + tw*dayIndex - rect.oX;
    }else{
        sx = rect.x;
        tw -=  rect.oX;
    }
    sy = rect.y;
    var bpd = new LBitmapData(assetsData.text.image,{x:sx,y:sy,w:tw,h:rect.h});
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    if(switchLanguage.currentLanguage == "Chinese"){
        bp.x = 45;
        bp.y = 2;
    }else if(switchLanguage.currentLanguage == "English"){
        bp.x = 85;
        bp.y = 2;
    }else{
        bp.x = 85;
        bp.y = 2;
    }

    //cake
    this.cake = new LSprite();
    this.cake.addChild(cakeBp);
    this.cake.centerX = cakeBp.width/2;
    this.cake.centerY = cakeBp.height/2;
    this.cake.x = 0;
    this.cake.y = 72;
    //对号
    this.checkSprite = new LSprite();
    this.checkSprite.addChild(checkMarkBp);
    this.checkSprite.x = 90;
    this.checkSprite.y = 63;
//    this.checkSprite.scaleX = this.checkSprite.scaleY = 0.5;
    this.checkSprite.centerX =  this.checkSprite.centerY = 57;

    this.addChild(this.cake);
    this.addChild(this.checkSprite);

    //add
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.add);
    var bp = new LBitmap(bpd);
    bp.x = 21;
    bp.y = 140;
    this.addChild(bp);
    //reward coin
    var text = new LTextField();
    text.text = gameConfig.dailyReward[dayIndex];
    text.color = "#cb3f01";
    text.size = 30;
    text.font_weight = "bold";
    text.textAlign = "center";
    text.x= 75;
    text.y= 122;
    this.addChild(text);
    //coin Icon
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon);
    var bp = new LBitmap(bpd);
    bp.x = 104;
    bp.y = 136;
    this.addChild(bp);

    //可以领取状态
    // LGlobal.TweenLite.to(this.scaleCake,800,{scaleX:1.2,scaleY:1.2,yoyo:true});
}
DailyCake.prototype = Object.create(LSprite.prototype);
DailyCake.prototype.setState = function(state){
    if(state == "received"){
        if(this.scaleTween){
            LGlobal.TweenLite.removeTween(this.scaleTween);
        }
        this.cake.scaleX = this.cake.scaleY = 1;
        this.checkSprite.visible = true;
    }else if(state == "canReceive"){
        this.checkSprite.visible = false;
        this.scaleTween = LGlobal.TweenLite.to(this.cake,800,{scaleX:1.2,scaleY:1.2,yoyo:true});
    }else if(state == "notReceive"){
        this.checkSprite.visible = false;
        this.alpha = 0.3;
    }
}
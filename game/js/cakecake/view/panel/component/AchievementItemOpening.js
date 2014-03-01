/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-28
 * Time: 下午5:10
 * To change this template use File | Settings | File Templates.
 */
function AchievementItemOpening(data,index,itemWidth,itemHeight,bgMode){
    // bgMode，用于根据模式选择背景图片
    //achievement_novice_001:{key:"22",icon:"no01",name:"name",description:"description"},
    LSprite.call(this);
    this.data = data;
    //背景
    if(bgMode == "mode2"){
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.achievement_message_bg);
    }else if(bgMode == "mode1"){
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
    }
    var bp = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
    this.addChild(bp);
//成就图标
    var bpName = data.icon+"_u";
    var bpd = new LBitmapData(assetsData.achievementIcon.image,assetsData.achievementIcon[bpName]);
    this.iconBp = new LBitmap(bpd);
    this.iconBp.scaleX = this.iconBp.scaleY = 1;
    this.iconBp.y = -1;
    this.iconBp.x = 2;
    this.addChild(this.iconBp);

    //name
    var name = new LTextField();
    name.width = 380;name.height = 25;
    name.setText(data.name);
    if(bgMode == "mode2"){
        name.color = "#211102";
    }else if(bgMode == "mode1"){
        name.color = "#000000";
    }else{
        name.color = "#000000";
    }

    name.x = 100;
    name.y = -5;
    name.size = 24;
    name.font_weight = "bold";
    this.addChild(name);

    //description
    var description = new LTextField();
    description.width = 320;description.gap = 2;
    description.setText(data.description);
    description.color = "#ffffff";
    description.x = 100;
    description.font_weight = "bold";
    description.y = 25;
    description.size = 20;
    this.addChild(description);
}
AchievementItemOpening.prototype = Object.create(LSprite.prototype);
AchievementItemOpening.getOpenAnimation = function(completeFunction){
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.result_openAchievementEffect.openAchEff.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.result_openAchievementEffect.image,animationArr,"animation",1,false);
    return animation;
}
AchievementItemOpening.prototype.open = function(completeFunction){
    var bpName = this.data.icon;
    var bpd = new LBitmapData(assetsData.achievementIcon.image,assetsData.achievementIcon[bpName]);
    this.iconBp.bitmapData = bpd;

    this.openAnimation = AchievementItemOpening.getOpenAnimation();
    this.openAnimation.playOnce();
    this.openAnimation.setComplete(completeFunction);
    this.openAnimation.x = -48;
    this.openAnimation.y = -52;
    this.addChild(this.openAnimation);
}
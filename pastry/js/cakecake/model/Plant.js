/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午9:26
 * To change this template use File | Settings | File Templates.
 */
function Plant(level,advanced){
    this.setLevel = function(level,advanced){
        if(!level)return;
        this.level = level;

        if(!assetsData.effectAnimation.game_cake){
            "";
        }

        var bpName = "level_"+level;
        var imageArr = assetsData.effectAnimation.game_cake[bpName].rectsData;
        var animationData = [{name:"animation",imageArr:imageArr}];

        this.animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_cake.image,null));
        this.animation.setAnimation(animationData);
        this.animation.setCurrentAnimation("animation");
        this.animation.stop = true;
        this.animation.loop = false;
        this.animation.y = -21;
//        this.animation.stop = false;
//        this.animation.loop = true;

    };

    this.advanced = advanced;
    this.setLevel(level,advanced);
}
Plant.prototype.destroy = function(){
    this.animation.destroy();
    this.animation = null;
}
Plant.getCombinedAnimationData = function(){
    if(!Plant.combinedAnimationData){
        var animationData = [];
        //var obj = {name:"combinedAnimation",imageArr:assetsData.cake.combinedAnimation};
        var obj = {name:"combinedAnimation",imageArr:assetsData.effectAnimation.game_cakeCombine.combine.rectsData};
        animationData.push(obj);
        Plant.combinedAnimationData = animationData;
    }
    return Plant.combinedAnimationData;
}
Plant.getNextLevel = function(level){
    if(level == 202 || level == 301){
        return 500;//小钱币
    }else{
        return level+1;
    }
}
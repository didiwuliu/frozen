/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-20
 * Time: 下午2:57
 * To change this template use File | Settings | File Templates.
 */
function ModeIcon(){
    LSprite.call(this);
    this.y = 166;
    this.x = 146;
}
ModeIcon.prototype = Object.create(LSprite.prototype);
ModeIcon.prototype.setModeIcon = function(mode){
    var bpName;
    if(mode == "mode1"){
        bpName = "target_icon";
    }else if(mode == "mode2"){
        bpName = "timeicon";
    }else if(mode == "mode3"){
        bpName = "turn_icon";
    }else if(mode == "mode4"){
        bpName = "hamster_icon";
    }else if(mode == "mode5"){
        bpName = "target_icon";
    }
    var bpd = new LBitmapData(assetsData.game.image,assetsData.game[bpName]);
    var bp = new LBitmap(bpd);
    this.removeAllChild();
    this.addChild(bp);
}

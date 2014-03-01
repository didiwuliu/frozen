/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午3:02
 * To change this template use File | Settings | File Templates.
 */
function VolumeButton(soundType){
    this.soundType = soundType;
    LSprite.call(this);
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.sound_off);
    this.offBp = new LBitmap(bpd);
    this.offBp.visible = false;
    this.addChild(this.offBp);

    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.sound_on);
    this.onBp= new LBitmap(bpd);
    this.addChild(this.onBp);

    if(!userInfo.volume[this.soundType]){
        soundManager.setVolume(0.0,this.soundType);
        this.onBp.visible = false;
        this.offBp.visible = true;
    }

//    this.state = true;
    this.addEventListener(LMouseEvent.MOUSE_UP,this.on,this);

}
VolumeButton.prototype = Object.create(LSprite.prototype);
VolumeButton.prototype.on = function(event){
    if(event){
        event.stopGoOn = true;
    }

    var _volumeState = userInfo.volume[this.soundType];
    userInfo.volume[this.soundType] = !_volumeState;
    userProfile.saveVolumeInfo();
    if(userInfo.volume[this.soundType]){
        soundManager.play("select");
        soundManager.setVolume(1.0,this.soundType);
        this.onBp.visible = true;
        this.offBp.visible = false;
    }else{
        //soundManager.play("cancel_back");
        soundManager.setVolume(0.0,this.soundType);
        this.onBp.visible = false;
        this.offBp.visible = true;
    }
}
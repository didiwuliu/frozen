/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-3
 * Time: 下午4:46
 * To change this template use File | Settings | File Templates.
 */

function CountDown(mode){
    LSprite.call(this);
    this.mode = mode;
    //星星
    this.starSprite = new LSprite();
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_btn_animation.star_time.rectsData}];
    this.starAnimation = LAnimation.getAnimation(assetsData.effectAnimation.menu_btn_animation.image,animationArr,"animation",3,true);
    this.starAnimation.setCurrentFrame(parseInt(util.getRandom(0,3)));
    this.starAnimation.stop = true;
    this.starSprite.addChild(this.starAnimation);
    this.addChild(this.starSprite);
    //倒计时
    this.time = new LTextField();
    this.time.color = "#4e0909";
    this.time.x = 45;this.time.y  = 27;
    this.time.text = util.convertTimeFormat(timeCountDown.modesTime[mode]);
    this.time.size = "20";
    this.time.font_weight = "bold";
    this.starSprite.addChild(this.time);
//    if(userInfo.modes[this.mode].count < 5){
//        this.loop();
//    }
}
CountDown.prototype = Object.create(LSprite.prototype);
CountDown.prototype.destroy = function(){
    this.removeAllChild();

}
//CountDown.prototype.onSecond = function(){
//    this.seconds--;
////    var minute = this.seconds / 60;
////    var seconds = this.seconds % 60;
////    seconds = seconds<10 ? "0"+seconds:seconds;
////    this.time.text = parseInt(minute)+":"+seconds;
//    this.time.text = util.convertTimeFormat(this.seconds);
//    if(this.seconds <= 0){
//        this.seconds = 900;
//        userInfo.modes[this.mode].count++;
//        userProfile.saveModesInfo();
//        gameUI.modePanel[this.mode].setModeCount(userInfo.modes[this.mode].count);
//    }
//    this.starAnimation.stop  = true;
//    if(userInfo.modes[this.mode].count < 5){
//        this.loop();
//        this.starAnimation.stop  = false;
//    }
//}

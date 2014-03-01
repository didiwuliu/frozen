/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:24
 * To change this template use File | Settings | File Templates.
 */
function SocialPanel(){
    CommonSubPanel.call(this);
    this.init();
    this.initContent();
}
SocialPanel.prototype = Object.create(CommonSubPanel.prototype);
SocialPanel.prototype.initContent = function(){
    //social文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.share_f);
    var bp = new LBitmap(bpd,"share_f");
    bp.setCP(292,79);
    this.addChild(bp);
    //faceBook
    this.facebook = new SocialItem("facebook","facebook_icon","facebook","available",46,13,"click to login Facebook");
    this.facebook.x = 112;
    this.facebook.y = 251;
    this.addChild(this.facebook);

    //gamecenter
    this.gamecenter = new SocialItem("gamecenter","gamecenter_icon","gamecenter","available",44,13,"click to login GameCenter");
    this.gamecenter.x = 112;
    this.gamecenter.y = 431;//361
    this.addChild(this.gamecenter);
//    //instagrame
//    this.instagrame = new SocialItem("instagram","Instagram_icon","instagram","available",44,13);
//    this.instagrame.x = 112;
//    this.instagrame.y = 471;
//    this.addChild(this.instagrame);
////    //twitter
//    this.twitter = new SocialItem("twitter","teitter_icon","teitter","available",40,13);
//    this.twitter.x = 112;
//    this.twitter.y = 581;
//    this.addChild(this.twitter);
};
SocialPanel.prototype.onBack = function(event){
    event.stopGoOn = true;
//    gameUI.settingPanel.visible = true;
//    gameUI.SocialPanel.visible = false;
//    gameUI.blackBg.visible = false;
    visibleManager.hidePanel("social");
    visibleManager.gotoMode(true);
}
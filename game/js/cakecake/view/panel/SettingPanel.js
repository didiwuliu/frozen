/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:07
 * To change this template use File | Settings | File Templates.
 */
function SettingPanel(){
    LSprite.call(this);
    //背景
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.settingPanel);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    //setting文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.setting_f);
    var bp = new LBitmap(bpd,"setting_f");
    bp.setCP(285,138);
    this.addChild(bp);
    //按钮setting
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.setting);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.setting_h);
    var sbp = new LBitmap(sbpd);
    var settingBtn = new LButton(bp,this.onSetting,null,sbp,true,null);
    settingBtn.x = 193;
    settingBtn.y = 0;
    this.addChild(settingBtn);
//    this.addChild(gameUI.getSoundBtn());
//    this.addChild(gameUI.getMusicBtn());
//    return;
    //按钮down
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.down);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.down_h);
    var sbp = new LBitmap(sbpd);
    var downBtn = new LButton(bp,this.onDown,null,sbp,true);
    downBtn.addChild(bp);
    downBtn.x = 203;
    downBtn.y = 737;
    this.addChild(downBtn);

    //music文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.music_f);
    var bp = new LBitmap(bpd,"music_f");
    bp.setCP(345,267);
    this.addChild(bp);
    //sound文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.sound_f);
    var bp = new LBitmap(bpd,"sound_f");
    bp.setCP(102,267);
    this.addChild(bp);
    //声音按钮
    this.addChild(gameUI.getSoundBtn());
    this.addChild(gameUI.getMusicBtn());
    //help文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.help_text);
    var bp = new LBitmap(bpd,"help_text");
    bp.setCP(102,385);
    this.addChild(bp);
    //about文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.about_text);
    var bp = new LBitmap(bpd,"about_text");
    bp.setCP(345,385);
    this.addChild(bp);
    //reset文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.reset);
    var bp = new LBitmap(bpd,"reset");
//    bp.setCP(102,518);
    bp.setCP(102,647);
    this.addChild(bp);
    //restore文字menu.png
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.restore_f);
    var bp = new LBitmap(bpd,"restore_f");
    bp.setCP(345,518);
    this.addChild(bp);
    //language文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.language_text);
    var bp = new LBitmap(bpd,"language_text");
//    bp.setCP(102,647);
    bp.setCP(102,518);
    this.addChild(bp);

    //按钮help
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help_h);
    var sbp = new LBitmap(sbpd);
    var helpBtn = new LButton(bp,this.onHelp,null,sbp,true);
    helpBtn.x = 166;
    helpBtn.y = 389-25-32;
    this.addChild(helpBtn);
    //按钮about
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.about);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.about_h);
    var sbp = new LBitmap(sbpd);
    var aboutBtn = new LButton(bp,this.onAbout,null,sbp,true);
    aboutBtn.x = 422;
    aboutBtn.y = 390-25-32;
    this.addChild(aboutBtn);

    //按钮reset
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.reset);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.reset_h);
    var sbp = new LBitmap(sbpd);
    var resetBtn = new LButton(bp,this.onReset,null,sbp,true);
    resetBtn.x = 167;
    resetBtn.y = 628-30;
    this.addChild(resetBtn);

    //按钮restore
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.restore);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.restore_h);
    var sbp = new LBitmap(sbpd);
    var restoreBtn = new LButton(bp,this.onRestore,null,sbp,true);
    restoreBtn.x = 420;
    restoreBtn.y = 540-75;
    this.addChild(restoreBtn);

    //按钮language
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.language);
    var bp = new LBitmap(bpd);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.language_h);
    var sbp = new LBitmap(sbpd);
    var languageBtn = new LButton(bp,this.onLanguage,null,sbp,true);
    languageBtn.x = 173;
    languageBtn.y = 540-75;
    this.addChild(languageBtn);

}
SettingPanel.prototype = Object.create(LSprite.prototype);
SettingPanel.prototype.onSetting = function(event){
    if(visibleManager.currentView == "setting")return;
    //event.stopGoOn = true;
    LGlobal.TweenLite.to(gameUI.settingPanel,800,{y:123,ease:Bounce.easeOut});
    visibleManager.gotoMode(false);
    visibleManager.gotoSetting(true);
}
SettingPanel.prototype.onDown = function(event){
    event.stopGoOn = true;
    soundManager.play("confirm_next");
    LGlobal.TweenLite.to(gameUI.settingPanel,800,{y:1072 - mapConfig.clipTop,ease:Bounce.easeOut});
    visibleManager.gotoSetting(false);
    visibleManager.gotoMode(true);
}
SettingPanel.prototype.onAbout = function(event){
    //event.stopGoOn = true;
    var panel = new AboutPanel("settingPanel");
    gameUI.uiLayer.addChild(panel);
    gameUI.settingPanel.visible = false;

}
SettingPanel.prototype.onReset = function(event){
//    event.stopGoOn = true;
    var panel = new ResetPanel("settingPanel");
    gameUI.uiLayer.addChild(panel);
    gameUI.settingPanel.visible = false;
}
SettingPanel.prototype.onRestore = function(event){
    //event.stopGoOn = true;
    store.restore();
}
SettingPanel.prototype.onLanguage = function(event){
    //event.stopGoOn = true;
    var panel = new LanguagePanel("settingPanel");
    gameUI.uiLayer.addChild(panel);
    gameUI.settingPanel.visible = false;
}
SettingPanel.prototype.onHelp = function(event){
    //event.stopGoOn = true;
    var panel = new HelpPanel("settingPanel");
    gameUI.uiLayer.addChild(panel);
    gameUI.settingPanel.visible = false;
}
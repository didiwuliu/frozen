/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:54
 * To change this template use File | Settings | File Templates.
 */
function CommonSubPanel(){
    LSprite.call(this);
    this.y = 168;
    this.x = 27;
}
CommonSubPanel.prototype = Object.create(LSprite.prototype);
CommonSubPanel.prototype.onBack = function(event){
//    event.stopGoOn = true;
//    soundManager.play("cancel_back");
    this.removeFromParent();
    if(this.parentName == "settingPanel"){
        gameUI.settingPanel.visible = true;
        gameUI.settingPanel.currentPanel = null;
    }else if(this.parentName == "pausePanel"){
        gameUI.pausePanel.visible = true;
        gameUI.pausePanel.currentPanel = null;
    }
//    visibleManager.gotoSetting(true);
}
CommonSubPanel.prototype.init = function(){
    //背景
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.subPanel);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
//直线
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.line1);
    this.line = new LBitmap(bpd);
    this.line.x = 62;
    this.line.y = 117;
    this.addChild(this.line);

    //按钮back
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.back);
    var bp = new LBitmap(bpd);
    bp.hitRect = new LRectangle(0,0,62,90);
    var sbpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.back_h);
    var sbp = new LBitmap(sbpd);
    sbp.hitRect = new LRectangle(0,0,62,90);
    this.backBtn = new LButton(bp,this.onBack,this,sbp,true,"cancel_back");
    this.backBtn.x = 0;
    this.backBtn.y = 126;
    this.addChild(this.backBtn);
}

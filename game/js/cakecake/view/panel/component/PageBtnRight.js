/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:41
 * To change this template use File | Settings | File Templates.
 */
function PageBtnRight(){
    LSprite.call(this);
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.page_btn_h);
    var bp = new LBitmap(bpd);
    this.enableBtn = new LSprite();
    this.enableBtn.addChild(bp);
    this.addChild(this.enableBtn);

    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.page_btn);
    var bp = new LBitmap(bpd);
    this.unenableBtn = new LSprite();
    this.unenableBtn.scaleX = -1;
    this.unenableBtn.centerX = this.unenableBtn.centerY = 31;
    this.unenableBtn.addChild(bp);
    this.addChild(this.unenableBtn);

    this.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
            return
        }
        if(this.enable){
            soundManager.play("select");
        }
    },this);
}
PageBtnRight.prototype = Object.create(LSprite.prototype);
PageBtnRight.prototype.setEnable = function(enable){
    this.enable = enable;
    if(enable){
        this.enableBtn.visible = true;
        this.unenableBtn.visible = false;
    }else{
        this.enableBtn.visible = false;
        this.unenableBtn.visible = true;
    }
};
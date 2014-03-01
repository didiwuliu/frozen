/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:39
 * To change this template use File | Settings | File Templates.
 */
function PageBtnLeft(){
    LSprite.call(this);
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.page_btn);
    var bp = new LBitmap(bpd);
    this.unenableBtn = new LSprite();
    this.unenableBtn.addChild(bp);
    this.addChild(this.unenableBtn);

    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.page_btn_h);
    var bp = new LBitmap(bpd);
    this.enableBtn = new LSprite();
    this.enableBtn.addChild(bp);
    this.enableBtn.scaleX = -1;
    this.enableBtn.centerX = this.enableBtn.centerY = 31;
    this.addChild(this.enableBtn);

    this.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
            return
        }
        if(this.enable){
            soundManager.play("select");
        }
    },this);
}
PageBtnLeft.prototype = Object.create(LSprite.prototype);
PageBtnLeft.prototype.setEnable = function(enable){
    this.enable = enable;
    if(enable){
        this.enableBtn.visible = true;
        this.unenableBtn.visible = false;
    }else{
        this.enableBtn.visible = false;
        this.unenableBtn.visible = true;
    }
}

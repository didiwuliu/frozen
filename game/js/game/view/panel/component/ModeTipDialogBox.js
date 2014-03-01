/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-1
 * Time: 上午10:50
 * To change this template use File | Settings | File Templates.
 */
function ModeTipDialogBox(width,mode){
    this.mode = mode;

    LSprite.call(this);

    this.width = width;
//    this.height = height;

    //背景
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.newbie_guide_message_bg);
    this.bgShape = new LBitmap(bpd);
    this.addChild(this.bgShape);

    this.text = new LTextField();
    this.text.width = this.width;
    this.text.gap = 8;
    this.text.size = 24;
    this.text.font_weight = "bold";
    this.text.color = "#883817";
//        this.text.x = 20;
    this.addChild(this.text);

    //ok Button
    //okBtn
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.short_btn);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.short_btn_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.ok);
    var bpt = new LBitmap(bpdt,"ok");

    this.okBtn = new LButton(bp,this.onOK,this,bph,true,null,bpt,{x:78,y:27});
    this.okBtn.x = 126;
    this.okBtn.y = 320;
    this.addChild(this.okBtn);
}
ModeTipDialogBox.prototype = Object.create(LSprite.prototype);
ModeTipDialogBox.prototype.onOK = function(event){
//    alert("模式介绍");
    this.removeAllChild();
    this.removeFromParent();
    gameUI.removeMask(true);
    if(this.mode == "mode2"){
        runtimeData.timeCountDown();
    }
    if(event){
        event.stopGoOn = true;
    }

}
ModeTipDialogBox.prototype.setData = function(text){
    // this.text.text = tutorialItem.text;
    this.text.setText(text);
    this.text.x = 32;
    this.text.y = 25;

    this.bgShape.scaleX = (this.text.width+45)/174;//40text边距
    this.bgShape.scaleY = (this.text.getTextHeight()+130+35)/80;//20添加空余量，40，60确定按钮

    this.okBtn.y = this.bgShape.height* this.bgShape.scaleY -93;
    this.okBtn.x = (this.bgShape.width* this.bgShape.scaleX-156)/2;

    this.y = (1136 - this.bgShape.height)/2;

    this.visible = true;
}
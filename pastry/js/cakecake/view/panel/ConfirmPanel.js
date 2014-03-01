/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-19
 * Time: 下午9:45
 * To change this template use File | Settings | File Templates.
 */
function ConfirmPanel(width,confirmBp,confirmBp_h,negativeBp,negativeBp_h){
    LSprite.call(this);
    this.confirmBp = confirmBp?confirmBp:"yes_btn";
    this.confirmBp_h = confirmBp_h?confirmBp_h:"yes_btn_h";
    this.negativeBp = negativeBp?negativeBp:"no_btn";
    this.negativeBp_h = negativeBp_h?negativeBp_h:"no_btn_h";

    this.x = 85;
    this.width = width;
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.newbie_guide_message_bg);
    this.bgShape = new LBitmap(bpd);
    this.addChild(this.bgShape);

    //title
    this.title = new LTextField();
    this.title.size = 31;
    this.title.y = 37;this.title.x = 228;
    this.title.font_weight = "bold";
    this.title.textAlign = "center";
    this.title.color = "#883817";
    this.addChild(this.title);
    //content
    this.content = new LTextField();
    this.content.width = this.width;
    this.content.x = 32;
    this.content.y = 78;
    this.content.gap = 8;
    this.content.size = 26;
    this.content.font_weight = "bold";
    this.content.color = "#883817";
    this.addChild(this.content);

    gameUI.pausePanel.isMouseEnable = false;
}
ConfirmPanel.prototype = Object.create(LSprite.prototype);
ConfirmPanel.prototype.setData = function(title,content,onYes,onNo){
    this.title.setText(title);

    this.content.setText(content);
    this.bgShape.scaleX = (this.width+45)/174;//40text边距
    this.bgShape.scaleY = (this.content.getTextHeight()+250)/80;//20添加空余量，40，60确定按钮

    //yes Button
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.short_btn);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.short_btn_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.yes);
    var bpt = new LBitmap(bpdt,"yes");

    this.yesBtn = new LButton(bp,onYes,this,bph,true,"confirm_next",bpt,{x:78,y:27});
    this.addChild(this.yesBtn);

    this.yesBtn.y = this.bgShape.height* this.bgShape.scaleY -45 -60;
    this.yesBtn.x = (this.bgShape.width* this.bgShape.scaleX-156)/2+110;
    this.y = (1136 - this.bgShape.height)/2;

    //no_btn Button
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.green_short);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.green_short_h);
    var bph = new LBitmap(bpdh);

    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.no);
    var bpt = new LBitmap(bpdt,"no");
    //bitmap,fun,context,selectedBitmap,downEffect,sound
    this.onNo = onNo;
    this.noBtn = new LButton(bp,onNo,this,bph,true,"confirm_next",bpt,{x:78,y:27});
    this.addChild(this.noBtn);

    this.noBtn.y = this.bgShape.height* this.bgShape.scaleY -45 -60;
    this.noBtn.x = (this.bgShape.width* this.bgShape.scaleX-156)/2-110;
    this.y = (1136 - this.bgShape.height)/2;

    this.visible = true;
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:11
 * To change this template use File | Settings | File Templates.
 */
function ResetPanel(parentName){
    CommonSubPanel.call(this);
    this.parentName = parentName;
    this.init();
    this.initContent();
}
ResetPanel.prototype = Object.create(CommonSubPanel.prototype);
ResetPanel.prototype.initContent = function(){
    //reset文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.reset_f);
    var bp = new LBitmap(bpd,"reset_f");
    bp.setCP(292,79);
    this.addChild(bp);

    var itemContent = new LTextField();
    itemContent.x = 100;
    itemContent.y = 280;
    itemContent.size = 30;
    itemContent.font_weight = "bold";
    itemContent.color = "007f64";
    itemContent.width = 420;
    itemContent.gap = 8;
    itemContent.text = string.currentString.s187;;
    this.addChild(itemContent);
    //noBtn
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.green_short);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.green_short_h);
    var bph = new LBitmap(bpdh);

    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.no);
    var bpt = new LBitmap(bpdt,"no");
    var noBtn = new LButton(bp,this.onNo,this,bph,true,null,bpt,{x:78,y:27});
    noBtn.x = 80;noBtn.y = 624;
    this.addChild(noBtn);
    //yesBtn
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.short_btn);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.short_btn_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.yes);
    var bpt = new LBitmap(bpdt,"yes");
    var yesBtn = new LButton(bp,this.onYes,this,bph,true,null,bpt,{x:78,y:27});
    yesBtn.x = 350;yesBtn.y = 624;
    this.addChild(yesBtn);

}
ResetPanel.prototype.onNo = function(){
    this.onBack();
}
ResetPanel.prototype.onYes = function(){
//    localStorage.clear();
    userProfile.resetUserInfo();
    this.onBack();
}
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-1
 * Time: 上午10:47
 * To change this template use File | Settings | File Templates.
 */
function DialogTip(){
    LSprite.call(this);
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.newbie_guide_message_bg);
    this.bgShape = new LBitmap(bpd);
    this.addChild(this.bgShape);

    this.text = new LTextField();
    this.text.width = 400;
    this.text.gap = 8;
    this.text.size = 24;
    this.text.font_weight = "bold";
    this.text.color = "#883817";
    this.addChild(this.text);
}
DialogTip.prototype = Object.create(LSprite.prototype);
DialogTip.prototype.setData = function(tutorialItem){
    this.text.setText(tutorialItem.text);
    this.text.x = 29;
    this.text.y = 14;
    var tipData = tutorialItem.tipData;
    this.x = tipData.x + mapConfig.offsetLeft;
    this.y = tipData.y + mapConfig.offsetTop;

    this.bgShape.scaleX = (this.text.width+43)/174;//30,text的边距，15,15
    this.bgShape.scaleY = (this.text.getTextHeight()+45)/80;//30,text的边距，15,15

    this.visible = true;
}
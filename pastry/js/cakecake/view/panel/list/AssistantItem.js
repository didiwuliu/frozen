/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-24
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */
function AssistantItem(data,itemWidth,itemHeight){
    LSprite.call(this);
    this.data = data;
    this.itemWidth = itemWidth;
    this.itemHeight = itemHeight;
    //背景gray,yellow_bg,blue_bg
    this.bg = new LSprite();
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
    this.bg.addChild(bp);
    this.addChild(this.bg);
    //icon
    var icon = data.icon;
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel[icon]);
    var bp = new LBitmap(bpd);
    bp.hitRect = new LRectangle(-13,0,201,55);
    bp.x = 15;
    bp.y = 5;
    this.addChild(bp);

    //coins图标
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon);
    var bp = new LBitmap(bpd);
//    bp.scaleX = bp.scaleY = 0.6;
    bp.x = 110;
    bp.y = 21;
    this.addChild(bp);

    //price
    var price = new LTextField();
    price.setText(data.price);
    price.font_weight = "bold";
    price.size = 26;
    price.color = "#ffff00";
    price.x = 140;
    price.y = 10;
    this.addChild(price);

    //this.addEventListener(LMouseEvent.MOUSE_UP,this.onMouseUp,this);
}
AssistantItem.prototype = Object.create(LSprite.prototype);

AssistantItem.prototype.setSelected = function(select){
    this.selected = select;
    soundManager.play("select");
    if(select){
        //背景gray,yellow_bg,blue_bg
        this.bg.removeAllChild();
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.yellow_bg);
        var bp = new L9ScaleBitmap(bpd,14,14,this.itemWidth-28,this.itemHeight-28);
        this.bg.addChild(bp);

    }else{
        //背景gray,yellow_bg,blue_bg
        this.bg.removeAllChild();
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
        var bp = new L9ScaleBitmap(bpd,14,14,this.itemWidth-28,this.itemHeight-28);
        this.bg.addChild(bp);
    }

}
AssistantItem.prototype.setUnEnable = function(){
    //背景gray,yellow_bg,blue_bg
    this.bg.removeAllChild();
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.gray);
    var bp = new L9ScaleBitmap(bpd,14,14,this.itemWidth-28,this.itemHeight-28);
    this.bg.addChild(bp);
}
AssistantItem.prototype.destroy = function(){
    this.data = null;
    this.removeAllChild();
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-2
 * Time: 下午3:31
 * To change this template use File | Settings | File Templates.
 */
function ProductItemRender(itemWidth,itemHeight){
    LSprite.call(this);
    this.enable = true;
    //正常背景
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
    this.bitmap = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
    this.addChild(this.bitmap);
    //选中背景
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.gray);
    this.selectedBitmap = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
    this.selectedBitmap.visible = false;
    this.addChild(this.selectedBitmap);

    //侦听事件
    this.addEventListener(LMouseEvent.MOUSE_DOWN,this.onDown,this);

//    this.addEventListener(LMouseEvent.MOUSE_UP,function(){
//        this.selectedBitmap.visible = false;
//        this.bitmap.visible = true;
//        for(var i = 0;i<cakecake.downButtons.length;i++){
//            if(cakecake.downButtons[i] == this){
//                cakecake.downButtons.splice(i,1);
//            }
//        }
//    },this);

}
ProductItemRender.prototype = Object.create(LSprite.prototype);
ProductItemRender.prototype.onDown= function(event){
    event.stopGoOn = true;
    this.selectedBitmap.visible = true;
    this.bitmap.visible = false;
    cakecake.downButtons.push(this);
}
ProductItemRender.prototype.setEnable = function(enable){
    this.enable = enable;
    if(enable){
        this.addEventListener(LMouseEvent.MOUSE_DOWN,this.onDown,this);
        this.selectedBitmap.visible = false;
        this.bitmap.visible = true;
        this.icon.alpha = 1;
    }else{
        this.removeEventListener(LMouseEvent.MOUSE_DOWN,this.onDown);
        this.removeEventListener(LTouchEvent.TOUCH_START,this.onDown);
        this.selectedBitmap.visible = true;
        this.bitmap.visible = false;
        this.icon.alpha = 0.4;
    }
}



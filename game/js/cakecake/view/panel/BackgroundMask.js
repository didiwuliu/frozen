/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 上午10:48
 * To change this template use File | Settings | File Templates.
 */
function BackgroundMask(){
    LSprite.call(this);
    var graphic = new LGraphics();
    graphic.width = 640;
    graphic.height = 1136;
    graphic.color = "0x000000";
    this.addChild(graphic);
    this.alpha = 0.7;
}
BackgroundMask.prototype = Object.create(LSprite.prototype);
BackgroundMask.prototype.setHollow = function(lrect){
    this.removeAllChild();
    if(!lrect){
        var graphic = new LGraphics();
        graphic.width = 640;
        graphic.height = 1136;
        graphic.color = "0x000000";
        this.addChild(graphic);
        return;
    }

    //上
    var graphic = new LGraphics();
    graphic.width = 640;
    graphic.height = lrect.y;
    graphic.color = "0x000000";
    this.addChild(graphic);
//下
    var graphic = new LGraphics();
    graphic.width = 640;
    graphic.height = 1136 - lrect.y - lrect.height;
    graphic.color = "0x000000";
    graphic.y = lrect.y + lrect.height;
    this.addChild(graphic);
    //左
    var graphic = new LGraphics();
    graphic.width = lrect.x;
    graphic.height = lrect.height;
    graphic.color = "0x000000";
    graphic.y = lrect.y;
    this.addChild(graphic);
    //右
    var graphic = new LGraphics();
    graphic.width = 640-lrect.x - lrect.width;
    graphic.height = lrect.height;
    graphic.color = "0x000000";
    graphic.x = lrect.x+lrect.width;
    graphic.y = lrect.y;
    this.addChild(graphic);
}
BackgroundMask.prototype.addWaiting = function(){
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.loading_bg);
    var bp = new LBitmap(bpd);

    var loadingSprite = new LSprite();
    loadingSprite.addChild(bp);
    loadingSprite.x = 304;
    loadingSprite.y = 552;
    loadingSprite.centerX = loadingSprite.centerY = 16;
    loadingSprite.scaleX = loadingSprite.scaleY = 2;
    this.addChild(loadingSprite);

    this.ltimer = new LTimer(0.1,function(sprite){
        sprite.rotate += Math.PI/4;
        if(sprite.rotate >= Math.PI*2){
            sprite.rotate = 0;
        }
    },this,[loadingSprite]);
    this.ltimer.start();
}
BackgroundMask.prototype.removeWaiting = function(){
    this.removeAllChild();
    this.ltimer.stop();
    this.ltimer.remove();
}

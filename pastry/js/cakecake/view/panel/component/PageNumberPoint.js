/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:45
 * To change this template use File | Settings | File Templates.
 */
//代表页码的点，组成PageNumber
function PageNumberPoint(){
    LSprite.call(this);
    this.pageOn = new LSprite();
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.page_h);
    var bp = new LBitmap(bpd);
    this.pageOn.visible = false;
    this.pageOn.addChild(bp);

    this.pageOut = new LSprite();
//    this.pageOut.x = 16;
//    this.pageOut.y = 17;
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.page);
    var bp = new LBitmap(bpd);
    bp.y = 2;
    this.pageOut.addChild(bp);
    this.pageOut.visible = false;

    this.addChild(this.pageOn);
    this.addChild(this.pageOut);

}
PageNumberPoint.prototype = Object.create(LSprite.prototype);
PageNumberPoint.prototype.setEnable = function(enable){
    if(enable){
        this.pageOn.visible = true;
        this.pageOut.visible = false;
    }else{
        this.pageOn.visible = false;
        this.pageOut.visible = true;
    }
}

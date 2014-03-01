/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:38
 * To change this template use File | Settings | File Templates.
 */
function StorePageTitle(){
    LSprite.call(this);
    //items
//    this.page1On = new LSprite();
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.items_h);
    this.page1On = new LBitmap(bpd,"items_h");
//    this.page1On.addChild(bp);
    this.page1On.x = 16;
    this.page1On.y = 17;
    this.page1On.setCP(80,52);
    this.addChild(this.page1On);
    //specials
//    this.page2On = new LSprite();
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.specials_h);
    this.page2On = new LBitmap(bpd,"specials_h");
//    this.page2On.addChild(bp);
    this.page2On.setCP(247,52)
    this.addChild(this.page2On);
    //coins
//    this.page3On = new LSprite();
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.coins_h);
    this.page3On = new LBitmap(bpd,"coins_h");
//    this.page3On.addChild(bp);
    this.page3On.x = 360;
    this.page3On.y = 17;
    this.page3On.setCP(418,52)
    this.addChild(this.page3On);
}
StorePageTitle.prototype = Object.create(LSprite.prototype);
StorePageTitle.prototype.setCurrentPage = function(cp){
    for(var i = 0;i<3;i++){
        if(cp == i){
            this["page"+(i+1)+"On"].alpha = 1;
        }else{
            this["page"+(i+1)+"On"].alpha = 0.5;
        }
    }

}

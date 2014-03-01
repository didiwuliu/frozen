/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-27
 * Time: 上午11:07
 * To change this template use File | Settings | File Templates.
 */
function TimeLine(){
    LSprite.call(this);
    //彩色背景
    var bpd = new LBitmapData(assetsData.game.image,assetsData.game.time_line);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    //覆盖层
    this.coverLayer = new LGraphics();
    this.coverLayer.color = "#fff3cf";
    this.coverLayer.width = 0;
    this.coverLayer.height = parseInt(assetsData.game.time_line.h) - 8;
    this.coverLayer.x = assetsData.game.time_line.w-4;
    this.coverLayer.y = 4;
    this.addChild(this.coverLayer);
}
TimeLine.prototype = Object.create(LSprite.prototype);
TimeLine.prototype.setRemainTime = function(remain){
    remain = remain > this.totalTime ? this.totalTime : remain;
    this.coverLayer.width = (assetsData.game.time_line.w-8)*(remain/this.totalTime-1);
}
TimeLine.prototype.setTotalTime = function(totalTime){
    this.totalTime = totalTime;
}
TimeLine.prototype.reset = function(totalTime){
    this.coverLayer.width = 0;
    this.visible = false;
}

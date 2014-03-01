/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:29
 * To change this template use File | Settings | File Templates.
 */
function RankingItem(data,index,itemWidth,itemHeight){
    LSprite.call(this);
    //背景
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.bule_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,itemWidth-28,itemHeight-28);
    this.addChild(bp);
    //排名
    var coor = assetsData.public.leaderboards_number;//x,y,w,h,oX,oY,oW,oH
    var newCoor = {x:parseInt(coor.x)+35+(index-1)*38,y:coor.y,w:38,h:coor.h};
    var bpd = new LBitmapData(assetsData.public.image,newCoor);
    var bp = new LBitmap(bpd);
    bp.y = 4;
    bp.x = 30;
    this.addChild(bp);
    //分数
    var scoreText = new LTextField();
    scoreText.text = util.convertIntFormat(data.score);
    scoreText.color = "#ffffff";
    scoreText.textAlign = "right";
    scoreText.x = 404;
    scoreText.y = -10;
    scoreText.size = 45;
    this.addChild(scoreText);

    if(itemHeight<66){
        bp.scaleX = bp.scaleY = 0.6;
        scoreText.size = 30;
        scoreText.y = -6;
    }
}
RankingItem.prototype = Object.create(LSprite.prototype);
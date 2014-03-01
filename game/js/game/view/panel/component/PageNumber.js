/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-29
 * Time: 上午10:20
 * To change this template use File | Settings | File Templates.
 */
//由PageNumberPoint组成。
function PageNumber(c){
    LSprite.call(this);
    this.points = [];
    for(var i = 0;i<c;i++){
        var point = new PageNumberPoint();
        point.x = 25*i;
        this.addChild(point);
        this.points.push(point);
    }
}
PageNumber.prototype = Object.create(LSprite.prototype);
PageNumber.prototype.setCurrentPage = function(c){
    for(var i = 0;i < this.points.length;i++){
        if(i == c){
            this.points[i].setEnable(true);
            continue;
        }
        this.points[i].setEnable(false);
    }
}
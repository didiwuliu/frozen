/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-13
 * Time: 下午4:19
 * To change this template use File | Settings | File Templates.
 */
function List(itemRender,data,itemWidth,itemHeight){
    LSprite.call(this);
    var y = 3;
    for(var i =0;i < data.length;i++){
        var w = itemWidth;
        var h = itemHeight;
        if(i > 0){
            h = h*2/3;
        }
        var item = new itemRender(data[i],i+1,w,h);
        item.y = y;
        y = y+(h+8)
        this.addChild(item);
    }
}
List.prototype = Object.create(LSprite.prototype);

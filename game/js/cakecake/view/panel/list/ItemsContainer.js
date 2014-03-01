/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午9:03
 * To change this template use File | Settings | File Templates.
 */
function ItemsContainer(data,Class,showLength,itemHeight,itemMiddleCellX,itemWidth,itemMode){
    //data,数据
    //item 类
    //显示长度
    //item高度
    //itemMiddleCellX 中间一个元素的x坐标
    //item宽度

    LSprite.call(this);
    this.showLength = showLength;
    this.itemClass = Class;
    this.data = data;
    this.itemHeight = itemHeight;
    this.itemWidth = itemWidth;
    this.itemMode = itemMode;
    this.itemMiddleCellX = itemMiddleCellX;
    this.items = [];
}
ItemsContainer.prototype = Object.create(LSprite.prototype);
ItemsContainer.prototype.initializeItem = function(){
    this.removeAllChild();
    var count = 0;
    this.items = [];
    for(var key in this.data){
        var item = new this.itemClass(this.data[key],this.itemMiddleCellX,this.itemWidth,this.itemHeight,this.itemMode);
        this.items.push(item);
        item.visible = false;
        item.y = count*(this.itemHeight+10);
        this.addChild(item);
        count++;
    }
}
ItemsContainer.prototype.showItemFrom = function(startIndex){
    this.startIndex = startIndex;
    var l = this.items.length;
    for(var i = 0;i<l;i++){
        if(i >= startIndex && i < startIndex+this.showLength){
            this.items[i].visible = true;
        }else{
            this.items[i].visible = false;
        }
    }
}
ItemsContainer.prototype.setEnable = function(enable){
    for(var i = 0;i<this.items.length;i++){
        if(enable){
            //this.items[i].maskBp.visible = false;
            this.items[i].setEnable(true);
        }else{
            this.items[i].setEnable(false);
        }
    }
}
ItemsContainer.prototype.refreshData = function(data){
    this.data = data;
    for(var i in this.items){
        this.items[i].data = this.data[i];
        this.items[i].price.text = this.data[i].price;
    }
}


/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-24
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */
function AssistantList(itemRender,data,itemWidth,itemHeight){
    LSprite.call(this);
    this.items = [];
    this.selectedItems = [];

    for(var i =0;i < data.length;i++){
        var item = new itemRender(data[i],itemWidth,itemHeight);
        item.y = (itemHeight+6)*Math.floor((i/2));
        if(i%2)
        item.x = 220;
        item.addEventListener(LMouseEvent.MOUSE_UP,this.onItemSelected,this);
        this.items.push(item);
        this.addChild(item);
    }
}
AssistantList.prototype = Object.create(LSprite.prototype);
AssistantList.prototype.onItemSelected = function(event){
    var item = event.clickTarget;
    if(item.selected){
        item.setSelected(false);
        //设置item描述
        gameUI.assistantPanel.contentText.setText(item.data.description);
        gameUI.assistantPanel.contentTitle.setText(item.data.title);

        for(var i = 0;i<this.selectedItems.length;i++){
            if(item == this.selectedItems[i]){
                this.selectedItems.splice(i,1);
                break;
            }
        }
        //把其他设置成蓝色
        if(this.selectedItems.length < 3){
            for(var i = 0;i<this.items.length;i++){
                var item = this.items[i];
                if(!item.selected){
                    item.setSelected(false);
                }
            }
        }

    }else{
        if(this.selectedItems.length >= 3){
            return;
        }
        item.setSelected(true);
        //设置item描述
        gameUI.assistantPanel.contentText.setText(item.data.description);
        gameUI.assistantPanel.contentTitle.setText(item.data.title);

        this.selectedItems.push(item);
        //把其他设置成灰色
        if(this.selectedItems.length >= 3){
            for(var i = 0;i<this.items.length;i++){
                var item = this.items[i];
                if(!item.selected){
                    item.setUnEnable();
                }
            }
        }
    }
}
AssistantList.prototype.destroy = function(){
    for(var i = 0;i<this.items.length;i++){
        var item = this.items[i];
        item.data = null;
        item.removeAllChild();
        item.removeEventListener(LMouseEvent.MOUSE_UP,this.onItemSelected);
        item.removeEventListener(LTouchEvent.TOUCH_END,this.onItemSelected);
    }
    this.items = null;
    this.selectedItems = null;

    this.removeAllChild();
}

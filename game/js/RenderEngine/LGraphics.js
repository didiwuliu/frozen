/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-19
 * Time: 上午10:43
 * To change this template use File | Settings | File Templates.
 */
function LGraphics(){
    var s = this;
    s.type = "LGraphics";
    s.color = "#000";
    s.width = 0;
    s.height = 0;
    s.i = 0;
    s.alpha = 1;
    s.visible = true;
    s.bitmap = null;
    s.x = 0;
    s.y = 0;
    s.ax = 0;
    s.ay = 0;
    s.setList = new Array();
    s.showList = new Array();
}
p = {
    show:function (cood,canvas){
        canvas.fillStyle=this.color;
        canvas.fillRect(cood.x+this.x,cood.y+this.y,this.width,this.height);
    },

    ismouseon:function(event){
        var self = this;
        if(!self.visible)return false;
        if(self.viewPort){
            if(event.y >= self.viewPort.y+self.viewPort.height || event.y <= self.viewPort.y)
                return false;
        }
        if(!self.hitRect)
        {
            self.hitRect = new LRectangle(0,0,parseInt(self.width),parseInt(self.height));
        };
        if( event.x >= self.ax + self.hitRect.x && event.x <= self.ax + self.hitRect.x + self.hitRect.width &&
            event.y >= self.ay + self.hitRect.y && event.y <= self.ay + self.hitRect.y + self.hitRect.height)
        {
            return true;
        }else{
            return false;
        }
    },
    mouseEvent:function(on,type,event){
        if(on){
            this.parent.mouseEvent(on,type,event);
        }
    }
};
for(var k in p)LGraphics.prototype[k]=p[k];
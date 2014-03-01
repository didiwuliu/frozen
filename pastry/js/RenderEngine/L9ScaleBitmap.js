/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */
function L9ScaleBitmap(bitmapdata,clipX,clipY,scaleX,scaleY){
    var self = this;
    self.type = "LBitmap";
    self.x = 0;
    self.y = 0;
    self.ax = 0;
    self.ay = 0;
    self.width = 0;
    self.height = 0;
    self.scaleX=1;
    self.scaleY=1;
    self.clipX = clipX;
    self.clipY = clipY;
    self.scaleX = scaleX;
    self.scaleY = scaleY;
    self.visible=true;
    self.bitmapData = bitmapdata;
    if(self.bitmapData){
        self.width = self.bitmapData.width;
        self.height = self.bitmapData.height;
    }
}

L9ScaleBitmap.prototype = {
    show:function (cood,canvas,port,gray){
        var self = this;
        if(!self.visible)return;
        if(self.alpha != 1){
            self.save = true;
            canvas.save();
            canvas.globalAlpha = self.alpha;
        }
        //左上角
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x,self.bitmapData.y,self.clipX,self.clipY,
            self.x+cood.x,self.y+cood.y,self.clipX,self.clipY,port,gray);

        //左下脚
        var mh = (self.height - 2*self.clipY)*self.scaleY;
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x,self.bitmapData.y+self.height-self.clipY,self.clipX,self.clipY,
            self.x+cood.x,self.y+cood.y+self.clipY+mh,self.clipX,self.clipY,port,gray);

        //右上角
        var mw = (self.width - self.clipX*2)*self.scaleX;
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x+self.width-self.clipX,self.bitmapData.y,self.clipX,self.clipY,
            self.x+cood.x+self.clipX+mw,self.y+cood.y,self.clipX,self.clipY,port,gray);
        //右下角
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x+self.width-self.clipX,self.bitmapData.y+self.height-self.clipY,self.clipX,self.clipY,
            self.x+cood.x+self.clipX+mw,self.y+cood.y+self.clipY+mh,self.clipX,self.clipY,port,gray);

        //中上
        var mw = (self.width - self.clipX*2)*self.scaleX;
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x+self.clipX,self.bitmapData.y,self.width - 2*self.clipX,self.clipY,
            self.x+cood.x+self.clipX,self.y+cood.y,mw,self.clipY,port,gray);
        //中下
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x+self.clipX,self.bitmapData.y+self.height-self.clipY,self.width - 2*self.clipX,self.clipY,
            self.x+cood.x+self.clipX,self.y+cood.y+self.clipY+mh,mw,self.clipY,port,gray);
        //左
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x,self.bitmapData.y+self.clipY,self.clipX,self.height-2*self.clipY,
            self.x+cood.x,self.y+cood.y+self.clipY,self.clipX,mh,port,gray);
        //右
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x+self.width-self.clipX,self.bitmapData.y+self.clipY,self.clipX,self.height-2*self.clipY,
            self.x+cood.x+mw+self.clipX,self.y+cood.y+self.clipY,self.clipX,mh,port,gray);
        //中
        util.drawImage(canvas,self.bitmapData.image,
            self.bitmapData.x+self.clipX,self.bitmapData.y+self.clipY,self.width - 2*self.clipX,self.height-2*self.clipY,
            self.x+cood.x+self.clipX,self.y+cood.y+self.clipY,mw,mh,port,gray);

        if(self.save){
            self.save = false;
            canvas.restore();
        }
    },
    ismouseon:function(event){
        return false;
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
        if( event.x >= self.bitmapData.oX+ self.ax + self.hitRect.x && event.x <= self.x +self.bitmapData.oX+ self.ax + self.hitRect.x + self.hitRect.width &&
            event.y >=  self.bitmapData.oY+ self.ay + self.hitRect.y && event.y <= self.y +self.bitmapData.oY+ self.ay + self.hitRect.y + self.hitRect.height)
        {
            return true;
        }else{
            return false;
        }
    },
    mouseEvent:function(on,type){
        if(on){
            this.parent.mouseEvent(on,type);
        }
    },
    setHitRect:function(x,y,width,height){
        var self = this;
        self.hitRect = new LRectangle(x,y,width,height);
    }
}
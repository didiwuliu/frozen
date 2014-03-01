/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */
function LBitmap(bitmapdata,rectName){
    //resource = {parent:"text",name:"about_f"};
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
    self.bitmapData = bitmapdata;
    self.visible=true;
    self.penetrate;//透明图片，是否可以ismouseon
    if(self.bitmapData){
        self.width = self.bitmapData.width;
        self.height = self.bitmapData.height;
    }
    if(rectName){
        self.rectName = rectName;
        self.language = switchLanguage.currentLanguage;
        self.switchCount = switchLanguage.switchCount;
    }
}

LBitmap.prototype = {
    show:function (cood,canvas,port,gray){
        var self = this;
        self.viewPort = port;
        if(!self.visible)return;

        if(self.alpha <= 1){
            self.save = true;
            canvas.save();
            canvas.globalAlpha = self.alpha;
        }
        var _gray = gray || self.gray;

       if(self.rectName && (self.language != switchLanguage.currentLanguage || self.switchCount < switchLanguage.switchCount) && self.refresh ){
            self.refresh();
        }
        util.drawImage(canvas,
            self.bitmapData.image,
            self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
            self.x+self.bitmapData.oX+cood.x,self.y+self.bitmapData.oY+cood.y,self.width*self.scaleX,self.height*self.scaleY,
            port,_gray);
        if(self.save){
            canvas.restore();
            self.save = false;
        }
    },
    removeFromParent:function(){
        if(!this.parent){
            console.log("pause");

        }
        if(typeof this.parent != "undefined"){
            this.parent.removeChild(this);
        }
    },
    ismouseon:function(event){
        if(this.penetrate){
            return false;
        }
//        return true;
        var self = this;
        if(!self.visible)return false;
        if(self.viewPort){
            if(event.y >= self.viewPort.y+self.viewPort.height || event.y <= self.viewPort.y)
                return false;
        }
        if(self.hitRect){
            "";

        }
        if(!self.hitRect)
        {
            self.hitRect = new LRectangle(0,0,parseInt(self.width),parseInt(self.height));
        };
        if( event.x >= self.bitmapData.oX+ self.ax + self.hitRect.x && event.x <= self.bitmapData.oX+ self.ax + self.hitRect.x + self.hitRect.width &&
            event.y >=  self.bitmapData.oY+ self.ay + self.hitRect.y && event.y <= self.bitmapData.oY+ self.ay + self.hitRect.y + self.hitRect.height)
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
    },
    setHitRect:function(x,y,width,height){
        var self = this;
        self.hitRect = new LRectangle(x,y,width,height);
    },
    setCP:function(cx,cy){
        this.cx = cx;
        this.cy = cy;
        //bitmapdata x,y,width,height,oX,oY,oW,oH,
        this.x = cx  -this.bitmapData.width/2-this.bitmapData.oX;
        this.y= cy  -this.bitmapData.height/2-this.bitmapData.oY;
    },
    refresh:function(){
        if(this.rectName){
            //refresh image
            this.switchCount = switchLanguage.switchCount;
            this.language = switchLanguage.currentLanguage;
            this.bitmapData = new LBitmapData(assetsData.text.image,assetsData.text[this.rectName]);
            this.width = this.bitmapData.width;
            this.height = this.bitmapData.height;
            //refresh position
            if(typeof this.cx == "number" && typeof this.cy == "number"){
                this.x = this.cx - this.bitmapData.width/2-this.bitmapData.oX;
                this.y = this.cy - this.bitmapData.height/2-this.bitmapData.oY;
            }

        }
    }
}
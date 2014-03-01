/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午2:01
 * To change this template use File | Settings | File Templates.
 */
function LSprite(){
    var self = this;
    self.type = "LSprite";
    self.x = 0;
    self.y = 0;
    self.ax = 0;
    self.ay = 0;
    self.visible=true;
    self.rotate = 0;
    self.alpha = 1;
    self.scaleX=1;
    self.scaleY=1;
    self.centerX=0;//centerX,centerY对渲染的位置不起作用，只对变形有作用
    self.centerY=0;
    self.viewPort;//LRectangle
    self.save = false;
    self.isMouseEnable = true;
    self.childList = new Array();
    self.frameList = new Array();
    self.downList = new Array();
    self.moveList = new Array();
    self.upList = new Array();
}

LSprite.prototype = {
    show:function (cood,canvas,port,gray){
        if(cood==null)cood={x:0,y:0};
        var self = this;
        if(!self.visible)return;
        if(self.mask || self.rotate != 0 || self.scaleX != 1 || self.scaleY != 1 || self.alpha != 1){
            self.save = true;
        }
        if(self.save){canvas.save();}
        var _x = self.x+cood.x;var _y = self.y+cood.y;
        if(self.rotate != 0 || self.scaleX != 1 || self.scaleY != 1){
            canvas.translate(self.x+cood.x+self.centerX,self.y+cood.y+self.centerY);
            _x = -self.centerX;_y = -self.centerY;//--self.centerY,为了让对象的中心处于平移后的context （0,0）点

            canvas.scale(self.scaleX,self.scaleY);
            canvas.rotate(self.rotate);
        }
        if(self.alpha != 1){
            canvas.globalAlpha = self.alpha;
        }
//        if(self.mask){
//            canvas.rect(_x+self.mask.x,_y+self.mask.y,self.mask.width,self.mask.height);
//            canvas.stroke();
//            canvas.clip();
//        }
        var _port = null;
        if(port){
            _port = port;
        }else if(self.viewPort){
            var vx = self.viewPort.x + _x;
            var vy = self.viewPort.y + _y;
            _port = new LRectangle(vx,vy,self.viewPort.width,self.viewPort.height);
        }
        var _gray = gray || self.gray;
        LGlobal.show(self.childList,{x:_x,y:_y},canvas,_port,_gray);
        if(self.save){
            canvas.restore();
            self.save = false;
        }
    },
    addChild:function (DisplayObject,bottom){
        if(!DisplayObject){
          console.log("DisplayObject can not be undefined");
        }
       // window.flag && console.log(this);
        var self  = this;
        if(bottom){
            self.childList.unshift(DisplayObject);
        }else{
            self.childList.push(DisplayObject);
        }
        if(!DisplayObject){
            alert("child undefined");
        }
        DisplayObject.parent = self;
    },
    jumpToTop:function(){
        var self  = this;
        var parent = self.parent;
        parent.removeChild(self);
        parent.addChild(self);
    },
    removeChild:function (DisplayObject){
        var self  = this;
        for(var i = 0;i<self.childList.length;i++){
            if(self.childList[i] == DisplayObject){
                self.childList.splice(i,1);
                DisplayObject.parent = null;
                return;
            }
        }
    },
    removeFromParent:function(){

        if(typeof this.parent != "undefined"){
            if(!this.parent){
                return;
            }
            this.parent.removeChild(this);
        }
    },
    removeChildAt:function (index){
        var self  = this;
        if(self.childList[index]){
            self.childList[index].parent = null;
            self.childList.splice(index,1);
        }
    },
    removeAllChild:function(){
        var self  = this;
        while(self.childList.length >0){
            var child = self.childList.shift();
            child.parent = null;
        }
        self.childList = [];
    },
    addEventListener:function (type,listener,context){
        var s = this;
        if(type == LEvent.ENTER_FRAME){
            s.frameList.push(listener);
        }else if(type == LMouseEvent.MOUSE_DOWN){
            s.downList.push({listener:listener,type:LMouseEvent.MOUSE_DOWN,context:context});
            s.downList.push({listener:listener,type:LTouchEvent.TOUCH_START,context:context});
        }else if(type == LMouseEvent.MOUSE_MOVE){
            s.moveList.push({listener:listener,type:LMouseEvent.MOUSE_MOVE,context:context});
            s.moveList.push({listener:listener,type:LTouchEvent.TOUCH_MOVE,context:context});
        }else if(type == LMouseEvent.MOUSE_UP){
            s.upList.push({listener:listener,type:LMouseEvent.MOUSE_UP,context:context});
            s.upList.push({listener:listener,type:LTouchEvent.TOUCH_END,context:context});
        }
    },
    removeEventListener:function (type,listener){
        var self = this;
        var mouseList;
        if(type == LEvent.ENTER_FRAME){
            mouseList = self.frameList;
        }else if(type == LMouseEvent.MOUSE_DOWN || type == LTouchEvent.TOUCH_START){
            mouseList = self.downList;
        }else if(type == LMouseEvent.MOUSE_UP || type == LTouchEvent.TOUCH_END){
            mouseList = self.upList;
        }else if(type == LMouseEvent.MOUSE_MOVE || type == LTouchEvent.TOUCH_MOVE){
            mouseList = self.moveList;
        }
        var i,length = mouseList.length;
        for(i=0;i<length;i++){
            var obj = mouseList[i];
//            if(obj.listener == listener && obj.type == type){
            if(obj.listener == listener){
                mouseList.splice(i,1);
                break;
            }
        }
    },
    //mouselist拆分为3个
    mouseEvent:function(on,type,event){
        var self = this;
        if(!self.visible || self.childList.length == 0 || !self.isMouseEnable)return;
        var mouseList;
        if(type == LMouseEvent.MOUSE_DOWN || type == LTouchEvent.TOUCH_START){
            mouseList = self.downList;
        }else if(type == LMouseEvent.MOUSE_MOVE || type == LTouchEvent.TOUCH_MOVE){
            mouseList = self.moveList;
        }else if(type == LMouseEvent.MOUSE_UP || type == LTouchEvent.TOUCH_END){
            mouseList = self.upList;
        }
        if(mouseList.length > 0){
            var key;
            var ml = mouseList.slice(0);
            for(key in ml){
                var obj = ml[key];
                if(obj.type == type){
                    event.clickTarget = self;
                    obj.listener.call(obj.context,event);
                }
            }
        }
        if(this.parent && this.parent.mouseEvent){
            this.parent.mouseEvent(on,type,event);
        }

    },
    ismouseon:function(event,cood){
        var self = this;
        if(!self.visible)return false;
        var key;

        var isclick = false;
        for(key in self.childList){
            isclick = self.childList[key].ismouseon(event,{x:self.x+cood.x,y:self.y+cood.y});
            if(isclick)
                break;
        }
        return isclick;
    }

}
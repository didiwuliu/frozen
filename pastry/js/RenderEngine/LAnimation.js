/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午1:49
 * To change this template use File | Settings | File Templates.
 */

//example
/*
 var imageArr = assetsData.cake[bpName];//[rectangle,rectangle,rectangle,rectangle,rectangle]
 var animationData = [{name:"animation",imageArr:imageArr}];

 this.animation = new LAnimation(new LBitmapData(assetsData.cake.image,null));
 this.animation.setAnimation(animationData);
 this.animation.setCurrentAnimation("animation");
 this.animation.stop = true;
 this.animation.loop = false;
 this.animation.y = -21;
 */

function LAnimation(bitmapdata){
    var self = this;
    self.type = "LAnimation";
    self.x = 0;
    self.y = 0;
    self.ax = 0;
    self.ay = 0;
    self.width = 0;
    self.height = 0;
    self.currentFrame = 0;
    self.scaleX=1;
    self.scaleY=1;
    self.centerX=0;//centerX,centerY对渲染的位置不起作用，只对变形有作用
    self.centerY=0;
    self.rotate = 0;
    self.alpha = 1;
    self.fps = 4;
    self.playTime = 0;
    self.fpsBack = 4;
    self.frameFunctionList = [];

    self.visible=true;
    self.forward = true;
    self.loop=false;
    self.yoyo=false;
    self.stop=false;

    self.bitmapData = bitmapdata;

//    if(self.bitmapData){
//        self.width = self.bitmapData.width;
//        self.height = self.bitmapData.height;
//    }
}

LAnimation.prototype = {
    show:function (cood,canvas,port,gray){
        var self = this;
        if(!self.visible)return;
        if(self.rotate != 0 || self.alpha != 1){
            self.save = true;
        }
        if(self.save){canvas.save();}
        var _x = self.x+cood.x+self.bitmapData.oX;var _y = self.y+cood.y+self.bitmapData.oY;
        if(self.rotate != 0){
            canvas.translate(self.x+cood.x+self.centerX,self.y+cood.y+self.centerY);
            _x = -self.centerX;_y = -self.centerY;//--self.centerY,为了让对象的中心处于平移后的context （0,0）点
            canvas.rotate(self.rotate);
        }
        if(self.alpha != 1){
            canvas.globalAlpha = self.alpha;
        }


        var _gray = gray || self.gray;
        util.drawImage(canvas,
            self.bitmapData.image,
            self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
            _x,_y,self.width*self.scaleX,self.height*self.scaleY,
            port,_gray);
//        canvas.drawImage(
//            self.bitmapData.image,
//            self.bitmapData.x,self.bitmapData.y,self.bitmapData.width,self.bitmapData.height,
//            _x,_y,self.width*self.scaleX,self.height*self.scaleY);
        if(!self.stop)self.loopFrame();

        if(self.save){
            canvas.restore();
            self.save = false;
        }
    },
    // event.x/Y 的用法需统一
    ismouseon:function(event){
//        return true;
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
    setAnimation:function(aimations){
//        [
//            {name:"run",imageArr:[{x:1,y:2},{x:3,y:4},width:100,height:100]},
//            {name:"stop",imageArr:[{x:1,y:2},{x:3,y:4},width:100,height:100]}
//        ]
        var self = this;
        self.currentFrame = 0;
        self.animations = aimations;
    },
    setCurrentAnimation:function(animationName){
        var self = this;
        self.currentFrame = 0;

        var index = 0;
        for(var i = 0;i<self.animations.length;i++){
            if(self.animations[i].name == animationName){
                index = i;
                break;
            }
        }
        self.currentAnimationName = self.animations[index].name;
        self.currentAnimation = self.animations[index];
        var coo = self.currentAnimation.imageArr[0];
        self.bitmapData.setProperties(coo);
        self.width = self.bitmapData.width;
        self.height = self.bitmapData.height;

        if(!self.currentAnimation){
            console.log("currentAnimation should not be null");

        }
        //切换currentAnimation时，把上次的frameFunction执行完
        var length = self.frameFunctionList.length;
        if(length > 0){
            for(var i=0;i<length;i++){
                var obj = self.frameFunctionList[i];
//            if(obj.frame <= self.currentFrame){
                if(!obj)continue;
                obj.fun.apply(obj.context,obj.params);
                self.frameFunctionList.splice(i,1);
                i--;
                length=self.frameFunctionList.length;
//            }
            }
        }

        //切换currentAnimation时，把上次的onComplete执行完
        // if(self.onComplete){self.onComplete();self.onComplete = null};
        //the width of smokeout in superHamster is 146,but other width is 120,so ,modify the position,to make sure the image is in center
        if(animationName == "Ssmokeout"){
            this.x = -13;
        }else if(animationName == "Ssmokein" || animationName == "Scute" || animationName == "Sdrowsy" || animationName == "Sangry" || animationName == "Ssniffing" || animationName == "Sstand"){
            this.x = 0;
        }
    },
    loopFrame:function (){
        var self = this;

        self.fpsBack--;
        if(self.fpsBack>0){
            return;
        }else{
            self.fpsBack = self.fps;
        }

        if(self.currentFrame == 0 && self.onStart && !self.stop){
            self.onStart();
        }
//        console.log("currentFrame:  "+self.currentFrame);
        //侦听帧函数
        var length = self.frameFunctionList.length;
        for(var i=0;i<length;i++){
            var obj = self.frameFunctionList[i];
            if(obj.frame <= self.currentFrame){
                obj.fun.apply(obj.context,obj.params);
                self.frameFunctionList.splice(i,1);
                i--,length=self.frameFunctionList.length;
            }
        }
        if(self.currentFrame >= self.currentAnimation.imageArr.length-1){
            if(self.loop){
                if(self.yoyo){
                    self.forward = false;
                    self.currentFrame = self.currentAnimation.imageArr.length-1;
                }else{
                    self.currentFrame = 0;
                }
            }else{
                if(self.playTime > 0){
                    self.playTime--;
                    self.currentFrame = 0;
                    return;
                }
                self.stop = true;
                if(self.onComplete){self.onComplete();self.onComplete = null};
                return;
            }
        }else if(self.currentFrame <= 0){
            self.forward = true;
            self.currentFrame = 0;
        }

        if(self.forward){
            self.currentFrame++;
        }else{
            self.currentFrame--;
        }

        var coo = self.currentAnimation.imageArr[self.currentFrame];
        if(!coo){
            "";
        }
        self.bitmapData.setProperties(coo);
        self.width = self.bitmapData.width;
        self.height = self.bitmapData.height;
    },
    setComplete:function (fun){
        var self = this;
        self.onComplete = fun;
    },
    addFrameFunction:function (frame,context,fun,params){
        var self = this;
        self.frameFunctionList.push({frame:frame,fun:fun,context:context,params:params});
    },
    setfps:function (fps){
        var self = this;
        self.fps = fps;
        self.fpsBack = fps;
    },
    setCurrentFrame:function (frame){
        var self = this;
        self.currentFrame = frame;

        var coo = self.currentAnimation.imageArr[frame];
        self.bitmapData.setProperties(coo);
        self.width = self.bitmapData.width;
        self.height = self.bitmapData.height;
    },
    playOnce:function(stand){
        var self = this;
        self.stop = false;
        self.loop = false;
        self.visible = true;
        self.currentFrame = 0;
        self.onComplete = function(){
            if(stand){
                self.stop = false;
                self.loop = true;
                self.setCurrentAnimation(stand)

            }else{
                self.stop = true;
                self.loop = false;
                if(self.currentAnimation.name == "Sstand" || self.currentAnimation.name == "stand")
                    self.setCurrentFrame(7);
                else
                    self.setCurrentFrame(0);
            }

        }
    },
    removeFromParent:function(){
        if(this.parent && typeof this.parent != "undefined"){
            this.parent.removeChild(this);
            this.parent = null;
        }
    },
    destroy:function(){
        this.animations = null;
        this.removeFromParent();
        this.frameFunctionList = null;
        this.onComplete = null;

    }

}
LAnimation.getAnimation = function(image,animationArr,currentName,fps,yoyo){
    var animation = new LAnimation(new LBitmapData(image,null));

    var animationData = [];
    var length = animationArr.length;
    for(var i = 0;i<length;i++){
        var obj = animationArr[i];
        var animationItem = {name:obj.name,imageArr:obj.imageArr};
        animationData.push(animationItem);
    }
    animation.setAnimation(animationData);
    animation.setCurrentAnimation(currentName);
    animation.stop = false;
    animation.loop = true;
    animation.yoyo = yoyo;
    animation.setfps(fps);

    return animation;
}




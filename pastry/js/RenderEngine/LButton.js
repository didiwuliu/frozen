/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-29
 * Time: 下午1:34
 * To change this template use File | Settings | File Templates.
 */
function LButton(bitmap,fun,context,selectedBitmap,downEffect,sound,text,centerPosition){
    LSprite.call(this);
//    var g = new LGraphics();
//    g.width = parseInt(bitmap.bitmapData.oW);
//    g.height = parseInt(bitmap.bitmapData.oH);
//    this.addChild(g);

    var self = this;
    self.bitmap = bitmap;
    self.sound = sound;
    self.addChild(bitmap);
    self.fun = fun;
    if(fun)
    {
        self.addEventListener(LMouseEvent.MOUSE_UP,fun,context);
    };
    if(bitmap.type = "LAnimation"){
        self.timer = new LTimer(3,function(){
            if(Math.random()>0.3){
                bitmap.stop = true;
            }else{
                bitmap.stop = false;
            }

        },this);
        self.timer.start();
    }
    if(selectedBitmap){
        self.selectedBitmap = selectedBitmap;
        self.selectedBitmap.visible = false;
        self.addChild(selectedBitmap);
    }
    //按钮上的文字
    if(text){
//        this.bitmap.width;
//        this.bitmap.height;
//        this.selectedBitmap;

        self.addChild(text);
        if(centerPosition){
            text.setCP(centerPosition.x,centerPosition.y)

        }else{
            var bow = parseInt(this.bitmap.bitmapData.oW);
            bow = bow?bow:this.bitmap.width;
            var ow = parseInt(text.bitmapData.oW);
            ow = ow?ow:text.width;
            var _x = bow -ow*text.scaleX;

            var boh = parseInt(this.bitmap.bitmapData.oH);
            boh = boh?boh:this.bitmap.height;
            var oh = parseInt(text.bitmapData.oH);
            oh = oh?oh:text.height;
            var _y = boh -oh*text.scaleY;

            text.x = _x/2;
            text.y = _y/2;
        }


    }
    if(downEffect){
        self.addEventListener(LMouseEvent.MOUSE_DOWN,this.onDownEffect,this);
    }

    self.addEventListener(LMouseEvent.MOUSE_UP,this.onSound,this);

}
LButton.prototype = Object.create(LSprite.prototype);
LButton.prototype.type="LButton";

LButton.prototype.setSelected = function(selected){
    if(this.selectedBitmap){
        if(selected){
            this.selectedBitmap.visible = true;
        }else{
            this.selectedBitmap.visible = false;
        }

    }

}
LButton.prototype.onDownEffect = function(event){
    this.selectedBitmap.visible = true;
    this.bitmap.visible = false;
    cakecake.downButtons.push(this);
}
LButton.prototype.onSound = function(event){
    soundManager.play(this.sound?this.sound:"confirm_next");
}
LButton.prototype.destroy = function(){
//    this.visible = false;
    this.removeEventListener(LMouseEvent.MOUSE_UP,this.fun);
    this.removeEventListener(LTouchEvent.TOUCH_END,this.fun);
    this.fun = null;

    if(this.timer){
        this.timer.remove();
        this.timer = null;
    }

    this.removeEventListener(LMouseEvent.MOUSE_DOWN,this.onDownEffect);
    this.removeEventListener(LTouchEvent.TOUCH_START,this.onDownEffect);

    this.removeEventListener(LMouseEvent.MOUSE_UP,this.onSound);
    this.removeEventListener(LTouchEvent.TOUCH_END,this.onSound);

    this.removeAllChild();
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-25
 * Time: 下午2:55
 * To change this template use File | Settings | File Templates.
 */
this.util = this.util || {};
(function(){
//    Object.prototype.cloneObject = function() {
//        var copy = (this instanceof Array) ? [] : {};
//        for (attr in this) {
//            if (!this.hasOwnProperty(attr)) continue;
//            copy[attr] = (typeof this[attr] == "object")?this[attr].cloneObject():this[attr];
//        }
//        return copy;
//    };

    this.util.getRandom = function(l,u){
        //得到的数，包含u。
       return Math.random()*(u-l+1)+l;
    };
    this.util.changeIntLength = function(num,length){
        num = num.toString();
        if(num.length < length){
            var cont = length - num.length;
            while(cont>0){
                cont--;
                num = "0"+num;
            }
        }
        return num;
    };
    this.util.drawImage = function(canvas,image,bx,by,bw,bh,dx,dy,dw,dh,port,gray){
        //image区域
        var bx = parseInt(bx);
        var by = parseInt(by);
        var bw = parseInt(bw);
        var bh = parseInt(bh);
        //绘制区域
        var dx = parseInt(dx);
        var dy = parseInt(dy);
        var dw = parseInt(dw);
        var dh = parseInt(dh);

        //超出上边界
        if(port){
            //纵向
            if(dy <= port.y){//上面
                if(dy+dh > port.y){
                    var th = port.y - dy;
                    dy = port.y;

                    var tp = th/dh;
                    dh -= th;

                    by = by + bh*tp;
                    bh = bh - bh*tp;
                }else{
                    return;
                }
            }else if(dy >= port.y+port.height){//下面
                return;
            }else if(dy > port.y && dy < port.y+port.height){//中间
                if(dy+dh >= port.y+port.height){
                    var th =dy+dh-port.y-port.height;
                    var tp = th/dh;

                    dh -= th;
                    bh = bh - bh*tp;
                }
            }
            //横向
            if(dx <= port.x){//左
                //超出右面
                if(dx+dw >= port.x+port.width){
                    var tw =dx+dw-port.x-port.width;
                    var tp = tw/dw;

                    dw -= tw;
                    bw = bw - bw*tp;
                }
                else if(dx+dw > port.x){
                    var tw = port.x - dx;
                    dx = port.x;

                    var tp = tw/dw;
                    dw -= tw;

                    bx = bx + bw*tp;
                    bw = bw - bw*tp;
                }else{
                    return;
                }
            }else if(dx >= port.x+port.width){//右面
                return;
            }else if(dx > port.x && dx < port.x+port.width){//中间
                if(dx+dw >= port.x+port.width){
                    var tw =dx+dw-port.x-port.width;
                    var tp = tw/dw;

                    dw -= tw;
                    bw = bw - bw*tp;
                }
            }
        }
        //console.log(image)
        canvas.drawImage(image,bx,by,bw,bh,dx,dy,dw,dh);
        if(gray){
            var context = util.getTempContext();
            context.clearRect(0,0,640,1136);
            context.drawImage(image,bx,by,bw,bh,0,0,dw,dh);
            context.save();
            context.globalAlpha = 0.6;
            context.globalCompositeOperation = "source-in";
            context.fillStyle = "#000000";
            context.fillRect(0,0,dw,dh);
            context.restore();

            canvas.drawImage(util.tempCanvas,0,0,dw,dh,dx,dy,dw,dh);
        }

//        if(gray){
//            var imgPix = canvas.getImageData(dx,dy,dw,dh);
//            //遍历每一个像素然后改变rgb，这个算法比grayscale= (R+G+B)/3好一些
//            for(var i=0, len=imgPix.data.length; i<len; i+=4){
//                var grayscale = imgPix.data[i ] * .3 + imgPix.data[i+1] * .59 + imgPix.data[i+2] * .09;
//                imgPix.data[i] = grayscale;
//                imgPix.data[i+1] = grayscale;
//                imgPix.data[i+2] = grayscale;
//            }
//            //重新推入图片
//            canvas.putImageData(imgPix,dx,dy,0,0,dw,dh);
//        }

    };
    this.util.fillText = function(canvas,text,x,y,port){
        if(port){
            if(y < port.y || y > port.y+port.height)
                return;
        }
        canvas.fillText(text, x, y);
    }
    this.util.convertIntFormat = function(num){
        var s = num.toString();
        var l = s.length;
        if(l<=3){
            return s;
        }
        var sunsTop = "";
        var subsEnd = "";
        var sa = [];

        while(l>3){
            sunsTop = s.substr(0,l-3);
            subsEnd = s.substr(l-3,3);
            sa.push(subsEnd);
            l = sunsTop.length;
        }
        sa.push(sunsTop);
        var newString = "";
        var subs = "";
        while(sa.length){
            subs = sa.pop();
            if(sa.length>0){
                newString = newString.concat(subs,",");
            }else{
                newString = newString.concat(subs);
            }

        }
//        return "22222222222"
        return newString;
    };
    this.util.convertTimeFormat = function(secondNum){
        var minute = parseInt(secondNum / 60);
        var seconds = secondNum % 60;
        seconds = seconds<10 ? "0"+seconds:seconds;
        minute = minute<10 ? "0"+minute:minute;
        var timeText = minute+":"+seconds;
        if(timeText == "NaN:NaN"){
            "";
        }
        return timeText;
    };
    this.util.getTempContext = function(){
        if(!util.context){
            util.tempCanvas = document.createElement("canvas");
            util.tempCanvas.width = 640;
            util.tempCanvas.height = 1136;
            util.context = util.tempCanvas.getContext("2d");
        }
        return util.context;
    };
    this.util.coverMaskToBitmap = function(image,bx,by,bw,bh,dx,dy,dw,dh){
        var context = util.getTempContext;
        context.drawImage(image,bx,by,bw,bh,0,0,dw,dh);
    }
    this.util.clone = function(myObj){
        if(typeof(myObj) != "object")
            return myObj;
        if(myObj == null)
            return myObj;
        var myNewObj = new Object();
        for(var i in myObj){
            myNewObj[i] = util.clone(myObj[i]);
        }
        return myNewObj;
    }
    this.util.destroyImage = function(image){
        if( image && image.dispose){
            image.dispose();
        }
        else{

        }
    }
    this.util.destroyDailyCakeResource= function(){
        delete assetsData.dailyCakeData;
        util.destroyImage(assetsData.dailyCake.image);
    }
    this.util.printObject = function(obj){
        if(!obj){
            console.log("obj is undefined(in util.printObject).")
        }
        var info = "";
        for(var key in obj){
            info += key+":"+obj[key]+",";
        }
        console.log(info);
    }
    this.util.setLogText = function (msg)
    {
        console.log(msg);
    }
}())
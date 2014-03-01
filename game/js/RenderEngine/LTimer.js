/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-26
 * Time: 上午9:14
 * To change this template use File | Settings | File Templates.
 */
function LTimer(interval,fun,context,params){
    this.interval = interval*1000;
    this.fun = fun;
    this.context = context;
    this.params = params;

    LTimer.intervalList.push(this);
}
LTimer.prototype.start = function(){
    this.beginTime = LTimer.passedTime;
    this.started = true;
}
LTimer.prototype.stop = function(){
    this.beginTime = 0;
    this.started = false;
}
LTimer.prototype.remove = function(){
    var i,length=LTimer.intervalList.length;
    for(i=0;i < length;i++){
        if(LTimer.intervalList[i] == this){
            LTimer.intervalList.splice(i,1);
            break;
        }
    }
}


LTimer.passedTime = 0;
LTimer.deltTime = 0;
LTimer.currentTime = 0
LTimer.lastTime = (new Date()).getTime();
LTimer.waitList = [];
LTimer.intervalList = [];

LTimer.waitToDo = function(second,fun,context,params){
    var endTime = second * 1000 + LTimer.passedTime;
    LTimer.waitList.push({timer:endTime,fun:fun,params:params,context:context});
}

LTimer.onFrame = function(){
    LTimer.currentTime = (new Date()).getTime();
    LTimer.deltTime = LTimer.currentTime - LTimer.lastTime;
    LTimer.lastTime = LTimer.currentTime;
    LTimer.passedTime += LTimer.deltTime;
    //waittodolist
    var i,length=LTimer.waitList.length;
    for(i=0;i < length;i++){
        if(LTimer.passedTime >= LTimer.waitList[i].timer){
            var obj = LTimer.waitList[i];
            obj.fun.apply(obj.context,obj.params);
            var t = LTimer.waitList.splice(i,1);
            i--,length=LTimer.waitList.length;
        }
    }
    //intervalList
    var i,length=LTimer.intervalList.length;
    for(i=0;i < length;i++){
        if(LTimer.intervalList[i].started){
            var obj = LTimer.intervalList[i];
            if( LTimer.passedTime >= (obj.beginTime + obj.interval)){
                obj.beginTime = LTimer.passedTime;
                obj.fun.apply(obj.context,obj.params);
                //timer将自身清除
                if(length > LTimer.intervalList.length){
                    length = LTimer.intervalList.length;
                    i--;
                }
            }
        }
    }
}

//使用方法
//function a(){
//    console.log("LTimer.passedTime: "  + LTimer.passedTime)
//}
//var b = new LTimer(1,a,null,null);
//b.start();
//function c(){
//    b.stop();
//}
//LTimer.waitToDo(5,c,null,null);


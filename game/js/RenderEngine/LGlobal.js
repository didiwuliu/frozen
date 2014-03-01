/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午2:18
 * To change this template use File | Settings | File Templates.
 */
 window.isInitialized = false;
var LGlobal = function (){
    var self = this;
    self.type = "LGlobal";
    self.canvas = null;
    self.width = 0;
    self.height = 0;
    self.ax = 0;
    self.ay = 0;
    self.childList = new Array();
    self.setCanvas = function (id,top){
        var self = this;
        var canvasObj = document.getElementById(id);
        self.width = canvasObj.width;
        self.height = canvasObj.height;
        self.canvas = canvasObj.getContext("2d");
        //top  最上层,用来侦听事件
        if(top){
            LEvent.addEventListener(canvasObj,LMouseEvent.MOUSE_DOWN,function(event){
                event.preventDefault();
                var _event = HP.refresh(event);
                util.printObject(_event);
                if(mouseHandler.gridWork){
                    onMouseDown(_event);
                }
                LGlobal.mouseEvent(_event,LMouseEvent.MOUSE_DOWN,self.childList);

            });
            LEvent.addEventListener(canvasObj,LMouseEvent.MOUSE_MOVE,function(event){
                event.preventDefault();
                var _event = HP.refresh(event);
                util.printObject(_event);
                if(mouseHandler.gridWork){
                    onMouseMove(_event);
                }
                LGlobal.mouseEvent(_event,LMouseEvent.MOUSE_MOVE,self.childList);

            });
            LEvent.addEventListener(canvasObj,LMouseEvent.MOUSE_UP,function(event){
                event.preventDefault();
                var _event = HP.refresh(event);
                util.printObject(_event);
                while(cakecake.downButtons.length){
                    var btn = cakecake.downButtons.shift();
                    btn.selectedBitmap.visible = false;
                    btn.bitmap.visible = true;
                }
                if(mouseHandler.gridWork){
                    onMouseUp(_event);
                }
                LGlobal.mouseEvent(_event,LMouseEvent.MOUSE_UP,self.childList);

            });

            LEvent.addEventListener(canvasObj,LTouchEvent.TOUCH_START,function(event){
                event.preventDefault();
                var _event = HP.refresh(event);
                util.printObject(_event);
                if(mouseHandler.gridWork){
                    onTouchStart(_event);
                }
                LGlobal.mouseEvent(_event,LTouchEvent.TOUCH_START,self.childList);
            });
            LEvent.addEventListener(canvasObj,LTouchEvent.TOUCH_MOVE,function(event){
                event.preventDefault();
                var _event = HP.refresh(event);
                util.printObject(_event);
                if(mouseHandler.gridWork){
                    onTouchMove(_event);
                }
                LGlobal.mouseEvent(_event,LTouchEvent.TOUCH_MOVE,self.childList);
            });
            LEvent.addEventListener(canvasObj,LTouchEvent.TOUCH_END,function(event){
                event.preventDefault();
                var _event = HP.refresh(event);
                util.printObject(_event);
                while(cakecake.downButtons.length){
                    var btn = cakecake.downButtons.shift();
                    btn.selectedBitmap.visible = false;
                    btn.bitmap.visible = true;
                }

                if(mouseHandler.gridWork){
                    onTouchEnd(_event);
                }
                LGlobal.mouseEvent(_event,LTouchEvent.TOUCH_END,self.childList);
            });
        }
    }
    self.onShow = function (){
        if(self.canvas == null)return;
        self.canvas.clearRect(0,0,self.width,self.height);
        LGlobal.show(self.childList,null,self.canvas);
    }
    self.addChild = function(displayObject){
        displayObject.parent = self;
        self.childList.push(displayObject);
    }
}

LGlobal.show = function(showlist,cood,canvas,port,gray){
    var key;
    for(key in showlist){
        if(showlist[key].show){
            showlist[key].show(cood,canvas,port,gray);
        }
    }
}
LGlobal.mouseEvent = function(event,type,childList){
    //只有ui层可点击，所以默认只选UI层
    var nodeArr = [childList.slice(2)];
    var currNode;
    var on = false;
    while(nodeArr.length>0){

        //取得当前节点和节点的绝对坐标
        var lastIndex = nodeArr.length-1;
        currNode = nodeArr[lastIndex].pop();
        if(currNode.parent){
            currNode.ax = currNode.parent.ax+currNode.x;
            currNode.ay = currNode.parent.ay+currNode.y;
        }
        //如果nodeArr最后一个数组长度为0，则弹出
        if(nodeArr[lastIndex].length <= 0){
            nodeArr.pop();
        }
        //如果是LSprite，则将childList压入栈
        if(currNode.type == "LSprite" || currNode.type == "LButton"){
            if(currNode.isMouseEnable && currNode.visible && currNode.childList && currNode.childList.length > 0){
                nodeArr.push(currNode.childList.slice(0));
            }
        //如果是LBitmap或者其他，则做on判断
        }else if(currNode.type == "LBitmap" || currNode.type == "LAnimation" || currNode.type == "LGraphics" ){
            if(currNode.visible){
                on = currNode.ismouseon(event);
            }

        }else{
            //处理九宫格，textField 等；
        }
        //如果被点击，则事件冒泡，默认其他被遮挡，并返回
        if(on){
            currNode.mouseEvent(on,type,event);
            return;
        }
    }
}

LGlobal.initialize = function(speed){
    if (window.isInitialized) {
        return;
    };
    window.isInitialized = true;
    LGlobal.globals = {};
    LGlobal.speed = speed;
    LGlobal.TweenLite = new $LTweenLite();

    setInterval(function(){
        if(LGlobal.pause)
            return;
        LGlobal.onFrame();
    },speed);
}
LGlobal.onFrame = function(){
    for(var key in LGlobal.globals){
        if(LGlobal.globals[key].onShow){
            LGlobal.globals[key].onShow();
        }
    }
    if(LGlobal.TweenLite.show){
        LGlobal.TweenLite.show();
    }
    LTimer.onFrame();
}
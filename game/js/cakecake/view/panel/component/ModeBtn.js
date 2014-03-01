/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午5:04
 * To change this template use File | Settings | File Templates.
 */
function ModeBtn(image1,btnRect,image2,btnRect_h,image6,btnRect_lock,image3,glowRect,image4,startRect,image5,nameRect,image7,textRect,mode){
    LSprite.call(this);
    this.mode = mode;
    if(!image2)image2 = image1;
    if(!image3)image3 = image1;
    if(!image4)image4 = image1;
    if(!image5)image5 = image1;
    if(!image6)image6 = image1;
    if(!image7)image7 = image1;
    this.selected = false;
    //光效
    var bpd = new LBitmapData(image3,glowRect);
    this.glowEffect = new LBitmap(bpd);
    this.glowEffect.visible = false;
    this.glowEffect.x = -190;
    this.addChild(this.glowEffect);

    //星星
    this.star = new CountDown(this.mode);
    this.star.x = 188;this.star.y = -5;
    this.addChild(this.star);
    //普通按钮
    this.modeBtn = new LSprite();
    //start按钮
    var bpd = new LBitmapData(image4,startRect);
    var startbp = new LBitmap(bpd);
    startbp.setHitRect(40,30,120,73);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.start_f);
    var startbpt = new LBitmap(bpdt,"start_f");
    this.startBtn = new LButton(startbp,null,this,null,false,null,startbpt,{x:103,y:65});
    this.startBtn.visible = false;
    this.startBtn.x = -165;
    this.startBtn.y = -260;
    this.modeBtn.addChild(this.startBtn);
    //选中前按钮
    var bpd = new LBitmapData(image1,btnRect)
    this.btn = new LBitmap(bpd);
    this.btn.y = -20;
    this.btn.setHitRect(50,60,120,150);
    this.modeBtn.addChild(this.btn);
    //选中后的按钮
    var bpd = new LBitmapData(image2,btnRect_h);
    this.btn_h = new LBitmap(bpd);
    this.btn_h.setHitRect(50,60,120,150);
    this.btn_h.visible = false;
    this.btn_h.y = -20;
    this.modeBtn.addChild(this.btn_h);
    this.addChild(this.modeBtn);
    //未开启按钮
    if(mode != "mode1"){
        var bpd = new LBitmapData(image6,btnRect_lock);
        this.btn_lock = new LBitmap(bpd);
        this.btn_lock.setHitRect(50,60,120,150);
        this.btn_lock.y = -20;
        this.btn_lock.visible = false;
        this.modeBtn.addChild(this.btn_lock);
    }

    //模式名称背景
    var bpd = new LBitmapData(image5,nameRect);
    var bp = new LBitmap(bpd);
    this.modeNameSprite = new LSprite();
    this.modeNameSprite.addChild(bp);
    this.modeNameSprite.y = 146;
    this.modeNameSprite.x = 10;
    this.modeBtn.addChild(this.modeNameSprite);
    //模式名称
    var bpd = new LBitmapData(image7,textRect);
    var nameInRects = "modes_name"+this.mode.charAt(4)+"_text";
    var bp = new LBitmap(bpd,nameInRects);
    bp.setCP(132,227);
    this.modeBtn.addChild(bp);
    //模式名称光效
    var animationData = [{name:"modeNameLight",imageArr:assetsData.effectAnimation.menu_btn_animation.modes_light.rectsData}];
    var animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.menu_btn_animation.image,null));
    animation.setAnimation(animationData);
    animation.setCurrentAnimation("modeNameLight");
    animation.setfps(5);
    animation.visible = false;
    animation.y  = 28;
    animation.x  = -3;
    this.modeNameSprite.addChild(animation);
    function a(){
        if(Math.random()>0.3){
            return;
        }
        animation.visible = true;
        animation.playOnce();
        animation.setComplete(function(){
            animation.stop = false;
            animation.loop = false;
            animation.setCurrentFrame(0);
            animation.visible = false;
        })
    }
    this.nameAnimationTimer = new LTimer(1.5,a,this);
    this.nameAnimationTimer.start();
    //模式数量
    this.modeCount = new LTextField();
    if(userInfo.modes[this.mode].unlimited){
        this.modeCount.text = "∞";
        this.modeCount.font_weight = "bold";
        this.modeCount.size = 50;
        this.modeCount.x = 130;
        this.modeCount.y = -30;
        this.modeCount.color = "#4e0909";
    }else{
        this.modeCount.text = util.changeIntLength(userInfo.modes[this.mode].count,2);
        this.modeCount.size = 24;
        this.modeCount.font_weight = "bold";
        this.modeCount.x = 130;
        this.modeCount.y = -4;
        this.modeCount.color = "#4e0909";
    }


    this.modeNameSprite.addChild(this.modeCount);
    this.timesSign = new LTextField();
    this.timesSign.text = "X";
    this.timesSign.size = 24;
    this.timesSign.font_weight = "bold";
    this.timesSign.x = 111;
    this.timesSign.y = -4;
    this.timesSign.color = "#4e0909";
    this.modeNameSprite.addChild(this.timesSign);
    //解锁闪光
    this.unlockLight = new LSprite();
    this.unlockLight.x = 140;
    this.unlockLight.y = 122;
    this.addChild(this.unlockLight);
    //锁
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.lock);
    var bp = new LBitmap(bpd);
    this.lock = new LSprite();
    this.lock.centerX = 26;
    this.lock.centerY = 33;
    this.lock.addChild(bp);
    this.lock.x = 140;
    this.lock.y = 122;
    this.addChild(this.lock);

    //通往商店
    this.shopSprite = new LSprite();
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.sold_out_bg);
    var bp = new LBitmap(bpd);
    this.shopSprite.addChild(bp);
    //商店按钮
    //
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.green_short);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.green_short_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.store_btn);
    var bpt = new LBitmap(bpdt,"store_btn");

    this.shopBtn = new LButton(bp,this.onShop,this,bph,true,null,bpt,{x:78,y:27});
    this.shopBtn.x = 14;this.shopBtn.y = 90;
    this.shopSprite.addChild(this.shopBtn);
    this.shopSprite.visible = false;
    this.shopSprite.x = 38;
    this.addChild(this.shopSprite);
    //设置是否解锁
    if( userInfo.playTime[this.mode].unlock){
        this.setEnable(true);
    }else{
        this.setEnable(false);
    }

    this.modeBtn.addEventListener(LMouseEvent.MOUSE_UP,this.setState,this);
}
ModeBtn.prototype = Object.create(LSprite.prototype);
ModeBtn.prototype.type="ModeBtn";
ModeBtn.prototype.showBtn = function(event){
    // var self = event.clickTarget.parent;
    var self = this;
    self.modeBtn.visible = true;
    self.shopSprite.visible = false;
    self.btn.visible = true;
    self.btn_h.visible = false;
    self.glowEffect.visible = false;
    self.startBtn.visible = false;
    self.startBtn.x = -165;
    self.startBtn.y = -260;
}
ModeBtn.prototype.showBtn_h = function(event){
    //var self = event.clickTarget.parent;
    var self = this;
    self.modeBtn.visible = true;
    self.shopSprite.visible = false;
    self.btn.visible = false;
    self.btn_h.visible = true;
    self.glowEffect.visible = true;
    self.startBtn.visible = true;
    LGlobal.TweenLite.to(self.startBtn,500,{x:-27,y:-102,ease:Bounce.easeOut});
}
ModeBtn.prototype.setState = function(event,selected){
    if(event){
        event.stopGoOn = true;
        // var self = event.clickTarget.parent;
        if(!this.unlock){
            var lockTip = new LockTipDialogBox(420);
            lockTip.setData(gameConfig.modeIntroduction[this.mode].unlockCondition);
            lockTip.x = 85;lockTip.y = 486;
            visibleManager.showDialog(lockTip);
            return;
        };
        var self = this;
        if(userInfo.modes[self.mode].count <= 0){
            self.shopSprite.visible = true;
            self.btn.visible = false;
            self.btn_h.visible = false;
            self.parent.recoverOtherState(self);
            return;
        }
        if(self.selected){
            //由选中状态设置成未选中状态
//            self.selected = false;
//            self.showBtn(event);
            //confirm_next
            soundManager.play("confirm_next");
//            gameUI.modePanel.isMouseEnable = false;
            this.startGame();
        }else{
            //由未选中状态设置成选中状态
            soundManager.play("select");
            self.selected = true;
            self.showBtn_h(event);
            //把其他按钮设置成非选中状态
            self.parent.recoverOtherState(self);
        }

    }else{
        if(selected){
            this.selected = true;
            this.showBtn_h(event);
        }else{
            this.selected = false;
            this.showBtn(event);
        }
    }

}
ModeBtn.prototype.startGame = function(event){
    if(userInfo.modes[this.mode].count < 1)return;
    //消耗星星的动画
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.menu_explodingStar.starConsume.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.menu_explodingStar.image,animationArr,"animation",4,false);
    animation.x = 50-128-1;animation.y = 113-117-2;
    animation.setfps(2);
    animation.playOnce();
    animation.setComplete(function(){
        this.removeFromParent();
    });
    this.addChild(animation);
    //star
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.star_up);
    var star = new LBitmap(bpd);
    var starSprite = new LSprite();
    starSprite.centerX = assetsData.menu.star_up.width/2;
    starSprite.centerY = assetsData.menu.star_up.height/2;
    starSprite.addChild(star);
//    starSprite.scaleX = starSprite.scaleY = 1.5;
    starSprite.x = 87;starSprite.y = 150;
    this.addChild(starSprite);
    LGlobal.TweenLite.to(starSprite,1000,{y:91,onComplete:function(params){
        var starSprite = params[0];
        var mode = params[1];
        star.removeFromParent();
        //runtimeData.startGameByMode(mode);
        if(mode == "mode5" ||  userInfo.playTime.mode1.time < 1){
            //runtimeData.startGameByMode(mode);
            assetsData.loadGameAssets(mode);
        }else{
            runtimeData.selectAssistant(mode);
        }

    },ease:Quint.easeIn,params:[starSprite,this.mode]});

    //runtimeData.startGameByMode(this.mode);
}
ModeBtn.prototype.onShop = function(event){
//    this.modeBtn.visible = true;
//    this.shopSprite.visible = false;
    visibleManager.gotoMode(false);
    visibleManager.showPanel("store",1);
}
ModeBtn.prototype.setModeCount = function(count){
    if(count == "unlimited"){
        this.modeCount.text = "∞";
        this.modeCount.font_weight = "bold";
        this.modeCount.color = "#4e0909";
        this.modeCount.size = 50;
        this.modeCount.x = 129;
        this.modeCount.y = -30;
        return;
    }
//    this.modeCount.text = userInfo.modes[this.mode].count;
    this.modeCount.text = util.changeIntLength(userInfo.modes[this.mode].count,2);
    this.modeCount.size = 24;
    this.modeCount.color = "#4e0909";
    this.modeCount.font_weight = "bold";
    this.modeCount.x = 129;
    this.modeCount.y = -4;
}
ModeBtn.prototype.setEnable = function(enable,withAnimation){
    if(enable){
        if(withAnimation){
//            this.setEnable(true);
//            var modeTip = new ModeTipDialogBox(500,200);
//            modeTip.setData(gameConfig.modeIntroduction[this.mode].introduction);
//            gameUI.uiLayer.addChild(modeTip);
            LTimer.waitToDo(2,this.unlockAnimation,this);
        }else{
            this.unlock = true;
            userInfo.playTime[this.mode].unlock = true;
            userProfile.savePlayTimes();
            this.btn_h.visible = false;
            this.btn.visible = true;
            if(this.btn_lock)
                this.btn_lock.visible = false;
            this.lock.visible = false;
            this.star.visible = true;
        }
    }else{
        this.unlock = false;
        this.btn_h.visible = false;
        this.btn.visible = false;
        if(this.btn_lock)
           this.btn_lock.visible = true;
        this.lock.visible = true;
        this.star.visible = false;
    }
}
ModeBtn.prototype.unlockAnimation = function(){
    soundManager.play("Unlock");
    //light
    var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.unLockLight);
    var bp = new LBitmap(bpd);
    this.light = new LSprite();
    this.light.addChild(bp);
    this.light.x = -105;
    this.light.centerX = parseInt(assetsData.menu.unLockLight.w)/2;
    this.light.centerY = parseInt(assetsData.menu.unLockLight.h)/2;
    this.light.y = -84;
    this.unlockLight.addChild(this.light);

    this.lock.rotate = -Math.PI/6;
    var lockTween = LGlobal.TweenLite.to(this.lock,120,{rotate:Math.PI/6,yoyo:true,ease:Quint.easeInOut});

    //光转圈
    var lightTween = LGlobal.TweenLite.to(this.light,2200,{rotate:Math.PI,onComplete:function(params){
        var modeBtn = params[0];
        var lockTween = params[1];
        LGlobal.TweenLite.removeTween(lockTween);
        modeBtn.lock.rotate = 0;
        modeBtn.lock.removeAllChild();
        var bpd = new LBitmapData(assetsData.menu.image,assetsData.menu.lock_open);
        var bp = new LBitmap(bpd);
        modeBtn.lock.addChild(bp);
        //锁掉落
        var dropTween = LGlobal.TweenLite.to(modeBtn.lock,1000,{y:modeBtn.lock.y+80,alpha:0,onComplete:function(params){
            var modeBtn = params[0];
            modeBtn.removeChild(modeBtn.lock);
            modeBtn.setEnable(true);
        },params:[modeBtn],ease:Quint.easeInOut});
        var lightTween = LGlobal.TweenLite.to(modeBtn.light,1000,{scaleX:2.3,scaleY:2.3,alpha:0,onComplete:function(params){
            var modeBtn = params[0];
            modeBtn.removeChild(modeBtn.light);
        },params:[modeBtn],ease:Quint.easeInOut});
    },params:[this,lockTween],ease:Quint.easeInOut});
}
ModeBtn.prototype.destroy = function(){
    this.removeAllChild();

    this.startBtn.destroy();
    this.startBtn = null;
    this.shopBtn.destroy();
    this.shopBtn = null;;

    this.nameAnimationTimer.remove();

    this.modeBtn.removeEventListener(LMouseEvent.MOUSE_UP,this.setState)
    this.modeBtn.removeEventListener(LTouchEvent.TOUCH_END,this.setState);
    this.modeBtn = null;

}
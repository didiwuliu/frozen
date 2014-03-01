/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-13
 * Time: 下午4:11
 * To change this template use File | Settings | File Templates.
 */
//每日领取面板
function DailyRewardPanel(){
    LSprite.call(this);
    this.hasReceived = false;
    //背景
    var bpd = new LBitmapData(assetsData.dailyCake.image,assetsData.dailyCake.daily_reward_bg);
    var bp = new LBitmap(bpd);
    this.addChild(bp);
    //顶部解释说明
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.day_text_01);
    var bp = new LBitmap(bpd,"day_text_01");
    bp.setCP(320-27,230);
    this.addChild(bp);
    //左下角
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.day_text_02);
    var bp = new LBitmap(bpd,"day_text_02");
    bp.setCP(135,685);
    this.addChild(bp);
    //右下角
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.day_text_03);
    var bp = new LBitmap(bpd,"day_text_03");
    bp.setCP(446,685);
    this.addChild(bp);

    //对号
    var bpd = new LBitmapData(assetsData.dailyCake.image,assetsData.dailyCake.yes_h);
    var checkMarkBp = new LBitmap(bpd);

    var position = [{x:125,y:252},{x:353,y:252},{x:119,y:417},{x:351,y:417},{x:224,y:579}];
    for(var i = 0;i<5;i++){
        var daily_reward = "daily_reward_"+(i+1);
        //cake
        var bpd = new LBitmapData(assetsData.dailyCake.image,assetsData.dailyCake[daily_reward]);
        var cakeBp = new LBitmap(bpd);
        // day text
        var bpd = new LBitmapData(assetsData.text.image,assetsData.text.day);
        var dayText = new LBitmap(bpd,"day");
        //coins icon
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon);
        var coinIcon = new LBitmap(bpd);
        //rewardCoin
        var coinQuantities = gameConfig.dailyReward[i];

        var dailyRewardBtn = new DailyCake(cakeBp,dayText,checkMarkBp,coinIcon,i,coinQuantities);
        //dailyRewardBtn.setState("received");
        dailyRewardBtn.x = position[i].x;dailyRewardBtn.y = position[i].y;
        this.addChild(dailyRewardBtn);
        //i :index.所以 i+1，successiveLoginTime从第二次登陆算第一次，所以successiveLoginTime-1
        if(i+1 < userInfo.login.successiveLoginTime-1){
            dailyRewardBtn.setState("received");
        }else if(i+1 == userInfo.login.successiveLoginTime-1){
            dailyRewardBtn.setState("canReceive");
            dailyRewardBtn.addEventListener(LMouseEvent.MOUSE_DOWN,this.gainReward,this);
        }else if(i+1 > userInfo.login.successiveLoginTime-1){
            dailyRewardBtn.setState("notReceive");
        }
    }

    //share button
    //shareButton,
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.green_short);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.green_short_h);
    var bph = new LBitmap(bpdh);

    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.share);
    var bpt = new LBitmap(bpdt,"share");
    this.shareBtn = new LButton(bp,this.onShare,this,bph,true,null,bpt,{x:78,y:27});
    this.shareBtn.y = 760;
    this.shareBtn.x = 90;
    this.shareBtn.scaleX = 0.1;
    this.shareBtn.scaleY = 0.1;
    this.shareBtn.centerX = parseInt(assetsData.public.green_short.w)/2;
    this.shareBtn.centerY = parseInt(assetsData.public.green_short.h)/2;
    this.shareBtn.visible = false;
    this.addChild(this.shareBtn);
    //ok BUtton
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.short_btn);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.short_btn_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.ok);
    var bpt = new LBitmap(bpdt,"ok");
    this.okBtn = new LButton(bp,this.onOK,this,bph,true,null,bpt,{x:78,y:27});
    this.okBtn.visible = false;
    this.okBtn.x = 350;
    this.okBtn.y = 760;
    this.okBtn.scaleX = 0.1;
    this.okBtn.scaleY = 0.1;
    this.okBtn.centerX = parseInt(assetsData.public.short_btn.w)/2;
    this.okBtn.centerY = parseInt(assetsData.public.short_btn.h)/2;
    this.addChild(this.okBtn);
}
DailyRewardPanel.prototype = Object.create(LSprite.prototype);
DailyRewardPanel.prototype.onShare = function(){
    var message = string.currentString[gameConfig.stringOfShare.FB_DR_body_01.name];
    var linkCaption = "cake & cake";
    var index = userInfo.login.successiveLoginTime-1;
//    var url = "http://zhangchunsheng.github.io/cakeandcake/images/dailyreward/daily_reward_5.png";
    var url = "http://zhangchunsheng.github.io/cakeandcake/images/dailyreward/daily_reward_"+index+".png";
    var mediaURL = url;
    var linkURL = "http://www.wozlla.com/";
    var linkText = string.currentString[gameConfig.stringOfShare.FB_DR_title_01.name];

    var coins = gameConfig.dailyReward[userInfo.login.successiveLoginTime-1];
    message = message.replace(/{COINS}/,coins);
    message = message.replace(/{DAYS}/,userInfo.login.successiveLoginTime);

    facebook.publishAMessage(message, mediaURL, linkURL, linkText, linkCaption);
}
DailyRewardPanel.prototype.onOK = function(event){
    if(!this.hasReceived){
        alert(string.currentString.s183);
        return;
    }
    visibleManager.gotoMode(true);
    visibleManager.hidePanel("dailyReward");
    event.stopGoOn = true;

    util.destroyDailyCakeResource();
}
DailyRewardPanel.prototype.gainReward = function(event){
    var coins = gameConfig.dailyReward[userInfo.login.successiveLoginTime-1-1];
    event.clickTarget.setState("received");
    userInfo.coins += coins;
    userProfile.saveCoinsInfo();
    this.hasReceived = true;

    //按钮
    this.okBtn.visible = true;
    LGlobal.TweenLite.to(this.okBtn,800,{scaleX:1,scaleY:1,ease:Bounce.easeOut});

    LGlobal.TweenLite.to(this.shareBtn,800,{scaleX:1,scaleY:1,ease:Bounce.easeOut});
    this.shareBtn.visible = true;
}
//每日蛋糕


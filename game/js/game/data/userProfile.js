/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-22
 * Time: 下午6:19
 * To change this template use File | Settings | File Templates.
 */
this.userProfile = this.userProfile || {};
this.userProfile.originalAchievement = {
    achievement_novice_001:false,
    achievement_novice_002:false,
    achievement_novice_003:false,
    achievement_novice_004:false,
    achievement_novice_005:false,
    achievement_novice_006:false,
    achievement_novice_007:false,
    achievement_novice_008:false,
    achievement_novice_009:false,
    achievement_novice_010:false,

    achievement_hardcore_001:false,
    achievement_hardcore_002:false,
    achievement_hardcore_003:false,
    achievement_hardcore_004:false,
    achievement_hardcore_005:false,
    achievement_hardcore_006:false,
    achievement_hardcore_007:false,
    achievement_hardcore_008:false,
    achievement_hardcore_009:false,

    achievement_adventurer_001:false,
    achievement_adventurer_002:false,
    achievement_adventurer_003:false,
    achievement_adventurer_004:false,
    achievement_adventurer_005:false,
    achievement_adventurer_006:false,
    achievement_adventurer_007:false,
    achievement_adventurer_008:false,
    achievement_adventurer_009:false,
    achievement_adventurer_010:false,
    achievement_adventurer_011:false,
    achievement_adventurer_012:false,
    achievement_adventurer_013:false
};
((function(){

    var oneDay = 86400000;//一天的时间
    this.userProfile.checkLogin = function(){
        var currentDate = userProfile.getCurrentDate();
        //userInfo.login.preLoginTime  上一次登录时间
        if(userInfo.login.preLoginTime){
            if(currentDate - userInfo.login.preLoginTime > oneDay){
                userInfo.login.preLoginTime = currentDate;
                userInfo.login.firstToday = true;
                userInfo.login.successiveLoginTime = 1;
            }else if(currentDate - userInfo.login.preLoginTime == oneDay){
                userInfo.login.preLoginTime = currentDate;
                userInfo.login.firstToday = true;
                userInfo.login.successiveLoginTime++;
            }else if(currentDate == userInfo.login.preLoginTime){
                userInfo.login.firstToday = false;
            }else{
                userInfo.login.preLoginTime = currentDate;
                userInfo.login.firstToday = true;
                userInfo.login.successiveLoginTime++;
            }

            if(userInfo.login.successiveLoginTime > 6){
                userInfo.login.successiveLoginTime = 2;
            }

        }else{
            userInfo.login.preLoginTime = currentDate;
            userInfo.login.firstToday = true;
            userInfo.login.successiveLoginTime=1;
        }
        userProfile.saveLoginInfo();
    }
    this.userProfile.getCurrentDate = function(){
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }

    this.userProfile.saveLoginInfo = function(){
        localStorage.setItem("userInfo.login",JSON.stringify(userInfo.login));
    }
    this.userProfile.saveVolumeInfo = function(){
        localStorage.setItem("userInfo.volume",JSON.stringify(userInfo.volume));
    }
    this.userProfile.saveTutorialInfo = function(tryTutorial){
        localStorage.setItem("userInfo.tryTutorial",JSON.stringify(tryTutorial));
    }
    this.userProfile.saveModesInfo = function(mode){

        localStorage.setItem("userInfo.modes",JSON.stringify(userInfo.modes));

        if(!mode){
            return;
        }
        if(mode == "all"){
            if(userInfo.modes["mode2"].unlimited && userInfo.modes["mode3"].unlimited && userInfo.modes["mode4"].unlimited){
                var items = gameUI.storePanel.specialsGoods.items;
                items[items.length - 1].setEnable(false);
            }
        }
        else if(mode != "mode1" && userInfo.modes[mode].unlimited){
            for(var key in gameUI.storePanel.specialsGoods.items){
                var item = gameUI.storePanel.specialsGoods.items[key];
                if(item.data.mode == mode){
                    item.setEnable(false);
                }
            }
        }
    }
    this.userProfile.saveCoinsInfo = function(){
        localStorage.setItem("userInfo.coins",userInfo.coins);
        if(typeof(gameUI)!="undefined")
        {
            if(gameUI.shop){
                gameUI.shop.setCoins();
            }
            gameUI.getCoinsInfoComponent().setCoinsQuantity(userInfo.coins);
        }
    }
    this.userProfile.savePlayTimes = function(){
        localStorage.setItem("userInfo.playTime",JSON.stringify(userInfo.playTime));
    }
    this.userProfile.saveGameResultLog = function(){
        function sortScore(a,b){
            //降序排列
            return -(a.score - b.score);
        }
        for(var i = 1;i<=4;i++){
            userInfo.gameResultLog["mode"+i].sort(sortScore);
            while(userInfo.gameResultLog["mode"+i].length > 7){
                userInfo.gameResultLog["mode"+i].pop();
            }
        }

        localStorage.setItem("userInfo.gameResultLog",JSON.stringify(userInfo.gameResultLog));
    }
    this.userProfile.saveAchievementsInfo = function(){
        localStorage.setItem("userInfo.achievements",JSON.stringify(userInfo.achievements));
    }

    this.userProfile.initUserInfo = function(){
        userInfo = {};
        //login
        var loginStr = localStorage.getItem("userInfo.login");
        if(loginStr && loginStr != "undefined"){
            console.log("userInfoStr:  "+loginStr);
            userInfo.login = JSON.parse(loginStr);
        }else{
            userInfo.login = {};
            userInfo.login.successiveLoginTime = 0;
            userInfo.login.firstToday = false;
            userInfo.login.preLoginTime = null;
        }
        //mode
        var modeStr = localStorage.getItem("userInfo.modes");
        if(modeStr && modeStr != "undefined"){
            console.log("modeStr:  "+modeStr);
            userInfo.modes = JSON.parse(modeStr);
        }else{
           userProfile.initializeModeLog();
        }
        //coins
        var coinsStr = localStorage.getItem("userInfo.coins");
        if(coinsStr && coinsStr != "undefined" && coinsStr != "NaN"){
            userInfo.coins = parseInt(coinsStr);
        }else{
            userInfo.coins = gameConfig.originCoins;
            userProfile.saveCoinsInfo();
        }
        //gameResultLog
        var logStr = localStorage.getItem("userInfo.gameResultLog");
        if(logStr && logStr != "undefined"){
            userInfo.gameResultLog = JSON.parse(logStr);
        }else{
            userProfile.initializeGameResult();
        }
        //play*ModeTimes
        var timesStr = localStorage.getItem("userInfo.playTime");
        if(timesStr && timesStr != "undefined"){
            userInfo.playTime = JSON.parse(timesStr);
        }else{
            userProfile.initializePlayTimes();
        }
        //achievements
        var achievementStr =  localStorage.getItem("userInfo.achievements");
        if(achievementStr && achievementStr != "undefined"){
            userInfo.achievements = JSON.parse(achievementStr);
        }else{
            userProfile.initializeAchievement();
        }
        //finishTutorial
        var tryTutorial =  localStorage.getItem("userInfo.tryTutorial");
        userProfile.finishTutorial = tryTutorial;
        //userInfo.volume
        var volume =  localStorage.getItem("userInfo.volume");
        if(volume){
            userInfo.volume = JSON.parse(volume);
        }else{
            userInfo.volume = {sound:true,music:true}
            userProfile.saveVolumeInfo();
        }


    }

    //成就信息
    this.userProfile.initializeAchievement = function(){
        userInfo.achievements = userProfile.originalAchievement;
        userProfile.saveAchievementsInfo();
    };
    //排名信息
    this.userProfile.initializeGameResult = function(){
        userInfo.gameResultLog = {mode1:[],mode2:[],mode3:[],mode4:[]};
        userProfile.saveGameResultLog();
    };
    //模式解锁信息，模式次数
    this.userProfile.initializeModeLog = function(){
        userInfo.modes = gameConfig.modeConfig;
        userProfile.saveModesInfo();
    };
    this.userProfile.initializePlayTimes = function(){
        userInfo.playTime = {mode1:{time:0,unlock:true},mode2:{time:0,unlock:false},mode3:{time:0,unlock:false},mode4:{time:0,unlock:false}};
        userProfile.savePlayTimes();
    };
    this.userProfile.initializeDailyReward = function(){
        localStorage.removeItem("userInfo.login");
    };
    this.userProfile.resetUserInfo = function(){
//        userInfo.login.successiveLoginTime = 0;
//        userInfo.login.firstToday = true;
//        userInfo.login.preLoginTime = null;
        //achievement
        userProfile.initializeAchievement();
        userProfile.initializeGameResult();
//        userProfile.initializeModeLog();
        userProfile.initializePlayTimes();
        userProfile.initializeDailyReward();
//        userProfile.initializeDailyReward();
    }
    //执行
    this.userProfile.initUserInfo();
    this.userProfile.checkLogin();
})());

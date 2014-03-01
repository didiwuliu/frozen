/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-4
 * Time: 下午4:21
 * To change this template use File | Settings | File Templates.
 */
this.gamecenter = this.gamecenter || {};
(function(){
    this.gamecenter.scoreSubmited = [];
    this.gamecenter.achievementSubmited = [];
    this.gamecenter.loginig = false;
    this.gamecenter.setNameParams = null;
    this.gamecenter.started = false;

    this.gamecenter.init = function()
    {
        if(gamecenter.started){
            return;
        }
        gamecenter.started = true;

        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        var gc = CocoonJS.Social.GameCenter;
        gamecenter.socialService = gc.getSocialInterface();
        gamecenter.socialServiceAvailable = gamecenter.socialService.nativeExtensionObjectAvailable;
    }
//    this.gamecenter.init();

    this.gamecenter.callback_achievement = function(error){
        if (error) {
            console.error("callback_achievement error: " + error.message);
        }else {
            console.log("callback_achievement sucess");
        }
    }
    this.gamecenter.callback_score = function(error){
        if (error) {
            console.error("callback_score error: " + error.message);
        }else {
            console.log("callback_score success");
        }
    }

    this.gamecenter.setUserGameCenterName = function(target,property)
    {
        gamecenter.init();
        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        if(!gamecenter.socialService.isLoggedIn())
        {
            //callback(localPlayer.isAuthenticated, error);
            gamecenter.setNameParams = {target:target,property:property};

            gamecenter.socialService.login(
                function(isAuthenticated, error) {
                    if (error) {
                        console.error("gamecenter login error: " + error.message);
                    }
                    else if (isAuthenticated) {
                        console.log("gamecenter login suceeded");
                        gamecenter.setUserGameCenterName(gamecenter.setNameParams.target,gamecenter.setNameParams.property);
                    }
                    else {
                        console.log("gamecenter login cancelled");
                    }
                }
            )
            return;
        }
        if(!gamecenter.userName){
            var user = gamecenter.socialService.getLoggedInUser();
            gamecenter.userName = user.userName;
//            for(var key in user){
//                console.log(key+":"+user[key])
//            }
        }
        target[property] = gamecenter.userName;
        gamecenter.setNameParams = null;
    };

    //callback The callback function. Response params: error
    this.gamecenter.submitAchievement = function(achievementID,callback){
        gamecenter.init();
        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        if(!callback){
            callback = gamecenter.callback_achievement;
        }
        if(!gamecenter.socialService.isLoggedIn())
        {
            gamecenter.achievementSubmited.push({achievementID:achievementID,callback:callback});
            if(gamecenter.loginig){
                return;
            }
            gamecenter.loginig = true;
            gamecenter.socialService.login(

                function(isAuthenticated, error) {
                    gamecenter.loginig = false;
                    if (error) {
                        console.error("gamecenter login error: " + error.message);
                    }
                    else if (isAuthenticated) {
                        console.log("gamecenter login suceeded");
                        while(gamecenter.achievementSubmited.length){
                            var ac = gamecenter.achievementSubmited.shift();
                            gamecenter.submitAchievement(ac.achievementID,ac.callback);
                        }

                    }
                    else {
                        console.log("gamecenter login cancelled");
                    }
                }
            )

            return;
        }
        gamecenter.socialService.submitAchievement(achievementID,callback);
    }
    //callback(error);
    //params.leaderboardID
    this.gamecenter.submitScore = function(score,callback,params){
        gamecenter.init();
        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        if(!callback){
            callback = gamecenter.callback_score;
        }
        //submitScore: function(score, callback, params) {
        if(!gamecenter.socialService.isLoggedIn())
        {
            gamecenter.scoreSubmited.push({score:score,callback:callback,params:params});
            if(gamecenter.loginig){
                return;
            }
            gamecenter.loginig = true;
            gamecenter.socialService.login(

                function(isAuthenticated, error) {
                    gamecenter.loginig = false;
                    if (error) {
                        console.error("gamecenter login error: " + error.message);
                    }
                    else if (isAuthenticated) {
                        console.log("gamecenter login suceeded");
                        while(gamecenter.scoreSubmited.length){
                            var sc = gamecenter.scoreSubmited.shift();
                            gamecenter.submitScore(sc.score,sc.callback,sc.params);
                        }
                    }
                    else {
                        console.log("gamecenter login cancelled");
                    }
                }
            )
            return;
        }
        gamecenter.socialService.submitScore(score,callback,params);
    }

})()

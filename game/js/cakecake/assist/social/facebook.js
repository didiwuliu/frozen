this.facebook = this.facebook || {};
(function (){
//    this.facebook.loggedIn = false;
    this.facebook.publishMessages = null;
    this.facebook.setNameParams = null;
    this.facebook.started = false;

    this.facebook.init = function()
    {
        if(facebook.started){
            return;
        }
        facebook.started = true;

        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        var fb = CocoonJS.Social.Facebook;
        //initialize the Facebook Service the same way as the Official JS SDK
        fb.init({
            appId:"353693331430896",//cakecakeId：353693331430896；ludeiId：325944107441107
            channelUrl: "channel.html"
        });
        //you can use the FB extension with the official API or use it with CocoonJS SocialGaming API
        facebook.socialService = fb.getSocialInterface();
        facebook.socialService.setTemplates("js/CocoonJSExtensions/templates/leaderboards.html", "js/CocoonJSExtensions/templates/achievements.html");
    }
    this.facebook.init();

    this.facebook.setUserFaceBookName = function(target,property)
    {
        //facebook.init();
        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        if(!facebook.socialService.isLoggedIn())
        {
            facebook.setNameParams = {target:target,property:property};
            facebook.socialService.login(
                function(loggedIn, error) {
                    if (error) {
                        console.error("facebook login error: " + error.message);
                    }
                    else if (loggedIn) {
                        console.log("facebook login suceeded");
                        facebook.setUserFaceBookName(facebook.setNameParams.target,facebook.setNameParams.property);
                    }
                    else {
                        console.log("facebook login cancelled");
                    }
                }
            )
            return;
        }
        if(!facebook.userName){
            var user = facebook.socialService.getLoggedInUser();
            util.printObject(user);
            facebook.userName = user.userName;
        }
        target[property] = facebook.userName;
        facebook.setNameParams = null;
    };
    this.facebook.publishAMessage = function(message, mediaURL, linkURL, linkText, linkCaption)
    {
        //facebook.init();
        if(!CocoonJS.App.nativeExtensionObjectAvailable){
            return;
        }
        if(!facebook.socialService.isLoggedIn())
        {
            facebook.publishMessages = [message, mediaURL, linkURL, linkText, linkCaption];
            facebook.socialService.login(
                function(loggedIn, error) {
                    if (error) {
                        console.error("facebook login error: " + error.message);
                    }
                    else if (loggedIn) {
                        console.log("facebook login suceeded");
                        facebook.publishAMessage.apply(null,facebook.publishMessages);
                    }
                    else {
                        console.log("facebook login cancelled");
                    }
                }
            )
            return;
        }
        if(!facebook.userName){
            var user = facebook.socialService.getLoggedInUser();

            if(user){
                util.printObject(user);
                facebook.userName = user.userName;
            }else{
                console.error("getLoggedInUser :get null")
            }
        }
        message = message.replace(/{USER}/,facebook.userName);
        linkText = linkText.replace(/{USER}/,facebook.userName);

        var messageObj = new CocoonJS.Social.Message(message, mediaURL, linkURL, linkText, linkCaption);
        facebook.socialService.publishMessageWithDialog(messageObj, function(error){
            if (error) {
                console.error("Error publishing message: " + error.message);
            }else{
                console.log(" publishing message success");
            }
        });

        facebook.publishMessages = null;
    };
})();
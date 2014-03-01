(function()
{
    // The CocoonJS must exist before creating the extension.
    if (typeof window.CocoonJS === 'undefined' || window.CocoonJS === null) throw("The CocoonJS object must exist and be valid before creating any extension object.");
    if (typeof window.CocoonJS.Store === 'undefined' || window.CocoonJS.Store === null) throw("The CocoonJS.Store object must exist and be valid before creating a Facebook extension object.");

    /**
    * This namespace represents the CocoonJS In-App Purchase extension.
    * @namespace
    */
    CocoonJS.Store.Facebook = {};

    CocoonJS.Store.Facebook.initializeFacebookApplication = function(applicationID, channelURL)	{

    	var srv= CocoonJS.Store.Facebook;

    	function onLogin() {
    		srv.initialized = true;
    		srv.applicationID = applicationID;
    		console.log("Hello from the onLogin :)");
    	}


    	FB.init({
      		appId      : applicationID, // App ID
      		channelUrl : channelURL, // Channel File
      		status     : true, // check login status
      		cookie     : true, // enable cookies to allow the server to access the session
      		xfbml      : true  // parse XFBML
      	});

        	// Additional init code here
        	FB.getLoginStatus(function(response) {
        		if (response.status === 'connected') {
        			onLogin();
        		}
        		else if ( response.status==="not_authorized") {
        			srv.initialized= false;
        			srv.onRequestInitializationFailed.notifyEventListeners(applicationID, "Facebook application is not authorized.");
        		}
        		else {

        			FB.login(function (response) {
        				if (response.authResponse) {
        					onLogin();
        				} else {
        					console.log('User cancelled login or did not fully authorize.');
        				}
        			});
        		}
        	});
        };

        CocoonJS.Store.Facebook.requestInitialization = function(paramsObject)
        {
        	if (typeof paramsObject==="undefined") {
        		console.error("CocoonJS.Store.Facebook.requestInitialization requires an initialization object.");
        		return;
        	}
        	if ( typeof paramsObject.applicationID==="undefined" || typeof paramsObject.channelURL==="undefined") {
        		console.error("CocoonJS.Store.Facebook.requestInitialization requires an initialization object with 'applicationID' and 'channelURL' attributes.");
        		return;
        	}

        	var applicationID= paramsObject.applicationID;
        	var channelURL= paramsObject.channelURL;

        	if (this.nativeExtensionObjectAvailable)
        	{
        		return CocoonJS.Store.Facebook.prototype.requestInitialization.call(this, paramsObject);
        	}
        	else if (!navigator.isCocoonJS)
        	{

        		if (this.initialized)
        		{
        			if (applicationID === this.applicationID) 
        			{
        				console.log("The Facebook application connection has already been initialized.");
        				CocoonJS.Store.Facebook.onRequestInitializationSucceed.notifyEventListeners(applicationID);
        				return;
        			}
        			else
        			{
					// The application was initialized but a new application id has been provided. Force the initialization
					this.initialized = false;
					this.loggedIn = false;
					this.applicationID = null;
					this.initializeFacebookApplication(applicationID, channelURL);
				}
			}
			else
			{
				// Nothing has been initialized, so load the Facebook SDK and then initialize the application
				this.initialized = false;
				this.loggedIn = false;
				this.applicationID = null;

				// Wait for the Facebook SDK to be initialized
				window.fbAsyncInit = function() 
				{
					CocoonJS.Store.Facebook.initializeFacebookApplication(applicationID, channelURL);
				};

			  	// Load the Facebook SDK
			  	var parent = document.getElementsByTagName('script')[0];
			  	var script = document.createElement('script'); 
			  	script.async = true;
			  	var prot= location.protocol ? location.protocol : "http:"
			  	script.src = prot + "//connect.facebook.net/en_US/all.js";
			  	parent.parentNode.insertBefore(script, parent);
			  }

			}
		};


	})();
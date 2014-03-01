//CocoonJS.App.proxifyConsole();
this.store = this.store || {};
(function(){
    //through store.purchaseProduct to buy product

    //whether finish fetchProductsFromStore
    this.store.fetched = false;
    this.store.started = false;
    //save product id which user intend to buy before fetchProductsFromStore. when finish fetching,then buy
    this.store.redayPurchase = [];
    //this.store.deviceInfo = CocoonJS.App.getDeviceInfo();
    this.store.MANAGED = true;
    this.store.SANDBOX = false;

    this.store.products = new Array();
    this.store.purchases = new Array();
    this.store.isStoreAvailable = false;
    this.store.onRestorePurchasesStarted = function()
    {
        util.setLogText("Purchases restoration started");
    }

    this.store.onRestorePurchasesCompleted = function ()
    {
        util.setLogText("Purchases restoration completed");
    }

    this.store.onRestorePurchasesFailed = function (error)
    {
        util.setLogText("Purchases restoration failed: " + error);
    }

    this.store.onProductPurchaseStarted = function (productId)
    {
        util.setLogText("Starting product " + productId + " purchase...");
    }

    this.store.onProductPurchaseFailed = function (productId, error)
    {
        alert(string.currentString.s179 + store.getProductName(productId) + string.currentString.s180 + error);
        util.setLogText("Purchase of product " + productId + " failed: " + error);
    }
    this.store.getProductName = function (productId){
        var name;
        for(var key in gameConfig.specials){
            if(gameConfig.specials[key].productId == productId){
                var nameObj = gameConfig.specials[key].name;
                name = string.currentString[nameObj.name];
                break;
            }
        }
        if(!name){
            for(var key in gameConfig.coins){
                if(gameConfig.coins[key].productId == productId){
                    var nameObj = gameConfig.coins[key].name;
                    name = string.currentString[nameObj.name];
                    break;
                }
            }
        }
        return name;
    }
    this.store.onProductPurchaseCompleted = function (purchase)
    {
        /**
         We must call finish purchase when the purchase has finished successfully and the related purchase assets have been downloaded.
         Calling finishPurchase will remove the purchase transaction from the transactions queue and the purchase is then considered as finished successfully,
         otherwise it won't be remove from the purchases queue and you'll get purchase callbacks after starting the service or at any point.
         */
        CocoonJS.Store.consumePurchase(purchase.transactionId, purchase.productId);
        CocoonJS.Store.finishPurchase(purchase.transactionId);

        alert(string.currentString.s178+store.getProductName(purchase.productId));

        util.setLogText("Purchase of product " + purchase.productId + " completed");
        if(purchase.purchaseState == CocoonJS.Store.PurchaseState.PURCHASED)
        {
            if(purchase.productId == gameConfig.products[0]){
                userInfo.coins += 2500;
                userProfile.saveCoinsInfo();
            }else if(purchase.productId == gameConfig.products[1]){
                userInfo.coins += 5000;
                userProfile.saveCoinsInfo();
            }else if(purchase.productId == gameConfig.products[2]){
                userInfo.coins += 10000;
                userProfile.saveCoinsInfo();
            }else if(purchase.productId == gameConfig.products[3]){
                userInfo.coins += 20000;
                userProfile.saveCoinsInfo();
            }else if(purchase.productId == gameConfig.products[4]){
                userInfo.coins += 40000;
                userProfile.saveCoinsInfo();
            }else if(purchase.productId == gameConfig.products[5]){
                userInfo.coins += 100000;
                userProfile.saveCoinsInfo();
            }else if(purchase.productId == gameConfig.products[6]){
                userInfo.modes["mode1"].unlimited = true;
                userInfo.modes["mode1"].count = 5;
                userInfo.saveModesInfo("mode1");
                if(gameUI && gameUI.modePanel && gameUI.modePanel["mode1"]){
                    gameUI.modePanel["mode1"].setModeCount("unlimited");
                }
            }else if(purchase.productId == gameConfig.products[7]){
                userInfo.modes["mode2"].unlimited = true;
                userInfo.modes["mode2"].count = 5;
                userInfo.saveModesInfo("mode2");
                if(gameUI && gameUI.modePanel && gameUI.modePanel["mode2"]){
                    gameUI.modePanel["mode2"].setModeCount("unlimited");
                }

            }else if(purchase.productId == gameConfig.products[8]){
                userInfo.modes["mode3"].unlimited = true;
                userInfo.modes["mode3"].count = 5;
                userInfo.saveModesInfo("mode3");

                if(gameUI && gameUI.modePanel && gameUI.modePanel["mode3"]){
                    gameUI.modePanel["mode3"].setModeCount("unlimited");
                }

            }else if(purchase.productId == gameConfig.products[9]){
                userInfo.modes["mode4"].unlimited = true;
                userInfo.modes["mode4"].count = 5;
                userInfo.saveModesInfo("mode4");

                if(gameUI && gameUI.modePanel && gameUI.modePanel["mode4"]){
                    gameUI.modePanel["mode4"].setModeCount("unlimited");
                }

            }else if(purchase.productId == gameConfig.products[10]){
                userInfo.modes["mode1"].unlimited = true;
                userInfo.modes["mode1"].count = 5;
                userInfo.modes["mode2"].unlimited = true;
                userInfo.modes["mode2"].count = 5;
                userInfo.modes["mode3"].unlimited = true;
                userInfo.modes["mode3"].count = 5;
                userInfo.modes["mode4"].unlimited = true;
                userInfo.modes["mode4"].count = 5;
                userInfo.saveModesInfo("all");

                if(gameUI && gameUI.modePanel){
                    gameUI.modePanel["mode1"].setModeCount("unlimited");
                    gameUI.modePanel["mode2"].setModeCount("unlimited");
                    gameUI.modePanel["mode3"].setModeCount("unlimited");
                    gameUI.modePanel["mode4"].setModeCount("unlimited");
                }
            }else if(purchase.productId == "item1"){

            }else if(purchase.productId == "item2"){

            }
        }

    }

    this.store.onProductsFetchStarted = function ()
    {
        util.setLogText("Store products fetch started");
//        alert("Store products fetch started");
    }

    this.store.onProductsFetchFailed = function (error)
    {
        util.setLogText("Store products fetch failed: " + error);
//        alert("Store products fetch failed: " + error);
    }

    this.store.onProductsFetchCompleted = function (products)
    {
        util.setLogText("Store products fetch completed");
        for(var i = products.length-1;i>=0;i--){
            CocoonJS.Store.addProduct(products[i]);
            console.log("Adding product to the local database:"+JSON.stringify(products[i]));
        }

        if(!store.fetched && gameUI.storePanel){
            gameUI.storePanel.initialPrice();
        }
        store.fetched = true;
        while(store.redayPurchase.length){
            var id = store.redayPurchase.shift();
            store.purchaseProduct(id);
        }


    }

    this.store.onConsumePurchaseStarted = function (transactionId)
    {
        util.setLogText("Consume purchase started");
    }

    this.store.onConsumePurchaseFailed = function (transactionId, error)
    {
        util.setLogText("Consume purchase failed: " + error);
    }

    this.store.onConsumePurchaseCompleted = function (transactionId)
    {
//        alert("consume complete");
        util.setLogText("Consume purchase completed: " + transactionId);

        var isRemoved = CocoonJS.Store.removePurchase(transactionId);
        if (isRemoved)
            util.setLogText("Purchase with transactionId: " + transactionId + " successfully removed.");
        else
            util.setLogText("Error removing purchase with transactionId: " + transactionId);
    }
    this.store.start = function(){
        if(store.started){
            return;
        }

        /* We check that the native exension is present. It won't be present if the code is being run in
         * non CocoonJS enabled devices like the browser.
         */
        if (CocoonJS.Store.nativeExtensionObjectAvailable)
        {
            /*
             * We must also check that the platform Store service is ready to make purchases.
             */
            if (CocoonJS.Store.canPurchase())
            {
                store.started = true;
                store.isStoreAvailable = true;

                /**
                 First thing to do is place our callbacks as we may get some callbacks right after calling CocoonJS.Store.start().

                 Ie. We have made a purchase in the previous game session but as the game quit unexpectedly or the user closed the app, the purchase didn't complete.
                 In that case, in some platforms you'll get purchase related callbacks (onProductPurchaseVerificationRequestReceived, onProductPurchaseCompleted,... ) after calling start.

                 So make sure that at least you have placed the purchases related callbacks before calling CocoonJS.Store.start().
                 */
                CocoonJS.Store.onProductsFetchStarted.addEventListener(store.onProductsFetchStarted);
                CocoonJS.Store.onProductsFetchFailed.addEventListener(store.onProductsFetchFailed);
                CocoonJS.Store.onProductsFetchCompleted.addEventListener(store.onProductsFetchCompleted);

                CocoonJS.Store.onRestorePurchasesStarted.addEventListener(store.onRestorePurchasesStarted);
                CocoonJS.Store.onRestorePurchasesCompleted.addEventListener(store.onRestorePurchasesCompleted);
                CocoonJS.Store.onRestorePurchasesFailed.addEventListener(store.onRestorePurchasesFailed);

                CocoonJS.Store.onProductPurchaseStarted.addEventListener(store.onProductPurchaseStarted);
                CocoonJS.Store.onProductPurchaseFailed.addEventListener(store.onProductPurchaseFailed);
                //CocoonJS.Store.onProductPurchaseVerificationRequestReceived.addEventListener(store.onProductPurchaseVerificationRequestReceived);
                CocoonJS.Store.onProductPurchaseCompleted.addEventListener(store.onProductPurchaseCompleted);

                CocoonJS.Store.onConsumePurchaseStarted.addEventListener(store.onConsumePurchaseStarted);
                CocoonJS.Store.onConsumePurchaseCompleted.addEventListener(store.onConsumePurchaseCompleted);
                CocoonJS.Store.onConsumePurchaseFailed.addEventListener(store.onConsumePurchaseFailed);

                /**
                 This initializes the social service with the following parameters.
                 sandbox: The platform social purchases verifications will happen in sandbox mode, this applies only if managed mode is enabled.
                 Ie: If you are testing your iOS application in debug mode, you must enable the sandbox mode, otherwise the verification will fail as it's not a release build and
                 the Apple verification environments are different.
                 managed: The verification is going to be done using the CocoonJS cloud service. Be sure to have the Store section of your project correctly configured.
                 */
                CocoonJS.Store.requestInitialization({"sandbox": store.SANDBOX, "managed": store.MANAGED});

                /**
                 We start the social service. We will start getting callbacks from this point on.
                 */
                CocoonJS.Store.start();

                /**
                 In this case we have stored the products and the purchases in the local products and purchases databases so we can get them to see what products has purchased
                 the user and unlock that content.
                 */
            }
        }
    }

    this.store.fetchProductsFromServer = function(productIds)
    {
        store.start();
        if (CocoonJS.Store.getStoreType() === CocoonJS.Store.StoreType.MOCK_STORE)
        {
            util.setLogText('Error: Fetching products for a mock social not supported');
        }
        else
        {
            util.setLogText('Retrieving products from backend server...');
            if (store.isStoreAvailable)
            {
                CocoonJS.Store.fetchProductsFromStore(productIds);
            }
        }
    }

    this.store.purchaseProduct = function(productId)
    {
        store.start();
        if(!store.fetched){
            store.redayPurchase.push(productId);
            store.fetchProductsFromServer(gameConfig.products);
            return;
        }

        if (store.isStoreAvailable)
        {
//            CocoonJS.Store.purchaseProduct(productId);
            CocoonJS.Store.puchaseProductModal(productId);
        }
        else
        {
            util.setLogText("Sorry, no Store Service available in this platform");
        }
    };
    this.store.consumePurchase = function(purchase)
    {
        store.start();
        if (isStoreAvailable)
        {
            /**
             We must consume the purchase when the user has consumed that item and you want it to be available for purchase again.
             */
            CocoonJS.Store.consumePurchase(purchase.transactionId, purchase.productId);
        }
        else
        {
            util.setLogText("Sorry, no Store Service available in this platform");
        }
    }
    this.store.restore = function(){
        store.start();
        CocoonJS.Store.restorePurchasesModal();
    };
    //执行

    setTimeout(function()
    {
        store.start();
    }, 60000);
//    LTimer.waitToDo(60,store.start);
//    this.store.start();
//    this.store.fetchProductsFromServer(gameConfig.products);
})()

/**
 * Helper functions
 **/









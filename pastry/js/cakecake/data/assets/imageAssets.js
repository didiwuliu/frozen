/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-5-29
 * Time: 上午9:43
 * To change this template use File | Settings | File Templates.
 */
this.assetsData = this.assetsData || {};
(function(){
    this.assetsData.loadedCount = 0;
    this.assetsData.handleMenuComplete = function(){
        assetsData.loadedCount++;
        //进度条
        gameUI.loadingPanle.setProgress(assetsData.loadedCount/assetsData.manifest.length);
        //加载完成
        if(assetsData.loadedCount>=assetsData.manifest.length){
            assetsData.loadedCount = 0;
//            delete assetsData.manifest;
        }
        //assetsData.handleProgress();

    };
    this.assetsData.handleGotoMenuComplete = function(){
        assetsData.loadedCount++;
        //加载完成
        if(assetsData.loadedCount>=assetsData.menuManifest.length){
            gameUI.removeWaitingPanel();
            gameUI.initMenuUI();
            visibleManager.gotoMode(true);
            assetsData.loadedCount = 0;
        }
    };
    this.assetsData.handleGameComplete = function(){
        assetsData.loadedCount++;
        if(assetsData.loadedCount>=assetsData.manifest2.length){
            runtimeData.startGameByMode(runtimeData.currentMode);
            gameUI.removeWaitingPanel();
            assetsData.loadedCount = 0;
        }
        // handleProgress();
    };
    this.assetsData.handleResultComplete = function(){
        assetsData.loadedCount++;
        if(assetsData.loadedCount>=assetsData.manifest3.length){
            //runtimeData.startGameByMode(runtimeData.currentMode);
            gameUI.removeWaitingPanel();
            assetsData.loadedCount = 0;

            runtimeData.gameResult(runtimeData.tempResultData);
            runtimeData.tempResultData = null;
        }
        // handleProgress();
    };
    this.assetsData.onLoadingImageLoaded = function(event,rectangles){
        var bgData = rectangles;
        var image = event.currentTarget;
        assetsData.loading = {};
        assetsData.loading.image = image;
        var len = bgData.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = bgData.TextureAtlas.sprite[i].attributes;//x,y,w,h,n
            var name = sprite.n.replace(/.jpg/, "");
            name = name.replace(/.png/,"");
            assetsData.loading[name] = sprite;
        }
        setTimeout(function(){
            gameUI.initBaseUI();
            gameUI.initLoadingUI();
            assetsData.loadMenuAssets();
        },200);

    }

    this.assetsData.parseGridImage = function(image,rectsData){
        //拆分地格
        var mapBgArr = [];
        for(var i = 0;i<8;i++){
            for(var j=0;j<6;j++){
                var point = {x:j*100+parseInt(rectsData.x),y:i*100+parseInt(rectsData.y)};
                mapBgArr.push(point);
            }
        }
        assetsData.gridBg = {};
        assetsData.gridBg.rectsData = mapBgArr;
        var mapbgType = [];
        mapbgType.push("33333333");//为第一个充数
        mapbgType.push("00000000");
        mapbgType.push("12120212");
        mapbgType.push("12121202");
        mapbgType.push("02121212");
        mapbgType.push("12021212");
        mapbgType.push("12120102");
        mapbgType.push("02121201");
        mapbgType.push("01021212");
        mapbgType.push("12010212");
        mapbgType.push("02120101");
        mapbgType.push("01021201");
        mapbgType.push("01010212");
        mapbgType.push("12010102");
        mapbgType.push("02120212");
        mapbgType.push("12021202");
        mapbgType.push("01010101");
        mapbgType.push("12121212");
        mapbgType.push("00000212");
        mapbgType.push("02120000");
        mapbgType.push("12000002");
        mapbgType.push("00021200");
        mapbgType.push("02121200");
        mapbgType.push("00021212");
        mapbgType.push("12120002");
        mapbgType.push("12000212");
        mapbgType.push("12000102");
        mapbgType.push("12010002");
        mapbgType.push("01021200");
        mapbgType.push("00021201");
        mapbgType.push("02120001");
        mapbgType.push("02120100");
        mapbgType.push("01000212");
        mapbgType.push("00010212");
        mapbgType.push("00010000");
        mapbgType.push("00000100");
        mapbgType.push("00000001");
        mapbgType.push("01000000");
        mapbgType.push("00010100");
        mapbgType.push("00000101");
        mapbgType.push("01000001");
        mapbgType.push("01010000");
        mapbgType.push("00010001");
        mapbgType.push("01000100");
        mapbgType.push("00010101");
        mapbgType.push("01000101");
        mapbgType.push("01010001");
        mapbgType.push("01010100");
        assetsData.gridBg.mapbgType = mapbgType;

        assetsData.gridBg.image = image;
//        assetsData.handleGameComplete();
    }
    this.assetsData.onGameBgImageLoaded = function(event,imageData){
        var image = event.currentTarget;
        var id = imageData.id;
        assetsData[id] = {image:image};
        assetsData.handleMenuComplete();
    }
    this.assetsData.onGotoMenuImageLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData[id]){
            assetsData[id] = {};
        }

        assetsData[id].image = image;
        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n,ox,ox,ow,oh
            if(!sprite){
                "";
            }
            var name = sprite.n.replace(/.jpg/, "");
            name = name.replace(/.png/,"");
            assetsData[id][name] = sprite;
        }

        assetsData.handleGotoMenuComplete();
    }
    this.assetsData.onMenuImageLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData[id]){
            assetsData[id] = {};
        }

        assetsData[id].image = image;
        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n,ox,ox,ow,oh
            if(!sprite){
                "";
            }
            var name = sprite.n.replace(/.jpg/, "");
            name = name.replace(/.png/,"");
            assetsData[id][name] = sprite;
        }

        assetsData.handleMenuComplete();
    }
    this.assetsData.onGameImageLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData[id]){
            assetsData[id] = {};
        }

        assetsData[id].image = image;
        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n,ox,ox,ow,oh
            if(!sprite){
                "";
            }
            var name = sprite.n.replace(/.jpg/, "");
            name = name.replace(/.png/,"");
            assetsData[id][name] = sprite;
            if(name == "blockBg"){
                assetsData.parseGridImage(image,sprite)
            }
        }

        assetsData.handleGameComplete();
    }
    this.assetsData.onResultImageLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData[id]){
            assetsData[id] = {};
        }

        assetsData[id].image = image;
        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n,ox,ox,ow,oh
            if(!sprite){
                "";
            }
            var name = sprite.n.replace(/.jpg/, "");
            name = name.replace(/.png/,"");
            assetsData[id][name] = sprite;
        }

        assetsData.handleResultComplete();
    }
    this.assetsData.loadLoadingAssets = function(){
        var loader = new LLoader();
        loader.addEventListener(LEvent.COMPLETE,assetsData.onLoadingImageLoaded,assetsData.loadingData);
        loader.load("assets/loading.png","bitmapData");
    };
    this.assetsData.loadGotoMenuAssets = function(){
        gameUI.addWaitingPanel();
        for(var i = 0;i<assetsData.menuManifest.length;i++){
            var loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE,assetsData.menuManifest[i].fun,assetsData.menuManifest[i]);
            loader.load(assetsData.menuManifest[i].src,"bitmapData");
        }
    }
    this.assetsData.loadMenuAssets = function(){
        for(var i = 0;i<assetsData.manifest.length;i++){
            var loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE,assetsData.manifest[i].fun,assetsData.manifest[i]);
            loader.load(assetsData.manifest[i].src,"bitmapData");
        }
    };
    this.assetsData.loadGameAssets = function(mode){
        runtimeData.currentMode = mode;
//        gameUI.settingPanel.visible = false;
        //销毁menu资源
        gameUI.destroyMenuUI();
        assetsData.destroyManifest();
        gameUI.addWaitingPanel();
        for(var i = 0;i<assetsData.manifest2.length;i++){
            var loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE,assetsData.manifest2[i].fun,assetsData.manifest2[i]);
            loader.load(assetsData.manifest2[i].src,"bitmapData");
        }
    };
    this.assetsData.loadResultAssets = function(){
        // var resultData = {mode:runtimeData.currentMode,score:runtimeData.score,coins:runtimeData.coins,highestLevel:runtimeData.reachedHighestLevel};
        gameUI.addWaitingPanel();
        for(var i = 0;i<assetsData.manifest3.length;i++){
            var loader = new LLoader();
            loader.addEventListener(LEvent.COMPLETE,assetsData.manifest3[i].fun,assetsData.manifest3[i]);
            loader.load(assetsData.manifest3[i].src,"bitmapData");
        }
    };

}());

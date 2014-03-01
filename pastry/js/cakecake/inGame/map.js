/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-19
 * Time: 下午6:16
 * To change this template use File | Settings | File Templates.
 */
this.map = this.map || {};
(function(){
    this.map.initGridContainer = function(){
        for(var i = 0; i < mapConfig.row; i++){
            cakecake.gridElements[i] = [];
        }
        for(var i = 0; i < mapConfig.row; i++){
            for(var j = 0; j < mapConfig.col; j++){
                if(i == 0 && j == 0)continue;
                var gridContainer = new GridContainer(i,j);
                cakecake.gridElements[i][j] = gridContainer;
            }
        }
        //因为盘子要放在最底层，所以要在最后初始化。因为addChild（obj，true）；
        var gridContainer = new GridContainer(0,0);
        cakecake.gridElements[0][0] = gridContainer;
    }
    this.map.initToolsGrids = function(){
//(0,0)
        var grid = cakecake.gridElements[0][0];
        var bpd = new LBitmapData(assetsData.effectAnimation.game_cake.image,assetsData.effectAnimation.game_cake.tool_container.rectsData[0]);
        var bp = new LBitmap(bpd);
        grid.animationLayer.addChild(bp);
        grid.setBg(assetsData.gridBg.rectsData[0]);
//(5.5)删除物品
        //var plant = new Plant();
        var bpName1 = "tool_wait";
        var bpName2 = "tool_del";
        var imageArr1 = assetsData.effectAnimation.game_cake[bpName1].rectsData;
        var imageArr2 = assetsData.effectAnimation.game_cake[bpName2].rectsData;

        var animationData = [{name:"wait",imageArr:imageArr1},{name:"del",imageArr:imageArr2}];
        var animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_cake.image,null));
        animation.setAnimation(animationData);
        animation.setCurrentAnimation("wait");
        animation.stop = false;
        animation.loop = true;
        animation.setfps(5);

        cakecake.gridElements[5][5].toolAnimation = animation;
        cakecake.gridElements[5][5].animationLayer.addChild(animation);
        cakecake.gridElements[5][5].setBg(assetsData.gridBg.rectsData[0]);
        var timer = new LTimer(10,function(animation){
            if(animation && animation.currentAnimationName == "wait"){
                animation.stop = false;
                animation.loop = true;
                LTimer.waitToDo(3,function(animation){
                        animation.stop = true;
                        animation.loop = false;
                        animation.setCurrentFrame(0);
                },this,[animation]
                )
            }
        },this,[animation]);
        timer.start();
    }
    this.map.randomMap = function(){
        //总数
        var totalCount = parseInt(util.getRandom(mapConfig.initializeCount.min,mapConfig.initializeCount.max));
        //wheat
        var wheatCount = parseInt(util.getRandom(gameConfig.originalQuantity[0].min,gameConfig.originalQuantity[0].max));
        //Flour，Bread，Small cake，Hamster，Trapped Hamster，Rusty tools的数量
        var objsCount = [0,0,0,0,0,0];
        var remainCount = totalCount - wheatCount;
        var index = 0;
        while(remainCount > 0){
            var objRandomCount = parseInt(util.getRandom(0,2));
            if(remainCount < objRandomCount)objRandomCount = remainCount;
            if((2-objsCount[index]) >= objRandomCount){
                objsCount[index]  += objRandomCount;
            }else{
                objRandomCount = 2-objsCount[index];
                objsCount[index] += objRandomCount;
            };
            remainCount -= objRandomCount;
            index++;
            if(index > 5)index = 0;
        }

        //随机位置
        var positonArr = [];
        while(totalCount > 0){
            var ran = parseInt(util.getRandom(1,34));
            if(positonArr.indexOf(ran) < 0){
                positonArr.push(ran);
                totalCount--;
            }
        }
        //放置wheat
        for(var i = 0;i<wheatCount;i++){
            var p = positonArr.shift();
            var row = parseInt(p / 6);
            var col = p % 6;
            cakecake.gridElements[row][col].setPlant(new Plant(100,false),true);
            console.log("row,col: ",row,col);
        }
        //放置后面6个物品。
        // var objsCount = [0,0,0,0,0,0];
        // var objs = {Flour:0,Bread:0,SmallCake:0,Hamster:0,TrappedHamster:0,RustyTools:0};
        var levels = [101,102,103,"hamster",200,301];
        for(var i = 0;i<objsCount.length;i++){
            for(var j = 0;j<objsCount[i];j++){
                if(levels[i] == "hamster"){
                    if(assistantHandler.cancelHamsterIn30){
                        continue;
                    }
                    var p = positonArr.shift();
                    var row = parseInt(p / 6);
                    var col = p % 6;
                    cakecake.gridElements[row][col].setAnimal(new Animal(),true);
                }else{
                    var p = positonArr.shift();
                    var row = parseInt(p / 6);
                    var col = p % 6;
                    cakecake.gridElements[row][col].setPlant(new Plant(levels[i],false),true);
                }
            }
        }
        //assistant物品的作用
        if(assistantHandler.startWithBigCake){
            var grid = gameTools.getRandomEmptyGrid();
            grid.setPlant(new Plant(104,false),true);

        }
        if(assistantHandler.startWithSmallShop){
            var grid = gameTools.getRandomEmptyGrid();
            grid.setPlant(new Plant(106,false),true);
        }

        //为没有设置背景的grid设置背景，其中一部分在setPlant函数中已经设置。
        for(var i=0;i<mapConfig.row;i++){
            for(var j=0;j<mapConfig.row;j++){
                if((i==0 && j==0)||(i==5 && j==5)){
                    continue;
                }
                setOwnBg(i,j);
            }
        }
    }
    this.map.initializePracticeMap = function(){
        for(var i = 0;i < 6;i++){
            for(var j = 0;j < 6;j++){
                var value = gameConfig.practiceMap[i][j];
                if(value){
                    cakecake.gridElements[i][j].setPlant(new Plant(value),true);
                }
            }
        }

        //为没有设置背景的grid设置背景，其中一部分在setPlant函数中已经设置。
        for(var i=0;i<mapConfig.row;i++){
            for(var j=0;j<mapConfig.row;j++){
                if((i==0 && j==0)||(i==5 && j==5)){
                    continue;
                }
                setOwnBg(i,j);
            }
        }
    }
    this.map.getNextPosition= function(){
        if(!cakecake.prePosition.col && !cakecake.prePosition.row){
            if(gameTools.isEmpty(3,2)){
                return {row:3,col:2};
            }else{
                cakecake.prePosition.col = 2;
                cakecake.prePosition.row = 3;
            }
        }
        openArr = [cakecake.gridElements[cakecake.prePosition.row][cakecake.prePosition.col]];
        closeArr = [];
        var position = ai.lookForPosition();
        return position;
    }
    this.map.initBg= function(){
        mapConfig.offsetTop = 295+88;
        mapConfig.offsetLeft = 20;
    }
    this.map.resetGame = function(){
        for(var i = 0; i < mapConfig.row; i++){
            for(var j = 0; j < mapConfig.col; j++){
                if((i == 0 && j == 0)||(i == 5 && j == 5)){
                    continue;
                }
                var gridContainer = cakecake.gridElements[i][j];
                gridContainer.plant = null;
                gridContainer.animal = null;
                gridContainer.animationLayer.removeAllChild();
            }
        }
        visibleManager.hidePanel("pause");
        visibleManager.hidePanel("store");
        soundManager.pause("bgMusic",true);
        gameTools.removeTip();
        runtimeData.resetRuntimeData();
        gameTools.resetInventory();
        map.resetToolsGrid();
        gameUI.reset();
        assistantHandler.reset();
    }
    this.map.resetToolsGrid = function(){
        //(0,0)
        var grid = cakecake.gridElements[0][0];
        grid.animationLayer.removeAllChild();
        //(5.5)删除物品
        cakecake.gridElements[5][5].toolAnimation.setCurrentAnimation("wait");
    }
    this.map.initCanvasSize = function(){
        //1136,640
        console.log("window.innerWidth:  "+window.innerWidth);
        console.log("window.innerHeight:  "+window.innerHeight);
        var firstType = true;
        if(window.innerHeight>960){
            cakecake.gameAnimationCanvas.width = 640;
            cakecake.gameAnimationCanvas.height = 1136;
//            cakecake.gameAnimationCanvas.width = cakecake.uiCanvas.width = 640;
//            cakecake.gameAnimationCanvas.height = cakecake.uiCanvas.height = 1136;
//            cakecake.bgCanvas.width = cakecake.bgCanvas2.width = cakecake.gameCanvas.width = cakecake.gameAnimationCanvas.width = cakecake.uiCanvas.width = 640;
//            cakecake.bgCanvas.height = cakecake.bgCanvas2.height = cakecake.gameCanvas.height = cakecake.gameAnimationCanvas.height = cakecake.uiCanvas.height = 1136;
            mapConfig.width = 640;
            mapConfig.height = 1136;
        }else{
            firstType = false;
//            cakecake.bgCanvas.width = cakecake.bgCanvas2.width = cakecake.gameCanvas.width = cakecake.gameAnimationCanvas.width = cakecake.uiCanvas.width = 640;
//            cakecake.bgCanvas.height = cakecake.bgCanvas2.height = cakecake.gameCanvas.height= cakecake.gameAnimationCanvas.height  = cakecake.uiCanvas.height = 960;
//            cakecake.gameAnimationCanvas.width = cakecake.uiCanvas.width = 640;
//            cakecake.gameAnimationCanvas.height  = cakecake.uiCanvas.height = 960;
            cakecake.gameAnimationCanvas.width = 640;
            cakecake.gameAnimationCanvas.height = 960;
            mapConfig.width = 640;
            mapConfig.height = 960;
        }
        if(firstType){
            mapConfig.clipBottom = mapConfig.clipTop = 0;
        }else{
            mapConfig.clipBottom = mapConfig.clipTop = (1136-960)/2;
        }
    }

}())

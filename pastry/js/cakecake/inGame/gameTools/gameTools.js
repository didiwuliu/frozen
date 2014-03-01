/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-24
 * Time: 下午6:05
 * To change this template use File | Settings | File Templates.
 */
this.gameTools = this.gameTools || {};
(function(){
//    this.gameTools.index = 0;
    this.gameTools.goon = function(place){
        inventory.resetCurrent();
        gameTools.removeTip();//用于放下物品后，消除tip
        //选择下一个物品出现时间。超级老鼠移动时间较长。
        var delayTime = 0;
        if(runtimeData.superHamsterCount > 0){
            delayTime = 0.9;
        }else{delayTime = 0.4};
        //如果老鼠移动没有完成，则强制完成
        if(runtimeData.animalWalk > runtimeData.animalWalkComplete){
            for(var i = 0;i < mapConfig.row;i++){
                for(var j = 0;j < mapConfig.row;j++){
                    if((i == 0 && j == 0) || (i == 5 && j == 5))continue;
                    var grid = cakecake.gridElements[i][j];
                    grid.animationLayer.x = grid.x;
                    grid.backDecorateLayer.x = grid.x;
                    grid.animationLayer.y = grid.y;
                    grid.backDecorateLayer.y = grid.y;
                }
            }
            runtimeData.animalWalk = runtimeData.animalWalkComplete = 0;
        }
        //老鼠移动
        if(aiAnimal)
            aiAnimal.animalsWalk();

        //新手引导
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
            LTimer.waitToDo(delayTime,tutorialManager.processTutorial,null,[gameConfig.tutorialItems[tutorialManager.tutorialIndex]]);
        }else {
            var p = gameTools.getEmptyGrids().length;
            if(!p){
                delayTime = 0;
            }
            LTimer.waitToDo(delayTime,gameTools.addForecastPlant,null);
        }
        //计回合
        runtimeData.roundCountDown();

    }

    this.gameTools.createNextPlant = function (){
        inventory.forecastAnimal = null;
        inventory.forecastPlant = null;
        inventory.forecastGloves = null;
        inventory.forecastUniversal = null;
//        //计回合
//        runtimeData.roundCountDown();
        //if(){
        //
        //}

        var pb = runtimeData.currentProbability;
        if(!pb){return;}
        var type = Math.random();
        //plant
        var opb1 = pb.wheat+pb.wheatFlour+pb.bread+pb.smallcake;
        if(type <= opb1/100){
//        if(type <= 100/100){
//        if(type <= 1/100){
            var r = Math.random();
            if(r <= pb.wheat/opb1){
//            if(r <= 1/opb1){
                cakecake.nextPlantLevel = 100;
            }else if(r <= (pb.wheat+pb.wheatFlour)/opb1){
                cakecake.nextPlantLevel = 101;
            }else if(r<=(pb.wheat+pb.wheatFlour+pb.bread)/opb1){
                cakecake.nextPlantLevel = 102;
            }else{
                cakecake.nextPlantLevel = 103;
            }
            inventory.forecastPlant = new Plant(cakecake.nextPlantLevel,false);
            gameTools.drawForecastTip(inventory.forecastPlant);
        }
        else if(type <= (opb1+pb.hamster)/100){//普通老鼠
//        else if(type <= 1/100){//普通老鼠
            //assistant 购买前30回合取消老鼠
            if(assistantHandler.cancelHamsterIn30 && runtimeData.passedRound <= 30){
                inventory.forecastPlant = new Plant(100,false);
                gameTools.drawForecastTip(inventory.forecastPlant);
                return;
            }
            inventory.forecastAnimal = new Animal();
            gameTools.drawForecastTip(inventory.forecastAnimal,{x:-13,y:0});

        }
        else if(type <= (opb1+pb.hamster+pb.superhamster)/100){ //超级老鼠
        // else if(type <= 1/100){ //超级老鼠
            //assistant 购买前30回合取消老鼠
            if(assistantHandler.cancelHamsterIn30 && runtimeData.passedRound <= 30){
                inventory.forecastPlant = new Plant(102,false);
                gameTools.drawForecastTip(inventory.forecastPlant);
                return;
            }
            inventory.forecastAnimal = new Animal(true);
            gameTools.drawForecastTip(inventory.forecastAnimal,{x:-13,y:0});
        }
       else if(type <= (opb1+pb.hamster+pb.superhamster+pb.pastrytools)/100){//pastrytools,钻石
        // else if(type <= 1/100){//pastrytools,钻石
            inventory.forecastUniversal= new Plant(300);
            gameTools.drawForecastTip(inventory.forecastUniversal);
        }
        //else if(type<(opb1+pb.hamster+pb.superhamster+pb.pastrytools+pb.gloves)/100){
        else if(type<1){//手套
            inventory.forecastGloves = new Plant(400);
            gameTools.drawForecastTip(inventory.forecastGloves);
        }
    };
    this.gameTools.addForecastPlant = function(p){
        //由于使用了延时，所以在goon之后，连续多次调用createNextPlant，造成多个物体重叠。
        gameTools.removeTip();
        //产生下一个
        var p = map.getNextPosition();
        //如果没有下一个位置，则游戏结束
        if(!p){
            //if(inventory.previousGloves && runtimeData.currentMode != "mode2" && runtimeData.currentMode != "mode3"){
            if(inventory.previousGloves){
                LTimer.waitToDo(0.4,function(){
                    inventory.currentGloves = inventory.previousGloves;
                    //gameTools.remove
                    inventory.previousGloves = null;
                    gameTools.removeStorageTip();
                    gameTools.drawTip(inventory.currentGloves);
                    //提示可以使用手套
                    var lockTip = new LockTipDialogBox(420);
                    lockTip.setData(string.currentString.s186);
                    lockTip.x = 85;lockTip.y = 486;
                    visibleManager.showDialog(lockTip);
                })
                return;
            }
//            runtimeData.gameOver();
            LTimer.waitToDo(1,runtimeData.gameOver,this);
            return;
        }
        if(!inventory.forecastPlant && !inventory.forecastAnimal && !inventory.forecastUniversal && !inventory.forecastGloves){
            gameTools.createNextPlant();
        }
        //处理下一个
        if(inventory.forecastPlant){
            inventory.currentPlant = inventory.forecastPlant;
            gameTools.drawTip(inventory.currentPlant,p);
            inventory.forecastPlant = null;
            //检测
            var statisticsResultArr = [];
            ai.analyseResult(cakecake.gridElements[p.row][p.col],inventory.currentPlant,statisticsResultArr);
            ai.checkTest(statisticsResultArr);
        }else if(inventory.forecastAnimal){
            inventory.currentAnimal = inventory.forecastAnimal;
            inventory.forecastAnimal = null;
            gameTools.drawTip(inventory.currentAnimal,p);
        }else if(inventory.forecastUniversal){
            inventory.currentUniversal = inventory.forecastUniversal;
            inventory.forecastUniversal = null;
            gameTools.drawTip(inventory.currentUniversal,p);
        }else if(inventory.forecastGloves){
            inventory.currentGloves = inventory.forecastGloves;
            inventory.forecastGloves = null;
            gameTools.drawTip(inventory.currentGloves,p);
        }
        gameTools.createNextPlant();
    }
    this.gameTools.drawCombineTip = function(statisticsResultArr){
        gameUI.combinedTipContainer.removeAllChild();

        var combinedResultLevel = 0;
        var plants = [];
        //统计用于合并物体
        for(var i = 0;i<statisticsResultArr.length;i++){
            var statisticsResult = statisticsResultArr[i];
            combinedResultLevel = Plant.getNextLevel(statisticsResult.targetPlant.level);
            var length = 0;
            //如果是第一个，length要+1，
            if(i){
                length = statisticsResult.statisticsTeam.length;
            }else{
                length = statisticsResult.statisticsTeam.length+1;
            }
            plants.push({count:length,level:statisticsResult.targetPlant.level});

        }
        //合并的物体们
        for(var i = 0;i<plants.length;i++){
            //数量
            var count = new LTextField();
            count.size = 30;
            count.color = "#ffffff";
            count.x = 85*i-12;
            count.y = -13;
            count.text = plants[i].count;
            gameUI.combinedTipContainer.addChild(count);


            //动画
            var tempPlant = new Plant(plants[i].level);
            var anim = tempPlant.animation;
            anim.scaleX = anim.scaleY = 0.6;
            anim.y = -36;
            if(plants[i].level == 100){
                anim.y += 11;
            }
            anim.x = 85*i;
            gameUI.combinedTipContainer.addChild(anim);
            // +  =
            if(i == plants.length - 1){
                var bpd = new LBitmapData(assetsData.game.image,assetsData.game.combine_arrow);
                var addSign = new LBitmap(bpd);
                addSign.x = 15;
                addSign.y = 2;
                addSign.scaleY = 0.5;
                addSign.scaleX = 0.8;
            }else{
                var addSign = new LTextField();
                addSign.size = 30;
                addSign.color = "#ffffff";
                addSign.y = -13;
                addSign.text = "+";
            }
            addSign.x += 85*i+52;
            gameUI.combinedTipContainer.addChild(addSign);


        }
        //合成结果
        if(combinedResultLevel){
            var combinedPlant = new Plant(combinedResultLevel);
            combinedPlant.animation.scaleX = combinedPlant.animation.scaleY = 0.6;
            combinedPlant.animation.x = 85*i+32;
            combinedPlant.animation.y = -36;
            gameUI.combinedTipContainer.addChild(combinedPlant.animation);
        }

    }
    this.gameTools.drawForecastTip = function(cakeObject,coordinate){
        cakecake.forecastTipContainer.removeAllChild();
        cakecake.forecastTipContainer.addChild(cakeObject.animation);
        if(coordinate){
            cakeObject.animation.x = coordinate.x;
            //cakeObject.animation.y = coordinate.y;
        }
    }
    this.gameTools.getRandomEmptyGrid = function(){
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
            if(gameTools.isEmpty(3,1)){
                return cakecake.gridElements[3][1];
            }else if(gameTools.isEmpty(3,0)){
                return cakecake.gridElements[3][0];
            }

        }
        var egs = gameTools.getEmptyGrids();
        var r = parseInt(util.getRandom(0,egs.length-1));
        return egs[r];
    }
    this.gameTools.getEmptyGrids = function(){
        var emptyGrids = [];
        for(var j = 0; j < mapConfig.row; j++){
            for(var a = 0; a < mapConfig.col; a++){
                if((j == 0 && a == 0)||(j == 5 && a == 5)){
                    continue;
                }
//                var grid = cakecake.gridElements[j][a];
                if(gameTools.isEmpty(j,a)){
                    emptyGrids.push(cakecake.gridElements[j][a]);
                }
            }
        }
        return emptyGrids;
    }
    this.gameTools.getCurrentRowCol = function(event){
        var col = parseInt((event.x - mapConfig.offsetLeft) / mapConfig.gridWidth),
            row = parseInt((event.y - mapConfig.offsetTop + mapConfig.clipTop) / mapConfig.gridHeight);
        var _x = col * mapConfig.gridWidth + mapConfig.offsetLeft;
        var _y = row * mapConfig.gridHeight + mapConfig.offsetTop;
        if(col > 5 || col < 0 || row > 5 || row < 0)
            return null;
        //引导模式，限制位置
        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished && tutorialManager.tutorialItem.p && (tutorialManager.tutorialItem.type == 1 || tutorialManager.tutorialItem.type == 3)){
            if(col == tutorialManager.tutorialItem.p.col && row == tutorialManager.tutorialItem.p.row){
                return {
                    row : row,
                    col : col,
                    x : _x,
                    y : _y
                };
            }else{
                return null;
            }

        }else{
            return {
                row : row,
                col : col,
                x : _x,
                y : _y
            };
        }

    }
//    this.gameTools.getCurrentTouchRowCol = function(touch){
//        //var touch = event.touches[0];
//        var col = parseInt((touch.pageX-mapConfig.offsetLeft)/mapConfig.gridWidth);
//        var row = parseInt((touch.pageY-mapConfig.offsetTop)/mapConfig.gridHeight);
//        var _x = col*mapConfig.gridWidth+mapConfig.offsetLeft;
//        var _y = row*mapConfig.gridHeight+mapConfig.offsetTop;
//        return {row:row,col:col,x:_x,y:_y};
//    }
    this.gameTools.isEmpty = function (row,col){
        //为了左上角和右下角的2个工具格
        if((row == 0 && col == 0)||(row == 5 && col == 5)){
            return false;
        }
        var plant = cakecake.gridElements[row][col].plant;
        var animal = cakecake.gridElements[row][col].animal;
        if(plant || animal){
            return false;
        }else{
            return true;
        }
    }
    this.gameTools.isPlant = function (row,col){
        //为了左上角和右下角的2个工具格
        if((row == 0 && col == 0)||(row == 5 && col == 5)){
            return false;
        }
        var plant = cakecake.gridElements[row][col].plant;
        if(plant){
            return true;
        }else{
            return false;
        }
    }
    this.gameTools.isAnimal = function (row,col){
        //为了左上角和右下角的2个工具格
        if((row == 0 && col == 0)||(row == 5 && col == 5)){
            return false;
        }
        var animal = cakecake.gridElements[row][col].animal;
        if(animal){
            return true;
        }else{
            return false;
        }
    }
    this.gameTools.isTool = function (row,col){
        //为了左上角和右下角的2个工具格
        if((row == 0 && col == 0)||(row == 5 && col == 5)){
            return true;
        }
        return false;
    }
    this.gameTools.drawTip = function(plant,position){
        if(position){
            cakecake.tipContainer.y = position.row*mapConfig.gridHeight+mapConfig.offsetTop;
            cakecake.tipContainer.x = position.col*mapConfig.gridWidth+mapConfig.offsetLeft;
        }
        cakecake.tipContainer.addChild(plant.animation);
        //左上角合成提示。
//        cakecake.combineTipContainer.removeAllChild();
//        cakecake.combineResultTipContainer.removeAllChild();
//
//        if((plant.level >= 100 && plant.level < 108) || (plant.level >= 200 && plant.level < 201 ) || (plant.level == 500)){
//            cakecake.combineTipContainer.addChild((new Plant(plant.level)).animation);
//            cakecake.combineResultTipContainer.addChild((new Plant(plant.level+1)).animation);
//        }
    }

    this.gameTools.removeTargetTweenArr = function(tweens){
        while(tweens.length>0){
            var tweenObj = tweens.shift();
            LGlobal.TweenLite.removeTween(tweenObj.tween);
            tweenObj.ref.animationLayer.x = tweenObj.ref.x;
            tweenObj.ref.animationLayer.y = tweenObj.ref.y;
           // tween.ref.recoverFront();
           // tween.ref.hideAnimation();
        }
    }
//    this.gameTools.removeShakeTweenArr = function(tweens){
//        while(tweens.length>0){
//            var tween = tweens.shift();
//            LGlobal.TweenLite.removeTween(tween.tween);
//            tween.ref.scaleX = tween.scaleX;
//            tween.ref.scaleY = tween.scaleY;
////            if(tween.ref.spriteSheet){
////                tween.ref.stop();
////            }
//        }
//    }
    this.gameTools.removeTip = function(){
       // gameTools.removeShakeTweenArr(cakecake.shakeTweens);
        cakecake.tipContainer.removeAllChild();
    }
    this.gameTools.removeStorageTip = function(){
        // gameTools.removeShakeTweenArr(cakecake.shakeTweens);
        cakecake.gridElements[0][0].animationLayer.removeChildAt(1);
    }
    this.gameTools.setTipPosition = function(p){
        cakecake.tipContainer.x  = p.x;
        cakecake.tipContainer.y  = p.y;
    }
    this.gameTools.resetInventory = function(){
        inventory.resetCurrent();
        inventory.resetPrevious();
        inventory.resetForecast();
    }
    this.gameTools.inPause = function(){
        if(gameTools.inGame()){
            if(gameUI.pausePanel && (gameUI.pausePanel.visible || gameUI.pausePanel.currentPanel)){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }
    this.gameTools.inGame = function(){
        if(gameUI.pauseBtn){
            return true;
        }else{
            return false;
        }
    }
    this.gameTools.inMenu = function(){
        if(gameUI.modePanel){
            return true;
        }else{
            return false;
        }
    }
    this.gameTools.onPause = function(event){
        //利用此方式重置新手引导
//        if(runtimeData.currentMode == "mode5" && !tutorialManager.finished && tutorialManager.tutorialItem && tutorialManager.tutorialItem.type !=5){
//            tutorialManager.goback = true;
//            tutorialManager.tutorialIndex--;
//            if(tutorialManager.tutorialIndex == 41){
//                tutorialManager.tutorialIndex--;
//            }
//            if(tutorialManager.tutorialIndex <0) tutorialManager.tutorialIndex = 0;
//        }
        if(event){
            event.stopGoOn = true;
        }
        if(gameUI.storePanel && gameUI.storePanel.visible && gameUI.storePanel.parent){
            gameUI.storePanel.onBack(null,true);
        }

        soundManager.play("pause_button");
        visibleManager.showPanel("pause");
    }
}())

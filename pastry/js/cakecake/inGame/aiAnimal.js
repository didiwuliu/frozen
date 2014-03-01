/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-13
 * Time: 上午11:33
 * To change this template use File | Settings | File Templates.
 */
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-2
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */
this.aiAnimal = this.aiAnimal || {};
(function(){
    //有动物的grid为emptygrid。
    this.aiAnimal.statisticsAnimalSpace = function(gridContainer,statisticsTeam){
        var row = gridContainer.row;
        var col = gridContainer.col;

        var tempTeam = [];
        //添加了统计的起始点，与统计连续的plant不同
        if(statisticsTeam.indexOf(gridContainer) < 0){
            statisticsTeam.push(gridContainer);
        }
        //左
        if(col>0){
            if(gameTools.isAnimal(row,col-1) || gameTools.isEmpty(row,col-1)){
                var grid1 = cakecake.gridElements[row][col-1];
                if(statisticsTeam.indexOf(grid1) < 0){
                    statisticsTeam.push(grid1);
                    tempTeam.push(grid1);
                }
            }
        }
        //右
        if(col<5){
            if(gameTools.isAnimal(row,col+1) || gameTools.isEmpty(row,col+1)){
                var grid2 = cakecake.gridElements[row][col+1];
                if(statisticsTeam.indexOf(grid2) < 0 ){
                    statisticsTeam.push(grid2);
                    tempTeam.push(grid2);
                }
            }
        }
        //上
        if(row>0){
            if(gameTools.isAnimal(row-1,col) || gameTools.isEmpty(row-1,col)){
                var grid3 = cakecake.gridElements[row-1][col];
                if(statisticsTeam.indexOf(grid3) < 0){
                    statisticsTeam.push(grid3);
                    tempTeam.push(grid3);
                }
            }
        }
        //下
        if(row<5){
            if(gameTools.isAnimal(row+1,col) || gameTools.isEmpty(row+1,col)){
                var grid4 = cakecake.gridElements[row+1][col];
                if(statisticsTeam.indexOf(grid4) < 0){
                    statisticsTeam.push(grid4);
                    tempTeam.push(grid4);
                }
            }
        }

        while(tempTeam.length > 0){
            aiAnimal.statisticsAnimalSpace(tempTeam.shift(),statisticsTeam);
        }
    } ;

    this.aiAnimal.doAnimalCheck = function(scopeResult){
        var scopeArr = scopeResult.scope;//在aiAnimal.statisticsAnimalSpace中，已经剔除了（0,0）（5,5）2个grid
        var targetContainer = scopeResult.targetContainer;
        var targetAnimal = scopeResult.targetAnimal;


        var over = gameTools.getEmptyGrids().length <= 1;//用此判断是否有空格,放之前还剩一个，所以  <=1
        var animalCount = 0;
        for(var i = 0;i<scopeArr.length;i++){
            if(scopeArr[i].animal){
                if(!scopeArr[i].animal.superAnimal || over){
                    animalCount++;
                }
            }
        }
        //animalCount不包含targetContainer的animal，所以  < scopeArr.length-1
        if(animalCount < scopeArr.length-1 || (targetAnimal.superAnimal && !over)){
//        if(animalCount < scopeArr.length-1 ){
            targetContainer.setAnimal(targetAnimal);
            gameTools.goon(1);
        }else{
            achievement.finishAchievement("achievement_novice_003");
            //runtimeData.trapedHamster += animalCount+1;
            runtimeData.trappedHamsterCount(animalCount+1);
            soundManager.play("trap_hamster");
            for(var i = 0;i<scopeArr.length;i++){
                //targetContainer可能会合并，所以暂时不放内容，（目的：方便搜索合并的grids）
                if(scopeArr[i] == targetContainer){
                    continue;
                }
                scopeArr[i].setPlant(new Plant(200,false),true);
            }
            var score = assistantHandler.config.trapHamster;
            runtimeData.grantedScore(score*scopeArr.length);

            //动物变成一个墓碑，所以当前currentPlant =  new Plant(200,false)，并修改tip：先removeTip()，再drawTip(currentPlant);
            var currentPlant = new Plant(200,false);
            gameTools.removeTip();
            gameTools.drawTip(currentPlant);
            processPlant(targetContainer,currentPlant);
        }
    }
//    this.aiAnimal.combinePlant = function (scopeArr,targetContainer,i){
//        var gridContainer = scopeArr[i];
//        gridContainer.hideAnimation();
//        gridContainer.clearGrid();
//        gridContainer.animationContainer.x = gridContainer.x;
//        gridContainer.animationContainer.y = gridContainer.y;
//
//        if(i == scopeArr.length-1){
//            aiAnimal.upGradeResult(scopeArr,targetContainer);
//        }
//    }

//    this.aiAnimal.upGradeResult = function (scopeArr,targetContainer){
//        var advanced;
//        if(scopeArr.length>3){
//            advanced = true;
//        }
//        targetContainer.plant.setLevel(targetContainer.plant.level+1,advanced);
//        targetContainer.setPlant(targetContainer.plant);
//    }

    this.aiAnimal.analyseAnimalResult = function(gridContainer,targetAnimal){
        var statisticsTeam = [];
        aiAnimal.statisticsAnimalSpace(gridContainer,statisticsTeam);
        return {scope:statisticsTeam,targetContainer:gridContainer,targetAnimal:targetAnimal};
    }
    this.aiAnimal.animalsWalk = function(){
        var animals = [];
        var superAnimals = [];
        var nextGrids =[];
        for(var i = 0;i<6;i++){
            for(var j = 0;j<6;j++){
                if(i == 0 && j == 0){continue}else if(i == 5 && j == 5){continue};
                var animal = cakecake.gridElements[i][j].animal;
                if(animal){
                    if(animal.superAnimal){
                        superAnimals.push(cakecake.gridElements[i][j]);
                        continue;
                    }else{
                        animals.push(cakecake.gridElements[i][j]);
                    }
                }
            }
        }
       // if(runtimeData.currentMode == "mode5" && tutorialManager.finished){
            runtimeData.superHamsterCount = superAnimals.length;
            for(var i = 0;i<superAnimals.length;i++){
                aiAnimal.superAnimalWalk(superAnimals[i],nextGrids);
            }
       // }

        for(var i = 0;i<animals.length;i++){
            aiAnimal.animalWalk(animals[i],nextGrids);
        }
       // return {animal};
    }
    this.aiAnimal.directionPriority = {
        right:{
            nd:["down","up","left"],
            fun:function(row,col,nextGrids){
                if(col<5){
                    if(gameTools.isEmpty(row,col+1)){
                        var grid = cakecake.gridElements[row][col+1];
                        if(nextGrids.indexOf(grid)<0){
                            nextGrids.push(grid);
                            return grid;
                        }
                    }
                }
                return null;
             }
        },
        left:{
            nd:["up","down","right"],
            fun:function(row,col,nextGrids){
                if(col>0){
                    if(gameTools.isEmpty(row,col-1)){
                        var grid = cakecake.gridElements[row][col-1];
                        if(nextGrids.indexOf(grid)<0){
                            nextGrids.push(grid);
                            return grid;
                        }
                    }
                }
                return null;
            }
        },
        up:{
            nd:["right","left","down"],
            fun:function(row,col,nextGrids){
                if(row>0){
                    if(gameTools.isEmpty(row-1,col)){
                        var grid = cakecake.gridElements[row-1][col];
                        if(nextGrids.indexOf(grid)<0){
                            nextGrids.push(grid);
                            return grid;
                        }
                    }
                }
                return null;
            }
        },
        down:{
            nd:["left","right","up"],
            fun:function(row,col,nextGrids){
                if(row<5){
                    if(gameTools.isEmpty(row+1,col)){
                        var grid = cakecake.gridElements[row+1][col];
                        if(nextGrids.indexOf(grid)<0){
                            nextGrids.push(grid);
                            return grid;
                        }
                    }
                }
                return null;
            }
        }
    };
    this.aiAnimal.superAnimalWalk = function(animalGrid,nextGrids){
        if(!animalGrid.animal.animation.stop && animalGrid.animal.animation.currentAnimationName != "Sstand"){
            return;
        }
        var destination = gameTools.getRandomEmptyGrid();
        if(!destination)return;
        if(nextGrids.indexOf(destination) < 0){
            aiAnimal.superWalkToDestination(animalGrid,destination);
        }

    }
    this.aiAnimal.animalWalk = function(animalGrid,nextGrids){
        var row = animalGrid.row;
        var col = animalGrid.col;
        var nowDirection = animalGrid.animal.direction;
        var ng = aiAnimal.directionPriority[nowDirection].fun(row,col,nextGrids);
        if(!ng){
            for(var i = 0;i<3;i++){
                animalGrid.animal.direction = aiAnimal.directionPriority[nowDirection].nd[i];
                ng = aiAnimal.directionPriority[animalGrid.animal.direction].fun(row,col,nextGrids);
                if(ng){break;}
            }
        }
       if(ng){
            aiAnimal.walkToDestination(animalGrid,ng);
        }
    }
    this.aiAnimal.superWalkToDestination = function(begin,end){
        runtimeData.animalWalk++;
        soundManager.play("SuperhamsterDisapear");
        end.animationLayer.x = begin.x;
        end.animationLayer.y = begin.y;
        //begin.hideAnimation();
        end.setAnimal(begin.animal);
        begin.animationLayer.removeAllChild();
        begin.animal = null;

        end.animal.walk(begin,end);
    }
    this.aiAnimal.walkToDestination = function(begin,end){
        runtimeData.animalWalk++;
       end.animationLayer.x = begin.x;
       end.animationLayer.y = begin.y;
       end.backDecorateLayer.x = begin.x;
       end.backDecorateLayer.y = begin.y;
        //begin.hideAnimation();
       end.setAnimal(begin.animal);
        begin.animationLayer.removeAllChild();
        begin.animal = null;

        end.animal.walk(begin,end);
        var targetTween = LGlobal.TweenLite.to(end.animationLayer,400,{x:end.x, y:end.y,
            onComplete:
                function()
                {
                    runtimeData.animalWalkComplete++;
                    if(end.animal){
                        end.animal.stand();
                    }
                }
        });
        var targetTweenBack = LGlobal.TweenLite.to(end.backDecorateLayer,400,{x:end.x, y:end.y});

    }

    this.aiAnimal.processScop = function (scop,targetGridContainer){
        var animalCount = 0;
        var over = gameTools.getEmptyGrids().length <= 1;//用此判断是否有空格,放之前还剩一个，所以  <=1
        for(var i = 0;i<scop.length;i++){
            if(gameTools.isAnimal(scop[i].row,scop[i].col) && (!scop[i].animal.superAnimal || over)){
                animalCount++;
            }
        }

        if(animalCount >= scop.length){
            //成就
            achievement.finishAchievement("achievement_novice_003");
            if(animalCount >= 4){achievement.finishAchievement("achievement_novice_007");}
            if(animalCount >= 10){achievement.finishAchievement("achievement_adventurer_009");}
            //runtimeData.trapedHamster += animalCount;
            runtimeData.trappedHamsterCount(animalCount);

            soundManager.play("trap_hamster");
            for(var j = 0;j<scop.length;j++){
                scop[j].setPlant(new Plant(200,false),true);
            }

            if(assistantHandler.trapHamsterGetScore){
                runtimeData.grantedScore(assistantHandler.config.trapHamster * scop.length);
            }
            //animal的路被被动堵死（相对于主动堵死），处理墓碑合并问题。
            //if(animalCount>=3){
                var currentPlant = new Plant(200,false);
                targetGridContainer.plant = null;
                processPlant(targetGridContainer,currentPlant);
                return false;//未到达循环结束。
           // }
           // return true;
        }else{
            return true//到达循环结束
        }
    }
    this.aiAnimal.processScops = function(scops){
        var toBeEnds = [];
        for(var i = 0;i<scops.length;i++){
           var tobeEnd =  aiAnimal.processScop(scops[i],scops[i][0]);//以域内的第一个为targetGridContainer
            toBeEnds.push(tobeEnd);
        }
        //判断是否结束了合并循环，并产生下一个；
        var r = true;
        while(toBeEnds.length>0){
           var value = toBeEnds.shift();
           if(!value){
               r = false;
           }
        }
        if(r){
            gameTools.goon(2);
        }

    }
    this.aiAnimal.gridInScops = function(scops,grid){
        for(var i = 0;i<scops.length;i++){
            var scop = scops[i];
            var index = scop.indexOf(grid);
            if(index>0){
                return true;
            }
        }
        return false;
    }
    this.aiAnimal.statisticsScopes = function(gridContainer){
        var row = gridContainer.row;
        var col = gridContainer.col;
        var scops = [];
        //左
        if(col>0){
            var grid1 = cakecake.gridElements[row][col-1];
            if(!aiAnimal.gridInScops(scops,grid1)){
                if(!grid1.plant){
                    var gridsInScop = [];
                    aiAnimal.statisticsAnimalSpace(grid1,gridsInScop);
                    scops.push(gridsInScop);
                }
            }
        }
        //右
        if(col<5){
            var grid2 = cakecake.gridElements[row][col+1];
            if(!aiAnimal.gridInScops(scops,grid2)){
                if(!grid2.plant){
                    var gridsInScop = [];
                    aiAnimal.statisticsAnimalSpace(grid2,gridsInScop);
                    scops.push(gridsInScop);
                }
            }
        }
        //上
        if(row>0){
            var grid3 = cakecake.gridElements[row-1][col];
            if(!aiAnimal.gridInScops(scops,grid3)){
                if(!grid3.plant){
                    var gridsInScop = [];
                    aiAnimal.statisticsAnimalSpace(grid3,gridsInScop);
                    scops.push(gridsInScop);
                }
            }
        }
        //下
        if(row<5){
            var grid4 = cakecake.gridElements[row+1][col];
            if(!aiAnimal.gridInScops(scops,grid4)){
                if(!grid4.plant){
                    var gridsInScop = [];
                    aiAnimal.statisticsAnimalSpace(grid4,gridsInScop);
                    scops.push(gridsInScop);
                }
            }
        }
        return scops;
    }
    this.aiAnimal.killHamsterAtLast = function(){
        //超级老鼠和普通老鼠混合时，普通老鼠即使无路可走，也不会被杀死。


    }
}())




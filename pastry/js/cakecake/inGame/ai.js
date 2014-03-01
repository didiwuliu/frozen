/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-2
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */
this.ai = this.ai || {};
(function(){

    this.ai.statistics = function (gridContainer,targetPlant,statisticsTeam){
        var row = gridContainer.row;
        var col = gridContainer.col;

        var tempTeam = [];
        //左
        if(col>0){
            var grid1 = cakecake.gridElements[row][col-1];
            if(grid1.plant){
                var b = (grid1.plant.level >=100 && grid1.plant.level <=107) || (grid1.plant.level >=200 && grid1.plant.level <=202) || grid1.plant.level ==301 || grid1.plant.level ==500;//(500,小钱币，300，蛋糕工具)
                if(statisticsTeam.indexOf(grid1) < 0 && grid1.plant.level == targetPlant.level && b){
                    statisticsTeam.push(grid1);
                    tempTeam.push(grid1);
                }
            }
        }
        //右
        if(col<5){
            var grid2 = cakecake.gridElements[row][col+1];
            if(grid2.plant){
                var b = (grid2.plant.level >=100 && grid2.plant.level <=107) || (grid2.plant.level >=200 && grid2.plant.level <=202) || grid2.plant.level ==301 || grid2.plant.level ==500;
                if(statisticsTeam.indexOf(grid2) < 0 && grid2.plant.level == targetPlant.level && b){
                    statisticsTeam.push(grid2);
                    tempTeam.push(grid2);
                }
            }
        }
        //上
        if(row>0){
            var grid3 = cakecake.gridElements[row-1][col];
            if(grid3.plant){
                var b = (grid3.plant.level >=100 && grid3.plant.level <=107) || (grid3.plant.level >=200 && grid3.plant.level <=202) || grid3.plant.level ==301 || grid3.plant.level ==500;
                if(statisticsTeam.indexOf(grid3) < 0 && grid3.plant.level == targetPlant.level && b){
                    statisticsTeam.push(grid3);
                    tempTeam.push(grid3);
                }
            }
        }
        //下
        if(row<5){
            var grid4 = cakecake.gridElements[row+1][col];
            if(grid4.plant){
                var b = (grid4.plant.level >=100 && grid4.plant.level <=107) || (grid4.plant.level >=200 && grid4.plant.level <=202) || grid4.plant.level ==301 || grid4.plant.level ==500;
                if(statisticsTeam.indexOf(grid4) < 0 && grid4.plant.level == targetPlant.level && b){
                    statisticsTeam.push(grid4);
                    tempTeam.push(grid4);
                }
            }
        }

        while(tempTeam.length > 0){
            ai.statistics(tempTeam.shift(),targetPlant,statisticsTeam);
        }
    }

    this.ai.analyseResult = function (gridContainer,targetPlant,statisticsResultArr){
        var statisticsTeam = [];
        ai.statistics(gridContainer,targetPlant,statisticsTeam);
        if(statisticsTeam.length >= 2){
            statisticsResultArr.push({targetContainer:gridContainer,targetPlant:targetPlant,statisticsTeam:statisticsTeam});
            var nextLevel;
            if(targetPlant.level == 202 || targetPlant.level == 301){
                nextLevel = 500;
            }else{
                nextLevel = targetPlant.level+1;
            };

            var advanced =false;
            if(statisticsTeam.length >= 3){
                advanced =true;
            }
            var resultPlant = new Plant(nextLevel,advanced);
            ai.analyseResult(gridContainer,resultPlant,statisticsResultArr);
        }
    }

    this.ai.doCheck = function (statisticsResultArr,currentGridContainer,currentPlant){
        gameTools.removeTargetTweenArr(cakecake.targetTweens);
        if(statisticsResultArr.length < 1){
            currentGridContainer.setPlant(currentPlant);
            var levelObject = gameConfig.gameObjects["level_"+currentPlant.level];
            runtimeData.grantedScore(levelObject.point);
            return;
        }
        var result;
        var hamsterTrapedAnimation;
        var length = statisticsResultArr.length;
        for(var i = 0;i<length;i++){
            result = statisticsResultArr[i];
            //多于3个物体合并，额外加分
            var levelObject = gameConfig.gameObjects["level_"+result.targetPlant.level];
            if(result.statisticsTeam.length > 2){
                var score = levelObject.combo;
                if(assistantHandler.combinedWithScore){
                    score = Math.round(score*1.1);
                }
                runtimeData.grantedScore(score);
            }
            //合成时，奖励加时间，但不加回合 加回合
            if(runtimeData.currentMode == "mode2" && levelObject.level >= 100 && levelObject.level <= 108){
                runtimeData.totalTime += levelObject.grantedSecond * (result.statisticsTeam.length +1-2);
            }


            if(result.targetPlant.level == 200){
                hamsterTrapedAnimation = true;
            }
            for(var j=0;j<result.statisticsTeam.length;j++){
                //纪录原始数据,向目标移动
                var animationLayer = result.statisticsTeam[j].animationLayer;
               // result.statisticsTeam[j].showAnimation();
               //result.statisticsTeam[j].clearFront();
                var _ox = result.statisticsTeam[j].x;var _oy = result.statisticsTeam[j].y;

                var moveTo = function(target,xx,yy,comFun,paramsArr){
                    var targetTween = LGlobal.TweenLite.to(target,300,{x:xx, y:yy,onComplete:comFun,params:paramsArr});
                }

                if(hamsterTrapedAnimation){
                    LTimer.waitToDo(0.5,moveTo,this,[animationLayer,result.targetContainer.animationLayer.x,result.targetContainer.animationLayer.y,ai.combinePlant,[result.statisticsTeam[j],statisticsResultArr,result,i,j]]);
                }else{
                    moveTo(animationLayer,result.targetContainer.animationLayer.x,result.targetContainer.animationLayer.y,ai.combinePlant,[result.statisticsTeam[j],statisticsResultArr,result,i,j]);
                }

            }
        }

//        if(runtimeData.currentMode == "mode3"){
//            runtimeData.totalRound += length;
//        }
        //成就
        achievement.finishAchievement("achievement_novice_006");

    }
    this.ai.upGradeResult = function (result){
        var advanced;//超过3个物体合并
        if(result.statisticsTeam.length>2){
            advanced = true;
        }
        if(result.targetPlant.level == 202 || result.targetPlant.level == 301){
            result.targetPlant.setLevel(500,advanced);//小钱币
        }else{
            result.targetPlant.setLevel(result.targetPlant.level+1,advanced);
            console.log("result.targetPlant.level:"+result.targetPlant.level)
        }
        result.targetContainer.setPlant(result.targetPlant);
        //加分，
        var levelObject = gameConfig.gameObjects["level_"+result.targetPlant.level];
        var score = levelObject.point;
//        if(assistantHandler.combinedWithScore){
//            score = Math.round(score*1.1);
//        }
        runtimeData.grantedScore(score);
        //清空统计结果数组
        statisticsResultArr = [];
        //记录用户达到的最高等级
        if(result.targetPlant.level <= 108 && result.targetPlant.level > runtimeData.reachedHighestLevel){
            runtimeData.reachedHighestLevel = result.targetPlant.level;
        }
        //成就
        if(result.targetPlant.level == 104){
            achievement.finishAchievement("achievement_novice_005");
        }else if(result.targetPlant.level == 106){
            achievement.finishAchievement("achievement_adventurer_006");
        }else if(result.targetPlant.level == 107){
            achievement.finishAchievement("achievement_adventurer_007");
        }else if(result.targetPlant.level == 108){
            achievement.finishAchievement("achievement_adventurer_008");
        }


    }
   // this.inGame.combinePlant = function (gridContainer,statisticsResultArr,result,i,j){
    this.ai.combinePlant = function (params){
        var gridContainer = params[0];
        var statisticsResultArr = params[1];
        var result = params[2];
        var i = params[3];
        var j = params[4];
        if(!gridContainer)
        {
            gridContainer=result.statisticsTeam[j];
        }
        //gridContainer.hideAnimation();
        gridContainer.clearGrid();
        gridContainer.animationLayer.x = gridContainer.x;
        gridContainer.animationLayer.y = gridContainer.y;

        if(i == statisticsResultArr.length-1 && j == statisticsResultArr[i].statisticsTeam.length-1){
            ai.upGradeResult(result);
        }
        if(i == 0 && j == 0){
            if(i == 0){
                var index = Math.floor(util.getRandom(1,4));
                var soundName = "Grouping"+index+"_fade";
                soundManager.play(soundName);
                //添加合成特效，在物体刚要移动时，就开始播放动画。
                //var animation = new LAnimation(new LBitmapData(assetsData.cake.image));
                var animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_cakeCombine.image,null));
                animation.setAnimation(Plant.getCombinedAnimationData());
                animation.setCurrentAnimation("combinedAnimation");
                animation.stop = false;
                animation.loop = false;
                animation.setfps(1);
                animation.x = -15;
                animation.y = -15-5;
                result.targetContainer.addDecorate(animation);
            }
        }

    }
    this.ai.checkTest = function (statisticsResultArr){
        gameTools.removeTargetTweenArr(cakecake.targetTweens);
        for(var i = 0;i<statisticsResultArr.length;i++){
            var result = statisticsResultArr[i];
            for(var j=0;j<result.statisticsTeam.length;j++){
                //纪录原始数据
              var animationLayer = result.statisticsTeam[j].animationLayer;
               //result.statisticsTeam[j].showAnimation();
               // result.statisticsTeam[j].clearFront();
                var _ox = result.statisticsTeam[j].x;var _oy = result.statisticsTeam[j].y;
                //计算晃动目标点
                var _tx = result.targetContainer.x;var _ty = result.targetContainer.y;
                var _ds = Math.sqrt((_tx-_ox)*(_tx-_ox)+(_ty-_oy)*(_ty-_oy));
                var a=15;
                var dx = (_tx-_ox)*a/_ds;var dy = (_ty-_oy)*a/_ds;

                var targetTween = LGlobal.TweenLite.to(animationLayer,300,{x:dx+_ox, y:dy+_oy,yoyo:true});
                cakecake.targetTweens.push({tween:targetTween,ref:result.statisticsTeam[j],ox:_ox,oy:_oy});
            }
        }
        gameTools.drawCombineTip(statisticsResultArr);
        //清空统计结果数组
        statisticsResultArr = [];
    }

    this.ai.lookForPosition = function (){
        while(openArr.length > 0){
            var gridContainer = openArr.shift();
            closeArr.push(gridContainer);
            //上
            if(gridContainer.row-1 >= 0){
                if(gameTools.isEmpty(gridContainer.row-1,gridContainer.col)){
                    return {row:gridContainer.row-1,col:gridContainer.col};
                }

                if(closeArr.indexOf(cakecake.gridElements[gridContainer.row-1][gridContainer.col]) < 0 && openArr.indexOf(cakecake.gridElements[gridContainer.row-1][gridContainer.col]) < 0){
                    openArr.push(cakecake.gridElements[gridContainer.row-1][gridContainer.col]);
                }

            }
            //下
            if(gridContainer.row+1 <= 5){
                if(gameTools.isEmpty(gridContainer.row+1,gridContainer.col)){
                    return {row:gridContainer.row+1,col:gridContainer.col};
                }
                if(closeArr.indexOf(cakecake.gridElements[gridContainer.row+1][gridContainer.col]) < 0 && openArr.indexOf(cakecake.gridElements[gridContainer.row+1][gridContainer.col]) < 0){
                    openArr.push(cakecake.gridElements[gridContainer.row+1][gridContainer.col]);
                }

            }
            //左
            if(gridContainer.col-1 >= 0){
                if(gameTools.isEmpty(gridContainer.row,gridContainer.col-1)){
                    return {row:gridContainer.row,col:gridContainer.col-1};
                }
                if(closeArr.indexOf(cakecake.gridElements[gridContainer.row][gridContainer.col-1]) < 0 && openArr.indexOf(cakecake.gridElements[gridContainer.row][gridContainer.col-1]) < 0){
                    openArr.push(cakecake.gridElements[gridContainer.row][gridContainer.col-1]);
                }
            }
            //右
            if(gridContainer.col+1 <= 5){
                if(gameTools.isEmpty(gridContainer.row,gridContainer.col+1)){
                    return {row:gridContainer.row,col:gridContainer.col+1};
                }
                if(closeArr.indexOf(cakecake.gridElements[gridContainer.row][gridContainer.col+1]) < 0 && openArr.indexOf(cakecake.gridElements[gridContainer.row][gridContainer.col+1]) < 0){
                    openArr.push(cakecake.gridElements[gridContainer.row][gridContainer.col+1]);
                }
            }
        }
    }

}())


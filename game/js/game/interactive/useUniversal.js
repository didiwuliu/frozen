/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午12:08
 * To change this template use File | Settings | File Templates.
 */
function useUniversal(targetContainer,universalPlant,test){
    if(!targetContainer){
        console.log("targetContainer null");
    }
    var row = targetContainer.row;
    var col = targetContainer.col;
    //不为空，则返回
    if(!gameTools.isEmpty(targetContainer.row, targetContainer.col)){
        return;
    }
    //统计周围四个物体；
    var roundTeam = [];
    function filterGrid(roundTeam,grid){
        if(gameTools.isPlant(grid.row,grid.col)){
            var contained = false;
            for(var i = 0;i<roundTeam.length;i++){
                if(roundTeam[i].plant.level == grid.plant.level){
                    contained = true;
                    break;
                }
            }
            if(!contained){roundTeam.push(grid);}
        }
    }
    //左
    if(col>0){
        if(!gameTools.isEmpty(row,col-1)){
            filterGrid(roundTeam,cakecake.gridElements[row][col-1]);
        }
    }
    //右
    if(col<5){
        if(!gameTools.isEmpty(row,col+1)){
            filterGrid(roundTeam,cakecake.gridElements[row][col+1]);
        }
    }
    //上
    if(row>0){
        if(!gameTools.isEmpty(row-1,col)){
            filterGrid(roundTeam,cakecake.gridElements[row-1][col]);
        }
    }
    //下
    if(row<5){
        if(!gameTools.isEmpty(row+1,col)){
            filterGrid(roundTeam,cakecake.gridElements[row+1][col]);
        }
    }
//分析左右上下4个cake的合成情况。
    var filterResultArr = [];
    //statisticsResultArr数组
    //statisticsResultArr.push({targetContainer:gridContainer,targetPlant:targetPlant,statisticsTeam:statisticsTeam});
    for(var i = 0;i<roundTeam.length;i++){
        var cake = roundTeam[i].plant;
        var statisticsResultArr = [];
        ai.analyseResult(targetContainer,cake,statisticsResultArr);
        if(statisticsResultArr.length>0)
            filterResultArr.push(statisticsResultArr);
    }
    //分析合成哪一个：
    var combinedTarget;
    for(var i = 0;i<filterResultArr.length;i++){
        //statisticsResultArr.push({targetContainer:gridContainer,targetPlant:targetPlant,statisticsTeam:statisticsTeam});
        if(i == 0){
            combinedTarget  = filterResultArr[0];
            continue;
        }
        var statisticsResultArr2 = filterResultArr[i];
        var l = statisticsResultArr2.length;
        var v = statisticsResultArr2[l-1].targetPlant.level;
        var lc = combinedTarget.length;
        var vc = combinedTarget[lc- 1].targetPlant.level;
        if((v == vc && l > lc) || (v > vc)){
            combinedTarget = statisticsResultArr2;
        }
    }

    if(combinedTarget){
        if(test){
            ai.checkTest(combinedTarget);
        }else{
            ai.doCheck(combinedTarget,targetContainer,combinedTarget[0].targetPlant);
        }
        return;
    }

//    for(var i = 0;i<filterResultArr.length;i++){
//        var obj = filterResultArr[i];
//        if(obj.length>0){
//            if(test){
//                ai.checkTest(obj);
//            }else{
//                ai.doCheck(obj,targetContainer,roundTeam[i].plant);
//            }
//            return;
//        }
//    }
//    for(var i = 0;i<roundTeam.length;i++){
//        var statisticsResultArr = [];
//        ai.analyseResult(targetContainer,roundTeam[i].plant,statisticsResultArr);
//
//        if(statisticsResultArr.length>0){
//            if(test){
//                ai.checkTest(statisticsResultArr);
//            }else{
//                ai.doCheck(statisticsResultArr,targetContainer,roundTeam[i].plant);
//            }
//            return;
//        }
//    }

    //如果没有return，则。。。。。
    if(!test){
//        gameTools.removeTip();
        //检测
        currentGridContainer = cakecake.gridElements[targetContainer.row][targetContainer.col];
        //记录前一个位置
        cakecake.prePosition.row = currentGridContainer.row;
        cakecake.prePosition.col = currentGridContainer.col;
        processPlant(currentGridContainer,new Plant(301));
    }

}
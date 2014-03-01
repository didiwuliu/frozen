/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-2
 * Time: 下午10:00
 * To change this template use File | Settings | File Templates.
 */
this.mouseHandler = this.mouseHandler || {};
(function(){
    this.mouseHandler.responseEvent = function(){
        mouseHandler.gridWork = true;
    }
    this.mouseHandler.notResponseEvent = function(){
        mouseHandler.gridWork = false;
    }


    this.mouseHandler.onStart = function(p){
        gameTools.removeTargetTweenArr(cakecake.targetTweens);
        //destruction cell  and  storage cell
        if(p.row == 5 && p.col == 5){
            gameTools.setTipPosition(p);
            return;
        }
        //storage cell
        if(p.row == 0 && p.col == 0){
            onStorageCell();
            return;
        }
        if((!gameTools.isEmpty(p.row, p.col))&&(!inventory.currentGloves)){
            return;
        }
        gameTools.setTipPosition(p);
        cakecake.currentGridContainer = cakecake.gridElements[p.row][p.col];
        //检测,如果是动物（障碍物），则不检测
        if(inventory.currentPlant){
            console.log(inventory.currentPlant);
            var statisticsResultArr = [];
            ai.analyseResult(cakecake.currentGridContainer,inventory.currentPlant,statisticsResultArr);
            ai.checkTest(statisticsResultArr);
        }else if(inventory.currentUniversal){
            useUniversal(cakecake.currentGridContainer,inventory.currentUniversal,true);
        }
    }
    this.mouseHandler.onMove = function(p){

        if(p.row == 5 && p.col == 5){
            //TODO
            gameTools.setTipPosition(p);
            return;
        }
        //storage cell
        else if(p.row == 0 && p.col == 0){
            return;
        }

        if((! gameTools.isEmpty(p.row, p.col))&&(!inventory.currentGloves)){
            gameTools.removeTargetTweenArr(cakecake.targetTweens);
            return;
        }
        if(!cakecake.currentGridContainer || (cakecake.currentGridContainer.col == p.col && cakecake.currentGridContainer.row == p.row)){
            return;
        }
        //修改提示框位置
        //修改currentPlant属性
        cakecake.currentGridContainer = cakecake.gridElements[p.row][p.col];
        cakecake.tipContainer.x = p.x;
        cakecake.tipContainer.y = p.y;
        //检测
        if(inventory.currentPlant){
            var statisticsResultArr = [];
            ai.analyseResult(cakecake.currentGridContainer,inventory.currentPlant,statisticsResultArr);
            ai.checkTest(statisticsResultArr);
        }else if(inventory.currentUniversal){
            useUniversal(cakecake.currentGridContainer,inventory.currentUniversal,true);
        }
    }
    this.mouseHandler.onEnd = function(p){
        //destruction cell
        if(p.row == 5 && p.col == 5){
            onDestructionCell();
            return;
        }
        //storage cell
        else if(p.row == 0 && p.col == 0){
            return;
        }
        //the priority of gloves is highest
        if(inventory.currentGloves){
            if(gameTools.isEmpty(p.row, p.col)){
                return;
            }
            //检测
            cakecake.currentGridContainer = cakecake.gridElements[p.row][p.col];
            //记录前一个位置
            cakecake.prePosition.row = cakecake.currentGridContainer.row;
            cakecake.prePosition.col = cakecake.currentGridContainer.col;
            processGloves(cakecake.currentGridContainer,inventory.currentGloves);
            inventory.currentGloves = null;
            return;
        }
        //收金币
        var plant = cakecake.gridElements[p.row][p.col].plant;
        if(plant && (plant.level == 500 || plant.level == 501)){
            onCoins(plant,p);
            return;
        }
        if(inventory.currentUniversal){
            if(!gameTools.isEmpty(p.row, p.col)){
                return;
            }
            soundManager.play("Place_object");
            cakecake.currentGridContainer = cakecake.gridElements[p.row][p.col];
            useUniversal(cakecake.currentGridContainer,inventory.currentUniversal);
            inventory.currentUniversal = null;
        }else{
            if(!gameTools.isEmpty(p.row, p.col)){
                return;
            }
            //检测
            cakecake.currentGridContainer = cakecake.gridElements[p.row][p.col];
            //记录前一个位置
            cakecake.prePosition.row = cakecake.currentGridContainer.row;
            cakecake.prePosition.col = cakecake.currentGridContainer.col;
            if(inventory.currentPlant){
                soundManager.play("Place_object");
//                console.log("level   :  "+inventory.currentPlant.level);
                processPlant(cakecake.currentGridContainer,inventory.currentPlant);
                inventory.currentPlant = null;
            }else if(inventory.currentAnimal){
                soundManager.play("Place_object");
                processAnimal(cakecake.currentGridContainer,inventory.currentAnimal);
                inventory.currentAnimal = null;
            }
        }
//        runtimeData.destructionRound++;
//        if(runtimeData.destructionRound >= 6){
//            cakecake.gridElements[5][5].toolAnimation.setCurrentAnimation("wait");
//            cakecake.gridElements[5][5].toolAnimation.stop = false;
//        }
    }

})();

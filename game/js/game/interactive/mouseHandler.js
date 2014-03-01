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
        gameTools.removeTargetTweenArr(frozen.targetTweens);
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
        frozen.currentGridContainer = frozen.gridElements[p.row][p.col];
        //检测,如果是动物（障碍物），则不检测
        if(inventory.currentPlant){
            console.log(inventory.currentPlant);
            var statisticsResultArr = [];
            ai.analyseResult(frozen.currentGridContainer,inventory.currentPlant,statisticsResultArr);
            ai.checkTest(statisticsResultArr);
        }else if(inventory.currentUniversal){
            useUniversal(frozen.currentGridContainer,inventory.currentUniversal,true);
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
            gameTools.removeTargetTweenArr(frozen.targetTweens);
            return;
        }
        if(!frozen.currentGridContainer || (frozen.currentGridContainer.col == p.col && frozen.currentGridContainer.row == p.row)){
            return;
        }
        //修改提示框位置
        //修改currentPlant属性
        frozen.currentGridContainer = frozen.gridElements[p.row][p.col];
        frozen.tipContainer.x = p.x;
        frozen.tipContainer.y = p.y;
        //检测
        if(inventory.currentPlant){
            var statisticsResultArr = [];
            ai.analyseResult(frozen.currentGridContainer,inventory.currentPlant,statisticsResultArr);
            ai.checkTest(statisticsResultArr);
        }else if(inventory.currentUniversal){
            useUniversal(frozen.currentGridContainer,inventory.currentUniversal,true);
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
            frozen.currentGridContainer = frozen.gridElements[p.row][p.col];
            //记录前一个位置
            frozen.prePosition.row = frozen.currentGridContainer.row;
            frozen.prePosition.col = frozen.currentGridContainer.col;
            processGloves(frozen.currentGridContainer,inventory.currentGloves);
            inventory.currentGloves = null;
            return;
        }
        //收金币
        var plant = frozen.gridElements[p.row][p.col].plant;
        if(plant && (plant.level == 500 || plant.level == 501)){
            onCoins(plant,p);
            return;
        }
        if(inventory.currentUniversal){
            if(!gameTools.isEmpty(p.row, p.col)){
                return;
            }
            soundManager.play("Place_object");
            frozen.currentGridContainer = frozen.gridElements[p.row][p.col];
            useUniversal(frozen.currentGridContainer,inventory.currentUniversal);
            inventory.currentUniversal = null;
        }else{
            if(!gameTools.isEmpty(p.row, p.col)){
                return;
            }
            //检测
            frozen.currentGridContainer = frozen.gridElements[p.row][p.col];
            //记录前一个位置
            frozen.prePosition.row = frozen.currentGridContainer.row;
            frozen.prePosition.col = frozen.currentGridContainer.col;
            if(inventory.currentPlant){
                soundManager.play("Place_object");
//                console.log("level   :  "+inventory.currentPlant.level);
                processPlant(frozen.currentGridContainer,inventory.currentPlant);
                inventory.currentPlant = null;
            }else if(inventory.currentAnimal){
                soundManager.play("Place_object");
                processAnimal(frozen.currentGridContainer,inventory.currentAnimal);
                inventory.currentAnimal = null;
            }
        }
//        runtimeData.destructionRound++;
//        if(runtimeData.destructionRound >= 6){
//            frozen.gridElements[5][5].toolAnimation.setCurrentAnimation("wait");
//            frozen.gridElements[5][5].toolAnimation.stop = false;
//        }
    }

})();

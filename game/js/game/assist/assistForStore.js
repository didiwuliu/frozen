/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-23
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */
this.assistForStore = this.assistForStore || {};
(function(){
    this.assistForStore.buyPlant = function(level){

        if(level >= 100 && level <= 108){
            //common cake
            inventory.resetCurrent();
            gameTools.removeTip();
            gameTools.removeTargetTweenArr(cakecake.targetTweens);

            inventory.currentPlant = new Plant(level);
            gameTools.drawTip(inventory.currentPlant,map.getNextPosition());
        }else if(level == 400){
            //Gloves
            inventory.resetCurrent();
            gameTools.removeTip();
            gameTools.removeTargetTweenArr(cakecake.targetTweens);

            inventory.currentGloves = new Plant(level);
            gameTools.drawTip(inventory.currentGloves);
        }else if(level == 300){
            //pastryTools
            inventory.resetCurrent();
            gameTools.removeTip();
            gameTools.removeTargetTweenArr(cakecake.targetTweens);
//////////////////////////////
//            inventory.currentAnimal = new Animal(true);
//            gameTools.drawTip(inventory.currentAnimal,p);
//return
            inventory.currentUniversal = new Plant(level);
            gameTools.drawTip(inventory.currentUniversal);
        }

    }
})()
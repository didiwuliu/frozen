/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午12:09
 * To change this template use File | Settings | File Templates.
 */
function onStorageCell(){
    soundManager.play("storage_switch");
    var grid = cakecake.gridElements[0][0];
    var tempPrevious;
    var tempCurrent;
    var typePrevious;
    var typeCurrent;
    //取出预存的尔值
    if(inventory.previousPlant){
        typePrevious = "plant";
        tempPrevious = inventory.previousPlant;
    }else if(inventory.previousAnimal){
        typePrevious = "animal";
        tempPrevious = inventory.previousAnimal;
    }else if(inventory.previousGloves){
        typePrevious = "gloves";
        tempPrevious = inventory.previousGloves;
    }else if(inventory.previousUniversal){
        typePrevious = "universal";
        tempPrevious = inventory.previousUniversal;
    }else{
        //如果没有预存的值，则去预测框内的值；
        typePrevious = "forecast";
    }
    inventory.resetPrevious();
//取出current值
    if(inventory.currentPlant){
        typeCurrent = "plant";
        tempCurrent = inventory.currentPlant;
    }else if(inventory.currentAnimal){
        typeCurrent = "animal";
        tempCurrent = inventory.currentAnimal;
    }else if(inventory.currentGloves){
        typeCurrent = "gloves";
        tempCurrent = inventory.currentGloves;
    }else if(inventory.currentUniversal){
        typeCurrent = "universal";
        tempCurrent = inventory.currentUniversal;
    }
    inventory.resetCurrent();
    //根据current设置storage cell 的显示
    //值
    if(typeCurrent == "plant"){
        inventory.previousPlant = tempCurrent;
    }else if(typeCurrent == "animal"){
        inventory.previousAnimal = tempCurrent;
    }else if( typeCurrent == "gloves"){
        inventory.previousGloves = tempCurrent;
    }else if( typeCurrent == "universal"){
        inventory.previousUniversal = tempCurrent;
    }
    //显示,删除上一次存放的物品
    for(var i = 0;i<grid.animationLayer.childList.length;i++){
        var child = grid.animationLayer.childList[i];
        if(child.type == "LAnimation"){
            grid.animationLayer.childList.splice(i,1);
        }
    }
    if(typeCurrent == "plant"){
        var plant = inventory.previousPlant;
        grid.animationLayer.addChild(plant.animation);
    }else if(typeCurrent == "animal"){
        grid.animationLayer.addChild(inventory.previousAnimal.animation);
    }else if(typeCurrent == "gloves"){
        grid.animationLayer.addChild(inventory.previousGloves.animation);
    }else if(typeCurrent == "universal"){
        var plant = inventory.previousUniversal;
        grid.animationLayer.addChild(plant.animation);
    }

    gameTools.removeTargetTweenArr(cakecake.targetTweens);
    gameTools.removeTip();

    //值互换，先清空所有值
    if(typePrevious == "plant"){
        inventory.currentPlant = tempPrevious;
    }else if(typePrevious == "animal"){
        inventory.currentAnimal = tempPrevious;
    }else if( typePrevious == "gloves"){
        inventory.currentGloves = tempPrevious;
    }else if( typePrevious == "universal"){
        inventory.currentUniversal = tempPrevious;
    }else if(typePrevious == "forecast" && (runtimeData.currentMode != "mode5" || tutorialManager.finished || tutorialManager.tutorialItem.type == 5)){
        //在gameTools.addForecastPlant内，为inventory.current*赋值
        gameTools.addForecastPlant();
        return;//不需要后面处理inventory.current*,已经在gameTools.addForecastPlant内处理
    }

    var p = map.getNextPosition();
    //tutorial模式
    if(runtimeData.currentMode == "mode5" && !tutorialManager.finished && tutorialManager.tutorialItem.type != 5){
        gameTools.goon(4);
        return;
    }
    //设置cakecake.tipContainer的显示
    if(typePrevious == "plant"){
        gameTools.drawTip(inventory.currentPlant,p);
    }else if(typePrevious == "animal"){
//        gameTools.drawAnimationTip(inventory.currentAnimal,p);
        gameTools.drawTip(inventory.currentAnimal,p);
    }else if(typePrevious == "gloves"){
        gameTools.drawTip(inventory.currentGloves,p);
    }else if(typePrevious == "universal"){
        gameTools.drawTip(inventory.currentUniversal,p);
    }
}
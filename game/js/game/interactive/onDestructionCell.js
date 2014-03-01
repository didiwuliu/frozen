/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午12:09
 * To change this template use File | Settings | File Templates.
 */
function onDestructionCell(){
    //6回合后，可使用destruction功能
//    if(runtimeData.destructionRound<6){
//        return;
//    }
    soundManager.play("purchase_with_coins");
    if(runtimeData.currentMode != "mode5" || tutorialManager.finished){
        if(userInfo.coins < runtimeData.destructionCost){
            alert(string.currentString.s181);
            return;
        }
        userInfo.coins -= runtimeData.destructionCost;
        userProfile.saveCoinsInfo();
    }
    runtimeData.destructionCost = parseInt(runtimeData.destructionCost +10*assistantHandler.destructionCostRatio);
    if(typeof runtimeData.destructionCost != "number" ){
        alert("垃圾桶金币出错")
    }
    if(runtimeData.destructionCost>99){
        runtimeData.destructionCost = 99;
    }
    gameUI.destructionCost.text = runtimeData.destructionCost;
    inventory.resetCurrent();
    gameTools.removeTip();
    cakecake.gridElements[5][5].toolAnimation.stop = false;
    cakecake.gridElements[5][5].toolAnimation.setCurrentAnimation("del");
    cakecake.gridElements[5][5].toolAnimation.loop = false;
    cakecake.gridElements[5][5].toolAnimation.playTime = 3;
    cakecake.gridElements[5][5].toolAnimation.setComplete(function(){
        this.setCurrentAnimation("wait");
    });
//    runtimeData.destructionRound = 0;
    if(runtimeData.currentMode == "mode5" && !tutorialManager.finished){
        cakecake.tipContainer.y = 3*mapConfig.gridHeight+mapConfig.offsetTop;
        cakecake.tipContainer.x = 4*mapConfig.gridWidth+mapConfig.offsetLeft;
        gameTools.goon(3);
        return;
    }
    gameTools.addForecastPlant();
}
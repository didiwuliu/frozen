/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午12:07
 * To change this template use File | Settings | File Templates.
 */
function processGloves(currentGridContainer,currentGloves){
    if(gameTools.isAnimal(currentGridContainer.row,currentGridContainer.col)){
        soundManager.play("trap_hamster");
        var score;
        if(currentGridContainer.animal.superAnimal){
            achievement.finishAchievement("achievement_novice_004");
            score = assistantHandler.config.trapSuperHamster;
        }else{
            achievement.finishAchievement("achievement_novice_003");
            score = assistantHandler.config.trapHamster;
        }
        if(assistantHandler.trapHamsterGetScore){
            runtimeData.grantedScore(score);
        }
        currentGridContainer.animationLayer.removeAllChild();
        currentGridContainer.animal = null;

        //默认添加的物体为Plant(200)；
        var plant = new Plant(200);
        gameTools.removeTip();
        gameTools.drawTip(plant);
        //runtimeData.trapedHamster += 1;
        runtimeData.trappedHamsterCount(1);
        processPlant(cakecake.currentGridContainer,plant);

    }else{
        if(currentGridContainer.plant.level){
            var levelObject = gameConfig.gameObjects["level_"+currentGridContainer.plant.level];
            runtimeData.grantedScore(-levelObject.point);
        }
        soundManager.play("remove_object");
        currentGridContainer.clearGrid();
        gameTools.goon(5);
    }
}
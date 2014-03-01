/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-15
 * Time: 下午9:57
 * To change this template use File | Settings | File Templates.
 */
function onCoins(plant,p){
    soundManager.play("coinbag");
    //成就
    if(plant.level == 500){achievement.finishAchievement("achievement_adventurer_001")}
    else if(plant.level == 501){achievement.finishAchievement("achievement_adventurer_002")}
    var levelObject = gameConfig.gameObjects["level_"+plant.level];
    runtimeData.grantedCoins(levelObject.coins);
    //添加收金币的特效，与合成特效一样。
    var animationArr = [{name:"animation",imageArr:assetsData.effectAnimation.game_openCoinBag.coin.rectsData}];
    var animation = LAnimation.getAnimation(assetsData.effectAnimation.game_openCoinBag.image,animationArr,"animation",4,false);
    animation.setfps(3);
    animation.x = -76;animation.y = -103;
    animation.playOnce();
    var grid = cakecake.gridElements[p.row][p.col];
    animation.setComplete(function(){
        grid.decorateLayer.removeAllChild();
        grid.clearGrid();
    });
    grid.decorateLayer.addChild(animation);
}
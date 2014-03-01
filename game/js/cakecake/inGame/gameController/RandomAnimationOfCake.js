/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-12
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */

this.runtimeData.cakeAnimationStart = function(){
    runtimeData.cakeAnimationTimer  = new LTimer(4,
        function(){
            for(var i = 0; i < mapConfig.row; i++){
                for(var j = 0; j < mapConfig.col; j++){
                    var probability = Math.random();
                    if(probability > 0.4)continue;
                    var gridContainer = cakecake.gridElements[i][j];
                    if(gridContainer.animal){
                        if(gridContainer.animal.superAnimal){
                            var animation = gridContainer.animal.animation;
                            if(!animation.stop && animation.currentAnimationName != "Sstand"){
                                return;
                            }
                            var index = parseInt(util.getRandom(0,6));
                            var name = animation.animations[index].name;
                            if(name.indexOf("smoke") >= 0)
                                name = "Sstand";
                            animation.setCurrentAnimation(name);
                            animation.playOnce("Sstand");
                        }else{
                            var animation = gridContainer.animal.animation;
                            if(!animation.stop && animation.currentAnimationName != "stand"){
                                return;
                            }
                            var index = parseInt(util.getRandom(0,4));
                            var name = animation.animations[index].name;
                            if(name == "mousedel")name = animation.animations[4].name;
                            animation.setCurrentAnimation(name);
                            animation.playOnce("stand");
                        }
                    }else if(gridContainer.plant){
                        var animation = gridContainer.plant.animation;
                        animation.playOnce();
                    }

                }
            }
        },null,null)
    runtimeData.cakeAnimationTimer.start();
    runtimeData.cakeAnimationTimer = null;
};
this.runtimeData.cakeAnimationStop = function(){
    runtimeData.cakeAnimationTimer.stop();
};
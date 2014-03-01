/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午9:27
 * To change this template use File | Settings | File Templates.
 */
function Animal(superAnimal){
    this.superAnimal = superAnimal;
    //animation
    this.animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_hamster.image,null));

    if(superAnimal){
        this.animation.setAnimation(Animal.getSuperAnimationData());
        this.setCurrentAnimation("stand");
        this.animation.setCurrentFrame(7);
    }else{
        this.animation.setAnimation(Animal.getNormalAnimationData());
        this.setCurrentAnimation("stand");
    }
    this.animation.setfps(3);
    this.animation.stop = true;
    this.animation.loop = false;
    this.animation.y = -21;
    //方向
    var a = parseInt(util.getRandom(0,3));
    var d = ["right","left","down","up"];
    this.direction = d[a];
};
Animal.prototype.stand = function(state){
    this.setCurrentAnimation("stand");
    this.animation.stop = false;
    this.animation.loop = true;
};
Animal.prototype.setCurrentAnimation = function(state){
    if(this.superAnimal){
        this.animation.setCurrentAnimation("S"+state);
        //the width of smokeout in superHamster is 146,but other width is 120,so ,modify the position,to make sure the image is in center
//        if(state == "smokeout"){
//            this.animation.x = -200;
//        }else{
//            this.animation.x = 0;
//        }
    } else{
        this.animation.setCurrentAnimation(state);
    }

};

Animal.prototype.walk = function(begignGrid,endGrid){
    if(this.superAnimal){
        this.setCurrentAnimation("smokein");//老鼠消失的动画
        this.animation.setfps(1);
        this.animation.loop = false;
        this.animation.stop = false;
        this.animation.addFrameFunction(6,this,function(grid){
                //添加烟雾
                var animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_superMouse.image,null));
                var imageArr = assetsData.effectAnimation.game_superMouse.supermouse.rectsData;

                animation.setAnimation([{name:"smoke",imageArr:imageArr}]);
                animation.setCurrentAnimation("smoke");
                animation.stop = false;
                animation.loop = false;
                animation.x = -100;
                animation.y = -100;
                animation.setfps(2);
                grid.addDecorate(animation);
            },[begignGrid]
        )
        this.animation.setComplete(
            function(){
                this.visible = false;
                endGrid.animationLayer.x = endGrid.x;
                endGrid.animationLayer.y = endGrid.y;
                runtimeData.animalWalkComplete++;

                //间隔0.4秒出现
                LTimer.waitToDo(0.2,function(){
                    //0.4秒后，先添加烟
                    var animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_superMouse.image,null));
                    var imageArr = assetsData.effectAnimation.game_superMouse.supermouse.rectsData;

                    animation.setAnimation([{name:"smoke",imageArr:imageArr}]);
                    animation.setCurrentAnimation("smoke");
                    animation.stop = false;
                    animation.setfps(2);
                    animation.loop = false;
                    animation.x = -100;
                    animation.y = -100;
                    endGrid.addDecorate(animation);
                    //第二帧后，添加老鼠动画
                    animation.addFrameFunction(2,this,function(){
                        this.setCurrentAnimation("Ssmokeout");
                        this.playOnce();
//                        endGrid.animationLayer.x = endGrid.x;
//                        endGrid.animationLayer.y = endGrid.y;
                        this.visible = true;
                        this.setComplete(
                            function(){
                                this.setCurrentAnimation("Sstand");
                                this.loop = false;this.stop = true;
                                this.setCurrentFrame(7);
                            }
                        );
                    },null)
                },this);
            }
        )
    }else{
        //走路放屁
        var animation = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_mouseWalk.image,null));
        var rects = assetsData.effectAnimation.game_mouseWalk.mousewalk.rectsData;
        var animData = [{name:"mousewalk",imageArr:rects}];
        animation.setAnimation(animData);
        animation.setCurrentAnimation("mousewalk");
        animation.stop = false;
        animation.setfps(1);
        animation.loop = false;
        animation.centerX = animation.centerY = 60;
        animation.x = 20;
        animation.y = 42;

        endGrid.addBackDecorate(animation);


        if(begignGrid.row > endGrid.row){
//            animation.rotate = Math.PI/2;
//            animation.y = 90;
            this.animation.setCurrentAnimation("walkback");
            this.animation.loop = true;
            this.animation.stop = false;
        }else if(begignGrid.row < endGrid.row){
            this.animation.setCurrentAnimation("walkface");
            this.animation.loop = true;
            this.animation.stop = false;
        }else if(begignGrid.col > endGrid.col){
            this.animation.setCurrentAnimation("walkleft");
            animation.x = 40;
            this.animation.loop = true;
            this.animation.stop = false;
        }else{
            this.animation.setCurrentAnimation("walkright");
            this.animation.loop = true;
            this.animation.stop = false;
        }
    }

};
Animal.prototype.destroy = function(){
    this.animation.destroy();
    this.animation = null;

};
Animal.getSuperAnimationData = function(){
    if(!Animal.superAnimationData){
        var animationData = [];
        for(var key in assetsData.effectAnimation.game_hamster){
            if(key == "image")continue;
            if(key[0]!= "S")continue;
            var obj = {name:key,imageArr:assetsData.effectAnimation.game_hamster[key].rectsData};
            animationData.push(obj);
        }
        Animal.superAnimationData = animationData;
    }
    return Animal.superAnimationData;
}
Animal.getNormalAnimationData = function(){
    if(!Animal.normalAnimationData){
        var animationData = [];
        for(var key in assetsData.effectAnimation.game_hamster){
            if(key == "image")continue;
            if(key[0] == "S")continue;
            var obj = {name:key,imageArr:assetsData.effectAnimation.game_hamster[key].rectsData};
            animationData.push(obj);
        }
        Animal.normalAnimationData = animationData;
    }
    return Animal.normalAnimationData;
}

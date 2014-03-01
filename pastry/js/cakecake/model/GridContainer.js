/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-2
 * Time: 下午9:49
 * To change this template use File | Settings | File Templates.
 */
function GridContainer(row,col) {
    //backDecorateLayer添加到animationLayer上，而decorateLayer不是，所以以后要优化
    this.backgroundLayer = new LSprite();
    this.backDecorateLayer = new LSprite();
    this.animationLayer = new LSprite();
    this.decorateLayer = new LSprite();
    cakecake.gameGridBg.addChild(this.backgroundLayer);
    cakecake.animationLayer.addChild(this.animationLayer,true);
    cakecake.animationLayer.addChild(this.backDecorateLayer,true);
    cakecake.animationLayer.addChild(this.decorateLayer);
    this.row = row;
    this.col = col;
    this.backgroundLayer.y = this.animationLayer.y = this.decorateLayer.y = this.y = this.row*mapConfig.gridHeight+mapConfig.offsetTop;
    this.backgroundLayer.x = this.animationLayer.x = this.decorateLayer.x = this.x = this.col*mapConfig.gridWidth+mapConfig.offsetLeft;

    this.setPlant = function(plant,dontProcessScope){
        this.animationLayer.removeAllChild();
        this.animal = null;
        this.plant = plant;
        this.animationLayer.addChild(plant.animation);
        //cakecake.frontContext.drawImage(plant.data.image,plant.data.sourceRect.x,plant.data.sourceRect.y,mapConfig.gridWidth,mapConfig.gridHeight,this.x,this.y,mapConfig.gridWidth,mapConfig.gridHeight);
        //设置背景
        this.setBg(assetsData.gridBg.rectsData[0]);
        this.setRoundGridsBg(this.row,this.col);
        //根据dontProcessScope，确定是否计算并处理动物是否走投无路
        //设成true时，用于动物被堵死时，把动物变成墓碑，但不用处理分割区域
        if(!dontProcessScope){
            var scopes = aiAnimal.statisticsScopes(this);
//            console.log("scopes");
//            console.log(scopes);
            aiAnimal.processScops(scopes);
        }
        if(plant.level ==200){
            //添加被抓烟雾
            var animation  = new LAnimation(new LBitmapData(assetsData.effectAnimation.game_mouseTraped.image,null));
            var animationArr = assetsData.effectAnimation.game_mouseTraped.mouseTraped.rectsData;
            animation.setAnimation([{name:"mouseTraped",imageArr:animationArr}]);
            animation.setCurrentAnimation("mouseTraped");
            animation.stop = false;
            animation.loop = false;
            animation.setfps(1);
            animation.x = -15;
            animation.y = -205;
            this.addDecorate(animation);
        }
    }
    this.setAnimal = function(animal){
        // this.clearFront();
        // this.hideAnimation();
        this.animationLayer.addChild(animal.animation);
        this.plant = null;
        this.animal = animal;
    }
    this.addDecorate = function(animation){
//        console.log("添加烟雾");
        var self = this;
        animation.setComplete(function(){
//            console.log(animation.currentFrame);
            self.decorateLayer.removeAllChild();
        });
        this.decorateLayer.addChild(animation);
    }
    this.addBackDecorate = function(animation){
        var self = this;
        animation.setComplete(function(){
            console.log(animation.currentFrame);
            self.backDecorateLayer.removeAllChild();
        });
        this.backDecorateLayer.addChild(animation);
    }
    this.setBg = function(bp){//bp,地图某格的起点坐标
//        cakecake.bgContext2.clearRect(this.x,this.y-mapConfig.clipTop,mapConfig.gridWidth,mapConfig.gridHeight);
//        cakecake.bgContext2.drawImage(assetsData.gridBg.image,bp.x,bp.y,mapConfig.gridWidth,mapConfig.gridHeight,this.x,this.y-mapConfig.clipTop,mapConfig.gridWidth,mapConfig.gridHeight);

        this.backgroundLayer.removeAllChild();

        var bpd = new LBitmapData(assetsData.gridBg.image,{x:bp.x,y:bp.y,w:mapConfig.gridWidth,h:mapConfig.gridHeight});
        var bp = new LBitmap(bpd);
        this.backgroundLayer.addChild(bp);
    }
    this.setRoundGridsBg = function(row,col){
        setOwnBg(row-1,col);//上
        setOwnBg(row-1,col-1);//左上
        setOwnBg(row-1,col+1);//右上

        setOwnBg(row+1,col);//下
        setOwnBg(row+1,col-1);//左下
        setOwnBg(row+1,col+1);//右下

        setOwnBg(row,col-1);//左
        setOwnBg(row,col+1);//右

    }
    this.clearGrid = function(){
        if(this.plant){
            this.plant.destroy();
            this.plant = null;
        }
        if(this.animal){
            this.animal.destroy();
            this.animal = null;
        }
        this.animationLayer.removeAllChild();

        setOwnBg(this.row,this.col);
        this.setRoundGridsBg(row,col);
    }
}
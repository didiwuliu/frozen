/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-1
 * Time: 下午12:17
 * To change this template use File | Settings | File Templates.
 */
this.assetsData = this.assetsData || {};
((function(){
    this.assetsData.onGameEffectLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData.effectAnimation){
            assetsData.effectAnimation = {};
        }
        if(!assetsData.effectAnimation["game_"+id]){
            assetsData.effectAnimation["game_"+id] = {};
        }

        assetsData.effectAnimation["game_"+id].image = image;

        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
//  {name:"run",imageArr:[{x:1,y:2,width:100,height:100},{x:1,y:2,width:100,height:100}]},
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n
            var pEnd = sprite.n.lastIndexOf("_");
            var assetName = sprite.n.slice(0,pEnd);
            if(!assetsData.effectAnimation["game_"+id][assetName]){
                assetsData.effectAnimation["game_"+id][assetName] = {};
                assetsData.effectAnimation["game_"+id][assetName].rectsData = [];
            }
            assetsData.effectAnimation["game_"+id][assetName].rectsData.push(sprite);
            //assetsData.superHamster["smokein"].push(new LRectangle(sprite.x,sprite.y,sprite.w,sprite.h));
        }
        assetsData.handleGameComplete();
    };
    this.assetsData.onMenuEffectLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData.effectAnimation){
            assetsData.effectAnimation = {};
        }
        if(!assetsData.effectAnimation["menu_"+id]){
            assetsData.effectAnimation["menu_"+id] = {};
        }
        assetsData.effectAnimation["menu_"+id].image = image;

        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n
            if(!sprite){
                "";
            }
            var pEnd = sprite.n.lastIndexOf("_");
            var assetName = sprite.n.slice(0,pEnd);

            if(!assetsData.effectAnimation["menu_"+id][assetName]){
                assetsData.effectAnimation["menu_"+id][assetName] = {};
                assetsData.effectAnimation["menu_"+id][assetName].rectsData = [];
            }
            assetsData.effectAnimation["menu_"+id][assetName].rectsData.push(sprite);
        }
        assetsData.handleMenuComplete();
    };
    this.assetsData.onGotoMenuEffectLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData.effectAnimation){
            assetsData.effectAnimation = {};
        }
        if(!assetsData.effectAnimation["menu_"+id]){
            assetsData.effectAnimation["menu_"+id] = {};
        }
        assetsData.effectAnimation["menu_"+id].image = image;

        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n
            if(!sprite){
                "";
            }
            var pEnd = sprite.n.lastIndexOf("_");
            var assetName = sprite.n.slice(0,pEnd);

            if(!assetsData.effectAnimation["menu_"+id][assetName]){
                assetsData.effectAnimation["menu_"+id][assetName] = {};
                assetsData.effectAnimation["menu_"+id][assetName].rectsData = [];
            }
            assetsData.effectAnimation["menu_"+id][assetName].rectsData.push(sprite);
        }
        assetsData.handleGotoMenuComplete();
    };
    this.assetsData.onResultEffectLoaded = function(event,imageData){
        var rectangles = imageData.rectangles;
        var image = event.currentTarget;
        var id = imageData.id;

        if(!assetsData.effectAnimation){
            assetsData.effectAnimation = {};
        }
        if(!assetsData.effectAnimation["result_"+id]){
            assetsData.effectAnimation["result_"+id] = {};
        }

        assetsData.effectAnimation["result_"+id].image = image;

        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
//  {name:"run",imageArr:[{x:1,y:2,width:100,height:100},{x:1,y:2,width:100,height:100}]},
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n
            var pEnd = sprite.n.lastIndexOf("_");
            var assetName = sprite.n.slice(0,pEnd);
            if(!assetsData.effectAnimation["result_"+id][assetName]){
                assetsData.effectAnimation["result_"+id][assetName] = {};
                assetsData.effectAnimation["result_"+id][assetName].rectsData = [];
            }
            assetsData.effectAnimation["result_"+id][assetName].rectsData.push(sprite);
            //assetsData.superHamster["smokein"].push(new LRectangle(sprite.x,sprite.y,sprite.w,sprite.h));
        }
        assetsData.handleResultComplete();
    };
})())


/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-8
 * Time: 上午9:54
 * To change this template use File | Settings | File Templates.
 */
function LoadingPanel(){
    LSprite.call(this);
    //背景
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.bg)
    var bp = new LBitmap(bpd);
    this.addChild(bp);

    //背景光
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.bg_light)
    var bp = new LBitmap(bpd);
    bp.y = 332;
    this.addChild(bp);

    //瓶子背景
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.bottle_bg);
    var bp = new LBitmap(bpd);
    bp.x = 182;
    bp.y = 576;
    this.addChild(bp);
    //name_bg
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.name_bg);
    var bp = new LBitmap(bpd);
    bp.x = 36;
    bp.y = 100;
    this.addChild(bp);
    //蛋糕背景光
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.light);
    var bp = new LBitmap(bpd);
    bp.x = 236;
    bp.y = 82;
    this.addChild(bp);
    //name
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.text);
    var bp = new LBitmap(bpd);
    bp.x = 81;
    bp.y = 128;
    this.addChild(bp);
    //瓶子内容
    this.bottleContent = new LSprite();
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.loading_progress_bar);
    var bp = new LBitmap(bpd);
    this.bottleContent.addChild(bp);
    this.bottleContent.x = 182;
    this.bottleContent.y = 576;
    this.addChild(this.bottleContent);
    this.bottleContent.viewPort = new LRectangle(0,317,305,317);
    this.progressTween = LGlobal.TweenLite.to(this.bottleContent.viewPort,11000,{y:317/6});
    //瓶子
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.bottle_top);
    var bp = new LBitmap(bpd);
    bp.x = 159;
    bp.y = 514;
    this.addChild(bp);
    //瓶盖
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.bottle_cap);
    this.bottleCap = new LBitmap(bpd);
    this.bottleCap.x = 284;
    this.bottleCap.y = 492;
    this.addChild(this.bottleCap);
    this.count = 0;
    //老鼠
    var bpd = new LBitmapData(assetsData.loading.image,assetsData.loading.superHamster);
    this.hamster = new LBitmap(bpd);
    this.hamster.x = 266;
    this.hamster.y = 415;
    this.addChild(this.hamster);
    this.count = 0;

}
LoadingPanel.prototype = Object.create(LSprite.prototype);
LoadingPanel.prototype.setProgress = function(persent){

    if(persent >=1){
        LGlobal.TweenLite.removeTween(this.progressTween);
        LGlobal.TweenLite.to(gameUI.loadingPanle.bottleContent.viewPort,200,{y:0,onComplete:function(){
                //添加动画：
                LGlobal.TweenLite.to(gameUI.loadingPanle.bottleCap,850,{x:640,onComplete:gameUI.loadingPanle.destroy});
                LGlobal.TweenLite.to(gameUI.loadingPanle.bottleCap,850,{y:280,onComplete:main,ease:Back.easeOut});

                LGlobal.TweenLite.to(gameUI.loadingPanle.hamster,650,{x:-120});
                LGlobal.TweenLite.to(gameUI.loadingPanle.hamster,650,{y:230,ease:Back.easeOut});
          }
        });
    }
}
LoadingPanel.prototype.destroy = function(){
    gameUI.panelLayer.removeChild(gameUI.loadingPanle);
    gameUI.loadingPanle.removeAllChild();
    gameUI.loadingPanle = null;
    //清理资源
    util.destroyImage(assetsData.loading.image);
    delete assetsData.loading;
    delete assetsData.loadingData;
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-9-3
 * Time: 下午5:45
 * To change this template use File | Settings | File Templates.
 */
this.tutorialManager = this.tutorialManager || {};
(function(){
    tutorialManager.finished = true;//记录本次tutorial旅程是否完成，区别于userProfile.finishTutorial（记录用户是否完成过新手指导）
    this.tutorialManager.start = function(){
        //achievement.finishAchievement("achievement_novice_001");
        userProfile.finishTutorial = true;
        userProfile.saveTutorialInfo(true);
        //数据：gameConfig.tutorialItems
        gameUI.addTutorialMask();

        //box
        tutorialManager.finished = false;
        tutorialManager.dialogBox = new TutorialDialogBox(420,400);
        gameUI.tutorialLayer.addChild(tutorialManager.dialogBox);
        tutorialManager.dialogBox.y = (mapConfig.height-tutorialManager.dialogBox.height)/2;
        tutorialManager.dialogBox.x = (mapConfig.width-tutorialManager.dialogBox.width)/2;
        tutorialManager.dialogBox.visible = false;

        //tip
        tutorialManager.dialogTip = new DialogTip();
        tutorialManager.dialogTip.visible = false;
        gameUI.tutorialLayer.addChild(tutorialManager.dialogTip);

        tutorialManager.tutorialIndex = 0;
    }
    this.tutorialManager.stop = function(){
        tutorialManager.finished = true;

        gameUI.tutorialLayer.removeChild(tutorialManager.dialogBox);
        tutorialManager.dialogBox = null;
        gameUI.tutorialLayer.removeChild(tutorialManager.dialogTip);
        tutorialManager.dialogTip = null;

        gameUI.tutorialLayer.removeChild(tutorialManager.arrow);
        tutorialManager.arrow = null;
        gameUI.tutorialLayer.removeChild(tutorialManager.lightBorder);
        tutorialManager.lightBorder = null;

        gameUI.removeTutorialMask();

        LGlobal.TweenLite.removeTween(tutorialManager.arrownTween);
        tutorialManager.arrownTween = null;

    }
    this.tutorialManager.processTutorial = function(tutorialItem){
        if(gameUI.tutorialMask && !gameUI.tutorialMask.visible){
            gameUI.tutorialMask.visible = true;
        }

        console.log("++");
        tutorialManager.tutorialIndex++;
        tutorialManager.tutorialItem = tutorialItem;
        //如果计划的格子被占用，启用备用格子
        var useBack;
        if(tutorialItem.back_p){
            if(tutorialItem.level == 400){
                useBack = gameTools.isPlant(tutorialItem.p.row,tutorialItem.p.col);
            }else {
                useBack = !gameTools.isEmpty(tutorialItem.p.row,tutorialItem.p.col);
            }

        }

        tutorialManager.showArrowBorder(tutorialItem,useBack);

        //放置物体
        if(tutorialItem.type == 1){
            if(tutorialItem.text){
                tutorialManager.dialogTip.setData(tutorialItem);
                tutorialManager.dialogTip.visible = true;
            }else{
                tutorialManager.dialogTip.visible = false;
            }

            if(tutorialItem.level >= 100 && tutorialItem.level <= 108){
                inventory.currentPlant = new Plant(tutorialItem.level);
                gameTools.drawTip(inventory.currentPlant,tutorialItem.p);
            }else if(tutorialItem.level == 300){
                inventory.currentUniversal = new Plant(tutorialItem.level);
                gameTools.drawTip(inventory.currentUniversal,gameTools.getRandomEmptyGrid());

                //自由模式。隐藏遮罩，箭头，框等
                tutorialManager.arrow.visible = false;
                tutorialManager.lightBorder.visible = false;
                tutorialManager.dialogTip.visible = false;
                tutorialManager.dialogBox.visible = false;
                gameUI.tutorialMask.visible = false;
            }else if(tutorialItem.level == 400){
                inventory.currentGloves = new Plant(tutorialItem.level);
                var p ;
                if(useBack){
                    p = tutorialItem.back_p;
                }else{
                    p = tutorialItem.p;
                }
                gameTools.drawTip(inventory.currentGloves,p);
            }else if(tutorialItem.level == "hamster"){
                inventory.currentAnimal = new Animal();
                gameTools.drawTip(inventory.currentAnimal,tutorialItem.p);
            }else if(tutorialItem.level == "superHamster"){
                inventory.currentAnimal = new Animal(true);
                var p ;
                if(useBack){
                    p = tutorialItem.back_p;
                }else{
                    p = tutorialItem.p;
                }
                gameTools.drawTip(inventory.currentAnimal,p);
            }

            tutorialManager.dialogBox.visible = false;
        }else if(tutorialItem.type == 2){
            tutorialManager.dialogBox.setData(tutorialItem.text);

            tutorialManager.dialogBox.visible = true;
            tutorialManager.dialogTip.visible = false;
        }else if(tutorialItem.type == 3){
            tutorialManager.dialogTip.setData(tutorialItem);
            if(tutorialItem.level >= 100 && tutorialItem.level <= 108){
                inventory.currentPlant = new Plant(tutorialItem.level);
                gameTools.drawTip(inventory.currentPlant,tutorialItem.ap);
            }else if(tutorialItem.level == 300){
                inventory.currentUniversal = new Plant(tutorialItem.level);
                gameTools.drawTip(inventory.currentUniversal,tutorialItem.p);
                cakecake.gridElements[0][0].animationLayer.removeChildAt(1);
            }
            tutorialManager.dialogTip.visible = true;
            tutorialManager.dialogBox.visible = false;
        }else if(tutorialItem.type == 4){
            tutorialManager.dialogTip.setData(tutorialItem);
            tutorialManager.dialogBox.visible = false;
        }
        else if(tutorialItem.type == 5){

            gameTools.addForecastPlant();
            //自由模式。隐藏遮罩，箭头，框等
            tutorialManager.arrow.visible = false;
            tutorialManager.lightBorder.visible = false;
            tutorialManager.dialogTip.visible = false;
            tutorialManager.dialogBox.visible = false;
            gameUI.tutorialMask.visible = false;
        }
    }
    this.tutorialManager.showArrowBorder = function(tutorialItem,useBack){
        if(useBack){
            var arrowData = tutorialItem.back_arrowData;
            var borderData = tutorialItem.back_borderData;
        }else{
            var arrowData = tutorialItem.arrowData;
            var borderData = tutorialItem.borderData;
        }
        if(!this.arrow){
            var bpd = new LBitmapData(assetsData.public.image,assetsData.public.newbie_guide_arrow);
            var bp = new LBitmap(bpd);

            this.arrownTween = LGlobal.TweenLite.to(bp,500,{y:30,yoyo:true});
            this.arrow = new LSprite();
            this.arrow.addChild(bp);
            gameUI.tutorialLayer.addChild(this.arrow);
        }
        if(!this.lightBorder){
            var bpd = new LBitmapData(assetsData.public.image,assetsData.public.newbie_guide_light);
            var bp = new LBitmap(bpd);
            bp.penetrate = true;
            this.lightBorder = new LSprite();
            this.lightBorder.addChild(bp);
            this.lightBorder.centerX = 10;//10,border外边框空白边
            this.lightBorder.centerY = 10;
            gameUI.tutorialLayer.addChild(this.lightBorder);
        }
        this.arrow.visible = false;
        this.lightBorder.visible = false;
        gameUI.tutorialMask.setHollow(null);
        if(arrowData){
            this.arrow.x = arrowData.x+mapConfig.offsetLeft-this.lightBorder.centerX;//25,border外边框空白边
            this.arrow.y = arrowData.y+mapConfig.offsetTop-this.lightBorder.centerY;
            this.arrow.rotate = arrowData.rotate;
            this.arrow.visible = true;
        }
        if(borderData){
            this.lightBorder.x = borderData.x+ mapConfig.offsetLeft-this.lightBorder.centerX+6;
            this.lightBorder.y = borderData.y+ mapConfig.offsetTop-this.lightBorder.centerY;
            this.lightBorder.scaleX = borderData.scaleX;
            this.lightBorder.scaleY = borderData.scaleY;
            gameUI.tutorialMask.setHollow(new LRectangle(this.lightBorder.x+10,this.lightBorder.y+10,80*borderData.scaleX,80*borderData.scaleY));//264-25-25 = 214
            this.lightBorder.visible = true;
        }
    }
    //箭头、框、tip、box、背景升到最顶层。
    this.tutorialManager.toTop = function(){
        gameUI.tutorialLayer.jumpToTop();
    }
})()

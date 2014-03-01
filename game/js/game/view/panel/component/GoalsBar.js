/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-6
 * Time: 下午2:34
 * To change this template use File | Settings | File Templates.
 */
function GoalsBar(){
    LSprite.call(this);
    this.x = 176;
    this.y = 181;
    this.totalScore = 0;
    //the container,it is convenient to set viewport
    this.scoreBarContainer = new LSprite();
    this.addChild(this.scoreBarContainer);
    this.scoreBarContainer.viewPort = new LRectangle(0,0,5,15);
    //content bitmap
    var bpd = new LBitmapData(assetsData.game.image,assetsData.game.top_coin);
    var bp = new LBitmap(bpd);
    this.scoreBarContainer.addChild(bp);

    //the background border
    var bpd = new LBitmapData(assetsData.game.image,assetsData.game.top_up_bg);
    var bp = new LBitmap(bpd);
    bp.x = 5;bp.y = 5;
    this.addChild(bp);

    this.goalIconContainer = new LSprite();
    this.addChild(this.goalIconContainer);
    this.goalIconContainer.x = 357+24;
    this.goalIconContainer.y = 14-5;


    //reward
    this.reward = new LTextField();
    this.reward.text = 9999;
    this.reward.color = "#000000";
    this.reward.x = 400;
    this.reward.y = 3;
    this.reward.textAlign = "center";
    this.addChild(this.reward);
    this.reward.size = 25;

}
GoalsBar.prototype = Object.create(LSprite.prototype);
GoalsBar.prototype.setGoal = function(score){
    this.goal = score;
    this.totalScore = 0;
}
GoalsBar.prototype.setGoalIndex = function(index){
    this.goalIndex = index;
    this.trappedCount = 0;
}
GoalsBar.prototype.setMode1Progress = function(score){
    if(score<=0)return 0 ;
    var rewardScore = 0;
    if(!this.goal)
    {
        this.goal = runtimeData.goal[0].score;
    }

    this.totalScore  += score;
    var rate = this.totalScore/this.goal;
    this.scoreBarContainer.viewPort.width = (rate>1?1:rate)*437;

    if(this.totalScore>=this.goal){
        //reward
        rewardScore = runtimeData.goal[0].scoreReward;
        //arrive new goal
        if(runtimeData.goal.length >1){
            runtimeData.goal.shift();
        }
        this.goal = runtimeData.goal[0].score;
        this.totalScore = 0;
        this.reward.text = runtimeData.goal[0].scoreReward;

        this.scoreBarContainer.viewPort.width = 1;
    }

    return rewardScore;
}
GoalsBar.prototype.setMode4Progress = function(trappedCount){
    if(trappedCount<=0)return 0 ;
    var rewardCoins = 0;

    this.trappedCount  += trappedCount;
    var rate = this.trappedCount/6;
    this.scoreBarContainer.viewPort.width = (rate>1?1:rate)*437;

    if(this.trappedCount>=6){
        //reward
        rewardCoins = gameConfig.goals.mode4[this.goalIndex].coinReward;
        if(this.goalIndex < gameConfig.goals.mode4.length-1){
            this.goalIndex++;
        }
        this.trappedCount = 0;
        this.reward.text = gameConfig.goals.mode4[this.goalIndex].coinReward;

        this.scoreBarContainer.viewPort.width = 1;
    }

    return rewardCoins;
}
GoalsBar.prototype.setData = function(goal,mode){
    if(mode == "mode1" || mode == "mode5"){
        this.reward.text = goal[0].scoreReward;
        this.goal = runtimeData.goal[0].score;

        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_score_icon_inGoal);
        var bp = new LBitmap(bpd);
        this.goalIconContainer.addChild(bp);
    }else if(mode == "mode4"){
        this.trappedCount = 0;
        this.reward.text = gameConfig.goals.mode4[0].coinReward;
        this.goalIndex = 0;

//        this.reward.x += 10;
        var bpd = new LBitmapData(assetsData.public.image,assetsData.public.top_coin_icon_inGoal);
        var bp = new LBitmap(bpd);
        this.goalIconContainer.addChild(bp);
    }
}
GoalsBar.prototype.destroy = function(){
   this.removeAllChild();
}
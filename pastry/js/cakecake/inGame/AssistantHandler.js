/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-25
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */
this.assistantHandler = this.assistantHandler || {};
(function(){
    this.assistantHandler.config = {
        trapHamster:5,
        trapSuperHamster:25
    }
    assistantHandler.destructionCostRatio = 1;//
    this.assistantHandler.reset = function(){
        //垃圾桶付费比例
        assistantHandler.destructionCostRatio = 1;//
        //开始有小房子
        assistantHandler.startWithSmallShop = false;//
        //去掉前30回合老鼠
        assistantHandler.cancelHamsterIn30 = false;//
        //合并时，另外得分（+10%，合并得分的+10%）
        assistantHandler.combinedWithScore = false;//
        //老鼠概率减少50%
        assistantHandler.reduceHamsterRatio = false;//
        //老鼠出现加倍
        assistantHandler.twoTwiceHamster = false;//
        //抓住老鼠得分
        assistantHandler.trapHamsterGetScore = false;//
        //小蛋糕概率加倍
        assistantHandler.twoTwiceSmallCake = false;//
        //开始有大蛋糕
        assistantHandler.startWithBigCake= false;//
        //每20秒加分
        assistantHandler.addScore20S= false;//
        //时间模式添加5秒
        assistantHandler.addMore5s= false;//
        //每15回合，加一回合
        assistantHandler.add1TEvery15= false;//
        //每10回合，加分,加当前分的2%
        assistantHandler.addScoreEvery10T= false;//

    }
    this.assistantHandler.setAssistantHandlerData = function(assistantItems){
        //模式限制，已经在可见部分有所限制，所以在此不用再限制了。
        for(var key in assistantItems){
            var item = assistantItems[key];
            switch(item.data.id){
                case "001":
                    assistantHandler.destructionCostRatio = 0.5;
                    runtimeData.destructionCost = gameConfig.destructionCost*0.5;
//                    gameUI.destructionCost.text = runtimeData.destructionCost;
                    break;
                case "002":
                    assistantHandler.startWithSmallShop = true;
                    break;
                case "003":
                    assistantHandler.cancelHamsterIn30 = true;
                    break;
                case "004":
                    assistantHandler.combinedWithScore = true;
                    break;
                case "005":
                    assistantHandler.reduceHamsterRatio = true;
                    break;
                case "006":
                    assistantHandler.twoTwiceHamster = true;
                    break;
                case "007":
                    assistantHandler.trapHamsterGetScore = true;
                    break;
                case "008":
                    assistantHandler.twoTwiceSmallCake = true;
                    break;
                case "009":
                    assistantHandler.startWithBigCake= true;
                    break;
                case "010":
                    assistantHandler.addScore20S= true;
                    break;
                case "011":
                    assistantHandler.addMore5s= true;
                    break;
                case "012":
                    assistantHandler.add1TEvery15= true;
                    break;
                case "013":
                    assistantHandler.addScoreEvery10T= true;
                    break;
            }
        }
    }
})();
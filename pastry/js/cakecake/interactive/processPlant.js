/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
function processPlant(currentGridContainer,currentPlant){
    var statisticsResultArr = [];
    ai.analyseResult(currentGridContainer,currentPlant,statisticsResultArr);
    ai.doCheck(statisticsResultArr,currentGridContainer,currentPlant);
}
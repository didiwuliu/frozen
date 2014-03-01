var cakecake = {
    isDebug: true,
    gridElements:[],

    bgCanvas:null,
    bgCanvas2:null,
    gameCanvas:null,
    uiCanvas:null,

    bgContext:null,
    bgContext2:null,
    frontContext:null,
    animationLayer:null,

    isMouseDown:false,
    tipContainer:null,//提示框的容器
    forecastTipContainer:null,
    combineTipContainer:null,
    combineResultTipContainer:null,
    currentGridContainer:null,//将要放下的元素
    prePosition:{},//前一个放下的位置，用于预测下一个位置
    targetTweens:[],//存储向目标移动的tween
    shakeTweens:[],//存储提示框缩放的tween
    downButtons:[]//按下的按钮；用于取消按下效果
};
var inventory = {
    //当前值
    currentPlant:null,
    currentAnimal:null,
    currentGloves:null,
    currentUniversal:null,//pastrytool，具有tripletown中的钻石的作用,通用的，
    //用于storageCell，表示存储的值。命名有问题
    previousPlant:null,
    previousAnimal:null,
    previousGloves:null,
    previousUniversal:null,
    //将要出现的物体
    forecastPlant:null,
    forecastAnimal:null,
    forecastGloves:null,
    forecastUniversal:null,

    resetCurrent:function(){
        this.currentPlant = null;
        this.currentAnimal = null;
        this.currentGloves = null;
        this.currentUniversal = null;
    },
    resetForecast:function(){
        this.forecastPlant = null;
        this.forecastAnimal = null;
        this.forecastGloves = null;
        this.forecastUniversal = null;
    },
    resetPrevious:function(){
        this.previousPlant = null;
        this.previousAnimal = null;
        this.previousGloves = null;
        this.previousUniversal = null;
    }
}
var openArr = [];//用于寻找下一个空格
var closeArr = [];//用于寻找下一个空格
var initializeGame = false;



function main(){
    //初始化
    map.initBg();//初始化游戏背景，只是加一张图片
    //modePanel,settingPanel
    gameUI.initStarEffectInGame();
    gameUI.initMenuUI();
    gameUI.initTipContainer();

    //dailyRewardPanel
    if(userInfo.login.firstToday && userInfo.login.successiveLoginTime >=2){
//    if(true){
        visibleManager.showPanel("dailyReward");
    }else if(!userProfile.finishTutorial){
       gameUI.modePanel.openPractice();
//        visibleManager.gotoMode(true);
        util.destroyDailyCakeResource();
    }else{
        visibleManager.gotoMode(true);
        util.destroyDailyCakeResource();
    }
};

window.addEventListener("load",assetsData.loadLoadingAssets);

function focus2(){
    log("focus2.....");
    var lastTimeMark = timeCountDown.getLastTimeMark();
    log("lastTimeMark:  "+lastTimeMark);
    if(!lastTimeMark){
        return;
    }
    lastTimeMark = parseInt(lastTimeMark);

    var now = (new Date()).getTime();
    log("now         :  "+now);
    var interval = (now - lastTimeMark)/1000;
    interval = interval>4500?4500:interval;
    log("interval         :  "+interval);
    while(interval>0){
        timeCountDown.onSecond(true);
        interval--;
    }
}
function blur2(){
    log("blur2.....");
    localStorage.setItem("timeCountDown.modesTime",JSON.stringify(timeCountDown.modesTime));
    timeCountDown.setTimeMark();
}

function focus(){
    log("focus.....");
    if(soundManager.currentMusic){
        soundManager.play(soundManager.currentMusic.id,soundManager.currentMusic.loop);
    }
}
function blur(){
    log("blur.....");
    if(gameTools.inGame()){
        if(gameUI.pauseBtn && gameUI.pauseBtn.isMouseEnable && !gameTools.inPause()){
            gameTools.onPause();
        }
    }
    if(soundManager.currentMusic){
        soundManager.pause(soundManager.currentMusic.id,true);
    }
}

window.onfocus = focus2;
window.onblur = blur2;

if(CocoonJS.App.nativeExtensionObjectAvailable){
    CocoonJS.App.onActivated.addEventListener(focus);
    CocoonJS.App.onSuspended.addEventListener(blur);
    CocoonJS.App.onActivated.addEventListener(focus2);
    CocoonJS.App.onSuspended.addEventListener(blur2);
}
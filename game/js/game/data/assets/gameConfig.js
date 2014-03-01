/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-7-23
 * Time: 下午6:07
 * To change this template use File | Settings | File Templates.
 */
var mapConfig = {
    row : 6,
    col : 6,
    gridWidth : 100,
    gridHeight : 100,
    width:640,
    height:960,
    offsetTop : 0,
    offsetLeft : 0,
    clipTop : 0,
    clipBottom:0,
    thinLineThickness: 5,
    initializeCount:{min:11,max:16}
//    getOriginalPoint:function(){
//        return{x:this.offsetLeft,y:this.offsetTop - this.clipTop};
//    }
};


this.gameConfig = this.gameConfig || {};
((function(){
    this.gameConfig.dailyReward = [50,100,200,400,1000];
    //模式参数配置文件
    this.gameConfig.modeConfig = {
        mode1:{count:100,recoverTime:15,maxRecoverRound:5,unlimited:true},
        mode2:{count:5,recoverTime:15,maxRecoverRound:5,unlimited:false},
        mode3:{count:5,recoverTime:15,maxRecoverRound:5,unlimited:false},
        mode4:{count:5,recoverTime:15,maxRecoverRound:5,unlimited:false}
    };
    //初始coins
    this.gameConfig.originCoins = 20000;
    //限时模式时间
    this.gameConfig.roundTime = 60;
    this.gameConfig.totalRound =300;
    this.gameConfig.destructionCost =20;
    //物体出现的概率参数
    this.gameConfig.commonModeProbability = {
       wheat:61,
       wheatFlour:15,
       bread:2,
       smallcake:0.5,
       hamster:15,
       superhamster:1.5,
       pastrytools:2.5,
       gloves: 2.5
    };
    this.gameConfig.hamsterModeProbability = {
        wheat:54,
        wheatFlour:13,
        bread:2,
        smallcake:0.5,
        hamster:23,
        superhamster:2.5,//2
        pastrytools:2.5,
        gloves: 2.5
    };
    //商店items，special，coins的配置文件
    this.gameConfig.items = [
        {name:{name:"s0011"},level:100,price:35,picName:"it01",type:"items",notes:{name:"s001"}},
        {name:{name:"s0012"},level:101,price:105,picName:"it02",type:"items",notes:{name:"s002"}},
        {name:{name:"s0013"},level:102,price:260,picName:"it03",type:"items",notes:{name:"s003"}},
        {name:{name:"s0014"},level:103,price:650,picName:"it04",type:"items",notes:{name:"s004"}},
        //Undo:{name:"Undo",price:50,picName:"it05",type:"items",notes:"Undoes the last movement, points are restored to the previous value as well, coins are restored if the user opened a bag for the undo action."},
        //Switch:{name:"Switch",price:1500,picName:"it06",type:"items",notes:"Interchanges two objects in the board"},
        {name:{name:"s0015"},level:400,price:750,picName:"it07",type:"items",notes:{name:"s005"}},
        {name:{name:"s0016"},level:300,price:1000,picName:"it08",type:"items",notes:{name:"s006"}}
        // Pastrytools2:{name:"Pastrytools",level:300,price:1000,picName:"it08",type:"items",notes:"Object to use is changed to pastry tools"}
        //Hamsternet:{name:"Hamsternet",price:375,picName:"it09",type:"items",notes:"Object used exclusively for trapping hamsters, if no hamster is in the place, it will remain until a hamster is trapped (or the user removes it with the gloves)"},
        //Automill:{name:"Automill",price:1300,picName:"it10",type:"items",notes:"Causes that all wheat is changed to flour in a single shot. Points granted are only for obtaining flour"},
        //Blender:{name:"Blender",price:850,picName:"it11",type:"items",notes:"Randomly switches all objects in the game area"}
    ]
    this.gameConfig.stringOfShare = {
        FB_DR_title_01:{name:"s160"},
        FB_DR_title_02:{name:"s161"},
        FB_DR_body_01:{name:"s162"},
        FB_DR_body_02:{name:"s163"},
        FB_DR_body_03:{name:"s164"},
        FB_DR_body_04:{name:"s165"},

        FB_Level_title_01:{name:"s166"},
        FB_Level_title_02:{name:"s167"},
        FB_Level_title_03:{name:"s168"},
        FB_Level_title_04:{name:"s169"},
        FB_Level_body_01:{name:"s170"},
        FB_Level_body_02:{name:"s171"},
        FB_Level_body_03:{name:"s172"},

        FB_Achievement_title_01:{name:"s173"},
        FB_Achievement_title_02:{name:"s174"},
        FB_Achievement_title_03:{name:"s175"},
        FB_Achievement_body_01:{name:"s176"},
        FB_general_body_01:{name:"s177"}
    };
    this.gameConfig.products =[
        "coins2500.com.wozlla.cakeandcake",
        "coins5000.com.wozlla.cakeandcake",
        "coins10000.com.wozlla.cakeandcake",
        "coins20000.com.wozlla.cakeandcake",
        "coins40000.com.wozlla.cakeandcake",
        "coins100000.com.wozlla.cakeandcake",

        "Mode1Unlimited.com.wozlla.cakeandcake",
        "Mode2Unlimited.com.wozlla.cakeandcake",
        "Mode3Unlimited.com.wozlla.cakeandcake",
        "Mode4Unlimited.com.wozlla.cakeandcake",
        "AllUnlimited.com.wozlla.cakeandcake"
    ];
    this.gameConfig.specials = {
        mode2_5:{mode:"mode2",name:{name:"s007"},picName:"sp04",price:10000,type:"specials",notes:""},
        mode2_Unlimited:{mode:"mode2",name:{name:"s008"},productId:gameConfig.products[7],picName:"sp03",price:"AU$ 0.99",type:"specials",notes:"Can change to 1AU"},
        mode3_5:{mode:"mode3",name:{name:"s009"},picName:"sp06",price:10000,type:"specials",notes:""},
        mode3_Unlimited:{mode:"mode3",name:{name:"s010"},productId:gameConfig.products[8],picName:"sp05",price:"AU$ 0.99",type:"specials",notes:"Can change to 1AU"},
        mode4_5:{mode:"mode4",name:{name:"s011"},picName:"sp08",price:10000,type:"specials",notes:""},
        mode4_Unlimited:{mode:"mode4",name:{name:"s012"},productId:gameConfig.products[9],picName:"sp07",price:"AU$ 0.99",type:"specials",notes:"Can change to 1AU"},
        Unlimited:{mode:"all",name:{name:"s013"},price:"AU$ 2.99",productId:gameConfig.products[10],picName:"sp09",type:"specials",notes:"Can change to 3AU"}
    }
    this.gameConfig.coins = {
        Pocket:{name:{name:"s014"},productId:gameConfig.products[0],price:0.99,coins:"2500",picName:"c01",type:"coins",notes:"2,500 coins"},
        SmallSatchel:{name:{name:"s015"},productId:gameConfig.products[1],price:1.99,coins:"5000",picName:"c02",type:"coins",notes:"2,500 coins"},
        LargeSatchel:{name:{name:"s016"},productId:gameConfig.products[2],price:2.99,coins:"10000",picName:"c03",type:"coins",notes:"2,500 coins"},
        SmallSack:{name:{name:"s017"},productId:gameConfig.products[3],price:4.49,coins:"20000",picName:"c04",type:"coins",notes:"2,500 coins"},
        LargeSack:{name:{name:"s018"},productId:gameConfig.products[4],price:5.49,coins:"40000",picName:"c05",type:"coins",notes:"2,500 coins"},
        DeluxeSack:{name:{name:"s019"},productId:gameConfig.products[5],price:6.49,coins:"100000",picName:"c06",type:"coins",notes:"2,500 coins"}
    }
    //Objects in the board when starting the game
    this.gameConfig.originalQuantity = [{min:5,max:10},{min:0,max:2},{min:0,max:2},{min:0,max:2},{min:0,max:2},{min:0,max:2},{min:0,max:2}];
    this.gameConfig.gameObjects =
    {
        //蛋糕,grantedSecond合并时，奖励的秒数（模式2）
        level_100:{name:"Wheat",level:100,point:1,combo:10,rewardCoins:100,grantedSecond:1},
        level_101:{name:"WheatFlour",level:101,point:5,combo:50,rewardCoins:150,grantedSecond:2},
        level_102:{name:"Bread",level:102,point:25,combo:250,rewardCoins:210,grantedSecond:4},
        level_103:{name:"SmallCake",level:103,point:150,combo:1500,rewardCoins:280,grantedSecond:8},
        level_104:{name:"LargeCake",level:104,point:750,combo:7500,rewardCoins:360,grantedSecond:12},
        level_105:{name:"SpecialtyCake",level:105,point:4000,combo:40000,rewardCoins:450,grantedSecond:15},
        level_106:{name:"SmallCakeBusiness",level:106,point:20000,combo:200000,rewardCoins:550,grantedSecond:20},
        level_107:{name:"LargeCakeShop",level:107,point:100000,combo:1000000,rewardCoins:660,grantedSecond:25},
        level_108:{name:"DeluxeCakeShop",level:108,point:500000,rewardCoins:780,grantedSecond:30},
        //老鼠
        level_200:{name:"TrappedHamster",level:200,point:0,combo:0},
        level_201:{name:"SetOfTraps",level:201,point:1000,combo:10000},
        level_202:{name:"AntiHamsterDefense",level:202,point:5000,combo:50000},
        //生锈的工具
        level_301:{name:"RustyTools",level:301,point:0,combo:10000},
        //金币
        level_500:{name:"BagOfCoins",level:500,point:0,coins:100},
        level_501:{name:"LargeBagOfCoins",level:501,point:0,coins:500}
    }
    this.gameConfig.achievements =
    {
        achievement_novice_001:{id:"AchNo01.cakeandcake.wozlla.com",key:"achievement_novice_001",icon:"no01",name:{name:"s020"},description:{name:"s052"}},
        achievement_novice_002:{id:"AchNo02.cakeandcake.wozlla.com",key:"achievement_novice_002",icon:"no02",name:{name:"s021"},description:{name:"s053"}},
        achievement_novice_003:{id:"AchNo03.cakeandcake.wozlla.com",key:"achievement_novice_003",icon:"no03",name:{name:"s022"},description:{name:"s054"}},
        achievement_novice_004:{id:"AchNo04.cakeandcake.wozlla.com",key:"achievement_novice_004",icon:"no04",name:{name:"s023"},description:{name:"s055"}},
        achievement_novice_005:{id:"AchNo05.cakeandcake.wozlla.com",key:"achievement_novice_005",icon:"no05",name:{name:"s024"},description:{name:"s056"}},
        achievement_novice_006:{id:"AchNo06.cakeandcake.wozlla.com",key:"achievement_novice_006",icon:"no06",name:{name:"s025"},description:{name:"s057"}},
        achievement_novice_007:{id:"AchNo07.cakeandcake.wozlla.com",key:"achievement_novice_007",icon:"no07",name:{name:"s026"},description:{name:"s058"}},
        achievement_novice_008:{id:"AchNo08.cakeandcake.wozlla.com",key:"achievement_novice_008",icon:"no08",name:{name:"s027"},description:{name:"s059"}},
        achievement_novice_009:{id:"AchNo09.cakeandcake.wozlla.com",key:"achievement_novice_009",icon:"no09",name:{name:"s028"},description:{name:"s060"}},
        achievement_novice_010:{id:"AchNo10.cakeandcake.wozlla.com",key:"achievement_novice_010",icon:"no10",name:{name:"s029"},description:{name:"s061"}},

        achievement_adventurer_001:{id:"AchAd01.cakeandcake.wozlla.com",key:"achievement_adventurer_001",icon:"ad02",name:{name:"s030"},description:{name:"s062"}},
        achievement_adventurer_002:{id:"AchAd02.cakeandcake.wozlla.com",key:"achievement_adventurer_002",icon:"ad03",name:{name:"s031"},description:{name:"s063"}},
        achievement_adventurer_003:{id:"AchAd03.cakeandcake.wozlla.com",key:"achievement_adventurer_003",icon:"ad04",name:{name:"s032"},description:{name:"s064"}},
        achievement_adventurer_004:{id:"AchAd04.cakeandcake.wozlla.com",key:"achievement_adventurer_004",icon:"ad05",name:{name:"s033"},description:{name:"s065"}},
        achievement_adventurer_005:{id:"AchAd05.cakeandcake.wozlla.com",key:"achievement_adventurer_005",icon:"ad06",name:{name:"s034"},description:{name:"s066"}},
        achievement_adventurer_006:{id:"AchAd06.cakeandcake.wozlla.com",key:"achievement_adventurer_006",icon:"ad07",name:{name:"s035"},description:{name:"s067"}},
        achievement_adventurer_007:{id:"AchAd07.cakeandcake.wozlla.com",key:"achievement_adventurer_007",icon:"ad08",name:{name:"s036"},description:{name:"s068"}},
        achievement_adventurer_008:{id:"AchAd08.cakeandcake.wozlla.com",key:"achievement_adventurer_008",icon:"ad01",name:{name:"s037"},description:{name:"s069"}},
        achievement_adventurer_009:{id:"AchAd09.cakeandcake.wozlla.com",key:"achievement_adventurer_009",icon:"ad09",name:{name:"s038"},description:{name:"s070"}},
        achievement_adventurer_010:{id:"AchAd10.cakeandcake.wozlla.com",key:"achievement_adventurer_010",icon:"ad10",name:{name:"s039"},description:{name:"s071"}},
        achievement_adventurer_011:{id:"AchAd11.cakeandcake.wozlla.com",key:"achievement_adventurer_011",icon:"ad11",name:{name:"s040"},description:{name:"s072"}},
        achievement_adventurer_012:{id:"AchAd12.cakeandcake.wozlla.com",key:"achievement_adventurer_012",icon:"ad12",name:{name:"s041"},description:{name:"s073"}},
        achievement_adventurer_013:{id:"AchAd13.cakeandcake.wozlla.com",key:"achievement_adventurer_013",icon:"ad13",name:{name:"s042"},description:{name:"s074"}},

        achievement_hardcore_001:{id:"AchHa01.cakeandcake.wozlla.com",key:"achievement_hardcore_001",icon:"ha01",name:{name:"s043"},description:{name:"s075"}},
        achievement_hardcore_002:{id:"AchHa02.cakeandcake.wozlla.com",key:"achievement_hardcore_002",icon:"ha02",name:{name:"s044"},description:{name:"s076"}},
        achievement_hardcore_003:{id:"AchHa03.cakeandcake.wozlla.com",key:"achievement_hardcore_003",icon:"ha03",name:{name:"s045"},description:{name:"s077"}},
        achievement_hardcore_004:{id:"AchHa04.cakeandcake.wozlla.com",key:"achievement_hardcore_004",icon:"ha04",name:{name:"s046"},description:{name:"s078"}},
        achievement_hardcore_005:{id:"AchHa05.cakeandcake.wozlla.com",key:"achievement_hardcore_005",icon:"ha05",name:{name:"s047"},description:{name:"s079"}},
        achievement_hardcore_006:{id:"AchHa06.cakeandcake.wozlla.com",key:"achievement_hardcore_006",icon:"ha06",name:{name:"s048"},description:{name:"s080"}},
        achievement_hardcore_007:{id:"AchHa07.cakeandcake.wozlla.com",key:"achievement_hardcore_007",icon:"ha07",name:{name:"s049"},description:{name:"s081"}},
        achievement_hardcore_008:{id:"AchHa08.cakeandcake.wozlla.com",key:"achievement_hardcore_008",icon:"ha08",name:{name:"s050"},description:{name:"s082"}},
        achievement_hardcore_009:{id:"AchHa09.cakeandcake.wozlla.com",key:"achievement_hardcore_009",icon:"ha09",name:{name:"s051"},description:{name:"s083"}}
    }
    this.gameConfig.modeIntroduction ={
        mode1:{introduction:{name:"s084"}},
        mode2:{introduction:{name:"s085"},unlockCondition:{name:"s088"}},
        mode3:{introduction:{name:"s086"},unlockCondition:{name:"s089"}},
        mode4:{introduction:{name:"s087"},unlockCondition:{name:"s090"}}
    }

    this.gameConfig.practiceMap =
    [
        [0,0,0,100,0,0],
        [100,200,0,100,101,100],
        [0,0,301,0,0,0],
        [0,101,0,100,100,0],
        [0,0,103,0,0,102],
        [100,100,0,100,0,0]
    ]
    this.gameConfig.goals = {
        mode1:[
            {score:500 ,scoreReward:50},//500
            {score:1000,scoreReward:150},//1000,150
            {score:2000 ,scoreReward:250},//2000
            {score:2000 ,scoreReward:350},
            {score:5000 ,scoreReward:600},
            {score:10000 ,scoreReward:800},
            {score:20000 ,scoreReward:1000},
            {score: 20000,scoreReward:1500},
            {score:50000 ,scoreReward:2000},
            {score:100000 ,scoreReward:2500},
            {score:200000 ,scoreReward:3500},
            {score:200000 ,scoreReward:4500},
            {score:500000 ,scoreReward:6000},
            {score:1000000 ,scoreReward:8000},
            {score:2000000 ,scoreReward:9999}
        ],
        mode4:[
            {index:1,coinReward:2},
            {index:2,coinReward:4},
            {index:3,coinReward:6},
            {index:4,coinReward:8},
            {index:5,coinReward:10},
            {index:6,coinReward:15},
            {index:7,coinReward:20},
            {index:8,coinReward:30},
            {index:9,coinReward:40},
            {index:10,coinReward:50},
            {index:11,coinReward:60},
            {index:12,coinReward:70},
            {index:13,coinReward:80},
            {index:14,coinReward:90},
            {index:15,coinReward:99}
        ]
    }
//arrowData:{rotate:Math.PI/2,x:300,y:300},borderData:{scaleX:0.6,scaleY:0.6,x:200,y:300}
    this.gameConfig.tutorialItems = [
        //tipData（tipposition）:提示文本的参数，p:鼠标点击的有效区,ap（appearposition）：表示在type3中蛋糕放置的位置，鼠标点击去仍然是p。
        //arrowData:{direction:"x"/"y",x:x,y:y}},箭头的方向，x坐标，y坐标。borderData:{scale:scale,x:x,y:y},亮框的缩放比例，xy坐标。
        //type：1，表示放置一个蛋糕，2，表示弹出一个提示面板，3，表示storage 和 destruction 功能，4，表示购买物品。
        {type:2,text:{name:"s091"}},
        {type:1,level:100,arrowData:{rotate:0,x:34,y:300},borderData:{scaleX:1.2,scaleY:1.2,x:-8,y:190},p:{row:2,col:0},tipData:{x:0,y:374},text:{name:"s092"}},
        {type:1,level:100,arrowData:{rotate:0,x:34,y:400},borderData:{scaleX:1.2,scaleY:1.2,x:-8,y:290},p:{row:3,col:0},tipData:{x:106,y:267},text:{name:"s093"}},
        {type:2,text:{name:"s094"}},
        {type:1,level:100,arrowData:{rotate:0,x:234,y:400},borderData:{scaleX:1.2,scaleY:1.2,x:192,y:290},p:{row:3,col:2},tipData:{x:54,y:30},text:{name:"s095"}},
        {type:1,level:100,arrowData:{rotate:Math.PI,x:304,y:540},borderData:{scaleX:1.2,scaleY:1.2,x:192,y:490},p:{row:5,col:2},tipData:{x:0,y:200},text:{name:"s096"}},
        {type:2,borderData:{scaleX:5.8,scaleY:0.7,x:127,y:-203},text:{name:"s097"}},
        {type:1,level:"hamster",arrowData:{rotate:0,x:534,y:100},borderData:{scaleX:1.2,scaleY:1.2,x:492,y:-10},p:{row:0,col:5},tipData:{x:177,y:158},text:{name:"s098"}},
        {type:1,level:100,arrowData:{rotate:0,x:534,y:100},borderData:{scaleX:1.2,scaleY:1.2,x:492,y:-10},p:{row:0,col:5},tipData:{x:187,y:158},text:{name:"s099"}},
        {type:1,level:"hamster",arrowData:{rotate:0,x:234,y:200},borderData:{scaleX:1.2,scaleY:1.2,x:192,y:90},p:{row:1,col:2},tipData:{x:55,y:281},text:{name:"s100"}},
        {type:1,level:"hamster",arrowData:{rotate:0,x:234,y:200},borderData:{scaleX:1.2,scaleY:1.2,x:192,y:90},p:{row:1,col:2},tipData:{x:55,y:281},text:{name:"s101"}},
        {type:1,level:101,arrowData:{rotate:0,x:234,y:200},borderData:{scaleX:1.2,scaleY:1.2,x:192,y:90},p:{row:1,col:2},tipData:{x:55,y:281},text:{name:"s102"}},
        {type:2,text:{name:"s103"}},
        {type:1,level:400,arrowData:{rotate:0,x:234,y:300},borderData:{scaleX:1.2,scaleY:1.2,x:192,y:190},p:{row:2,col:2},tipData:{x:72,y:396},text:{name:"s104"}},
        {type:1,level:"superHamster",arrowData:{rotate:0,x:534,y:300},back_arrowData:{rotate:0,x:434,y:300},borderData:{scaleX:1.2,scaleY:1.2,x:492,y:190},back_borderData:{scaleX:1.2,scaleY:1.2,x:392,y:190},p:{row:2,col:5},back_p:{row:2,col:4},tipData:{x:181,y:366},text:{name:"s105"}},
        {type:1,level:400,arrowData:{rotate:0,x:134,y:400},back_arrowData:{rotate:0,x:34,y:400},borderData:{scaleX:1.2,scaleY:1.2,x:92,y:290},back_borderData:{scaleX:1.2,scaleY:1.2,x:-8,y:290},p:{row:3,col:1},back_p:{row:3,col:0},tipData:{x:189,y:364},back_tipData:{x:104,y:364},text:{name:"s106"}},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:2,text:{name:"s107"}},
        {type:1,level:300},
        {type:2,text:{name:"s108"}},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        //storage  and  disposable
        {type:3,level:300,arrowData:{rotate:0,x:34,y:100},borderData:{scaleX:1.2,scaleY:1.2,x:-8,y:0},p:{row:0,col:0},ap:{row:2,col:5},tipData:{x:0,y:200},text:{name:"s109"}},
        {type:3,level:100,arrowData:{rotate:Math.PI,x:609,y:550},borderData:{scaleX:1.2,scaleY:1.2,x:492,y:502},p:{row:5,col:5},ap:{row:2,col:5},tipData:{x:42,y:376},text:{name:"s110"}},

        {type:2,borderData:{scaleX:1.5,scaleY:0.5,x:495,y:581},text:{name:"s111"}},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        {type:5},
        //store
        //p（-1，-1）为了让放置物体区无效
        {type:4,arrowData:{rotate:0,x:485,y:-42},borderData:{scaleX:2.8,scaleY:1.1,x:380,y:-142},p:{row:-1,col:-1},tipData:{x:182,y:30},text:{name:"s112"}},
        {type:4,arrowData:{rotate:0,x:136,y:167},borderData:{scaleX:0.92,scaleY:0.92,x:106,y:97},p:{row:-1,col:-1},tipData:{x:46,y:238},text:{name:"s113"}},
        {type:2,text:{name:"s114"}},

        {type:2,text:{name:"s115"}}
    ];
    this.gameConfig.ModeDescription = {
        mode1:{name:{name:"s116"},description:{name:"s120"}},
        mode2:{name:{name:"s117"},description:{name:"s121"}},
        mode3:{name:{name:"s118"},description:{name:"s122"}},
        mode4:{name:{name:"s119"},description:{name:"s123"}}
    }
    this.gameConfig.confirmText = {
        gotoMenu:{title:{name:"s124"},content:{name:"s127"}},
        restart:{title:{name:"s125"},content:{name:"s128"}},
        noStar:{title:{name:"s126"},content:{name:"s129"}}
    }
    this.gameConfig.leaderBorderTip = {
        mode1:{content:{name:"s130"}},
        mode2:{content:{name:"s131"}},
        mode3:{content:{name:"s132"}},
        mode4:{content:{name:"s133"}}
    }
    this.gameConfig.assistantItem = [
        {id:"001",title:{name:"s134"},description:{name:"s147"},price:100,icon:"as01",exceptMode:[]},
        {id:"002",title:{name:"s135"},description:{name:"s148"},price:1300,icon:"as02",exceptMode:[]},
        {id:"003",title:{name:"s136"},description:{name:"s149"},price:300,icon:"as03",exceptMode:["mode2","mode4"]},
        {id:"004",title:{name:"s137"},description:{name:"s150"},price:450,icon:"as04",exceptMode:[]},
        {id:"005",title:{name:"s138"},description:{name:"s151"},price:350,icon:"as05",exceptMode:["mode3","mode4"]},
        {id:"006",title:{name:"s139"},description:{name:"s152"},price:350,icon:"as06",exceptMode:["mode1","mode2","mode3"]},
        {id:"007",title:{name:"s140"},description:{name:"s153"},price:400,icon:"as07",exceptMode:["mode1","mode2","mode3"]},
        {id:"008",title:{name:"s141"},description:{name:"s154"},price:900,icon:"as08",exceptMode:[]},
        {id:"009",title:{name:"s142"},description:{name:"s155"},price:800,icon:"as09",exceptMode:[]},
        {id:"010",title:{name:"s143"},description:{name:"s156"},price:400,icon:"as10",exceptMode:["mode1","mode3","mode4"]},
        {id:"011",title:{name:"s144"},description:{name:"s157"},price:1300,icon:"as11",exceptMode:["mode1","mode3","mode4"]},
        {id:"012",title:{name:"s145"},description:{name:"s158"},price:1300,icon:"as12",exceptMode:["mode1","mode2","mode4"]},
        {id:"013",title:{name:"s146"},description:{name:"s159"},price:400,icon:"as13",exceptMode:["mode1","mode2","mode4"]}
    ]

})());

//\bs\d{3,4}\b
//\{name:"$0"\}

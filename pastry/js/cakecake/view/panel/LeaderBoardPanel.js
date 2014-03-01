/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-14
 * Time: 下午10:51
 * To change this template use File | Settings | File Templates.
 */
function LeaderBoardPanel(){
    CommonSubPanel.call(this);
    this.init();
    this.initContent();
}
LeaderBoardPanel.prototype = Object.create(CommonSubPanel.prototype);
LeaderBoardPanel.prototype.initContent = function(){
    //黑色背景框
    var bpd = new LBitmapData(assetsData.public.image,assetsData.public.message_bg);
    var bp = new L9ScaleBitmap(bpd,14,14,456-28,409-28);
    bp.y = 330;
    bp.x = 66;
    this.addChild(bp);
    //leaderboards文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.leaderboards);
    var bp = new LBitmap(bpd,"leaderboards");
    bp.setCP(293,75);
    this.addChild(bp);
    //localButton
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.local);
    var bp = new LBitmap(bpd,"local");
    bp.setCP(135,188);
    this.addChild(bp);

    //gameCenterButton
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.gamesenter);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.gamesenter_h);
    var bph = new LBitmap(bpdh);
    this.gameCenterBtn = new LButton(bp,function(){
        gamecenter.socialService.showLeaderboard();
        console.log("gameCenter");
    },this,bph,true);
    this.addChild(this.gameCenterBtn);
    this.gameCenterBtn.x = 262;
    this.gameCenterBtn.y = 151;

    this.modesBtn = [];
    //appetizer_express  mode1
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.patissier_life);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.patissier_life_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.modes_name1_text);
    var bpt = new LBitmap(bpdt,"modes_name1_text");
    bpt.scaleX = bpt.scaleY = 0.5;
    bpt.x = 30;
    bpt.y = 26;
    this.mode1Btn = new LButton(bp,function(){
        this.setData("mode1",0);
    },this,bph,false,"select",bpt);
    this.addChild(this.mode1Btn);
    this.mode1Btn.x = 65;
    this.mode1Btn.y = 250;
    this.modesBtn.push(this.mode1Btn);
    //appetizer_express  mode2
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.enpress_apptizer_life);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.enpress_apptizer_life_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.modes_name2_text);
    var bpt = new LBitmap(bpdt,"modes_name2_text");
    bpt.scaleX = bpt.scaleY = 0.5;
    bpt.x = 30;
    bpt.y = 26;
    this.mode2Btn = new LButton(bp,function(){
        this.setData("mode2",1);
    },this,bph,false,"select",bpt);
    this.addChild(this.mode2Btn);
    this.mode2Btn.x = 183;
    this.mode2Btn.y = 250;
    this.modesBtn.push(this.mode2Btn);
    //300delicacies  mode3
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.delicacies_300);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.delicacies_300_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.modes_name3_text);
    var bpt = new LBitmap(bpdt,"modes_name3_text");
    bpt.scaleX = bpt.scaleY = 0.5;
    bpt.x = 30;
    bpt.y = 26;
    this.mode3Btn = new LButton(bp,function(){
        this.setData("mode3",2);
    },this,bph,false,"select",bpt);
    this.addChild(this.mode3Btn);
    this.mode3Btn.x = 301;
    this.mode3Btn.y = 250;
    this.modesBtn.push(this.mode3Btn);
    //300delicacies  mode4
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.hamster_madnesslife);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.hamster_madnesslife_h);
    var bph = new LBitmap(bpdh);
    var bpdt = new LBitmapData(assetsData.text.image,assetsData.text.modes_name4_text);
    var bpt = new LBitmap(bpdt,"modes_name4_text");
    bpt.scaleX = bpt.scaleY = 0.5;
    bpt.x = 30;
    bpt.y = 26;
    this.mode4Btn = new LButton(bp,function(){
        this.setData("mode4",3);
    },this,bph,false,"select",bpt);
    this.addChild(this.mode4Btn);
    this.mode4Btn.x = 419;
    this.mode4Btn.y = 250;
    this.modesBtn.push(this.mode4Btn);
    //rankingListContainer
    this.rankingListContainer = new LSprite();
    this.rankingListContainer.x = 76;
    this.rankingListContainer.y = 358;
    this.addChild(this.rankingListContainer);

};
LeaderBoardPanel.prototype.onBack = function(event){
    event.stopGoOn = true;
//    gameUI.settingPanel.visible = true;
//    gameUI.leaderBoardPanel.visible = false;
//    gameUI.blackBg.visible = false;
    soundManager.play("cancel_back");
    visibleManager.hidePanel("leaderBorder");
    visibleManager.gotoMode(true);
}
LeaderBoardPanel.prototype.setData = function(mode,btnIndex){
    this.rankingListContainer.removeAllChild();
    var data = userInfo.gameResultLog[mode];
    if(data.length>0){
        var rankingList = new List(RankingItem,data,436,66);
        this.rankingListContainer.addChild(rankingList);
    }else{
        var textField = new LTextField();
        textField.x = 16;
        textField.y = 57;
        textField.setText(gameConfig.leaderBorderTip[mode].content);
        textField.color = "#99aa00";
        textField.size = 28;
        textField.width = 400;
        textField.gap = 8;
        textField.font_weight = "bold";
        this.rankingListContainer.addChild(textField);
    }
    for(var i = 0;i<4;i++){
        var btn = this.modesBtn[i];
        btn.setSelected(btnIndex == i);
    }


}
//LeaderBoardPanel.prototype.selectedMode = function(mode){
//    this.modesBtn;
//
//}
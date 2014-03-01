/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:12
 * To change this template use File | Settings | File Templates.
 */
function HelpPanel(parentName){
    CommonSubPanel.call(this);
    this.parentName = parentName;
    this.init();
    this.initContent();
}
HelpPanel.prototype = Object.create(CommonSubPanel.prototype);
HelpPanel.prototype.initContent = function(){
    // return;
//    help文字

    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.help_f);
    var bp = new LBitmap(bpd,"help_f");
    bp.setCP(292,79);
    this.addChild(bp);

    this.line.y = 151-33;

    this.currentPage = 0;
    this.helpsList = [];
    //help内容1
    this.help1List = new LSprite();
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help_page1);
    var bp = new LBitmap(bpd);
    this.help1List.addChild(bp);
    this.help1List.visible = false;
    this.help1List.x = 63
    this.help1List.y = 181;
    this.addChild(this.help1List);
    //help内容2
    this.help2List = new LSprite();
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help_page2);
    var bp = new LBitmap(bpd);
    this.help2List.addChild(bp);
    this.help2List.visible = false;
    this.help2List.x = 63;
    this.help2List.y = 181;
    this.addChild(this.help2List);
    //help内容3
    this.help3List = new LSprite();
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.help_page3);
    var bp = new LBitmap(bpd);
    this.help3List.addChild(bp);
    this.help3List.visible = false;
    this.help3List.x = 63;
    this.help3List.y = 181;
    this.addChild(this.help3List);
    this.helpsList.push(this.help1List,this.help2List,this.help3List);

    //翻页按钮
    this.leftBtn = new PageBtnLeft();
    this.addChild(this.leftBtn);
    this.leftBtn.x = 50;this.leftBtn.y = 708;
    this.leftBtn.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
        if(this.currentPage > 0){this.currentPage -= 1;this.setCurrentPage(this.currentPage);};
    },this);

    this.rightBtn = new PageBtnRight();
    this.rightBtn.x = 482;this.rightBtn.y = 708;
    this.addChild(this.rightBtn);
    this.rightBtn.addEventListener(LMouseEvent.MOUSE_DOWN,function(event){
        if(this.currentPage <2){this.currentPage +=1;this.setCurrentPage(this.currentPage);};
    },this);

    //翻页点
    this.pageNumberPoints = new PageNumber(3);
    this.pageNumberPoints.setCurrentPage(0);
    this.pageNumberPoints.x = 230;
    this.pageNumberPoints.y = 740;
    this.addChild(this.pageNumberPoints);

    this.setCurrentPage(0);
}
HelpPanel.prototype.setCurrentPage = function(currentPage){
    this.currentPage = currentPage;
    //选择list
    for(var i =0;i<this.helpsList.length;i++){
        if(i == currentPage){this.helpsList[i].visible = true}else{this.helpsList[i].visible = false;};
    }

    //选择pageBtn
    if(currentPage == 0){
        this.leftBtn.setEnable(false);
        this.rightBtn.setEnable(true);
    }else if(currentPage == 1){
        this.leftBtn.setEnable(true);
        this.rightBtn.setEnable(true);
    }else if(currentPage == 2){
        this.leftBtn.setEnable(true);
        this.rightBtn.setEnable(false);
    }
    //翻页点
    this.pageNumberPoints.setCurrentPage(currentPage);

}
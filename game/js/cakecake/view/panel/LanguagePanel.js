/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-1
 * Time: 下午6:45
 * To change this template use File | Settings | File Templates.
 */
function LanguagePanel(parentName){
    CommonSubPanel.call(this);
    this.parentName = parentName;
    this.init();
    this.initContent();
}
LanguagePanel.prototype = Object.create(CommonSubPanel.prototype);
LanguagePanel.prototype.initContent = function(){
    //language文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.language_f);
    var bp = new LBitmap(bpd,"language_f");
    bp.setCP(292,79);
    this.addChild(bp);

    //China
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.chinese);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.btn_h);
    var bph = new LBitmap(bpdh);
    bph.scaleX = bph.scaleY = 2;
    bph.x = bph.y = -30;
    var chineseButton = new LButton(bp,this.onFlag,this,bph,false,null);
    chineseButton.nationalFlag = "Chinese";
    chineseButton.x = 340;
    chineseButton.y = 262;
    this.addChild(chineseButton);
    //English
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.english);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.btn_h);
    var bph = new LBitmap(bpdh);
    bph.scaleX = bph.scaleY = 2;
    bph.x = bph.y = -30;
    var englishButton = new LButton(bp,this.onFlag,this,bph,false,null);
    englishButton.nationalFlag = "English";
    englishButton.x = 134;
    englishButton.y = 262;
    this.addChild(englishButton);
    //Spanish
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.spanish);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.btn_h);
    var bph = new LBitmap(bpdh);
    bph.scaleX = bph.scaleY = 2;
    bph.x = bph.y = -30;
    var spanishButton = new LButton(bp,this.onFlag,this,bph,false,null);
    spanishButton.nationalFlag = "Spanish";
    spanishButton.x = 134;
    spanishButton.y = 482;
    this.addChild(spanishButton);
    //French
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel.french);
    var bp = new LBitmap(bpd);
    var bpdh = new LBitmapData(assetsData.public.image,assetsData.public.btn_h);
    var bph = new LBitmap(bpdh);
    bph.scaleX = bph.scaleY = 2;
    bph.x = bph.y = -30;
    var frenchButton = new LButton(bp,this.onFlag,this,bph,false,null);
    frenchButton.nationalFlag = "French";
    frenchButton.x = 340;
    frenchButton.y = 482;
    this.addChild(frenchButton);

    this.buttons = [];
    this.buttons.push(chineseButton,frenchButton,chineseButton,englishButton);
    for(var i = 0;i<this.buttons.length;i++){
        if(this.buttons[i].nationalFlag == switchLanguage.currentLanguage){
            this.buttons[i].setSelected(true);
        }
    }
}
LanguagePanel.prototype.onFlag = function(event){
    event.stopGoOn = true;
//    console.log(event.clickTarget.nationalFlag);
    var flag = event.clickTarget.nationalFlag;
    event.clickTarget.setSelected(true);
    switchLanguage.switch(flag);

    for(var i = 0;i<this.buttons.length;i++){
        if(this.buttons[i] != event.clickTarget){
            this.buttons[i].setSelected(false);
        }
    }

}

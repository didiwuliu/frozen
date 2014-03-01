/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:27
 * To change this template use File | Settings | File Templates.
 */
function SocialItem(id,iconName,name,bgName,x,y,userInfo){
    LSprite.call(this);

    this.addEventListener(LMouseEvent.MOUSE_UP,this.onclick,this);
    this.id = id;
    //icon
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel[iconName]);
    var bp = new LBitmap(bpd);
    bp.y = 6;
    this.addChild(bp);
    //背景
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel[bgName]);
    this.bitmap = new LBitmap(bpd);
    this.bitmap.x = 69;
    this.addChild(this.bitmap);
    //按下效果
    var bpd = new LBitmapData(assetsData.commonPanel.image,assetsData.commonPanel["disabled"]);
    this.selectedBitmap = new LBitmap(bpd);
    this.selectedBitmap.x = 69;
    this.selectedBitmap.visible = false;
    this.addChild(this.selectedBitmap);

    this.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
        this.selectedBitmap.visible = true;
        this.bitmap.visible = false;
        cakecake.downButtons.push(this);
    },this);
//    this.addEventListener(LMouseEvent.MOUSE_UP,function(){
//        this.selectedBitmap.visible = false;
//        this.bitmap.visible = true;
//        for(var i = 0;i<cakecake.downButtons.length;i++){
//            if(cakecake.downButtons[i] == this){
//                cakecake.downButtons.splice(i,1);
//            }
//        }
//    },this);

    //文本
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text[name]);
    var bp = new LBitmap(bpd,name);
    bp.x = 60+x;
    bp.y = y;
    this.addChild(bp);

    //用户信息
    this.loginNameText = new LTextField();
    this.loginNameText.text = userInfo;
    this.loginNameText.size = "27";
    this.loginNameText.font = "Arial";
    this.loginNameText.color = "#007e62";
    this.loginNameText.x = 10;
    this.loginNameText.y = 85;
    this.addChild(this.loginNameText);

}
SocialItem.prototype = Object.create(LSprite.prototype);

SocialItem.prototype.onclick = function(){
    soundManager.play("select");
    if(this.id == "facebook"){
        facebook.setUserFaceBookName(this.loginNameText,"text");
    }else if(this.id == "gamecenter"){
        gamecenter.setUserGameCenterName(this.loginNameText,"text");
    }else if(this.id == "instagram"){
        alert(this.id);
    }else if(this.id == "twitter"){
        alert(this.id);
    }
}
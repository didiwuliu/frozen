/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午1:47
 * To change this template use File | Settings | File Templates.
 */
function LBitmapData(image,rect){
    //<sprite n="as05.png" x="965" y="149" w="58" h="58" oX="1" oY="1" oW="60" oH="60"/>
    var self = this;
    self.type = "LBitmapData";
    self.oncomplete = null;

    if(!image){
        console.log("image should not be null");
    }
    if(typeof rect === "undefined"){
        console.log("rect is undefined");
    }
    self.image = image;
    if(!rect)rect = {};
    self.x = parseInt(rect.x?rect.x:0);
    self.y = parseInt(rect.y?rect.y:0);
    self.width = parseInt(rect.w?rect.w:0);
    self.height = parseInt(rect.h?rect.h:0);
    self.oX = parseInt(rect.oX?rect.oX:0);
    self.oY = parseInt(rect.oY?rect.oY:0);
    self.oW = parseInt(rect.oW?rect.oW:0);
    self.oH = parseInt(rect.oH?rect.oH:0);
}

LBitmapData.prototype = {
    setProperties:function (rect){
        var self = this;
        self.x = parseInt(rect.x?rect.x:0);
        self.y = parseInt(rect.y?rect.y:0);
        self.width = parseInt(rect.w?rect.w:0);
        self.height = parseInt(rect.h?rect.h:0);
        self.oX = parseInt(rect.oX?rect.oX:0);
        self.oY = parseInt(rect.oY?rect.oY:0);
        self.oW = parseInt(rect.oW?rect.oW:0);
        self.oH = parseInt(rect.oH?rect.oH:0);
    }
//    setCoordinate:function (x,y){
//        var self = this;
//        self.x = x;
//        self.y = y;
//    }
}

/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-29
 * Time: 上午9:59
 * To change this template use File | Settings | File Templates.
 */
function LTextField(){
    var self = this;
    self.type = "LTextField";
    self.texttype = null;
    self.x = 0;
    self.y = 0;
    self.ax = 0;
    self.ay = 0;
    self.width = 0;
    //self.height = 0;
    self.gap = 5;
    self.text = "";
    self.font = "Arial";
    self.size = "11";
    self.color = "#000000";
    self.font_weight = "";//bold,bloder,lighter
    self.textAlign = "left";
    self.textBaseline = "middle";
    self.lineWidth = 1;
    self.stroke = false;
    self.borderColor;
    self.visible=true;
}

LTextField.prototype = {
    show:function (cood,canvas,port){
        if(cood==null)cood={x:0,y:0};
        var self = this;
        if(!self.visible)return;

        canvas.font = self.font_weight+" "+self.size+"px "+self.font;
        canvas.textAlign = self.textAlign;
        canvas.textBaseline = self.textBaseline;
        canvas.lineWidth = self.lineWidth;

        if(self.textName && self.language != switchLanguage.currentLanguage && self.refresh ){
            self.refresh();
        }

        if(self.stroke){
            canvas.strokeStyle = self.color;
            canvas.strokeText(self.text,parseInt(cood.x) + parseInt(self.x),
                parseInt(cood.y) + parseInt(self.y) + parseInt(self.size));
        }else{
            canvas.fillStyle = self.color;
            var _x = parseInt(cood.x) + parseInt(self.x);
            var _y = parseInt(cood.y) + parseInt(self.y) + parseInt(self.size);
            if(self.width){
                self.wrapText(canvas,self.text,_x,_y,self.width,self.gap,port);
            }else{
               // canvas.fillText(self.text,_x,_y);
                util.fillText(canvas,self.text,_x,_y,port);
            }
        }
        //恢复到黑色
        canvas.fillStyle = "#000000";
//        if(self.borderColor){
//            canvas.font = "bold "+self.size+"px "+self.font;
//            canvas.strokeStyle = self.borderColor;
//            canvas.strokeText(self.text,parseInt(cood.x) + parseInt(self.x),
//                parseInt(cood.y) + parseInt(self.y) + parseInt(self.size));
//        }
    },
    wrapText:function(context, text, x, y, maxWidth, gap,port) {
        var words;
        if(switchLanguage.currentLanguage == "Chinese"){
            words = [];
            for(var i = 0;i<text.length;i++){
                words.push(text[i]);
            }
            i = 0;
        }else{
            words= text.split(" ");
        }
        if(switchLanguage.currentLanguage == "Chinese"){
            var space = "";
        }else{
            var space = " ";
        }
        var line = "";
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + space;
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            //var testHeight = metrics.height;
            if(testWidth > maxWidth) {
               // context.fillText(line, x, y);
                util.fillText(context,line,x,y,port);
                line = words[n] + " ";
                y += this.size+gap;
            }
            else {
                line = testLine;
            }
        }
        //context.fillText(line, x, y);
        util.fillText(context,line,x,y,port);
    },
    getTextHeight:function(){
        var maxWidth = this.width;
        var height = 0;
        var text = this.text;
        var gap = this.gap;

        var words;
        if(switchLanguage.currentLanguage == "Chinese"){
            words = [];
            for(var i = 0;i<text.length;i++){
                words.push(text[i]);
            }
            i = 0;
        }else{
            words= text.split(" ");
        }

        if(switchLanguage.currentLanguage == "Chinese"){
            var space = "";
        }else{
            var space = " ";
        }

        var line = "";
        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + space;
            var metrics = cakecake.gameAnimationContext.measureText(testLine);
            var testWidth = metrics.width;
            //var testHeight = metrics.height;
            if(testWidth > maxWidth) {
                //context.fillText(line, x, y);
                line = words[n] + " ";
                height += this.size+gap;
            }
            else {
                line = testLine;
            }
        }
        height += this.size+gap;
        return height;
    },
    ismouseon:function(event,cood){
        return false;
    },
    setText:function(text){
        var type = typeof text;
        if(type == "object"){
            this.language = switchLanguage.currentLanguage;
            this.textName = text.name;
            this.text = string.currentString[text.name];
        }else if(type == "string"){
            this.text = text;
        }else{
            this.text = text;
        }
    },
    refresh:function(){
        this.language = switchLanguage.currentLanguage;
        this.text = string.currentString[this.textName];
    }
}
/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午1:50
 * To change this template use File | Settings | File Templates.
 */
function LLoader(){
    var self = this;
    self.loadtype = "";
    self.content = null;
    self.oncomplete = null;
    self.event = {};
}
LLoader.prototype = {
    addEventListener:function(type,listener,params){
        var self = this;
        if(type == LEvent.COMPLETE){
            self.oncomplete = {listener:listener,params:params};
        }
    },
    load:function (src,loadtype){
        var self = this;
        self.loadtype = loadtype;
        if(self.loadtype == "bitmapData"){
            self.content = new Image();
            self.content.onload = function(){
                if(self.oncomplete){
                    self.event.currentTarget = self.content;
                    self.oncomplete.listener(self.event,self.oncomplete.params);
                }
            }
            self.content.src = src;
        }
    }
}
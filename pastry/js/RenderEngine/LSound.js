/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-20
 * Time: 下午12:06
 * To change this template use File | Settings | File Templates.
 */
function LSound(url){
    var s = this;
    s.type = "LSound";
    s.audio = new Audio();
    s.audio.loop = false;
    s.audio.autoplay = false;
    s.audio.src = url;
    if(url)s.audio.load();
}
LSound.prototype.play = function(){
    var s = this;
    s.audio.play();
}
LSound.prototype.pause = function(stop){
    var s = this;
    s.audio.pause();
    if(stop){
        s.audio.currentTime = 0;
    }

}
LSound.prototype.loop = function(value){
    var s = this;
    s.audio.loop = value;
}
LSound.prototype.muted = function(value){
    var s = this;
    s.audio.muted = value;
}
LSound.prototype.autoplay = function(value){
    var s = this;
    s.audio.autoplay = value;
}
LSound.prototype.setVolume = function(value){
    var s = this;
    s.audio.volume = value;
}
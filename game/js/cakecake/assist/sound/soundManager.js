/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-20
 * Time: 下午12:20
 * To change this template use File | Settings | File Templates.
 */
this.soundManager = this.soundManager || {};
(function(){
    this.soundManager.muted = false;
    this.soundManager.volume = 1;

    this.soundManager.soundDictionary = {};
    this.soundManager.musicDictionary = {};

    this.soundManager.registerSound = function(url,id,isMusic){
        var sound = new LSound(url);
        if(isMusic){
            soundManager.musicDictionary[id] = sound;
        }else{
            soundManager.soundDictionary[id] = sound;
        }
    }
    this.soundManager.removeSound = function(id){
        delete soundManager.soundDictionary[id];
    }
    this.soundManager.play = function(id,loop){
//        if(loop)return;
//        return;
        if(soundManager.muted)return;
        if(soundManager.musicDictionary[id]){
            soundManager.musicDictionary[id].play();
            soundManager.musicDictionary[id].loop(loop);
            soundManager.currentMusic = {id:id,loop:loop};
        }else if(soundManager.soundDictionary[id]){
            soundManager.soundDictionary[id].play();
            soundManager.soundDictionary[id].loop(loop);
        }
    }
    this.soundManager.pause = function(id,stop){
        if(soundManager.soundDictionary[id]){
            soundManager.soundDictionary[id].pause(stop);
        }else if(soundManager.musicDictionary[id]){
            soundManager.musicDictionary[id].pause(stop);
        }

    }
    this.soundManager.loop = function(id,value){
        if(soundManager.soundDictionary[id]){
            soundManager.soundDictionary[id].loop(value);
        }else if(soundManager.musicDictionary[id]){
            soundManager.musicDictionary[id].loop(value);
        }
    }
    this.soundManager.setVolume = function(value,type){
        if(type == "sound"){
            for(var key in soundManager.soundDictionary){
                soundManager.soundDictionary[key].setVolume(value);
            }
        }else if(type == "music"){
            for(var key2 in soundManager.musicDictionary){
                soundManager.musicDictionary[key2].setVolume(value);
            }
        }


    }
    //背景音乐
    soundManager.registerSound("assets/sound/prelude.MP3","prelude",true);
    soundManager.registerSound("assets/sound/bgMusic.MP3","bgMusic",true);
    soundManager.registerSound("assets/sound/timeover.MP3","timeover",true);
    soundManager.registerSound("assets/sound/congratulation.MP3","congratulation",true);
    soundManager.registerSound("assets/sound/cakeEnding.MP3","cakeEnding",true);
    //音效
    soundManager.registerSound("assets/sound/cancel_back.ogg","cancel_back");
    soundManager.registerSound("assets/sound/cash_register.ogg","cash_register");
    soundManager.registerSound("assets/sound/choose_grid.ogg","choose_grid");
    soundManager.registerSound("assets/sound/coinbag.ogg","coinbag");
    soundManager.registerSound("assets/sound/confirm_next.ogg","confirm_next");
    soundManager.registerSound("assets/sound/Grouping1_fade.ogg","Grouping1_fade");
    soundManager.registerSound("assets/sound/Grouping2_fade.ogg","Grouping2_fade");
    soundManager.registerSound("assets/sound/Grouping3_fade.ogg","Grouping3_fade");
    soundManager.registerSound("assets/sound/Grouping4_fade.ogg","Grouping4_fade");
    soundManager.registerSound("assets/sound/pause_button.ogg","pause_button");
    soundManager.registerSound("assets/sound/Place_object.ogg","Place_object");
    soundManager.registerSound("assets/sound/purchase_with_coins.ogg","purchase_with_coins");
    soundManager.registerSound("assets/sound/remove_object.ogg","remove_object");
    soundManager.registerSound("assets/sound/score_increment.ogg","score_increment");
    soundManager.registerSound("assets/sound/select.ogg","select");
    soundManager.registerSound("assets/sound/storage_switch.ogg","storage_switch");
    soundManager.registerSound("assets/sound/SuperhamsterDisapear.ogg","SuperhamsterDisapear");
    soundManager.registerSound("assets/sound/time_warning.ogg","time_warning");
    soundManager.registerSound("assets/sound/trap_hamster.ogg","trap_hamster");
    soundManager.registerSound("assets/sound/Unlock.ogg","Unlock");

})();
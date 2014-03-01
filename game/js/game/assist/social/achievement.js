/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-8-28
 * Time: 下午5:28
 * To change this template use File | Settings | File Templates.
 */
this.achievement = this.achievement || {};
(function(){
    this.achievement.openNewAchievement = false;

    this.achievement.newAchievement = [];
    this.achievement.finishAchievement = function(key){
        if(userInfo.achievements[key]){
            return;
        }else{
            achievement.openNewAchievement = true;
            userInfo.achievements[key] = true;
            achievement.newAchievement.push(key);
            userProfile.saveAchievementsInfo();

        }
    }

})()
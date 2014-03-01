/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-11-1
 * Time: 下午9:47
 * To change this template use File | Settings | File Templates.
 */
this.switchLanguage = this.switchLanguage ||{};
(function(){
    this.switchLanguage.switchCount = 0;
    //选择默认语言
    var national;
    var defaultLanguage = localStorage.getItem("language.default");
    if(defaultLanguage){
        national = defaultLanguage;
    }else{
        console.log("window.navigator.language :  "+window.navigator.language);
        var l = window.navigator.language;

        if(l == "zh-TW" || l == "zh-CN"){
            national = "Chinese";
        }else if(l == "en-US"){
            national = "English";
        }else{
            national = "English";
        }
    }
    this.switchLanguage.currentLanguage = national;
    string.currentString =  string["s_"+national];


    this.switchLanguage.switch = function(national){
        if(switchLanguage.currentLanguage == national){
            return;
        }
        var loader = new LLoader();
        loader.addEventListener(LEvent.COMPLETE,this.onLanguageLoaded,national);
        loader.load(assetsData.languages[national].src,"bitmapData");
    }
    this.switchLanguage.onLanguageLoaded = function(event,national){
        switchLanguage.switchCount++;
        //保存设置
        localStorage.setItem("language.default",national);

        switchLanguage.currentLanguage = national;
        //销毁以前的
        util.destroyImage(assetsData.text.image);
        assetsData.text.image = null;
        assetsData.text = null;
        //生成选择的语言
        var rectangles = assetsData.languages[national].rectangles;
        var image = event.currentTarget;
        assetsData.text = {};
        assetsData.text.image = image;

        var len = rectangles.TextureAtlas.sprite.length;
        for(var i = 0;i<len;i++){
            var sprite = rectangles.TextureAtlas.sprite[i].attributes;//x,y,w,h,n,ox,ox,ow,oh
            if(!sprite){
                "";
            }
            var name = sprite.n.replace(/.jpg/, "");
            name = name.replace(/.png/,"");
            assetsData["text"][name] = sprite;
        }
        //切换string文本
       string.currentString =  string["s_"+national];
    }
})()

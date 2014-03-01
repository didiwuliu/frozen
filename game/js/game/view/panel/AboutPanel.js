/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-2
 * Time: 下午8:09
 * To change this template use File | Settings | File Templates.
 */
function AboutPanel(parentName){
    CommonSubPanel.call(this);
    this.parentName = parentName;
    this.init();
    this.initContent();
}
AboutPanel.prototype = Object.create(CommonSubPanel.prototype);
AboutPanel.prototype.initContent = function(){
    //about文字
    var bpd = new LBitmapData(assetsData.text.image,assetsData.text.about_f);
    var bp = new LBitmap(bpd,"about_f");
    bp.setCP(292,79);
    this.addChild(bp);

    //数据
    var data1 = [
        "Cake&Cake  V1.0.0 ",
        {name:"s189"},
        "support mail:support@wozlla.com"
    ];
    var data2 = [
        {title:{name:"s191"},name:[{name:"s199"}]},
        {title:{name:"s192"},name:[{name:"s200"}]},
        {title:{name:"s193"},name:[{name:"s201"},{name:"s202"}]},
        {title:{name:"s194"},name:[{name:"s203"}]},
        {title:{name:"s195"},name:[{name:"s204"}]},
        {title:{name:"s197"},name:[{name:"s205"}]},
        {title:{name:"s198"},name:[{name:"s199"},{name:"s202"},{name:"s206"}]}
    ]
    //公司
    var centerX = 292;
    var startY = 150;
    var space = 5;
    var height = 25;
    for(var i = 0;i<data1.length;i++){
        var text = new LTextField();
        text.color = "#007f64";
        text.font_weight = "bold";
        text.textAlign = "center";
        text.x = centerX;
        text.y = startY+i*(height+space);
        text.setText(data1[i]);
        text.size = 23;
        this.addChild(text);
    }
    var startY = 250;
    var lastY = startY;
    //成员
    var itemSpace = 5;//条目之间
    var elementSpace = 4;//标题、名字之间
    var titleHeight = 25;
    var nameHeight = 25;
    for(var i = 0;i <data2.length;i++){
        var title = new LTextField();
        title.color = "#ffffff";
        title.font_weight = "bold";
        title.textAlign = "center";
        title.x = centerX;
        //title.y = startY+i*(itemSpace+elementSpace+titleHeight+nameHeight);
        title.y = lastY;
        title.setText(data2[i].title);
        title.size = 26;
        this.addChild(title);

        for(var j = 0;j<data2[i].name.length;j++){
            var name = new LTextField();
            name.color = "#007f64";
            name.font_weight = "bold";
            name.textAlign = "center";
            name.x = centerX;
            name.y = title.y+elementSpace+titleHeight+(nameHeight+elementSpace)*j;
            name.setText(data2[i].name[j]);
            name.size = 23;
            this.addChild(name);
        }
        lastY = name.y+itemSpace+nameHeight;

    }
}
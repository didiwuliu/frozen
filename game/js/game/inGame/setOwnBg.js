/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-2
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */
function setOwnBg(row,col){
    if(row>5 || row<0 || col>5 || col<0){
        return;
    }
    if(gameTools.isPlant(row,col) || gameTools.isTool(row,col)){
        return;
    }

    var type = "";
    //从下起，顺时针统计
    //下
    var roundRow = row+1;
    var roundCol = col;
    if(roundRow>5){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //左下
    var roundRow = row+1;
    var roundCol = col-1;
    if(roundRow>5 || roundCol<0){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //左
    var roundRow = row;
    var roundCol = col-1;
    if(roundCol<0){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //左上
    var roundRow = row-1;
    var roundCol = col-1;
    if(roundRow<0 || roundCol<0){
        type += "1";
   }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //上
    var roundRow = row-1;
    var roundCol = col;
    if(roundRow<0){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //右上
    var roundRow = row-1;
    var roundCol = col+1;
    if(roundRow<0 || roundCol>5){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //右
    var roundRow = row;
    var roundCol = col+1;
    if(roundCol>5){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    //右下
    var roundRow = row+1;
    var roundCol = col+1;
    if(roundRow>5 || roundCol>5){
        type += "1";
    }else if(gameTools.isPlant(roundRow,roundCol)||gameTools.isTool(roundRow,roundCol)){
        type += "1";
    }else{
        type += "0";
    }
    var rightIndex = 0;
    //搜索目标
    for(var i=0;i<assetsData.gridBg.mapbgType.length;i++){
//        if(rightIndex>0){
//            cakecake.gridElements[row][col].setBg(assetsData.mapbgArr[rightIndex]);
//            break;
//        }
        if(rightIndex>0){break};
        var str = assetsData.gridBg.mapbgType[i];
        for(var j=0;j<8;j++){
            if(type[j] == str[j] || str[j] == "2"){
                if(j >= 7){
                    rightIndex = i;
                }
            }else{
                break;
            }
        }
    }
    //设置背景
    if(rightIndex>0){
        cakecake.gridElements[row][col].setBg(assetsData.gridBg.rectsData[rightIndex]);
    }
}

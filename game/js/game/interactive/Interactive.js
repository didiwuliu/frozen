/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-7
 * Time: 上午11:53
 * To change this template use File | Settings | File Templates.
 */
function onTouchStart(event){
    if(!inventory.currentPlant && !inventory.currentAnimal && !inventory.currentGloves && !inventory.currentUniversal)
        return;

    var p = gameTools.getCurrentRowCol(event);
    if(!p)return;
    mouseHandler.onStart(p);
}

function onTouchMove(event){
    if(!inventory.currentPlant && !inventory.currentAnimal && !inventory.currentGloves && !inventory.currentUniversal)
    {
        return;
    }
    var p = gameTools.getCurrentRowCol(event);
    if(!p)return;
    mouseHandler.onMove(p);

}

function onTouchEnd(event){
    if(!inventory.currentPlant && !inventory.currentAnimal && !inventory.currentGloves && !inventory.currentUniversal)
        return;
    var p = gameTools.getCurrentRowCol(event);
    if(!p)return;
    mouseHandler.onEnd(p);
}

function onMouseDown(event){
    if(!inventory.currentPlant && !inventory.currentAnimal && !inventory.currentGloves && !inventory.currentUniversal)
        return;
    frozen.isMouseDown = true;
    var p =  gameTools.getCurrentRowCol(event);
    if(!p)return;
    mouseHandler.onStart(p);
}

function onMouseMove(event){
    if(!frozen.isMouseDown){
        return;
    }
    if(!inventory.currentPlant && !inventory.currentAnimal && !inventory.currentGloves && !inventory.currentUniversal)
        return;

    var p =  gameTools.getCurrentRowCol(event);
    //destruction cell
    if(!p)return;
    mouseHandler.onMove(p);

}

function onMouseUp(event){
    if(!inventory.currentPlant && !inventory.currentAnimal && !inventory.currentGloves && !inventory.currentUniversal)
        return;
//    console.log("mouseUP");
    frozen.isMouseDown = false;
    var p =  gameTools.getCurrentRowCol(event);
    if(!p)return;
    mouseHandler.onEnd(p);
}
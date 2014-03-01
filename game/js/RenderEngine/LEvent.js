/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-6-28
 * Time: 下午2:00
 * To change this template use File | Settings | File Templates.
 */
var LEvent = function (){};
LEvent.COMPLETE = "complete";
LEvent.ENTER_FRAME = "enter_frame";
LEvent.currentTarget = null;
LEvent.addEventListener = function (node, type, fun){
    if(node.addEventListener){
        node.addEventListener(type, fun, false);
    }else if(node.attachEvent){
        node['e' + type + fun] = fun;
        node[type + fun] = function(){node['e' + type + fun]();}
        node.attachEvent('on' + type, node[type + fun]);
    }
}
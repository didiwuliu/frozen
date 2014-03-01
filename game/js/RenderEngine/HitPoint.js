/**
* 获得当前点击点的坐标
*/
window.HP = (function() {
	var hp = {
		refresh : null
	};

	//初始化获得坐标的方法
	(function($) {
		//判断是否支持触控
		if ('createTouch' in document || CocoonJS.App.nativeExtensionObjectAvailable) {
			$.refresh = function(e) {
                if (e.touches && e.touches.length > 0) {
	                return {
	                	x : e.touches[0].pageX,
	                	y : e.touches[0].pageY
	                }
                } else if (e.changedTouches && e.changedTouches.length > 0) {
	                return {
	                	x : e.changedTouches[0].pageX,
	                	y : e.changedTouches[0].pageY
	                }
                }
			}
		} else if (navigator.userAgent.indexOf("Firefox") != -1) {
			$.refresh = function(e) {
                return {
                	x : e.layerX,
                	y : e.layerY
                }
			}
		} else {
			$.refresh = function(e) {
                return {
                	x : e.offsetX,
                	y : e.offsetY
                }
			}
		}
	})(hp);

	return hp;
})();

// 将程序中的 console.log("str"); 全部替换为 log("str");
window.log = function(str) {
	if (cakecake.isDebug) {
		console.log(str);
	};
}
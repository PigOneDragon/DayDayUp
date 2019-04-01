//1、 注意 addEvent 方法里面，对于addEventListener、attachEvent的兼容处理，和对DOM 0级事件模型的处理；
//2、 注意 removeEvent 方法里面，对于removeEventListener、detachEvent的兼容处理，和对DOM 0级事件模型的处理；


var EventsUtility = {
    addEvent: function (element, type, callback) {
        if(typeof addEventListener!=='undefined'){
            element.addEventListener(type,callback,false);  //若支持，执行冒泡事件
        }else if (typeof attachEvent!=='undefined'){   //ie8及以下or不支持捕获的使用IE自己的二级事件函数
            element.attachEvent('on'+type,callback);
        }else {
            element['on'+type]=callback;   //都不支持执行绑定事件
        }
    },

    removeEvent: function (element, type, callback) {
        if(typeof removeEventListener!=='undefined'){
            element.removeEventListener(type,callback,false);
        }else if (typeof detachEvent!=='undefined'){
            element.detachEvent('on'+type,callback);
        }else {
            element['on'+type]=null;
        }
    }
};
function text(){
    console.log(123);
}
var tt=$('#text').get(0);
tt.addEventListener("click",text,false);  //二级事件三个参数  事件类型   执行函数  执行冒泡还是捕获（true  false）
$('#box2').get(0).addEventListener('click',function (){console.log(456)},false);
//利用自定义兼容集，兼容浏览器版本，支持捕获，使用addEventListener，不支持使用attachEvent，
// 不支持二级事件只执行自定义函数，相当于绑定事件
// EventsUtility.addEvent(tt,'click',text);
// EventsUtility.removeEvent(tt,'click',text);

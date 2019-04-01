//定义html的字体大小
function DocFontSize(doc, win) {
    var docEl = doc.documentElement,
        //当屏幕翻转时执行翻转事件，若不支持翻转事件，监测到屏幕尺寸变化执行resize事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        //定义一个获取当前设备尺寸之后设置html字体大小的函数
        sw = function () {
            var w = docEl.clientWidth;
            //当获取不到设备宽度时 不继续执行
            if (!w) return;
            //    判断设备宽度，定义html字体大小，为以后的rem使用提供
            if (w >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (w / 640) + 'px';
            };
            var caption = $('.caption'),
                caption1 = $('.caption1');
            //判断屏幕大小  执行隐藏还是显示操作
            if(w > 420){
                caption1.addClass('hide');
            }else {
                caption1.removeClass('hide');
            }
        };
    //如果doc的addEventListener属性/方法不存在，则直接返回。因为下面要用这个事件监听了，上面要判断一下，因为在原生事件绑定中
    // IE绑定中需要用到attachEvent,火狐与chrome中需要用到addEventListener 。此处做兼容性
    if (!doc.addEventListener) return;
    //window监听尺寸变化事件，当尺寸变化时执行sw(设置字体大小函数),false 清除默认事件
    win.addEventListener(resizeEvt, sw, false);
    //HTML在文档加载完毕后执行sw
    doc.addEventListener('DOMContentLoaded', sw, false);
    sw();
};
DocFontSize(document, window);

//第一区域的过渡效果
var caption = $('.caption'),
    caption1 = $('.caption1'),
    // w = $('html,body').width(),
    btn = $('.btn',caption1);
//    给头部小按钮绑定点击事件
btn.on('click',function () {
    caption.toggleClass('caption-top');
    return false;
});

//定义html的字体大小
function DocFontSize(doc, win) {
    var docEl = doc.documentElement,
        //当屏幕翻转时执行翻转事件，若不支持翻转事件，监测到屏幕尺寸变化执行resize事件
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        //定义一个获取当前设备尺寸的函数
        sw = function () {
            var w = docEl.clientWidth;
            //当获取不到设备宽度时 不继续执行
            if (!w) return;
            //    判断设备宽度，定义html字体大小，为以后的rem使用提供
            if (w >= 640) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (w / 640) + 'px';
            }
            ;
        };
    //如果doc的addEventListener属性/方法不存在，则直接返回。因为下面要用这个事件监听了，上面要判断一下，因为在原生事件绑定中
    // IE绑定中需要用到attachEvent,火狐与chrome中需要用到addEventListener 。也就是说这是做兼容性的
    if (!doc.addEventListener) return;
    //window监听尺寸变化事件，当尺寸变化时执行sw(设置字体大小函数),false 清除默认事件
    win.addEventListener(resizeEvt, sw, false);
    //HTML在文档加载完毕后执行sw
    doc.addEventListener('DOMContentLoaded', sw, false);
    sw();
};
DocFontSize(document, window);

//轮播图
function picslide() {
    var pics = $('.item-pic'),
        wrap = $('.items'),
        len = pics.length,
        dots = $('span', '.dots'),
        index = 0,
        imgWidth = pics.eq(0).width(),
        timer = null;

//    点击span圆点切换图片
    dots.on('click', function () {
        index = $(this).index();
        selectpic(index);
    });

//    自动切换
    function autoslide() {
        timer = setInterval(function () {
            index++;
            selectpic(index);
        }, 3000);
    }

    autoslide();

//    定义切换图片函数
    function selectpic(num) {
        //当点击圆点调用时先清除定时器
        clearInterval(timer);
        dots.removeClass('dots-active').eq(num).addClass('dots-active');
        //当到第五张时返回第一个小圆点
        if (num % 4 == 0) {
            dots.removeClass('dots-active').eq(0).addClass('dots-active');
        }
        //    切换图片
        wrap.stop().animate({
            left: -num * imgWidth,
        }, 1000, function () {

            if (index >= len - 1) {
                index = 0;
                wrap.css('left', '0px');
            }
            autoslide();
        })
    }
//    鼠标移入图片区停止轮播  离开继续
    wrap.hover(function () {
        clearInterval(timer);
    },function () {
        autoslide();
    });
};
picslide();
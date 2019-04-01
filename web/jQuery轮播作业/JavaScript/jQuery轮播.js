$(function () {

    var pics=$('.pics'),
        pic=$('.pic'),
        dots=$('.dots>span'),
        btn=$('.button'),
        index=0,
        len=pic.length,
        timer=null;
    //轮播主函数
    function Slide(){
        //鼠标移动至图片区轮播停止
        pics.on('mouseover',function () {
            clearInterval(timer);
        });
        //鼠标离开 开始轮播
        pics.on('mouseout',function () {
            timer=setInterval(function () {
                index++;
                if (index>=len) {
                    index=0;
                }
                changeImg();
            },2000)
        });
        //自定义图片切换函数
        function changeImg() {
            for (var i=0;i<len;i++){
                pic.eq(i).removeClass('active');
                dots.eq(i).removeClass('Active');
            }
            pic.eq(index).addClass('active');
            dots.eq(index).addClass('Active');
        }
        //按钮  上一张 下一张
        btn.first().click(function () {
            index--;
            if (index<0) index=len-1;
            changeImg();
        });
        btn.last().click(function () {
            index++;
            if (index>=len) index=0;
            changeImg();
        });
        //span圆点控制图片函数
        dots.each(function (idx) {
            $(this).attr('data-index',idx)
                .click(function () {
                    index=$(this).attr('data-index');
                    changeImg();
                });
        });
    }
    //页面加载1s后执行轮播函数
    setTimeout(function () {
            pics.trigger('mouseout');
    },1000);

    Slide();


});
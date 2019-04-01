$(function () {
   // 播放暂停
   var play = $('.play');
   var videoplay = $('#video').get(0);
   console.log(play.attr('class'));
   play.click(function () {
       if(play.attr('class')==='play'){
           play.attr('class','pause');
           videoplay.play();
       }
       else{
           play.attr('class','play');
           videoplay.pause();
       }

       // $(this).toggleClass('pause');
   });

//   全屏
    var fullsceen = $('.fullscreen');
    fullsceen.click(function () {
        //做个简单的浏览器兼容处理
        //1、火狐
        if (videoplay.mozRequestFullScreen){
            videoplay.mozRequestFullScreen();
        }
        //2、谷歌
        else if(videoplay.webkitRequestFullscreen){
            videoplay.webkitRequestFullscreen();
        }
        //3、标准定义的时间名
        else{
            videoplay.requestFullscreen();
        }

    });

    //播放时间
    var now = $('.time>.now');
    var all = $('.time>.all');
    //进度点
    var dot = $('.dot');
    //缓存条
    var line = $('.lineNode');
    $(videoplay).on('timeupdate',function () {
        var minute = parseInt(videoplay.currentTime/60);
        var sec = parseInt(videoplay.currentTime%60);
        // var second = '';
        // if (sec <= 9){
        //     second = '0' + sec;
        // }else{
        //     second = sec;
        // }
        var nowtime = double_time(minute) + ':' + double_time(sec) ;
        now.text(nowtime);

        //随着时间变化控制缓存进度条及进度点位置变化
        //计算当前百分比
        var ratio = videoplay.currentTime / videoplay.duration;
        // console.log(ratio);
        line.css('width',ratio  *100+'%');
        dot.css('left',line.width()-7.5);
    });
    //视频需要加载时间 不建议使用延时定时器
    videoplay.addEventListener('canplay',function () {
        all.text(double_time(parseInt(videoplay.duration/60)) + ":" + double_time(parseInt(videoplay.duration%60)));
    },false);
    // //可使用on 监听
    // $('#video').on('canplay',function () {
    //     alert(33);
    // });
    //时间函数，小于9补零
    function double_time(time) {
        return time < 10 ? '0' + time : time;
    }

    //拖动进度条  获取当前鼠标x轴坐标，减去当鼠标按下时的鼠标坐标，差值复制给圆点的left
    //拖动的3个事件  鼠标按下 鼠标移动 鼠标松开
    dot[0].onmousedown = function (e) {
        //Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态，是每个事件都有的对象，
        // 如果在事件传入了参数，可以使用参数调用属性，也就是代码中的e，如果没有传入参数，可以使用window中的event对象：
        var ev =e || event;
        var initX = ev.clientX - this.offsetLeft;

        //将移动和抬起两个事件绑定在页面上是为了避免鼠标滑动过快，超出了按钮，在页面上移动和抬起的时候也起作用，否则两个事件
        // 绑定在按钮上，一旦超出，鼠标在页面上抬起不起作用，鼠标再次移入按钮的时候，按钮会跟着移动。
        document.onmousemove = function (e) {
            var ev =e || event;
            var L = ev.clientX - initX;

            //对L进行距离约束
            if (L<-2.5){
                L=-2.5;
            }else if (L > 260){
                L = 260;
            }
            // console.log(L);
            dot.css('left',L);
            //同步缓存条 可根据当前的偏移量与进度条宽度的百分比赋值给缓存条的百分比
            var left = dot[0].offsetLeft;
            var W = parseInt(left+3) /260;
            line.css('width',W * 100 +'%');


        };
        document.onmouseup = function (e) {
            //当鼠标抬起的时候，将onmousemove 和onmouseup事件赋值为null，就是清除了这两个事件的执行代码，也就不会起作用了。
            document.onmousemove =document.onmouseup = null;

            //同步播放时间  总时间*缓存条百分比
            // // debugger;
            // console.log(currentTime);
            videoplay.currentTime = videoplay.duration * parseInt(dot[0].offsetLeft+3) /260;
        };
        return false;
    };

    //声音进度条拖动  类似视频进度条
    var voice_dot =$('.voice-dot')[0];
    voice_dot.onmousedown = function (e) {
        //Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态，是每个事件都有的对象，
        // 如果在事件传入了参数，可以使用参数调用属性，也就是代码中的e，如果没有传入参数，可以使用window中的event对象：
        var ev =e || event;
        var initX = ev.clientX - this.offsetLeft;

        //将移动和抬起两个事件绑定在页面上是为了避免鼠标滑动过快，超出了按钮，在页面上移动和抬起的时候也起作用，否则两个事件
        // 绑定在按钮上，一旦超出，鼠标在页面上抬起不起作用，鼠标再次移入按钮的时候，按钮会跟着移动。
        document.onmousemove = function (e) {
            var ev =e || event;
            var L = ev.clientX - initX;

            //对L进行距离约束
            if (L<25){
                //喇叭图标宽度
                L=25;
            }else if (L > 79){
                L = 79;
                //进度条的宽度
            }
            voice_dot.style.left=L+'px';
            //音量计算
            videoplay.volume = (voice_dot.offsetLeft-25) / 54;
            console.log((voice_dot.offsetLeft-25) / 54);


        };
        document.onmouseup = function () {
            // var ev =e || event;
            //当鼠标抬起的时候，将onmousemove 和onmouseup事件赋值为null，就是清除了这两个事件的执行代码，也就不会起作用了。
            document.onmousemove =document.onmouseup = null;




        };
        return false;
    };


    // dot.mousedown(function (event) {
    //     //获取初始按下时鼠标的位置
    //     var initX = event.clientX - this.offsetLeft;  //鼠标相对于浏览器的坐标
    //     // var l = event.offsetX;      //鼠标相对于当前元素的坐标
    //
    //     //拖动
    //     $(window).mousemove(function (event) {
    //         var L = event.clientX;
    //         dot.css('left',L-initX);
    //     });
    //     //松开
    //     $(window).mouseup(function () {
    //
    //     });
    //
    // });

});
$(function () {
    //加载曲库 定义一个数组对象
    var allMusic = [{
        'musicSrc':'mus/AcousticGuitar1.mp3',
        'musicPic':'pic/fmt01.jpg'
    },{
        'musicSrc':'mus/AmazingGrace.mp3',
        'musicPic':'pic/fmt02.png'
    },{
        'musicSrc':'mus/FeelsGood2B.mp3',
        'musicPic':'pic/fmt03.jpg'
    },{
        'musicSrc':'mus/FunBusyIntro.mp3',
        'musicPic':'pic/fmt04.jpg'
    },{
        'musicSrc':'mus/GreenDaze.mp3',
        'musicPic':'pic/fmt05.jpg'
    },{
        'musicSrc':'mus/Limosine.mp3',
        'musicPic':'pic/fmt06.jpg'
    }],index = 0;


    //js创建一个音频对象
    var myAudio = new Audio();

    myAudio.src = allMusic[index].musicSrc;
    // console.log(allMusic[index].musicSrc);
    // debugger
   //播放、暂停
    var playbtn = $('.play');
    var playbln = false;
    playbtn.click(function () {
        playbln = !playbln ;
        playbln ? myAudio.play() : myAudio.pause();
        return false;

    });
   //静音
    var voice = $('.volume');
    //默认不静音
    var voicebln = true;
    voice.click(function () {
        voicebln = ! voicebln;
        if (voicebln){
            this.className = 'volume';
            myAudio.volume = 1;
        }
        else {
            this.className = 'no_volume';
            myAudio.volume = 0;
        }
        // voicebln ? myAudio.volume = 1 : myAudio.volume = 0;
        // myAudio.volume = 0
        return false;
    });
    //控制进度条
    //1、播放时宽度动态更新
    var bar = $('.bar-load');
    //监听是否播放
    $(myAudio).on('timeupdate ',function () {
        var alltime = myAudio.duration;
        var loadtime = myAudio.currentTime;
        bar.css('width',(loadtime/alltime)*($('.bar-now').width()-4));
        // return false;
    });
    //2、点击进度条某位置跳转至 并播放
    var bar_now = $('.bar-now');
    bar_now.click(function (e) {
        var ev = e|| event;
        //鼠标坐标获取有问题？
        // var X = ev.clientX - this.offsetLeft - $('.out')[0].offsetLeft;
        var X = ev.offsetX-4;
        //console.log('鼠标',ev.clientX);
       // console.log('鼠标',ev.offsetX);
        console.log(X);
       // console.log('外围',$('.out')[0].offsetLeft);
        //console.log(ev);
        bar.width(X);
        // console.log(X/(bar_now.width()-4)* 100);
        // debugger
        myAudio.currentTime = myAudio.duration * (X/(bar_now.width()-4));
        return false;
    });

    //上一首 下一首  通过数组对象获取链接
    var prev = $('.prev');
    var next = $('.next');
    prev.click(function () {
        index--;
        if (index < 0){
            index = 5;
        }
        musciPlay(index);
        // bar.width(0);
        // myAudio.src = allMusic[index].musicSrc;
        // $('.top-pic').css('backgroundImage','url('+allMusic[index].musicPic+')');
        // myAudio.currentTime = 0;
        // playbln ? myAudio.play() : myAudio.pause();
        // return false;
    });
    next.click(function () {
        index++;
        if (index >= 6){
            index = 0;
        }
        musciPlay(index);
        // bar.width(0);
        // myAudio.src = allMusic[index].musicSrc;
        // $('.top-pic').css('backgroundImage','url('+allMusic[index].musicPic+')');
        // myAudio.currentTime = 0;
        // playbln ? myAudio.play() : myAudio.pause();
        // return false;
    });
    function musciPlay(index) {
        //清空缓存条
        bar.width(0);
        myAudio.src = allMusic[index].musicSrc;
        $('.top-pic').css('backgroundImage','url('+allMusic[index].musicPic+')');
        myAudio.currentTime = 0;
        playbln ? myAudio.play() : myAudio.pause();
        return false;
    }
});
window.onload=function () {
    //封装一个获取ID的函数
function byId(id) {
    return typeof (id)==="string"?document.getElementById(id):id;
}
//针对多次调用的变量设为global
var timer=null,
    pics=byId("pic-box").getElementsByTagName("div"),
    labels=byId("menu").getElementsByTagName("span"),
    index=0,
    len=pics.length;
//定义主函数
function slidePic() {
    //鼠标进入图片区跟tab，轮播停止
    byId("main").onmouseover=function () {
        clearInterval(timer);
    }
    //鼠标离开main定时器开始老师帮看下有问题没，用火狐刚打开第一次轮播时一闪一闪的，跟后期轮播看着动画感觉不对？
    byId("main").onmouseout=function () {
        timer=setInterval(function () {
            index++;
            if (index>=len) index=0;
            changePic();
        },1000)
    }
    byId("main").onmouseout();
    //轮播图片函数及选项卡变化
    function changePic() {
        for (var i=0;i<len;i++){
            pics[i].style.display="none";
            labels[i].className="";
        }
        pics[index].style.display="block";
        labels[index].className="active";
    }
    //选项卡点击事件，需要绑定span标签，利用for循环加属性
    for (var k=0;k<len;k++){
        labels[k].setAttribute("data-index",k);
        labels[k].onclick=function () {
            index=this.getAttribute("data-index");
            changePic();
        }
    }


}
slidePic();

}
// 获取ID
function byId(id) {
    //三元操作符
    return typeof(id)==="string"?document.getElementById(id):id;
    // if (typeof(id)==="string"){
    //    return document.getElementById(id);
    // } else {
    //     return id;
    // }
}
//自定义打开页面即开始轮播函数
function slide() {
    var index=0,
        timer=null,
        dots=byId("dots").getElementsByTagName("span"),
        pics=byId("banner").getElementsByTagName("div"),
        menus=byId("list").getElementsByTagName("li"),
        subLists=byId("sub-list-box").getElementsByClassName("inner-box"),
        len=pics.length;//获取轮播图个数，与span圆点个数一致
        //鼠标滑过main，定时器停止
        byId("main").onmouseover=function () {
            if (timer) clearInterval(timer);
        }
        //鼠标移除main，定时器开始
        byId("main").onmouseout=function () {
            //定时器开始，定时器要多次调用，设为全局变量global
            timer=setInterval(function () {
                // if (index>=3) pics[index].style.display="block"; //将图片元素设置可见,调用自定义函数
                index++;
                if (index>=len) index=0;
                // console.log(index);
                changePic();
            },2000)
        }
        //利用mouse移除方法,设置浏览器打开时启动轮播
        byId("main").onmouseout();
        //自定义改变图片函数及改变span小圆点样式
        function changePic(){
            for (var i=0;i<len;i++){
                pics[i].style.display="none";
                dots[i].className="";
            }
            pics[index].style.display="block";
            dots[index].className="active";
        }
        //点击圆点切换图片，
        for (var d=0;d<len;d++){
            dots[d].id=d;//将图片与小圆点进行绑定
            dots[d].onclick=function () {
                index=this.id;
                changePic();
            // clearInterval(timer); 不需要，鼠标放到main上定时器已停止
            }
        }
        //上一张下一张
        byId("before").onclick=function () {
            index++;
            if (index>=len) index=0;
            changePic();
        }
        byId("next").onclick=function () {
            index--;
            if (index<0) index=len-1;
            changePic();
        }
        //导航菜单效果
        //1、鼠标滑过主菜单，主菜单背景色变化，相应二级菜单显示
        for (var m=0;m<menus.length;m++){
            menus[m].setAttribute("data-index",m);//给li绑定事件
            menus[m].onmouseover=function () {
                for (var item=0;item<menus.length;item++){
                    menus[item].className="";
                    subLists[item].style.display="none";
                }
                var index1=this.getAttribute("data-index");
                menus[index1].className="item";
                byId("sub-list-box").className="sub-list-box";
                subLists[index1].style.display="block";
            }
        }
        //鼠标离开主菜单，list样式消除，隐藏二级菜单
        byId("list").onmouseout=function () {
            byId("sub-list-box").className="sub-list-box hide"
        };
        //鼠标滑过二级菜单，显示二级菜单
        byId("sub-list-box").onmouseover=function () {
            this.className="sub-list-box"
        };
        //鼠标移出二级菜单，隐藏二级菜单
        byId("sub-list-box").onmouseout=function () {
            this.className="sub-list-box hide"
        }

}
slide();
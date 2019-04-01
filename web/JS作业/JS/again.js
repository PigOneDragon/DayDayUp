
//1、图片轮播 按钮 滑过圆点
function slidePic() {
    function byId(id) {
        return typeof(id)==="string"?document.getElementById(id):id;
    }
    var pics=document.getElementsByClassName("slide-pic"),
        dots=byId("dots").getElementsByTagName("span"),
        spans=byId("tab").getElementsByTagName("span"),
        lis=byId("menu").getElementsByTagName("li"),
        items=document.getElementsByClassName("menu-items"),
        len=pics.length,
        timer=null,
        idx=0,
        index=0;
    //鼠标滑到图片区域 轮播停止
    byId("pics").onmouseover=function(){
        clearInterval(timer);
    }
    //离开 轮播开始

   byId("pics").onmouseout=function () {
       timer=setInterval(function () {
           index++;
           if (index>=len) index=0;
           changeImg();
       },1000)
   }
   byId("pics").onmouseout();
   //改变图片样式函数
   function changeImg() {
       for (var i=0;i<len;i++){
           pics[i].style.display="none";
           dots[i].className="";
           spans[i].className="";

       }
       pics[index].style.display="block";
       dots[index].className="Active";
       spans[index].className="active-span";
   }
   //tab标签点击  圆点滑过
    for(var k=0;k<len;k++){
        spans[k].setAttribute("data-idx",k);
        dots[k].setAttribute("data-inx",k);
        spans[k].onclick=function(){
            index=this.getAttribute("data-idx");
         changeImg();}
        dots[k].onmouseover=function(){
            index=this.getAttribute("data-inx");
         changeImg();}
    }
    // //鼠标在dots区域移动时保持小手
    // byId("dots").onmouseover=function(){
    //     this.style.cursor="default";
    // }
    //鼠标在tab停止轮播，离开继续
    byId("tab").onmouseover=function(){
        clearInterval(timer);
    }
    byId("tab").onmouseout=function(){
        slidePic();
    }

   //上一张 下一张 按钮
    byId("next").onclick=function () {
        index++;
        if (index>=len) index=0;
        changeImg();
    }
    byId("before").onclick=function () {
        index--;
        if (index<0) index=len-1;
        changeImg();
    }
    //鼠标滑过主菜单 二级菜单显示
    for (var j=0;j<len;j++){
        lis[j].setAttribute("data-index",j);
        lis[j].onmouseover=function () {
            for (var m=0;m<len;m++){
                lis[m].className="";
                items[m].style.display="none";
            }
            idx=this.getAttribute("data-index");
            lis[idx].className="list-li";
            byId("sub-menu").style.display="block";
            items[idx].style.display="block";
        }
    }
    byId("menu").onmouseout=function () {
        byId("sub-menu").style.display="none";
        // for (var m=0;m<len;m++){
                lis[idx].className="";
            // }
    }
    byId("sub-menu").onmouseover=function () {
        this.style.display="block";
    }
    byId("sub-menu").onmouseout=function () {
        this.style.display="none";
    }

}
slidePic();

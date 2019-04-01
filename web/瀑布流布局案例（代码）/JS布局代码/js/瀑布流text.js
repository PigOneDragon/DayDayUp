// window.onload=function () {
//     //加载完毕调用瀑布流函数
//     waterfoll();
// };
function waterfoll() {
    var pageWidth = document.documentElement.clientWidth,  //页面可视宽度
        mainWidth = document.getElementsByClassName("main")[0],
        boxs = document.getElementsByClassName("box"),
        boxWidth = boxs[0].offsetWidth + 20, //每一块的宽度，这里是内容加内填充的，网页上盒子的占用需加上设置的外边距
        closNum = Math.floor(pageWidth/boxWidth);  //获取当前页面块列数

        mainWidth.style.width = (closNum*boxWidth) + "px";//根据列数设置容器宽度

    var boxsWidthArr=[];  //定义一个空数组，用于获取每行的高度
    for(var index=0;index<boxs.length;index++){
        if (index<closNum){
            boxsWidthArr[index]=boxs[index].offsetHeight + 20;   //存储第一行的每个高度

        } else{
            //超过列数的依次找高度低的去排列
            //1、获取数组中高度最低的块的索引
            var minHeight = Math.min.apply(null, boxsWidthArr),
                minIdx=getIdx(minHeight,boxsWidthArr),
            //2、获取定位的左边距 可视距离；10;  左边距 + 页面的左边距
                leftWidth = boxs[minIdx].offsetLeft -10;
            boxs[index].style.position="absolute";
            boxs[index].style.left=leftWidth+"px";
            boxs[index].style.top=minHeight+"px";
            boxsWidthArr[minIdx]+=boxs[index].offsetHeight + 20;
        }
    }
    //获取数组索引
    function getIdx(minHeight,arr) {
        for (var idx in arr){
            if (minHeight==arr[idx]){
                return idx;
            };
        };
    }

}
waterfoll();
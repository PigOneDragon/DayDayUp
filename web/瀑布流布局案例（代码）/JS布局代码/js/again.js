
//定义一个瀑布流函数
function waterfoll() {
    //获取页面可视宽度 得到容纳的列  将第一行高度存入数组 得到最小的高  获取最小值的索引  将超出的列依次放入高度第X低的块下面
    //原高度值加新增的块的高
    var pageWidth = document.documentElement.clientWidth,
        boxs = document.getElementsByClassName("box"),
        boxsArr=[],
        boxWidth=boxs[0].offsetWidth+20, //包括边线的宽： width + padding + border
        closNum=Math.floor(pageWidth/boxWidth),
        m=document.getElementsByClassName("main")[0].style.width=(closNum*boxWidth)+"px";
    for (var i=0;i<boxs.length;i++){
        if (i<closNum){
            boxsArr[i]=boxs[i].offsetHeight+20;
            console.log(boxsArr);
        } else{
            //获取数组中最下的一个
            var minHeight = Math.min.apply(null, boxsArr),
                // minIndex=boxsArr.indexOf(minHeight);
                minIndex=getIdx(minHeight,boxsArr);
            console.log(boxsArr);
            console.log(minIndex);
            //获取最小值其索引
            boxs[i].style.position="absolute";
            boxs[i].style.left=boxs[minIndex].offsetLeft-10+"px";
            boxs[i].style.top=minHeight+"px";
            boxsArr[minIndex]+=boxs[i].offsetHeight+20;
        }
    }

    function getIdx(minval,arr) {
        for (var idx in arr){
            if (arr[idx]===minval){
                return idx;
            }
        }
    }


}
waterfoll();
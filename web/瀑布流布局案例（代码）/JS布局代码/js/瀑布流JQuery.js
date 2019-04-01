//模拟数据
var data = [{
    "src": "1.png",
    "title": "第一怪 竹筒当烟袋"
}, {
    "src": "2.png",
    "title": "第二怪 草帽当锅盖"
}, {
    "src": "3.png",
    "title": "第三怪 这边下雨那边晒"
}, {
    "src": "4.png",
    "title": "第四怪 四季服装同穿戴"
}, {
    "src": "5.png",
    "title": "第五怪 火车没有汽车快"
}, {
    "src": "6.png",
    "title": "第六怪 火车不通国内通国外"
}, {
    "src": "7.png",
    "title": "第七怪 老奶爬山比猴快"
}, {
    "src": "8.png",
    "title": "第八怪 鞋子后面多一块"
}, {
    "src": "9.png",
    "title": "第九怪 脚趾四季露在外"
}, {
    "src": "10.png",
    "title": "第十怪 鸡蛋拴着卖"
}, {
    "src": "11.png",
    "title": "第十一怪 粑粑叫饵块"
}, {
    "src": "12.png",
    "title": "第十二怪 花生蚕豆数着卖"
}, {
    "src": "13.png",
    "title": "第十三怪 三个蚊子一盘菜"
}, {
    "src": "14.png",
    "title": "第十四怪 四个老鼠一麻袋"
}, {
    "src": "15.png",
    "title": "第十五怪 树上松毛扭着卖"
}, {
    "src": "16.png",
    "title": "第十六怪 姑娘叫老太"
}, {
    "src": "17.png",
    "title": "第十七怪 小和尚可以谈恋爱"
}, {
    "src": "18.png",
    "title": "第十八怪 背着娃娃谈恋爱"
}];



//$(function () {
    var boxes = $('.box'),   //初始盒子集合

        mainBody = $('.main'),
        windowsWidth = $(window).width(),  //页面宽度
        boxsWidthArr=[], //存储行各块的高度
        boxsWidth = boxes.eq(0).width()+40,  //盒子宽度
        colsNum = Math.floor(windowsWidth/boxsWidth);  //页面列数
    mainBody.width(colsNum*boxsWidth);  //动态设置容器宽度
    // console.log(boxs);
    waterfoll(mainBody,boxes); //瀑布流
    // // var arr=[1,25,55,6,33,333];
    // for (i in arr){  打印的是数据的长度
    //     console.log(i);
    // }
    //当滚动条滚动是，增加盒子
    $(window).scroll(function () {

        // var boxs = $('.box'),   //盒子集合
        //   var  boxsWidthArr=[],
        //     mainBody = $('.main');
        // console.log(boxs);
        appBox(mainBody,boxsWidthArr); //追加盒子
        waterfoll(mainBody,mainBody.children('div')); //瀑布流


    });




//获取列数
// var windowsWidth = $(window).width(),  //页面宽度
//     boxsWidthArr=[], //存储行各块的高度
//     boxsWidth = boxs.eq(0).width()+40,  //盒子宽度
//     colsNum = Math.floor(windowsWidth/boxsWidth);  //页面列数
// mainBody.width(colsNum*boxsWidth);  //动态设置容器宽度

function waterfoll(mainBody,boxes) {

    for (var i=0;i<boxes.length;i++){
        if (i<colsNum){
            boxsWidthArr[i]=boxes.eq(i).height()+40;
        } else{
            //获取当前数组中最小的高度及其索引
            var minHeight = Math.min.apply(null,boxsWidthArr),
                minIndex = getIdx(minHeight,boxsWidthArr);
            //调用函数动态添加动画样式 当超过colsNum时 超出的部分有动画，那么函数需要知道 boxs几 ，top值  left值
            letMove(boxes,i,minHeight,boxes.eq(minIndex).position().left);
            boxsWidthArr[minIndex]+=boxes.eq(i).height()+40;
            // return boxsWidthArr;
            // console.log(Check(boxsWidthArr));
        }
        //给盒子设置透明度动画，hover需要2个参数  鼠标进入  鼠标离开
        boxes.eq(i).hover(function () {
            $(this).stop().animate({'opacity':'0.5'},300);
        },function () {
            $(this).stop().animate({'opacity':'1'},300);
        });
}
}

//动画函数
var getStartNumber = 0;
function letMove(boxes,i,minHeight,leftW) {
    if (getStartNumber>=i) {
        return false;
    };
    boxes.eq(i).css({
        'position':'absolute',
        'top':minHeight,
        'opacity':0,
        'left': leftW  //获取当前最小高度的块的左绝对像素
    }).stop().animate({opacity:1},2000);
    getStartNumber = i;  //将之前已经加载过的盒子不再执行动画效果
}
//获取数组其索引
function getIdx(val,arr) {
    for (var idx in arr){
        if (arr[idx]===val){
            return idx;
        }
    }
}
//判断盒子追加条件
function Check(boxsWidthArr) {
    var docHeight =  $(window).height(),  //当前文档高度
        scrHeight = $(window).scrollTop(),  //滚动条滚动距离
        maxHeight = Math.max.apply(null,boxsWidthArr); //最大的列高
    // maxIdx = getIdx(maxHeight,boxsWidthArr);
    var subHeight = docHeight+scrHeight;
    // if (subHeight>=maxHeight){
    //     return
    // }
    return subHeight>=maxHeight?true:false;

}

//追加盒子，当文档高度加滚动条滚动高度大于原始盒子中最高的列高（数组中最后一行添加后最大的一项高度），开始追加
function appBox(mainBody,boxsWidthArr) {

    if (Check(boxsWidthArr)){
        for (var m=0;m<data.length;m++){
            mainBody.append('<div class="box"><img src="images/'+data[m].src+'"/><a href="#">'+data[m].title+'</a></div>');
            // console.log('<div><img src="images/' + data[i].src + '"><a href="http: //www.imooc.com" target="_blank">' + data[i].title + '</a></div>');
        }
    }else{
        return false;
    }

};


//});


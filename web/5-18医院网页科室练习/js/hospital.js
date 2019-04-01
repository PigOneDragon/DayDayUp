//logo右侧搜索框组件
/*功能：点击选项 下拉菜单显示，点击页面其他地区或自身时菜单隐藏，选择菜单后改变选项默认值(医院)*/
$.fn.UIsearch = function(){
    var ui = $(this);
    var val = $('.select',ui);
    var classified = $('.classified',ui);
    var items = $('.classified>a',ui); //菜单选项

    val.on('click',function () {
        classified.show();
        return false; //阻止事件冒泡
    });
    items.on('click',function () {
        val.text($(this).text());
        classified.hide();
      //  return false;
    });
    //点击页面其他地方 隐藏分类菜单
    $('body').click(function () {
        classified.hide();
    });
};

// //图标切换
// $.fn.Pichover = function(){
//   var ui = $(this);
//   ui.each(function (idx,event) {
//       // var y = ($(this).index()+1)*-1*22;
//       $(event).css({
//           // background: 'url("http://climg.mukewang.com/58c61b610001c58300440638.jpg") 0  -22px no-repeat',
//           backgroundPositionX:0,
//           backgroundPositionY:(idx+1) * (-22)
//       });)
//       console.log(idx);
//   });
// };

//展开全部
$.fn.UIall = function(){
    var ui =$(this);
    var btn = $('.content-header-all_btn');
    btn.on('click',function () {
        if ($(this).text()=="展开全部"){
            ui.show();
            $(this).text("收起全部");
        } else{
            ui.hide();
            $(this).text("展开全部");
        }
    });
};

$(function () {
    $('.search').UIsearch();
    $('.content-body').UIall();
});
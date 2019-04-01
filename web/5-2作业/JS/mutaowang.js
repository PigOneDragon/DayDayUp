//鼠标滑过top区导航菜单，二级菜单显示，为li标签绑定mouseover事件
var navLi = $('li.list'),
    items = $('.nav-item');

for (var i = 0; i < navLi.length; i++) {
    navLi.eq(i).attr('data-index', i);
    items.eq(i).attr('data-index', i);
}
navLi.on('mouseenter', function () {
    var idx = $(this).attr('data-index');
    //去除下拉列表显示
    items.each(function (index, event) {
        // console.log(index);
        // if (index!==idx){
        $(event).css('display', 'none');
        // }
    });
    if ($(this).hasClass("active")) {
        // $(this).removeClass('active');
        return true;
    } else {
        $(this).addClass('active')
            .siblings().removeClass('active'); //链式语法，该元素的所有同级元素添加一个类
        //显示二级菜单
        items.eq(idx).css({
            'display': 'block'
        });


    }

});
//鼠标离开 去除激活态
navLi.mouseleave(function () {
    items.hide();
    navLi.removeClass('active');
});

//购物车部分：鼠标滑过，二级菜单显示，背景变白色，字体变红色，购物车图片跟箭头替换为文件夹中红色的2个
var gwc_z = $('.gwc_z'),
    gwc_red = $('#gwc_red'),
    gwc_jt = $('#gwc_jt'),
    fontaColor = $('.gwc_z>a'),
    fontsColor = $('.gwc_z>span'),
    gwc_sp = $('.xddw');
//鼠标进入购物车部分，二级菜单显示
//问题：当我缩小页面时，移动鼠标样式会有变化？ 宽度高度问题？
gwc_z.mouseenter(function () {
    gwc_sp.css('display', 'block');
    gwc_red.attr('src', 'img/icon/25.png');
    gwc_jt.attr('src', 'img/icon/24.png');
    fontaColor.css('color', 'red');
    fontsColor.css('color', 'red');
    gwc_z.css('background-color', '#fff');
});
//鼠标离开购物车方块  商品隐藏
gwc_z.mouseleave(function () {
    gwc_sp.css('display', 'none');
});
//鼠标进入购物车商品 商品显示
gwc_sp.mouseenter(function () {
    gwc_sp.css('display', 'block');
});
//鼠标进入购物车商品 商品隐藏
gwc_sp.mouseleave(function () {
    gwc_sp.css('display', 'none');
    gwc_red.attr('src', 'img/icon/26.png');
    gwc_jt.attr('src', 'img/icon/23.png');
    fontaColor.css('color', '#fff');
    fontsColor.css('color', '#fff');
    gwc_z.css('background-color', 'red');
});

//轮播图函数
function picSlide() {
    var picarea = $('.banner-body'),
        pics = $('.pic'),
        spans = $('.dots>span'),
        picsNum = pics.length,
        index = 0,
        timer = null;

    //鼠标离开图片区 轮播开始
    picarea.mouseleave(function () {
        timer = setInterval(function () {
            index++;
            if (index >= picsNum) index = 0;
            changePic();
        }, 2000)
    });
    //触发鼠标离开事件
    picarea.mouseleave();
    //鼠标进入图片区 轮播停止
    picarea.mouseover(function () {
        clearInterval(timer);
    });

    //图片、圆点变化函数
    function changePic() {
        pics.each(function () {
            $(this).removeClass('active');
        });
        spans.each(function () {
            $(this).removeClass('Active');
        });
        pics.eq(index).addClass('active');
        spans.eq(index).addClass('Active');
    }

    //点击圆点切换
    spans.each(function (idx) {
        $(this).attr('data-index', idx)
            .click(function () {
                index = $(this).attr('data-index');
                changePic();
            });
    });
    //轮播按钮
    $('#btn-left').click(function () {
        index--;
        if (index < 0) index = picsNum - 1;
        changePic();
    });
    $('#btn-right').click(function () {
        index++;
        if (index >= picsNum) index = 0;
        changePic();
    });

}

picSlide();

//鼠标滑过banner主菜单，列表变白，字体变红，显示二级菜单
var main_list = $('.main-list>li'),
    sub_item = $('.sub-item'),
    sub_menu = $('.sub-menu');

main_list.mouseover(function () {

    //    二级菜单
    sub_menu.css('display', 'block');
    sub_item.each(function (index) {
        sub_item.eq(index).css('display', 'none');
        main_list.eq(index).removeClass('m_hover');
    });
    var idx = $(this).index();
    $(this).attr('class', 'm_hover')
        .find('a').css('color', 'red')
        .end().find('span').css('color', 'red');
    sub_item.eq(idx).css('display', 'block');
});


//鼠标离开列表 列表变红 字体变白
main_list.mouseout(function () {
    main_list.removeClass('m_hover');
    $(this).find('a').css('color', 'white')
        .end().find('span').css('color', 'white');
    sub_menu.hide();
});
//鼠标进入二级菜单显示
sub_menu.mouseenter(function () {
    sub_menu.show();
});
//鼠标离开二级菜单隐藏
sub_menu.mouseleave(function () {
    sub_menu.hide();
});


//右侧导航  鼠标移动隐藏文字这块实现不了~  等下试下 pics 跟links单独设置鼠标事件
var cb_nav_pics = $('.cb-nav-pic'),
    cb_nav_lks = $('.cb-nav-lk');
    // console.log(cb_nav_lks);
cb_nav_pics.each(function (idx) {
    cb_nav_pics.eq(idx).hover(function () {
            $(this).attr('id', 'cb-nav-bg');
            // $(this).removeAttr('id');
            // $('.cb-nav-item').attr('id','cb-nav-bg');
            cb_nav_lks.eq(idx).animate({
                'right': 32,
            }, 200)
        }, function () {
            $(this).removeAttr('id');
            // console.log($(this).index());
            cb_nav_lks.eq(idx).animate({
                'right': -36,
            })
        }
    );
});
//鼠标在导航链接区的进入和离开
cb_nav_lks.each(function (idex) {
    cb_nav_lks.eq(idex).hover(function () {
        $(this).attr('id', 'cb-nav-lk-show');
        cb_nav_pics.eq(idex).attr('id', 'cb-nav-bg');
        // console.log(idex);
    }, function () {

        // $(this).animate({
        //     'right':-36
        // },200);
        $(this).removeAttr('id');
        cb_nav_pics.eq(idex).removeAttr('id');
    });

});

// },function () {
//     $(this).css('right','-36');
// });

//当使用宽度时 动画效果很突兀
// var cb_nav_item = $('.cb-nav-item'),
//     cb_nav_pics = $('.cb-nav-pic');
// cb_nav_pics.each(function (index) {
//     cb_nav_item.eq(index).hover(function () {
//         cb_nav_pics.eq(index).attr('id', 'cb-nav-bg');
//         console.log($(this));
//         $(this).animate({
//             'width':100
//         },300)
//     },function () {
//         cb_nav_pics.eq(index).removeAttr('id');
//         $(this).animate({
//             'width': 32
//         },300)
//     });
// });
//返回顶部
cb_nav_pics.last().click(function () {
        $('html,body').animate({
            'scrollTop': 0
        }, 500);
    }
);


//鼠标进入楼层导航 显示对应楼层商品
var title_nav = $('.title-nav>span'),
    cont_jtzs = $('.cont-jtzs'),
    goods_list = $('.goods-list');
var lc1 = cont_jtzs.first(),
    lc2 = cont_jtzs.last();
// console.log(lc1);
// console.log(lc2);
title_nav.each(function (idx) {
    // var Offset=200;
    $(this).click(function () {
        this.id = 'color_red';
        console.log(idx);
        //移动楼层的箭头指示  有问题  当页面宽度变化时指示不对  针对span 定位？
        switch (idx) {
            case 0:
                lc1.css('right', '200px');
                break;
            case 1:
                lc1.css('right', '120px');
                break;
            case 2:
                lc1.css('right', '40px');
                break;
            case 3:
                lc2.css('right', '200px');
                break;
            case 4:
                lc2.css('right', '120px');
                break;
            case 5:
                lc2.css('right', '40px');
                break;
        }

        $(this).siblings().removeAttr('id');
        goods_list.eq(idx).addClass('goods-list-act').siblings().removeClass('goods-list-act');
    });
});

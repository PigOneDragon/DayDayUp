
//ul搜索组件
$.fn.UIsearch=function () {
    var ui = $(this),
        ui_base = $('.ui-search-base',ui),
        ui_item = $('.ui-search-item',ui);
    ui_base.on('click',function () {
        ui_item.show();
        return false;  //阻止事件冒泡 防止触发上级事件
    });

    ui_item.find('a').on('click',function () {
        //点击条目。替换搜索框中的文字
        ui_base.text($(this).text());
        ui_item.hide();
        return false;
    });
//点击页面其他部位 也将ui_item隐藏
    $('body').click(function () {
        ui_item.hide();
        // return false;
    });
};
//ui-tab切换
/*
*  header 点击相应的标题
*  content 切换对应的内容
* */
$.fn.UiTab = function(header,content,PreclassName){
    var ui = $(this);
    var cap = $(header,ui);
    var content = $(content,ui);
    //className 扩展名
    var PreclassName = PreclassName ||'';

    cap.on('click',function () {
        var index = $(this).index();
        cap.removeClass(PreclassName+'item_focus').eq(index).addClass(PreclassName+'item_focus');
        content.hide().eq(index).show();
        return false;
    });
};
//轮播图
$.fn.UiSlider = function() {
    var ui = $(this);

    var wrap = $('.banner-warp',ui);
    var pics = $('.banner-warp>.item',ui);
    var Index = 0;
    //获取图片宽度 确定偏移量
    var Width = pics.eq(0).width();
    // console.log(Width);
    //获取小圆点 按钮对象
    var btn_prev = $('#item_prev', ui);
    var btn_next = $('#item_next', ui);
    var tips_item = $('.tips .item', ui);
    var len = tips_item.length;
    var enableAuto=true;  //判断是否进行轮播
    //为按钮 小圆点绑定事件
    wrap.on('move_prev',function () {
        Index-=1;
        if (Index<0){
            Index=len-1;
        }
        wrap.triggerHandler('move_to',Index);
    })
        .on('move_next',function () {
            Index+=1;
            if (Index>len-1){
                Index=0;
            }
            wrap.triggerHandler('move_to',Index);
        })
        .on('move_to',function (event,index) {
            wrap.css('left',index*Width*-1);
            tips_item.removeClass('item_focus').eq(index).addClass('item_focus');

        })
        .on('auto_slider',function () {
            setInterval(function () {
                enableAuto && wrap.triggerHandler('move_next');
            },2000);
        })
        .triggerHandler('auto_slider');
    //绑定触发事件
    btn_prev.on('click',function () {
        wrap.triggerHandler('move_prev');
    });
    btn_next.on('click',function () {
        wrap.triggerHandler('move_next');
    });
    tips_item.on('click',function () {
        Index=$(this).index();
        wrap.triggerHandler('move_to',Index);

    });

    //鼠标进入 离开banner区
    ui
        .on('mouseover',function(){
            enableAuto = false;
        })
        .on('mouseout',function(){
            enableAuto = true;
        })

};
//返回顶部
$.fn.UiBackTop = function(){
    var ui = $(this);
    var cont = $('<a href="" class="backtop"></a>');
    //给body最后添加一个回到顶部按钮
    ui.append(cont);
    //当前页面文档高度
    var windowHeight = $(window).height();
    // console.log(windowHeight);
    $(window).scroll(function () {
        //获取当前滚动条高度
        var top = $('html,body').scrollTop();
        // console.log(top);
        if (top>windowHeight){
            cont.show();
        }else{
            cont.hide();
        }
    });
    //点击按钮回到顶部
    cont.click(function () {
        $('html,body').animate({
            'scrollTop': '0px'
        }, 2000);
        return false;
    });

};

//多级联动菜单
/*实现功能
*通过后台接口将主选项卡内容更新，选择区域改变，更新直属下联菜单，重置直属下联菜单之后的搜索框
* */
$.fn.Uicascading = function(){
    var ui = $(this);
    var searchs = $('select',ui);

    //内容改变更新直属下联菜单
    searchs.on('change',function () {
        var index = $(this).index('select');
        var val = $(this).val();
        //获取传入后台对象函数的参数，多级联动，
        var where = $(this).attr('data-where');
        where = where ? where.split(','):[];  //若为空，返回空数组，不为空，将几个条件用，分割成条件参数数组
        where.push(val); //把用户选择的选项值放入条件数组最后

        //将下一个更新
        searchs.eq(index+1)
            .attr('data-where',where.join(','))
            .triggerHandler('reloadData');


       //下个之后的清空

        ui.find('select:gt('+(index+1)+')').each(function () {
            $(this)
                .attr('data-where','') //清空条件
                .triggerHandler('reloadData');
        });

    })
        .on('reloadData',function () {

            //获取当前接口的方法 传入后台对象中使用
            var method = $(this).attr('data-search');
            //这里需要个数组[a,b,c]，调用的时候需要转换成对应的a,b,c给函数使用（apply方法可实现）
            var data = AjaxRemoteGetData[method].apply(this,$(this).attr('data-where').split(','));
            //将取得的数据放入option选项中，并清空之前的数据
            var select = $(this);
            select.find('option').remove();
            //each这里函数传入的2个参数一个是索引，一个是data内容
            $.each(data,function (idx,item) {
                select.append($('<option value="'+item+'">'+item+'</option>'));
                });

        });
    //第一个联动菜单改变触发重载事件
    searchs.eq(0).triggerHandler('reloadData');

};


//页面加载后执行
$(function () {
    $('.ui-search').UIsearch();
    $('.content-main').UiTab('.content-main-caption>a','.content-main-body');
    $('.content-main-body').UiTab('.content-main-body-area-item','.content-main-body-area-items','area-');
    $('body').UiBackTop();
    $('.banner-slide').UiSlider();
    $('.form').Uicascading();
});

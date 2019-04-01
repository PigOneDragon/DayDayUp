//搜索框UI
$.fn.UIsearch = function () {
    var ui = $(this);
    var where = $('.logo-search-where', ui);
    var list = $('.logo-search-where-item', ui);
    var item = $('span', list);

    //鼠标点击显示条目
    where.on('click', function () {
        list.show();
        return false;
    });
    //点击条目改变where值  隐藏条目
    item.on('click', function () {
        where.text($(this).text());
        list.hide();
    });
    //点击页面其他地方隐藏条目
    $('body').click(function () {
        list.hide();
    });
};

//选项卡UI
$.fn.UItab = function (tab1, tab2, classname1, classname2) {
    var ui = $(this);
    var tab1 = $(tab1, ui); //点击选项卡
    var tab2 = $(tab2, ui); //联动选项卡
    //绑定点击事件
    tab1.on('click', function () {
        var index = $(this).index();
        tab1.removeClass(classname1).eq(index).addClass(classname1);
        tab2.removeClass(classname2).eq(index).addClass(classname2);
        return false;
    });
};
//科室预约跟排班切换
$.fn.UiHo = function () {
    var ui = $(this);
    var detail = $('.detail-item>.link', ui);
    var scheduling = $('#back-detail', ui);
    detail.on('click', function () {
            ui.removeClass('show').eq(1).addClass('show');
            return false;
        }
    );
    scheduling.on('click', function () {
        ui.removeClass('show').eq(0).addClass('show');
        return false;
    });
};

//获取日期数据，并放入排班表中
function getData(mydate) {
    //将静态页面清空
    var y = $('.first-tr');
    var am = $('#scheduling-info>tbody>tr').eq(0);
    var pm = $('#scheduling-info>tbody>tr').eq(1);
    var night = $('#scheduling-info>tbody>tr').eq(2);
    y.empty();
    am.empty();
    pm.empty();
    night.empty();
    // debugger
    var Week = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {

            var week = Week[mydate.getDay()];
            var seperator1 = "-";
            var year = mydate.getFullYear();
            var month = mydate.getMonth() + 1;
            var strDate = mydate.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;   //yyyy-mm-dd 格式日期
            //表头
            y.append($('<th>\n' +
                '                        <div class="week">' + week + '</div>\n' +
                '                        <div class="date">' + currentdate + '</div>\n' +
                '                    </th>'));
            //上午
            am.append($('<td></td>'));
            //下午
            pm.append($('<td>约满</td>'));
            //晚上
            night.append($('<td></td>'));


            mydate.setDate(mydate.getDate() + 1);
        }

    }
};


//日期滚动
$.fn.Uiclick = function () {
    var ui = $(this);
    var table = $('.scheduling-middle-info');
    var prev = $('.scheduling-left>.prev', ui);
    var next = $('.scheduling-right>.next', ui);
    //点击次数
    var click_count = 0;

    //获取当前left值  ?如何设置不可点击 最左或最右时
    //老师建议定义一个变量记录点击次数
    prev.on('click', function () {
        click_count--;
        if (click_count <= 0) click_count =0;
        // left = table.get(0).offsetLeft;
        table.animate({'left': -650*click_count}, 300);
        return false;
    });


    next.on('click', function () {
        //获取当前left值
        click_count++;
        if (click_count >= 6) click_count =6;
        // left = table.get(0).offsetLeft;
        table.animate({'left': -650*click_count}, 300);
        return false;
    });
};

$(function () {
    $('.logo-search').UIsearch();
    var content = $('.content');
    content.UItab('.content-nav>.link', '.content-main-item', 'link_focus', 'show');
    //点击返回科室列表
    content.UiHo();
    var mydate = new Date();
    getData(mydate);
    //点击按钮日期滚动
    content.Uiclick();
});
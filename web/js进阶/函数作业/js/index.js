// @charset UTF-8;
$(function () {
    var all = $('#all');
    var item = $('.item');
    var itemP = {
        add: $('.add', item),
        subtract: $('.subtract', item),
        count: $('.count', item),
        price: $('.price', item),
        alone: $('.alone', item)
    };
    // 全选/取消 
    all.click(function () {
        var f = $(this).is(':checked');
        if (f) {
            itemP.alone.each(function () {
                $(this).prop("checked", true);
            });
        } else {
            itemP.alone.each(function () {
                $(this).removeAttr("checked", false);
                $(this).prop("checked", false);
                // console.log($(this));
            });
        }
    });


    //    判断是否选中
    function option(elem) {
        // console.log($("#onee").is(':checked'));
        var flag = elem.is(':checked');
        if (flag) return true;
        return false;
    }

    //    加减改变数量  最小为1
    var aa = 1;
    itemP.add.click(function () {

        aa += 1;
        changeNum($(this), aa);
        sumPrice();
    });

    itemP.subtract.click(function () {

        aa -= 1;
        if (aa <= 1) aa = 1;
        changeNum($(this), aa);
        sumPrice();
    });

    // 加减公用的函数
    function changeNum(obj, num) {
        var box = obj.parent('.box');
        var boxPar = box.parent('.item');
        var prs = $('.prices', boxPar);
        var pr = $('.price', boxPar);


        $('.count', box).attr('value', aa);
        prs.text(num * Number(pr.text()));

    }

    //    单价勾选变动事件

    $("input[type='checkbox']").change(function () {
        sumPrice();
    });

    // 计算总价
    function sumPrice() {
        var sum = 0;
        var itemPnum = itemP.price.length;
        var len = 0;
        // alert('change');
        for (var i = 0; i < itemPnum; i++) {
            if (option(itemP.alone.eq(i))) {
                a = Number(itemP.price.eq(i).text());
                b = Number(itemP.count.eq(i).val());
                sum += (a * b);
                // 计算全选按钮是否选中
                len++;
            } else {
                continue;
            }

        }
        if (len == itemPnum) {
            all.prop("checked", true);
        } else {
            all.prop("checked", false);
        }
        $('.cash').text(sum);
    }
    // 加载完即执行
    sumPrice();
    // console.log($("#onee").is(':checked'));
});
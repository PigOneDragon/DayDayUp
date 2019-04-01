//多条件&分页  动态获取条件 及数据，按规划分页  数据模板替换 显示
$(function () {
    //条件数组获取 第一步
    var arrHospitalType = AjaxRemoteGetData.getDistinctType().slice(1); //去除数据表头(医院类型。。)
    var arrHospitalLevel = AjaxRemoteGetData.getDistinctLevel().slice(1);
    var arrHospitalArea = AjaxRemoteGetData.getDistinctArea().slice(1);
    //将获取到的数组数组放入html中
    $('.filter>.group>.condition').remove('.condition');
    //循环写入
    $.each(arrHospitalType, function (index, item) {
        $('.group').eq(0).append($('<a class="condition" href="#">' + item + '</a>'));
    });
    $.each(arrHospitalLevel, function (index, item) {
        $('.group').eq(1).append($('<a class="condition" href="#">' + item + '</a>'));
    });
    $.each(arrHospitalArea, function (index, item) {
        $('.group').eq(2).append($('<a class="condition" href="#">' + item + '</a>'));
    });

    //定义初始化数据
    var DataHospital=[];
    $('.filter').on('initData',function () {
        //获取多条件中选中的条件值
        var where = $(this);

        where.find('.condition').click(function () {
            // where.removeClass('.condition_focus');  //不能一次性将所有的选项去除高亮状态，一次一次点击
            var condition = $(this);
            var group = condition.parents('.group').eq(0); //三个总条件中的一个
            group.find('.condition').removeClass('condition_focus');
            condition.addClass('condition_focus');
            $('.filter').triggerHandler('reloadData');
            return false;
        });
        //触发数据加载
        $('.filter').triggerHandler('reloadData');
    })

        //数据重载 需要利用html模板进行数据替换
       .on('reloadData',function () {
           //获取条件
           var type = $('.filter>.group').eq(0).find('.condition_focus').text();
           var level = $('.filter>.group').eq(1).find('.condition_focus').text();
           var area = $('.filter>.group').eq(2).find('.condition_focus').text();
           //获取满足条件的数据
           DataHospital = AjaxRemoteGetData.getHospitalArrByFilter(type, level, area).slice(1);
           $('.pagination').triggerHandler('initPageNumber');

       });

    //	2. 分页设置事件监听 & 处理数据渲染
    var pageSize = 3; //	每页显示3条数据
    var pageCount = 0 ; // 总共n页
    var currentPage =0 ; // 当前显示第n页，0=1页
    $('.pagination')
        .on('initPageNumber',function(){

            pageCount = Math.ceil( DataHospital.length / pageSize );
            currentPage = 0;
            //	设置有几个数字页
            var page_wrap = $('.page_wrap',this);
            page_wrap.empty();//清空所有子节点，保留位置
            //利用循环添加页数
            for (var i=0;i<pageCount;i++){
                page_wrap.append($('<a href="#1" class="item item_page">'+(i+1)+'</a>'));
            }
            //共计几页
            $('.item_count',this).text('共计'+ pageCount +'页');
            $('.hospital-items').triggerHandler('render');
        })
        //处理首页 尾页等页码
        .on('initPage',function () {
            var pagination = $(this);
            var page_wrap = $('.page_wrap',pagination);

            //	首页、尾页
            $('.item_first',pagination).on('click',function () {
                currentPage = 0;
                $('.hospital-items').triggerHandler('render');
                return false;
            });
            $('.item_last',pagination).on('click',function () {
                currentPage = pageCount-1;
                $('.hospital-items').triggerHandler('render');
                return false;
            });
            //上一页 下一页
            $('.item_prev',pagination).on('click',function () {
                if (currentPage > 0){
                    currentPage = currentPage-1;
                    $('.hospital-items').triggerHandler('render');
                }
                return false;
            });
            $('.item_next',pagination).on('click',function () {
                if (currentPage < pageCount-1){
                    currentPage = currentPage+1;
                    $('.hospital-items').triggerHandler('render');
                }
                return false;
            });
            //页码 使用 delegate() 方法向尚未创建的元素添加事件处理程序
            $('.page_wrap').delegate('.item_page','click',function(){
                currentPage = $(this).index();
                $('.hospital-items').triggerHandler('render');
                return false;
            });
            //跳转至n页

            $('.input_submit').click(function () {
                var page_go = $('.input_page').val();
                currentPage = page_go-1;
                if(currentPage >= 0 && currentPage <pageCount){
                    $('.hospital-items').triggerHandler('render');
                }
                return false;
            });
        })
        .triggerHandler('initPage');
    //3、数据加载
    var template = $('#template_datalist_ite').html();
    $('.hospital-items').on('render',function () {

        $('.page_wrap>.item_page')
            .removeClass('item_page_focus')
            .eq(currentPage).addClass('item_page_focus');  //当前页

        var datalist = $(this);
        datalist.empty();
        //获取当前页数据 从结果数据中截取当前页至下一页的条目数
        var nowarr = DataHospital.slice(currentPage*pageSize,(currentPage+1)*pageSize);
        //当前页高亮显示页码
        for (var i=0,j=nowarr.length;i<j;i++){
            var d = nowarr[i];  //当前数组的每一项数据
            var objectData = {
                'area':d[0],'level':d[1],'type':d[2],
                'name':d[3],'address':d[4],'phone':d[5],
                'imgUrl':d[6],'time':d[7]
            };

            var html = template;
            //关键字在字典中遍历出item值
            for( k in objectData ){
                var v = objectData[k];
                html = html.replace('{'+k+'}',v);
            }
            datalist.append(html);
        }
    });
    $('.filter').triggerHandler('initData');
});


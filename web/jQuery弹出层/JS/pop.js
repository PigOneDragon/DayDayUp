$(function () {
    var login=$('.pop'),
        mask=$('#mask'),

        //不能在外部获取，此时表单未弹出，无法获取元素，应放在提交按钮函数下面获取value
       //subloginbtn=$('#loginSubmitBtn'),
        // subregebtn=$('#regeSubmitBtn'),
        // username=$("#lusername").val(),
        // password=$("#lpassword").val(),
        // username=$('input[name=username]').val(),
        //msg=$('.error-msg'),
        htmllogin=$('#loginHtml').html(),
        htmlrege=$('#regeHtml').html();

    //登录显示
    $('#loginbtn').click(function () {
        showLayer(htmllogin);
        $("#loginSubmitBtn").click(function(){
            var username = $("input[name='username']").val();
            var password = $("input[name='password']").val();
            if(username === 'imooc' && password === 'imooc'){
                alert("登录成功");
            }else{
                $(".error-msg").html("账号或密码输入错误");
            }
        });
    });
    //注册
    $('#regebtn').click(function () {
        showLayer(htmlrege);
        $("#regeSubmitBtn").click(function(){
            var repassword = $("input[name='repassword']").val();
            var password = $("input[name='password']").val();
            if(password === repassword && (password != "")){
                alert("注册成功");
            }else{
                $(".error-msg").html("账号或密码输入错误");
            }
        });
    });

    //点击关闭按钮隐藏
    $('.close').click(function () {
        closeLayer();
    });

    //封装函数
    function showLayer(Html) {
        login.show();
        mask.show();
        $('.content').html(Html);

    }
    function closeLayer() {
        login.hide();
        mask.hide();
        callback();
    }
    //回调函数  可以返回提交后的操作（例登录注册变成用户名等）
    function callback() {
        $(".error-msg").html("");
    }
});
$('#alertbar-seach').popover({
    html:true,
    content:text1()
});
$('#alertbar-form').popover({
    html: true,
    content: text2()
});
//自定义警告框样式
function text1() {
    var text1 = $('<div class="input-group">\n' +
        '                            <input type="text" class="form-control" style="width: 70%;float: left;"/>\n' +
        '                            <button class="input-group-addon btn btn-danger" style="width: 30%;height: 34px;">搜索</button>\n' +
        '                        </div>');
    return text1;
};
//自定义警告框样式
function text2() {
    var text2 = $('<form>\n' +
        '                        <div class="form-group">\n' +
        '                            <label for="exampleInputEmail1">Email</label>\n' +
        '                            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">\n' +
        '                        </div>\n' +
        '                        <div class="form-group">\n' +
        '                            <label for="exampleInputPassword1">Password</label>\n' +
        '                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">\n' +
        '                        </div>\n' +
        '                        <button type="submit" class="btn btn-default" style="width: 100%;background-color: #f07819;">登录</button>\n' +
        '                        <div class="checkbox">\n' +
        '                            <label>\n' +
        '                                <input type="checkbox"> 记住\n' +
        '                            </label>\n' +
        '                        </div>\n' +
        '                        <div class="form-text text-center">\n' +
        '                            新用户？<a href="#">注册</a> | 忘记密码？\n' +
        '                        </div>\n' +
        '                    </form>');
    return text2;
};
//
// // $('[data-toggle="popover"]').popover(
// //     {
// //         trigger: 'click', //触发方式
// //         template: '', //你自定义的模板
// //         title: "标题",//设置 弹出框 的标题
// //         html: true, // 为true的话，data-content里就能放html代码了
// //         content: "",//这里可以直接写字符串，也可以 是一个函数，该函数返回一个字符串；
// //     }
// // );
// $('[data-toggle="popover"]').popover({
//     html:true,
//     content:f3()
// });
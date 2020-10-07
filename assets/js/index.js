// 获取用户信息,并渲染到页面中
function renderUser() {
    $.ajax({
        url: '/my/userinfo',   
        success: function (res) {
            if (res.status === 0) {
                // 渲染用户名(优先使用nickname)
                let name = res.data.nickname || res.data.username;
                $('.username').text(name);
                //渲染头像
                if (res.data.user_pic) {
                    //有图片
                    $('.layui-nav-img').attr('src', res.data.user_pic).show();
                } else {
                    //无图片
                    let first = name.substr(0,1).toUpperCase();
                    $('.avatar').text(first).css('display', 'inline-block');
                }
            }
        },
    });
}
renderUser();

// ---------------退出功能-----------------
$('#logout').on('click', function () {
    // layer可以不加载的直接用的模块
    layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        //移除token
        localStorage.removeItem('token');
        //跳转到login界面
        location.href = '/login.html';
        layer.close(index);//关闭弹层
    });
});
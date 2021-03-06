//统一配置Ajax请求
$.ajaxPrefilter(function (option) {
    option.url = 'http://ajax.frontend.itheima.net' + option.url;
    //判断url有没有my
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
        option.complete = function (xhr) {
            if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
                // 说明用户使用了过期的或者虚假的token
                // 1.删除假token
                localStorage.removeItem('token');
                // 2.跳转到登录页
                location.href = '/login.html';
            }
        }
    }

})
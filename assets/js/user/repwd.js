//验证长度
//新旧密码不同
//两个新密码相同

let form = layui.form;
form.verify({
    len: [/\S{6,12}/, '长度必须为6~12位'],
    diff: function (val) {
        let oldPwd = $('.oldPwd').val();
        if (oldPwd === val) {
            return "新旧密码不能相同";
        }

    },
    same: function (val) {
        let newPwd = $('.newPwd').val();
        if (newPwd !== val) {
            return "两次新密码必须一致";
        }
    }
});

$('form').on('submit', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data:data,
        success: function (res) {
            //弹出层layer不需要加载
            layer.msg(res.message);
            if (res.status === 0) {
                $('form')[0].reset();
            }
        }
    })
})
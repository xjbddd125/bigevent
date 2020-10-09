let form = layui.form;

//数据回填
function renderForm() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            // $('input[name=username]').val(res.data.username);
            // $('input[name=nickname]').val(res.data.nickname);
            // $('input[name=email]').val(res.data.email);
            // formTest是lay-filter属性值
            // 对象的键是表单项name的属性值
            form.val('formTest', res.data);
        }
    });
}

renderForm();

$('form').on('submit', function (e) {
    e.preventDefault();
    // disabled状态的表单无法通过serialize收集数据
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        data: data,
        url: '/my/userinfo',
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                //调用父页面函数重新渲染
                window.parent.renderUser();
            }
        }

    });
})

$('button[type=reset]').on('click', function (e) {
    e.preventDefault();
    renderForm();
})
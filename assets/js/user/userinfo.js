//数据回填
function renderForm() {
    $.ajax({
        url: '/my/userinfo',
        success: function (res) {
            $('input[name=username]').val(res.data.username);
            $('input[name=nickname]').val(res.data.nickname);
            $('input[name=email]').val(res.data.email);
        }
    })
}
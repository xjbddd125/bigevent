function renderCategory() {
    $.ajax({
        url: '/my/article/cates',
        success: function (res) {
            let html = template('tpl-list', res);
            $('tbody').html(html);
        }
    })
}
renderCategory();

$('body').on('click', 'button:contains("删除")', function () {
    let id = $(this).data('id');
    layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
        $.ajax({
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status === 0) {
                    renderCategory();
                }
            }
        })

        layer.close(index);
    });
})
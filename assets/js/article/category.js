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
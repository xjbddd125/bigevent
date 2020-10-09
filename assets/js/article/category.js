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


//弹层效果
let addIndex;
$('button:contains("添加类别")').on('click', function () {
    addIndex=layer.open({
        type: 1,
        title: '调试',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    })
});

//确认添加
$('body').on('submit', '.add-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize,
        success: function (res) {
            layer.msg(res.message);
            if(res.status===0){
                renderCategory();
                layer.close(addIndex);
            }
        }
    })
});
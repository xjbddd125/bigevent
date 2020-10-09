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


//添加的弹层效果
let addIndex;
$('button:contains("添加类别")').on('click', function () {
    addIndex = layer.open({
        type: 1,
        title: '添加类别',
        content: $('#tpl-add').html(),
        area: ['500px', '250px']
    });
})

//确认添加
$('body').on('submit', '.add-form', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize,
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                layer.close(addIndex);
            }
        }
    });
});

//编辑的弹层效果
let editIndex;
$('body').on('click', 'button:contains("编辑")', function () {
    let data = $(this).data();
    data.Id = data.id;

    editIndex = layer.open({
        type: 1,
        title: '编辑类别',
        content: $('#tpl-edit').html(),
        area: ['500px', '250px'],
        //数据回填,需要在弹层之后再回填
        success: function () {
            // $('input[name=name]').val(data.name);
            // $('input[name=alias]').val(data.alias);
            // $('input[name=Id]').val(data.id);

            let form = layui.form;
            form.val('edit', data);
        }
    })
})



//确认修改
$('body').on('submit', '.edit-form', function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
        type: 'POST',
        data: data,
        url: '/my/article/updatecate',
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                renderCategory();
                layer.close(editIndex);
            }
        }
    });
})
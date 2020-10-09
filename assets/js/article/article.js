// 获取文章列表并渲染

let data = {
    pagenum: 1,
    pagesize: 2,
    // cate_id:'',
    // state:'',
};


function renderArticle() {
    $.ajax({
        url: '/my/article/list',
        data: data,
        success: function (res) {
            let html = template('tpl-list', res);
            $('tbody').html(html);
        }
    })
}
renderArticle();
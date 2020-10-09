//加载所需模块
let laypage = layui.laypage;
let form = layui.form;

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
            //ajax成功后调用showpage
            showPage(res.total);
        }
    })
}
renderArticle();

//分页
function showPage(t) {
    laypage.render({
        elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
        , count: t, //数据总数，从服务端得到
        limit: data.pagesize,
        limits:[2,5,10],
        curr: data.pagenum,//起始页,当前页
        layout: ['prev', 'page', 'next', 'count', 'limit', 'skip'],
        jump: function (obj, first) {
            //jump在刷新页面,页码切换时触发
            //jump第一次触发时,first是true,除此之外first是undefined
            if (first === undefined) {
                data.pagenum = obj.curr;
                data.pagesize = obj.limit;
                renderArticle();
            }
        }
    });
}
//发送请求获取分类
$.ajax({
    url: '/my/article/cates',
    success: function (res) {
        // console.log(res)
        var html = template('tpl-category', res)
        $('select[name=category]').html(html);
        // 调用layui的更新渲染方法
        form.render('select');
    }
});
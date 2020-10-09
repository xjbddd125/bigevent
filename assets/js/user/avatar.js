// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
  
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options);

$('button:contains("上传")').on('click',function(){
    $('#file').trigger('click');
})

$('#file').on('change',function(){
    let fileObj=this.files[0];
    let url=URL.createObjectURL(fileObj);
    // 先销毁再换图最后重建剪裁区
    $image.cropper('destroy').attr('src',url).cropper(options);
})
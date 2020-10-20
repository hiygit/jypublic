$(function(){
	//获取用户信息
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	
	//  保存图片
	var imgUrl = ""  //图片路径
	layui.use('upload', function() {
		var $ = layui.jquery,
			upload = layui.upload;
		var uploadInst = upload.render({
			elem: '#test1',
			url: publicjs + "/web/complaint/getSubmitFileUrl", //改成您自己的上传接口
			accept: 'images',
			field: "picFile", //设定文件域的字段名
			drag: false,
			before: function(obj) {
				//预读本地文件示例，不支持ie8
				obj.preview(function(index, file, result) {
					console.log(file)
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(data) {
				console.log(data)
				//上传成功
				if (data.errorCode == 0) {
					imgUrl = data.body.fileUrl
					console.log(imgUrl)
					return layer.msg(data.msg);
				}
				
			},
			error: function() {
				//演示失败状态，并实现重传
				var demoText = $('#demoText');
				demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
				demoText.find('.demo-reload').on('click', function() {
					uploadInst.upload();
				});
			}
		});
	})
	
	$("#submit").click(function() {
		var obj ={
			passengerId: jony.userId,
			problemDescription: $("#problemDescription").val(),
			pic: imgUrl,
			phone: $("#contactWay").val(),
		}
		if($("#problemDescription").val() == ""){
			layer.msg("请您描述遇到的问题")
		}else{
			$.ajax({
				type: "POST",
				dataType: "json",
				url: publicjs + "/web/complaint/submitSuggest",
				data: obj,
				success: function(data) {
					console.log(data)
					if (data.errorCode == 0) {
						layer.msg(data.msg)
						history.go(-1)
					}
				},
				error: function(data) {
					console.log(data)
				}
			})
		}
	})
})
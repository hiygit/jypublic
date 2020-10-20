$(function() {
	//获取用户信息
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)

	// 获取遇到的问题
	var twoText = decodeURI(window.location.search);
	var dataType = twoText.split("=")[1];
	
	var type = "" //获取遇到的问题时传的type
	if (dataType == 1) {
		type = "投诉线路信息遇到的问题"
		$(".buyBox-left").css({"display":"flex","flex-wrap":"wrap"})
		$(".buyBox-left li").css("width","50%")
	} else if(dataType == 2){
		type = "投诉车站信息遇到的问题"
		$(".buyBox-left").css({"display":"flex","flex-wrap":"wrap"})
		$(".buyBox-left li").css("width","50%")
			$("#lineTitle").html('有误车站<span class="asterisk">&nbsp; *</span>')
	}else if(dataType == 3){
		type = "投诉快件信息遇到的问题"
	}
	var objstr = {
		type: type
	}
	$.ajax({
		type: "POST",
		dataType: "json",
		url: publicjs + "/web/complaint/getProblemEncountered",
		data: objstr,
		headers: {
			"token": jony.token //此处放置请求到的用户token
		},
		success: function(data) {
			console.log(data)
			if (data.errorCode == 0) {
				if (data.body.DictValue.length != 0)
					var str = ""
				for (var i = 0; i < data.body.DictValue.length; i++) {
					str = `
						<li>
							<input class="iptChecked" type="checkbox" name="radio" id="radioNum-` + (i + 1) +
						`" value=""/>
							<label id="firstBookNum" for="radioNum-` + (i + 1) +
						`" class="radio-label"></label><span>` + data.body.DictValue[i].label + `</span>
						</li>
					`
					$(".buyBox-left").append(str)
					if(dataType == 1 || dataType == 2){
						$(".buyBox-left").css({"display":"flex","flex-wrap":"wrap"})
						$(".buyBox-left li").css("width","50%")
					}
				}
			}
		},
		error: function(data) {
			console.log(data)
		}
	})


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
					$('#demo1').attr('src', result); //图片链接（base64）
				});
			},
			done: function(data) {
				console.log(data)
				//如果上传失败
				if (data.errorCode == 0) {
					imgUrl = data.body.fileUrl
					console.log(imgUrl)
					return layer.msg(data.msg);
				}
				//上传成功
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
	
	// 点击提交
	$("#submit").click(function() {
		console.log(imgUrl)
		// 判断复选框是否选中
		var isChecked = $("input:checkbox").is(':checked')
		console.log(isChecked)

		var problemArr = [] //获取遇到的问题数组
		var problemEncountered = "" //获取遇到的问题
		$.each($('input:checkbox'), function() {
			if (this.checked) {
				problemArr.push($(this).siblings().text())
				problemEncountered = problemArr.join(",")
				console.log(problemEncountered)
			}
		});
		if (!isChecked) {
			layer.msg("请选择您遇到的问题")
		} else if ($("#lineNameDirection").val() == "") {
			layer.msg("请您填写丢失快件的线路及方向")
		} else if ($("#problemDescription").val() == "") {
			layer.msg("请您描述遇到的问题")
		} else if ($("#contactWay").val() == "") {
			layer.msg("请输入您的联系方式")
		} else if (!(/^1[3456789]\d{9}$/.test($("#contactWay").val()))) {
			layer.msg("请输入正确的手机号")
		} else {
			var obj = {
				passengerId: jony.userId,
				problemEncountered: problemEncountered,
				lineNameDirection: $("#lineNameDirection").val(),
				problemDescription: $("#problemDescription").val(),
				pic: imgUrl,
				phone: $("#contactWay").val(),
			}
			console.log(obj)
			if(dataType == 1){
				$.ajax({
					type: "POST",
					dataType: "json",
					url: publicjs + "/web/complaint/submitLine",
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
			}else if(dataType == 2){
				$.ajax({
					type: "POST",
					dataType: "json",
					url: publicjs + "/web/complaint/submitStation",
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
			}else if(dataType == 3){
				$.ajax({
					type: "POST",
					dataType: "json",
					url: publicjs + "/web/complaint/submitExpress",
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
		}
	
		
	
	
	})
})




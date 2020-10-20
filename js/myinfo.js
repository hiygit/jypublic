$(function(){	
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	// alert("jony:" + localStorage.getItem("name"))
	// alert("token:" + jony.token)
	var id
	var phone
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs+'/app/passenger/getPassengerInfo', //获取用户信息
		data: {
			phone: "18234556154",
			password: "123456"
		},
		headers: {
			"token": jony.token//此处放置请求到的用户token
		},
		success: function(res) {
			console.log(res)
			// alert(JSON.stringify(res))
			name = res.body.user.name
			id = res.body.user.id
			// sex = res.body.user.sex
			// phone = res.body.user.phone
			$("#sex").val(res.body.user.sex) 
			$("#phone").val(res.body.user.phone)
			$(".userpic").attr("src",res.body.user.headimg); 
			$("#userName").val(res.body.user.name);
			$("#idCard").val(res.body.user.idcardno);

			// if("sex" in res.body.user){
				if (res.body.user.sex == "0") {
					$("#sex").val("未知")
				} else if(res.body.user.sex == "1"){
					$("#sex").val("男")
				}else if(res.body.user.sex == "2"){
					$("#sex").val("女")
				}
			// }
		},
		error: function(res) {
			console.log(res)
		}
	});
	
	$("#sexBox").click(function(){
		$(".carPeople").show()
		$(".carPeople-tanc").show()
	})
	$(".carPeople-tanc p").click(function() {
		$("#sex").val($(this).text())
		$(".carPeople").hide()
		$(".carPeople-tanc").hide()
	})
	$(".preserve").click(function(){
		$("#userName").val();
		var oSex = $("#sex").val()
		// if (oSex == "未知") {
		// 	oSex = 0
		// } else 
		if(oSex == "男"){
			oSex = 1
		}else if(oSex == "女"){
			oSex = 2
		}
		var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
		if($("#idCard").val() == ""){
			layer.msg("请输入身份证号")
		}
		// else if(!reg.test($("#idCard").val())){
		// 	layer.msg("请输入正确的身份证号")
		// }
		else{
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs+'/app/passenger/savePassengerInfo', //保存用户信息
				data: {
					id: id,
					name: $("#userName").val(),
					// sex: oSex,
					// phone: phone
					sex: $("#sex").val(),
					phone: $("#phone").val(),
					idcardno: $("#idCard").val()
				},
				headers: {
					"token": jony.token//此处放置请求到的用户token
				},
				success: function(res) {
					console.log(res)
					layer.msg(res.msg)
					// location.href = "index_index.html"
				},
				error: function(res) {
					console.log(res)
				}
			});
		}
	})
	
	
	
	// 用户实名认证 2020-08-10
	//身份证正面（左）
	function changeLeftpic() {
		$('#image-left').css({
			display: 'none'
		});
		var reads = new FileReader();
		idCardFrond = document.getElementById('input-image').files[0];
		if(idCardFrond != undefined){
			reads.readAsDataURL(idCardFrond);
		}else{
			layer.msg("请上传身份证照片")
		}
		reads.onload = function(e) {
			document.getElementById('left-img').src = this.result;
			$('#left-img').css({
				display: 'block'
			});
			$('.left-delete-image').css({
				display: 'block'
			});
			$('#input-image').parent().removeClass('warn');
		};
	}
	
	//身份证反面（右）
	function changeRightpic() {
		$('#image-right').css({
			display: 'none'
		});
		var reads = new FileReader();
		idCardBack = document.getElementById('input-image-other').files[0];
		if(idCardBack != undefined){
			reads.readAsDataURL(idCardBack);
		}else{
			layer.msg("请上传身份证照片")
		}
		
		reads.onload = function(e) {
			document.getElementById('right-img').src = this.result;
			
			$('#right-img').css({
				display: 'block'
			});
			$('.right-delete-image').css({
				display: 'block'
			});
			$('#input-image-other').parent().removeClass('warn');
		};
	}
	// 此处调用
	$('#input-image').change(function() {
		changeLeftpic($(this));
	})
	$('#input-image-other').change(function() {
		changeRightpic($(this));
	})
	
	$("#baocun").click(function(){
		// loading层 加载动画
		
		if($("#phone").val() == ""){
			layer.msg("请输入手机号")
		}else if(!(/^1[3456789]\d{9}$/.test($("#phone").val()))){
			layer.msg("请输入正确的手机号")
		}else{
			// changeLeftpic($(this));
			// changeRightpic($(this));
			// var tishi = layer.msg('正在加载中...', {
			// 	icon: 16
			// 	,shade: 0.3
			// 	,time: false
			// });
			var formData = new FormData()
			formData.append('passengerId',jony.userId)
			formData.append('name',jony.userName)
			formData.append('idcardno', $("#idCard").val())
			formData.append('idCardFrond',idCardFrond)
			formData.append('idCardBack',idCardBack)
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs+'/web/login/workauthentication', 
				data: formData,
				processData:false,
				contentType: false,
				success: function(res) {
					console.log(res)
					// layer.close(tishi);  //最后数据加载完 让loading层消失					
					layer.msg(res.msg)
				},
				error: function(res) {
					console.log(res)
				}
			});
		}
	})
	
	
	
})
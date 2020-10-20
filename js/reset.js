$(function() {
	var AddInterValObj; //timer变量，控制时间
	var adcount = 60; //间隔函数，1秒执行
	var addCount; //当前剩余秒数
	var yzmstr = "";
		//timer处理函数
	function SetAddnTime() {
		if (addCount == 0) {
			window.clearInterval(AddInterValObj); //停止计时器
			$("#addSendCode").removeAttr("disabled"); //启用按钮
			$("#addSendCode").val("重新获取验证码").css({
				"background-color": "#51BDFF"
			});
		} else {
			addCount--;
			$("#addSendCode").val("" + addCount + "秒后重新获取").css({
				"background-color": "#D1D4D3"
			});
		}
	}
	$("#updateBtn").click(function(){
		var myreg = /^1[3-9]+\d{9}$/;
		if (!myreg.test($("#utel").val())) {
			// layertest('请输入有效的手机号码')
			$("#tishimodal").show();
			$("#tishitit").html('请输入有效的手机号码');
			return false;
		}else{
			addCount = adcount;
			//设置button效果，开始计时
			$(this).attr("disabled", "true");
			$(this).val("" + addCount + "秒后重新获取").css({
				"background-color": "#D1D4D3"
			});
			AddInterValObj = window.setInterval(SetAddnTime, 1000);
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: 'http://manager.qgxlife.com/app/sendnote/shop/phonenote', //目标地址   验证码接口
				data: {
					phone: $("#utel").val()
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				error: function(data) {
					console.log(data)
				},
				success: function(msg) {
					console.log(msg)
					yzmstr = msg.body.randomCode
				}
			});
		}
	});
	
	$('.closemodal').click(function(){
		$("#tishimodal").hide();
	})
	$('#updateBtn').click(function(){
		if($("#utel").val() == ""){
			$("#tishimodal").show();
			$("#tishitit").html('手机号不能为空');
		}else if($("#code").val() == ""){
			$("#tishimodal").show();
			$("#tishitit").html('请输入验证码');
		}else if($("#code").val() != yzmstr){	
			$("#tishimodal").show();
			$("#tishitit").html('验证码不正确');
		}
		else{
			 $.ajax({
			 　　type: "POST", //用POST方式传输
			 　　dataType: "JSON", //数据格式:JSON 
			 　　url: 'http://manager.qgxlife.com/app/workUserRegisterOrlogin/workUserRegisterOrlogin', //目标地址 
			　　 data: {
					phone:$("#utel").val(),
					yzCode:$("#code").val(),
				},
				headers: { 
					'Content-Type': 'application/x-www-form-urlencoded' 
				},  
			　　 error: function (data) { 
					console.log(data)
				},
			 　　success: function (msg){
					console.log(msg)
					location.href="../down/index_gong.html"
				}
			 });
			
		}
	})
})

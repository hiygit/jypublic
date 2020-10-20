$(function() {
	var oBackmsg = JSON.parse(localStorage.getItem("names"));  //为了登录接口传值接的缓存
	// alert("oBackmsg:" + JSON.stringify(oBackmsg))
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
				"background-color": "#D1D4D3",
				"color": "#000"
			});
		}
	}
	$("#addSendCode").click(function(){
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
				"background-color": "#D1D4D3",
				"color": "#000"
			});
			AddInterValObj = window.setInterval(SetAddnTime, 1000);
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs + '/app/sendnote/passenger/phonenote', // 验证码接口
				data: {
					phone: $("#utel").val()
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				success: function(res) {
					console.log(res)
					// yzmstr = msg.body.randomCode
				},
				error: function(res) {
					console.log(res)
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
		}else{
			 $.ajax({
			 　　type: "POST", //用POST方式传输
			 　　dataType: "JSON", //数据格式:JSON 
			 　　url: publicjs + '/app/passenger/loginCode',  //登录接口
			　　 data: {
					phone:$("#utel").val(),
					yzCode:$("#code").val(),
				    openid: oBackmsg.openid,
				    openid: oBackmsg.openid,
				    nickname: oBackmsg.nickname,
				    headimgurl: oBackmsg.headimgurl,
				    sex: oBackmsg.sex
				},
				headers: { 
					'Content-Type': 'application/x-www-form-urlencoded' 
				},  
			 　　success: function (res){
					console.log(res)
				    if (res.errorCode == -4) {
						$("#tishimodal").show();
						$("#tishitit").text(res.msg);
				    }
					var jony = {
						"userId": res.body.userId,
						"userPic": res.body.userPic,
						"userName": res.body.userName,
						"phone": res.body.phone,
						"totaltripnums": res.body.totaltripnums,
						"token": res.body.token,
						"openId": res.body.openId
					}
					jony = JSON.stringify(jony)
					console.log(jony)
					localStorage.setItem("name", jony)
					location.href = "index_index.html"
			   },
			　　error: function (res) { 
					console.log(res)
				},
			 });
		}
	})
	
	
	// 点击选择 +86 +852
	$(".xuanze").click(function(){
		$(".xuanze-bigbox").show()
	})
	$(".xuanze-bigbox").click(function(){
		$(".xuanze-bigbox").hide()
	})
	$('.white-box p span').on("click",function(){
		 $(".xuanze").html($(this).text())
	})
	
	// 点击我已阅读
	$("#checkbox-id").click(function(){
		if($('#checkbox-id').is(':checked')) {
			$("#updateBtn").show()
			$("#updateBtnNo").hide()
		}else{
			$("#updateBtn").hide()
			$("#updateBtnNo").show()
		}
	})

})

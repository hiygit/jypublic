$(function() {
	var oBackmsg = JSON.parse(localStorage.getItem("name"));  //授权页面的缓存  name所有页面接收的缓存
	console.log(oBackmsg)
	if (oBackmsg){  //有缓存
		location.href = "index_index.html"
		return false
	}else{  //无缓存
		$("#big").show()
		// 微信登录
		var appid = "wx188ef517577b44e0"
		// var appid = "wxabb51abef9f88c12"  //服务器
		var code = "";
		var local = window.location.href; // 获取页面url
		code = getUrlCode().code; // 截取code
		if (code == null || code === "") {
			// 如果没有code，则去请求
			window.location.href =
				`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
		}
		// alert("code:" + code)
		$(".wxgreen").click(function() {
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs+'/app/passenger/wxopenid?code=' + code,  //获取用户信息  没有获取到code
				data: {},
				success: function(data) {
					console.log(data)
					// alert('data:' + JSON.stringify(data))
					if (data.errorCode == -1) {
						var oBackmsg = {
							openid: data.body.openid,
							nickname: data.body.nickname,
							headimgurl: data.body.headimgurl,
							sex: data.body.sex
						}
						var oBackmsgjson = JSON.stringify(oBackmsg)
						localStorage.setItem("names", oBackmsgjson)   //names为了给手机号页面传值设置的缓存
						// $(".wxgreen").click(function () {
							location.href = "verification_code.html"
						// })
					}
				},
				error: function(data) {
					console.log(data)
				}
			})
		})
	}
	
	function getUrlCode() {
		// 截取url中的code方法
		var url = window.location.search;//www.jycct.cn
		var theRequest = new Object();
		if (url.indexOf("?") != -1) {
			var str = url.substr(1);
			var strs = str.split("&");
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
			}
		}
		return theRequest;
	}
	
	// 手机号登录
	$(".iphone-box").click(function() {
		location.href = "verification_code.html"
	})
})

$(function() {
	var oBackmsg = JSON.parse(localStorage.getItem("names"));  //为了登录接口传值接的缓存
	//刚进页面获取到的上个页面的值
	var name = JSON.parse(localStorage.getItem("name"));
	// console.log(name)
	var jony = JSON.parse(localStorage.getItem("name"));
	var homeCache = localStorage.getItem("orderArrys")
	var twoText = decodeURI(window.location.search);
	console.log(window.location.host)
	var types = twoText.split("=")[1]
	var paystatus
	var sockettype = "5";//通讯类型	
	console.log(types)
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/passenger/orderDetail', //订单详情
		data: {
			orderId: types,
		},
		headers: {
			"token": jony.token //此处放置请求到的用户token
		},
		success: function(res) {
			console.log(res)
			//乘客信息
			$("#peoplenum").val(res.body.orderDetail.nums + "人")
			$("#cfcity").text(res.body.orderDetail.startCity)
			$("#endcity").text(res.body.orderDetail.endCity)
			$("#datetime").val(res.body.orderDetail.starttime)
			$("#jtcfcity").text(res.body.orderDetail.startaddress)
			$("#jtendcity").text(res.body.orderDetail.endaddress)
			$("#moneynum").text(res.body.orderDetail.unitprice)
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1 < 10 ? "0" + (myDate.getMonth() + 1) : (myDate.getMonth() + 1); //获取当前月
			var date = myDate.getDate() < 10 ? "0" + myDate.getDate() : myDate.getDate(); //获取当前日
			var h = myDate.getHours(); //获取当前小时数(0-23)
			var m = myDate.getMinutes() <10 ? "0" + myDate.getMinutes(): myDate.getMinutes();; //获取当前分钟数(0-59)
			var s = myDate.getSeconds() < 10 ? "0" + myDate.getSeconds() : myDate.getSeconds(); //获取当前秒
			// console.log(myDate)
			$("#datetime").val(year + "-" + mon + "-" + date + " " + h + ":" + m + ":" + s);
			
			// 合计
			var totals = (res.body.orderDetail.nums * $("#moneynum").text()).toFixed(2);
			$("#sum").val(totals)
			// console.log(totals)
			paystatus = res.body.orderDetail.paystatus
			if (res.body.orderDetail.orderStatus == "0") { //待付款
				$(".waiting").hide()
				$("#wait").hide()
				$("#orderno").show()
				$("#payment").show()
				//点击立即付款
				$("#payment").click(function () {
					$.ajax({
						type: "POST", //用POST方式传输
						dataType: "JSON", //数据格式:JSON
						url: publicjs + '/app/passenger/paymentport', //立即付款
						// url: "https://api.mch.weixin.qq.com/pay/unifiedorder ",
						data: {
							orderId: types,
							money: $("#sum").val(),
							key: 1,
							passengerId: name.userId,
							tradetype: "JSAPI",
							openid: oBackmsg.openid
						},
						headers: {
							"token": jony.token //此处放置请求到的用户token   1bcf37bc6d9b4bbe9fce62cd90bc7137
						},
						success: function(data) {
							console.log(data)
							// 微信接口实例
							function onBridgeReady() {
								// console.log(res)
								WeixinJSBridge.invoke('getBrandWCPayRequest', {
									"appId" : data.body.appId, //公众号名称，由商户传入
									"timeStamp" : data.body.timeStamp, //时间戳，自1970年以来的秒数
									"nonceStr" : data.body.nonceStr, //随机串
									"package" : data.body.packages,
									"signType" : "MD5", //微信签名方式：
									"paySign" : data.body.sign
									//微信签名
								}, function(res) {
									if (res.err_msg == "get_brand_wcpay_request:ok") {
										$.post("/app/passenger/notifyWx", {
										});
										window.location.reload() //刷新当前页面.
										//WeixinJSBridge.call('closeWindow');//关闭页面
									} else {
										//WeixinJSBridge.call('closeWindow');//关闭页面
									} // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
								})

							}
							// 调用微信接口
							if (typeof WeixinJSBridge == "undefined") {
								if (document.addEventListener) {
									document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
								} else if (document.attachEvent) {
									document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
									document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
								}
							} else {
								onBridgeReady();
							}
							// 根据errorCode判断订单是否支付成功
							
							
							if (res.errorCode == 0) {
								$("#tishimodal").show()
								$("#tishimodal").html("支付成功")
								$("#tishimodal").css({
									"width": "50%",
									"line-height": "2rem",
								});
								setTimeout(function() {
									$("#tishimodal").hide()
									$("#payment").hide()
									$(".waiting").show()
									$("#pay-left").css("color", "#E9753B")
									$("#pay-left").text("已付款")
									$("#pay-leftimg").attr("src", "../images/moneycheng.png")
									$("#orderno").click(function() { // 已付款页面的取消订单
										$(".cancelOrder-body").show()
										$("#cancelOreder-hint").text("当前订单还未派车成功，您可以免费取消订单，确认要取消当前订单吗？")
									})
								}, 2000)
							}
							else {
								$("#tishimodal").show()
								$("#tishimodal").html("支付失败")
								$("#tishimodal").css({
									"width": "50%",
									"line-height": "2rem",
								})
								setTimeout(function() {
									$("#tishimodal").hide()
								}, 2000)
							}
						},
						error: function(res) {
							console.log(res)
						}
					});
				})
			} else if (res.body.orderDetail.orderStatus == "1") { //待派车
				$("#pay-left").text("已付款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#payment").text("等待派车")
				$("#orderno").click(function() { // 已付款页面的取消订单
					$(".cancelOrder-body").show()
					$("#cancelOreder-hint").text("当前订单还未派车成功，您可以免费取消订单，确认要取消当前订单吗？")
				})
				// 长连接 socket
				var longlinks = {
					"type":sockettype,
					"driverId":jony.userId
				}
				//var socket = new WebSocket("ws://192.168.1.11:8080/websocketPassenger");
				var socket = new WebSocket("ws://www.jycct.cn/websocketPassenger");
				socket.onopen = function(){
					var msgstr = JSON.stringify(longlinks)
					socket.send(msgstr)
					console.log("chengg")
				}
				socket.onmessage  = function(res){
					console.log(res)
					var datatypes = JSON.parse(res.data)
					console.log(datatypes)
					if (datatypes.type == 7) {
						sockettype = 6
						setTimeout(function() {
							window.location.reload();
						}, 1500)
					}
				}
				setTimeout(function() {
					window.location.reload();
				}, 10000)
			} else if (res.body.orderDetail.orderStatus == "2") { //待上车
				//司机信息
				$(".driver-box").show()
				$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
				$("#driveryears").text(res.body.orderDetail.driver.driveryears)
				$("#name").text(res.body.orderDetail.driver.name)
				$("#carno").text(res.body.orderDetail.driver.car.carno)
				$("#cartype").text(res.body.orderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面
				$("#orderno").show()
				$("#pay-left").text("已付款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#payment").hide()
				$(".driAddress").show()
				$("#orderno").click(function() { // 查看司机 取消订单
					$(".cancelOrder-body").show()
					$("#cancelOreder-hint").text("当前订单已成功派车，您目前可以免费取消订单，当5分钟后,则不可以免费取消,确认要取消当前订单吗？")
				})
				$("#quxiao").click(function() { //取消按钮
					$(".cancelOrder-body").hide()
				})
				$("#sure").click(function() { //确认按钮
					$(".cancelOrder-body").hide()
					// 判断是否支付
					console.log(paystatus)
					var path = ['/app/passenger/delOrder','/app/passenger/refund']

					$.ajax({
						type: "POST", //用POST方式传输
						dataType: "JSON", //数据格式:JSON
						url: publicjs + path[paystatus], //未付款取消订单
						// url: "api.mch.weixin.qq.com/pay/unifiedorder",
						data: {
							orderId: request,
						},
						headers: {
							"token": jony.token //此处放置请求到的用户token   1bcf37bc6d9b4bbe9fce62cd90bc7137
						},
						success: function(res) {
							console.log(res)
							// 根据errorCode判断订单是否成功取消
							if (res.errorCode == "0") {
								$(".cancelOrder-body").hide()
								$("#tishimodal").show()
								$("#tishimodal").html("订单取消成功")
								$("#tishimodal").css({
									"width": "50%",
									"line-height": "2rem",
								})
								setTimeout(function() {
									$("#tishimodal").hide()
									location.href = "index_index.html"
								}, 2000)
							} else if (res.errorCode == "-1") {
								$(".cancelOrder-body").hide()
								$("#tishimodal").show()
								$("#tishimodal").html("订单取消失败")
								$("#tishimodal").css({
									"width": "50%",
									"line-height": "2rem",
								})
								setTimeout(function() {
									$("#tishimodal").hide()
								}, 2000)
							}
						},
						error: function(res) {
							console.log(res)
						}
					});
				})
				$(".driAddress").click(function() { // 已付款页面的取消订单
					location.href = "driver.html?orderIds=" + types
				})
			} else if (res.body.orderDetail.orderStatus == "3") { //进行中
				//司机信息
				$(".driver-box").show()
				$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
				$("#driveryears").text(res.body.orderDetail.driver.driveryears)
				$("#name").text(res.body.orderDetail.driver.name)
				$("#carno").text(res.body.orderDetail.driver.car.carno)
				$("#cartype").text(res.body.orderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面
				$("#pay-left").text("已付款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#pay-right").text("已上车")
				$("#pay-right").css("color", "#1E6FDD")
				$("#pay-rightimg").attr("src", "../images/gocar.png")
				$("#orderno").hide()
				$("#payment").hide()
				$(".curposi").show()
				$(".curposi").click(function () {
					location.href = "driver.html?orderIds=" + types
				})
			} 
			else if (res.body.orderDetail.orderStatus == "4") { //待评价
				var evaluateId = res.body.orderDetail.id
				// console.log(driver)
				// var driver = {}
				// driver.driId = res.body.orderDetail.driver.car.id
				var driName = res.body.orderDetail.driver.name
				var driveryears = res.body.orderDetail.driver.driveryears
				var headimg = res.body.orderDetail.driver.headimg
				var carno = res.body.orderDetail.driver.car.carno
				var driverphone = res.body.orderDetail.driver.phone
				var cartype = res.body.orderDetail.car.cartype

				console.log(headimg)
				console.log(driveryears)
				$("#orderno").hide()
				$(".waiting").hide()
				$('.immediate_eval').show()
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#pay-right").text("已下车")
				$("#pay-right").css("color", "#62BD8B")
				$("#pay-rightimg").attr("src", "../images/greenpeo.png")
				$("#payment").text("立即评价")
				//司机信息
				$(".driver-box").show()
				$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
				$("#driveryears").text(res.body.orderDetail.driver.driveryears)
				$("#name").text(res.body.orderDetail.driver.name)
				$("#carno").text(res.body.orderDetail.driver.car.carno)
				$("#cartype").text(res.body.orderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面
				$("#evaluate").click(function(){
					// location.href = "evaluate.html?=evaluateId" + evaluateId + "&driName=" + driName + "&driveryears=" + driveryears + "&headimg=" + headimg + "&carno=" + carno + "&driverphone=" + driverphone
					location.href = "evaluate.html?evaluateId=" + evaluateId +  "&driName=" + driName + "&driveryears=" + driveryears +  "&headimg=" + headimg + "&carno=" + carno + "&cartype=" + cartype + "&driverphone=" + driverphone
				})
			} else if (res.body.orderDetail.orderStatus == "5") {  //已取消分两种情况：1、已完成  2、已取消
				if(res.body.orderDetail.quitodrdertime == null){  //已完成 
					var pfhtml="";
					$(".pj-text").text(res.body.orderDetail.passengerEvaluate.content)
					var scores = (res.body.orderDetail.passengerEvaluate.score)*1
					for(var i=1;i<=scores;i++){     
						pfhtml+='<img src="../images/lanxing.png" >'
					}
					for(var j=1;j<=5-scores;j++){
						pfhtml+='<img src="../images/xingx.png" >'
					}
					$(".xx-box").html(pfhtml)
					//司机信息
					$(".driver-box").show()
					$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
					$("#driveryears").text(res.body.orderDetail.driver.driveryears)
					$("#name").text(res.body.orderDetail.driver.name)
					$("#carno").text(res.body.orderDetail.driver.car.carno)
					$("#cartype").text(res.body.orderDetail.car.cartype)
					$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面
					$(".finish").show()
					$("#ordernot, #payment,#order").hide()
					$("#payment").hide()
					$(".order").hide()
					$(".finish").text("完成")
					$("#pay-left").css("color", "#E9753B")
					$("#pay-leftimg").attr("src", "../images/moneycheng.png")
					$("#pay-right").text("已下车")
					$("#pay-right").css("color", "#62BD8B")
					$("#pay-rightimg").attr("src", "../images/greenpeo.png")
					$(".pj-bigbox").show()
					$(".pj-text").text()
				}else{    //已取消
					//司机信息
					$(".driver-box").show()
					$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
					$("#driveryears").text(res.body.orderDetail.driver.driveryears)
					$("#name").text(res.body.orderDetail.driver.name)
					$("#carno").text(res.body.orderDetail.driver.car.carno)
					$("#cartype").text(res.body.orderDetail.car.cartype)
					$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面
					$("#orderno").hide()
					$("#payment").text("订单已取消")
					// $(".driver-box").show()
					// $("#payment").text("订单取消，已退款")
				}
			}else if(res.body.orderDetail.orderStatus == "6"){
				$("#orderno").hide()
				$(".waiting").hide()
				$("#wait").hide()
				$("#payment").text("订单取消,已退款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-left").text("已支付")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				//司机信息
				$(".driver-box").show()
				$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
				$("#driveryears").text(res.body.orderDetail.driver.driveryears)
				$("#name").text(res.body.orderDetail.driver.name)
				$("#carno").text(res.body.orderDetail.driver.car.carno)
				$("#cartype").text(res.body.orderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面

				// $("#payment").hide()
			}
		},
		error: function(res) {
			console.log(res)
		}
	});


	// 点击未付款取消订单
	$("#orderno").click(function() {
		$(".cancelOrder-body").show()
		$("#cancelOreder-hint").text("当前订单未支付，确定要取消当前订单吗？")
	})
	$("#quxiao").click(function() { //取消按钮
		$(".cancelOrder-body").hide()
	})
	$("#sure").click(function() { //确认按钮
		$(".cancelOrder-body").hide()
		// 判断是否支付
		console.log(paystatus)
		var path = ['/app/passenger/delOrder','/app/passenger/refund']
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON
			url: publicjs + path[paystatus], //未付款取消订单
			// url: "api.mch.weixin.qq.com/pay/unifiedorder",
			data: {
				orderId: types,
			},
			headers: {
				"token": jony.token //此处放置请求到的用户token   1bcf37bc6d9b4bbe9fce62cd90bc7137
			},
			success: function(res) {
				console.log(res)
				// 根据errorCode判断订单是否成功取消
				if (res.errorCode == "0") {
					$(".cancelOrder-body").hide()
					$("#tishimodal").show()
					$("#tishimodal").html("订单取消成功")
					$("#tishimodal").css({
						"width": "50%",
						"line-height": "2rem",
					})
					setTimeout(function() {
						$("#tishimodal").hide()
						location.href = "index_index.html"
					}, 2000)
				} else if (res.errorCode == "-1") {
					$(".cancelOrder-body").hide()
					$("#tishimodal").show()
					$("#tishimodal").html("订单取消失败")
					$("#tishimodal").css({
						"width": "50%",
						"line-height": "2rem",
					})
					setTimeout(function() {
						$("#tishimodal").hide()
					}, 2000)
				}
			},
			error: function(res) {
				console.log(res)
			}
		});
	})

})

$(function() {
	//刚进页面获取到的上个页面的值
	var name = JSON.parse(localStorage.getItem("name"));
	var jony = JSON.parse(localStorage.getItem("name"));
	var oBackmsg = JSON.parse(localStorage.getItem("names"));  //为了登录接口传值接的缓存
	// alert("oBackmsg:" + JSON.stringify(oBackmsg))
	// alert("openid:" + oBackmsg.openid)
	var homeCache = localStorage.getItem("orderArrys")
	var twoText = decodeURI(window.location.search);
	console.log(twoText)
	var request;
	var orderStatus;
	var paystatus;
	var ridestatus;
	var sockettype = "5";//通讯类型	
	function orderlook(){
		if (twoText == "") {
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs + '/app/passenger/getHaveInHandOrder', //获取乘客正在进行中的订单
				// url: publicjs + '/app/passenger/orderDetail', //获取乘客正在进行中的订单
				data: {
				},
				headers: {
					"token": jony.token //此处放置请求到的用户token
				},
				success: function(res) {
					if(res.errorCode != -1){
						// alert(JSON.stringify(res))
						// alert(res.body.orderDetail.orderStatus)
						console.log(res)
						var orderIds = res.body.orderDetail.id
						request = res.body.orderDetail.id
						orderStatus = res.body.orderDetail.orderStatus // 状态
						paystatus = res.body.orderDetail.paystatus //是否支付
						ridestatus = res.body.orderDetail.ridestatus //是否上车
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
						if(res.body.orderDetail.orderStatus == 0){    //未付款
							$("#orderno").show()
							$("#payment").show()
							$(".waiting").hide()
						}else if(res.body.orderDetail.orderStatus == 1){    //待派车
							$("#payment").hide()
							$(".driAddress").hide()
							$("#orderno").show()
							$(".waiting").show()
							$("#pay-left").css("color", "#E9753B")
							$("#pay-left").text("已付款")
							$("#pay-leftimg").attr("src", "../images/moneycheng.png")
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
										// orderlook();
										window.location.reload()
									}, 1500)
								}
							}
							setTimeout(function() {
								// orderlook();
								window.location.reload()
							}, 3000)
						}else if(res.body.orderDetail.orderStatus == 2){   //待上车
							$("#orderno").show()
							console.log(orderIds)
							$("#driverInfosa").show();
							$("#driveryears").text(res.body.orderDetail.driver.driveryears)
							$("#driver-head").attr("src",res.body.orderDetail.driver.headimg)
							$("#name").text(res.body.orderDetail.driver.name)
							$("#carno").text(res.body.orderDetail.dr).text(res.body.orderDetail.car.cartype)
							$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面

							$("#payment").hide()
							$(".waiting").hide()
							$(".driAddress").show()
							$("#pay-left").css("color", "#E9753B")
							$("#pay-left").text("已付款")
							$("#pay-leftimg").attr("src", "../images/moneycheng.png")
							$("#orderno").click(function() { // 查看司机 取消订单
								$(".cancelOrder-body").show()
								$("#cancelOreder-hint").text("当前订单已成功派车，您目前可以免费取消订单，当5分钟后,则不可以免费取消,确认要取消当前订单吗？")
							})
							$(".driAddress").click(function() { // 已付款页面的取消订单
								location.href = "driver.html?orderIds=" + orderIds
							})
						}else if(res.body.orderDetail.orderStatus == 3){      //进行中
							$("#payment").hide()
							$(".waiting").hide()
							$("#orderno").hide()
							$(".curposi").show()
							$("#driverInfosa").show();
							$("#driveryears").text(res.body.orderDetail.driver.driveryears)
							$("#driver-head").attr("src",res.body.orderDetail.driver.headimg)
							$("#name").text(res.body.orderDetail.driver.name)
							$("#carno").text(res.body.orderDetail.driver.car.carno)
							$("#cartype").text(res.body.orderDetail.car.cartype)
							$("#driverphone").attr("href",'tel:'+res.body.orderDetail.driver.phone)  //跳转到拨打电话页面
							$("#pay-left").css("color", "#E9753B")
							$("#pay-left").text("已付款")
							$("#pay-leftimg").attr("src", "../images/moneycheng.png")
							if(res.body.orderDetail.ridestatus == 1){
								$("#pay-right").text("已上车")
								$("#pay-right").css("color", "#1E6FDD")
								$("#pay-rightimg").attr("src", "../images/gocar.png")
							}
							$(".curposi").click(function() {
								location.href = "driver.html?orderIds=" + orderIds
							})
						}
					}else{
						// $(".cancelOrder-body").css("background","#f0f0f0")
						// $("#orderno").click(function() {
							$(".cancelOrder-title").text("订单已结束")
							$(".cancelOrder-body").show()
							$("#cancelOreder-hint").text("此订单已完成，请到我的行程查看")
						// })
						$("#quxiao").click(function() { //取消按钮
							$(".cancelOrder-body").hide()
						})
						$("#sure").click(function() { //取消按钮
							location.href = "myjournery.html"
						})
					}
				},
				error: function(res) {
					console.log(res)
				}
			});
		} else {
			var types = twoText.split("&")
			console.log(types)
			var arrs = [];
			types.map(function(list) {
				arrs.push(JSON.parse(list.split("=")[1]))
			})
			request = arrs[1].id
			orderStatus = arrs[1].orderStatus
			paystatus = arrs[1].paystatus
			ridestatus = arrs[1].ridestatus
			console.log(arrs)
			$("#peoplenum").val(arrs[0].nums + "人")
			$("#cfcity").text(arrs[0].startCity)
			$("#endcity").text(arrs[0].endCity)
			$("#datetime").val(arrs[0].starttime)
			$("#jtcfcity").text(arrs[1].startaddress)
			$("#jtendcity").text(arrs[1].endaddress)
			$("#moneynum").text(arrs[1].unitprice)
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日
			var h = myDate.getHours(); //获取当前小时数(0-23)
			var m = myDate.getMinutes(); //获取当前分钟数(0-59)
			var s = myDate.getSeconds(); //获取当前秒
			// console.log(myDate)
			$("#datetime").val(year + "-" + mon + "-" + date + " " + h + ":" + m + ":" + s);
			// 合计
			var totals = (arrs[0].nums * $("#moneynum").text()).toFixed(2);
			$("#sum").val(totals)
			// console.log(totals)
		}
	}
	orderlook();
	// 点击页面立即付款
	$("#payment").click(function() {
		// console.log(request)
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON 
			url: publicjs + '/app/passenger/paymentport', //立即付款
			// url: "https://api.mch.weixin.qq.com/pay/unifiedorder ",
			data: {
				orderId: request,
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
	
	// 点击未付款取消订单
	$("#orderno").click(function() {
		console.log(request)
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
	
})


$(function(){
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var oBackmsg = JSON.parse(localStorage.getItem("names"));  //为了登录接口传值接的缓存
	// alert("oBackmsg:" + JSON.stringify(oBackmsg))
	// alert("openid:" + oBackmsg.openid)
	var twoText = window.location.search;
	expressOrderId = twoText.split("=")[1]
	var totalprice
	// orderstatus：2  长连接
	var sockettype = "8";//通讯类型
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/express/orderDetail', 
		data: {
			orderId: expressOrderId
		},
		success: function(res) {
			console.log(res)
			if (res.body.expressOrderDetail.expressPayWay == 0) {
				$("#consigneePay").text("寄付");
				$("#headerPayWay").text("支付成功")
			}else if(res.body.expressOrderDetail.expressPayWay == 1){
				$("#consigneePay").text("到付");
				$("#headerPayWay").text("到付")
				$("#headerPayWay").css("color","#F15F23")
			}
			var evaluateId = res.body.expressOrderDetail.id
			$("#consigneeName").text(res.body.expressOrderDetail.consigneeName);
			$("#mailingDetailAddress").text(res.body.expressOrderDetail.mailingDetailAddress);
			$("#consigneeDetailAddress").text(res.body.expressOrderDetail.consigneeDetailAddress);
			// $("#expressPayWay").text(res.body.expressOrderDetail.expressPayWay);
			$("#orderNumber").text(res.body.expressOrderDetail.orderNumber);
			$("#createDate").text(res.body.expressOrderDetail.createDate);
			$("#itemSize").text(res.body.expressOrderDetail.itemSize);
			$("#itemWeight").text(res.body.expressOrderDetail.itemWeight);
			$("#itemType").text(res.body.expressOrderDetail.itemType);
			//  根据 orderStatus 判断显示的页面
			if (res.body.expressOrderDetail.orderStatus == 0) {     //等待客服联系
				$(".waitingbox").hide()
				$("#wait").hide()
				$('#waiting').hide()
				$("#order").show()     //取消订单
				$('#refresh').show()   //刷新订单 
			} else if (res.body.expressOrderDetail.orderStatus == 1) {  //待付款
				totalprice = res.body.expressOrderDetail.payPrice
				console.log(totalprice)
				$('#waiting').hide()
				$('#order').show()
				$('#payment').show()
				$("#top-totalprice").show()  //头部合计
				$('#contact-service').hide()
				$("#top-payprice").html(res.body.expressOrderDetail.payPrice + "元")
			} else if (res.body.expressOrderDetail.orderStatus == 2) {  //待派车
				
				$('#contact-service').hide()
				$("#content-top-pay").show()
				$("#order").show()
				$("#waiting").show()
				$(".waitingbox").show()
				// $("#wait").show()
				$('#waiting-contact-top-payprice').text(res.body.expressOrderDetail.payPrice + "元")
				$("#order").click(function(){
					$(".cancelOrder-body").show()
					$("#cancelOreder-hint").text("马上为您派车,您确认要取消订单吗？")

				})
				// 长连接 socket
				var longlinks = {
					"type":sockettype,
					"driverId":jony.userId
				}
				// var socket = new WebSocket("ws://192.168.1.11:8080/websocketPassenger");
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
					if (datatypes.type == 10) {
						sockettype = 9
						setTimeout(function() {
							window.location.reload()   //刷新当前页面.
						}, 1500)
					} 
				}
			} else if (res.body.expressOrderDetail.orderStatus == 3) {     //未取上货物
				$('#contact-service').hide()
				$('.driver-box').show()   //司机信息
				$('.total-box').show()    //底部合计
				$("#bottom-totalinput").val(res.body.expressOrderDetail.payPrice) 
				$("#order").show() 
				$("#position").show()
				$("#getgoods").text("未取上货物")
				$("#driver-head").attr("src",res.body.expressOrderDetail.driver.headimg)
				$("#name").text(res.body.expressOrderDetail.driver.name)
				$("#carno").text(res.body.expressOrderDetail.car.carno)
				$("#cartype").text(res.body.expressOrderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.expressOrderDetail.driver.phone)  //跳转到拨打电话页面
				$("#order").click(function(){    
					$(".cancelOrder-body").show()
					$("#cancelOreder-hint").text("已为您派车成功，取消订单将需扣除您订单费用的3%，您确认要取消订单吗？")
					
				})
				$("#position").click(function(){
					location.href = "express_driver.html?orderid=" + evaluateId
				})
			} else if (res.body.expressOrderDetail.orderStatus == 4) {     //已取上货物
				$('#contact-service').hide()
				$('.driver-box').show()   //司机信息
				$('.total-box').show()    //底部合计
				$("#getgoods").text("已取上货物")
				$("#driver-head").attr("src",res.body.expressOrderDetail.driver.headimg)
				$("#name").text(res.body.expressOrderDetail.driver.name)
				$("#carno").text(res.body.expressOrderDetail.car.carno)
				$("#cartype").text(res.body.expressOrderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.expressOrderDetail.driver.phone)  //跳转到拨打电话页面
				$("#bottom-totalinput").val(res.body.expressOrderDetail.payPrice) 
				$("#position").show()
				$("#position").click(function(){
					location.href = "express_driver.html?orderid=" + evaluateId
				})
			} else if (res.body.expressOrderDetail.orderStatus == 5) {     //货物已签收
				$('#contact-service').hide()
				$('.driver-box').show()   //司机信息
				$('.total-box').show()    //底部合计
				$("#getgoods").text("货物已签收")
				$("#driver-head").attr("src",res.body.expressOrderDetail.driver.headimg)
				$("#name").text(res.body.expressOrderDetail.driver.name)
				$("#carno").text(res.body.expressOrderDetail.car.carno)
				$("#cartype").text(res.body.expressOrderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.expressOrderDetail.driver.phone)  //跳转到拨打电话页面
				var headimg = res.body.expressOrderDetail.driver.headimg
				var name = res.body.expressOrderDetail.driver.name
				var carno = res.body.expressOrderDetail.car.carno
				var cartype = res.body.expressOrderDetail.car.cartype
				var driverphone = res.body.expressOrderDetail.driver.phone
				console.log(driverphone)
				$("#bottom-totalinput").val(res.body.expressOrderDetail.payPrice) 
				$("#express-evaluate").show()
				$("#express-evaluate").click(function(){
					location.href = "express_evaluate.html?evaluateId=" + evaluateId + "&headimg=" + headimg + "&name=" + name + "&carno=" + carno + "&cartype=" + cartype + "&driverphone=" + driverphone 				
				})
				setTimeout(function() {
					window.location.reload()   //刷新当前页面.
				}, 5000)
			} else if (res.body.expressOrderDetail.orderStatus == 6) {     //货物已签收
				$('#contact-service').hide()
				// $("#waiting").hide()
				$('.driver-box').show()   //司机信息
				$('.total-box').show()    //底部合计
				$("#getgoods").text("货物已签收")
				$("#driver-head").attr("src",res.body.expressOrderDetail.driver.headimg)
				$("#name").text(res.body.expressOrderDetail.driver.name)
				$("#carno").text(res.body.expressOrderDetail.car.carno)
				$("#cartype").text(res.body.expressOrderDetail.car.cartype)
				$("#driverphone").attr("href",'tel:'+res.body.expressOrderDetail.driver.phone)  //跳转到拨打电话页面
				$("#bottom-totalinput").val(res.body.expressOrderDetail.payPrice) 
				$(".pj-bigbox").show()
				var pfhtml="";
				$(".pj-text").text(res.body.expressOrderDetail.expressorderevaluate.content)
				var scores = (res.body.expressOrderDetail.expressorderevaluate.score)*1
				for(var i=1;i<=scores;i++){     
					pfhtml+='<img src="../images/lanxing.png" >'
				}
				for(var j=1;j<=5-scores;j++){
					pfhtml+='<img src="../images/xingx.png" >'
				}
				$(".xx-box").html(pfhtml)
			}
		},
		error: function(res) {
			console.log(res)
		}
	})
	
	//点击刷新订单
	$('#refresh').click(function(){
		window.location.reload()   //刷新当前页面.
	})
	//点击取消订单
	$("#order").click(function(){    
		$(".cancelOrder-body").show()
		$("#cancelOreder-hint").text("当前订单未支付，确定要取消当前订单吗？")
		
	})
	//点击取消订单弹窗里的取消按钮
	$("#orderno").click(function(){
		$(".cancelOrder-body").hide()
	})
	//点击取消订单弹窗里的确认按钮
	$("#ordersure").click(function(){
		$.ajax({
			type: "POST",
			dataType: "JSON",
			url: publicjs + '/app/express/delOrder', 
			data: {
				orderId: expressOrderId
			},
			success: function(res){
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
			error: function(res){
				console.log(res)
			}
		})
		
	})
	// 点击立即付款
	$("#payment").click(function() {
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON 
			url: publicjs + '/app/express/payorder', //立即付款
			// url: "https://api.mch.weixin.qq.com/pay/unifiedorder ",
			data: {
				orderId: expressOrderId,
				money: totalprice,
				key: 1,
				trade_type: "JSAPI",
				openid: oBackmsg.openid
			},
			headers: {
				"token": jony.token //此处放置请求到的用户token   1bcf37bc6d9b4bbe9fce62cd90bc7137
			},
			success: function(res) {
				console.log(res)
				function onBridgeReady() {
					// console.log(res)
					WeixinJSBridge.invoke('getBrandWCPayRequest', {
						"appId" : res.body.appId, //公众号名称，由商户传入
						"timeStamp" : res.body.timeStamp, //时间戳，自1970年以来的秒数
						"nonceStr" : res.body.nonceStr, //随机串
						"package" : res.body.packages,
						"signType" : "MD5", //微信签名方式：
						"paySign" : res.body.sign
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
				
				
			},
			error: function(res) {
				console.log(res)
			}
		});
	
	})
})
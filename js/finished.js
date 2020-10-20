$(function() {
	//刚进页面获取到的上个页面的值
	var name = JSON.parse(localStorage.getItem("name"));
	// console.log(name)
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var twoText = decodeURI(window.location.search);
	var types = twoText.split("=")[1].split("&")[0]
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
			/***  for循环中长度含头不含尾 
			1.  总分数  5
			2.  评分  3        对应的实星=>评分
			3.  未评分=总分数-评分  对应的空星=>未评分
			+=   a=a+1  a+=a
			-=   a=a+1  a+=a
			pfhtml=""+'<img src="../images/lanxing.png" >'
			pfhtml=""+'<img src="../images/lanxing.png" >'
			pfhtml=<img src="../images/lanxing.png" >
			
			pfhtml=1+'5'*1  //隐式转换
			1+1
			var ac = 1;
			++ac;
			console.log(ac)  **/
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
			var mon = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日
			var h = myDate.getHours(); //获取当前小时数(0-23)
			var m = myDate.getMinutes(); //获取当前分钟数(0-59)
			var s = myDate.getSeconds(); //获取当前秒
			// console.log(myDate)
			$("#datetime").val(year + "-" + mon + "-" + date + " " + h + ":" + m + ":" + s);
			// 合计
			var totals = (res.body.orderDetail.nums * $("#moneynum").text()).toFixed(2);
			$("#sum").val(totals)
			// console.log(totals)
			// console.log(res.body.orderDetail.paystatus)

			if (res.body.orderDetail.orderStatus == "0") { //待付款
				$("#orderno").hide()
				$("#payment").text("待付款")
			} else if (res.body.orderDetail.orderStatus == "1") { //待派车
				$("#pay-left").text("已付款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#payment").text("等待派车")
			} else if (res.body.orderDetail.orderStatus == "2") { //待上车
				$("#pay-left").text("已付款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#payment").text("等待派车")
			} else if (res.body.orderDetail.orderStatus == "3") { //进行中
				// 				$("#pay-left").css("color", "#E9753B")
				// 				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				// 				$("#payment").text("等待派车")
			} else if (res.body.orderDetail.orderStatus == "4") { //待评价
				var evaluateId = res.body.orderDetail.id
				// console.log(driver)
				// var driver = {}
				// driver.driId = res.body.orderDetail.driver.car.id
				var driName = res.body.orderDetail.driver.name
				var driveryears = res.body.orderDetail.driver.driveryears
				var headimg = res.body.orderDetail.driver.headimg
				var carno = res.body.orderDetail.driver.car.carno
				var cartype = res.body.orderDetail.car.cartype
				console.log(headimg)
				console.log(driveryears)
				$("#orderno").hide()
				$(".driver-box").show()
				$("#pay-left").text("已付款")
				$("#pay-left").css("color", "#E9753B")
				$("#pay-leftimg").attr("src", "../images/moneycheng.png")
				$("#pay-right").text("已下车")
				$("#pay-right").css("color", "#62BD8B")
				$("#pay-rightimg").attr("src", "../images/greenpeo.png")
				$("#payment").text("立即评价")
				//司机信息
				$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
				$("#driveryears").text(res.body.orderDetail.driver.driveryears)
				$("#name").text(res.body.orderDetail.driver.name)
				$("#carno").text(res.body.orderDetail.driver.car.carno)
				$("#cartype").text(res.body.orderDetail.car.cartype)
				// $("#payment").click(function(){
				// 	location.href = "evaluate.html?=" + evaluateId + "&driName=" + driName + "&driveryears=" + driveryears + "&headimg=" + headimg
				// })
			} else if (res.body.orderDetail.orderStatus == "5") {  
				if(res.body.orderDetail.quitodrdertime == null){  //已完成
					//司机信息
					$("#driver-head").attr("src", res.body.orderDetail.driver.headimg)
					$("#driveryears").text(res.body.orderDetail.driver.driveryears)
					$("#name").text(res.body.orderDetail.driver.name)
					$("#carno").text(res.body.orderDetail.driver.car.carno)
					$("#cartype").text(res.body.orderDetail.car.cartype)
					$("#driverphone").attr("href",'tel:'+driverphone)  //跳转到拨打电话页面
					$(".driver-box").show()
					$(".finish").show()
					$("#ordernot, #payment,#order").hide()
					$("#payment").hide()
					$(".order").hide()
					$(".finish").text("完成")
					$("#pay-left").text("已付款")
					$("#pay-left").css("color", "#E9753B")
					$("#pay-leftimg").attr("src", "../images/moneycheng.png")
					$("#pay-right").text("已下车")
					$("#pay-right").css("color", "#62BD8B")
					$("#pay-rightimg").attr("src", "../images/greenpeo.png")
					$(".pj-bigbox").show()
					$(".pj-text").text()
					
				}else{    //已取消
					$("#orderno").hide()
					$("#payment").text("订单取消，已退款")
				}
				
			}
		},
		error: function(res) {
			console.log(res)
		}
	});

})

$(function() {
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	// 点击确定出发
	$("#surestart").click(function() {
		// var addressObj = JSON.parse(localStorage.getItem("orderArrys"))  //首页缓存
		// console.log(addressObj)
		var twoText = decodeURI(window.location.search);
		var types = twoText.split("&")[0].split("=")[1]
		console.log(types)
		
		// var twoTexts = twoText.split("=")[1]
		// console.log(twoTexts)
		// var startcity = twoTexts.split(":")[1].split(",")[0]
		// // console.log(startcity)
		// var endcity = twoTexts.split(":")[2].split(",")[0]
		// // console.log(endcity)

		// var citys = {}
		// citys.startaddress = $("#address-ipt").val()
		// citys.endaddress = $("#lastaddress-ipt").val()
		// citys.longitude = $("#longitude").text()
		// citys.latitude = $("#latitude").text()
		// citys.endlongitude = $("#endlongitude").text()
		// citys.endlatitude = $("#endlatitude").text()
		// console.log(citys)
		if ($("#address-ipt").val() == "") {
			$("#tishimodal").show()
			$("#tishimodal").html("请选择具体的出发地")
			setTimeout(function() {
				$("#tishimodal").hide()
			}, 2000)
		}else{
			// 1 寄件  0 收件
			var expressCitysnamess = JSON.parse(localStorage.getItem("expressCitysname"));
			console.log(expressCitysnamess)
			// var addressIpt = $("#address-ipt").val()
			// console.log(addressIpt)
			// expressCitysnamess.expressDetailcfd = addressIpt
			// console.log(expressCitysnamess.expressDetailcfd)
			// var expressCitysnamessStr = JSON.stringify(expressCitysnamess)
			// localStorage.setItem("expressCitysname",expressCitysnamessStr)
			if (types == 1) {
				var addressIpt = $("#address-ipt").val()
				console.log(addressIpt)
				expressCitysnamess.expressDetailcfd = addressIpt
				console.log(expressCitysnamess.expressDetailcfd)
				var expressCitysnamessStr = JSON.stringify(expressCitysnamess)
			} else{
				var addressIpt = $("#address-ipt").val()
				console.log(addressIpt)
				expressCitysnamess.expressDetailmdd = addressIpt
				console.log(expressCitysnamess.expressDetailmdd)
				var expressCitysnamessStr = JSON.stringify(expressCitysnamess)
			}
			localStorage.setItem("expressCitysname",expressCitysnamessStr) 
			location.href = "index_index.html?&express=1" + "&difference=3"
		}
		// else if ($("#lastaddress-ipt").val() == "") {
		// 	$("#tishimodal").show()
		// 	$("#tishimodal").html("请选择具体的目的地")
		// 	setTimeout(function() {
		// 		$("#tishimodal").hide()
		// 	}, 2000)
		// } else {
		// 	$("#surestart").hide()
		// 	$("#hidesure").show() 
		// 	
		// 	var oBj = {
		// 		startCity: addressObj.startCity,
		// 		endCity: addressObj.endCity,
		// 		nums: addressObj.nums,
		// 		startstrtime: addressObj.starttime,
		// 		endstrtime: addressObj.endtime,
		// 		isHaveLuggage: addressObj.isHaveLuggage,
		// 		remarks: addressObj.remarks,
		// 		longitude: $("#longitude").text().split(",")[0],
		// 		latitude: $("#latitude").text().split(",")[1],
		// 		startaddress: $("#address-ipt").val(),
		// 		startlongitude: $("#longitude").text().split(",")[0],
		// 		startlatitude: $("#latitude").text().split(",")[1],
		// 		endaddress: $("#lastaddress-ipt").val(),
		// 		endlongitude: $("#endlongitude").text().split(",")[0],
		// 		endlatitude: $("#endlatitude").text().split(",")[0],
		// 		ordertype: 0,
		// 		source: 2
		// 	}
		// 	console.log(oBj)
			
			// 下单
			// $.ajax({
			// 	type: "POST", //用POST方式传输
			// 	dataType: "JSON", //数据格式:JSON 
			// 	url: publicjs + '/app/passenger/addOrder',
			// 	data: {
			// 		startCity: addressObj.startCity,
			// 		endCity: addressObj.endCity,
			// 		nums: addressObj.nums,
			// 		startstrtime: addressObj.starttime,
			// 		endstrtime: addressObj.endtime,
			// 		isHaveLuggage: addressObj.isHaveLuggage,
			// 		remarks: addressObj.remarks,
			// 		longitude: $("#longitude").text().split(",")[0],
			// 		latitude: $("#latitude").text().split(",")[1],
			// 		startaddress: $("#address-ipt").val(),
			// 		startlongitude: $("#longitude").text().split(",")[0],
			// 		startlatitude: $("#latitude").text().split(",")[1],
			// 		endaddress: $("#lastaddress-ipt").val(),
			// 		endlongitude: $("#endlongitude").text().split(",")[0],
			// 		endlatitude: $("#endlatitude").text().split(",")[0],
			// 		ordertype: 0,
			// 		source: 2
			// 	},
			// 	headers: {
			// 		"token": jony.token //此处放置请求到的用户token   1bcf37bc6d9b4bbe9fce62cd90bc7137
			// 	},
			// 	success: function(ress) {
			// 		console.log(ress)
			// 		// $("#tishimodal").show()
			// 		// $("#tishimodal").html("您有未完成订单，请完成后再下单")
			// 		// $("#tishimodal").css("width","70%")
			// 		if(ress.errorCode == 0){
			// 			citys.ridestatus = ress.body.orderDetail.ridestatus;   //是否上车
			// 			citys.paystatus = ress.body.orderDetail.paystatus;   //是否支付
			// 			citys.orderStatus = ress.body.orderDetail.orderStatus;   //乘车状态
			// 			citys.unitprice = ress.body.orderDetail.unitprice
			// 			citys.id=ress.body.passengerOrderId;
			// 			var citysStr = JSON.stringify(citys)
			// 			// location.href = "routercar.html?mes=" + twoTexts + "&adress=" + citysStr	
			// 			location.href = "routercar.html" 
			// 		}
			// 	},
			// 	error: function(res) {
			// 		$("#surestart").show()
			// 		$("#hidesure").hide() 
			// 		
			// 	}
			// });
		// }
	})
	
	
})

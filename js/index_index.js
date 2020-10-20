$(function() {
	var twoText = window.location.search;
	var token = twoText.split("=")[1]
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	$("#headimg").attr("src",jony.userPic)
	$("#head").click(function() {
		// 个人中心
		$(".myself-box").show()
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON 
			url: publicjs+'/app/passenger/getPassengerInfo',  //获取用户信息
			data: {
				phone: "18234556154",
				password: "123456"
			},
			headers: {
				"token": jony.token//此处放置请求到的用户token
			},
			success: function(res) {
				console.log(res) 
				$("#myselfHeadimg").attr("src",res.body.user.headimg)
				$("#userName").text(res.body.user.name)
				$("#totaltripnums").val(res.body.user.totaltripnums + "次");
			},
			error: function(res) {
				console.log(res)
			}
		});
	})

	// 点击个人中心最大盒子隐藏
	$(".myself-box").click(function() {
		$(".myself-box").hide()
	})

	// 选择乘车人数
	$("#carPeople-input").click(function() {
		$(".carPeople").show()
		$(".carPeople-tanc").show()
	})
	$(".carPeople-tanc p").click(function() {
		$("#carPeople-num").val($(this).text())
		$(".carPeople").hide()
		$(".carPeople-tanc").hide()
	})

	// 历史路线接口
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs+'/app/passenger/historyLine',  
		headers: {
			"token": jony.token//此处放置请求到的用户token
		},
		success: function(res) {
			console.log(res) 
			$("#historyLine").text(res.body.historyLine[0].startCity + "-" + res.body.historyLine[0].endCity)
		},
		error: function(res) {
			console.log(res)
		}
	});
	// 乘客出行点击下一步
	$("#next").click(function(){
		if($("#chufadi").val() == ""){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择出发地")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#mudidi").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请选择目的地")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#carPeople-num").val() == ""){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择乘车人数")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#demo3").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请选择最早出发时间")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#demo2").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请选择最晚出发时间")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
			
		}else{
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日
	// 		var h = myDate.getHours();//获取当前小时数(0-23)
	// 		var m = myDate.getMinutes();//获取当前分钟数(0-59)
	// 		var s = myDate.getSeconds();//获取当前秒
			// console.log(myDate)
			var lasttime = year + "/" + mon + "/" + date + " " + $("#demo3").val() + ":00"
			var shijiancuo = new Date(lasttime).getTime();
			console.log(shijiancuo)
			
			var endtime = year + "/" + mon + "/" + date + " " + $("#demo2").val() + ":00"
			var endshijiancuo = new Date(endtime).getTime();
			console.log(endshijiancuo)
			if(shijiancuo >= endshijiancuo){
				$("#tishimodal").show()
				$("#tishimodal").html("最晚出发地不得小于最早出发时间")
				$("#tishimodal").css({
					"width":"80%",
					"line-height": "2rem"
				})
				setTimeout(function(){
					$("#tishimodal").hide()
				},2000)
			}else{
				var orderArr = {};
				orderArr.startCity = $("#chufadi").val()
				orderArr.endCity = $("#mudidi").val()
				orderArr.nums = $("#carPeople-num").val()
				orderArr.starttime = $("#demo3").val()
				orderArr.endtime = $("#demo2").val()
				orderArr.remarks = $("#remarks").val()  //备注
				//isHaveLuggage   0 未选中   1 选中
				orderArr.isHaveLuggage = $("input[type='checkbox']").is(':checked')?"1":"0";
				orderArrys = JSON.stringify(orderArr)
				var orderArrys = localStorage.setItem("orderArrys",orderArrys)
				location.href = "detailed_address.html"
			}
		}
	})
	
	
	//  小件快运点击下一步
	$("#sendPhone").val(jony.phone)
	$("#express-next").click(function(){
		var myreg = /^1[3-9]+\d{9}$/;
		// if (!myreg.test($("#utel").val())) {
		// 	// layertest('请输入有效的手机号码')
		// 	$("#tishimodal").show();
		// 	$("#tishitit").html('请输入有效的手机号码');
		// 	return false;
		// }
		if($("#expresschufadi").val() == ""){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择寄件地址")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#expressmudidi").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请选择收件地址")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#sendName").val() == ""){
			$("#tishimodal").show()
			$("#tishimodal").html("请输入寄件人姓名")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#sendPhone").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请输入寄件人电话")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if($("#consigneeName").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请输入收件人姓名")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
			
		}else if($("#consigneePhone").val() == ""){
			console.log(123)
			$("#tishimodal").show()
			$("#tishimodal").html("请输入收件人电话")
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if (!myreg.test($("#sendPhone").val()) || !myreg.test($("#consigneePhone").val())) {
			// layertest('请输入有效的手机号码')
			$("#tishimodal").show();
			$("#tishimodal").html('请输入有效的手机号码');
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
			// return false;
		}else{
			var myDate = new Date;
			var year = myDate.getFullYear(); //获取当前年
			var mon = myDate.getMonth() + 1; //获取当前月
			var date = myDate.getDate(); //获取当前日
	// 		var h = myDate.getHours();//获取当前小时数(0-23)
	// 		var m = myDate.getMinutes();//获取当前分钟数(0-59)
	// 		var s = myDate.getSeconds();//获取当前秒
			// console.log(myDate)
			var lasttime = year + "/" + mon + "/" + date + " " + $("#demo3").val() + ":00"
			var shijiancuo = new Date(lasttime).getTime();
			console.log(shijiancuo)
			
			var endtime = year + "/" + mon + "/" + date + " " + $("#demo2").val() + ":00"
			var endshijiancuo = new Date(endtime).getTime();
			console.log(endshijiancuo)
			if(shijiancuo >= endshijiancuo){
				$("#tishimodal").show()
				$("#tishimodal").html("最晚出发地不得小于最早出发时间")
				$("#tishimodal").css({
					"width":"80%",
					"line-height": "2rem"
				})
				setTimeout(function(){
					$("#tishimodal").hide()
				},2000)
			}else{
				var expressCitysname = JSON.parse(localStorage.getItem("expressCitysname"));
				console.log(expressCitysname)
				var orderArray = {};
				orderArray.setiId = $(".setiid").text();
				orderArray.mailingPay = $(".mailingPay").text();    //寄件方式
				orderArray.expresschufadi = $("#expresschufadi").val();
				orderArray.expressdetailcfd = $("#express-detail-startAddress").text();
				orderArray.expressmudidi = $("#expressmudidi").val();
				orderArray.expressdetailmdd = $("#express-detail-endAddress").text();
				orderArray.sendName = $("#sendName").val();
				orderArray.sendPhone = $("#sendPhone").val();
				orderArray.consigneeName = $("#consigneeName").val();
				orderArray.consigneePhone = $("#consigneePhone").val();
				orderArray.remarks = $("#remarks").val() ; //备注
				//isHaveLuggage   0 未选中   1 选中
				orderArray.isHaveLuggage = $("input[type='checkbox']").is(':checked')?"1":"0";
				var orderArrays = JSON.stringify(orderArray);
				localStorage.setItem("orderArrays",orderArrays);
				location.href = "item_detail.html"
			}
		}
	})
	

	// 点击乘车人数出现的弹窗
	$(".carPeople").click(function() {
		$(".carPeople").hide()
		$(".carPeople-tanc").hide()
	})
	
	// 乘客出行
	// 跳转到出发地
	$("#startPlace").click(function() {
		huancun()
		location.href = "address.html?tit=1"
	})
	// 跳转到目的地
	$("#endPlace").click(function() {
		huancun()
		location.href = "address.html?tit=0&cityname=" + $("#chufadi").val() 
	})
	// 跳转页面的时候设置缓存
	function huancun(){  
		var obj = {};
		obj.cfd = $("#chufadi").val()
		obj.mdd = $("#mudidi").val()
		obj = JSON.stringify(obj)
		console.log(obj)
		localStorage.setItem("citysname",obj)
	}
	if(decodeURI(twoText.split("=")[1]) != "undefined"){  //刚进页面的时候判断
		var citysname = JSON.parse(localStorage.getItem("citysname"));
		console.log(citysname)
		$("#chufadi").val(citysname.cfd)
		$("#mudidi").val(citysname.mdd)
	}
	
	
	// 小件快运  1 寄件  0 收件
	// 跳转到寄件地址 
	$("#expressStartPlace").click(function() {
		expressHuancun()
		location.href = "express_address.html?express=1"
	})
	// 跳转到收货地址
	$("#expressEndPlace").click(function() {
		expressHuancun()
		location.href = "express_address.html?express=0&expressCitysname=" + $("#expresschufadi").val() 
	})
	// 跳转页面的时候设置缓存
	function expressHuancun(){  
		var expressObj = {};
		expressObj.expresscfd = $("#expresschufadi").val()
		expressObj.expressmdd = $("#expressmudidi").val()
		expressObj.expressDetailcfd = $("#express-detail-startAddress").text()
		expressObj.expressDetailmdd = $("#express-detail-endAddress").text()
		expressObj.setiId = $(".setiid").text()
		expressObj.mailingPay = $(".mailingPay").text()   //寄件方式
		expressObj = JSON.stringify(expressObj)
		console.log(expressObj)
		localStorage.setItem("expressCitysname",expressObj)
	}
	if(decodeURI(twoText.split("=")[1]) != "undefined"){  //刚进页面的时候判断
	// console.log(decodeURI(twoText.split("=")[1]))
		var expressCitysname = JSON.parse(localStorage.getItem("expressCitysname"));
		console.log(expressCitysname)
		var expressJump = decodeURI(twoText.split("=")[2])   //1 小件快运显示
		console.log(expressJump)
		$("#expresschufadi").val(expressCitysname.expresscfd)
		$("#expressmudidi").val(expressCitysname.expressmdd)
		$("#express-detail-startAddress").text(expressCitysname.expressDetailcfd)
		$("#express-detail-endAddress").text(expressCitysname.expressDetailmdd)
		$(".setiid").text(expressCitysname.setiId)
		$(".mailingPay").text(expressCitysname.mailingPay)
		if (expressJump == 3) {
			$("#express").show()
			$("#passenger").hide()
			$("#orderdw").hide()
			$("#passengerBackground").css("background","#fff")
			$("#expressBackground").css("background","#F4F5F6")
			$("#chufadi").val("")
			$("#mudidi").val("")
		} else{
			$("#passenger").show()
			$("#express").hide()
		}
	}
	
	// 点击页面定位图标跳转页面或取消订单
	$("#orderdw").click(function(){
		$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs+'/app/passenger/getHaveInHandOrder',  //获取乘客正在进行中的订单
				data: {},
				headers: {
					"token": jony.token //此处放置请求到的用户token
				},
				success: function(res) {
					console.log(res)
					var errorCode = res.errorCode
					console.log(errorCode)
					if (errorCode == "-1") {
						$("#tishimodal").show()
						$("#tishimodal").html("没有进行中的订单")
						$("#tishimodal").css({
							"width":"50%",
							"line-height": "2rem",
						})
						setTimeout(function(){
							$("#tishimodal").hide()
						},2000)
					} else if(errorCode == "0"){
						location.href = "routercar.html"
					}
					
				},
				error: function(res) {
					console.log(res)
				}
			});
	})
	
	
	
	// 选项卡 乘客出行-小件快运
	$(".content-top").click(function() {
		//获取点击的元素给其添加样式，讲其兄弟元素的样式移除
		// $(this).addClass("active").siblings().removeClass("active");
		// //获取选中元素的下标
		// var index = $(this).index();
		// $(".bigBoxTab").eq(index).show().siblings().hide();
	})
})




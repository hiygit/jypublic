$(function(){
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var orderArrays = JSON.parse(localStorage.getItem("orderArrays"));  //首页所有缓存
	console.log(orderArrays)
	var itemtypecheck, itemsizecheck, itemweightcheck, itempaycheck
	// 物品类型
	var itemType = ""
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/express/getExpressOrderItemType', //目标地址   验证码接口
		data: {},
		success: function(res) {
			console.log(res)
			var itemTypeArray = res.body.typeList
			// console.log(itemTypeArray)
			var itemTypeArrays = []
			itemTypeArray.map(function(list){
				// console.log(list)
				itemTypeArrays.push(list.name)
				// console.log(itemTypeArrays)
				itemType += `<li>
								<div class="itemType-listBox">
									<img src="${list.pic}">
									<img class="checkedBtn" src="../images/checked.png" >
								</div>
								<span class="itemName">${list.name}</span>
							</li>`;
			})
			$("#itemTypeul").html(itemType)
		},
		error: function(res) {
			console.log(res)
		}
	})
	$("#itemTypeul").on("click",'li',function(e){
	    $(this).children().children(".checkedBtn").show()
		$(this).children(".itemName").css("color", "#277AEC")
		$(this).siblings().children().children(".checkedBtn").hide()
		$(this).siblings().children(".itemName").css("color", "#333")
		itemtypecheck = $(this).children(".itemName").text()
		console.log(itemtypecheck)
	});	
	
	// 物品大小
	var itemSize = ""
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/express/getExpressOrderItemSize', 
		data: {},
		success: function(res) {
			console.log(res)
			var itemSizeArray = res.body.sizeList
			// console.log(itemSizeArray)
			var itemSizeArrays = []
			itemSizeArray.map(function(list){
				// console.log(list)
				itemSizeArrays.push(list.name)
				// console.log(itemSizeArrays)
				itemSize += `<li class="active">${list.name}</li>`;
			})
			$("#itemSizeul").html(itemSize)
		},
		error: function(res) {
			console.log(res)
		}
	})
	$("#itemSizeul").on("click",'li',function(e){
	    $(this).css({
			"color":"#fff",
			"background":"#277AEC",
		});
		$(this).siblings().css({
			"color":"#333",
			"background":"#E4E4E4",
		});
		itemsizecheck = $(this).text()
		console.log(itemsizecheck)
	});	
	
	// 物品重量
	var itemWeight = ""
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/express/getExpressOrderItemWeight', 
		data: {},
		success: function(res) {
			console.log(res)
			var itemWeightArray = res.body.weightList
			// console.log(itemWeightArray)
			var itemWeightArrays = []
			itemWeightArray.map(function(list){
				// console.log(list)
				itemWeightArrays.push(list.name)
				// console.log(itemWeightArrays)
				itemWeight += `<li class="active">${list.name}</li>`;
			})
			$("#itemWeightul").html(itemWeight)
		},
		error: function(res) {
			console.log(res)
		}
	})
	$("#itemWeightul").on("click",'li',function(e){
	    $(this).css({
			"color":"#fff",
			"background":"#277AEC",
		});
		$(this).siblings().css({
			"color":"#333",
			"background":"#E4E4E4",
		});
		itemweightcheck = $(this).text()
		console.log(itemweightcheck)
	});	
	
	$(".regular-radio").click(function(){
		itempaycheck = $(this).val()
		console.log(itempaycheck)
	})
	
	$(".sure").click(function(){
		if(itemtypecheck == undefined){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择物品类型")
			$("#tishimodal").css({
				"width":"60%",
				"line-height": "2rem"
			})
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if(itemsizecheck == undefined){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择物品大小")
			$("#tishimodal").css({
				"width":"60%",
				"line-height": "2rem"
			})
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if(itemweightcheck == undefined){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择物品重量")
			$("#tishimodal").css({
				"width":"60%",
				"line-height": "2rem"
			})
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else if(itempaycheck == undefined){
			$("#tishimodal").show()
			$("#tishimodal").html("请选择付款方式")
			$("#tishimodal").css({
				"width":"60%",
				"line-height": "2rem"
			})
			setTimeout(function(){
				$("#tishimodal").hide()
			},2000)
		}else {
			orderArrays.itemtypecheck = itemtypecheck;
			orderArrays.itemsizecheck = itemsizecheck
			orderArrays.itemweightcheck = itemweightcheck
			orderArrays.itempaycheck = itempaycheck
			var lnglat = JSON.parse(localStorage.getItem("getCache"))  // 获取express_detailed_address_address.html页面的缓存
			console.log(lnglat)
			console.log(lnglat.startAddress.startAddressLng)
			var mailingsstation = {}
			$.ajax({
				type: "POST", //用POST方式传输
				dataType: "JSON", //数据格式:JSON 
				url: publicjs + '/app/express/addOrder', 
				headers: {
					"token": jony.token//此处放置请求到的用户token
				},
				data: {
					'mailingPay': orderArrays.mailingPay,
					'mailingAddress': orderArrays.expresschufadi,
					'mailingDetailAddress': orderArrays.expressdetailcfd,
					'mailingDetailAddressLon': lnglat.startAddress.startAddressLat,
					'mailingDetailAddressLat': lnglat.startAddress.startAddressLng,
					'mailingsstation.id': orderArrays.setiId,
					'consigneeAddress': orderArrays.expressmudidi,
					'consigneeDetailAddress': orderArrays.expressdetailmdd,
					'consigneeDetailAddressLon': lnglat.endAddress.endAddressLat,
					'consigneeDetailAddressLat': lnglat.endAddress.endAddressLng,
					'consigneestation.id': orderArrays.setiId,
					'consigneePay': 0,
					'mailingName': orderArrays.sendName,
					'mailingPhone': orderArrays.sendPhone,
					'consigneeName': orderArrays.consigneeName,
					'consigneePhone': orderArrays.consigneePhone,
					'remarks': orderArrays.remarks,
					'itemType': orderArrays.itemtypecheck,
					'itemSize': orderArrays.itemsizecheck,
					'itemWeight': orderArrays.itemweightcheck,
					'expressPayWay': orderArrays.itempaycheck
				},
				success: function(res) {
					console.log(res)
					// alert(res.msg)
					var expressOrderId = res.body.expressOrderId
					$(".cancelOrder-body").show()
					$("#cancelOreder-hint").html("恭喜您，您已成功下单请等待客服给您的致电，协商订单价格!")
					$("#winsure").click(function(){
						location.href = "express_order_detail.html?expressOrderId=" +  expressOrderId
					})
				},
				error: function(res) {
					console.log(res)
				}
			})
		}		
	})
})
$(function(){
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var twoText = window.location.search;
	// 三木运算写法
	decodeURI(twoText.split("=")[1]) == 1 ? document.title = "寄货地址" : document.title = "收货地址";
	// 普通写法
	// 	if (decodeURI(twoText.split("=")[1]) == 1) {
	// 		document.title = "寄货地址"
	// 	} else{
	// 		document.title = "收货地址"
	// 	}
	var types = parseInt(decodeURI(twoText.split("=")[1])),expressCitysname = "";
	console.log(types)
	if(types == 0){  //1 寄件  0 收件
		expressCitysname = decodeURI(twoText.split("&")[1].split("=")[1])
	}
	var expressCitysname = JSON.parse(localStorage.getItem("expressCitysname"));
	// console.log(expressCitysname)
	var citysArray = []
	
	$(document).on("click",".city-txt",function(event){
		event.preventDefault()
		if (types == 1) {
			$(".pop-up-bj").show()
			var cfCity = $(this).html()
			$("#expressDoorfetch").click(function(){   //上门取件
				var expressorderArr = JSON.parse(localStorage.getItem("expressCitysname"));
				console.log(expressorderArr)
				expressorderArr.mailingPay = 0
				var listArray = []
				expressorderArr.expresscfd = cfCity
				citysArray.map(function(list) {
					// console.log(list)
					if(expressorderArr.expresscfd == list.name){
						var listfence = JSON.parse(list.fence.replace(/'/g, '"'))
						listfence.map(function(mes){
							var arr = [];
							arr[0] = mes.lng
							arr[1] = mes.lat	
							console.log(arr)
							listArray.push(arr)
						})
					}
				})
				var listArrays = JSON.stringify(listArray)
				console.log(listArrays)
				localStorage.setItem("listArray",listArrays)
				expressorderArr = JSON.stringify(expressorderArr)
				console.log(expressorderArr)
				localStorage.setItem("expressCitysname",expressorderArr)
				location.href = "express_detailed_address.html?types=" + types + "&expressCitysname=" + cfCity 
			})
			
			$("#expressStation").click(function(){   //自送站点
				$.ajax({
					type: "POST", //用POST方式传输
					dataType: "JSON", //数据格式:JSON 
					url: publicjs + '/app/express/getExpressStationList', 
					data: {
						city: cfCity
					},
					success: function(res) {
						console.log(res)
						var expressorderArr = JSON.parse(localStorage.getItem("expressCitysname"));
						console.log(expressorderArr)
						expressorderArr.mailingPay = 1
						var station	= JSON.stringify(res.body.expressStation)
						console.log(station)
						var expressCitysnamess = JSON.parse(localStorage.getItem("expressCitysname"));
						console.log(expressCitysnamess)
						expressCitysnamess.mailingPay = 1
						expressCitysnamess.expresscfd = cfCity
						console.log(expressCitysnamess.expresscfd)
						var expressCitysnamessStr = JSON.stringify(expressCitysnamess)
						localStorage.setItem("expressCitysname",expressCitysnamessStr)
						location.href = "express_address_station.html?station=" + station + "&types=" + types
					},
					error: function(res) {
						console.log(res)
					}			
				});
			})
		} else{
			var cfCity = $(this).html()
			
			var listArray = []
			expressCitysname.expressmdd = cfCity
			citysArray.map(function(list) {
				// console.log(list)
				if(expressCitysname.expressmdd == list.name){
					// alert(1)
					var listfence = JSON.parse(list.fence.replace(/'/g, '"'))
					listfence.map(function(mes){
						var arr = [];
						arr[0] = mes.lng
						arr[1] = mes.lat	
						console.log(arr)
						listArray.push(arr)
					})
				}
			})
			var listArrays = JSON.stringify(listArray)
			localStorage.setItem("listArray",listArrays)	
			
			expressCitysname = JSON.stringify(expressCitysname)
			console.log(expressCitysname)
			localStorage.setItem("expressCitysname",expressCitysname)
			location.href = "express_detailed_address.html?types=" + types + "&expressCitysname=" + cfCity 
		}
	})
	var urls = ['/app/passenger/getdestinationCity','/app/passenger/getDepartureCity']
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs+urls[types], //目标地址   
		data: {
			city: expressCitysname,
		},
		headers: {
			"token": jony.token//此处放置请求到的用户token
		},
		success: function(res) {
			console.log(res)
			var cityName = res.body.city
			citysArray = cityName
			console.log(citysArray)
			$.each(cityName,function(index,list){
				if(list.key == "A"){
					$("#abox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#abox").append(htmls)
				}else if(list.key == "B"){
					$("#bbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#bbox").append(htmls)
				}else if(list.key == "C"){
					$("#cbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#cbox").append(htmls)
				}else if(list.key == "D"){
					$("#dbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#dbox").append(htmls)
				}else if(list.key == "E"){
					$("#ebox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#ebox").append(htmls)
				}else if(list.key == "F"){
					$("#fbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#fbox").append(htmls)
				}else if(list.key == "G"){					
					$("#gbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#gbox").append(htmls)
				}else if(list.key == "H"){					
					$("#hbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#hbox").append(htmls)
				}else if(list.key == "I"){
					$("#ibox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#ibox").append(htmls)
				}else if(list.key == "J"){
					$("#jbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#jbox").append(htmls)
				}else if(list.key == "K"){
					$("#kbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#kbox").append(htmls)
				}else if(list.key == "L"){
					$("#lbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#lbox").append(htmls)
				}else if(list.key == "M"){
					$("#mbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#mbox").append(htmls)
				}else if(list.key == "N"){
					$("#nbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#nbox").append(htmls)
				}else if(list.key == "O"){
					$("#obox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#obox").append(htmls)
				}else if(list.key == "P"){
					$("#pbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#pbox").append(htmls)
				}else if(list.key == "Q"){
					$("#qbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#qbox").append(htmls)
				}else if(list.key == "R"){
					$("#rbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#rbox").append(htmls)
				}else if(list.key == "S"){
					$("#sbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#sbox").append(htmls)
				}else if(list.key == "T"){
					$("#tbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#tbox").append(htmls)
				}else if(list.key == "U"){
					$("#ubox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#ubox").append(htmls)
				}else if(list.key == "V"){
					$("#vbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#vbox").append(htmls)
				}else if(list.key == "W"){
					$("#wbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#wbox").append(htmls)
				}else if(list.key == "X"){
					$("#xbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#xbox").append(htmls)
				}else if(list.key == "Y"){
					$("#ybox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#ybox").append(htmls)
				}else if(list.key == "Z"){
					$("#zbox").prev().show();
					var htmls = `<a class="city-txt" href="#javascript">${list.name}</a>`;
					$("#zbox").append(htmls)
				}
			})
		},
		error: function(res) {
			console.log(res)
		}
	});
})
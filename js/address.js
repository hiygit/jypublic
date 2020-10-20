$(function(){
	console.log(publicjs)
	var jony = JSON.parse(localStorage.getItem("name"));
	var twoText = window.location.search;
	// 三木运算写法
	decodeURI(twoText.split("=")[1]) == 1 ? document.title = "出发地" : document.title = "目的地";
	// 普通写法
	// 	if (decodeURI(twoText.split("=")[1]) == 1) {
	// 		document.title = "出发地"
	// 	} else{
	// 		document.title = "目的地"
	// 	}
	var types = parseInt(decodeURI(twoText.split("=")[1])),cityname = "";
	console.log(types)
	if(types == 0){  //0是目的地  1是出发地
		cityname = decodeURI(twoText.split("&")[1].split("=")[1])
		console.log(cityname)  //出发地名称
	}
	var citysname = JSON.parse(localStorage.getItem("citysname"));
	console.log(citysname)  //缓存 出发地-目的地
	var citysArray = []
	$(document).on("click",".city-txt",function(event){
		event.preventDefault()
		var cfCity = $(this).html()
		console.log(cfCity)
		if(twoText.split("=")[1] == 1){//出发地
			// var listArray = []
			var chufadiobj = {
				listArray:[],//围栏经纬度
				listcenter:[]//地图中心经纬度
			}
			citysname.cfd = cfCity
			citysArray.map(function(list) {
				if(citysname.cfd == list.name){
					console.log(list)
					chufadiobj.listcenter.push(list.lon);
					chufadiobj.listcenter.push(list.lat);
					var listfence = JSON.parse(list.fence.replace(/'/g, '"'))
					listfence.map(function(mes){
						var arr = [];
						arr[0] = mes.lng
						arr[1] = mes.lat	
						// console.log(arr)
						chufadiobj.listArray.push(arr)
					})
				}
			})
			var listArrays = JSON.stringify(chufadiobj)
			localStorage.setItem("listArray",listArrays)	
			console.log(localStorage.getItem("listArray"))
		}else{//目的地
			// var listArraymdd = []
			var mudediobj = {
				listArraymdd: [],//围栏经纬度
				listcenter:[]//地图中心经纬度
			}
			citysname.mdd = cfCity
			citysArray.map(function(list) {
				if(citysname.mdd == list.name){
					mudediobj.listcenter.push(list.lon);
					mudediobj.listcenter.push(list.lat);
					var listfence = JSON.parse(list.fence.replace(/'/g, '"'))
					listfence.map(function(mes){
						var arr = [];
						arr[0] = mes.lng
						arr[1] = mes.lat	
						// console.log(arr)
						mudediobj.listArraymdd.push(arr)
					})
				}
			})
			console.log(mudediobj)
			var listArraymdds = JSON.stringify(mudediobj)
			localStorage.setItem("listArraymdd",listArraymdds)	
		}
		citysname = JSON.stringify(citysname)
		console.log(citysname)
		localStorage.setItem("citysname",citysname)
		location.href = "index_index.html?types=" + types + "&cityname=" + cfCity
	})
	var urls = ['/app/passenger/getdestinationCity','/app/passenger/getDepartureCity']
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs+urls[types], //目标地址   
		data: {
			city: cityname,
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
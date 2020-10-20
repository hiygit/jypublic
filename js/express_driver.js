$(function() {
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var twoText = window.location.search;
	expressOrderId = twoText.split("=")[1]
	console.log(expressOrderId)
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/express/orderDetail', //订单详情
		data: {
			orderId: expressOrderId
		},
		headers: {
			"token": jony.token //此处放置请求到的用户token
		},
		success: function(res) {
			console.log(res)
			var endlng = res.body.expressOrderDetail.consigneeDetailAddressLon
			var endlat = res.body.expressOrderDetail.consigneeDetailAddressLat
			console.log(endlng,endlat)
			$("#driveryears").text(res.body.expressOrderDetail.driver.driveryears)
			$("#driver-head").attr("src",res.body.expressOrderDetail.driver.headimg)
			$("#name").text(res.body.expressOrderDetail.driver.name)
			$("#carno").text(res.body.expressOrderDetail.driver.car.carno)
			$("#cartype").text(res.body.expressOrderDetail.car.cartype)
			$("#driverphone").attr("href","tel:" + res.body.expressOrderDetail.driver.phone)
			var longlinks = {
				"type":"2",
				"driverId":res.body.expressOrderDetail.driver.id
			}
			var socket = new WebSocket("ws://192.168.1.11:8080/websocketPassenger");
			socket.onopen = function(){
				var msgstr = JSON.stringify(longlinks)
				socket.send(msgstr)
				console.log("chengg")
			}
			socket.onmessage  = function(res){
				console.log(res)
				var lnglat = JSON.parse(res.data);
				// var strlngst = lnglat.lon+","+lnglat.lat
				var lng = Number(lnglat.lon)
				var lat = Number(lnglat.lat)
				console.log(lng,lat)
				var map = new AMap.Map("container", {
					// center: [116.397559, 39.89621],
					zoom: 14
				});
				var drivingOption = {
					policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy
					ferry: 1, // 是否可以使用轮渡
					province: '京', // 车牌省份的汉字缩写  
				}
				// 构造路线导航类
				var driving = new AMap.Driving(drivingOption)
				// 根据起终点经纬度规划驾车导航路线
				driving.search(new AMap.LngLat(lng,lat), new AMap.LngLat(endlat,endlng), function(status,
					result) {
						console.log(status)
					// result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
					if (status === 'complete') {
						if (result.routes && result.routes.length) {
							// 绘制第一条路线，也可以按需求绘制其它几条路线
							drawRoute(result.routes[0])
							// log.success('绘制驾车路线完成')
						}
					} else {
						log.error('获取驾车数据失败：' + result)
					}
				});
				function drawRoute(route) {
					var path = parseRouteToPath(route)
				
					var startMarker = new AMap.Marker({
						position: path[0],
						icon: 'https://webapi.amap.com/theme/v1.3/markers/n/start.png',
						map: map
					})
					var endMarker = new AMap.Marker({
						position: path[path.length - 1],
						icon: 'https://webapi.amap.com/theme/v1.3/markers/n/end.png',
						map: map
					})
					var routeLine = new AMap.Polyline({
						path: path,
						isOutline: true,
						outlineColor: 'red',
						borderWeight: 1,
						strokeWeight: 1,
						strokeColor: 'red',
						lineJoin: 'round'
					})
					routeLine.setMap(map)
					// 调整视野达到最佳显示区域
					map.setFitView([startMarker, endMarker, routeLine])
				}
				// 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
				// DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
				function parseRouteToPath(route) {
					var path = []
					for (var i = 0, l = route.steps.length; i < l; i++) {
						var step = route.steps[i]
						for (var j = 0, n = step.path.length; j < n; j++) {
							path.push(step.path[j])
						}
					}
					return path
				}
			}
		},
		error: function(res) {
			console.log(res)
		}
	});
	

})
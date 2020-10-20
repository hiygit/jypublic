$(function() {
	var jony = JSON.parse(localStorage.getItem("name"));
	var twoText = decodeURI(window.location.search);
	var types = twoText.split("=")[1].split("&")[0]
	console.log(jony)
	var driverName = twoText.split("=")[2].split("&")[0]
	var driverYears = twoText.split("=")[3].split("&")[0]
	var headimg = twoText.split("=")[4].split("&")[0]
	var carno = twoText.split("=")[5].split("&")[0]
	var cartype = twoText.split("=")[6].split("&")[0]
	var driverphone = twoText.split("=")[7].split("&")[0]
	console.log(driverName,driverYears,carno,cartype,driverphone)
	var index
	var name = $("#name").text(driverName)
	var driveryears = $("#driveryears").text(driverYears)
	var headimg = $("#headimg").attr("src",headimg)
	var carno = $("#carno").text(carno)
	var cartype = $("#cartype").text(cartype)
	$("#driverphone").attr("href",'tel:'+driverphone)  //跳转到拨打电话页面
	// 监听 textarea 输入事件
	$("#content").bind('input',function(){
		$("#fontsizelength").text($(this).val().length)
	})
	$(".xing-box span").click(function(){
		$(this).addClass('on');
		$(this).prevAll().addClass('on');
		$(this).next().removeClass('on');
		index = JSON.stringify($(this).index() + 1)
	})		
	$("#baocun").click(function(){
		var content = $("#content").val();
		console.log(content)
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON 
			url: publicjs + '/app/passenger/orderEvaluate', //评价
			data: {
				passengerOrderId: types,
				score: index,
				content: $("#content").val(),
			},
			headers: {
				"token": jony.token //此处放置请求到的用户token
			},
			success: function(res) {
				console.log(content)
				console.log(res)
				var passEvalId = res.body.passengerEvaluateId
				// console.log(passEvalId)
				if(res.errorCode == -1){
					$("#tishimodal").show();
					$("#tishimodal").html(res.msg);
					setTimeout(function(){
						$("#tishimodal").hide()
					},2000)
				}else{
					$("#tishimodal").show();
					$("#tishimodal").html(res.msg);
					setTimeout(function(){
						$("#tishimodal").hide()
						// location.href = 'myjournery.html?=' + types 
					},2000)
				}
				
			},
			error: function(res) {
				console.log(res)
			}
		});
	})
})

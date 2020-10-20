$(function() {
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var twoText = decodeURI(window.location.search);
	var evaluateId = twoText.split("=")[1].split("&")[0]
	console.log(twoText)
	var headimg = twoText.split("=")[2].split("&")[0]
	var driverName = twoText.split("=")[3].split("&")[0]
	var driverYears = twoText.split("=")[3].split("&")[0]
	var carnos = twoText.split("=")[4].split("&")[0]
	var cartypes = twoText.split("=")[5].split("&")[0]
	var phones = twoText.split("=")[6].split("&")[0]
	console.log(headimg)
	console.log(driverName)
	// console.log(driverYears)
	console.log(carnos)
	console.log(phones)
	var index
	$("#getgoods").text("货物已签收")
	var headimg = $("#headimg").attr("src",headimg)
	var name = $("#name").text(driverName)
	// var driveryears = $("#driveryears").text(driverYears)
	var carno = $("#carno").text(carnos)
	var cartype = $("#cartype").text(cartypes)
	$("#driverphone").attr("href",'tel:'+phones)  //跳转到拨打电话页面
	
	// 监听 textarea 输入事件
	$("#content").bind('input',function(){
		$("#fontsizelength").text($(this).val().length)
	})
	
	$(".xing-box span").click(function(){
		$(this).addClass('on');
		$(this).prevAll().addClass('on');
		$(this).next().removeClass('on');
		index = JSON.stringify($(this).index() + 1)
		console.log(index)
	})		
	$("#baocun").click(function(){
		var content = $("#content").val();
		console.log(content)
		$.ajax({
			type: "POST", //用POST方式传输
			dataType: "JSON", //数据格式:JSON 
			url: publicjs + '/app/express/orderEvaluate', //评价
			data: {
				expressOrderId: evaluateId,
				score: index,
				content: $("#content").val(),
			},
			headers: {
				"token": jony.token //此处放置请求到的用户token
			},
			success: function(res) {
				// console.log(content)
				console.log(res)
				// var passEvalId = res.body.passengerEvaluateId
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
						location.href = 'express_order_detail.html?=' + evaluateId 
					},2000)
				}
				
			},
			error: function(res) {
				console.log(res)
			}
		});
	})
})

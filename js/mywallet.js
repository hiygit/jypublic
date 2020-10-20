$(function() {
	var jony = JSON.parse(localStorage.getItem("name"));
	$.ajax({
		type: "POST", //用POST方式传输
		dataType: "JSON", //数据格式:JSON 
		url: publicjs + '/app/passenger/myWallet', //我的钱包接口
		data: {
			// phone: jony.phone,
			// password: "123456",
			pageNo: 10,
			pageSize: 9
		},
		headers: {
			"token": jony.token //此处放置请求到的用户token
		},
		success: function(res) {
			console.log(res)
			var listarr = res.body.myOrderList;
			console.log(listarr)
			// if(listarr.length != 0){
				// $(".attrImg").show()
				// 			var listarr = [
				// 				{totalprice:0,time:"2019-02-20 11:30:10",IncomeOrExpend:0},
				// 				{totalprice:0,time:"2019-02-20 11:30:10",IncomeOrExpend:1},
				// 				{totalprice:0,time:"2019-02-20 11:30:10",IncomeOrExpend:0},
				// 				{totalprice:0,time:"2019-02-20 11:30:10",IncomeOrExpend:1},
				// 				{totalprice:0,time:"2019-02-20 11:30:10",IncomeOrExpend:0},
				// 				{totalprice:0,time:"2019-02-20 11:30:10",IncomeOrExpend:1},
				// 			];
				var htmls = "";
				listarr.map(function(list) {
					var boors = (list.IncomeOrExpend == 0 ? "+" : "-");
					htmls +=
						`<div class="pay-box" data-id="${list.ID}">
								<p class="wxpay">
									<span id="moneypaytype">${list.paymentDescription}</span>	
									<img class="yjl" src="../images/youlan.png" >
								</p>
								<p class="date" id="time">${list.time}
									<span class="money" id="totalprice">${boors}${list.totalprice}</span>
								</p>
							</div>`;
				})
				$("#listbox").html(htmls);
			// }else{
			// 	$(".attrImg").show()
			// }
			
			
		},
		error: function(res) {
			console.log(res)
		}
	});
	$(document).on('click', '.pay-box', function() {
		event.preventDefault()
		var id = $(this).data("id");
		console.log(id)
		location.href = "myjournery_routercar.html?orderid=" + id
	})
})

$(function(){
	//获取用户信息
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var obj = {
		passengerId: jony.userId
	}
	$.ajax({
		type: "POST",
		dataType: "json",
		url: publicjs + "/web/complaint/myFeedback",
		data: obj,
		headers: {
			"token": jony.token //此处放置请求到的用户token
		},
		success: function(data) {
			console.log(data)
			if (data.errorCode == 0) {
				if (data.body.maps.length != 0)
					var str = ""
				for (var i = 0; i < data.body.maps.length; i++) {
					str = `
						<li>
							<a href="javascript:;">
								<div class="listBox-left">
									<h3 class="title">`+data.body.maps[i].type+`</h3>
									<p class="titleDetail">`+data.body.maps[i].content+`</p>
								</div>
							</a>
						</li>
					`
					$(".listBox").append(str)
				}
			}else{
				layer.msg(data.msg)
			}
		},
		error: function(data) {
			console.log(data)
		}
	})
})
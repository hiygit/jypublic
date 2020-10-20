// var publicjs = "http://192.168.1.201:8080" //测试服务器
// var publicjs = "http://192.168.1.18:8081"//本地服务器
// var publicjs = "http://192.168.1.56:8081"//本地服务器
var publicjs = "http://www.jycct.cn" //服务器

var jony = {//201数据库
	"userId": "0060261d20714f92b75e2e5dafd3ed68",
	"userPic": "http://127.0.0.1:8080/userfiles/defultPic/defult_register_pic.png",
	"userName": "晋运6446154",
	"totaltripnums": 0,
	"token": "6pCr5VyruNqQkgqd48HqdQ=="
}

// var jony = {  //54数据库
// 	"userId": "e1057e016a694bb38f1a8a95233c1d5d",
// 	"userPic": "http://127.0.0.1:8080/userfiles/defultPic/defult_register_pic.png",
// 	"userName": "晋运666666",
// 	"totaltripnums": 0,
// 	"token": "hJL/j3YIq9qk/ovY8kNr7w=="
// }
jony = JSON.stringify(jony)
console.log(jony)
localStorage.setItem("name", jony)	
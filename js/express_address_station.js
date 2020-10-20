$(function(){
	var jony = JSON.parse(localStorage.getItem("name"));
	console.log(jony)
	var twoText = window.location.search;
	var stationArray = decodeURI(twoText).split("&")[0].split("=")[1]
	console.log(stationArray)
	var cityNameStation = JSON.parse(stationArray)
	var types = decodeURI(twoText).split("&")[1].split("=")[1]
	console.log(types)
	$.each(cityNameStation,function(index,list){
		console.log(list)
		if(list.nameFirst == "a"){
			$("#abox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}" >${list.name}</a>`;
			$("#abox").append(htmls)
		}else if(list.nameFirst == "b"){
			$("#bbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#bbox").append(htmls)
		}else if(list.nameFirst == "c"){
			$("#cbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#cbox").append(htmls)
		}else if(list.nameFirst == "d"){
			$("#dbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#dbox").append(htmls)
		}else if(list.nameFirst == "e"){
			$("#ebox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#ebox").append(htmls)
		}else if(list.nameFirst == "f"){
			$("#fbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#fbox").append(htmls)
		}else if(list.nameFirst == "g"){					
			$("#gbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#gbox").append(htmls)
		}else if(list.nameFirst == "h"){					
			$("#hbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#hbox").append(htmls)
		}else if(list.nameFirst == "i"){
			$("#ibox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#ibox").append(htmls)
		}else if(list.nameFirst == "j"){
			$("#jbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#jbox").append(htmls)
		}else if(list.nameFirst == "k"){
			$("#kbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#kbox").append(htmls)
		}else if(list.nameFirst == "l"){
			$("#lbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#lbox").append(htmls)
		}else if(list.nameFirst == "m"){
			$("#mbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#mbox").append(htmls)
		}else if(list.nameFirst == "n"){
			$("#nbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#nbox").append(htmls)
		}else if(list.nameFirst == "o"){
			$("#obox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#obox").append(htmls)
		}else if(list.nameFirst == "p"){
			$("#pbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#pbox").append(htmls)
		}else if(list.nameFirst == "q"){
			$("#qbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#qbox").append(htmls)
		}else if(list.nameFirst == "r"){
			$("#rbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#rbox").append(htmls)
		}else if(list.nameFirst == "s"){
			$("#sbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#sbox").append(htmls)
		}else if(list.nameFirst == "t"){
			$("#tbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#tbox").append(htmls)
		}else if(list.nameFirst == "u"){
			$("#ubox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#ubox").append(htmls)
		}else if(list.nameFirst == "v"){
			$("#vbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#vbox").append(htmls)
		}else if(list.nameFirst == "w"){
			$("#wbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#wbox").append(htmls)
		}else if(list.nameFirst == "x"){
			$("#xbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#xbox").append(htmls)
		}else if(list.nameFirst == "y"){
			$("#ybox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#ybox").append(htmls)
		}else if(list.nameFirst == "z"){
			$("#zbox").prev().show();
			var htmls = `<a class="city-txt" href="#javascript" data-value = "${list.id}">${list.name}</a>`;
			$("#zbox").append(htmls)
		}
	})
	var expressCitysname = JSON.parse(localStorage.getItem("expressCitysname"));
	console.log(expressCitysname)
	// var citysArray = []
	
	$(document).on("click",".city-txt",function(event){
		event.preventDefault()
		$(this).data("value")
		console.log($(this).data("value"))
		var addressIpt = $(this).text()
		console.log(addressIpt)
		var listArray = []
		expressCitysname.expressDetailcfd = addressIpt
		expressCitysname.setiId = $(this).data("value")
		console.log(expressCitysname.setiId)
		var expressCitysnamessStr = JSON.stringify(expressCitysname)
		localStorage.setItem("expressCitysname",expressCitysnamessStr)
		location.href = "index_index.html?types=" + types + "&difference=3"
		
	})
	
})
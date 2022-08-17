$(document).ready(function () {
	$.ajax({
		type: "get",
		url: 'json/bonusMall.json?t=' + new Date().getTime(),
		dataType: "json",
		success: function (response) {
			//var oListJson = document.getElementById("listJson");
			var strData = eval(response);
			/* for (var i = 0; i < strData.productListDatas.length; i++) {
				oListJson.innerHTML += "<li>" + "<img src=" + strData.productListDatas[i].product_img_url + ">" + "<div><span>积分 " + strData.productListDatas[i].product_integral + "</span><span>￥" + strData.productListDatas[i].product_price + "</span></div>" + "<p>" + strData.productListDatas[i].product_name + "</p>" + '<div class="ready"><i class="iconfont icon-liwu"></i>' + strData.productListDatas[i].product_swap + '人兑换</div>' + '<a href="javascript:;">立即兑换</a>' + "</li>"
			} */
			var productHtml = "";
			strData.productListDatas.forEach(productListData => {
				productHtml += "<li>" + "<img src=" + productListData.product_img_url + ">" + "<div><span>积分 " + productListData.product_integral + "</span><span>￥" + productListData.product_price + "</span></div>" + "<p>" + productListData.product_name + "</p>" + '<div class="ready"><i class="iconfont icon-liwu"></i>' + productListData.product_swap + '人兑换</div>' + '<a href="javascript:;">立即兑换</a>' + "</li>"
			})
			$("#listJson").html(productHtml)


			let htmls = '';
			//floor给遍历出来的数组数据重新起名，这里forEach遍历出来的依然是一个数组
			strData.floors.forEach(floor => {
				htmls += '<dl class="' + floor.floor_class + '"><dt>' + floor.floordt + '</dt><dd>';
				floor.addresslist.forEach(addressObj => {
					htmls += '<a href="javascript:;">' + addressObj.address + '</a>';
				});
				htmls += '</dd></dl>'
			});
			$("#floor").html(htmls)

			$("#city").hover(function () {
				$(".city").addClass("citys");
				$(".floors").css("visibility", "visible");
			}, function () {
				$(".city").removeClass("citys");
				$(".floors").css("visibility", "hidden");
			})

			$(".floors").hover(function () {
				$(".city").addClass("citys");
				$(".floors").css("visibility", "visible");
			}, function () {
				$(".city").removeClass("citys");
				$(".floors").css("visibility", "hidden");
			})

			// A~Z楼层导航
			$(function () {
				floorFn({
					"target": ['.f-A', '.f-B', '.f-C', '.f-D', '.f-E', '.f-F', '.f-G', '.f-H', '.f-J', '.f-K', '.f-L', '.f-M', '.f-N',
						'.f-P', '.f-Q', '.f-R', '.f-S', '.f-T', '.f-W', '.f-X', '.f-Y', '.f-Z'
					],
					"active": "active",
					"container": ".floor-nav",
					"container2": ".floor"
				})

				function floorFn(json) {
					var arr = [];
					for (var i = 0; i < json.target.length; i++) {
						var oTop = $(json.target[i]).position().top
						if (oTop > $(".floor").outerHeight() - $(".floor-wrap").outerHeight()) {
							oTop = $(".floor").outerHeight() - $(".floor-wrap").outerHeight()
							arr.push(oTop)
						} else {
							arr.push(oTop)
						}
					}
					//console.log(arr)
					var Floor = "";
					strData.floors.forEach(dt => {
						Floor += "<li>" + dt.floordt + "</li>"
					})
					$(".floor-nav").html(Floor)


					$(".floor-nav li").mouseover(function () {
						//console.log(1)
						var num = $(this).index()
						$(".floor").css({
							"top": -arr[num],
						})
						//滚动条——导航关联比例
						var BarY = -arr[num] / ($(".floor").outerHeight() - $(".floor-wrap").outerHeight())
						//console.log(BarY)
						$(".bar").css({
							"top": BarY * -($(".bar-wrap").outerHeight() - $(".bar").outerHeight()),
						})
					})
				}
				$(".bar").mousedown(function (e) {
					$('.floor-wrap').mousemove(function (e) {
						var disY = e.clientY - $(".floor-wrap").offset().top;
						// 滚动条最大滚动高度
						var maxHeight = $(".bar-wrap").outerHeight() - $(".bar").outerHeight();
						//算出鼠标在bar上的位置
						var y = disY - $(".bar").outerHeight() / 2;
						if (y > maxHeight) {
							y = maxHeight
						} else if (y <= 0) {
							y = 0
						}
						$(".bar").css("top", y);
						//算出bar滚动的比例
						var moveY = y / maxHeight;
						$(".floor").css("top", -moveY * ($(".floor").outerHeight() - $(".bar-wrap").outerHeight()))
						console.log($(".floor").css("top"))
					})
					$(window).mouseup(function () {
						$('.floor-wrap').off("mousemove");
					})
					return false
				})

			})
		},
	});
	// 鼠标经过city样式
	// 顶部右边网站导航

	$(".dt").hover(function () {
		$(".dt").addClass("dts");
		$(".dd").css("display", "block");
	}, function () {
		$(".dt").removeClass("dts");
		$(".dd").css("display", "none");
	})

	$(".dd").hover(function () {
		$(".dt").addClass("dts");
		$(".dd").css("display", "block");
	}, function () {
		$(".dt").removeClass("dts");
		$(".dd").css("display", "none");
	})

	// 头部购物车

	$(".shop").hover(function () {
		$(".shop").css("border-bottom", "none");
		$(".Layer").css("display", "block");
	}, function () {
		$(".shop").css("border-bottom", "1px solid #d2d2d2");
		$(".Layer").css("display", "none");
	})
	$(".Layer").hover(function () {
		$(".shop").css("border-bottom", "none");
		$(".Layer").css("display", "block");
	}, function () {
		$(".shop").css("border-bottom", "1px solid #d2d2d2");
		$(".Layer").css("display", "none");
	})
	//sort开始
	var sort = ["全部", "家用电器", "手机数码", "电脑办公", "家居家纺", "男装女装", "鞋靴箱包", "个人化妆", "母婴玩具", "图书音像", "休闲运动", "腕表珠宝", "汽车气配", "食品酒水", "保健器材", "营养滋补", "礼品卡券"]
	for (var i = 0; i < sort.length; i++) {
		$(".List ul").html($(".List ul").html() + "<li>" + sort[i] + "</li>" + "<li></li>")
	}
	$(".List ul li:last").remove();
})
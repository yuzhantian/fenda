$(function(){
	$(".alert .dialog_inner").css({
	    "transform": "translate(-50%)",
	    "margin": "auto",
	    "background-color": "#fff",
	    "border-radius": ".2rem",
	    "display": "inline-block",
	    "left": "50%",
	});
	if($("input[name='continue_ask']").val() == ""){
		$("input[name='continue_ask']").val(1);
	}else if(parseInt($("input[name='continue_ask']").val()) == 0){
		$(".choose_ask").removeClass("choose_ask");
	}
	$(".choose_ask, .choose_pro").click(function(){
		if($(this).hasClass('choosen')){
			$(this).removeClass('choosen');
			($(this).find("input[name='continue_ask']").length == 1) && ($("input[name='continue_ask']").val(0));
		}else{
			$(this).addClass('choosen');
			($(this).find("input[name='continue_ask']").length == 1) && ($("input[name='continue_ask']").val(1));
		}
	})
	$(".askagain_click").click(function(){
		$(".askagain").removeClass("hidden");
	});
	$(".dialog").click(function(){
		$(this).addClass("hidden");
	});
	$(".protocol_click").click(function(){
		$(".protocol").removeClass("hidden");
	});
	$(".protocol .dialog_footer").click(function(){
		$(".choose_pro").addClass('choosen');
	});
	$(".btn").click(function(){
		if(!checkInfo()){
			return false;
		}
		location.href="index.html?flag=true"
		/*$.ajax({
			url: "http://lamp.chinacloudapp.cn/index.php/wechat/my/edit_save",
			type: "POST",
			data: {
				"openid":"o_Xftsw28atvUsIHOVnctia07oUc", //微信编号
				"title":$("textarea[name='title']").val(), //头衔
				"introduce":$("textarea[name='introduce']").val(), //个人介绍,
				"payment_amount":parseInt($("input[name='payment_amount']").val()),//提问金额
				"continue_ask":$("input[name='continue_ask']").val() //是否允许追问 1允许 0不允许
			},
			success: function(data){
				if (data.status == 1) {
					location.href="index.html"
				}
			}
		});*/
	});
	function myAlert(str){
		$(".alert").find("p").html(str).end().removeClass("hidden");
	}
	function checkInfo() {
		if($("textarea[name='title']").val() == ""){
			myAlert("头衔不能为空哦~");
			return false;
		}
		if($("textarea[name='introduce']").val() == ""){
			myAlert("简介不能为空哦~");
			return false;
		}
		if($("input[name='payment_amount']").val() == ""){
			myAlert("价格不能为空哦~");
			return false;
		}
		if(parseInt($("input[name='payment_amount']").val()) <= 0){
			myAlert("价格不能为零哦~");
			return false;
		}
		if(parseInt($("input[name='payment_amount']").val()) > 100){
			myAlert("价格不能大于100哦~");
			return false;
		}
		if ($(".choose_pro").length == 1) {
			if(!$(".choose_pro").hasClass("choosen")){
				myAlert("还未同意用户协议哦~");
				return false;
			}
		}
		return true;
	}
});
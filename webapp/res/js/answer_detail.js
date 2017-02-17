$(function(){
	// setWXConfig();
	var inter = null,
		localId;
	function setWXConfig() {
	    $.ajax({
	        type:"post",
	        url:"http://m.clean-soft.cn/oauth/getShareParam.action",
	        data: {"url":location.href,"callback":"?"},
	        dataType: "jsonp",
			jsonp: "callback",  
			jsonpCallback:"handler",
	        async:false,
	        success:function(data){
	        	wx.config({
	        	    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        	    appId: data.appid, // 必填，公众号的唯一标识
	        	    timestamp: data.timestamp, // 必填，生成签名的时间戳
	        	    nonceStr: data.nonceStr, // 必填，生成签名的随机串
	        	    signature: data.signature,// 必填，签名，见附录1
	        	    jsApiList: ['checkJsApi', 'startRecord','stopRecord','onVoiceRecordEnd','playVoice','uploadVoice','downloadVoice','onVoicePlayEnd','stopVoice'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	        	});
	        }
	    });
	}
	$(".record_start").click(function(){
		setRecording();
		wx.startRecord();
		inter = setInterval(function(){
			var num = parseInt($(".record_second").find("span").html())+1;
			$(".record_second").find("span").html(num);
			if(num == 60){
				clearInterval(inter);
				wx.stopRecord({
					success: function (res) {
	        			localId = res.localId;
	        			setPlay();
	    			}
				});
			}
		}, 1000);
		wx.onVoiceRecordEnd({
			complete: function (res) {
		        localId = res.localId;
		        clearInterval(inter);
		        setPlay();
		    }
		});
	});
	$(".recording").click(function(){
		clearInterval(inter);
		wx.stopRecord({
			success: function (res) {
    			localId = res.localId;
    			setPlay();
				$('.record').addClass('record_blue');
				$('.record_wrapper').find('.btn').removeClass('btn_gray').addClass('btn_orange');
			}
		});
	});
	//点击播放
	$(".play").click(function(){
		wx.playVoice({
			localId: localId
		});
		setPlaying();
		wx.onVoicePlayEnd({
			success: function (res) {
		        setPlay();
		    }
		});
	});
	//停止播放
	$(".playing").click(function(){
		wx.stopVoice({
			localId: localId 
		});
		setPlay();
		return false;
	});
	$('.record').click(function(){
		if ($('.record').hasClass('record_blue')) {
			setStart();
			wx.stopVoice({
				localId: localId 
			});
			$('.record').removeClass('record_blue');
			$('.record_wrapper').find('.btn').removeClass('btn_orange').addClass('btn_gray');
		}
	});
	function setStart() {
		$(".record_txt").html("点击开始录音，最多可录制60\"");
		$(".record_start").show().siblings().hide();
	}
	function setRecording(){
		$(".record_txt").html("录制中，再次点击停止录制");
		$(".recording").show().siblings().hide();
	}
	function setPlay(){
		$(".record_txt").html("播放试听");
		$(".play").show().siblings().hide();
	}
	function setPlaying(){
		$(".record_txt").html("播放中...");
		$(".playing").show().siblings().hide();
	}
	$(".btn").click(function() {
		// body...
		if(localId != undefined){
			wx.uploadVoice({
			    localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
			    isShowProgressTips: 1, // 默认为1，显示进度提示
		        success: function (res) {
			        serverId = res.serverId; // 返回音频的服务器端ID
			        $.ajax({
			        	url:"",
			        	type: "POST",
			        	data: {
			        		media_id: serverId,
			        		question_id: $("input[name='question_id']").val()
			        	},
			        	success: function(){
			        		//回答提交成功
			        	}
			        });
			    }
			});
		}
	});
});
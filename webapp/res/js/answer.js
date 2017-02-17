/****
弹出提示层
***/
var ALERT = {};
/****
弹出提示层在一定时间内消失
参数格式  对象{}
{
	content: '显示的内容'，
	time: 显示的时间后消失  单位秒 , 2即2秒
	.....扩展
}

***/
ALERT.tiembox = function(){
    var _this = {
        timeid:-1,
	    data:{},
        timeShow: function(param) {
             
             _this.setData(param);

             var temphtml = _this.createTimeHtml();

             $('body').append(temphtml);

             $('.content.layermchild').html(param.content)
             $('#timelayermbox .laymshade').bind('click', _this.hide);

    	     if(_this.data.time && _this.timeid == -1){
    	     	_this.timeid = setTimeout(function(){_this.hide()}, 1000 * _this.data.time)
    	     };
        },
        triggerShow: function(param){

        },
        hide:function(){
			$('#timelayermbox').remove();
			clearTimeout(_this.timeid);
			_this.timeid = -1;
		},
      
        setData:function(param){
       	  if(param.hasOwnProperty('time')){
       		 _this.data.time= param.time;
       	  }
       	  if(param.hasOwnProperty('target')){
       		  _this.data.target= param.target;
       	  }
       	  if(param.hasOwnProperty('content')){
       		  _this.data.content= param.content;
       	  }
       },
       /**
       显示的模版
       传入进来的内容替换content类节点的内容
       **/
       createTimeHtml:function() {
       	   var temphtml ='<div id="timelayermbox" class="layermbox">'+
           '<div class="laymshade"></div>'+
		   '<div class="layermmain">'+
			    '<div class="section">'+
					'<div class="content layermchild layermanim">'+
					   '<p>内容</p>'+
					'</div>'+
			    '</div>'+
		    '</div>'+
	       '</div>';
	       return temphtml;
       },
	};
	return _this;
}();




//问题回答
var ANSWER = {};
ANSWER = function(){
	var _this = {
           initEvent: function() {
                $('.Reward .reward-btn').bind('click', _this.handleClick); 
	       },
	       handleClick: function (e) {
           ALERT.tiembox.timeShow({
       	          content: '<p>还没听就赞赏，<br/>你是有钱任性吗？</p>',
       	          //time:30
                });
	       },
	   //二维吗
	        handleClick2: function (e) {
                ALERT.tiembox.timeShow({

       	             content: '<div style="textAlign:center"><img src="../../res/images/erweimatest.png"><p>微信扫一扫，进入下一步</p></div>'
                });
	        },
    };
    return _this;   
}();

ANSWER.initEvent();


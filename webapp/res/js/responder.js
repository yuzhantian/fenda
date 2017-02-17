/**回答者**/
var responder = {
    
    initEvent: function(){
    //收听按钮
    var listenbtn = $("#detail .selfinfo .content a");
    listenbtn.bind('click', function(e){
      if($(this).is('.ready-listen-btn')){//未收听
          $(this).removeClass('ready-listen-btn')
                 .addClass('listen-btn');
         $(this).children('.btntext').text("收听");//
      }else if($(this).is('.listen-btn'))//已经收听
      {
       $(this).removeClass('listen-btn')
                 .addClass('ready-listen-btn');
         $(this).children('.btntext').text("已收听");//
      }
      e.preventDefault();
    });



     //填写提问内容
     var textarea =$("#Question .questioncontent textarea");
    textarea.change( function() {
       console.log($(this).val());
    });

    var check =$("#Question .questioncontent .tips");
    check.bind('click', function(e){
    	if(e.target.localName == "input"){
           var bool = $("input[type='checkbox']").is(':checked');
    	     if(!bool){
            ALERT.tiembox.timeShow({
                  content: "<p>私密提问，可获得专属语音回答</p>",
                  time:2
                });
    	     }
    	}
    });

    var submit =$("#Question .questioncontent .btn-submit");
      submit.bind('click', function(e){
    	if(textarea.val() ==''){
        console.log("1111");
        ALERT.tiembox.timeShow({
                content: "<p>问题不能为空哦</p>",
                time:2
          });
        return false;
    	}
    });
  },


};

$(function(){
	responder.initEvent();
});
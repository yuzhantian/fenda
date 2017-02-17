/**收听最新问题**/
var LISTEN =  {
  currentPage: 1,
  totalPage: 100,
  maxNum: 100,
  loading: false,
  
  initPage: function(cur, maxNum) {
    this.currentPage = cur;
    this.maxNum = maxNum;
  },
  addEvent: function() {
    window.removeEventListener("scroll", this._handleScroll)
    window.addEventListener("scroll", this._handleScroll);
    self2=this;
  },
  _handleScroll: function() {
    var win = $(window),
      dom = $(document);
      console.log('win.scrollTop()='+win.scrollTop());
      console.log('win.height()='+win.height());
      console.log('dom.height()='+dom.height());
      console.log('dom.height() - (win.scrollTop() + win.height())='+(dom.height() - (win.scrollTop() + win.height())));
    if(dom.height() - (win.scrollTop() + win.height()) <= 80) {
     self2._loadMore();
    }
  },
  //加载
  _loadMore: function(e) {
    if (!this.loading) { //加载
      $('.questionstyle1 li:last-child').removeClass('hide');
      var t = this;
      // $.ajax({
      //   url: "/api/v1/questions/rank",
      //   data: {
      //     page: this.state.page,
      //     per_page: this.state.per_page
      //   },
      //   success: function(e) {
      //     t.loading = false;

      //   }.bind(this),
      //   error: function(t) {

      //   }.bind(this)
      // })
      var arr = [{
        nicename: "王峰",
        job: '歌者，创作者等',
        question: '问题描述问题描述1',
        day: '1天前',
        visitor: '59人'
      }, {
       nicename: "王峰2",
        job: '歌者，创作者等2',
        question: '问题描述问题描述2',
        day: '4天前',
        visitor: '59人'
      }, {
        nicename: "王峰3",
        job: '歌者，创作者等3',
        question: '问题描述问题描述3',
        day: '8天前',
        visitor: '59人'
      }];
      var result = '';
      for (var i = 0; i <= arr.length -1; i++) {
        var data = arr[i];
        result += self2.setItemData(data);
      }
      setTimeout(function() {
        var el =  $('.questionlistcontainer ul li:last-child');
      el.before(result);
       $('.questionlistcontainer ul li:last-child').removeClass('hide');
      }, 3000);
    } else {
      $('.questionlistcontainer ul li:last-child').addClass('hide');
    }
  },

  setItemData: function(data) {
    var str = "";
    str += '<li class="content">'+
          '<a href="../Common/question_answer.html">'+
            '<p class="totorcontent">'+
              '<span class="nicename">'+data.nicename+'</span>'+
              '<span class="gap"> | </span>'+
              '<span class="job">'+data.job+'</span>'+
              '<span>回答了</span>'+
            '</p>'+
            '<p class="question">'+data.question+'</p>'+
            '<div class="clearfix">'+
               '<span class="left">'+data.day+'</span>'+
               '<span class="right">听过<strong> '+data.visitor+'</strong></span>'+
            '</div>'+
          '</a>'+
        '</li>';
         return str;
  },


  initEvent:function(){
    var el = $(".leaders .a-leader .AS");
    el.bind('click', function(e){
      alert($(this).attr('id'));
      e.preventDefault();
    });

    //收听按钮
    var listenbtn = $(".leaders .a-leader .leader-deal a");
    listenbtn.bind('click', function(e){
      if($(this).is('.ready-listen-btn')){//未收听
          $(this).removeClass('ready-listen-btn')
                 .addClass('listen-btn');
         $(this).children('div').children('.btntext').text("收听");//
      }else if($(this).is('.listen-btn'))//已经收听
      {
       $(this).removeClass('listen-btn')
                 .addClass('ready-listen-btn');
         $(this).children('div').children('.btntext').text("已收听");//
      }
     // alert($(this).attr('id'));
      e.preventDefault();
    });
  },
};

$(function() {
  LISTEN.initPage(1,10);
  LISTEN.addEvent();
  LISTEN.initEvent();
});
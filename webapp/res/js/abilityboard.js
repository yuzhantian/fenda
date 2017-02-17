/**才华榜**/
var ABILITY_BOARD =  {
  currentPage: 1,
  totalPage: 100,
  maxNum: 100,
  loading: false,
  
  initPage: function(cur, maxNum) {
    this.currentPage = cur;
    this.maxNum = maxNum;
  },
  addEvent: function() {
   // if (window.hasEventListener('scroll')) {
      window.removeEventListener("scroll", this._handleScroll)
   // }
    window.addEventListener("scroll", this._handleScroll);
    self2=this;
  },
  _handleScroll: function() {
    var self = self2;
    var e = $(window),
      t = $(document);
      console.log(e.scrollTop() + e.height() - t.height());
    if(e.scrollTop() + e.height() > t.height() - 80) {
     self2._loadMore();
    }
  },
  //加载
  _loadMore: function(e) {
    if (!this.loading) { //加载
      $('.leaders li:last-child').removeClass('hide');
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
        nickname: "nickname",
        respondent: '2陈海贤｜心理学博士，咨询师，一语道22',
        imgsrc: '../../res/images/questionericon.jpg',
        'num': '149',
        visitor: '595'
      }, {
        nickname: "nickname",
        respondent: '2陈海贤｜心理学博士，咨询师，一语道22',
        imgsrc: '../../res/images/questionericon.jpg',
        'num': '319',
        visitor: '5'
      }, {
        nickname: "nickname",
        respondent: '2陈海贤｜心理学博士，咨询师，一语道22',
        imgsrc: '../../res/images/questionericon.jpg',
        'num': '192',
        visitor: '80'
      }];
      var result = '';
      for (var i = 0; i <= arr.length -1; i++) {
        var data = arr[i];
        result += self2.setItemData(data);
      }
      setTimeout(function() {
        var el =  $('.leaders li:last-child');
      el.before(result);
       $('.leaders li:last-child').removeClass('hide');
      }, 3000);
    } else {
      $('.leaders li:last-child').addClass('hide');
    }
  },

  setItemData: function(data) {
    var str = "";
    str +='<li class="a-leader">'+
      '<a data-id="590426097" class="AS" href="../responder/responder.html">'+
        '<div class="avatar avatarsbigsize">'+
          '<img  class="avatarImg avatarsbigsize" src="'+data.imgsrc+'" >'+
          '<span></span>'+
        '</div>'+
        '<div class="leader-content">'+
          '<h3 class="leader-nickname">'+data.nickname+'</h3>'+
          '<p class="leader-title">'+data.respondent+'</p>'+
          '<p class="leader-summary">'+
            '<span class="leader-answers_count" >'+
              '<span >'+data.num+'</span>'+
              '<span>个回答</span>'+
            '</span>'+
            '<span>'+
              '<span >'+data.visitor+'</span>'+
              '<span >人收听</span>'+
            '</span>'+
          '</p>'+
        '</div>'+
      '</a>'+
    '</li>'
    return str;
  },
};

$(function() {
  ABILITY_BOARD.initPage(1,10);
  ABILITY_BOARD.addEvent();
});
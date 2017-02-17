/**问题榜**/
var QUESTION_BOARD =  {
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
        content: "content1",
        respondent: '2陈海贤｜心理学博士，咨询师，一语道22',
        imgsrc: '../../res/images/questionericon.jpg',
        'price': '1 元',
        visitor: '59人'
      }, {
        content: "content2",
        respondent: '2陈海贤｜心理学博士，咨询师，一语道22',
        imgsrc: '../../res/images/questionericon.jpg',
        'price': '2 元',
        visitor: '59人'
      }, {
        content: "content3",
        respondent: '2陈海贤｜心理学博士，咨询师，一语道22',
        imgsrc: '../../res/images/questionericon.jpg',
        'price': '6元',
        visitor: '585人'
      }];
      var result = '';
      for (var i = 0; i <= arr.length -1; i++) {
        var data = arr[i];
        result += self2.setItemData(data);
      }
      setTimeout(function() {
        var el =  $('.questionstyle1 li:last-child');
      el.before(result);
       $('.questionstyle1 li:last-child').removeClass('hide');
      }, 3000);
    } else {
      $('.questionstyle1 li:last-child').addClass('hide');
    }
  },

  setItemData: function(data) {
    var str = "";
    str += '<li class="a-question"> ' +
      '<a href="../Common/question_answer.html">' +
      '<div class="question-content">' +
         '<p>' + data.content + new Date().getTime()+'</p>' +
      '</div> '+
      '<div class = "question-respondent">' + data.respondent + '</div> '+
      '<div class = "question-answer" >' +
         '<div class="avatar avatarsize">' + 
             '<img class = "avatarImg avatarsize"src = "../../res/images/questionericon.jpg"> ' +
          '</div>'+
       '<div class = "question-voice">'+
        '<span class = "bubble" >'+
           '<span class = "bubble-tail " > </span >' +
           '<span class = "wave3" > </span > '+
           '<span class = "bubble-price" > '+ data.price +' </span > '+
        '</span >'+ 
      '</div >'+
         '<div class = "question-visitor"> '+
            '<span > 听过 </span >'+
            '<span >'+data.visitor+' </span > '+
         '</div >'+
         '</div >'+
         '</a >'+
         '</li >';
         return str;
  },
};

$(function() {
  QUESTION_BOARD.initPage(1,10);
  QUESTION_BOARD.addEvent();
});
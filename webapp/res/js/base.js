//执行默认函数
window.onload = function(){
  //初始字体
  BASE.adapterFontSize();
  SEARCH.initSearchEvent();
}
// $(function() {
// });

//----------------------------基础公用begin---------------------
/**
基础公用js
公用方法
**/
var BASE = {
  /**
      设计搞尺寸根据iphohon6来设计。超过iphone6的逻辑像素375话（不死屏幕分辨率），
      即document.documentElement.clientWidth，
      font-size的大小为20px；小于这个值，才会动态计算。
      注：
      iPhone6的屏幕分辨率是1334*750px，屏幕像素密度ppi(dpi)是326，
      所以系数是2x。那密度独立像素dpdevice-width就等于750/2=375px。
      设备像素比（DPR） = 物理像素 / 逻辑像素（device-width）
   */
  adapterFontSize: function() {
    var defaultMaxFontSize = 20; //px
    var designSize = 375; //px (设计搞尺寸750px(设备尺寸)， 理想视口：375，)
    var t = document.documentElement;
    var wd = t.clientWidth;
    if (designSize > wd) {
      (t.style.fontSize = defaultMaxFontSize * (wd / designSize) + "px")
    } else {
      t.style.fontSize = defaultMaxFontSize + "px";
    }
  },
  currentPange: function() {
    alert(this.liu);
    this.liu = 50;
    alert(this.liu);
  },
};
//----------------------------基础公用end---------------------
//----------------------------搜索begin---------------------------
//搜索
var SEARCH = {
  
    initSearchEvent: function() {
      var le = $('#searchTrigger');
      console.log(le);
     $('#searchTrigger').click(function() {
          console.log(00000);

       $('#search').show();
       $('#searchTrigger').hide();
       $('#searchmask').addClass("searchmask");
     });

     $('#searchclose').click(function() {
      console.log(11111);
       $('#search').hide();
       $('#searchTrigger').show();
       $('#searchmask').removeClass("searchmask");
     });


     $('.submit').click(function(e){

      var input = $('form input');
          if(input.val() == ''){
             e.preventDefault();
          };
     });
  }, 
};
//----------------------------搜索end---------------------------



//----------------------------弹出层begin-------------------------
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


//----------------------------弹出层end-------------------------

//----------------------------api begin-----------------
//配置一些数据协议接口
var serverConfig = {};

//----------------------------api end-------------------


//----------------------------异步拉取数据begin-----------------
var serverConfig = {};
serverConfig.pageNames = {
    FIGURE_BOOK:'figure_book',
    FIGURE_BOOK_LIST:'figure_book_list',
    QUESTION_BOOK: 'quesion_book',
    QUESTION_BOOK_LIST:'quesion_book_list',
};
var serverData = function(){
  var _this = {
       data: {
          currentPage: 1,
          currentPageName: '',
          loading: false
       },
    
       setData:function(param){
         _this.data.currentPage = param.currentPage;
         _this.data.currentPageName = param.currentPageName;
         _this.data.loading = false;
       },
       
       addScrollEvent: function() {
         window.removeEventListener("scroll", _this._handleScroll)
         window.addEventListener("scroll", _this._handleScroll);
       },
       _handleScroll: function() {
       var win = $(window),dom = $(document);
       console.log('win.scrollTop()='+win.scrollTop());
      console.log('win.height()='+win.height());
      console.log('dom.height()='+dom.height());
      console.log('dom.height() - (win.scrollTop() + win.height())='+(dom.height() - (win.scrollTop() + win.height())));
       if(dom.height() - (win.scrollTop() + win.height()) <= 80) {
            _this._loadMore();
       };
     },
     //加载
     _loadMore: function() {
        switch(_this.data.currentPageName){
          case serverConfig.pageNames.FIGURE_BOOK:
            _this._loadFigureMore();
            break;
          case serverConfig.pageNames.FIGURE_BOOK_LIST:
            _this._loadFigureListMore();
            break;
        }
      },
      //请求加载人物入住
      _loadFigureMore:function(){
        if (!_this.data.loading) { //加载
      $('.bookcontainer li:last-child').removeClass('hide');
       _this.data.loading = true;
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
        name: "这些机构都入驻啦1",
        num: 29,
      }, {
       name: "这些机构都入驻啦2",
        num: 45,
      }, {
        name: "这些机构都入驻啦3",
        num: 50,
      }];
      
      var result = '';
      for (var i = 0; i <= arr.length -1; i++) {
        var data = arr[i];

          var html = ''
      html+='<li class="a-book">'+
        '<a class="" href="./figure_book_list.html">'+
          '<img class="book-icon" src="../../res/images/book_recommend_icon.png">'+
          '<div class="book-summary">'+
            '<p class="book-name">'+data.name+'</p>'+
            '<p class="book-count">'+
              '<span>'+data.num+'</span>'+
              '<span>个答主</span>'+
            '</p>'+
          '</div>'+
       '</a>'+
      '</li>';
        result += html;
      }
      setTimeout(function() {
        var el =  $('.bookcontainer ul li:last-child');
      el.before(result);
       $('.bookcontainer ul li:last-child').removeClass('hide');
       _this.data.loading = false;
      }, 3000);
    }
      },
       //请求加载人物入住具体liebiao
      _loadFigureListMore:function(){
        if (!_this.data.loading) { //加载
      $('.bookfigurecontainer li:last-child').removeClass('hide');
       _this.data.loading = true;
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
        name: "这些机构都入驻啦1",
        num: 29,
        title:'罗辑思维每日问答1',
        visotor: 50,
      }, {
        name: "这些机构都入驻啦2",
        num: 292,
        title:'罗辑思维每日问答2',
        visotor: 502,
      }, {
         name: "这些机构都入驻啦3",
        num: 293,
        title:'罗辑思维每日问答3',
        visotor: 503,
      }];
      
      var result = '';
      for (var i = 0; i <= arr.length -1; i++) {
        var data = arr[i];

          var html = ''
      html='<li class="a-figure">'+
          '<a href="../Common/responder.html">'+
            '<div class="avatar avatarsbigsize">'+
              '<img class="avatarImg avatarsbigsize" src="../../res/images/questionericon.jpg" >'+
            '</div>'+
            '<div class="figure-summary">'+
              '<p class="figure-desc">'+
                '<span class="nickname">'+data.name+'</span>'+
                '<span class="title">'+data.title+'</span>'+
              '</p>'+
              '<p class="state">'+
                '<span>'+data.num+'</span>'+
                '<span>个回答，</span>'+
                '<span >'+data.visotor+'</span>'+
                '<span >人收听</span>'+
              '</p>'+
            '</div>'+
          '</a>'+
          '<div class="book-figure-deal">'+
            '<a href="javascript:;" class="listen-btn">'+
            '<span class="icon"></span>'+
            '<span class="btntext">收听</span>'+
            '</a>'+
          '</div>'
        '</li>';
        result += html;
      }
      setTimeout(function() {
        var el =  $('.bookfigurecontainer ul li:last-child');
         el.before(result);
         $('.bookfigurecontainer ul li:last-child').removeClass('hide');
        _this.data.loading = false;
       // _this.initEvent();
        }, 3000);
       }
      },

      initEvent: function (){
    //收听按钮
    var listenbtn = $(".book-figure ");
    //listenbtn.unbind('click');
    listenbtn.on('click','.a-figure .book-figure-deal a', function(e){
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
     // alert($(this).attr('id'));
      e.preventDefault();
    });
  },
     };
  return _this;
}();

//----------------------------异步拉取数据end-------------------




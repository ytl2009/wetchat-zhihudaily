
var wxParse = require('../../wxParse/wxParse.js')
var id;

Page({
  data: {
    art: {},
    comments:{}
  },
  
  onLoadComments(){
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/story-extra/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          comments: res.data
        })
      },
      fail(e) {
        console.log(e);
      },
      complete() {
        console.log("-----onLoadComments complete------------")
      }
    })
  },

  onReady() {
    console.log("------detail onReady-----------")
    this.onLoadComments();
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad (options) {
    var that = this
    id = options.id;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         if (res.data.body) {
           wxParse.wxParse('article', 'html', res.data.body, that, 5);
         }
         that.setData({
           art: res.data
         })
      },
      complete() {
        console.log("-------detail request complete ------------")
      }
    })
  },

  
})
var wxParse = require('../../wxParse/wxParse.js')

Page({
  data: {
    themedetail: {},
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '主题详情'
    })
  },
  onLoad(options) {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.body) {
          wxParse.wxParse('article', 'html', res.data.body, that, 5);
        }
        that.setData({
          themedetail: res.data
        })
      },
      fail(e){
        console.log(e)
      }
    })
  }
})
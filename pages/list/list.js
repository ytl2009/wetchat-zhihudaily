var id;
Page({
  data: {
    list: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.title
    })
  },
  onLoad: function (options) {
    var that = this
    this.title = options.title
    id = options.id
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/theme/' + id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
         that.setData({
           list: res.data.stories
         })
         console.log(res.data)
      }
    })
  },
  onPullDownRefresh(){
    console.log('------------下拉刷新---------------')
    var that = this;
    wx.showNavigationBarLoading()

    wx.request({
      url: 'https://news-at.zhihu.com/api/4/theme/'+id,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data.stories
        })
        console.log(res.data)
      },
      fail(e) {
        console.log('------------请求失败-------------' + e)
      },
      complete() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  }
})

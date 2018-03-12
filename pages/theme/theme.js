Page({
    data: {
      list: []
    },
    onLoad: function () {
      var that = this
      wx.request({
        url: 'https://news-at.zhihu.com/api/4/themes',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            list: res.data.others
          })
        }
      })
    },
    onPullDownRefresh(){
      console.log('------------下拉刷新---------------')
      var that = this
      wx.showNavigationBarLoading()
      
      wx.request({
        url: 'https://news-at.zhihu.com/api/4/themes',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          that.setData({
            list: res.data.others
          })
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
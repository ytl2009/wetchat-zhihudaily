//index.js
//获取应用实例
var app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  //事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },
  onLoad () {
    let that = this
    that.setData({ loading: true })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         that.setData({
           banner: res.data.top_stories,
           list: [{ header: '今日热闻' }].concat(res.data.stories)
         })
      },

      complete(){
        console.log("-----onLoad complete------------")
      }
    })
    this.index = 1
  },
  onPullDownRefresh(){
    console.log('------------下拉刷新---------------')
    var that = this
    wx.showNavigationBarLoading()

    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      headers:{'Content-Type':'application/json'},

      success(res){
        that.setData({
          banner: res.data.top_stories,
          list: [{ header: '今日热闻' }].concat(res.data.stories)
        })
      },
      fail(e){
        console.log('------------请求失败-------------'+e)
      },
      complete(){
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  },
  onLoadMore(e){
    console.log('--------onLoadMore----上拉加载----------')
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date))),
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          loading: false,
          list: that.data.list.concat([{ header: utils.formatDate(date, '-') }]).concat(res.data.stories)
        })
      }
    })
  },

})

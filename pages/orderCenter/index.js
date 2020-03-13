// pages/index/index.js
const app = getApp();
var network = require("../../utils/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '梧桐鹰眼',
    StatusBar: app.globalData.StatusBar,
    CustomBar: '105px',
    tenderData: '',
    actIndex: 0,
    TabCur: 0,
    showCover: app.globalData.showCover,
    tabList: ['数据概览'],
    scrollLeft: 0
  },

  onChange: function (options) {
    this.setData({
      actIndex: options.detail.index
    })
    const tenderData = this.selectComponent("#tenderData");
    tenderData.onMyButtonTaps()
    const imageData = this.selectComponent("#imageData");
    imageData.onMyButtonTaps()
  },
  tabSelect(e) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
      showCover: false
    })
  },
  onGetShow: function (e) {
    // console.log(e.detail.showCover)
    this.setData({
      showCover: e.detail.showCover
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单数据统计' //页面标题为路由参数
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  showHints() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const index = this.data.TabCur
    console.log(index)
    if (index == 0) {
      let orderData = this.selectComponent('#orderData');
      orderData.getData();
    } else if (index == 1) {
      let imageData = this.selectComponent('#imageData');
      imageData.getData();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
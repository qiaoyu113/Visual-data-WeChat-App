// pages/login/login.js
const app = getApp();
var network = require("../../utils/network.js");
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''
  },
  //输入账号
  phoneInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  //输入密码
  phoneInput2: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  login(){
    let that = this;
    let name = that.data.name;
    let password = that.data.password;
    if (name == '') {
      Notify({
        text: '请输入用户名',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#1cbbb4'
      });
      return false;
    }
    if (password == '') {
      Notify({
        text: '请输入密码',
        duration: 1000,
        selector: '#van-notify',
        backgroundColor: '#1cbbb4'
      });
      return false;
    }
    network.requestLoading('api/auth/bss/getToken',
      {
        password: password,
        username: name
      },
      'POST',
      '',
      'json',
      function (res) {
        if (res.data.flag) {
          wx.setStorage({
            key: 'admin',
            data: [name, password],
            success: function (res) {
              
            },
            fail: function (res) {
              Notify({
                text: res.errMsg,
                duration: 1000,
                selector: '#van-notify',
                backgroundColor: '#1cbbb4'
              });
            }
          })
          // 存储
          wx.setStorage({
            key: 'userInfo',
            data: {
              ...res.data.userInfoVO
            }
          })
          wx.setStorage({
            key: 'token',
            data: res.data.token,
            success: function (res) {
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 2000
              })
              wx.redirectTo({
                url: '../dataCenter/index'
              });
            },
            fail: function (res) {
              Notify({
                text: res.errMsg,
                duration: 1000,
                selector: '#van-notify',
                backgroundColor: '#1cbbb4'
              });
            }
          })
        } else {
          Notify({
            text: res.data.msg,
            duration: 1000,
            selector: '#van-notify',
            backgroundColor: '#1cbbb4'
          });
        }
      },
      function () {
        wx.showToast({
          title: '登陆失败',
        });
      });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.setNavigationBarTitle({
      title: '登陆' //页面标题为路由参数
    });
    that.cleanToken();
    wx.getStorage({
      //获取数据的key
      key: 'admin',
      success: function (res) {
        var admin = res.data;
        that.setData({
          name: admin[0],
          password: admin[1]
        })
      }
    })
  },

  // 取消登陆
  backBtn() {
    let that = this;
    wx.redirectTo({
      url: '/pages/welcome/welcome',
    })
  },

  //清除token
  cleanToken() {
    wx.removeStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
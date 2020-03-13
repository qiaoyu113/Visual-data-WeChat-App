//app.js
import * as echarts from 'ec-canvas/echarts';

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log('login',res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
        // 登录成功后存token
        // wx.setStorage({
        //   key:'KtcNGbsFV35gHldcjgWd0g==',
        //   data:'oQdm84n33zYoU8MqXzBQoT4rdu_M'
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      },
      fail: res => {
        // console.log('fail')
      }
    })
    wx.getStorage({
      'key':'token',
      success:(res)=>{
        this.globalData.token = res.data
      }
    })

    //获取设备指定样式
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        this.globalData.CustomBar = e.platform == 'android' ? e.statusBarHeight + 50 : e.statusBarHeight + 45;
      }
    })

    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })
  },
  globalData: {
    token:null,
    userInfo:null,
    menuActiveKey: '0',
    url: 'https://firmiana-bss-api-m1.yunniao.cn/', 
    // url: 'http://172.17.101.77:20150/', 
    // url: 'https://firmiana-bss-api.yunniao.cn/',
    imgUrl: 'http://test.resource.vjuzhen.com/'
  }
})
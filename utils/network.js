var app = getApp()
var urls = app.globalData.url
var shopId = app.globalData.shopId
function request(url, params, met, message, success, fail) {
  this.requestLoading(url, params, met, message, success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调
function requestLoading(url, params, met,message, success, fail) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.getStorage({
    //获取数据的key
    key: 'openId',
    success: function (res) {
      var token = res.data
      wx.request({
        url: urls + url,
        data: params,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': token,
        },
        method: met,
        success: function (res) {
          //console.log(res.data)
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          if (res.statusCode == 200) {
            success(res.data)
          } else {
            fail()
          }

        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          fail()
        },
        complete: function (res) {

        },
      })
    },
    fail: function (res) {
      var token = ''
      wx.request({
        url: urls + url,
        data: params,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': token,
        },
        method: met,
        success: function (res) {
          //console.log(res.data)
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          if (res.statusCode == 200) {
            success(res.data)
          } else {
            fail()
          }

        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          fail()
        },
        complete: function (res) {

        },
      })
    }
  })
}

//数据转化  
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//时间戳
function formatTime(number, format) {

  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];

  var date = new Date(number * 1000);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

module.exports = {
  request: request,
  requestLoading: requestLoading,
  formatTime: formatTime
}
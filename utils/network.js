var app = getApp()
var urls = app.globalData.url
var shopId = app.globalData.shopId

function request(url, params, met, message, types, success, fail) {
  this.requestLoading(url, params, met, message, types, success, fail)
}
// 展示进度条的网络请求
// url:网络请求的url
// params:请求参数
// message:进度条的提示信息
// success:成功的回调函数
// fail：失败的回调

function requestLoading(url, params, met, message, types, success, fail) {
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  let contentType = '';
  if (types == 'json') {
    contentType = 'application/json';
  } else {
    contentType = 'application/x-www-form-urlencoded';
  }
  wx.getStorage({
    //获取数据的key
    key: 'token',
    success: function (res) {
      var token = res.data;
      wx.request({
        url: urls + url,
        data: params,
        header: {
          'content-type': contentType,
          'Authorization': token,
        },
        method: met,
        success: function (res) {
          if (res.data.code == 40101) {
            getRouter();
          } else if (res.data.code == 40301) {
            wx.showToast({
              title: "权限验证失败",
              icon: 'loading',
              duration: 2000,
            })
          } else if (res.data.errorCode == 505) {
            wx.hideNavigationBarLoading()
            fail()
          } else {
            wx.hideNavigationBarLoading()
            if (message != "") {
              wx.hideLoading()
            }
            if (res.statusCode == 200) {
              success(res.data)
            } else {
              fail()
            }
          }
        },
        fail: function (res) {
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          getRouter();
        },
        complete: function (res) {

        },
      })
    },
    fail: function (err) {
      if(getRouter()){
        wx.setStorage({
          key: 'token',
          data: ''
        })
        requestLoading(url, params, met, message, types, success, fail)
      };
    }
  })
}

function getRouter() {
  let router = getCurrentPages()[getCurrentPages().length - 1].route;
  let index = router.lastIndexOf("\/");
  router = router.substring(index + 1, router.length);
  let roterList = ['index'];
  for (let i = 0; i < roterList.length; i++) {
    if (roterList[i] == router) {
      wx.showToast({
        title: "登陆已过期",
        icon: 'loading',//图标，支持"success"、"loading" 
        duration: 1000,
      })
      setTimeout(()=>{
        wx.redirectTo({
          url: '/pages/login/login'
        });
      },1000)
      break;
    }
  }
  return true
  // getWxOpenId();
}

//获取openid
function getWxOpenId() {
  var pagelist = getCurrentPages();
  wx.showToast({
    title: "正在登录",
    icon: 'loading',//图标，支持"success"、"loading" 
    duration: 2000,
  })
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId

      // 登录成功后存token
      let code = res.code
      wx.setStorage({
        key: 'code',
        data: code
      })
      wx.setStorage({
        key: 'token',
        data: ''
      })
      requestLoading('api/auth/v1/jwt/token', {
        wxCode: code
      },
        'POST',
        '',
        '',
        function (res) {
          if (res.success) {
            wx.setStorage({
              key: 'openId',
              data: res.data.openId
            })
            wx.setStorage({
              key: 'token',
              data: res.data.token
            })
            if (getCurrentPages().length != 0) {
              //刷新当前页面的数据
              getCurrentPages()[getCurrentPages().length - 1].onLoad();
            }
          }
        },
        function (res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
    },
    fail: res => {
      wx.showToast({
        title: "删除旧版重进",
        icon: 'loading',//图标，支持"success"、"loading" 
        duration: 2000,
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
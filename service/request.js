const baseurl = "https://www.madcoder.cn/"
var app = getApp()

function request(options) {

  // 增加调整参数
  let opt = options;
  opt.url = baseurl + opt.url;
  let token = app.globalData.token;
  // 判断是否获取token
  if(token){
    opt.header = {
      'Authorization': 'bearer '+ token
    }
  }
  return new Promise((resolve, reject) => {
    opt.success = (res)=> {
      resolve(res)
    }
    opt.fail = (res)=> {
      reject(res)
    }
    wx.request(opt);
  })

};

module.exports = {  
  request: request
}

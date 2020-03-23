// pages/answer/answer.js
var network = require("../../utils/network.js");
// const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    score: [],
    activeNames: [],
    name: '',
    cityName: '',
    userInfo: null,
    total: 100,
    disabled: true,
    clock: {},
    show: false,
    time1: null, // 定时器变量
    time: ''// 倒计时
  },
  onChange(e) {
    const { part, index } = e.target.dataset
    let val = Number(e.detail).toFixed(1)
    this.setData({
      [`list[${part}].itemInfoVOList[${index}].score`]: val
    });
  },
  onOpen(e) {
    this.setData({
      activeNames: e.detail
    });
  },
  regInput(e) {
    const { part, index, max } = e.target.dataset
    let val = '';
    let value = Number(e.detail.value);
    let subVal = this.getScore(value, part, index)// 计算总分减去输入后的值
    if (value > max || subVal < 0) {
      val = e.detail.value.substring(0, e.detail.value.length - 1);
    } else if (/^(\d?){0,3}(\.\d{0,1})?$/.test(e.detail.value)) {
      val = e.detail.value;
    } else {
      val = e.detail.value.substring(0, e.detail.value.length - 1);
    }
    let total = 0;
    this.data.list[part].itemInfoVOList.forEach((row, j) => {
      if (index !== j) {
        total = this.accAdd(total, Number(row.score))
      }
    })
    this.setData({
      [`list[${part}].itemInfoVOList[${index}].score`]: val,
      [`list[${part}].total`]: this.accAdd(total, Number(val)),
      total: this.getScore(val, part, index)
    });
    return val
  },
  setIptStorage() {
    // 失去焦点后存储数据
    const list = []
    this.data.list.forEach(item => {
      item.itemInfoVOList.forEach(row => {
        list.push({
          itemId: row.itemId,
          score: row.score
        })
      });
    })
    wx.setStorage({
      key: "score",
      data: list
    });
  },
  setInptScore() {
    const score = wx.getStorageSync('score');
    const list = this.data.list;
    list.forEach(item => {
      let total = 0;
      if (item.itemInfoVOList && item.itemInfoVOList.length > 0) {
        item.itemInfoVOList.forEach((row) => {
          var i = null;
          if (score && score.length > 0) {
            i = score.find(item => item.itemId === row.itemId)
          }
          row.score = i ? i.score : '';
          total = this.accAdd(total, Number(row.score))
        })
      }
      item.total = total;
    });
    const total = this.getScore()
    this.setData({
      list: list,
      total: total
    })
  },
  getScore(val, part, index) {
    /**
     * val 要加的值
     * part 父级index
     * index 子级index
     */
    var total = 0;
    this.data.list.forEach((item, i) => {
      if (item.itemInfoVOList && item.itemInfoVOList.length > 0) {
        item.itemInfoVOList.forEach((row, j) => {
          if (typeof part === "undefined") {
            total = this.accAdd(total, Number(row.score))
          } else {
            if (part !== i || index !== j) {
              total = this.accAdd(total, Number(row.score))
            }
          }

        })
      }
    });
    if (typeof part !== "undefined") {
      total = this.accAdd(total, val);
    }
    return this.accSub(100, total)
  },
  getItemRecords() {
    let that = this;
    network.requestLoading('api/datacenter/help/city/item/records', {},
      'get',
      '',
      'json',
      function (res) {
        if (res.success) {
          // 插入参数
          res.data.forEach(item => {
            var total = 0;
            if (item.itemInfoVOList && item.itemInfoVOList.length > 0) {
              item.itemInfoVOList.forEach((row) => {
                // total = that.accAdd(total, row.maxScore)
                row.score = '';
              })
            }
            item.total = total; // 总分数
          });
          that.setData({
            list: res.data
          })
        } else {
          wx.showToast({
            title: res.errorMsg,
          });
        }
      },
      function (res) {
        wx.showToast({
          title: '加载数据失败',
        });
      });
  },
  getInfo() {
    const that = this;
    let cityArray = wx.getStorageSync('cityArray')
    wx.getStorage({
      key: 'userInfo',
      success({ data }) {
        const item = cityArray.find(item => item.codeVal === data.city)
        that.setData({
          name: data.name,
          cityName: item ? item.code : '',
          userInfo: data
        })
      }
    })
  },
  getStatus() {
    // 获取按钮状态
    let that = this;
    network.requestLoading('api/datacenter/help/city/item/clock', {},
      'get',
      '',
      'json',
      function (res) {
        if (res.success) {
          clearInterval(that.data.time1)
          that.data.time1 = null;
          const { data } = res;
          // //测试数据
          // data.status = 2;
          // data.currentTimeStamp = +new Date();
          // data.endTimeStamp = +new Date() + 1000*10;
          that.setData({
            disabled: data.status !== 1 && data.status !== 2,
            clock: data
          })
          // 取到当前时间戳，存储下来进行判断弹窗显示与否
          var day = network.formatTime(data.currentTimeStamp / 1000, 'Y/M/D')
          var storageDay = wx.getStorageSync('Day')

          if(day !== storageDay){
            that.setData({
              show: true
            })
            wx.setStorage({
              key: 'Day',
              data: day
            });
          }
          // 1:CEO已经点击了开始答题按钮，当前考试处于900s倒计时中 2：经过了第一步后，处于300s倒计时状态 3: 已结束 -1: 当月考试未开始状态
          if (data.status === -1) {
            that.data.time1 = setTimeout(() => {
              that.getStatus()
            }, 5000)
            wx.removeStorage({
              key: 'score'
            });
          } else if (data.status === 1 || data.status === 2) {
            that.setInptScore();
            that.setTime(data.currentTimeStamp, data.endTimeStamp);
          } else {
            wx.removeStorage({
              key: 'score'
            });
          }
        } else {
          wx.showToast({
            title: res.errorMsg,
          });
        }
      },
      function (res) {
        wx.showToast({
          title: '加载数据失败',
        });
      });
  },
  accAdd(arg1, arg2) {
    // 加法函数
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length; } catch (e) { r1 = 0; }
    try { r2 = arg2.toString().split(".")[1].length; } catch (e) { r2 = 0; }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  accSub(arg1, arg2) {
    // 减法函数
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  onClose() {},
  setTime(start, end) {
    const time = Math.floor((end - start) / 1000)
    this.setData({
      time: time
    })
    this.data.time1 = setInterval(() => {
      if(this.data.time > 0){
        this.setData({
          time: this.data.time - 1
        })
      }else{
        this.getStatus();
      }
    }, 1000);
  },
  submitFn(){
    const that = this;
    const {total, list, userInfo} = this.data
    if(total != 0){
      wx.showToast({
        title: '请将分数使用完',
        icon: 'none',
      });
      return;
    }
    const itemInfoAndScoreFORMS = []
    list.forEach(item => {
      let deptId = item.deptId

      item.itemInfoVOList.forEach(row => {
        itemInfoAndScoreFORMS.push({
          "deptId": deptId,
          "itemId": row.itemId,
          "score": Number(row.score)
        })
      });
    })
    const data = {
      itemInfoAndScoreFORMS,
      ...userInfo
    }
    delete data.name
    delete data.titleName
    network.requestLoading('api/datacenter/help/city/item/records', data,
      'post',
      '正在提交...',
      'json',
      function (res) {
        if (res.success) {
          wx.showToast({
            title: '提交成功！',
            icon: 'none',
            success: ()=>{
              that.getStatus();
            }
          });
        } else {
          wx.showToast({
            title: res.errorMsg,
            icon: 'none'
          });
        }
      },
      function (res) {
        wx.showToast({
          title: '加载数据失败',
        });
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo();
    this.getItemRecords();
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
    this.getStatus();
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
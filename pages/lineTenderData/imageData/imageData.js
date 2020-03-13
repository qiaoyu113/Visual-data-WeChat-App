import * as echarts from '../../../ec-canvas/echarts';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
var network = require("../../../utils/network.js");
var common = require("../../../utils/util.js");

let chart = null;
let echartData1 = []

let echartData2 = []
let echartkey1 = []

function initChart(canvas, width, height) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: " {b}: {c} ({a} {d}%)",

    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '10%',
      top: '1%',
      containLabel: true
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      itemWidth: 14,
      itemHeight: 14,
      align: 'auto',
      data: echartkey1,
      textStyle: {
        color: '#666'
      }
    },
    noDataLoadingOption: {
      text: '暂无数据',
      effect: 'bubble',
      effectOption: {
        effect: {
          n: 0 //气泡个数为0 
        }
      },
      textStyle: {
        fontSize: 32,
        fontWeight: 'bold'
      }
    },
    series: [{
      name: '数量',
      type: 'pie',
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%\n{a}{c}',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData1
    }]
  }
}

function getDate(index) {
  var date = new Date(); //当前日期
  var newDate = new Date();
  newDate.setDate(date.getDate() + index); //官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
  var time = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  return time;
}

function getDateEnd(data, n, old_m, index) {
  var date = data; //当前日期
  var newDate = new Date();
  newDate.setDate(Number(n) + Number(index)); //官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
  var new_m = newDate.getMonth() + 1
  let y = date.substring(0, 4)
  let m = new_m == Number(old_m) ? old_m : "0" + (Number(old_m) + 1)
  let d = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate()
  var time = y + "-" + m + "-" + d;
  return time;
}

function getTimeNow() {
  var date = new Date();
  // 获取当前月份
  var nowMonth = date.getMonth() + 1;
  // 获取当前是几号
  var strDate = date.getDate();
  // 添加分隔符“-”
  var seperator = "-";
  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }
  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  return '数据更新至' + date.getFullYear() + seperator + nowMonth + seperator + strDate;
}

Component({
  options: {
    addGlobalClass: true
  },

  behaviors: [],

  properties: {
    myProperty: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），通常 newVal 就是新设置的数据， oldVal 是旧数
        // 新版本基础库不推荐使用这个字段，而是使用 Component 构造器的 observer 字段代替（这样会有更强的功能和更好的性能）
      },
    },
    actIndex: String,
    myProperty2: String // 简化的定义方式
  },
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    tableDatas: [],
    echartData: [{
        value: 100,
        name: '线索数'
      },
      {
        value: 80,
        name: '面试数'
      },
      {
        value: 12,
        name: '成交数'
      },
      {
        value: 12,
        name: '上岗数'
      }
    ],
    transNum1: '',
    transNum2: '',
    transNum3: '',
    transNum4: '',
    transNum5: '',
    transNum6: '',
    array1: [{
        code: '总计新增',
        codeVal: '1'
      },
      {
        code: '上周新增',
        codeVal: '2'
      },
      {
        code: '本周新增',
        codeVal: '3'
      },
      {
        code: '当前可售',
        codeVal: '4'
      },
      {
        code: '在跑线路',
        codeVal: '5'
      },
      {
        code: '月度新增',
        codeVal: '6'
      },
    ],
    show: false,
    array2: [],
    timeArray: ['总计新增', '上周新增', '本周新增', '当前可售', '在跑线路', '月度新增'],
    cityArray: ['全部城市', '北京市', '天津市', '上海市', '南京市', '苏州市', '杭州市', '郑州市', '武汉市', '广州市', '深圳市', '成都市'],
    channelArray: ['渠道'],
    cityCode: -1,
    timeCode: '1',
    channelCode: -1,
    echartData: false,
    echartData2: false,
    driverCode: 1,
    dataEnd: new Date().getTime(),
    index: 0,
    header: '',
    index1: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    dateType: 1,
    driverDetail: '',
    dataStart: new Date().getTime(),
    monthShow: false,
    minDate: new Date().getTime(),
    minWeek: getDate(-7),
    timeChange: getTimeNow(),
    cityArray: ['全部城市', '北京市', '天津市', '上海市', '南京市', '苏州市', '杭州市', '郑州市', '武汉市', '广州市', '深圳市', '成都市'],
    channelArray: [],
    driverArray: ['面试司机', '高意向司机', '成交司机'],
    array3: [{
        code: "面试司机",
        codeVal: "1"
      },
      {
        code: "高意向司机",
        codeVal: "2"
      },
      {
        code: "成交司机",
        codeVal: "3"
      }
    ],
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached() {

    },
    moved() {

    },
    detached() {},
  },

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached() {

  }, // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() {
    this.panelComponent = this.selectComponent('#mychart-dom-pie1');
    this.getData()
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() {

    },
    hide() {

    },
    resize() {

    },
  },

  methods: {
    onMyButtonTaps() {
      console.log('重新加载一次')
      this.init_bar()
    },
    //城市塞选
    bindPickerChangeCity: function(e) {
      this.setData({
        index3: e.detail.value,
        cityCode: this.data.array3[e.detail.value].codeVal
      })
      this.getEacherData()
    },
    //渠道塞选
    bindPickerChangeChannel: function(e) {
      this.setData({
        index2: e.detail.value,
        channelCode: this.data.array2[e.detail.value].codeVal
      })
      console.log(this.data.channelCode)
      this.getEacherData()
    },
    selectTime() {
      this.setData({
        show: true
      });
    },
    onClose(event) {
      if (event.detail === 'confirm') {
        // 异步关闭弹窗
        setTimeout(() => {
          this.setData({
            show: false
          });
        }, 1000);
      } else {
        this.setData({
          show: false
        });
      }
    },
    //时间塞选
    bindPickerChangeTime: function(e) {
      this.setData({
        show: false,
        index1: e.currentTarget.dataset.id - 1,
        timeCode: e.currentTarget.dataset.id
      })
      this.getEacherData()
    },
    onMonth(e) {
      this.setData({
        
      });
      let dataStart = e.detail.value + '-01 00:00:00';
      dataStart = dataStart.replace(/-/g, '/')
      this.setData({
        show: false,
        index1: e.currentTarget.dataset.id - 1,
        timeCode: e.currentTarget.dataset.id,
        dataStart: new Date(dataStart).getTime(),
        dataEnd: new Date(dataStart).getTime(),
      })
      this.getEacherData()
    },
    getData() {
      let that = this;
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: false
      }
      that.triggerEvent('myevent', showCover)

      that.getEacherData()

      //获取城市列表
      network.requestLoading('api/base/base/dict/qryDictByType', {
          dictType: 'online_city'
        },
        'GET',
        '',
        '',
        function(res) {
          if (res.success) {
            res.data.unshift({
              code: '全部城市',
              codeVal: '-1'
            })
            //过滤picker
            that.setData({
              array3: res.data
            });
            const arrays = that.data.array3
            let cityArr = common.picker(arrays)
            that.setData({
              cityArray: cityArr
            });
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
    },
    getEacherData() {
      let that = this;
      // 线路画像头部数据
      network.requestLoading('api/datacenter/line/bid/statistics/V1.8/linePortrait/header', {
          city: that.data.cityCode,
          // driverKind: that.data.driverCode,
          endMonth: that.data.dataEnd,
          // source: that.data.channelCode,
          startMonth: that.data.dataStart,
          type: that.data.timeCode
        },
        'POST',
        '',
        'json',
        function(res) {
          if (res.success) {
            //结束加载状态
            wx.stopPullDownRefresh();
            let headers = res.data
            if (headers) {
              that.setData({
                header: headers
              })
            } else {
              headers = {
                averageBillingCycle: 0,
                averageMonthlyNetIncomeFromOilRemoval: 0,
                averageRefuelingSettlementRatio: '0%',
                monthlyGrossIncome : 0,
              }
              that.setData({
                header: headers
              })
            }
          } else {
            let headers = {
              averageBillingCycle: 0,
              averageMonthlyNetIncomeFromOilRemoval: 0,
              averageRefuelingSettlementRatio: '0%',
              monthlyGrossIncome: 0,
            }
            that.setData({
              header: headers
            })
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
      // 增长分析
      network.requestLoading('api/datacenter/line/bid/statistics/V1.8/linePortrait/rank/rate', {
          city: that.data.cityCode,
          // driverKind: that.data.driverCode,
          endMonth: that.data.dataEnd,
          // source: that.data.channelCode,
          startMonth: that.data.dataStart,
          type: that.data.timeCode
        },
        'POST',
        '',
        'json',
        function(res) {
          if (res.success) {
            if (res.data && res.data.length > 0) {
              echartData1 = res.data
              that.setData({
                echartData1: false
              })
            } else {
              echartData1 =[]
              that.setData({
                echartData1: true
              })
            }
            that.init_bar()
          } else {
            echartData1 = []
            that.setData({
              echartData1: true
            })
            that.init_bar()
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
    },
    init_bar: function() {
      this.panelComponent.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      let showCover = {
        showCover: true
      }
      this.triggerEvent('myevent', showCover)
    },
  }
})
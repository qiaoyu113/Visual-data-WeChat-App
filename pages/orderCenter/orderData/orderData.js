import * as echarts from '../../../ec-canvas/echarts';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
var network = require("../../../utils/network.js");
var common = require("../../../utils/util.js");

let chart = null;
var echartkey1 = Array;
var echartkey2 = Array;
var echartkey3 = Array;
var echartkey4 = Array;
var echartData1 = Array;
var echartData2 = Array;
var echartData3 = Array;
var echartData4 = Array;

function initChart1(canvas, width, height) {
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
      name: '占比',
      type: 'pie',
      radius: ['20%', '50%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData1
    }]
  }
}

function initChart2(canvas, width, height) {
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
      name: '占比',
      type: 'pie',
      radius: ['20%', '50%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData2
    }]
  }
}

function initChart4(canvas, width, height) {
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
      data: echartkey4,
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
      name: '占比',
      type: 'pie',
      radius: ['20%', '50%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData4
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
  var strDate = date.getDate() - 1;
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

//生命周期
let screen = []
//过滤table数据
function filterArr(el) {
  Object.keys(el).map((i) => {
    if (screen.indexOf(el.statisticsItemExten) < 0) {
      delete el[i]
    }
    if (screen.indexOf(i) < 0) {
      delete el[i]
    }
  })
  if (JSON.stringify(el) != "{}") {
    return el
  }
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
    array1: [{
        code: '日报',
        codeVal: '1'
      },
      {
        code: '本月',
        codeVal: '2'
      },
      {
        code: '本周',
        codeVal: '3'
      },
      {
        code: '上月',
        codeVal: '4'
      },
      {
        code: '上周',
        codeVal: '5'
      }
    ],
    timeArray: ['日报', '本月', '本周', '上月', '上周'],
    title: '日报',
    dimension: 0,
    cityCode: -1,
    driverCode: 1,
    index1: 0,
    array: [],
    array2: [],
    picketArray: ['总计', '存量', '新增'],
    index: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    dateType: 1,
    driverDetail: '',
    dataStart: new Date().getTime(),
    dataEnd: new Date().getTime(),
    monthShow: false,
    minDate: new Date().getTime(),
    minWeek: getDate(-7),
    timeChange: getTimeNow(),
    cityArray: ['全部城市', '北京市', '天津市', '上海市', '南京市', '苏州市', '杭州市', '郑州市', '武汉市', '广州市', '深圳市', '成都市'],
    channelArray: [],
    driverArray: ['面试司机', '高意向司机', '成交司机'],
    tableDatas2: [],
    channelCode: -1,
    tableDatas: [],
    echartData1: [],
    echartData2: [],
    echartData3: [],
    echartData4: [],
    echartkey1: [],
    echartkey2: [],
    echartkey3: [],
    echartkey4: [],
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

  },

  // 此处attached的声明会被lifetimes字段中的声明覆盖
  ready() {
    this.onLoads()
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
    onLoads() {
      this.pieComponent1 = this.selectComponent('#mychart-dom-pie1');
      this.pieComponent2 = this.selectComponent('#mychart-dom-pie2');
      this.pieComponent4 = this.selectComponent('#mychart-dom-pie4');
      this.getData()
    },
    //获取年月
    getNowFormatDate(now) {
      if (now) {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
      } else {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth();
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
      }
      var currentdate = year + seperator1 + month;
      return currentdate;
    },
    //时间塞选
    bindPickerChangeTime: function(e) {
      let id = e.currentTarget.dataset.id;
      if (id == 2 || id == 4) {
        let start = ''
        if (id == 2) {
          start = this.getNowFormatDate(1);
        } else {
          start = this.getNowFormatDate(0);
        }
        let times = new Date(start + '-01 00:00:00').getTime()
        this.setData({
          show: false,
          startMonth: times,
          endMonth: times,
          index1: id - 1,
          timeChange: start,
          dateType: id
        })
      } else {
        if (id == 1) {
          this.setData({
            timeChange: getTimeNow(),
          })
        } else {
          this.setData({
            timeChange: this.data.timeArray[id - 1],
          })
        }
        this.setData({
          show: false,
          startMonth: '',
          endMonth: '',
          index1: id - 1,
          dateType: id
        })
      }
      this.getData()
      this.getEacherData()
    },
    getData() {
      let that = this;
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: false
      }
      that.triggerEvent('myevent', showCover)
      network.requestLoading('api/datacenter/order/statistics/base/chart', {
          city: '-1',
          startMonth: that.data.dataStart,
          endMonth: that.data.dataStart,
          type: that.data.dateType
        },
        'post',
        '',
        'json',
        function(res) {
          if (res.success) {
            //结束加载状态
            wx.stopPullDownRefresh();
            //生命周期数据指标
            const Arrays = res.data
            const arr = [];
            Arrays.map((i) => {
              arr.push(Object.assign({}, i))
            })
            //生命周期数据指标
            let tableData1 = ['statisticsItemExten', 'c_110100', 'totalNumber', 'c_310100', 'c_320100', 'c_330100', 'c_410100', 'c_420100', 'c_440100', 'c_500100', 'c_510100', 'addToBeConfirmedOrderNum', 'addReachOrderNum', 'addReachBuyCarOrderNum', 'addReachRentCarOrderNum', 'addReachTakeCarOrderNum', 'addWorkOrderNum', 'addWorkInOrderNum', 'addWorkOutOrderNum', 'addDeleteOrderNum', 'totalReachOrderNum', 'totalWorkOrderNum', 'totalWorkInOrderNum', 'totalWorkOutOrderNum'];
            screen = tableData1;
            const list1 = arr.filter(filterArr)
            that.setData({
              tableDatas: list1
            })
            that.selectComponent('#c-table').onshow()
          }
        },
        function(res) {
          wx.showToast({
            title: '请求错误',
            icon: 'loading'
          });
          that.setData({
            tableDatas: []
          })
        });

      // charts渲染
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
              array: res.data
            });
            const arrays = that.data.array
            wx.setStorageSync('cityArray', arrays)
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
    //获取eacherts
    getEacherData() {
      let that = this;
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: false
      }
      that.triggerEvent('myevent', showCover)
      // 成交合作模式占比
      network.requestLoading('api/datacenter/order/statistics/transaction-order/cooperation-mode/ratio', {
          city: that.data.cityCode,
          // driverKind: that.data.driverCode,
          endMonth: that.data.dataEnd,
          // source: that.data.channelCode,
          startMonth: that.data.dataStart,
          type: that.data.dateType
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
              echartData1 = []
              that.setData({
                echartData1: true
              })
            }
            // 周上岗占比
            network.requestLoading('api/datacenter/order/statistics/to-work/real-time/ratio', {
                city: that.data.cityCode,
                endMonth: that.data.dataEnd,
                startMonth: that.data.dataStart,
                type: that.data.dateType
              },
              'POST',
              '',
              'json',
              function(res) {
                if (res.success) {
                  if (res.data && res.data.length > 0) {
                    echartData2 = res.data
                    that.setData({
                      echartData2: false
                    })
                  } else {
                    echartData2 = []
                    that.setData({
                      echartData2: true
                    })
                  }
                  // 累计上岗占比
                  network.requestLoading('api/datacenter/order/statistics/to-work/accumulate/ratio', {
                      city: that.data.cityCode,
                      endMonth: that.data.dataEnd,
                      startMonth: that.data.dataStart,
                      type: that.data.dateType
                    },
                    'POST',
                    '',
                    'json',
                    function(res) {
                      if (res.success) {
                        if (res.data && res.data.length > 0) {
                          echartData4 = res.data
                          that.setData({
                            echartData4: false
                          })
                        } else {
                          echartData4 = []
                          that.setData({
                            echartData4: true
                          })
                        }
                        that.init_bar()
                      }
                    },
                    function(res) {
                      wx.showToast({
                        title: '加载数据失败',
                      });
                    });
                }
              },
              function(res) {
                wx.showToast({
                  title: '加载数据失败',
                });
              });
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
    },
    //城市塞选
    bindPickerChangeCity: function(e) {
      console.log(this.data.array[e.detail.value])
      this.setData({
        index3: e.detail.value,
        cityCode: this.data.array[e.detail.value].codeVal
      })
      this.getEacherData()
    },
    onMyButtonTaps() {
      console.log('重新加载一次')
      this.init_bar()
    },
    init_bar: function() {
      this.pieComponent1.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart1());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      this.pieComponent2.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart2());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      this.pieComponent4.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart4());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: true
      }
      this.triggerEvent('myevent', showCover)
    },
    bindPickerChange(e) {
      this.setData({
        index: e.detail.value,
        dimension: Number(e.detail.value) + 1
      })
      this.getData();
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
    selectTime() {
      this.setData({
        show: true
      });
    },
    onMonth(e) {
      this.setData({
        show: false
      });
      let dataStart = e.detail.value + '-01 00:00:00';
      dataStart = dataStart.replace(/-/g, '/')
      this.setData({
        timeChange: e.detail.value,
        dateType: 2,
        dataStart: new Date(dataStart).getTime(),
        dataEnd: new Date(dataStart).getTime(),
        title: '月报'
      })
      this.onLoads()
    },
    onWeek(e) {
      this.setData({
        show: false
      });
      let start = e.detail.value.slice(5)
      let changeNum = getDateEnd(e.detail.value, start.split("-")[1], start.substr(-5, 2), 7)
      let end = changeNum.slice(5)
      let dataStart = e.detail.value + ' 00:00:00'
      let dataEnd = changeNum + ' 00:00:00'
      this.setData({
        timeChange: start + '~' + end,
        dataStart: new Date(dataStart).getTime(),
        dataEnd: new Date(dataEnd).getTime()
      })
      this.onLoads()
    },
    yesterday() {
      this.setData({
        show: false,
        timeChange: getTimeNow(),
        dateType: 1,
        title: '日报'
      });
      this.onLoads()
    },
    lastWeek() {
      this.setData({
        show: false,
        timeChange: '上周',
        dateType: 3,
        title: '周报'
      })
      this.onLoads()
    },
    panelBtn(e) {
      let num = e.currentTarget.dataset.num
      this.setData({
        panelIndex: num
      })
      panelIndex = num
      this.init_bar()
    }
  }
})
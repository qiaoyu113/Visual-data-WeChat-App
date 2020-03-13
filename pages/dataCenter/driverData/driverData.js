import * as echarts from '../../../ec-canvas/echarts';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
var network = require("../../../utils/network.js");
var common = require("../../../utils/util.js");

let chart = null;
var echartkey1 = Array;
var echartData1 = Array;
var echartData2 = Array;
var echartData3 = [];
var echartData4 = [];
var echartData5 = [];
var echartData6 = [];
var echartData7 = [];
var echartData8 = [];
var echartData9 = [];
var echartData2Ratio = Array;

function initChart(canvas, width, height) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: " {b}: {c} ({a} {d}%)",
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
        },
      },
      z: 1,
      data: echartData1
    }]
  }
}

function initChart2(canvas, width, height) {
  return {
    backgroundColor: '#fff',
    color: ["#32C5E9", "#FFDB5C", "#9FE6B8", "#67E0E3", "#37A2DA"],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [{
        name: '预期',
        type: 'funnel',
        left: '20%',
        width: '60%',
        label: {
          normal: {
            formatter: '{b}\n{c}',
            rich: {}
          },
          emphasis: {
            position: 'inside',
            formatter: '{b}预期: {c}%'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            opacity: 0.7
          }
        },
        data: echartData2
      },
      {
        name: '实际',
        type: 'funnel',
        left: '20%',
        width: '60%',
        label: {
          normal: {
            position: 'inside',
            formatter: '{b}\n{c}%',
            textStyle: {
              color: '#666',
              fontSize: 13
            },
            rich: {}
          },
          emphasis: {
            position: 'inside',
            formatter: '{b}实际: {c}%'
          }
        },
        itemStyle: {
          normal: {
            opacity: 0.5,
            borderColor: '#fff',
            borderWidth: 2
          }
        },
        data: echartData2Ratio
      }
    ]
  }
}

function initChart3(canvas, width, height) {
  return {
    backgroundColor: '#fff',
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#53AFD4'
        }
      },
      axisLabel: {
        color: '#438FC9',
        fontSize: 14
      }
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '10%',
      top: '2%',
      containLabel: true
    },
    yAxis: {
      data: echartData3[0],
      nameTextStyle: {
        color: '#438FC9',
        fontSize: 1
      },
      axisLine: {
        lineStyle: {
          color: '#53AFD4'
        }
      },
      axisLabel: {
        color: '#438FC9',
        fontSize: 14
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#53AFD4'
        }
      },
      interval: 500
    },
    series: [{
      label: {
        normal: {
          fontSize: 14,
          rich: {}
        }
      },
      type: 'bar',
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#00b0ff'
          }, {
            offset: 0.8,
            color: '#53AFD4'
          }], false),
          label: {
            show: true, //开启显示
            position: 'right', //在上方显示
            textStyle: { //数值样式
              color: '#53AFD4',
              fontSize: 10
            }
          },
          rich: {}
        }
      },
      data: echartData3[1]
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
      data: echartkey1,
      textStyle: {
        color: '#666'
      }
    },
    series: [{
      name: '占比',
      type: 'pie',
      radius: ['20%', '60%'],
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

function initChart5(canvas, width, height) {
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
    series: [{
      name: '占比',
      type: 'pie',
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 14,
          rich: {}
        }
      },
      z: 1,
      data: echartData5
    }]
  }
}

function initChart6(canvas, width, height) {
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
    series: [{
      name: '占比',
      type: 'pie',
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData6
    }]
  }
}

function initChart7(canvas, width, height) {
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
    series: [{
      name: '占比',
      type: 'pie',
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData7
    }]
  }
}

function initChart8(canvas, width, height) {
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
    series: [{
      name: '占比',
      type: 'pie',
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData8

    }]
  }
}

function initChart9(canvas, width, height) {
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
      radius: ['20%', '60%'],
      color: ['#45A2E8', '#99E8FF', '#77D8E5', '#005FF5', '#008AE0'],
      label: {
        normal: {
          formatter: '{b}\n{d}%',
          fontSize: 13,
          rich: {}
        }
      },
      z: 1,
      data: echartData9
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

//生命周期
let screen = []
//过滤table数据
function filterArr(el) {
  Object.keys(el).map((i) => {
    if (screen.indexOf(i) < 0) {
      delete el[i]
    }
  })
  return el
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
    title: '司机画像',
    dimension: 0,
    cityCode: -1,
    driverCode: 1,
    array: [],
    array2: [],
    array3: [{
        code: '面试司机',
        codeVal: '1'
      },
      {
        code: '高意向司机',
        codeVal: '2'
      },
      {
        code: '成交司机',
        codeVal: '3'
      }
    ],
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
    timeChange: '总计',
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
    tableDatas2: [],
    channelCode: -1,
    tableDatas: [],
    echartData1: [],
    echartData2: [],
    echartData3: [],
    echartkey1: [],
    echartData3: false,
    echartData4: false,
    echartData5: false,
    echartData6: false,
    echartData7: false,
    echartData8: false,
    echartData9: false,
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
    this.pieComponent = this.selectComponent('#mychart-dom-pie');
    this.pieComponent1 = this.selectComponent('#mychart-dom-pie1');
    this.pieComponent2 = this.selectComponent('#mychart-dom-pie2');
    this.pieComponent3 = this.selectComponent('#mychart-dom-pie3');
    this.pieComponent4 = this.selectComponent('#mychart-dom-pie4');
    this.pieComponent5 = this.selectComponent('#mychart-dom-pie5');
    this.pieComponent6 = this.selectComponent('#mychart-dom-pie6');
    this.funnelComponent = this.selectComponent('#mychart-dom-funnel');
    this.panelComponent = this.selectComponent('#mychart-dom-panel');
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
    getData() {
      let that = this;
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: false
      }
      that.triggerEvent('myevent', showCover)
      // network.requestLoading('api/datacenter/driver/statistics/center', {
      //     city: that.data.cityCode,
      //     queryDate: that.data.dataStart,
      //     type: that.data.dateType
      //   },
      //   'post',
      //   '',
      //   'json',
      //   function(res) {
      //     if (res.success) {
      //       //结束加载状态
      //       wx.stopPullDownRefresh();
      //       //生命周期数据指标
      //       const Arrays = res.data.dataStatisticsListVO
      //       const arr = [];
      //       const arr2 = [];
      //       Arrays.map((i) => {
      //         arr.push(Object.assign({}, i))
      //         arr2.push(Object.assign({}, i))
      //       })
      //       let tableData1 = ['cityName', 'intentionAll', 'intentionNew', 'depositAll', 'depositAdd', 'signingAll', 'signingAdd', 'driverDeliveryAll', 'driverDeliveryDay', 'goToWorkAll', 'goToWorkDay', 'downDrivers'];
      //       let tableData2 = ['cityName', 'intentionNew', 'intentionMonth', 'depositDay', 'depositMonth', 'signingDay', 'signingMonth', 'driverDeliveryMonth', 'goToWorkMonth'];
      //       if (that.data.dateType == 2) {
      //         screen = tableData1;
      //       } else if (that.data.dateType == 1) {
      //         screen = tableData2;
      //       } else {
      //         screen = tableData1;
      //       }
      //       const list1 = arr.filter(filterArr)
      //       that.setData({
      //         tableDatas: list1
      //       })
      // that.selectComponent('#c-table').onshow()
      //关键数据指标
      // screen = ['cityName', 'intentionNew', 'intentionMonth', 'depositDay', 'depositMonth', 'signingDay', 'signingMonth', 'driverDeliveryMonth', 'goToWorkMonth', 'driverMonthIncome']
      // const list2 = arr2.filter(filterArr)
      // that.setData({
      //   tableDatas2: list2
      // })
      // that.selectComponent('#c-table2').onshow()
      //获取echarts
      // let arrCharts = [];
      // res.data.graphicalAnalysisVO.driverSourceRatioVO.map((i) => {
      //   arrCharts.push(i.name)
      // })
      // that.setData({
      //   echartData1: res.data.graphicalAnalysisVO.driverSourceRatioVO,
      //   echartData2: res.data.graphicalAnalysisVO.transactionConversionVO.driverSumVO,
      //   echartData2Ratio: res.data.graphicalAnalysisVO.transactionConversionVO.driverConversionRatioVO,
      //   echartkey1: arrCharts
      // })
      // echartData1 = that.data.echartData1
      // echartData2 = that.data.echartData2
      // echartData2Ratio = that.data.echartData2Ratio
      // echartkey1 = that.data.echartkey1
      //     that.init_bar()
      //   }
      // },
      // function(res) {
      //   wx.showToast({
      //     title: '请求错误',
      //     icon: 'loading'
      //   });
      //   that.setData({
      //     tableDatas: []
      //   })
      // });

      //获取城市列表
      network.requestLoading('api/base/base/dict/qryDictByType', {
          dictType: 'online_city'
        },
        'GET',
        '',
        '',
        function(res) {
          if (res.success) {
            if (res.data) {
              res.data.unshift({
                code: '全部城市',
                codeVal: '-1'
              })
              //过滤picker
              that.setData({
                array: res.data
              });
              const arrays = that.data.array
              let cityArr = common.picker(arrays)
              that.setData({
                cityArray: cityArr
              });
            }
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });

      //获取渠道列表
      network.requestLoading('api/base/base/dict/qryDictByType', {
          dictType: 'source_channel'
        },
        'GET',
        '',
        '',
        function(res) {
          if (res.success) {
            if (res.data) {
              //过滤picker
              res.data.unshift({
                code: '全部渠道',
                codeVal: '-1'
              })
              that.setData({
                array2: res.data
              });
              const arrays = that.data.array2
              let channelArr = common.picker(arrays)
              that.setData({
                channelArray: channelArr
              });
            }
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
      that.getEacherData()
    },
    //获取eacherts
    getEacherData() {
      let that = this;
      // 司机画像
      network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/header', {
          city: that.data.cityCode,
          driverKind: that.data.driverCode,
          endMonth: that.data.dataEnd,
          source: that.data.channelCode,
          startMonth: that.data.dataStart,
          type: that.data.dateType
        },
        'POST',
        '',
        'json',
        function(res) {
          if (res.success) {
            if (res.data) {
              that.setData({
                driverDetail: res.data
              })
            }
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });

      // 司机画像来源渠道
      network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/source/channel', {
          city: that.data.cityCode,
          driverKind: that.data.driverCode,
          endMonth: that.data.dataEnd,
          source: that.data.channelCode,
          startMonth: that.data.dataStart,
          type: that.data.dateType
        },
        'POST',
        '',
        'json',
        function(res) {
          if (res.success) {
            if (res.data && res.data.length > 0) {
              let data = res.data
              let xData = [];
              let yData = [];
              let dData = [];
              data.forEach((i) => {
                xData.push(i.name)
                yData.push(i.value)
                dData.push(i)
              })
              echartData3.push(xData)
              echartData3.push(yData)
              echartData3.push(yData)
              that.setData({
                echartData3: false
              })
            } else {
              that.setData({
                echartData3: true
              })
            }

            // 司机画像子女数
            network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/children/num', {
                city: that.data.cityCode,
                driverKind: that.data.driverCode,
                endMonth: that.data.dataEnd,
                source: that.data.channelCode,
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
                    that.setData({
                      echartData4: true
                    })
                  }

                  // 司机画像物流从业经验
                  network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/logistics/experience', {
                      city: that.data.cityCode,
                      driverKind: that.data.driverCode,
                      endMonth: that.data.dataEnd,
                      source: that.data.channelCode,
                      startMonth: that.data.dataStart,
                      type: that.data.dateType
                    },
                    'POST',
                    '',
                    'json',
                    function(res) {
                      if (res.success) {
                        if (res.data && res.data.length > 0) {
                          echartData5 = res.data
                          that.setData({
                            echartData5: false
                          })
                        } else {
                          that.setData({
                            echartData5: true
                          })
                        }

                        // 司机画像驾临占比
                        network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/drivingAge/ratio', {
                            city: that.data.cityCode,
                            driverKind: that.data.driverCode,
                            endMonth: that.data.dataEnd,
                            source: that.data.channelCode,
                            startMonth: that.data.dataStart,
                            type: that.data.dateType
                          },
                          'POST',
                          '',
                          'json',
                          function(res) {
                            if (res.success) {
                              if (res.data && res.data.length > 0) {
                                echartData6 = res.data
                                that.setData({
                                  echartData6: false
                                })
                              } else {
                                that.setData({
                                  echartData6: true
                                })
                              }

                              // 司机画像居住时长
                              network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/livingDuration/ratio', {
                                  city: that.data.cityCode,
                                  driverKind: that.data.driverCode,
                                  endMonth: that.data.dataEnd,
                                  source: that.data.channelCode,
                                  startMonth: that.data.dataStart,
                                  type: that.data.dateType
                                },
                                'POST',
                                '',
                                'json',
                                function(res) {
                                  if (res.success) {
                                    if (res.data && res.data.length > 0) {
                                      echartData7 = res.data
                                      that.setData({
                                        echartData7: false
                                      })
                                    } else {
                                      that.setData({
                                        echartData7: true
                                      })
                                    }

                                    // 司机画像月均毛收入占比
                                    network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/monthlyIncome/ratio', {
                                        city: that.data.cityCode,
                                        driverKind: that.data.driverCode,
                                        endMonth: that.data.dataEnd,
                                        source: that.data.channelCode,
                                        startMonth: that.data.dataStart,
                                        type: that.data.dateType
                                      },
                                      'POST',
                                      '',
                                      'json',
                                      function(res) {
                                        if (res.success) {
                                          if (res.data && res.data.length > 0) {
                                            echartData8 = res.data
                                            that.setData({
                                              echartData8: false
                                            })
                                          } else {
                                            that.setData({
                                              echartData8: true
                                            })
                                          }
                                          // 司机画像驾照类型
                                          network.requestLoading('api/datacenter/driver/statistics/V1.7/driverPortrait/driveLicenseType/ratio', {
                                              city: that.data.cityCode,
                                              driverKind: that.data.driverCode,
                                              endMonth: that.data.dataEnd,
                                              source: that.data.channelCode,
                                              startMonth: that.data.dataStart,
                                              type: that.data.dateType
                                            },
                                            'POST',
                                            '',
                                            'json',
                                            function(res) {
                                              if (res.success) {
                                                if (res.data && res.data.length > 0) {
                                                  echartData9 = res.data
                                                  that.setData({
                                                    echartData9: false
                                                  })
                                                } else {
                                                  that.setData({
                                                    echartData9: true
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
          }
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
      // network.requestLoading('api/datacenter/driver/statistics/centerGraphics', {
      //     city: that.data.cityCode,
      //     queryDate: that.data.dataStart,
      //     type: that.data.dateType
      //   },
      //   'post',
      //   '',
      //   'json',
      //   function(res) {
      //     if (res.success) {
      //       let arr = [];
      //       res.data.driverSourceRatioVO.map((i) => {
      //         arr.push(i.name)
      //       })
      //       that.setData({
      //         echartData1: res.data.driverSourceRatioVO,
      //         echartData2: res.data.transactionConversionVO,
      //         echartkey1: arr
      //       })
      //       echartData1 = that.data.echartData1
      //       echartkey1 = that.data.echartkey1
      //       that.init_bar()
      //     }
      //   },
      //   function(res) {
      //     wx.showToast({
      //       title: '加载数据失败',
      //     });
      //   });
    },
    //城市塞选
    bindPickerChangeCity: function(e) {
      this.setData({
        index2: e.detail.value,
        cityCode: this.data.array[e.detail.value].codeVal
      })
      this.getEacherData()
    },
    //渠道塞选
    bindPickerChangeChannel: function(e) {
      this.setData({
        index3: e.detail.value,
        channelCode: this.data.array2[e.detail.value].codeVal
      })
      this.getEacherData()
    },
    //司机塞选
    bindPickerChangeDriver: function(e) {
      this.setData({
        index4: e.detail.value,
        driverCode: this.data.array3[e.detail.value].codeVal
      })
      this.getEacherData()
    },
    init_bar: function() {
      // this.pieComponent.init((canvas, width, height) => {
      //   // 初始化图表
      //   const barChart = echarts.init(canvas, null, {
      //     width: width,
      //     height: height
      //   });
      //   barChart.setOption(initChart());
      //   // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      //   return barChart;
      // });
      // this.funnelComponent.init((canvas, width, height) => {
      //   // 初始化图表
      //   const barChart = echarts.init(canvas, null, {
      //     width: width,
      //     height: height
      //   });
      //   barChart.setOption(initChart2());
      //   // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      //   return barChart;
      // });
      this.panelComponent.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart3());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      this.pieComponent1.init((canvas, width, height) => {
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
      this.pieComponent2.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart5());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      this.pieComponent3.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart6());
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
        barChart.setOption(initChart7());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      this.pieComponent5.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.clear()
        barChart.setOption(initChart8());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      this.pieComponent6.init((canvas, width, height) => {
        // 初始化图表
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        barChart.setOption(initChart9());
        // 注意这里一定要返回 chart 实例，否则会影响事件处理等
        return barChart;
      });
      let showCover = {
        showCover: true
      }
      this.triggerEvent('myevent', showCover)
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
        dateType: 3,
        dataStart: new Date(dataStart).getTime(),
        dataEnd: new Date(dataStart).getTime(),
        title: '月报'
      })
      this.getData()
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
      this.getData()
    },
    bindPickerChange(e) {
      this.setData({
        index: e.detail.value,
        dimension: Number(e.detail.value) + 1
      })
      this.getData();
    },
    yesterday() {
      this.setData({
        show: false,
        timeChange: '日报',
        dateType: 1,
        title: '司机日报'
      });
      this.getData()
    },
    allday() {
      this.setData({
        show: false,
        timeChange: '总计',
        dateType: 1,
        title: '总计'
      });
      this.getData()
    },
    lastWeek() {
      this.setData({
        show: false,
        timeChange: '本周',
        dateType: 2,
        title: '周报'
      })
      this.getData()
    },
  }
})
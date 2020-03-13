import * as echarts from '../../../ec-canvas/echarts';
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
var network = require("../../../utils/network.js");
var common = require("../../../utils/util.js");

let chart = null;
let echartData = []

let echartData2 = []

function initChart(canvas, width, height) {
  return {
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
        "type": "cross",
        "label": {
          "backgroundColor": "#6a7985"
        },
        "lineStyle": {
          "color": "#9eb2cb"
        }
      }
    },
    "legend": {
      "top": "bottom",
      "textStyle": {
        "color": "#000"
      },
      "itemHeight": 10,
      "data": ['线索数', '面试数', '高意向', '上岗数', '成交数']
    },
    "grid": {
      "top": '2%',
      "left": "10%",
      "right": '10%',
      "bottom": '3%',
      "containLabel": true,
      "borderWidth": 0.5
    },
    series: [{
        top: 0,
        name: '',
        type: 'funnel',
        left: '26%',
        width: '60%',
        gap: 6,
        minSize: 100,
        label: {
          normal: {
            color: '#353535',
            position: 'left',
            rich: {}
          },
          emphasis: {
            position: 'left',
            formatter: '{c}%'
          }
        },
        labelLine: {
          normal: {
            length: 20,
            position: 'left',
            lineStyle: {
              width: 2
            }
          }
        },
        itemStyle: {
          normal: {

          }
        },
        data: [{
            value: echartData[0].value,
            name: echartData[0].name,
            itemStyle: {
              normal: {
                color: '#4da7db'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#4da7db',
                  shadowOffsetX: 1
                }
              }
            }
          },
          {
            value: echartData[1].value,
            name: echartData[1].name,
            itemStyle: {
              normal: {
                color: '#53b8e2'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#53b8e2',
                  shadowOffsetX: 1
                }
              }
            }
          },
          {
            value: echartData[2].value,
            name: echartData[2].name,
            itemStyle: {
              normal: {
                color: '#398bd8'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#398bd8',
                  shadowOffsetX: 1
                }
              }
            }
          },
          {
            value: echartData[3].value,
            name: echartData[3].name,
            itemStyle: {
              normal: {
                color: '#0083c7'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#0083c7',
                  shadowOffsetX: 1
                }
              }
            }
          }
        ]
      },
      {
        name: '',
        type: 'funnel',
        top: 0,
        left: '34%',
        gap: 10,
        label: {
          normal: {
            position: 'inside',
            formatter: '{c}',
            textStyle: {
              color: '#fff'
            },
            rich: {}
          }
        },
        itemStyle: {
          normal: {
            color: 'transparent',
            borderWidth: 0,
            opacity: 0
          }
        },
        data: echartData
      }
    ]
  }
}

function initChart2(canvas, width, height) {
  return {
    "tooltip": {
      "trigger": "axis",
      "axisPointer": {
        "type": "cross",
        "label": {
          "backgroundColor": "#6a7985"
        },
        "lineStyle": {
          "color": "#9eb2cb"
        }
      }
    },
    "legend": {
      "top": "bottom",
      "textStyle": {
        "color": "#000"
      },
      "itemHeight": 10,
      "data": ['面试数', '成交数', '高意向', '上岗数']
    },
    "grid": {
      "top": '2%',
      "left": "10%",
      "right": '10%',
      "bottom": '3%',
      "containLabel": true,
      "borderWidth": 0.5
    },
    series: [{
        top: 0,
        name: '',
        type: 'funnel',
        left: '26%',
        width: '60%',
        gap: 6,
        minSize: 100,
        label: {
          normal: {
            color: '#353535',
            position: 'left',
            rich: {}
          },
          emphasis: {
            position: 'left',
            formatter: '{c}%'
          }
        },
        labelLine: {
          normal: {
            length: 20,
            position: 'left',
            lineStyle: {
              width: 2
            }
          }
        },
        itemStyle: {
          normal: {

          }
        },
        data: [{
            value: echartData2[0].value,
            name: echartData2[0].name,
            itemStyle: {
              normal: {
                color: '#4da7db'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#4da7db',
                  shadowOffsetX: 1
                }
              }
            }
          },
          {
            value: echartData2[1].value,
            name: echartData2[1].name,
            itemStyle: {
              normal: {
                color: '#53b8e2'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#53b8e2',
                  shadowOffsetX: 1
                }
              }
            }
          },
          {
            value: echartData2[2].value,
            name: echartData2[2].name,
            itemStyle: {
              normal: {
                color: '#398bd8'
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  shadowColor: '#398bd8',
                  shadowOffsetX: 1
                }
              }
            }
          }
        ]
      },
      {
        name: '',
        type: 'funnel',
        top: 0,
        left: '34%',
        gap: 10,
        label: {
          normal: {
            position: 'inside',
            formatter: '{c}',
            textStyle: {
              color: '#fff'
            },
            rich: {}
          }
        },
        itemStyle: {
          normal: {
            color: 'transparent',
            borderWidth: 0,
            opacity: 0
          }
        },
        data: echartData2
      }
    ]
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
        code: '本周',
        codeVal: '1'
      },
      {
        code: '上周',
        codeVal: '2'
      },
      {
        code: '本月',
        codeVal: '3'
      },
      {
        code: '上月',
        codeVal: '4'
      },
    ],
    array2: [],
    array3: [],
    index1: 0,
    index2: 0,
    index3: 0,
    timeArray: ['本周', '上周', '本月', '上月'],
    cityArray: ['全部城市', '北京市', '天津市', '上海市', '南京市', '苏州市', '杭州市', '郑州市', '武汉市', '广州市', '深圳市', '成都市'],
    channelArray: ['渠道'],
    cityCode: -1,
    timeCode: '1',
    channelCode: -1,
    echartData: false,
    echartData2: false,
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
    this.panelComponent = this.selectComponent('#mychart-dom-panel');
    this.panelComponent2 = this.selectComponent('#mychart-dom-panel2');
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
    //时间塞选
    bindPickerChangeTime: function(e) {
      this.setData({
        index1: e.detail.value,
        timeCode: this.data.array1[e.detail.value].codeVal
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

      //获取渠道列表
      network.requestLoading('api/base/base/dict/qryDictByType', {
          dictType: 'source_channel'
        },
        'GET',
        '',
        '',
        function(res) {
          if (res.success) {
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
        },
        function(res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
    },
    getEacherData() {
      let that = this;
      // 增长分析
      network.requestLoading('api/datacenter/driver/statistics/V1.7/driverConversion/clue', {
          "city": that.data.cityCode,
          "source": that.data.channelCode,
          "type": that.data.timeCode,
        },
        'POST',
        '',
        'json',
        function(res) {
          if (res.success) {
            //结束加载状态
            wx.stopPullDownRefresh();
            if (res.data && res.data.length > 0) {
              let data = res.data
              var transData1 = ''
              var transData2 = ''
              var transData3 = ''
              var transData4 = ''
              data.forEach((i,index) => {
                if (i.name === '线索数') {
                  transData1 = Number(i.value)
                }
                if (i.name === '面试数') {
                  transData2 = Number(i.value)
                }
                if (i.name === '成交数') {
                  transData3 = Number(i.value)
                }
                if (i.name === '上岗数') {
                  transData4 = Number(i.value)
                }
                if (i.name === '高意向') {
                  data.splice(index, 1)
                }
              })
              echartData = data
              that.setData({
                transNum1: ((transData2 / transData1) * 100) ? ((transData2 / transData1) * 100).toFixed(2) : '0.00',
                transNum2: ((transData3 / transData2) * 100) ? ((transData3 / transData2) * 100).toFixed(2) : '0.00',
                transNum3: ((transData4 / transData3) * 100) ? ((transData4 / transData3) * 100).toFixed(2) : '0.00',
                transNum4: ((transData3 / transData1) * 100) ? ((transData3 / transData1) * 100).toFixed(2) : '0.00',
                echartData: false
              })
            } else {
              echartData = []
              that.setData({
                echartData: true
              })
            }

            // 增长分析
            network.requestLoading('api/datacenter/driver/statistics/V1.7/driverConversion/interview', {
                "city": that.data.cityCode,
                "source": that.data.channelCode,
                "type": that.data.timeCode,
              },
              'POST',
              '',
              'json',
              function(res) {
                if (res.success) {
                  if (res.data && res.data.length > 0) {
                    let data2 = res.data
                    var transData2 = ''
                    var transData3 = ''
                    var transData4 = ''
                    data2.forEach((i, index) => {
                      if (i.name === '面试数') {
                        transData2 = i.value
                      }
                      if (i.name === '成交数') {
                        transData3 = i.value
                      }
                      if (i.name === '上岗数') {
                        transData4 = i.value
                      }
                      if (i.name === '高意向') {
                        data2.splice(index, 1)
                      }
                    })
                    echartData2 = data2
                    that.setData({
                      transNum5: ((transData3 / transData2) * 100) ? ((transData3 / transData2) * 100).toFixed(2) : '0.00',
                      transNum6: ((transData4 / transData3) * 100) ? ((transData4 / transData3) * 100).toFixed(2) : '0.00',
                      echartData2: false
                    })
                  } else {
                    echartData2 = []
                    that.setData({
                      echartData2: true
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
      this.panelComponent2.init((canvas, width, height) => {
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
      let showCover = {
        showCover: true
      }
      this.triggerEvent('myevent', showCover)
    },
  }
})
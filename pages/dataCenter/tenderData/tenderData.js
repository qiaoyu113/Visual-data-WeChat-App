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

function initChart(canvas, width, height) {
  return {
    backgroundColor: '#fff',
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
        }
      },
      z: 1,
      data: echartData1
    }]
  }
}

function initChart2(canvas, width, height) {
  return {
    backgroundColor: '#fff',
    grid: {
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },

    tooltip: {
      show: "true",
      trigger: 'item',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#333',
        }
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 13
        }
      }
    },
    yAxis: [{
        type: 'category',
        axisLabel: {
          show: true,
          textStyle: {
            fontSize: 14
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333',
          }
        },
        data: echartkey2
      },
      {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        splitArea: {
          show: false
        },
        splitLine: {
          show: false
        },
        data: echartkey2
      },

    ],
    series: [{
      type: 'bar',
      show: true,
      barGap: '-100%',
      barWidth: '75%', //统计条宽度
      max: 1,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#fff', //百分比颜色
          },
          fontSize: 14,
          position: 'inside',
          //百分比格式
          formatter: function(data) {
            return data.value;
          },
          rich: {}
        }
      },
      labelLine: {
        show: false,
      },
      z: 2,
      itemStyle: {
        normal: {
          barBorderRadius: [0, 10, 10, 0], //统计条弧度
          color: {
            colorStops: [{
              offset: 0,
              color: '#3dc0e9' // 0% 处的颜色
            }, {
              offset: 1,
              color: '#45e3cf' // 100% 处的颜色
            }],
            globalCoord: false, // 缺省为 false

          }
        },
      },
      data: echartData2
    }]
  }
}

function initChart3(canvas, width, height) {
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'horizontal',
      x: 'center',
      itemWidth: 14,
      itemHeight: 14,
      align: 'auto',
      data: echartkey3,
      textStyle: {
        color: '#666'
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [{
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: echartData3,
      roseType: 'angle',
      label: {
        normal: {
          formatter: "{b}\n{d}%",
          textStyle: {
            fontSize: 13
          },
          rich: {}
        },
        emphasis: {
          show: false,
          position: 'inside',
          formatter: '{d}%',
          textStyle: {
            align: 'center',
            baseline: 'middle',
            fontFamily: '微软雅黑',
            fontSize: 15,
            fontWeight: 'bolder'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: '#99E8FF'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#99E8FF'
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function(idx) {
        return Math.random() * 200;
      }
    }]
  }
}

function initChart4(canvas, width, height) {
  return {
    title: {
      text: Number(echartData4[1].value) + '%',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#0580f2',
        fontSize: '14'
      }
    },
    color: ['rgba(176, 212, 251, 1)'],
    legend: {
      show: true,
      itemGap: 12,
      data: ['待审核线路', '停用线路']
    },

    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: true,
      radius: ['30%', '50%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [{
        value: Number(echartData4[1].value),
        name: '待审核线路',
        itemStyle: {
          normal: {
            color: { // 完成的圆环的颜色
              colorStops: [{
                offset: 0,
                color: '#00cefc' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#367bec' // 100% 处的颜色
              }]
            },
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }, {
        name: '停用线路',
        value: Number(echartData4[0].value)
      }]
    }]
  }
}

var panelIndex = 0;
var panelSeries = [{
    name: '面试司机数',
    type: 'line',
    smooth: true,
    //  symbol: "none", //去掉折线点
    stack: 100,
    itemStyle: {
      normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#A5CFDB' // 0% 处的颜色
        }, {
          offset: 0.5,
          color: '#A5CFDB' // 100% 处的颜色
        }, {
          offset: 1,
          color: '#A5CFDB' // 100% 处的颜色
        }]), //背景渐变色
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'solid',
          color: "#A5CFDB"
        }
      },
      emphasis: {
        color: '#02675f',
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'dotted',
          color: "#02675f" //折线的颜色
        }
      }
    }, //线条样式
    symbolSize: 5, //折线点的大小
    areaStyle: {
      normal: {}
    },
    label: {
      normal: {
        fontSize: 14,
        rich: {}
      }
    },
    data: echartData1,
  },
  {
    name: '高意向司机数',
    type: 'line',
    smooth: true,
    //  symbol: "none", //去掉折线点
    stack: 100,
    itemStyle: {
      normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#53AFD4' // 0% 处的颜色
        }, {
          offset: 0.5,
          color: '#53AFD4' // 100% 处的颜色
        }, {
          offset: 1,
          color: '#53AFD4' // 100% 处的颜色
        }]), //背景渐变色
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'solid',
          color: "#53AFD4"
        }
      },
      emphasis: {
        color: '#02675f',
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'dotted',
          color: "#02675f" //折线的颜色
        }
      }
    }, //线条样式
    symbolSize: 5, //折线点的大小
    areaStyle: {
      normal: {}
    },
    data: echartData2,
  },
  {
    name: '成交司机数',
    type: 'line',
    smooth: true,
    //  symbol: "none", //去掉折线点
    stack: 100,
    itemStyle: {
      normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#4CA0F8' // 0% 处的颜色
        }, {
          offset: 0.5,
          color: '#4CA0F8' // 100% 处的颜色
        }, {
          offset: 1,
          color: '#4CA0F8' // 100% 处的颜色
        }]), //背景渐变色
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'solid',
          color: "#4CA0F8"
        }
      },
      emphasis: {
        color: '#02675f',
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'dotted',
          color: "#02675f" //折线的颜色
        }
      }
    }, //线条样式
    symbolSize: 5, //折线点的大小
    areaStyle: {
      normal: {}
    },
    data: echartData3,
  },
  {
    name: '上岗司机数',
    type: 'line',
    smooth: true,
    //  symbol: "none", //去掉折线点
    stack: 100,
    itemStyle: {
      normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: '#438FC9' // 0% 处的颜色
        }, {
          offset: 0.5,
          color: '#438FC9' // 100% 处的颜色
        }, {
          offset: 1,
          color: '#438FC9' // 100% 处的颜色
        }]), //背景渐变色
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'solid',
          color: "#438FC9"
        }
      },
      emphasis: {
        color: '#02675f',
        lineStyle: { // 系列级个性化折线样式
          width: 0.5,
          type: 'dotted',
          color: "#02675f" //折线的颜色
        }
      }
    }, //线条样式
    symbolSize: 5, //折线点的大小
    areaStyle: {
      normal: {}
    },
    data: echartData4,
  },
]

function initChart5(canvas, width, height) {
  return {
    backgroundColor: "#fff",
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
          normal: {
            fontSize: 14,
            rich: {}
          }
        },
      }
    },
    // legend: {
    //   data: ['面试司机数', '高意向司机数', '成交司机数', '上岗司机数'],
    //   align: 'left',
    //   left: 10
    // },
    color: ["#0080ff", "#4cd5ce"],
    grid: {
      left: '5%',
      right: '5%',
      top: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: echartkey1,
      axisLabel: {
        show: true,
        textStyle: {
          color: '#6ba1bb',
          fontSize: 12,
        },
        formatter: function(value) {
          //debugger
          var ret = ""; //拼接加\n返回的类目项
          var maxLength = 5; //每项显示文字个数
          var valLength = value.length; //X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
          if (rowN > 1) //如果类目项的文字大于3,
          {
            for (var i = 0; i < rowN; i++) {
              var temp = ""; //每次截取的字符串
              var start = i * maxLength; //开始截取的位置
              var end = start + maxLength; //结束截取的位置
              //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + "\n";
              ret += temp; //凭借最终的字符串
            }
            return ret;
          } else {
            return value;
          }
        },
      },
      axisLine: {
        lineStyle: {
          color: '#6ba1bb',
          width: 0.5, //这里是为了突出显示加上的
        }
      }
    }],
    yAxis: [{
      type: 'value',
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#6ba1bb',
          width: 1, //这里是为了突出显示加上的
        }
      },
      axisLabel: {
        formatter: function(val) {
          return val + '';
        },
        show: true,
        textStyle: {
          color: '#6ba1bb' //字体颜色
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      },
    }],
    series: panelSeries[panelIndex]
  }
}

function getDate(index) {
  var date = new Date(); //当前日期
  var newDate = new Date();
  newDate.setDate(date.getDate() + index); //官方文档上虽然说setDate参数是1-31,其实是可以设置负数的
  var time = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
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
let screenType = []
//过滤table数据
function filterArr(el) {
  Object.keys(el).map((i) => {
    if (screenType == '1') {
      if (screen.indexOf(el.statisticsItem) < 0) {
        delete el[i]
      }
    } else {
      if (screen.indexOf(el.statisticsItem) < 0) {
        delete el[i]
      }
    }
    if (screen.indexOf(i) < 0) {
      delete el[i]
    }
  })
  if (JSON.stringify(el) !== '{}') {
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
    picketArray: ['总计', '新增', '存量'],
    cityArray: ['全部城市', '北京市', '天津市', '上海市', '南京市', '苏州市', '杭州市', '郑州市', '武汉市', '广州市', '深圳市', '成都市'],
    index: 0,
    index1: 0,
    index2: 0,
    index3: 0,
    panelIndex: 0,
    array1: [
      {
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
      {
        code: '日报',
        codeVal: '5'
      }
    ],
    show: false,
    monthShow: false,
    panelSeries: false,
    radio: '',
    dimension: 0,
    cityCode: -1,
    cityCode2: -1,
    dateType: 1,
    TabCur: 0,
    TabList: ['司机报表', '渠道报表'],
    timeArray: ['本周', '上周', '本月', '上月', '日报'],
    timeCode: '1',
    title: '日报',
    dataStart: new Date().getTime(),
    dataEnd: new Date().getTime(),
    minDate: new Date().getTime(),
    minWeek: getDate(-7),
    timeChange: getTimeNow(),
    tableDatas: [],
    tableDatas2: [],
    echartData1: [],
    echartData2: [],
    echartData3: [],
    echartData4: [{
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        color: ["#F58080", "#47D8BE", "#F9A589"],
        data: ['新报', '流失', '续费'],
        left: 'center',
        bottom: 'bottom'
      },
      grid: {
        top: 'middle',
        left: '3%',
        right: '4%',
        bottom: '3%',
        height: '80%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [100, 200, 20, 30, 60, 89],
        axisLine: {
          lineStyle: {
            color: "#999"
          }
        }
      },
      yAxis: {
        type: 'value',

        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#DDD'
          }
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: "#333"
          },
        },
        nameTextStyle: {
          color: "#999"
        },
        splitArea: {
          show: false
        }
      },
      series: [{
          name: '新报',
          type: 'line',
          data: [800, 900, 220, 130, 660, 289],
          color: "#F58080",
          lineStyle: {
            normal: {
              width: 5,
              color: {
                type: 'linear',

                colorStops: [{
                  offset: 0,
                  color: '#FFCAD4' // 0% 处的颜色
                }, {
                  offset: 0.4,
                  color: '#F58080' // 100% 处的颜色
                }, {
                  offset: 1,
                  color: '#F58080' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(245,128,128, 0.5)',
              shadowBlur: 10,
              shadowOffsetY: 7
            }
          },
          itemStyle: {
            normal: {
              color: '#F58080',
              borderWidth: 10,
              /*shadowColor: 'rgba(72,216,191, 0.3)',
               shadowBlur: 100,*/
              borderColor: "#F58080"
            }
          },
          smooth: true
        },
        {
          name: '流失',
          type: 'line',
          data: [123, 568, 111, 222, 123, 56],
          lineStyle: {
            normal: {
              width: 5,
              color: {
                type: 'linear',

                colorStops: [{
                    offset: 0,
                    color: '#AAF487' // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: '#47D8BE' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: '#47D8BE' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(71,216,190, 0.5)',
              shadowBlur: 10,
              shadowOffsetY: 7
            }
          },
          itemStyle: {
            normal: {
              color: '#AAF487',
              borderWidth: 10,
              /*shadowColor: 'rgba(72,216,191, 0.3)',
               shadowBlur: 100,*/
              borderColor: "#AAF487"
            }
          },
          smooth: true
        },
        {
          name: '续费',
          type: 'line',
          data: [125, 568, 25, 36, 784, 56],
          lineStyle: {
            normal: {
              width: 5,
              color: {
                type: 'linear',

                colorStops: [{
                    offset: 0,
                    color: '#F6D06F' // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: '#F9A589' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: '#F9A589' // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              },
              shadowColor: 'rgba(249,165,137, 0.5)',
              shadowBlur: 10,
              shadowOffsetY: 7
            }
          },
          itemStyle: {
            normal: {
              color: '#F6D06F',
              borderWidth: 10,
              /*shadowColor: 'rgba(72,216,191, 0.3)',
               shadowBlur: 100,*/
              borderColor: "#F6D06F"
            }
          },
          smooth: true
        }
      ]
    }]
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
      this.pieComponent = this.selectComponent('#mychart-dom-pie');
      this.barComponent = this.selectComponent('#mychart-dom-bar');
      this.pieComponent2 = this.selectComponent('#mychart-dom-pie2');
      this.pieComponent3 = this.selectComponent('#mychart-dom-pie3');
      this.pieComponent4 = this.selectComponent('#mychart-dom-panel4');
      this.getData()
    },
    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
      })
      if(this.data.TabCur == 1){
        this.getData2();
      }
    },
    //时间塞选
    bindPickerChangeTime: function(e) {
      this.setData({
        index1: e.detail.value,
        timeCode: this.data.array1[e.detail.value].codeVal
      })
      this.getData2()
    },
    getData() {
      let that = this;
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: false
      }
      that.triggerEvent('myevent', showCover)
      network.requestLoading('api/datacenter/driver/statistics/center', {
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
            // const arr2 = [];
            Arrays.map((i) => {
              arr.push(Object.assign({}, i))
              // arr2.push(Object.assign({}, i))
            })
            //生命周期数据指标
            let tableData1 = ['statisticsItem', 'c_110100', 'total', 'c_310100', 'c_320100', 'c_330100', 'c_410100', 'c_420100', 'c_440100', 'c_500100', 'c_510100', 'intentionNew', 'intentionMonth', 'addStrongIntentionDriverNum', 'addStrongIntentionDriverNumM', 'goToWorkDay', 'goToWorkMonth', 'signingAdd', 'signingMonth'];
            let tableData2 = ['statisticsItem', 'c_110100', 'total', 'c_310100', 'c_320100', 'c_330100', 'c_410100', 'c_420100', 'c_440100', 'c_500100', 'c_510100', 'intentionMonth', 'addStrongIntentionDriverNumM', 'goToWorkMonth', 'signingMonth'];
            let tableData3 = ['statisticsItem', 'c_110100', 'total', 'c_310100', 'c_320100', 'c_330100', 'c_410100', 'c_420100', 'c_440100', 'c_500100', 'c_510100', 'intentionNew', 'addStrongIntentionDriverNum', 'goToWorkDay', 'signingAdd'];
            if (that.data.dateType == 2) {
              screen = tableData3;
            } else if (that.data.dateType == 1) {
              screen = tableData1;
            } else {
              screen = tableData3;
            }
            screenType = 1;
            const list1 = arr.filter(filterArr)
            that.setData({
              tableDatas: list1
            })
            that.selectComponent('#c-table').onshow()
            //关键数据指标
            // screen = ['cityName', 'idleProb', 'biddingRate', 'monIdelDays', 'monIdlesTimes', 'monAvgOnline', 'auditAvgPeriod', 'singleDriverSupportNum', 'tenderBiddingAveragePeriod', 'tenderMonthlyAvgEstimateIncome', 'dayDeliveTime', 'avgDailyDeliveryMileage']
            // const list2 = arr2.filter(filterArr)
            // that.setData({
            //   tableDatas2: list2
            // })
            // that.selectComponent('#c-table2').onshow()
            //获取echarts
            // let arrCharts = [];
            // let arrCharts2 = [];
            // let arrCharts3 = [];
            // let arrCharts4 = [];
            // let data2 = [];
            // let data3 = [];
            // //线路方数据
            // res.data.neckDataCenterVO.lineCategroyRatio.map((i) => {
            //   arrCharts.push(i.name)
            // })
            // //货物类型数据
            // res.data.neckDataCenterVO.goodsTypeRatio.map((i) => {
            //   arrCharts2.push(i.name)
            //   data2.push(i.value)
            // })
            // //收货人数据
            // res.data.neckDataCenterVO.consigneeTypeRatio.map((i) => {
            //   arrCharts3.push(i.name)
            // })
            // //不可用线路数据
            // res.data.neckDataCenterVO.unavailableLineClassificationRatio.map((i) => {
            //   arrCharts4.push(i.name)
            // })
            // that.setData({
            //   echartData1: res.data.neckDataCenterVO.lineCategroyRatio,
            //   echartData2: res.data.neckDataCenterVO.goodsTypeRatio,
            //   echartData3: res.data.neckDataCenterVO.consigneeTypeRatio,
            //   echartData4: res.data.neckDataCenterVO.unavailableLineClassificationRatio,
            // })
            // echartData1 = that.data.echartData1
            // echartData2 = data2
            // echartData3 = that.data.echartData3
            // echartData4 = that.data.echartData4
            // echartkey1 = arrCharts
            // echartkey2 = arrCharts2
            // echartkey3 = arrCharts3
            // echartkey4 = arrCharts4
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

    getData2() {
      let that = this;
      //注意这里是打开真实的cover-view的tab栏
      let showCover = {
        showCover: false
      }
      that.triggerEvent('myevent', showCover)
      network.requestLoading('api/datacenter/driver/statistics/V1.9/clue/channel/report', {
        "city": that.data.cityCode2,
        "type": that.data.timeCode
      },
        'post',
        '',
        'json',
        function (res) {
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
            let tableData1 = ['statisticsItem', 'followNewClueNum', 'followClueCountNum', 'addWechatNum', 'addWechatRate', 'interviewsNum', 'highIntentionalNum', 'transactionsNum', 'totalNumber', 'statisticsField_10', 'statisticsField_28', 'statisticsField_29', 'statisticsField_31', 'statisticsField_32', 'statisticsField_33', 'statisticsField_20', 'statisticsField_30', 'statisticsField_40', 'statisticsField_50', 'statisticsField_70', 'statisticsField_1', 'statisticsField_2', 'statisticsField_3', 'statisticsField_4', 'statisticsField_5', 'statisticsField_6', 'statisticsField_9', 'statisticsField_11', 'statisticsField_12', 'statisticsField_13', 'statisticsField_14', 'statisticsField_15', 'statisticsField_16', 'statisticsField_17', 'statisticsField_18', 'statisticsField_19', 'statisticsField_21', 'statisticsField_22', 'statisticsField_23', 'statisticsField_24', 'statisticsField_25', 'statisticsField_26', 'statisticsField_27', 'statisticsItemExten'];
            screen = tableData1;
            screenType = 2;
            const list1 = arr.filter(filterArr)
            console.log(list1)
            that.setData({
              tableDatas2: list1
            })
            that.selectComponent('#c-table2').onshow()
          }
        },
        function (res) {
          wx.showToast({
            title: '请求错误',
            icon: 'loading'
          });
          that.setData({
            tableDatas2: []
          })
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
      network.requestLoading('api/datacenter/driver/statistics/V1.7/abstractData/chart', {
          city: that.data.cityCode,
          startMonth: that.data.dataStart,
          endMonth: that.data.dataStart,
          type: that.data.dateType
        },
        'post',
        '',
        'json',
        function(res) {
          if (res.success) {
            //获取echarts
            // let arrCharts = [];
            // let arrCharts2 = [];
            // let arrCharts3 = [];
            // let arrCharts4 = [];
            // let data2 = []
            // let data3 = []
            //线路方数据
            // res.data.lineCategroyRatio.map((i) => {
            //   arrCharts.push(i.name)
            // })
            //货物类型数据
            // res.data.goodsTypeRatio.map((i) => {
            //   arrCharts2.push(i.name)
            //   data2.push(i.value)
            // })
            //收货人数据
            // res.data.consigneeTypeRatio.map((i) => {
            //   arrCharts3.push(i.name)
            // })
            //不可用线路数据
            // res.data.unavailableLineClassificationRatio.map((i) => {
            //   arrCharts4.push(i.name)
            // })
            // that.setData({
            //   echartData1: res.data.lineCategroyRatio,
            //   echartData2: res.data.goodsTypeRatio,
            //   echartData3: res.data.consigneeTypeRatio,
            //   echartData4: res.data.unavailableLineClassificationRatio,
            // })
            // echartData1 = that.data.echartData1
            // echartData2 = data2
            // echartData3 = that.data.echartData3
            // echartData4 = that.data.echartData4
            // echartkey1 = arrCharts
            // echartkey2 = arrCharts2
            // echartkey3 = arrCharts3
            // echartkey4 = arrCharts4
            if (res.data) {
              // 面试司机数
              panelSeries[0].data = res.data.addIntentionDriverNums
              // 高意向司机数
              panelSeries[1].data = res.data.addStrongIntentionDriverNums
              // 成交司机数
              panelSeries[2].data = res.data.addStrongIntentionDriverNums
              // 上岗司机数
              panelSeries[3].data = res.data.addWorkDriverNums
              echartkey1 = res.data.name
              that.setData({
                panelSeries: false
              })
            } else {
              // 面试司机数
              panelSeries[0].data = []
              // 高意向司机数
              panelSeries[1].data = []
              // 成交司机数
              panelSeries[2].data = []
              // 上岗司机数
              panelSeries[3].data = []
              echartkey1 = []
              that.setData({
                panelSeries: true
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
    },
    //城市塞选
    bindPickerChangeCity: function(e) {
      this.setData({
        index2: e.detail.value,
        cityCode: this.data.array[e.detail.value].codeVal
      })
      this.getEacherData()
    },
    bindPickerChangeCity2: function (e) {
      this.setData({
        index3: e.detail.value,
        cityCode2: this.data.array[e.detail.value].codeVal
      })
      this.getData2()
    },
    onMyButtonTaps() {
      console.log('重新加载一次')
      this.init_bar()
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
      // this.barComponent.init((canvas, width, height) => {
      //   // 初始化图表
      //   const barChart = echarts.init(canvas, null, {
      //     width: width,
      //     height: height
      //   });
      //   barChart.setOption(initChart2());
      //   // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      //   return barChart;
      // });
      // this.pieComponent2.init((canvas, width, height) => {
      //   // 初始化图表
      //   const barChart = echarts.init(canvas, null, {
      //     width: width,
      //     height: height
      //   });
      //   barChart.setOption(initChart3());
      //   // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      //   return barChart;
      // });
      // this.pieComponent3.init((canvas, width, height) => {
      //   // 初始化图表
      //   const barChart = echarts.init(canvas, null, {
      //     width: width,
      //     height: height
      //   });
      //   barChart.setOption(initChart4());
      //   // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      //   return barChart;
      // });
      if (this.data.dateType != 1) {
        this.pieComponent4.init((canvas, width, height) => {
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
      }
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
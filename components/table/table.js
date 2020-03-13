var network = require("../../utils/network.js");

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tableData: Array,
  },

  /**
   * 组件的初始数据
   */
  data: {
    columnInfo: [], //每列的宽度
    bodyWidth: 0, // 总宽度
    fixedList: [],  //侧边栏数据
    showFixedLeft: false,  //显示侧边栏
    noMore: false, //判断是否有数据
    loading: true, //加载动画
    fixedListTop: 0, //侧边栏滚动位置
    datas: [],
    cityArray: []
  },
  ready() {
    let that = this
    that.loadMore();
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show() { },
    hide() { },
    resize() { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onshow() {
      this.getCity();
      this.loadMore();
    },
    /**
       * 计算单元格与scroll-view宽度
       */
    calc_col_width() {
      this.setData({
        columnInfo: [],
        bodyWidth: 0,
      });
      let keys = Object.keys(this.data.datas[0]);
      let { bodyWidth } = this.data;
      this.createSelectorQuery().selectAll('#table-body > .body > .tr > .td > .content').boundingClientRect(rects => {
        let row_info = rects.slice(0, keys.length);
        let columnInfo = {};
        row_info.map((row, i) => {
          let width = this.get_str_length(keys[i]) > row.width ? this.get_str_length(keys[i]) : row.width;
          columnInfo[keys[i]] = width;
          bodyWidth += width;
          this.setData({
            columnInfo,
            columns: Object.keys(columnInfo),
            bodyWidth
          });
        });
      }).exec();
    },
    /**
     * 根据内容返回单元格宽度
     * @param str 单元格数据
     */
    get_str_length(str) {
      var length = 0;
      for (let i = 0; i < str.length; i++) {
        let c = str.charAt(i);
        if (/^[\u0000-\u00ff]$/.test(c)) {
          length += 0.8;
        }
        else {
          length += 1;
        }
      }
      return length * 14
    },
    /**
     * 显示侧边栏
     */
    showFixList() {
      const { datas, columns } = this.data;
      this.createSelectorQuery().selectAll(`#table-body > .body > .tr > .${columns[0]}`).boundingClientRect(rects => {
        let fixedList = [];
        let showFixedLeftData = true;
        rects.map((r, i) => {
          if (r.left < 1 && r.left == 0){
            showFixedLeftData = false;
          }else{
            showFixedLeftData = true;
          }
          fixedList.push({
            height: r.height,
            width: r.width,
            data: datas[i][columns[0]]
          })
        });
        this.setData({
          fixedList,
          showFixedLeft: showFixedLeftData,
        })
      }).exec();
    },
    /**
     * 设置左边固定栏目的滚动位置
     */
    setFixedListPosition(e) {
      this.showFixList();
      this.setData({ fixedListTop: e.detail.scrollTop })
    },
    /**
     * 加载更多, 通过绑定bindscrolltolower
     */
    loadMore() {
      const newData = this.data.tableData
      let { datas } = this.data;
      datas = [];
      newData.map((item) => {
        datas.push(item)
      })
      if (datas.length) {
        wx.showLoading({
          title: '加载数据...',
        });
        // 在此更新数据
        this.setData({ datas, loading: false, noMore: false});
        this.calc_col_width();
      } else {
        this.setData({
          noMore: true,
          loading: false
        })
      }
      wx.hideLoading();
      // setTimeout(() => {
      //   // 模拟异步
      //   for (let i = 0; i <= 10; i++) {
      //     datas.push({
      //       "city": '北京',
      //       "xzlxzl": "60%",
      //       "Name": "帅气阿斯顿发",
      //       "Doctor": "12",
      //       "CustomerManager": "22",
      //       "IcNo": "800000998",
      //       "IsHospital": "3",
      //       "IsHospital1": "4",
      //       "P2D": "9:30",
      //       "P4D": "",
      //       "Project9": "",
      //       "Project4": "9:20",
      //       "Project13": "",
      //       "sort": 830,
      //     });
      //   }
      //   // 在此更新数据
      //   this.setData({ datas });
      //   this.calc_col_width();
      //   wx.hideLoading();
      // }, 100);
    },
    getCity() {
      let that = this;
      //获取城市列表
      network.requestLoading('api/base/base/dict/qryDictByType', {
        dictType: 'online_city'
      },
        'GET',
        '',
        '',
        function (res) {
          if (res.success) {
            //过滤picker
            that.setData({
              array: res.data
            });
            const arrays = that.data.array.toString()
            that.setData({
              cityArray: arrays
            });
          }
        },
        function (res) {
          wx.showToast({
            title: '加载数据失败',
          });
        });
    }
  }
})
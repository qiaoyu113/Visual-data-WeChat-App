Page({
  data: {
    columnInfo: [], //每列的宽度
    bodyWidth: 0, // 总宽度
    fixedList: [],  //侧边栏数据
    showFixedLeft: false,  //显示侧边栏
    fixedListTop: 0, //侧边栏滚动位置
    datas: []
  },
  onLoad() {
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
    wx.createSelectorQuery().selectAll('#table-body > .body > .tr > .td > .content').boundingClientRect(rects => {
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
      console.log(this.data.columnInfo);
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
    return length * 16
  },
  /**
   * 显示侧边栏
   */
  showFixList() {
    const { datas, columns } = this.data;
    wx.createSelectorQuery().selectAll(`#table-body > .body > .tr > .${columns[0]}`).boundingClientRect(rects => {
      let fixedList = [];
      rects.map((r, i) => {
        fixedList.push({
          height: r.height,
          width: r.width,
          data: datas[i][columns[0]]
        })
      });
      this.setData({
        fixedList,
        showFixedLeft: true,
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
    wx.showLoading({
      title: '加载数据...',
    });
    const { datas } = this.data;
    setTimeout(() => {
      // 模拟异步
      for (let i = 0; i <= 10; i++) {
        datas.push({
          "Aid": 43805,
          "MakeDate": "2018-04-25 00:00:00",
          "Name": "12",
          "Doctor": "12",
          "CustomerManager": "22",
          "IcNo": "800000998",
          "IsHospital": "3",
          "IsHospital1": "4",
          "P2D": "9:30",
          "P4D": "",
          "Project9": "",
          "Project4": "9:20",
          "Project13": "",
          "sort": 830,
        });
      }
      // 在此更新数据
      this.setData({ datas });
      this.calc_col_width();
      wx.hideLoading();
    }, 1000);
  }
})


// "tabBar": {
//   "color": "#333",
//   "selectedColor": "#20A0FF",
//   "borderStyle": "white",
//   "list": [
//     {
//       "selectedIconPath": "lib/image/icon33.png",
//       "iconPath": "lib/image/icon3.png",
//       "pagePath": "pages/dataCenter/index",
//       "text": "司机数据统计"
//     },
//     {
//       "selectedIconPath": "lib/image/icon22.png",
//       "iconPath": "lib/image/icon2.png",
//       "pagePath": "pages/orderCenter/index",
//       "text": "订单数据统计"
//     },
//     {
//       "selectedIconPath": "lib/image/icon11.png",
//       "iconPath": "lib/image/icon1.png",
//       "pagePath": "pages/lineTenderData/index",
//       "text": "线路标书统计"
//     }
//   ]
// },
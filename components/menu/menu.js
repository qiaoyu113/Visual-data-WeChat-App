// components/menu/menu.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    activeKey: 0,
    menuList: [
      {
        "selectedIconPath": "lib/image/icon33.png",
        "iconPath": "lib/image/icon3.png",
        "pagePath": "../../pages/dataCenter/index",
        "text": "司机数据统计"
      },
      {
        "selectedIconPath": "lib/image/icon22.png",
        "iconPath": "lib/image/icon2.png",
        "pagePath": "../../pages/orderCenter/index",
        "text": "订单数据统计"
      },
      {
        "selectedIconPath": "lib/image/icon11.png",
        "iconPath": "lib/image/icon1.png",
        "pagePath": "../../pages/lineTenderData/index",
        "text": "线路标书统计"
      }
    ]
  },
  created(){
    
  },
  ready() {
    let that = this
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var url = currentPage.route
    if (url == 'pages/dataCenter/index') {
      app.globalData.menuActiveKey = 0
    }
    that.setData({
      activeKey: app.globalData.menuActiveKey
    })
    this.setRole();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openMenu() {
      this.setData({
        show: true,
        activeKey: app.globalData.menuActiveKey
      })
      console.log(this.data.activeKey)
    },
  
    onClose() {
      this.setData({
        show: false
      })
    },

    onChangeMenu(event) {
      app.globalData.menuActiveKey = event.currentTarget.dataset.i;
      let path = event.currentTarget.dataset.pagepath
      wx.redirectTo({
        url: path,
      })
    },
    setRole(){
      // 判断权限问题
      let that = this;
      let role = ['GMC', 'BGL'];
      let userInfo = wx.getStorageSync('userInfo');
      if(!userInfo){
        wx.clearStorageSync();
        return;
      }
      let isRole = userInfo.roleNames.some(item => role.includes(item))
      if(isRole){
        console.log(that.menuList)

        that.data.menuList.push({
          "pagePath": "../../pages/answer/answer",
          "text": "鹰眼评分"
        })
        this.setData({
          menuList: that.data.menuList
        })
      }
    },
    onLoginout(){
      wx.clearStorageSync();
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
})

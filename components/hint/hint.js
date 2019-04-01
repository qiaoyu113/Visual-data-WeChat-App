// components/hint/hint.js
Component({
  options: {
    multipleSlots: false // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    warnText: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    icon:{
      type: String,
      value: ''
    },
    size:{
      type:String,
      value:'40'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    warning:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showHint(time) {
      this.setData({
        warning: !this.data.warning
      })
      this.hideHint(time * 1000);
    },
    hideHint: function (time) {
      let that = this;
      setTimeout(function(){
        that.setData({
          warning: !that.data.warning
        })
      },time)
    },
  }
})
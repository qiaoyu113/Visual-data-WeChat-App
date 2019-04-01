//logs.js
const util = require('../../utils/util.js')
import {service} from '../../service/service.js'

Component({
  properties: {
  },
  data: {
    name:''
  },
  attached: function () {
    this.setData({name : '123456'})
    service.getSample().then(function(res){
      // console.log(res)
    })
  },
  methods: {
    // 这里是一个自定义方法
  }
})
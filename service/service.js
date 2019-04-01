import {request} from './request.js'

const service = {
  getSample : function(params){
    return request({
      url : 'tests/sleep.php?time=1&t=css&c=MA==&i=0',
      data : params
    })
  }
}

module.exports = {
  service : service
}
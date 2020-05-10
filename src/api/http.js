import request from '@/utils/request'

export default {
  get: function(url, params) {
    return request({
      url,
      method: 'get',
      params
    })
  },

  post: function(url, data) {
    return request({
      url,
      method: 'post',
      data
    })
  }
}

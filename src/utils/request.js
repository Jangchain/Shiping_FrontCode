import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import MD5 from 'md5.js'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const timestamp = Math.round(localStorage.getItem('syncTime') ? new Date().getTime() + parseInt(localStorage.getItem('syncTime'), 10) : new Date().getTime()) + ''
    config.headers['X-Ca-Timestamp'] = timestamp
    const nonces = Math.random().toString(36).substr(2)
    config.headers['X-Ca-Nonces'] = nonces
    const sign = new MD5().update('X-Ca-Timestamp=' + timestamp + '&X-Ca-Nonces=' + nonces).digest('hex')
    config.headers['X-Ca-Sign'] = sign
    let base = window.btoa(unescape(encodeURIComponent(config.data)))
    const baseAnother = base.substr(0, base.length - 1)
    base = baseAnother.split('').reverse().join('') + base.substr(base.length - 1, base.length)
    const valid = new MD5().update(sign.substr(0, 7) + base).digest('hex')
    config.headers['X-Ca-Valid'] = valid

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // config.headers['X-Token'] = getToken()
      if (config.url !== `${config.baseURL}/common/auth/acct/login`) {
        config.headers['authorization'] = getToken()
      }
      if (config.url !== `${config.baseURL}/common/auth/code`) {
        config.headers['userName'] = `${store.getters.name}`
      }
    }
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data || {}

    // if the custom code is not 20000, it is judged as an error.
    if (res.code) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data || {}
    Message({
      message: res.message || '系统繁忙，请稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
    if ([10010066, 10010067].indexOf(res.code) > -1) {
      MessageBox.confirm('你已离线，请重新登录', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    }
    return Promise.reject(error)
  }
)

export default service

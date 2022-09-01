import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import define from '@/utils/define'
import router from '@/router'


// create an axios instance
const service = axios.create({
  // baseURL: "http://localhost:3000/dev/",
  // baseURL:"http://10.10.10.70",
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: define.timeout, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 部分接口timeout时间单独处理
    if (config.url.indexOf('Synchronization') > -1 ||
      config.url.indexOf('Permission/Authority/Data') > -1 || config.url.indexOf('DataSync/Actions/Execute') > -1) {
      config.timeout = 100000
    }
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    if (config.method == 'get') {
      config.params = config.data
    }
    // 单点axios 传入cookie
    if (!!config.hedercookie) {
      config.headers['Oam-Cookie'] = config.hedercookie
    }
    if (!!config.hederOAcookie) {
      config.headers['Oa-Cookie'] = config.hederOAcookie
    }
    config.headers['x-gr-app-id'] = 'business'
    // 单点axios 传入cookie
    let timestamp = Date.parse(new Date()) / 1000
    if (config.url.indexOf('?') > -1) {
      config.url += `&n=${timestamp}`
    } else {
      config.url += `?n=${timestamp}`
    }
    return config
  },
  error => {
    // do something with request error
    if (process.env.NODE_ENV === 'development') {
      console.log(error) // for debug
    }
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    let config = response.config
    let url = config.url
    // 特殊接口处理
    if (url.indexOf('/Base/DataSource/Actions/Test') > -1 || (url.indexOf('Model') > -1 && url.indexOf('Config') > -1) || url.indexOf('devapi.qweather.com') > -1 || url.indexOf('/task/uniontask/task/getTaskListNum') > -1) return res
    if (config.hideError) return res
    if (res.code != 200) {
      // 600：登录过期,请重新登录  601: 您的帐号在其他地方已登录,被强制踢出 602: Token验证失败
      if (res.code == 600 || res.code == 601 || res.code == 602) {
        MessageBox.confirm(res.msg, '提示', {
          type: 'warning',
          showCancelButton: false,
          confirmButtonText: '确定'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            router.push('/login')
            // if (window.location.pathname.indexOf('login') > -1) return
            // setTimeout(() => { location.reload() }, 100);
          })
        })
      } else {
        Message({
          message: res.msg || '请求出错，请重试',
          type: 'error',
          duration: 1500,
          onClose: () => {
          }
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data
    if (process.env.NODE_ENV === 'development') {
      console.log(res.msg) // for debug
    }
    // 600：登录过期,请重新登录  601: 您的帐号在其他地方已登录,被强制踢出 602: Token验证失败
    if (res.code == 600 || res.code == 601 || res.code == 602) {
      MessageBox.confirm(res.msg, '提示', {
        type: 'warning',
        showCancelButton: false,
        confirmButtonText: '确定'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          router.push('/login')
          // if (window.location.pathname.indexOf('login') > -1) return
          // setTimeout(() => { location.reload() }, 100);
        })
      })
    } else {
      Message({
        message: res.msg || '请求出错，请重试',
        type: 'error',
        duration: 1500,
        onClose: () => {
        }
      })
    }

    return Promise.reject(error)
  }
)

export default service
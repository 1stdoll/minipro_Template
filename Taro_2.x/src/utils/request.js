import Taro from '@tarojs/taro'
import { getToken } from './utils.js'
// import {
//   NOCONSOLE,
// MAINHOST
// } from '../config'
// import {
//   commonParame
// } from '../config/requestConfig'

const testApiServer = 'https://nbtaoqqtest-benfit.nbmdtv.com/api';
const apiServer = 'https://park-api.nbmetro.com/api';
const cardServer = 'https://cardsystem.joylinkcenter.com';
const cardAliServer = 'https://ali-card.joylinkcenter.com';
const Test = false

// "appid": "wx8d9584d470b4efc5", //优城
// "appid": "wx35738cd35fdd5a15", //悦邻汇

export default (options = { method: 'GET', test: false }) => {
  /*
  return new Promise((resolve, reject) => {
    console.warn('in request', options.data)
    setTimeout(() => {
      console.warn('return request')
      return resolve({ code: '0000', data: { count: options.data * 12 + 5 } })
    }, 500)
  })
  */


  if (!options.url) {
    Taro.showToast({
      icon: 'none',
      title: '哎呀！出错了~',
    })
    return;
  }

  const headerJSON = {
    'Content-Type': 'application/json; charset=UTF-8',
    'authorization': getToken()
  }

  console.log('request=>', options)
  let server = apiServer
  if (options.test || Test) server = testApiServer
  if (options.cardUrl) server = cardServer
  if (options.aliUrl) server = cardAliServer

  return Taro.request({
    url: `${server}${options.url}`,
    data: options.data || null,
    header: { ...headerJSON, ...options.header },
    method: options.method,
  }).then((res) => {
    // Taro.hideLoading()
    const { data, statusCode } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if ((data.code && data.code !== "0000") || (data.status && data.status !== 'OK')) {
        let title = ''
        switch (data.code) {
          case "0007":
            title = '未登录'
            break;
          case "0008":
            title = '未登录'
            break;
          case "0001":
            title = data.msg || '哎呀！出错了~'
            break;
          case "0009":
            title = '登录状态异常'
            break;
          default:
            title = data.msg
            break;
        }
        Taro.showToast({
          icon: 'none',
          title
        })
      }
      return data
    } else {
      Taro.showToast({
        icon: 'none',
        title: '哎呀！出错了~',
      })
      return
    }
  });
};

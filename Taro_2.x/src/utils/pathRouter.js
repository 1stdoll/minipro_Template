import Taro from '@tarojs/taro';
import { Toast } from './utils';
const env = Taro.getEnv()

export function MiniParams(url) {             // 根据（自定义）链接获取小程序跳转信息
  // console.log('url=>', url)
  const paramsArr = url.split('&')
  const params = {}
  // console.log('paramsArr=>', paramsArr)
  paramsArr.forEach(i => {
    const a = i.split('=')
    let apptype = 0
    const typeMap = ['wx', 'ali']
    // console.log('in pathRouter', a[0].toLowerCase())
    if (env === 'ALIPAY') apptype = 1
    if (a[0].toLowerCase().indexOf(typeMap[1 - apptype]) > -1) return
    if (a[0].toLowerCase() === `${typeMap[apptype]}appid`) { params['appId'] = a[1]; return }
    if (a[0].indexOf('path') > -1 || a[0].indexOf('page') > -1) {
      if ((a[0] === `${typeMap[apptype]}path` || a[0] === `${typeMap[apptype]}page`) || (a[0] === 'path' || a[0] === 'page' && !params.path)) {
        params['path'] = decodeURIComponent(a[1]);
        return
      };
      return
    }
    if (typeof params['extraData'] === 'undefined') params['extraData'] = {}
    params['extraData'][a[0]] = a[1]
  })
  // console.log(data)
  return params
}

export const pathRouter = (path) => {         // 小程序内部跳转 搭配后台接口可配置H5/小程序/支付宝业务页面跳转
  // console.log('in pathRouter ', path)
  const routerError = () => Taro.showToast({ icon: 'none', title: '这里进不去哦！' })
  switch (true) {
    case path.indexOf('https://render.alipay.com/') > -1 || path.indexOf('alipays') > -1:
      console.log('in pathRouter is ali path')
      if (env !== "ALIPAY") { return routerError() }
      console.log('ali path', path)
      my.ap.navigateToAlipayPage({ path: path, complete: res => console.warn('res', res) })
      break;
    case path.toLowerCase().indexOf('appid') > -1:
      console.log('in pathRouter is minipro path')
      const data = MiniParams(path)
      console.log('minipro data', data)
      if (!data.appId && !data.path) return Toast('哎呀！小程序进不去~')
      Taro.navigateToMiniProgram({ ...data })
      break;
    case path.indexOf('page') > -1 && path.indexOf('page') < 3:
      console.log('in pathRouter is my page')
      let url = path.replace('page/', 'pages/').replace(/[\'\,]/g, '')
      pageTo(url, {}, 2, {
        fail: () => {
          Taro.showToast({
            icon: 'none',
            title: '程序员小哥哥正在疯狂加班中~敬请期待！'
          })
        }
      })
      break;
    default:
      Toast('无法跳转至该地址~')
      break;
  }
}

const P2S = (params) => {                     // 参数转换成字符串 小程序内部跳转专用
  let str = ''
  switch (typeof params) {
    case 'object':
      const Arr = Object.keys(params).map(i => `${i}=${i === 'url' ? encodeURIComponent(params[i]) : params[i]}`)
      str = `?${Arr.join('&')}`
      break;
    case 'string':
      str = `?${params}`
      break;
    default:
      return;
  }
  return str
}

                                              // 小程序内部跳转 内部专用跳转事件  type: -1 = reLaunch | 0 = redirectTo | 1 = navigateTo | 2 = path字段为完整链接输入 [自动判断是否是Tab页面]
let page_to_run = false
export const pageTo = (path, params, type = 1, fct) => {
  if (page_to_run === true) return
  page_to_run = true
  const app = Taro.getApp()
  // console.warn('app', app)
  const cmd = {
    success: () => !!fct && !!fct.success && fct.success(),
    fail: () => !!fct && !!fct.fail && fct.fail(),
    complete: () => !!fct && !!fct.complete && fct.complete()
  }
  if (!!app.config.tabBar) {
    const tabList = app.config.tabBar.list || []
    let inTab = false
    for (var i = 0; i < tabList.length; i++) {
      if (type == 2 && tabList[i].pagePath === path.replace(/\?[\S]*/g, '')) { Taro.switchTab({ url: path, ...cmd }); inTab = true; break }
      else if (tabList[i].pagePath === `pages/${path}/index`) { Taro.switchTab({ url: `/pages/${path}/index`, ...cmd }); inTab = true; break }
    }
    if (inTab) return page_to_run = false
  }
  const pagesList = app.config.pages || []
  let inPages = false
  for (var i = 0; i < pagesList.length; i++) {
    if (pagesList[i] === `pages/${path}/index`) {
      const query = !!params ? P2S(params) : ''
      const data = { url: `/pages/${path}/index${query}`, ...cmd }
      switch (type) {
        case -1: Taro.reLaunch(data); break;
        case 0: Taro.redirectTo(data); break;
        default: Taro.navigateTo(data); break;
      }
      inPages = true;
      break
    }
  }
  if (!inPages) { console.error(`page [/pages/${path}/index] not find`); Taro.showToast({ icon: 'none', title: '该页面不存在' }) }
  page_to_run = false
}
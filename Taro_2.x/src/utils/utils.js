import Taro from '@tarojs/taro'
export const getToken = () => Taro.getStorageSync('token')
// 超文本格式处理 方法
export const replaceHtml = (html = '') => {
  // console.log('replaceHtml run =>', html)
  var res = html.replace(/\<(font)/g, '<span')
    .replace(/\<(font)/g, '/span')
    .replace(/\<(br)\>/g, '<br />')
    .replace(/\<(section)\>/g, '')
    .replace(/\<\/(section)\>/g, '')
    .replace(/\<(p)/g, '<p class="rich_p" ')
    .replace(/\<(img)/g, '<img style="max-width:100%;height:auto"')
    // .replace(/\<[i][m][g]/g, '<img class="rich_img"')
    .replace(/(line-height\:)\s(normal)/g, 'line-height:1.8em')
  // console.log(html.indexOf('img'))
  // .replace(/(font-size:)[\s]*[\d]*(px)/g, 'font-size:1em')
  // console.log(res)
  // console.log('replaceHtml outt =>', res)
  return res
}
// 时间处理 方法（自开发）
export function moment(date) {
  const fct_date = (d) => d === void 0 || d === null ? new Date() : typeof d === 'string' ? new Date(d.replace(/[-]/g, '/')) : new Date(d)
  let T = fct_date(date)
  let aTc = 0
  // if (date === void 0) T = new Date()
  // else 
  const dataArr = (D) => {
    let Tarr = [1, 2, 3, 4, 5, 6]
    Tarr[0] = D.getFullYear()
    Tarr[1] = D.getMonth() + 1
    Tarr[2] = D.getDate()
    Tarr[3] = D.getHours()
    Tarr[4] = D.getMinutes()
    Tarr[5] = D.getSeconds()
    return Tarr
  }
  function format(v) {
    let F = v || 'YYYY-M-D H:m:S'
    let Ft = dataArr(T)
    if (F.indexOf('MM') !== -1 && Ft[1] < 10) Ft[1] = `0${Ft[1]}`
    if (F.indexOf('DD') !== -1 && Ft[2] < 10) Ft[2] = `0${Ft[2]}`
    if (F.indexOf('HH') !== -1 || F.indexOf('hh') !== -1 && Ft[3] < 10) Ft[3] = `0${Ft[3]}`
    if (F.indexOf('mm') !== -1 && Ft[4] < 10) Ft[4] = `0${Ft[4]}`
    if (F.indexOf('SS') !== -1 && Ft[5] < 10) Ft[5] = `0${Ft[5]}`
    // console.log('time=>', Ft)
    let f = F.replace(/[Y]+/g, Ft[0])
      .replace(/[M]+/g, Ft[1])
      .replace(/[D]+/g, Ft[2])
      .replace(/[H]+/g, Ft[3])
      .replace(/[h]+/g, Ft[3])
      .replace(/[m]+/g, Ft[4])
      .replace(/[S]+/g, Ft[5])
    return f
  }
  function add(v = 0, t = 'day') {
    let V = v
    let Tt = t
    let adT = T
    const dateAdd = {
      'year': () => adT.setFullYear(adT.getFullYear() + V),
      'month': () => adT.setMonth(adT.getMonth() + V),
      'day': () => adT.setDate(adT.getDate() + V),
      'hour': () => adT.setHours(adT.getHours() + V),
      'minutes': () => adT.setMinutes(adT.getMinutes() + V),
      'seconds': () => adT.setSeconds(adT.getSeconds() + V),
    }
    dateAdd[Tt]()
    T = adT
    const ad = {
      format,
      timing,
      value: format(),
      callback: adT
    }
    return ad
  }
  function outTimeArr(l, t = false) {
    // console.log('outTimeArr', t)
    let arr = [0, 0, 0, 0]
    arr[0] = l >= 86400 ? parseInt(l / 86400) : 0
    arr[1] = !!t ? parseInt(l / 3600) : parseInt(l % 86400 / 3600)
    arr[2] = l >= 60 ? parseInt((l % 3600) / 60) : 0
    arr[3] = parseInt(l % 60)
    return arr
  }
  const mat = ['天', '小时', '分', '秒']
  function timing(date1, d_mat = '天-小时-分-秒') {
    const Mat = d_mat.split('-')
    if (date1 === void 0 && date === void 0) return 0
    const T2 = fct_date(date1)
    const ls = parseInt((T - T2) / 1000)
    const ct = outTimeArr(ls, d_mat.indexOf('天') === -1)
    let str = ''
    if (T - T2 > 0) ct.forEach((i, o) => { if (i > 0 && Mat.indexOf(mat[o]) > -1) str += i + mat[o] })
    // console.log('timing', date1, T, T2)
    return str
  }
  const mt = {
    format,
    add,
    timing,
    value: T
  }
  return mt
}
// 计时器 循环方法
const timeRuns = {}
export function timeRun(key, back, num = 1000) {
  // if (Object.keys(timeRuns).indexOf(key) > -1) return Taro.showToast({ icon: 'none', title: '存在相同的计时器标识' })
  console.log('timeRun => ', key)
  timeStop(key)
  if (back !== void 0) back()
  timeRuns[key] = setInterval(() => !!back && back(), num)
}
// 计时器 循环方法  移除
export function timeStop(key) {
  if (key === void 0) Object.keys(timeRuns).forEach(i => clearInterval(timeRuns[i]), delete timeRuns[key])
  if (Object.keys(timeRuns).indexOf(key) > -1) {
    // console.log('不存在的计时器标识')
    console.log('timeStop => ', key)
    clearInterval(timeRuns[key])
    delete timeRuns[key]
  }
}
// 计时器 循环方法  输出登记的序列
export function timeOut() {
  console.log('timeRuns list => ', Object.keys(timeRuns))
}

// 获取超链接 参数
export function pathParams(url) {
  // console.log('url=>', url)
  const paramsArr = url.replace(/(https|http)[^\?]+\?/, '').split('&')
  const params = {}
  // console.log('paramsArr=>', paramsArr)
  paramsArr.forEach((i, d) => {
    const a = i.split('=')
    params[a[0]] = a[1]
  })
  // console.log(data)
  return params
}

//  弱提示
export function Toast(data) {
  if (data === void 0) return
  Taro.showToast({ icon: 'none', title: data })
}

//  加载提示
export function Loading(data = '') {
  Taro.showLoading({ title: data })
}
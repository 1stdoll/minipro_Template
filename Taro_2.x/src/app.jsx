import Taro, { Component } from '@tarojs/taro'
import { Provider, connect } from '@tarojs/redux'
import UDM from '@/utils/update'
import dva from './utils/dva';
import loginHandle from '@/utils/login';
import { MiniParams, pathRouter, pageTo } from '@/utils/pathRouter';
import { getToken, replaceHtml, moment, timeRun, timeStop, pathParams, Toast, Loading } from '@/utils/utils';
import scanHandle from "@/utils/scan";
import models from './models';
import Home from './pages/home'
const env = Taro.getEnv()

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});
const store = dvaApp.getStore();

@connect(() => ({}))

class App extends Component {

  env = Taro.getEnv()

  url = ''

  scan_time = ''

  isIphoneX = false

  loadOver = false

  loginBack = false

  config = {
    pages: [
      'pages/home/index'
    ],
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于商圈定位和地址选择'
      }
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  componentDidMount(option) {
    console.log('app didmount')
    UDM()
    this.showHandle()
    const sti = Taro.getSystemInfoSync()
    const { isIphoneXSeries, model, windowWidth, windowHeight } = sti
    this.pageSize = 750 / windowWidth
    this.isIphoneX = isIphoneXSeries;
    if (typeof isIphoneXSeries === "undefined") this.isIphoneX = model.indexOf('iPhone') > -1 && !!model.match(/(X|XR|XS|11|Pro)/g)
    this.loadOver = true
  }

  componentDidHide() { }

  componentDidShow() { }

  showHandle = () => {
    Taro.canIUse('onAppShow') && Taro.onAppShow(res => { console.warn('app onShow =>', res); this.getScanData(res) })
  }

  getScanData = (params) => {   //  小程序扫码内容处理事件
    console.warn('getScanData =>', params)
    const { query = {} } = params
    const qrCode = this.env === 'ALIPAY' ? query.qrCode : decodeURIComponent(query.q)
    if (qrCode !== 'undefined' && typeof qrCode !== 'undefined' && env === 'WEAPP') {
      if (query.scancode_time === this.scan_time) return
      else this.scan_time = query.scancode_time
    }
    // console.warn('qrCode', typeof qrCode, qrCode !== 'undefined')
    qrCode !== 'undefined' && typeof qrCode !== 'undefined' && Taro.nextTick(() => scanHandle(qrCode))
  }

  //  节点查询
  selector = (key, query, back) => {
    query.selectAll(key).boundingClientRect().exec(function (res) {
      if (res) return !!back && back(res)
      else return !!back && back(null)
    });
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

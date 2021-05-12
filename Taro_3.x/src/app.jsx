import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider, connect } from 'react-redux'
import UDM from '@/utils/update'
import dva from '@/utils/dva';
import loginHandle from '@/utils/login';
import { MiniParams, pathRouter, pageTo } from '@/utils/pathRouter';
import { getToken, replaceHtml, moment, timeRun, timeStop, pathParams, Toast, Loading } from '@/utils/utils';
import scanHandle from "@/utils/scan";
import models from './models/index';
import './app.scss'
// import asyncQuery from './utils/asyncSet';

const dvaApp = dva.createApp({
  initialState: {},
  models
});
const store = dvaApp.getStore();

class App extends Component {

  globalData = {}

  isIphoneX = false
  pageSize = 1
  windowH = 0
  inlaunch = true

  env = ''

  loginHandle = () => { }       //    登录/验证 事件全局方法

  commend = {                   //    全局方法引用对象（防止单页面引用时单独封装的问题）
    MiniParams,
    pathRouter,
    pageTo,
    getToken,
    replaceHtml,
    moment,
    timeRun,
    timeStop,
    pathParams,
    Toast,
    Loading
  }

  componentDidMount() {         //  小程序生命周期      运行序号  0
    console.log('componentDidMount')
    UDM()
    Taro.eventCenter.on('pageReady', () => this.setLogin())
    this.env = Taro.getEnv()
    const sti = Taro.getSystemInfoSync()
    const { isIphoneXSeries, model, windowWidth, windowHeight } = sti
    this.pageSize = 750 / windowWidth
    this.isIphoneX = isIphoneXSeries;
    if (typeof isIphoneXSeries === "undefined") this.isIphoneX = model.indexOf('iPhone') > -1 && !!model.match(/(X|XR|XS|11|Pro)/g)
  }

  onLaunch(option) {            //  小程序生命周期      运行序号  1
    console.warn('app Launch', option)
    this.getScanData(option)
    // Taro.nextTick(() => scanHandle('https://nbtaoqqtest-benfit.nbmdtv.com/appstart'))
    // Taro.nextTick(() => scanHandle("https://park-api.nbmetro.com/smzf?deviceNum=西出&parkPotId=10001"))
  }

  componentDidShow(option) {    //  小程序生命周期      运行序号  2
    if (this.inlaunch) { this.inlaunch = false; return }
    console.warn('app Show', option)
    this.getScanData(option)
  }

  getScanData = (params) => {   //  小程序扫码内容处理事件
    const { query = {} } = params
    const qrCode = this.env === 'ALIPAY' ? query.qrCode : decodeURIComponent(query.q)
    // console.warn('qrCode', typeof qrCode, qrCode !== 'undefined')
    qrCode !== 'undefined' && typeof qrCode !== 'undefined' && Taro.nextTick(() => scanHandle(qrCode))
  }

  getWH = (back, isget) => {    //  小程序全局获取当前显示区域高度
    if (this.windowH !== 0 && !isget && !!back) back(this.windowH)
    Taro.getSystemInfo({ success: res => { this.windowH = res.windowHeight - 1; !!back && back(this.windowH) } })
  }

  setLogin() {                  //  全局登录判断事件，监听小程序加载完成以后完成方法绑定  
    // console.log('on fcn')
    this.getWH()
    this.loginHandle = loginHandle
    Taro.eventCenter.off('pageReady')
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

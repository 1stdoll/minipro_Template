import Taro from '@tarojs/taro';
import { pageTo } from "./pathRouter";
import { pathParams } from "./utils";

//  小程序关联二维码  扫码结果处理逻辑

export default function (qrcode) {
  // console.log('in scanHandle', qrcode)
  const params = pathParams(qrcode)
  // Taro.setStorage({ key: 'SCAN_DATA', data: params })
  switch (true) {
    default:
      break;
  }
}
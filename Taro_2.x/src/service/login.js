import Request from '../utils/request';
import Taro from '@tarojs/taro'
const env = Taro.getEnv()

// 获取临时TOKEN
export async function getTempTkoen(data) {
  return Request({
    url: `/base/app/user/${env === 'WEAPP' ? 'wechat' : 'alipay'}/codelogin`,
    method: 'GET',
    data,
  });
}

// 微信/支付宝注册
export async function register(data) {
  return Request({
    url: `/base/app/user/${env === 'WEAPP' ?'mini':'alipay'}Reg`,
    method: 'GET',
    data,
  });
}

// 微信/支付宝获取token
export async function Token(data) {
  return Request({
    url: `/base/app/user/${env === 'WEAPP' ?'mini':'alipay'}Login`,
    method: 'GET',
    data
  });
}

// 获取用户信息
export async function getUserInfo() {
  return Request({
    url: '/base/app/user/info',
    method: 'GET'
  });
}

// 获取注册协议
export async function getAgree() {
  return Request({
    url: '/base/app/user/agreement',
    method: 'GET'
  });
}
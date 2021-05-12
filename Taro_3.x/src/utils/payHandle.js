import Taro from '@tarojs/taro'
const env = Taro.getEnv()
// 支付方式 代码
const PayMethodType = {
  0: "支付宝支付",
  1: "微信支付",
  2: "支付宝免密支付"
}
// 获取支付方式码
export const PayMethod = (method) => PayMethodType[method]
// 根据订单是生成接口返回的交易签名发起支付请求
export function PayHandle(data, { onSuccess, onFail, onCancel, complete }) {
  switch (env) {
    case 'WEAPP':
      Taro.requestPayment({
        ...data,
        signType: data.paySignType,
        package: data.wxPackage,
        complete: pay => {
          Taro.hideLoading()
          if (complete) complete()
          if (pay.errMsg.indexOf('fail cancel') !== -1) {
            if (onCancel) onCancel()
            return;
          }
          if (pay.errMsg.indexOf('fail') !== -1) {
            if (onFail) onFail()
            return;
          }
          if (onSuccess) onSuccess()
        }
      })
      break;
    case 'ALIPAY':
      my.tradePay({
        tradeNO: data.tradeNo,
        complete(pay) {
          // console.log(pay)
          Taro.hideLoading()
          const { resultCode } = pay
          if (complete) complete()
          if (
            resultCode === '9000' ||
            resultCode === '8000' ||
            resultCode === '6004'
          ) {
            if (onSuccess) onSuccess()
          }
          if (
            resultCode === '6002' ||
            resultCode === '4000'
          ) {
            if (onFail) onFail()
          }
          if (resultCode === '6001') {
            if (onCancel) onCancel()
          }
        }
      })
      break;
    default:
      Taro.showToast({
        title: '支付方式错误'
      })
      break;
  }
}
// 支付方式 key：编号  value：支付方式名称
const payType = {
  1: '支付宝',
  2: '银联',
  3: '微信支付',
  4: '积分兑换',
  6: '活动奖品',
  7: '苏宁支付',
  8: '线下支付',
  9: '微信支付',
  10: '支付宝小程序',
}
// 根据支付方式码返回支付方式名称
export const getPayMethod = (d) => payType[d]

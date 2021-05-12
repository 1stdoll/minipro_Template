import Taro from '@tarojs/taro'
import { pageTo } from './pathRouter';
const env = Taro.getEnv()
export default function (event, back) {                       //  小程序全局登录/登录状态验证方法
  // console.warn('in loginHandle =>', event.props)
  const { dispatch, token, userInfo } = event.props

  //  用户头像和昵称设置为当前头像昵称
  const infoHandle = () => {
    let dataTemp = {}
    const save = (back) => { const data = env === 'ALIPAY' ? { ...back, avatarUrl: back.avatar, country: back.countryCode } : back; dispatch({ type: 'user/saveInfo', payload: { ...data } }) }
    const cmd = {
      WEAPP: () => save({}),
      ALIPAY: () => Taro.getSetting({ success: set => set.authSetting['userInfo'] && Taro.getOpenUserInfo({ success: data => save(JSON.parse(data.response).response) }) }),
    }
    cmd[env]()
  }

  //  获取token
  const fetchToken = (code) => {
    dispatch({
      type: 'user/Token',
      payload: {
        type: env,
        data: { code }
      },
      callback: res => {
        // console.log('fetchToken', !res || res.code == '0000' || !res.data || !res.data.token)
        if (!res || res.code !== '0000' || !res.data || !res.data.token) return !!back && back({ err: true })
        // console.warn('userInfo.userPhone = ', res.data.userInfo.userPhone)
        Taro.eventCenter.trigger('loginOver')
        if (back !== void 0) back({ [res.data.userInfo.userPhone !== "" ? 'success' : 'err']: true })
        infoHandle()
      }
    })
  }
  // console.warn('in loginHandle has UserInfo', token, userInfo)
  if (token === null) {
    switch (env) {
      case 'WEAPP': Taro.login({ success(res) { fetchToken(res.code) } }); break;
      case 'ALIPAY': my.getAuthCode({ scopes: 'auth_base', success: (res) => { fetchToken(res.authCode) } }); break;
    }
  } else if (back !== void 0) infoHandle(), back({ [userInfo.userPhone !== "" ? 'success' : 'err']: true })
}
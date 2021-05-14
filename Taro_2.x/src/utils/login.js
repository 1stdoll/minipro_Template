import Taro from '@tarojs/taro'
const env = Taro.getEnv()
export default function (event, back) {                       //  小程序全局登录/登录状态验证方法
  // console.warn('in loginHandle =>', event.props)
  const { dispatch, token, userInfo, userId } = event.props

  //  用户头像和昵称设置为当前头像昵称
  const infoHandle = () => {
    console.log('login fetchUser')
    dispatch({
      type: 'login/getUserInfo',
      callback: ires => {
        if (!ires || ires.code !== '0000' || !ires.data || ires.data.userPhone === null) return !!back && back({ err: true })
        const save = (info = {}) => {
          console.log('login over', ires)
          dispatch({ type: 'login/saveInfo', payload: { ...ires.data, ...info } });
          !!back && back({ success: true })
        }
        const cmd = {
          // WEAPP: () => Taro.getSetting({ success: set => set.authSetting['scope.userInfo'] && Taro.getUserInfo({ success: data => save(data.userInfo) }) }),
          WEAPP: () => save({}),
          ALIPAY: () => Taro.getSetting({
            success: set => set.authSetting['userInfo'] && Taro.getOpenUserInfo({
              success: data => {
                const info = JSON.parse(data.response).response;
                save({ headImg: info.avatar, userName: info.nickName })
              }
            }),
          })
        }
        cmd[env]()
      }
    })
  }

  //  获取token
  const fetchToken = (code) => {
    // console.log(code)
    // return
    dispatch({
      type: 'login/Token',
      payload: { code },
      callback: res => {
        console.log('fetchToken', !res || res.code == '0000' || !res.data || !res.data.token)
        if (!res || res.code !== '0000' || !res.data || !res.data.token) return !!back && back({ error: true })
        // console.warn('userInfo.userPhone = ', res.data.userInfo.userPhone)
        infoHandle()
      }
    })
  }
  console.warn('in loginHandle has UserInfo', { ...event.props })
  switch (true) {
    case token === null:
      const run = {
        'WEAPP': () => Taro.login({ success(res) { fetchToken( !!res && !!res.code && res.code) } }),
        'ALIPAY': () => my.getAuthCode({ scopes: 'auth_base', success: (res) => { fetchToken(res.authCode) } })
      }
      userId === null ? run[env]() : !!back && back({ error: true });
      break;
    case token !== null && userInfo === null : infoHandle(); break;
    case token !== null && typeof userInfo === 'object' && userInfo.userPhone===null : !!back && back({ error: true }); break;
    default: !!back && back({ success: true }); break;
  }
}
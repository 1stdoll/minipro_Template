import * as loginApi from '../service/login';
import Taro from '@tarojs/taro'
const env = Taro.getEnv()
export default {
  namespace: 'login',
  state: {
    tempToken: null,
    token: null,
    userId: null,
    userInfo: {},
    code: null
  },

  effects: {
    *register({ payload, callback }, { call, put }) {
      const res = yield call(loginApi.register, payload);
      const { code, data } = res
      if (code === '0000') {
        Taro.setStorageSync('token', data.token)
        yield put({
          type: 'save',
          payload: {
            token: data.token
          }
        });
      }
      if (callback) callback(res);
    },
    *Token({ payload, callback }, { call, put }) {
      const res = yield call(loginApi.Token, payload);
      const { code, data } = res
      if (code === '0000') {
        data.token !== '' && Taro.setStorageSync('token', data.token)
        yield put({
          type: 'save',
          payload: {
            token: data.token !== '' ? data.token : null,
            userId: env === 'WEAPP' ? data.openId : data.userId,
            code: payload.code
          }
        });
      }
      if (callback) callback(res);
    },
    *getUserInfo({ _, callback }, { call, put }) {
      const res = yield call(loginApi.getUserInfo);
      const { code, data } = res
      console.warn('in getUserInfo', data)
      if (code === '0000') {
        yield put({
          type: 'save',
          payload: {
            userInfo: data
          }
        });
      }
      if (callback) callback(res);
    },
    *getAgree({ _, callback }, { call }) {
      const res = yield call(loginApi.getAgree);
      if (callback) callback(res);
    },
    *getTempTkoen({ payload, callback }, { call, put }) {
      const res = yield call(loginApi.getTempTkoen, payload);
      const { code, data } = res
      if (code === '0000') {
        yield put({
          type: 'save',
          payload: {
            tempToken: data.token
          }
        });
      }
      if (callback) callback(res);
    }
  },

  reducers: {
    save(state, { payload }) {
      console.log('user save', payload)
      return { ...state, ...payload };
    },
    saveInfo(state, { payload }) {
      console.log('user saveInfo', payload)
      return { ...state, userInfo: { ...state.userInfo, ...payload } };
    }
  },

};

import * as testApi from "../service/test"
export default {
  namespace: "login",
  state: {
    count: 0
  },
  effects: {
    *test({ params, callback }, { call, put }) {
      const res = yield call(testApi.getCount, params);
      if (res.code === '0000') {
        yield put({
          type: 'save',
          payload: {
            ...res.data
          }
        });
      }
      if (callback) callback(res);
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  }
}
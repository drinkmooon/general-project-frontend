import { userAccountRegister } from './service'

const Model = {
  namespace: 'register',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const actualPayload = { ...payload, avatar: payload.avatar || {} }
      // TODO: to be removed in release version
      // eslint-disable-next-line no-console
      const response = yield call(userAccountRegister, actualPayload)
      yield put({
        type: 'registerHandle',
        payload: response,
      })
      return response
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.msg }
    },
  },
}
export default Model

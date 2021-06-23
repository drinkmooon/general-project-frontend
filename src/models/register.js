import { userAccountRegister } from '@/services/user'

const Model = {
  namespace: 'register',
  state: {
    status: undefined,
  },
  effects: {
    *submit({ payload }, { call, put }) {
      const actualPayload = { ...payload, avatar: payload.avatar || {} }
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
      return { ...state, status: payload.success }
    },
  },
}
export default Model

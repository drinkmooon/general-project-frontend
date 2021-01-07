import ApiUtil from '@/utils/ApiUtils'

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
      const response = yield call(ApiUtil.userRegister, actualPayload)
      yield put({
        type: 'registerHandle',
        payload: response,
      })
      return response
    },
  },
  reducers: {
    registerHandle(state, { payload }) {
      return { ...state, status: payload.isSuccess }
    },
  },
}
export default Model

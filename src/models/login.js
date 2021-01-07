import { stringify } from 'querystring';
import { history } from 'umi';
import { userAccountLogin, userAccountLogout } from '@/services/login';
import { getAuthority, setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { notification } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    currentUser: {},
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(userAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully

      if (response.success) {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
      else {
        notification.error({
          message: `登录失败`,
          description: `用户名或密码错误。`,
        })
      }
    },

    *logout(_, { call }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      const response = yield call(userAccountLogout)
      yield put({
        type: 'removeLoginStatus',
        payload: response,
      });
      console.log(response)
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.success) {
        setAuthority(['user']);
      }
      return { ...state, currentUser: {} }
    },
    removeLoginStatus(state, { payload }) {
      console.log(getAuthority())
      if (payload.success) {
        setAuthority(['guest']);
      }
        return { ...state, currentUser: {} }
    },
  },
};
export default Model;

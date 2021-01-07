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

    *logout(_, { call, put }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      const response = yield call(userAccountLogout)
      console.log(response)
      yield put({
        type: 'removeLoginStatus',
        payload: response,
      });
      if (window.location.pathname !== '/' && !redirect) {
        history.replace({
          pathname: '/',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      window.location.reload(true);
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      if (payload.success) {
        setAuthority(['user']);
      }
      return { ...state}
    },
    removeLoginStatus(state, { payload }) {
      if (payload.success) {
        setAuthority(['guest']);
      }
        return { ...state }
    },
  },
};
export default Model;

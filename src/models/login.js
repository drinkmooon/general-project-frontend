import { stringify } from 'querystring';
import { history } from 'umi';
import { userAccountLogin, userAccountLogout, queryCurrent } from '@/services/user';
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

      if (response.isSuccess) {
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
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *logout(_, { call, put }) {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note
      const response = yield call(userAccountLogout)
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
      if (payload.isSuccess) {
        setAuthority([payload.userInfo.role]);
        return { ...state,currentUser:{...payload.userInfo,name:payload.userInfo.username,id:payload.userInfo.id}}
      }
      return { ...state, currentUser:{}}
    },
    removeLoginStatus(state, { payload }) {
      if (payload.isSuccess) {
        setAuthority(['guest']);
      }
      return { ...state, currentUser:{} }
    },
    saveCurrentUser(state, { payload }) {
      console.log('save',payload);
      if(payload?.info){
        return { ...state, currentUser: {...payload.info,name:payload.info.username,id:payload.info.id} };
      }
        return { ...state, currentUser: {} }; 
    },
  },
};
export default Model;

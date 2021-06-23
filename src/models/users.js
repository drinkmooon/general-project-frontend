import { queryCurrent, query as queryUsers } from '@/services/user';
import { getAllUserList } from '@/services/user';

const UserModel = {
  namespace: 'users',
  state: {
    users: {},
  },
  effects: {
    *getAllUsers(_, { call, put }) {
      const response = yield call(getAllUserList);
      yield put({
        type: 'saveUsers',
        payload: response,
      });
    },
  },
  reducers: {
    saveUsers(state, {payload}) {
      const id2Name = new Map();
      const name2Id = new Map();
      payload.users.map((u) => {
        id2Name.set(u.id, u.username);
        name2Id.set(u.username, u.id);
        return 1
      });
      return { ...state, users: [id2Name,name2Id]};
    },
  },
};
export default UserModel;

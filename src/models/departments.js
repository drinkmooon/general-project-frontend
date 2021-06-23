import { queryCurrent, query as queryUsers } from '@/services/user';
import { getAllDepartments } from '@/services/department';

const UserModel = {
  namespace: 'departments',
  state: {
    departments: {},
  },
  effects: {
    *getDepartments(_, { call, put }) {
      const response = yield call(getAllDepartments);
      yield put({
        type: 'saveDepartments',
        payload: response,
      });
    },
  },
  reducers: {
    saveDepartments(state, { payload }) {
      const id2Name = new Map();
      const name2Id = new Map();
      payload.departments.map((d) => {
        id2Name.set(d.id, d.name);
        name2Id.set(d.name, d.id);
        return 1
      });
      return { ...state, departments: [id2Name, name2Id] };
    },
  },
};
export default UserModel;

import { query as queryOrders } from '@/services/order';

const UserModel = {
  namespace: 'order',
  state: {
    data: [],
    meta: {}
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryOrders);
      console.log('response', response)
      yield put({
        type: 'save',
        payload: response,
      });
    }
  },
  reducers: {
    save(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
  },
};
export default UserModel;

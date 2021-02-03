import {queryBasicProfile} from './service';

const initState = {
  process: {}
};

const Model = {
  namespace: 'profileAndbasic',
  state: initState,
  effects: {
    * fetchBasic({payload}, {call, put}) {

      console.log(payload)
      const response = yield call(queryBasicProfile, payload);

      yield put({
        type: 'save',
        payload: {
          process: response,
        },
      });
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },
};
export default Model;

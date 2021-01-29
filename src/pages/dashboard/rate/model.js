import {fakeChartData} from './service';

const initState = {
  hostData: [],
  visitData2: [],
  searchData: [],
  offlineData: [],
  offlineChartData: [],
};
const Model = {
  namespace: 'dashboardRate',
  state: initState,
  effects: {
    * fetch(_, {call, put}) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    * fetchSalesData(_, {call, put}) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },

    clear() {
      return initState;
    },
  },
};
export default Model;

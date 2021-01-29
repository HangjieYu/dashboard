import {EllipsisOutlined} from '@ant-design/icons';
import {Col, Dropdown, Menu, Row, Drawer} from 'antd';
import React, {Component, Suspense} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import {connect} from 'umi';
import styles from './style.less';

const TopSearch = React.lazy(() => import('./components/TopSearch'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));


class Rate extends Component {
  state = {
    currentTabKey: '',
    hostTabKey: '',
    rateKey: false,
  };

  reqRef = 0;

  componentDidMount() {
    const {dispatch} = this.props;
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dashboardRate/fetch',
      });
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'dashboardRate/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  };

  setRateKey = (key) => {

    this.setState({
      rateKey: key,
    });
  };

  selectHostTabKey = (row) => {

    console.log(row);
    this.setState({
      rateKey: true,
      hostTabKey: row.host
    });
  };

  render() {
    const { currentTabKey, rateKey, hostTabKey} = this.state;
    const {dashboardRate, loading} = this.props;
    const {
      hostData,
      visitData2,
      searchData,
      offlineData,
      offlineChartData,
    } = dashboardRate;

    const hostKey = hostTabKey || hostData[0] && hostData[0].id;

    const offlineDataList = offlineData[hostKey] || [];

    const activeKey = currentTabKey || (offlineDataList[0] && offlineDataList[0].id);

    const activeOfflineChartData = offlineChartData[hostKey + activeKey];

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );
    const dropdownGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <EllipsisOutlined/>
        </Dropdown>
      </span>
    );

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={null}>
            <TopSearch
              loading={loading}
              visitData2={visitData2}
              searchData={searchData}
              dropdownGroup={dropdownGroup}
              selectHostTabKey={this.selectHostTabKey}
            />
          </Suspense>
          {/*<Suspense fallback={null}>*/}
          {/*  <OfflineData*/}
          {/*    activeKey={activeKey}*/}
          {/*    loading={loading}*/}
          {/*    offlineData={offlineDataList}*/}
          {/*    offlineChartData={activeOfflineChartData}*/}
          {/*    handleTabChange={this.handleTabChange}*/}
          {/*  />*/}
          {/*</Suspense>*/}
        </React.Fragment>

        <Drawer
          height={700}
          visible={rateKey}
          onClose={() => {
            this.setRateKey(false);
          }}
          closable={true}
          transitions = {false}
          placement={'bottom'}
        >
          {rateKey && (
            <Suspense fallback={null}>
              <OfflineData
                activeKey={activeKey}
                loading={loading}
                offlineData={offlineDataList}
                offlineChartData={activeOfflineChartData}
                handleTabChange={this.handleTabChange}
              />
            </Suspense>
          )}
        </Drawer>
      </GridContent>
    );
  }
}

export default connect(({dashboardRate, loading}) => ({
  dashboardRate,
  loading: loading.effects['dashboardRate/fetch'],
}))(Rate);

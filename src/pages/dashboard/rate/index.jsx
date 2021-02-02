import {EllipsisOutlined} from '@ant-design/icons';
import {Col, Dropdown, Menu, Row, Drawer} from 'antd';
import React, {Component, Suspense} from 'react';
import {GridContent} from '@ant-design/pro-layout';
import {connect} from 'umi';
import styles from './style.less';

const CompanyListData = React.lazy(() => import('./components/CompanyListData'));
const HostListData = React.lazy(() => import('./components/HostListData'));
const OfflineData = React.lazy(() => import('./components/OfflineData'));


class Rate extends Component {
  state = {
    companyTabKey: '',
    hostTabKey: '',
    rateKey: false,
    selectType: 'host',
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

    console.log(key);

    const {selectType} = this.state;

    if (selectType === 'host') {
      this.setState({
        companyTabKey: key,
      });
    } else {
      this.setState({
        hostTabKey: key,
      });
    }
  };

  setRateKey = (key) => {

    this.setState({
      rateKey: key,
    });
  };

  selectCompanyTabKey = (row) => {

    this.setState({
      rateKey: true,
      companyTabKey: row.id,
      selectType: 'company'
    });
  };

  selectHostTabKey = (row) => {

    this.setState({
      rateKey: true,
      hostTabKey: row.id,
      selectType: 'host',
    });
  };

  render() {
    const {companyTabKey, rateKey, hostTabKey, selectType} = this.state;
    const {dashboardRate, loading} = this.props;
    const {
      hostData,
      hostTotalData,
      searchData,
      searchData2,
      offlineData,
      offlineChartData,
    } = dashboardRate;

    const hostKey = hostTabKey || hostData[0] && hostData[0].id;

    const offlineDataList = (selectType === 'host') ? (offlineData[hostKey] || []) : hostData;

    const activeKey = (selectType === 'host') ? (companyTabKey || (offlineDataList[0] && offlineDataList[0].id)) : (hostTabKey || hostData[0] && hostData[0].id);

    const activeOfflineChartData = (selectType === 'host') ? offlineChartData[hostKey + activeKey] : offlineChartData[hostKey + companyTabKey];

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
          <Row
            gutter={24}
          >
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <HostListData
                  loading={loading}
                  searchData={searchData}
                  hostTotalData={hostTotalData}
                  dropdownGroup={dropdownGroup}
                  selectHostTabKey={this.selectHostTabKey}
                />
              </Suspense>
            </Col>
            <Col xl={12} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={null}>
                <CompanyListData
                  loading={loading}
                  searchData={searchData2}
                  dropdownGroup={dropdownGroup}
                  selectHostTabKey={this.selectCompanyTabKey}
                />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>

        <Drawer
          height={700}
          visible={rateKey}
          onClose={() => {
            this.setRateKey(false);
          }}
          closable={true}
          transitions={false}
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

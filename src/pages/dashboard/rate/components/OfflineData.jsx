import { Card, Col, Row, Tabs } from 'antd';
import { FormattedMessage, formatMessage } from 'umi';
import React from 'react';
import { TimelineChart, Pie } from './Charts';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const CustomTab = ({ data, currentTabKey: currentKey }) => (
  <Row
    gutter={8}
    style={{
      width: 138,
      margin: '8px 0',
    }}
    type="flex"
  >
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle={
          <FormattedMessage
            id="dashboardandrate.rate.rate"
            defaultMessage="Rate"
          />
        }
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.id ? 'light' : undefined}
      />
    </Col>
    <Col
      span={12}
      style={{
        paddingTop: 36,
      }}
    >
      <Pie
        animate={false}
        inner={0.55}
        tooltip={false}
        margin={[0, 0, 0, 0]}
        percent={data.cvr * 100}
        height={64}
      />
    </Col>
  </Row>
);

const { TabPane } = Tabs;

const OfflineData = ({ activeKey, loading, offlineData, offlineChartData, handleTabChange }) => (
  <Card
    loading={loading}
    className={styles.offlineCard}
    bordered={false}
  >
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      {offlineData.map((shop) => (
        <TabPane tab={<CustomTab data={shop} currentTabKey={activeKey} />} key={shop.id}>
          <div
            style={{
              padding: '0 24px',
            }}
          >
            <TimelineChart
              height={400}
              data={offlineChartData}
              titleMap={{
                y1: formatMessage({
                  id: 'dashboardandrate.rate.workflowproducer',
                }),
                y2: formatMessage({
                  id: 'dashboardandrate.rate.workflowconsumer',
                }),
                y3: formatMessage({
                  id: 'dashboardandrate.rate.worksheetproducer',
                }),
              }}
            />
          </div>
        </TabPane>
      ))}
    </Tabs>
  </Card>
);

export default OfflineData;

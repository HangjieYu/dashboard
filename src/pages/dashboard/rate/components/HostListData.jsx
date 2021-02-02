import {InfoCircleOutlined} from '@ant-design/icons';
import {Card, Col, Row, Table, Tooltip} from 'antd';
import {FormattedMessage} from 'umi';
import React from 'react';
import numeral from 'numeral';
import NumberInfo from './NumberInfo';
import styles from '../style.less';

const columns = [
  {
    title: (
      <FormattedMessage
        id="dashboardandrate.rate.host.table.id"
        defaultMessage="id"
      />
    ),
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: (
      <FormattedMessage
        id="dashboardandrate.rate.host.table.name"
        defaultMessage="name"
      />
    ),
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: <FormattedMessage id="dashboardandrate.rate.host.table.producer" defaultMessage="producer"/>,
    dataIndex: 'producer',
    key: 'producer',
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandrate.rate.host.table.consumer" defaultMessage="consumer"/>,
    dataIndex: 'consumer',
    key: 'consumer',
    className: styles.alignRight,
  },
  {
    title: (
      <FormattedMessage
        id="dashboardandrate.rate.host.table.rate"
        defaultMessage="rate"
      />
    ),
    dataIndex: 'rate',
    key: 'rate',
  },
];

const TopSearch =
  ({
     loading,
     hostTotalData,
     searchData,
     dropdownGroup,
     selectHostTabKey,
   }) => (
    <Card
      loading={loading}
      bordered={false}
      title={
        <FormattedMessage
          id="dashboardandrate.rate.host.list-name"
          defaultMessage="list name"
        />
      }
      extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
      <Row gutter={68} type="flex">
        <Col
          sm={48}
          xs={48}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
              <FormattedMessage
                id="dashboardandrate.rate.host.list-total"
                defaultMessage="total"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandrate.rate.host.list-rate"
                    defaultMessage="rate"
                  />
                }
              >
                <InfoCircleOutlined
                  style={{
                    marginLeft: 8,
                  }}
                />
              </Tooltip>
            </span>
            }
            gap={8}
            total={numeral(hostTotalData.producer).format('0,0')}
            status={hostTotalData.rate > 5 ? 'up' : 'down'}
            subTotal={hostTotalData.rate}
          />
        </Col>
      </Row>
      <Table
        rowKey={(record) => record.index}
        size="small"
        columns={columns}
        dataSource={searchData}
        pagination={{
          style: {
            marginBottom: 0,
          },
          pageSize: 10,
        }}
        onRow={record => {
          return {
            onClick: event => {
              selectHostTabKey(record)
            }, // 点击行
            onDoubleClick: event => {
            },
            onContextMenu: event => {
            },
            onMouseEnter: event => {
            }, // 鼠标移入行
            onMouseLeave: event => {
            },
          };
        }}
      />
    </Card>
  );

export default TopSearch;

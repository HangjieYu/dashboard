import {Card, Col, Row, Table, Tooltip} from 'antd';
import {FormattedMessage} from 'umi';
import React from 'react';
import styles from '../style.less';

const columns = [
  {
    title: (
      <FormattedMessage
        id="dashboardandrate.rate.company.table.id"
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
        id="dashboardandrate.rate.company.table.name"
        defaultMessage="name"
      />
    ),
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: <FormattedMessage id="dashboardandrate.rate.company.table.producer" defaultMessage="producer"/>,
    dataIndex: 'producer',
    key: 'producer',
    className: styles.alignRight,
  },
  {
    title: <FormattedMessage id="dashboardandrate.rate.company.table.consumer" defaultMessage="consumer"/>,
    dataIndex: 'consumer',
    key: 'consumer',
    className: styles.alignRight,
  },
  {
    title: (
      <FormattedMessage
        id="dashboardandrate.rate.company.table.rate"
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
     searchData,
     dropdownGroup,
     selectHostTabKey,
   }) => (
    <Card
      loading={loading}
      bordered={false}
      title={
        <FormattedMessage
          id="dashboardandrate.rate.company.list-name"
          defaultMessage="list name"
        />
      }
      extra={dropdownGroup}
      style={{
        height: '100%',
      }}
    >
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

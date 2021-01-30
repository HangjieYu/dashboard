import {InfoCircleOutlined} from '@ant-design/icons';
import {Card, Col, Row, Table, Tooltip} from 'antd';
import {FormattedMessage} from 'umi';
import React from 'react';
import numeral from 'numeral';
import {MiniArea} from './Charts';
import NumberInfo from './NumberInfo';
import Trend from './Trend';
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
    title: <FormattedMessage id="dashboardandrate.rate.company.table.count" defaultMessage="count"/>,
    dataIndex: 'count',
    key: 'count',
    sorter: (a, b) => a.count - b.count,
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
    sorter: (a, b) => a.range - b.range,
    render: (text, record) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
];

const TopSearch =
  ({
     loading,
     visitData2,
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
      <Row gutter={68} type="flex">
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
              <FormattedMessage
                id="dashboardandrate.rate.company.list-rate"
                defaultMessage="rate"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandrate.rate.company.list-count"
                    defaultMessage="count"
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
            total={numeral(12321).format('0,0')}
            status="up"
            subTotal={17.1}
          />
          <MiniArea line height={45} data={visitData2}/>
        </Col>
        <Col
          sm={12}
          xs={24}
          style={{
            marginBottom: 24,
          }}
        >
          <NumberInfo
            subTitle={
              <span>
              <FormattedMessage
                id="dashboardandrate.rate.company.list-rate"
                defaultMessage="rate"
              />
              <Tooltip
                title={
                  <FormattedMessage
                    id="dashboardandrate.rate.company.list-count"
                    defaultMessage="count"
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
            total={2.7}
            status="down"
            subTotal={26.2}
            gap={8}
          />
          <MiniArea line height={45} data={visitData2}/>
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

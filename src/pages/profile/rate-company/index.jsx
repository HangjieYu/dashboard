import {Badge, Card, Descriptions, Divider, Table, Menu, Dropdown, Space} from 'antd';
import React, {Component} from 'react';
import {PageContainer, PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, router} from 'umi';

import { DownOutlined } from '@ant-design/icons';

class RateCompany extends Component {
  componentDidMount() {
    const {dispatch, location} = this.props;
    const {query} = location;
    const {id} = query;

    if (id) {
      dispatch({
        type: 'rateCompany/fetchBasic',
        payload: {'id': id},
      });
    }
  }

  render() {
    const {rateCompany, loading} = this.props;
    const {process} = rateCompany;

    const menu = (
      <Menu>
        <Menu.Item>Action 1</Menu.Item>
        <Menu.Item>Action 2</Menu.Item>
      </Menu>
    );

    const columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Platform', dataIndex: 'platform', key: 'platform' },
      { title: 'Version', dataIndex: 'version', key: 'version' },
      { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      { title: 'Creator', dataIndex: 'creator', key: 'creator' },
      { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
      { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
      });
    }

    const expandedRowRender = () => {
      const columns = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
          title: 'Status',
          key: 'state',
          render: () => (
            <span>
            <Badge status="success" />
            Finished
          </span>
          ),
        },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
          title: 'Action',
          dataIndex: 'operation',
          key: 'operation',
          render: () => (
            <Space size="middle">
              <a>Pause</a>
              <a>Stop</a>
              <Dropdown overlay={menu}>
                <a>
                  More <DownOutlined />
                </a>
              </Dropdown>
            </Space>
          ),
        },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: '2014-12-24 23:12:00',
          name: 'This is production name',
          upgradeNum: 'Upgraded: 56',
        });
      }
      return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    return (
      <PageContainer>
        <Card bordered={false} loading={loading}>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            expandable={{ expandedRowRender }}
            dataSource={data}
          />
        </Card>
      </PageContainer>
    );
  }
}

export default connect(({rateCompany, loading}) => ({
  rateCompany,
  loading: loading.effects['rateCompany/fetchBasic'],
}))(RateCompany);

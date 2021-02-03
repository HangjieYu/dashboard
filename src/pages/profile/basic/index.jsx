import {Badge, Card, Descriptions, Divider, Table} from 'antd';
import React, {Component} from 'react';
import {PageContainer, PageHeaderWrapper} from '@ant-design/pro-layout';
import {connect, router} from 'umi';

import ReactJson from 'react-json-view'

class Basic extends Component {
  componentDidMount() {
    const {dispatch, location} = this.props;
    const {query} = location;
    const {id} = query;
    dispatch({
      type: 'profileAndbasic/fetchBasic',
      payload: {'id': id},
    });
  }

  render() {
    const {profileAndbasic, loading} = this.props;
    const {process} = profileAndbasic;

    return (
      <PageContainer>
        <Card bordered={false} loading={loading}>
          <ReactJson src={process}/>
        </Card>
      </PageContainer>
    );
  }
}

export default connect(({profileAndbasic, loading}) => ({
  profileAndbasic,
  loading: loading.effects['profileAndbasic/fetchBasic'],
}))(Basic);

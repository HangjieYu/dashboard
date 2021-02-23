import {Button, Divider, message, Input, Drawer} from 'antd';
import React, {useState, useRef} from 'react';
import {PageContainer, FooterToolbar} from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import {queryRule, addRule, removeRule} from './service';

import {Link} from 'umi';

/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({...fields});
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: '流程id',
      dataIndex: 'processId',
      tip: '流程id是唯一的 key',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '流程id为必填项',
          },
        ],
      },
      render: (dom) => {
        return <Link to={{
          pathname: '/profile/basic',
          query: {
            id: dom,
          }
        }}>{dom}</Link>;
      },
    },
    {
      title: '流程名',
      dataIndex: 'processName',
      valueType: 'textarea',
      hideInForm: true,
      search: false,
    },
    {
      title: '网络id',
      dataIndex: 'companyId',
      valueType: 'textarea',
      hideInForm: true,
      search: true,
    },
    {
      title: '总计',
      dataIndex: 'count',
      sorter: true,
      hideInForm: true,
      search: false,
      renderText: (val) => `${val}`,
    },
    {
      title: '平均耗时',
      dataIndex: 'avg',
      sorter: true,
      hideInForm: true,
      search: false,
      renderText: (val) => `${val}`,
    },
    {
      title: '最大耗时',
      dataIndex: 'max',
      sorter: true,
      hideInForm: true,
      search: false,
      renderText: (val) => `${val}`,
    },
  ];
  return (
    <PageContainer>
      <ProTable
        toolBarRender={false}
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={(params, sorter, filter) => queryRule({...params, sorter, filter})}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;

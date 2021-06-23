import React, { useState, useEffect } from 'react';
import { getAllDepartments, createDepartment } from '@/services/department';
import { Input, Button, Modal, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import logo from '@/../public/favicon.png';
import styles from './styles.less';
import { getAuthority } from '@/utils/authority';

const { Item } = Form;
export default function () {
  const [data, setData] = useState([]);
  const [modalVisable, setMV] = useState(false);
  const columns = [
    {
      title: '学院ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '院系名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '院系描述',
      dataIndex: 'desciption',
      key: 'desciption',
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
    },
  ];
  useEffect((_) => {
    getAllDepartments().then((res) => {
      setData(res.departments);
    });
  }, []);
  const createDept = (newDept) => {
    createDepartment(newDept).then((res) => {
      if (res?.data.isSuccess) {
        setData((old) => [...old, res.data.department]);
      }
    });
  };
  return (
    <>
      <div>
        <ProTable
          className={data?.length === 0 ? styles.displaynone : styles.table}
          dataSource={data}
          columns={columns}
          options={false}
          search={false}
          title={() => (
            <>
              <h1 style={{float:'left'}}>院系一览</h1>
              <Button
                style={{float:'right'}}
                type="primary"
                disabled={getAuthority()[0] === 'Member'}
                onClick={() => {
                  setMV(true);
                }}
              >
                <PlusOutlined />
                新建院系
              </Button>
            </>
          )}
        />
      </div>
      <Modal
        title="新建院系"
        visible={modalVisable}
        onOk={() => setMV(false)}
        footer={null}
        onCancel={() => {
          setMV(false);
        }}
      >
        <Form onFinish={createDept}>
          <Item name="name">
            <Input placeholder="输入院系名"></Input>
          </Item>
          <Item name="description">
            <Input placeholder="输入院系描述"></Input>
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              新建！
            </Button>
          </Item>
        </Form>
      </Modal>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { history, connect } from 'umi';
import { Table, Modal } from 'antd';
import { getPaperList } from '@/services/paper';
import { addDownloadCount } from '@/services/download';

export default connect(({ login }) => ({ currentUser: login.currentUser }))(function ({
  currentUser,
}) {
  const showModal = (_) => {
    Modal.warning({
      title: '您尚未登录',
      content: '下载请先登录！',
      onOk() {
        history.push('/user');
      },
    });
  };
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '指导教师',
      dataIndex: 'instructorId',
      key: 'instructorId',
    },
    {
      title: '作者',
      dataIndex: 'writerId',
      key: 'writerId',
    },
    {
      title: '摘要',
      dataIndex: 'digest',
      key: 'digest',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '学院',
      dataIndex: 'deptId',
      key: 'deptId',
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: '',
      render: (text, record) => (
        <a
          target="_blank"
          onClick={() => {
            if (currentUser) {
              addDownloadCount({ UserId: currentUser.id, PapperId: record.id });
            } else {
              showModal();
            }
          }}
          href={record.url}
          rel="noreferrer"
        >
          下载
        </a>
      ),
    },
  ];

  const [data, setData] = useState([]);

  useEffect((_) => {
    getPaperList().then((res) => {
      if (res?.isSuccess) {
        setData(res.pappers.map((p) => ({ ...p, key: p.id })));
      }
    });
  }, []);
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        // expandable={{
        //   expandedRowRender: (record) => (
        //     <embed src={record.url} frameBorder="0" width="100%" height="200" />
        //   ),
        //   rowExpandable: (record) => record.id !== 1,
        // }}
      />
    </>
  );
});

import React, { useState, useEffect } from 'react';
import { history, connect } from 'umi';
import { searchPaper } from '@/services/paper';
import { addDownloadCount } from '@/services/download';
import { Input, Table, Modal } from 'antd';
import logo from '@/../public/favicon.png';
import styles from './styles.less';

const { Search } = Input;
export default connect(({ login, users, departments }) => ({
  currentUser: login.currentUser,
  users: users.users,
  departments: departments.departments,
}))(function ({ currentUser, users, departments, dispatch }) {
  const [data, setData] = useState([]);

  useEffect((_) => {
    dispatch({
      type: 'users/getAllUsers',
    });
    dispatch({
      type: 'departments/getDepartments',
    });
  }, []);

  const showModal = (_) => {
    Modal.warning({
      title: '您尚未登录',
      content: '下载请先登录！',
      okText: '去登录',
      onOk() {
        history.push('/user');
      },
    });
  };

  const unique = (arr) => {
    const set = new Set();
    return arr.filter((a) => {
      if(set.has(a.value)){
        return false
      }
      set.add(a.value)
      return true
    });
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '标题',
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
      filters: unique(
        data?.map((d,i) => ({ key:i,text: users[0]?.get(d.writerId), value: d.writerId })),
      ),
      onFilter: (value, record) => record.writerId === value,
      render: (text) => users[0]?.get(text),
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
      filters: unique(data.map((d,i) => ({key:i, text: departments[0]?.get(d.deptId), value: d.deptId }))),
      onFilter: (value, record) => record.deptId === value,
      render: (text) => departments[0]?.get(text),
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
          target={currentUser.id?"_blank":'_self'}
          onClick={() => {
            if (currentUser.id) {
              addDownloadCount({ UserId: currentUser.id, PapperId: record.id });
            } else {
              showModal();
            }
          }}
          href={currentUser.id?record.url:'javascript:;'}
          rel="noreferrer"
        >
          下载
        </a>
      ),
    },
  ];

  const search = (keyword) => {
    if (!keyword) return;
    searchPaper(keyword).then((res) => {
      setData(res.pappers);
    });
  };

  return (
    <>
      <div className={data?.length === 0 ? styles.searchWrap : styles.searchTop}>
        <img src={logo} alt="logo" />
        <div className={styles.searchLine}>
          <Search
            size={data?.length === 0 ? 'large' : 'middle'}
            onSearch={(v) => {
              search(v);
            }}
          />
        </div>
      </div>
      <div>
        <Table
          className={data?.length === 0 ? styles.displaynone : styles.table}
          dataSource={data}
          columns={columns} // expandable={{
          //   expandedRowRender: (record) => (
          //     <embed src={record.url} frameBorder="0" width="100%" height="200" />
          //   ),
          //   rowExpandable: (record) => record.id !== 1,
          // }}
        />
      </div>
    </>
  );
});

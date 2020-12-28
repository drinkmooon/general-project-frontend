import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryRule, getAllUser, getSalesAnalysisByUser, updateRule, addRule, removeRule } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis } from 'bizcharts';

const UserStatistics = () => {


  const [dataList, setDataList] = useState([]);

  useEffect(
    () => {
      getAllUser().then((res) => {
        setDataList(res.data);
      })
    }, []);
  
  const [dailyData, setDailyData] = useState([
    { date: '12-21', 购物金额: 38 },
    { date: '12-22', 购物金额: 48 },
    { date: '12-23', 购物金额: 28 },
    { date: '12-24', 购物金额: 8 },
    { date: '12-25', 购物金额: 8 },
    { date: '12-26', 购物金额: 108 },
    { date: '12-27', 购物金额: 38 },
  ]);


  const showSalesAnalysis = (userId) => {
    getSalesAnalysisByUser(userId).then((res) => {
      console.log(res);
      let newDailyData = [];
      const curDate = new Date();
      for (let i = 0; i < res.data.length; i++) {
        let historyDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * i);
        let month = historyDate.getMonth() + 1;
        let date = historyDate.getDate();
        newDailyData.push({
          date: month + '-' + date,
          购物金额: res.data[i],
        })
      }
      setDailyData(newDailyData);
    })
  }

  const columns = [
    {
      title: "用户编号",
      dataIndex: 'id',
    },
    {
      title: "用户名",
      dataIndex: 'name',
      valueType: 'textarea',
      filters: dataList ? dataList.map((data) => {
        return {
          text: data.name,
          value: data.name
        }
      }
      ) : [{
        text: 'fuck',
        value: 'fuck',
      }],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      render: (text) => <a onClick={() => { showSalesAnalysis(text) }}>{text}</a>
    },
    {
      title: "电话",
      dataIndex: 'phone',
      sorter: true,
      hideInForm: true,
    },
  ];

  return (
    <PageContainer>
      <div className="general-statistics-wrapper">
        <Row gutter={16}>
          <Col span={24}>
            <Card title="购物金额" style={{ width: '100%' }}>
              <Chart
                padding={[10, 20, 50, 50]}
                autoFit
                height={300}
                data={dailyData}
                scale={{ 购物金额: { min: 0 } }}
              >
                <Line position="date*购物金额" />
                <Point position="date*购物金额" />
                <Tooltip showCrosshairs triggerOn='hover' />
              </Chart>
            </Card>
          </Col>
        </Row>
      </div>
      <Divider />
      <Table
        dataSource={dataList}
        columns={columns}
      />
      {/* <Modal 
          visible={isModalVisable}
          onOk = {()=>{setIsModalVisable(false)}}
        >
        <Table 
          columns = {orderColumns}
          dataSource = {orderData}/>
      </Modal> */}
      {/* <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.generalSearchTable.title',
          defaultMessage: '用户列表',
        })}
        actionRef={actionRef}
        rowKey='name'
        search={false}
        request={(params, sorter, filter) => {
          return Promise.resolve({
            data: dataList,
            success: true,
          })
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      /> */}
    </PageContainer>
  );
};

export default UserStatistics;
import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryRule, getAllUser, getSalesAnalysisByUser,updateRule, addRule, removeRule } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis } from 'bizcharts';

const UserStatistics = () => {
  const [selectedRowsState, setSelectedRows] = useState([]);

  
  const [dataList, setDataList] = useState([]);

  const [orderData,setOrderData] = useState([]);
  const [isModalVisable,setIsModalVisable] = useState(false);
  useEffect(
    () => {
      getAllUser().then((res) => {
        console.log(res.data);
        setDataList(res.data);
      })
    }, []);

    const showSalesAnalysis = (userId) =>{
      getSalesAnalysisByUser(userId).then((res)=>{
        console.log(res);
        setOrderData(res.data);
        setIsModalVisable(true);
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
      filters: dataList ? dataList.map((data) =>
      {
        return {
          text: data.name,
          value: data.name
        }
      }
      ) : [        {
        text:'fuck',
        value:'fuck',
      }],
      render:(text)=><a onClick = {()=>{showSalesAnalysis(text)}}>{text}</a>
    },
    {
      title: "电话",
      dataIndex: 'phone',
      sorter: true,
      hideInForm: true,
    },
  ];

  const dailyData = [
    { date: '12-21', 销售额: 38 },
    { date: '12-22', 销售额: 48 },
    { date: '12-23', 销售额: 28 },
    { date: '12-24', 销售额: 8 },
    { date: '12-25', 销售额: 8 },
    { date: '12-26', 销售额: 108 },
    { date: '12-27', 销售额: 38 },
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
                scale={{ 销售额: { min: 0 } }}
              >
                <Line position="date*销售额" />
                <Point position="date*销售额" />
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
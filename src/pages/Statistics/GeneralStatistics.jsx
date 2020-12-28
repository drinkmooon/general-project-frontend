import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryRule, getAllOrder, getAllItems, updateRule, addRule, removeRule, getAllOrders, getBestCustomer, getSalesAnalysisByItem, getSalesAnalysis, getTopSellingItem } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis, useView } from 'bizcharts';

const GeneralStatistics = () => {

  const [dataList, setDataList] = useState([]);

  const [starData, setStarData] = useState([]);

  const [dailyData, setDailyData] = useState(
    [
      { date: '12-21', 销售额: 38 },
      { date: '12-22', 销售额: 48 },
      { date: '12-23', 销售额: 28 },
      { date: '12-24', 销售额: 8 },
      { date: '12-25', 销售额: 8 },
      { date: '12-26', 销售额: 108 },
      { date: '12-27', 销售额: 38 },
    ]);

  useEffect(() => {
    getSalesAnalysis().then((res) => {
      if (!res.data) return;
      let newDailyData = [];
      const curDate = new Date();
      for (let i = res.data.length - 1; i >= 0 ; i--) {
        let historyDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * i);
        let month = historyDate.getMonth() + 1;
        let date = historyDate.getDate();
        newDailyData.push({
          date: month + '-' + date,
          销售额: res.data[i],
        })
      }
      setDailyData(newDailyData);
    })
  }, []);

  useEffect(
    () => {
      getTopSellingItem().then((res) => {
        if (!res.data) return;
        let newStarData = [];
        for (let i = 0; i < res.data.length; i++) {
          newStarData.push({
            source: '商品 ' + res.data[i].name,
            金额: res.data[i].total,
          })
        }
        getBestCustomer().then((res) => {
          if (!res.data) return;
          for (let i = 0; i < res.data.length; i++) {
            newStarData.push({
              source: '用户 ' + res.data[i].name,
              金额: res.data[i].total,
            })
          }
          console.log(newStarData);
          setStarData(
            newStarData
          )
        })
      })
    }, []
  )

  useEffect(
    () => {
      getAllOrder().then((res) => {
        setDataList(res.data);
      })
    }, []
  );

  const columns = [
    {
      title: "订单编号",
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "用户ID",
      dataIndex: 'userId',
      filters: dataList ? Array.from(new Set(dataList.map((data) => {
        return data.userId
      }
      ))).map((data)=>{       
         return {
          text: data,
          value: data
        }}) : [{
        text: 'placeholder',
        value: 'placeholder',
      }],
      onFilter: (value, record) => {
        return record.userId === value},
    },
    {
      title: "商品Id",
      dataIndex: 'itemId',
    },
    {
      title: "订购数量",
      dataIndex: 'count',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "总金额",
      dataIndex: "payment",
      sorter: (a, b) => a.payment - b.payment,
      render: (val) =>
        `${val}${' 元 '}`,
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      sorter: (a, b) => {
        return (new Date(a.orderTime) > new Date(b.orderTime)) ? 1 : -1
      },
    },
    {
      title: "备注",
      dataIndex: 'description',
      valueType: 'textarea',
      render: (text) => { if (!text) { return '-' } }
    },
  ];



  return (
    <PageContainer>
      <div className="general-statistics-wrapper">
        <Row gutter={16}>
          <Col span={12}>
            <Card title="销售之星" style={{ width: '100%' }}>
              <Chart height={300} autoFit data={starData} >
                <Interval position="source*金额" />
              </Chart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="总体销售额" style={{ width: '100%' }}>
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
          defaultMessage: '订单列表',
        })}
        actionRef={actionRef}
        rowKey='name'
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

export default GeneralStatistics;
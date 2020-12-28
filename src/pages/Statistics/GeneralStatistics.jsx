import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryRule, getAllOrder, getAllItems, updateRule, addRule, removeRule, getAllOrders } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis } from 'bizcharts';

const GeneralStatistics = () => {
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const [dataList, setDataList] = useState([]);

  useEffect(
    () => {
      getAllOrder().then((res) => {
        console.log(res.data);
        setDataList(res.data);
      })
    }, []);
  const columns = [
    {
      title: "订单编号",
      dataIndex: 'id',
    },
    {
      title: "用户ID",
      dataIndex: 'userId',
      filters: dataList ? dataList.map((data) => {
        return {
          text: data.userId,
          value: data.userId
        }
      }
      ) : [{
        text: 'fuck',
        value: 'fuck',
      }],
    },
    {
      title: "总金额",
      dataIndex: "payment",
      sorter: true,
      renderText: (val) =>
        `${val}${' 元 '}`,
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      sorter: true,
    },
    {
      title: "备注",
      dataIndex: 'description',
      valueType: 'textarea',
    },
  ];

  const starData = [
    { source: '最高消费用户', 金额: 38 },
    { source: '最高销售额商品', 金额: 52 },
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
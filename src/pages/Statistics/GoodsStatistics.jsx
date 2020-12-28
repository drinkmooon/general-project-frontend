import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryRule, getAllItems, updateRule, addRule, removeRule } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis } from 'bizcharts';

const GoodsStatistics = () => {
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);

  const [dataList, setDataList] = useState([]);
  const intl = useIntl();
  const columns = [
    {
      title:'商品ID',
      dataIndex:'id',
    },
    {
      title: "商品名称",
      dataIndex: 'name',
      filters:
      dataList?dataList.map((data)=>{return {
        text:data.name,
        value:data.name,
      }}):
      [
        {
          text:'fuck',
          value:'fuck',
        }
      ]
      // filters:true,
    },
    {
      title: "商品描述",
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: "价格",
      dataIndex: 'price',
      sorter: true,
      hideInForm: true,
      renderText: (val) =>
        `${val}${' 元 '}`,
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

  const chosenGoodsName = "商品一号"

  useEffect(
    () => {
      getAllItems().then((res) => {
        setDataList(res.data);
      })
    }, []);

  return (
    <PageContainer>
      <div className="general-statistics-wrapper">
        <Row gutter={16}>
          <Col span={24}>
            <Card title={chosenGoodsName} style={{ width: '100%' }}>
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
        dataSource = {dataList}
        columns = {columns}
      />
      {/* <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.generalSearchTable.title',
          defaultMessage: '商品列表',
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

export default GoodsStatistics;
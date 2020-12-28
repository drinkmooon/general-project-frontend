import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { getAllItems,getSalesAnalysisByItem, updateRule, addRule, removeRule } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis } from 'bizcharts';

const GoodsStatistics = () => {

  
  const [dataList, setDataList] = useState([]);
  const [ chosenGoodsName,setChosenGoodsName] = useState("请选择商品");
  useEffect(
    () => {
      getAllItems().then((res) => {
        setDataList(res.data);
      })
    }, []);

  const [dailyData, setDailyData] = useState([]);


  const showSalesAnalysis = (itemId,text) => {
    getSalesAnalysisByItem(itemId).then((res) => {
      if(!res.data) return;
      let newDailyData = [];
      const curDate = new Date();
      for (let i = res.data.length-1; i >= 0 ; i--) {
        let historyDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * i);
        let month = historyDate.getMonth() + 1;
        let date = historyDate.getDate();
        newDailyData.push({
          date: month + '-' + date,
          销售额: res.data[i],
        })
      }
      setChosenGoodsName(text);
      setDailyData(newDailyData);
    })
  }

  const columns = [
    {
      title:'商品ID',
      dataIndex:'id',
      sorter:(a,b)=>a.id-b.id,
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
          text:'placeholder',
          value:'placeholder',
        }
      ],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      render: (text,record) => <a onClick={() => { showSalesAnalysis(record.id,text) }}>{text}</a>
    },

    {
      title: "商品描述",
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: "价格",
      dataIndex: 'price',
      sorter: (a,b)=>a.price-b.price,
      hideInForm: true,
      render: (val) =>
        `${val}${' 元 '}`,
    },
  ];




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
    </PageContainer>
  );
};

export default GoodsStatistics;
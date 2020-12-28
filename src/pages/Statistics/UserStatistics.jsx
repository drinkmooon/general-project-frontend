import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table, Modal } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule, getAllUser, getSalesAnalysisByUser, updateRule, addRule, removeRule } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis } from 'bizcharts';

const UserStatistics = () => {


  const [dataList, setDataList] = useState([]);
  const [chosenUserName,setChosenUserName] = useState("请选择用户");

  useEffect(
    () => {
      getAllUser().then((res) => {
        setDataList(res.data);
      })
    }, []);
  
  const [dailyData, setDailyData] = useState([]);


  const showSalesAnalysis = (userId, text) => {
    getSalesAnalysisByUser(userId).then((res) => {
      let newDailyData = [];
      const curDate = new Date();
      for (let i = res.data.length - 1; i >= 0 ; i--) {
        let historyDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000 * i);
        let month = historyDate.getMonth() + 1;
        let date = historyDate.getDate();
        newDailyData.push({
          date: month + '-' + date,
          购物金额: res.data[i],
        })
      }
      setChosenUserName(text);
      setDailyData(newDailyData);
    })
  }

  const columns = [
    {
      title: "用户编号",
      dataIndex: 'id',
      sorter:(a,b)=>a.id-b.id,
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
        text: 'placeholder',
        value: 'placeholder',
      }],
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      render: (text,record) => <a onClick={() => { showSalesAnalysis(record.id,text) }}>{text}</a>
    },
    {
      title: "电话",
      dataIndex: 'phone',
      hideInForm: true,
    },
  ];

  return (
    <PageContainer>
      <div className="general-statistics-wrapper">
        <Row gutter={16}>
          <Col span={24}>
            <Card title={chosenUserName} style={{ width: '100%' }}>
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
    </PageContainer>
  );
};

export default UserStatistics;
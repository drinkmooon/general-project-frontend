import { Button, message, Select, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { queryRule, getAllOrder, getAllItems, updateRule, addRule, removeRule, getAllOrders, getBestCustomer, getSalesAnalysisByItem, getSalesAnalysis, getTopSellingItem } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis, useView } from 'bizcharts';

import request from '@/utils/request';

const GeneralStatistics = () => {

    const [dataList, setDataList] = useState([]);

    const [database, setDatabase] = useState('mysql');
    const [starData, setStarData] = useState(
        [
            {
                name: 'test',
                count: 15,
            },
            {
                name: 'test/12',
                count: 123,
            },            
            {
                name: 'test3',
                count: 1234,
            }
        ]);

    const [keyUrl, setkeyUrl] = useState('');
    const [dailyData, setDailyData] = useState([]);

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
            ))).map((data) => {
                return {
                    text: data,
                    value: data
                }
            }) : [{
                text: 'placeholder',
                value: 'placeholder',
            }],
            onFilter: (value, record) => {
                return record.userId === value
            },
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


    const getWithLimit = async (param) => {
        return request(database + param + '?limit=5');
    }
    //analysisByString处理 按Label/Actor/Director/Cooperate
    const analysisByString = (param) => {
        getWithLimit(param).then((res) => {

            setStarData(res.data.map((da) => {
                return {
                    name: da.name,
                    count: da.count,
                }
            }));
        })

    }
    //analysisByNum 处理 按Score/emotionScore统计
    const analysisByNum = param => {
        getWithLimit(param).then((res) => {
            setStarData(res.data.map((da) => {
                return {
                    score: da.score / 100,
                    count: da.count,
                }
            }));
        })
    }


    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <Row gutter={10}>
                    <Col span={8}>{selector()}</Col>
                </Row>
            </div>
            <Divider />
            <Chart height={300} autoFit data={starData} >
          
                <Interval position="name*count" />
            </Chart>

        </PageContainer>
    );
};
const selector = () => {
    const handleChange = value => {
        analysisByString(value);
    };

    return (
        <>
            <Select defaultValue="Label" style={{ width: 120 }} onChange={handleChange}>
                <Option value="label">Label</Option>
                <Option value="actor">Lucy</Option>
                <Option value="director">Director</Option>
            </Select>
        </>
    );
};
const { Option } = Select;




export default GeneralStatistics;
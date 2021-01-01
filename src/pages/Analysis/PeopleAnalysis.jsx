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
    const [relationType,setRelationType] = useState('a-a');//a-a/a-d/d-d/d-a


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
        
    };

    return (
        <>
            <Select defaultValue="a-a" style={{ width: 120 }} onChange={handleChange}>
                <Option value="a-a">actor-actor</Option>
                <Option value="a-d">actor-director</Option>
                <Option value="d-d">Director-director</Option>
                <Option value="d-a">Director-actor</Option>
            </Select>
        </>
    );
};
const { Option } = Select;

export default GeneralStatistics;
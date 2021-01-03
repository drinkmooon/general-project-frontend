import {  Select, Col, Row, Divider } from 'antd';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Chart, Interval } from 'bizcharts';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
import Timer from '@/components/Timer/Timer';
const { Option } = Select;

const GeneralStatistics = () => {

    const [database, setDatabase] = useState('mysql');
    const [time,setTime] = useState(0);
    const [starData, setStarData] = useState([]);

    const getWithLimit = async (param) => {
        console.log(database + param + '?limit=5');
        return request('/api/v1/'+ database +'/analysis/'+ param + '?limit=5');
    }
    //analysisByString label/Actor/Director/Cooperate
    const analysisByString = (param) => {
        getWithLimit(param).then((res) => {
            setTime(res.time);
            setStarData(res.data.map((da) => {
                return {
                    name: da.name,
                    count: da.count,
                }
            }));
        })
    }

    const selector = () => {
        const handleChange = value => {
            analysisByString(value);
        };

        return (
            <Select defaultValue="Label" style={{ width: 120 }} onChange={handleChange}>
                <Option value="label">Label</Option>
                <Option value="actor">Actor</Option>
                <Option value="director">Director</Option>
            </Select>
        );
    };

    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <Timer time={time}/>
                <DatabaseSelector changeDatabase={value => { setStarData([]); setDatabase(value) }} />
                <Divider />
                <Row gutter={10}>
                    <Col span={8}>{selector()}</Col>
                </Row>
            </div>
            <Divider />
            <Chart height={300} autoFit data={starData} placeholder={'加载中'} >

                <Interval position="name*count" />
            </Chart>

        </PageContainer>
    );
};


export default GeneralStatistics;

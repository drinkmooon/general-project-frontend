import { Button, Select, Input, Col, Row, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval } from 'bizcharts';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
import Timer from '@/components/Timer/Timer';
const { Option } = Select;
const GeneralStatistics = () => {

    const [database, setDatabase] = useState('mysql');
    const [time, setTime] = useState(0);
    const [starData, setStarData] = useState([]);

    const [scoreType, setScoreType] = useState('score');//score / emotionScore

    useEffect(() => {
        if (database && scoreType)
            request('/api/v1/'+database + '/analysis/' + scoreType).
                then((res) => {
                    setTime(res.time);
                    if(database == 'neo4j'){setStarData(res.data.map((da)=>({score:parseInt(da.score),count:parseInt(da.count.replace('\"','')) })))}
                    else {setStarData(res.data.map((da)=>({score:da.score/100,count:da.count})))}
                })
    }, [scoreType]);

    const scoreTypeSelector = () => {
        const handleChange = value => {
            setScoreType(value);
        };

        return (
            <Select defaultValue="score" style={{ width: 120 }} onChange={handleChange}>
                <Option value="score">评分</Option>
                <Option value="emotionScore">情感评价</Option>
            </Select>
        );
    };

    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <Timer time={time}/>
                <DatabaseSelector changeDatabase={value => { setDatabase(value) }} />
                <Divider />
                <Row gutter={10}>
                    <span>{scoreTypeSelector()}</span>
                </Row>
            </div>
            <Divider />
            <Chart height={300} autoFit data={starData} >
                <Interval position="score*count" />
            </Chart>
        </PageContainer>
    );
};

export default GeneralStatistics;
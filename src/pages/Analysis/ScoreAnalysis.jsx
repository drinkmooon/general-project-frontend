import { Button, Select, Input, Col, Row, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval} from 'bizcharts';

import request from '@/utils/request';

const { Option } = Select;
const GeneralStatistics = () => {

    const [database, setDatabase] = useState('mysql');
    const [starData, setStarData] = useState(
        [
            {
                score: 'test',
                count: 15,
            },
            {
                score: 'test/12',
                count: 123,
            },
            {
                score: 'test3',
                count: 1234,
            }
        ]
    );

    const [scoreType, setScoreType] = useState('score');//score / emotionScore

    useEffect(() => {
        if (database && scoreType)
            request(database + '/analysis/' + scoreType).
                then((res) => {
                    //setStarData(res.data)
                })
    }, [scoreType]);
    const scoreTypeSelector = () => {
        const handleChange = value => {
            setScoreType(value);
        };

        return (
            <>
                <Select defaultValue="score" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="score">评分</Option>
                    <Option value="emotionScore">情感评价</Option>
                </Select>
            </>
        );
    };

    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
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
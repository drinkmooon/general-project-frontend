import {  Select, Col, Row, Divider } from 'antd';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Chart, Interval } from 'bizcharts';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
const { Option } = Select;

const GeneralStatistics = () => {

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

    const getWithLimit = async (param) => {
        return request(database + param + '?limit=5');
    }
    //analysisByString label/Actor/Director/Cooperate
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
                <DatabaseSelector changeDatabase={value => { setDatabase(value) }} />
                <Divider />
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


export default GeneralStatistics;

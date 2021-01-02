import { Button, Select, Input, Col, Row, Divider, DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval } from 'bizcharts';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
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

    const [timeType, setTimeType] = useState('year');//year/season/month/day/
    const [dataPickerType, setDataPickerType] = useState('year');//year/quarter/month/day

    const SearchTime = (moment,value) => {
        if(value && timeType == 'season')
            value = value.replace('Q','0')
        if (database && timeType && value)
            request(database + '/analysis/time/' + timeType + '?' + 'time=' + value).
                then((res) => {
                    setStarData(res.data)
                })
    };
    const timeTypeSelector = () => {
        const handleChange = value => {
            if (value == 'season') {
                setDataPickerType('quarter');
            }
            else {
                setDataPickerType(value);
            }
            setTimeType(value);
        };

        return (    
                <Select defaultValue="year" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="year">年</Option>
                    <Option value="season">季度</Option>
                    <Option value="month">月</Option>
                    <Option value="day">天</Option>
                </Select>
        );
    };

    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <DatabaseSelector changeDatabase={value => { setDatabase(value) }} />
                <Divider />
                <Row gutter={10}>
                    <span>{timeTypeSelector()}</span>
                    <DatePicker onChange={SearchTime} picker={dataPickerType}></DatePicker>
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
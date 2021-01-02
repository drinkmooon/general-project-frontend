import { Button, Select, Input, Col, Row, Divider, DatePicker, Statistic,Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Chart, Interval } from 'bizcharts';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
import Timer from '@/components/Timer/Timer';
const { Option } = Select;
const GeneralStatistics = () => {

    const [database, setDatabase] = useState('mysql');
    const [starData, setStarData] = useState([]);

    const [time,setTime] = useState(0);

    const [timeType, setTimeType] = useState('year');//year/season/month/day/
    const [dataPickerType, setDataPickerType] = useState('year');//year/quarter/month/day

    const SearchTime = (moment,value) => {
        if(value && timeType == 'season')
            value = value.replace('Q','0')
        if (database && timeType && value)
            request('/api/v1/'+database + '/analysis/time/' + timeType + '?' + 'time=' + value).
                then((res) => {
                    console.log(res);
                    setTime(res.time);
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
                <Timer time={time}/>
                <DatabaseSelector changeDatabase={value => { setDatabase(value) }} />
                <Divider />
                <Row gutter={10}>
                    <span>{timeTypeSelector()}</span>
                    <DatePicker onChange={SearchTime} picker={dataPickerType}></DatePicker>
                </Row>
            </div>
            <Divider />
            <Card  title={'电影数'} style={{width:200}}>
                <Statistic value={starData}/>
            </Card>
            
        </PageContainer>
    );
};

export default GeneralStatistics;
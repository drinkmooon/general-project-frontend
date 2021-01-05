import { Button, message, Select, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { Chart, Interval } from 'bizcharts';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
import request from '@/utils/request';
import Timer from '@/components/Timer/Timer';
const { Option } = Select;
const { Search } = Input;
const GeneralStatistics = () => {

    const [database, setDatabase] = useState('mysql');
    const [time,setTime] = useState(0);
    const [starData, setStarData] = useState([]);

    const [relationType,setRelationType] = useState('a-a');//a-a/a-d/d-d/d-a

    const SearchPeople = name =>{
        request('/api/v1/'+database+'/getCooperation?type='+relationType+'&name='+name+'&limit=5')
        .then((res)=>{
            setTime(res.time);
            if(database == 'neo4j'){setStarData(res.data.map((da)=>({name:da.name,count:parseInt(da.count) })))}
            else {setStarData(res.data);}
        })
    }
    const selector = () => {
        const handleChange = value => {
            setRelationType(value);
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

    return (
        <PageContainer>
            <Timer time={time}/>
            <DatabaseSelector changeDatabase={value=>{setDatabase(value)}}/>
            <Divider />
            <div className="general-statistics-wrapper">
                <Row gutter={10}>
                    <Col span={8}>{selector()}
                    <Search onSearch={SearchPeople} style={{width: 150}}></Search>
                    </Col>
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
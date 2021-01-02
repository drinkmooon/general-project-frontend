import { Button, Select, Input, Col, Row, Divider, Table,InputNumber } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';

const { Option } = Select;
const { Search } = Input;
const GeneralStatistics = () => {

    const [dataList, setDataList] = useState([{
        productId:'0001',
        title:'test',
        versionCount:3,
        score:4.5,
        emotionScore:0.93,
    }]);

    const [database, setDatabase] = useState('mysql');

    const [nameType, setNameType] = useState('title');//title/director/actor/label

    const nameTypeSelector = () => {
        const handleChange = value => {
            setNameType(value);
        };

        return (
            <>
                <Select defaultValue="title" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="title">标题</Option>
                    <Option value="director">导演</Option>
                    <Option value="actor">演员</Option>
                    <Option value="label">类别</Option>
                </Select>
            </>
        );
    };

    const SearchByName = value => {
        if (database && nameType && value)
            request(database + '/getMovie/'
                + nameType + '?'+nameType+'=' + value + '&limit=5').
                then((res) => {
                    setDataList(res.data);
                })
    }

    const columns = [
        {
            title: '商品ID',
            dataIndex: 'productId',
        },
        {
            title: '电影名',
            dataIndex: 'title',
        },
        {
            title: '评分',
            dataIndex: 'score',
        },
        {
            title: '同部电影商品数',
            dataIndex: 'versionCount',
        },
        {
            title: '评论感情倾向',
            dataIndex: 'emotionScore',
        },
    ];
    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <Row><DatabaseSelector changeDatabase={value=>{setDatabase(value)}}/></Row>
                <Divider/>
                <Row gutter={10}>
                    <span>{nameTypeSelector()}</span>
                    <Search onSearch={SearchByName} style={{width: 150}}></Search>
                </Row>
            </div>
            <Divider />
            <Table dataSource={dataList} columns={columns}/>
        </PageContainer>
    );
};

export default GeneralStatistics;

import { Button, Select, Input, Col, Row, Divider, Table,InputNumber } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import request from '@/utils/request';

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
    const [upOrDown, setUpOrDown] = useState('gt');//gt/lt/eq
    const [numInputSetting, setNumInputSetting] = useState({
        min: 0,
        max: 5,
        step: 0.1,
    });
    const [score, setScore] = useState(0);

    const upOrDownSelector = () => {
        const handleChange = value => {
            setUpOrDown(value);
        }
        return (
            <>
                <Select defaultValue="eq" style={{ width: 120 }} onChange={handleChange}>
                    <Option value="lt">低于</Option>
                    <Option value="eq">相等</Option>
                    <Option value="gt">高于</Option>
                </Select>
            </>
        )
    }
    const scoreTypeSelector = () => {
        const handleChange = value => {
            if (value) {
                if (value == 'emotionScore') {
                    setNumInputSetting({
                        min: 0,
                        max: 1,
                        step: 0.01,
                    })
                }
                if (value == 'score') {
                    setNumInputSetting({
                        min: 0,
                        max: 5,
                        step: 0.1,
                    });
                }
                setScoreType(value);
            }
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

    const scoreChange = value => {
        console.log(value);
    }
    const Search = () => {
        if (database && scoreType)
            request(database + '/getMovie/'
                + scoreType + '?value=' + score +
                '&comp=' + upOrDown + '&limit=5').
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
                <Row gutter={10}>
                    <span>{scoreTypeSelector()}</span>
                    <span>{upOrDownSelector()}</span>
                    <InputNumber {...numInputSetting} onChange={scoreChange} />
                    <Button onClick={Search}>Search</Button>
                </Row>
            </div>
            <Divider />
            <Table dataSource={dataList} columns={columns}/>
        </PageContainer>
    );
};





export default GeneralStatistics;
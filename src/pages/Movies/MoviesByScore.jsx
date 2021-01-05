import { Button, Select, Input, Col, Row, Divider, Table, InputNumber } from 'antd';
import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import request from '@/utils/request';
import DatabaseSelector from '@/components/DatabaseSelector/DatabaseSelector';
import Timer from '@/components/Timer/Timer';
const { Option } = Select;

const GeneralStatistics = () => {

    const [dataList, setDataList] = useState([]);

    const [database, setDatabase] = useState('mysql');
    const [time, setTime] = useState(0);
    const [scoreType, setScoreType] = useState('score');//score / emotionScore
    const [upOrDown, setUpOrDown] = useState('eq');//gt/lt/eq
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
        setScore(value);
    }
    const Search = () => {
        if (database && scoreType)
            request('/api/v1/' + database + '/getMovie/'
                + scoreType + '?value=' + score +
                '&comp=' + upOrDown + '&limit=5').
                then((res) => {
                    setTime(res.time);
                    if (database == 'neo4j') {
                        setDataList(res.movieList.map((da) => ({
                            productId: da.productId,
                            title: da.title,
                            score: parseInt(da.score) / 100,
                            versionCount: parseInt(da.versionCount.replace('\"', '')),
                            emotionScore: parseInt(da.emotionScore) / 100
                        })))
                    }
                    else {
                        setDataList(res.data.map((da) => ({
                            productId: da.productId,
                            title: da.title,
                            score: da.score / 100,
                            versionCount: da.versionCount,
                            emotionScore: da.emotionScore / 100
                        })));
                    }
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
                <Timer time={time} />
                <DatabaseSelector changeDatabase={value => { setDatabase(value) }} />
                <Divider />
                <Row gutter={10}>
                    <span>{scoreTypeSelector()}</span>
                    <span>{upOrDownSelector()}</span>
                    <InputNumber {...numInputSetting} onChange={scoreChange} />
                    <Button onClick={Search}>Search</Button>
                </Row>
            </div>
            <Divider />
            <Table dataSource={dataList} columns={columns} />
        </PageContainer>
    );
};





export default GeneralStatistics;
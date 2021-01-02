import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export default function DatabaseSelector({changeDatabase}){

    return (
    <div>
        <span>选择数据库：</span>
        <Select defaultValue={'mysql'} onChange={changeDatabase}>
            <Option value='mysql'>mysql</Option>
            <Option value='hive'>hive</Option>
            <Option value='neo4j'>neo4j</Option>
        </Select>
    </div>
    )
} 
import { Button, message, Select, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';

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
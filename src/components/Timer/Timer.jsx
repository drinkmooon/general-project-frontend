import React from 'react';
import { Card, Statistic } from 'antd';

export default function Timer({ time }) {
    return (
        <div style={{ float: 'right' }}>
            <span >查询用时</span>
            <Statistic style={{ width: 200 }} value={time + 'ms'} />
        </div>
    );
}

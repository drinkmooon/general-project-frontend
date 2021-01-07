import React, { useEffect, useState } from 'react';
import { history, useParams } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Table, Tag, Space } from 'antd';
import ApiUtils from '@/utils/ApiUtils';

export default () => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        ApiUtils.getOrders().then((res) => {
            setOrderList(res.data);
        })
    }, [])

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '位置',
            dataIndex: 'location',
            key: 'location',
        },
        {
            title: '订单状态',
            key: 'orderStatus',
            dataIndex: 'orderStatus',
            render:
                status => {
                    let color = status.length > 3 ? 'blue' : 'green';
                    return (
                        <Tag color={color} key={status}>
                            {status}
                        </Tag>
                    );
                }
        },
        {
            title: '总价',
            key: 'total',
            dataIndex: 'total',
            render: (val) =>
            `${val}${' 元 '}`,            
            sorter: (a, b) => a.total - b.total,
        },        
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a>查看订单</a>
                    <a>修改订单</a>
                </Space>
            ),
        },
    ];

    return (
        <PageHeaderWrapper>
            <Table columns={columns} dataSource={orderList} />
        </PageHeaderWrapper>);
};
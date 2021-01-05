import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, history, useParams } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { getAllOrder, getBestCustomer, getSalesAnalysis, getTopSellingItem } from '../../utils/ApiUtils';
import { Chart, Interval, Line, Point, Tooltip, Axis, useView } from 'bizcharts';

const Cart = () => {

    const param = useParams();

    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <h1>购物车页面</h1>
                <Link to='/home/testLink'>link</Link>
                <Button onClick={()=>{history.push('/home/xzcnb')}}>go</Button>
                <Card title={'参数用户Id：'+param.userId}>             
                </Card>
            </div>
        </PageContainer>
    );
};

export default Cart;
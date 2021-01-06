import { Button, message, Input, Drawer, Card, Col, Row, Divider, Table } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { Link, history, useParams } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';

import ItemList from "./ItemList";
const Cart = () => {

    const param = useParams();

    return (
        <PageContainer>
            <div className="general-statistics-wrapper">
                <ItemList/>
            </div>

        </PageContainer>
    );
};

export default Cart;
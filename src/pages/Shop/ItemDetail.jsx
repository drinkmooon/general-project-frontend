import React, { useEffect, useState } from 'react';
import { history, useParams, Link } from 'umi';
import { PageHeaderWrapper, PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import ApiUtil from '@/utils/ApiUtils';
import ItemsBrowse from './ItemsBrowse';

const ItemDetail = () => {

    const {bookId} = useParams();
    let book = {};
    useEffect(()=>{
        ApiUtil.getBookDetail(bookId).then((res)=>{
            book = res.data;
        })
    })
    return (
            <div>{bookId}</div>
        );
};


export default ItemDetail;

import React, { useEffect, useState } from 'react';
import { history, useParams, Link } from 'umi';
import { PageHeaderWrapper, PageContainer } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import ApiUtil from '@/utils/ApiUtils';

export default () => {
    const params = useParams();
    return (
        <PageHeaderWrapper>
            <Card>
                <h1>这是用来编辑内容的页面</h1>
                <p>参数 ID: {params.itemId}</p>
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    返回
            </Button>
            </Card>
        </PageHeaderWrapper>
    );
};
// const ItemDetail = () => {



//     const params = useParams();
//     let book = {};
//     useEffect(()=>{
//         console.log(params.itemId);
//         ApiUtil.getBookDetail(params.itemId).then((res)=>{
//             book = res.data;
//         })
//     },[])
//     return (
//             <div>{params.itemId}</div>
//         );
// };

// export default ItemDetail;

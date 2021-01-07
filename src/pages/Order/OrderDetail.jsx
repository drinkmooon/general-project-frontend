import React from 'react';
import { history, useParams } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';

export default () => {
    const params = useParams();
    return (
        <PageHeaderWrapper>
            <Card>
                <h1>商品详情页</h1>
                <p>参数商品ID: {params.itemId}</p>
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >            返回
          </Button>
            </Card>
        </PageHeaderWrapper>);
};
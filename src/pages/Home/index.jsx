import React from 'react';
import { history, useParams,Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';

export default () => {
    const params = useParams();
    return (
        <PageHeaderWrapper>
            <Card>

                <h1>这是用来编辑内容的页面</h1>
                <p>参数 ID: {params.params}</p>
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >            返回
          </Button>
            </Card>
        </PageHeaderWrapper>);
};
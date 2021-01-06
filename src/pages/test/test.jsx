import React from 'react';
import { Row, Col, Button, Input, Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const { Search } = Input;
export default () => {
    return (
        <PageContainer>
            <Row justify='space-around'>

                <Col span={8}>
                    
                </Col>
                <Col span={8}>
                    <Search />
                </Col>
                <Col span={8}>
                
                </Col>
            </Row>
        </PageContainer>
    )
}
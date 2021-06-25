import React, { useState, useEffect } from 'react';

import ApiUtils from '@/utils/ApiUtils';
import { Select, Tag, List, Col, Row, Button, message, Divider, Input, Avatar, Card } from 'antd';
import { PlusOutlined, RetweetOutlined } from '@ant-design/icons';

const { Option } = Select;
export default ({ bookWithCountList, closeModal }) => {

    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState('hidden');//visible
    const [addr, setAddr] = useState();
    const [telephone, setTelephone] = useState();
    const [receiverName, setReceiverName] = useState();
    const [modalVisible,setModalVisible] = useState(false);
    useEffect(() => {
        if (addr == null) { return }
        setVisibility('visible');
    }, [addr])

    const placeOrder = () => {
        if(addr == null || telephone == null || receiverName == null){
            message.error('请填写全部字段！');
            return
        }
        setLoading(true);
        ApiUtils.addOrder({
            address: addr,
            telephone: telephone,
            receiverName: receiverName,
            orderItems: bookWithCountList.map((bk) => (
                {
                    bookId: bk.bookId,
                    quantity: bk.quantity
                }))
        })
            .then((res) => {
                if (true || res.msg == 'OK') {
                    message.success('下单成功！');
                    closeModal();
                    setLoading(false);
                }
            })
    }

    return (
        <>
            <Row>
                <Col span={8}>
                </Col>                
                <Col span={8}>
                <Input addonBefore="收货地址" onChange={e => setAddr(e.target.value)}/>
                <br />
                <br />
                <Input addonBefore="收货人电话" onChange={e => setTelephone(e.target.value)}/>
                <br />
                <br />
                <Input addonBefore="收货人姓名" onChange={e => setReceiverName(e.target.value)}/>
                </Col>
            </Row>
            <Row><Divider /></Row>
            <Row>
                <Col span={8}>
                </Col>
                <Col span={8}>
                    <List
                        bordered
                        dataSource={bookWithCountList}
                        renderItem={item => (
                            <List.Item key={item.bookId}>  
                                <List.Item.Meta
                                    title={item.name}
                                    description={item.author}
                                />
                                <Tag color='#1890ff'>{item.quantity} 本</Tag>
                            </List.Item>)
                        } />
                </Col>
            </Row>
            <Row><Divider /></Row>
            <Row>
                <Col span={10}>
                </Col>
                <Col span={4}>
                <Button type='primary' onClick={placeOrder} loading={loading}>下单</Button>
                </Col>
            </Row>
        </>
    )

}


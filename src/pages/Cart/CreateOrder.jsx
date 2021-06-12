import React, { useState, useEffect } from 'react';

import AddressForm from '@/components/UserAddress/AddressForm';
import AddrCard from '@/components/UserAddress/AddrCard';
import ApiUtils from '@/utils/ApiUtils';
import { Select, Tag, List, Col, Row, Button, message, Divider, Input, Avatar, Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;
export default ({ bookWithCountList, closeModal }) => {

    const [loading, setLoading] = useState(false);
    const [visibility, setVisibility] = useState('hidden');//visible
    const [addrId, setAddrId] = useState();
    const [addrList, setAddrList] = useState([]);
    const [modalVisible,setModalVisible] = useState(false);
    useEffect(() => {
        if (addrId == null) { return }
        setVisibility('visible');
    }, [addrId])
    useEffect(() => {
        ApiUtils.getAddr().then((res) => {
            setAddrList(res.data);
        })
    }, [])

    const placeOrder = () => {
        setLoading(true);
        ApiUtils.addOrder({
            addrId: addrId,
            data: bookWithCountList.map((bk) => (
                {
                    bookId: bk.bookId,
                    quantity: bk.quantity
                }))
        })
            .then((res) => {
                if (true || res.msg == 'OK') {
                    message.success('Place an order successfully!');
                    closeModal();
                    setLoading(false);
                }
            })
    }

    return (
        <>
            <Row style={{ height: 400 }}>
                <Col span={8}>
                    <Select dropdownRender={menu => (
                        <div>
                            {menu}
                            <Divider style={{ margin: '4px 0' }} />
                            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                <Button
                                type='primary'
                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                    onClick={()=>{console.log(1)}}          
                                    icon={<PlusOutlined /> }
                                >
                                添加地址
                                </Button>
                            </div>
                        </div>
                    )}
                        size='large' style={{ width: 300 }} onSelect={(value) => setAddrId(value)}>
                        {addrList?.map((address) => (<Option value={address.id}>{`${address.name} ${address.location}`}</Option>))}
                    </Select>
                    <AddrCard style={{ visibility: visibility }} addr={addrList.filter((add) => (add.d == addrId))[0]}></AddrCard></Col>
                <Col span={8}>
                    <List
                        bordered
                        dataSource={bookWithCountList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.bookName}
                                    description={item.publisher}
                                />
                                <Tag color='#f50'>{item.quantity}</Tag>
                            </List.Item>)
                        } />
                </Col>
            </Row>
            <Row>
                <Button type='primary' onClick={placeOrder} loading={loading}>下单！</Button>
            </Row>
        </>
    )

}


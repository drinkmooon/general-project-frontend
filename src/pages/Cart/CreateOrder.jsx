import React, { useState, useEffect } from 'react';

import AddressForm from '@/components/UserAddress/AddressForm';
import AddrCard from '@/components/UserAddress/AddrCard';
import ApiUtils from '@/utils/ApiUtils';
import { Select, Tag, List, Col, Row, Button, message, Avatar, Card } from 'antd';

const { Option } = Select;
export default ({ bookWithCountList, closeModal }) => {

    const [loading,setLoading] = useState(false);
    const [visibility, setVisibility] = useState('hidden');//visible
    const [addrId, setAddrId] = useState();
    const [addrList, setAddrList] = useState([]);

    useEffect(() => {
        if (addrId == null) { return }
        setVisibility('visible');
    }, [addrId])
    useEffect(()=>{
        ApiUtils.getAddr().then((res)=>{
            setAddrList(res.data);
        })
    },[])

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
                    <Select size='large' style={{ width: 300 }} onSelect={(value) => setAddrId(value)}>
                    {addrList.map((address) => (<Option value={address.id}>{`${address.name} ${address.location}`}</Option>))}
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


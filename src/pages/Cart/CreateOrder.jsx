import React, { useState, useEffect } from 'react';

import AddressForm from '@/components/UserAddress/AddressForm';
import AddrCard from '@/components/UserAddress/AddrCard';
import ApiUtils from '@/utils/ApiUtils';
import { Select, Tag, List, Col, Row, Button, message, Avatar, Card } from 'antd';

const { Option } = Select;
export default ({ bookWithCountList, closeModal }) => {


    console.log(bookWithCountList)
    const [loading,setLoading] = useState(false);
    const [visibility, setVisibility] = useState('hidden');//visible
    const [addrId, setAddrId] = useState();
    const [addrList, setAddrList] = useState([
        {
            addrId: -4584937065136388,
            receiver: "kUld",
            phone: "0Udckx",
            country: "Re2Qx",
            province: "[W1X0",
            city: "yZLe",
            district: "jd*$FUy",
            postCode: -782543423262296,
            location: "ivRp"
        }
    ]);

    useEffect(() => {
        if (addrId == null) { return }
        console.log(addrId)
        setVisibility('visible');
    }, [addrId])
    // useEffect(()=>{
    //     ApiUtils.getAddr((res)=>{
    //         setAddrList(res.addrList);
    //     })
    // },[])

    const AddrList = () => {
        return addrList.map((address) => (<Option value={address.addrId}>{address.location}</Option>))
    }

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
                }
            })
    }

    return (
        <>
            <Row style={{ height: 400 }}>
                <Col span={8}>
                    <Select size='large' style={{ width: 300 }} onSelect={(value) => { console.log(value); setAddrId(value); }}>
                        {AddrList()}
                    </Select>
                    <AddrCard style={{ visibility: visibility }} addr={addrList.filter((add) => (add.addrId == addrId))[0]}></AddrCard></Col>
                <Col span={8}>
                    <List
                        bordered
                        dataSource={bookWithCountList}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={item.title}
                                    description={item.description}
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


import React, { useState } from 'react';
import { Button,Card,Modal } from 'antd';
import AddressForm from './AddressForm';

export default function AddrCard({addr,style,showAction=false}) {

    const [isModalVis, setIsModalVis] = useState(false);
    const handleCancel = () => {
        setIsModalVis(false);
    }
    const handleOk = () => {
        AddrStore.remove(addr);
        setIsModalVis(false);
    }

    if(addr){
    return (<>
        <Card
            style={{...style,width: 300 }}
            actions={
                (!showAction)?<></>
                :[
                <Button onClick={() => {
                    AddrStore.remove(addr)
                }}>删除
                </Button>,
                <Button
                    onClick={() => {
                        setIsModalVis(true);
                    }}>修改
                </Button>]}>
            <p>{addr.receiver}</p>
            <span>{addr.phone}</span>
            <p>{addr.country + addr.province + addr.city}</p>
            <span>{addr.district + addr.location}</span>
            <span>{addr.postCode}</span>
        </Card>
        <Modal 
        title={'修改地址'}
        visible={isModalVis}
        onCancel={handleCancel}
        footer={[]}
        >
            <AddressForm preAddr={addr} closeModal={handleOk}/>
        </Modal>
    </>)
    }
    else{
        return <div></div>
    }
}
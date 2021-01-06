import React from 'react';
import { Button, Card } from 'antd';
import AddrCard from './AddrCard';

const UserAddress = () => {

    const Cards = () => {
        return AddrStore.addrList.map((addr) => {
            return (<AddrCard addr={addr}/>)
        });
    }
    return (<div>
        {Cards()}
    </div>)
}

export default UserAddress;

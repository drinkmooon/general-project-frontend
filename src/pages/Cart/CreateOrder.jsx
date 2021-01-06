import React, { useState, useEffect } from 'react';

import AddressForm from '@/components/UserAddress/AddressForm';
import AddrCard from '@/components/UserAddress/AddrCard';
import ApiUtils from '@/utils/ApiUtils';
import { Select } from 'antd';

const { Option } = Select;
export default ({ bookList }) => {



    const [visibility,setVisibility] = useState('hidden');//visible
    const [addrId,setAddrId] = useState();
    const [addrList, setAddrList] = useState([
        { addrId: -4584937065136388, receiver: "kUld", phone: "0Udckx", country: "Re2Qx", province: "[W1X0", city: "yZLe", district: "jd*$FUy", postCode: -782543423262296, location: "ivRp" }
    ]);

    useEffect(()=>{
        if(addrId == null){ return }
        console.log(addrId)
        setVisibility('visible');
    },[addrId])
    // useEffect(()=>{
    //     ApiUtils.getAddr((res)=>{
    //         setAddrList(res.addrList);
    //     })
    // },[])

    const AddrList = () => {
        return addrList.map((address) => (<Option value={address.addrId}>{address.location}</Option>))
    }

    return (
        <>
        <Select size='large' style={{width:300}} onSelect={(value)=>{console.log(value);setAddrId(value);}}>
            {AddrList()}
        </Select>
        <AddrCard style={{visibility:visibility}} addr={addrList.filter((add)=>(add.addrId==addrId))[0]}></AddrCard>

        </>
    )

}


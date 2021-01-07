import React, { useState, useEffect } from 'react';
import { history, useParams,useLocation } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProList from '@ant-design/pro-list';
import { Card, Button, Modal } from 'antd';
import ApiUtils from '@/utils/ApiUtils';
import AddressForm from '@/components/UserAddress/AddressForm';

export default () => {

    const [addrList, setAddrList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        ApiUtils.getAddr().then((res) => {
            setAddrList(res.data);
        })
    }, [])

    const fresh = () =>{
        window.location.reload(true);
    }

    const deleteAddr = addrId => {
        ApiUtils.delAddr(addrId).then((res)=>{
            fresh();}
        )
    }

    return (
        <PageHeaderWrapper>
            <ProList
                dataSource={addrList}
                toolBarRender={() => {
                    return [
                        <Button key="3" type='primary' onClick={()=>{setModalVisible(true)}} >
                            新增地址
                        </Button>
                    ];
                }}
                metas={{
                    title: {
                        render:(dom, entity, index) => {
                            return (`${entity.name} ${entity.phone}`)
                        }
                    },
                    description: {
                        render: (dom,entity,index) => {
                            return `${entity.province} ${entity.city} ${entity.location}`; 
                            return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
                        },
                    },
                    avatar: {},
                    actions: {
                        render: (dom, entity, index) => {
                            return [
                                <Button key='11'
                                    danger
                                    onClick={() => { deleteAddr(entity.id) }}>
                                    删除
                            </Button>,
                            ];
                        },
                    },
                }}
            ></ProList>
            <Modal
                visible={modalVisible}
                footer={false}
                onCancel={()=>{setModalVisible(false)}}
            >
                <AddressForm closeModal={()=>{fresh();setModalVisible(false)}}/>
            </Modal>
        </PageHeaderWrapper>);
};
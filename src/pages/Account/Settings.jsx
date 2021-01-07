import React, { useState, useEffect } from 'react';
import { history, useParams, useLocation } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProList from '@ant-design/pro-list';
import { Card, Button, Modal } from 'antd';
import ApiUtils from '@/utils/ApiUtils';
import AddressForm from '@/components/UserAddress/AddressForm';
import useModal from 'antd/lib/modal/useModal';

export default () => {

    const [addrList, setAddrList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal, contextHolder] = useModal();

    useEffect(() => {
        ApiUtils.getAddr().then((res) => {
            setAddrList(res.data);
        })
    }, [modalVisible])

    const fresh = () => {
        ApiUtils.getAddr().then((res) => {
            setAddrList(res.data);
        })
    }

    const deleteAddr = addrId => {
        ApiUtils.delAddr(addrId).then((res) => {
            fresh();
        }
        )
    }

    return (
        <PageHeaderWrapper>
            {contextHolder}
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
                        render: (dom, entity) => {
                            return (`${entity.name} ${entity.phone}`)
                        }
                    },
                    description: {
                        render: (dom, entity) => {
                            return `${entity.province} ${entity.city} ${entity.location}`;
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
                                <Button key='12'
                                    onClick={() => {
                                        const changeAddr = modal.info({
                                            closable: true,
                                            icon: null,
                                            okButtonProps:{style:{display:'none'}},
                                            content:
                                                <AddressForm preAddr={entity} closeModal={() => { console.log(1); fresh(); changeAddr.destroy() }} />,
                                        });
                                    }}>
                                    修改
                                </Button>
                            ];
                        },
                    },
                }}
            ></ProList>
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={()=>{setModalVisible(false)}}
                
            >
                <AddressForm closeModal={()=>{
                    // fresh();
                    setModalVisible(false)}}/>
            </Modal>
        </PageHeaderWrapper>);
};
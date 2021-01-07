import React, { useState, useEffect } from 'react';
import { history, useParams } from 'umi';
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

    return (
        <PageHeaderWrapper>
            <Card>
                <h1>商品详情页</h1>
                <p>参数商品ID: { }</p>
                <Button
                    onClick={() => {
                        history.goBack();
                    }}
                >            返回
          </Button>
            </Card>
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
                    title: {},
                    description: {
                        render: () => {
                            return 'Ant Design, a design language for background applications, is refined by Ant UED Team';
                        },
                    },
                    avatar: {},
                    actions: {
                        render: (dom, entity, index) => {
                            return [
                                <Button key='11'
                                    danger
                                    onClick={() => { deleteBook(entity.bookId) }}>
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
                <AddressForm closeModal={()=>{history.push('/home') ;setModalVisible(false)}}/>
            </Modal>
        </PageHeaderWrapper>);
};
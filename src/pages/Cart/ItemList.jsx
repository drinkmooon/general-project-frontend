import React, { useState, useEffect, useRef } from 'react';
import { Progress, Button, InputNumber, message, Modal, Tag } from 'antd';
import ProList from '@ant-design/pro-list';
import { useParams } from 'umi';
import ApiUtils from '@/utils/ApiUtils';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import CreateOrder from './CreateOrder';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current;
}

export default () => {

    const [bookList, setBookList] = useState([]);
    const [counts, setCounts] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [selectedBooks, setSelectedBooks] = useState([]);
    const [isOrderModalVisable, setOrderModal] = useState(false);

    useEffect(() => {
        if (selectedBooks && selectedBooks.length !== 0) {
            setOrderModal(true);
        }

    }, [selectedBooks]);

    useEffect(() => {
        ApiUtils.checkCart().then((res) => {            
            setBookList(res.data);
        })
    }, []);

    const prevBookList = usePrevious(bookList);

    useEffect(() => {
        if (bookList && bookList.length != 0) {
            if (prevBookList) {
                const delList = prevBookList.filter((p) => (!bookList.includes(p))).map((bk) => (prevBookList.indexOf(bk)))
                setSelectedRowKeys(selectedRowKeys.filter((k, i) => (!delList.includes(i))))
                console.log(counts.filter((count, index) => ((!delList.includes(index)))))
                setCounts(counts.filter((count, index) => ((!delList.includes(index)))))
            }
            setCounts(bookList.map((b)=>(b.quantity)));
        }
        else {
            setCounts([]);
            setSelectedRowKeys([]);
        }
    }, [bookList]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
    };

    const deleteBooks = bookIds => {

        for (let i = 0; i < bookIds.length; i++) {
            ApiUtils.delCart(bookIds[i])
        }
        setBookList(bookList.filter((b) => (!bookIds.includes(b.bookId))));
    }

    const deleteBook = bookId => {
        ApiUtils.delCart(bookId)
            .then((res) => {
                    message.success('Delete Book Successfully!');
                    setBookList(bookList.filter((book) => (book.bookId !== bookId)));


            })
    }
    const deleteAllBooks = () => {
        const list = [...bookList];
        for (let i = 0; i < list.length; i++) {
            ApiUtils.delCart(list[i].bookId);
        }
        setBookList([]);
    }

    const changeBookNum = (index, num) => {
        ApiUtils.editCart({ bookId: bookList[index].bookId, quantity: num }).then((res) => {
            if (true || res.msg == 'OK') {
                setCounts(counts.map((count, ind) => (ind === index ? num : count)));
            }
        });
    }


    const placeSelected = () => {
        setSelectedBooks(selectedRowKeys.map((key) => ({ ...bookList[key], quantity: counts[key] })));
    }

    const placeOrder = index => {
        setSelectedBooks([{ ...bookList[index], quantity: counts[index] }]);
    }

    return (
        <div>
            <ProList
                toolBarRender={() => {
                    return [
                    <Button key="3" type='primary' disabled={selectedRowKeys.length === 0 ? true : false} onClick={placeSelected} >
                        下单
                    </Button>,
                    <Button key="3" danger onClick={deleteAllBooks} disabled={bookList.length === 0 ? true : false}>
                        清空购物车
                    </Button>
                    ];
                }}
                metas={{
                    title: { render: (dom, entity) => (entity.bookName) },
                    description: {},
                    avatar: { render: (dom, entity) => (<img src={entity.image}/>) },
                    actions: {
                        render: (dom, entity, index) => {
                            return [
                                <Tag  color='#f50'><h1>{entity.price}</h1></Tag>
                                ,
                                <Button
                                    key='10'
                                    onClick={() => { placeOrder(index) }} >
                                    下单
                            </Button>,
                                <Button key='11'
                                    danger
                                    onClick={() => { deleteBook(entity.bookId) }}>
                                    删除
                            </Button>,
                                <InputNumber
                                    min={1}
                                    defaultValue={counts[index]}
                                    value={counts[index]}
                                    onChange={value => { changeBookNum(index, value) }}
                                />
                            ];
                        },
                    },
                }}
                rowKey={(row, index) => index}
                rowSelection={rowSelection}
                dataSource={bookList}
            />
            <Modal
                visible={isOrderModalVisable}
                width={1000}
                style={{ height: 800 }}
                onCancel={() => setOrderModal(false)}
                footer={false}
            >

                <CreateOrder
                    style={{ height: 800 }}
                    bookWithCountList={selectedBooks}
                    closeModal={() => { setOrderModal(false); deleteBooks(selectedBooks.map((b) => (b.bookId))) }} />
            </Modal>
        </div>
    );
};

//重写selectedBooks的相关逻辑
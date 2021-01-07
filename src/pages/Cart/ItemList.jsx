import React, { useState, useEffect, useRef } from 'react';
import { Progress, Button, InputNumber, message, Modal } from 'antd';
import ProList from '@ant-design/pro-list';
import { useParams } from 'umi';
import ApiUtils from '@/utils/ApiUtils';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import CreateOrder from './CreateOrder';
const dataSource = [
    {
        title: '语雀的天空',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        bookId: 1,
    },
    {
        title: 'Ant Design',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        bookId: 2,

    },
    {
        title: '蚂蚁金服体验科技',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        bookId: 3,

    },
    {
        title: 'TechUI',
        avatar:
            'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        bookId: 4,
    },
];

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    })
    return ref.current;
}

export default () => {

    const [bookList, setBookList] = useState(dataSource);
    const [counts, setCounts] = useState([1, 1, 1, 10]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [selectedBooks,setSelectedBooks] = useState([]);
    const [isOrderModalVisable, setOrderModal] = useState(false);
    //const [isAddrModalVisable, setAddrOrderModal] = useState(false);

    useEffect(()=>{
        if(selectedBooks && selectedBooks.length!==0){
            setOrderModal(true);
        }
        
    },[selectedBooks]);

    useEffect(() => {
        ApiUtils.checkCart().then((res) => {
            if (res.message == 'OK') {
                setBookList(res.data);

            }
        })
    }, []);

    const prevBookList = usePrevious(bookList);

    useEffect(() => {
        if (bookList && bookList.length != 0) {
            if (prevBookList) {
                let delIndex = 0;
                for (let i = 0; i < prevBookList.length; i++) {
                    if (bookList[i].bookId !== prevBookList[i].bookId) {
                        delIndex = i;
                        break;
                    }
                }
                setSelectedRowKeys(selectedRowKeys.filter((k,i)=>(i!=delIndex)))
                setCounts(counts.filter((count, index) =>(index != delIndex )))
            }
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
        for(let i = 0;i<bookIds.length;i++){
            ApiUtils.delCart(bookIds[i])
            .then((res)=>{
                if(true||res.msg==='OK'){
                    setBookList(bookList.filter((b)=>(b.bookId!=bookIds[i])));
                }
            })
        }
    }

    const deleteBook = bookId => {
        ApiUtils.delCart(bookId)
            .then((res) => {
                if (true || res.msg === 'OK') {
                    message.success('Delete Book Successfully!');
                    setBookList(bookList.filter((book) => (book.bookId !== bookId)));
                }
                else {
                    message.error('Something goes wrong. Please try it again.')
                }

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
        setSelectedBooks(selectedRowKeys.map((key)=>({...bookList[key],quantity:counts[key]})));
    }

    const placeOrder = index => {
        setSelectedBooks([{...bookList[index],quantity:counts[index]}]);
    }

    return (
        <div>
            <ProList
                toolBarRender={() => {
                    return [<Button onClick={() => { console.log(counts); }}>DEBUG</Button>,
                    <Button key="3" type='primary' disabled={selectedRowKeys.length === 0 ? true : false} onClick={placeSelected} >
                        下单
          </Button>,
                    <Button key="3" danger onClick={deleteAllBooks} disabled={bookList.length === 0 ? true : false}>
                        清空购物车
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
                                <Button
                                    ey='10'
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
                                    onChange={value => { changeBookNum(index, value) }}
                                />
                            ];
                        },
                    },
                }}
                rowKey={(row,index)=>index}
                rowSelection={rowSelection}
                dataSource={bookList}
            />
            <Modal
                visible={isOrderModalVisable}
                width={1000}
                style={{height:800}}
                onCancel={()=>setOrderModal(false)}
                footer={false}
                >
                
                <CreateOrder
                    style={{height:800}}
                    bookWithCountList={selectedBooks}
                    closeModal={() => { setOrderModal(false);deleteBooks(selectedBooks.map((b)=>(b.bookId))) }} />
            </Modal>
        </div>
    );
};

//重写selectedBooks的相关逻辑
import React from 'react';
import { Button, Col, Row, Space, message } from 'antd';

import BookCard from '@/components/BookCard';
import ApiUtils from '@/utils/ApiUtils';
import useModal from 'antd/lib/modal/useModal';
import CreateOrder from '../Cart/CreateOrder';
import { ShoppingCartOutlined, DollarCircleOutlined } from '@ant-design/icons';
const BookBoard = ({ bookList }) => {

    const [modal, contextHolder] = useModal();
    const addBook = (book) => {
        console.log(book)
        ApiUtils.addCart({ bookId: book.bookId, quantity: 1 }).then((res) => {
            if (true || res.msg === 'OK') message.success('Add Book Successfully!');
        })
    }

    const ITEM_PER_ROW = 5;
    const cardList = () => {
        if (bookList) {
            let list = [];
            for (let i = 0; i < bookList.length / ITEM_PER_ROW; i++) {
                list.push(
                    <Row gutter={16}>{
                        bookList.slice(i * ITEM_PER_ROW, (i + 1) * ITEM_PER_ROW).map
                            ((book) => (
                                <Col className="gutter-row" span={4.8}>
                                    <BookCard
                                        book={book}
                                        action={[
                                            <Button
                                                icon={<ShoppingCartOutlined />}
                                                onClick={() => { addBook(book) }}>添加购物车</Button>,
                                            <Button
                                                icon={<DollarCircleOutlined />}
                                                type='primary'
                                                onClick={() => {
                                                    console.log(book);
                                                    const createOrderModal = modal.info({
                                                        closable: true,
                                                        okButtonProps: { style: { display: 'none' } },
                                                        icon: null,
                                                        width: 1000,
                                                        content:
                                                            <CreateOrder
                                                                style={{ height: 800 }}
                                                                bookWithCountList={[{ ...book, quantity: 1, }]}
                                                                closeModal={() => { createOrderModal.destroy(); }}
                                                            />
                                                    });
                                                }
                                                }
                                            >
                                                立即下单！
                                            </Button>,
                                        ]
                                        }
                                    />
                                </Col>))
                    }</Row>)
            }
            return <Space direction='vertical'>{list}</Space>
        }
        return <></>
    }

    return (<div id='book-card'>{contextHolder}{cardList()}</div>)
}

export default BookBoard;
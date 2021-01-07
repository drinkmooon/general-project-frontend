import React from 'react';
import { Button, Col, Grid, Row, Space, message } from 'antd';

import BookCard from '@/components/BookCard';
import ApiUtils from '@/utils/ApiUtils';

const BookBoard = ({ bookList }) => {

    const addBook = (book) => {
        ApiUtils.addCart({ bookId: book.bookId, quantity: 1 }).then((res) => {
            if (true || res.msg === 'OK') message.success('Add Book Successfully!');
        })
    }
    // const cardList = () => (<Row gutter={16}>{bookList.map((book) => (
    // <Col className="gutter-row" span={6}>
    //     <BookCard
    //         book={book}
    //         action={
    //             <Button onClick={() => { addBook(book) }}>添加到购物车</Button>}
    //     />
    // </Col>))}</Row>)

    const ITEM_PER_ROW = 5;
    const cardList = () => {
        let list = [];
        for (let i = 0; i < bookList.length / ITEM_PER_ROW; i++) {
            list.push(   
                <Row gutter={16}>{
                    bookList.slice(i * ITEM_PER_ROW, (i + 1) * ITEM_PER_ROW).map
                        ((book) => (
                            <Col className="gutter-row" span={4.8}>
                                <BookCard
                                    book={book}
                                    action={
                                        <Button onClick={() => { addBook(book) }}>添加到购物车</Button>}
                                />
                            </Col>))
                }</Row>)
        }
        return <Space direction ='vertical'>{list}</Space>
    }

    return (<div id='book-card'>{cardList()}</div>)
}

export default BookBoard;
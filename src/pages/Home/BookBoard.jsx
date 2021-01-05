import React from 'react';
import { Button, Col, Grid, Row, Space } from 'antd';

import BookCard from '@/components/BookCard';

const BookBoard = ({ bookList }) => {
    const ITEM_PER_ROW = 4;
    const addBook = (book) => {

    }
    const CardList = () => {
        let list = [];
        for (let i = 0; i < bookList.length / ITEM_PER_ROW; i++) {
            list.push(   
                <Row gutter={16}>{
                    bookList.slice(i * ITEM_PER_ROW, (i + 1) * ITEM_PER_ROW).map
                        ((book) => (
                            <Col className="gutter-row" span={6}>
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

    return (<div id='book-card'>{CardList()}</div>)
}

export default BookBoard;
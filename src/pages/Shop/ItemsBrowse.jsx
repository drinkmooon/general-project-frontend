import React, { useEffect, useState } from 'react';
import { history, useParams, Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button, Input, Row } from 'antd';
import ApiUtil from '@/utils/ApiUtils';
import BookBoard from './BookBoard';

const {Search} = Input;

export default () => {
    // const testBookList = () => {
    //     const book = {
    //         bookName: '概率论',
    //         image: '',
    //         publisher: '同济大学出版社',
    //         author: '',
    //         category: ['学术', '教育'],
    //         price: '38',
    //         discount: '1',
    //         secondhand: true,
    //         ISBN: '1245362789',
    //         bookAbstract: '???',
    //         inventory: '15',
    //         bookId: '114514',
    //     };
    //     let booklist = [];
    //     for (let i = 0; i < 6; i++) {
    //         booklist.push(book);
    //     }
    //     return booklist;
    // }

    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        ApiUtil.getAllBook()
            .then((res) => {
                setBookList(res.data)
            })
    }, []);

    const search_book = string => {
        ApiUtil.searchBook(string).then((res)=>{
            setBookList(res.data);
        })
    }
    

    return (
        <PageHeaderWrapper>
            {/* <Row>
                <Search width={1000} onSearch={search_book}></Search>
            </Row> */}
            
            <BookBoard
                bookList={bookList} />
        </PageHeaderWrapper>);
};
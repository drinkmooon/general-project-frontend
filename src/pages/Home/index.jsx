import React, { useEffect, useState } from 'react';
import { history, useParams,Link } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Button } from 'antd';
import ApiUtil from '@/utils/ApiUtils';
import BookBoard from './BookBoard';

export default () => {
    const testBookList = () => {
        const book = {
            name:'概率论',
            image:'',
            publisher:'同济大学出版社',
            author:'',
            category:['学术','教育'],
            price:'38',
            discount:'1',
            secondhand:true,
            ISBN:'1245362789',
            bookAbstract:'???',
            inventory:'15',
            id:'114514',
        };
        let booklist = [];
        for(let i = 0;i< 6; i++){
            booklist.push(book);
        }
        return booklist;
    }

    const [bookList, setBookList] = useState(testBookList());

    useEffect(()=>{
        ApiUtil.getBookDetail('testBookId')
        .then((res)=>{
            setBookList(testBookList().slice(0,5));
        })
    },[]);

    return (
        <PageHeaderWrapper>
            <BookBoard 
                bookList={bookList}/>
        </PageHeaderWrapper>);
};
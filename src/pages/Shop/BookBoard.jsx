import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Space, message, Divider, Input } from 'antd';

const { Search } = Input;

import BookCard from '@/components/BookCard';
import ApiUtils from '@/utils/ApiUtils';
import useModal from 'antd/lib/modal/useModal';
import CreateOrder from '../Cart/CreateOrder';
import { ShoppingCartOutlined, DollarCircleOutlined } from '@ant-design/icons';
const BookBoard = ({ bookList }) => {
  const [modal, contextHolder] = useModal();
  const addBook = (book) => {
    console.log(book);
    ApiUtils.addCart({ bookId: book.bookId, quantity: 1 }).then((res) => {
      if (res.success === true) message.success('添加购物车成功！');
      else message.error('请先登录账户哦~~');
    });
  };
  const [loginStatus, setLoginStatus] = useState([]);

  useEffect(() => {
    ApiUtils.getLoginStatus().then((res) => {
      setLoginStatus(res.success);
    });
  }, []);

  const ITEM_PER_ROW = 5;
  const cardList = () => {
    if (bookList) {
      let list = [];
      for (let i = 0; i < bookList.length / ITEM_PER_ROW; i++) {
        list.push(
          <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} key={`row${i}`}>
            {bookList.slice(i * ITEM_PER_ROW, (i + 1) * ITEM_PER_ROW).map((book) => (
              <Col className="gutter-row" flex="auto" key={`col${book.bookId}`}>
                <BookCard
                  book={book}
                  action={[
                    <Button
                      icon={<ShoppingCartOutlined />}
                      onClick={() => {
                        addBook(book);
                      }}
                    >
                      添加购物车
                    </Button>,
                    <Button
                      icon={<DollarCircleOutlined />}
                      type="primary"
                      onClick={() => {
                        if(!loginStatus){
                          message.error('请先登录账户哦~~');
                          return
                        }
                        console.log(book);
                        const createOrderModal = modal.info({
                          closable: true,
                          okButtonProps: { style: { display: 'none' } },
                          icon: null,
                          width: 1000,
                          content: (
                            <CreateOrder
                              style={{ height: 800 }}
                              bookWithCountList={[{ ...book, quantity: 1 }]}
                              closeModal={() => {
                                createOrderModal.destroy();
                              }}
                            />
                          ),
                        });
                      }}
                    >
                      立即下单
                    </Button>,
                  ]}
                />
              </Col>
            ))}
          </Row>,
          <Row key={`row_addtional${i}`}>
            <Divider></Divider>
          </Row>,
        );
      }
      return list;
    }
    return <></>;
  };

  return (
    <div id="book-card">
      {contextHolder}
      {cardList()}
    </div>
  );
};

export default BookBoard;

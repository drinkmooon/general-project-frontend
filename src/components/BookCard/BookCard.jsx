import { Button, Card, Tag } from 'antd';
import { Link, history } from 'umi';
const { Meta } = Card;

export default function BookCard({ book, action }) {

  return (
    <Card
      hoverable
      style={{ width: 250, margin: "auto" }}
      actions={action}
      cover={<img alt="example" src={`http://101.226.16.95:8089/jpg/${book.image}.jpg`} onClick={()=>history.push(`/item/detail/${book.bookId}`)}/>}

    >
      <Link to={`/item/detail/${book.bookId}`}>
        <Meta title={
          <>
            <p>{book.bookName}</p>
          </>
        } description={book.abstract.slice(0,30)+'...'} />
        <Tag style={{float:'right'}}color='#1890ff'>{(book.price * book.discount).toFixed(2) + " 元/本"}</Tag>
      </Link>
    </Card>
  );
}

import { Button, Card, Tag } from 'antd';
import { Link, history } from 'umi';
const { Meta } = Card;

export default function BookCard({ book, action }) {

  return (
    <Card
      hoverable
      style={{ width: 250 }}
      actions={action}
      cover={<img alt="example" src={book.image} onClick={()=>history.push(`/item/detail/${book.bookId}`)}/>}

    >
      <Link to={`/item/detail/${book.bookId}`}>
        <Meta title={
          <>
            <p>{book.bookName}</p>
          </>
        } description={book.abstract.slice(0,30)+'...'} />
        <Tag style={{float:'right'}}color='#f50'>{book.price * book.discount}</Tag>
      </Link>
    </Card>
  );
}

import { Button, Card } from 'antd';
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
            <p>{book.name}</p>
            <p>售价：{book.price * book.discount}</p>
          </>
        } {...book} />
      </Link>
    </Card>
  );
}

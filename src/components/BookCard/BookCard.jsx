import { Button, Card } from 'antd';
import {Link} from 'umi';
const { Meta } = Card;

export default function BookCard({book,action}){ 
  
  return (

    <Card
        hoverable
        style={{ width: 250 }}
        actions={action}
        cover={<Link target='_blank' to={`/item/detail/${book.bookId}`}><img alt="example" src={book.image} /></Link>}

    >
          <Link to={`/item/detail/${book.bookId}`}>
            <Meta title={
            <>
              <p>{book.name}</p>
              <p>售价：{book.price*book.discount}</p>
            </>
            } {...book} />
          </Link>
    </Card>
  );
}

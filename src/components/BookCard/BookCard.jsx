import { Button, Card } from 'antd';
import {Link} from 'umi';
const { Meta } = Card;

export default function BookCard({book,action}){ 
  
  return (

    <Card
        hoverable
        style={{ width: 240 }}
        actions={[action]}
        cover={<Link to='/cart/cart'><img alt="example" src={book.image} /></Link>}
    >
          <Link href='/cart/cart'>
            <Meta title={
            <>
              <p>{book.name}</p>
              <p>售价：{book.price*book.discount}</p>
              <p>库存:{book.inventory}</p>
            </>
            } {...book} />
          </Link>
    </Card>
  );
}

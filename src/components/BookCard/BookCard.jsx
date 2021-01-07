import { Button, Card } from 'antd';
import {Link} from 'umi';
const { Meta } = Card;

export default function BookCard({book,action}){ 
  
  return (

    <Card
        hoverable
        style={{ width: 250 }}
        actions={action}
        // cover={<Link to='/cart/cart'><img alt="example" src={book.image} /></Link>}
        cover={<img alt="example" src={book.image} />}
    >
          {/* <Link href='/cart/cart'></Link> */}
            <Meta title={
            <>
              <p>{book.name}</p>
              <p>售价：{book.price*book.discount}</p>
            </>
            } {...book} />
          
    </Card>
  );
}

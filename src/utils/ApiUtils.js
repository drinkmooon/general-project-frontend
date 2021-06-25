import request from '@/utils/request';
import { method } from 'lodash';

class ApiUtil{
  getLoginStatus= async ()=>{
    return request('/api/LoginStatus/LoginStatus');
  }

  searchBook= async name=>{
    return request('/api/Book/SearchBook', {
      method: 'POST',
      data: { name },      
    });
  }

  getAllBook = async () => {
    return request('/api/Book/GetAllBook');
  }

  getBookDetail = async bookId => {
    return request('/api/Book/GetBookDetail', {
      method: 'POST',
      data: { bookId },      
    })
  }

  checkCart = async () => {
    return request('/api/Cart/CheckCart');
  }

  addCart = async params => {
    return request('/api/Cart/AddCart', {
      method: 'POST',
      data: { ...params, }
    });
  }

  delCart = async bookId => {
    return request('/api/Cart/DelCart', {
      method: 'POST',
      data: { bookId }
    });
  }

  editCart = async params => {
    return request('/api/Cart/EditCart', {
      method: 'POST',
      data: { ...params }
    });
  }

  addOrder = async params => {
    return request('/api/Order/AddOrder', {
      method: 'POST',
      data: {...params},
    });
  }

  getOrders = async () => {
    return request('/api/Order/GetOrders');
  }

  getOrderDetail = async orderId => {
    return request('/api/Order/GetOrderDetail', {
      method: 'POST',
      data: { orderId }
    });
  }

  editOrder = async params => {
    return request('/api/Order/EditOrder', {
      method: 'POST',
      data: { ...params },
    })
  }

  delOrder = async orderId => {
    return request('/api/order/DelOrder', {
      method: 'POST',
      data: { orderId },
    })
  }
}
export default new ApiUtil();
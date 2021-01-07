import request from '@/utils/request';
import { method } from 'lodash';

class ApiUtil{
  searchBook= async name=>{
    return request(`/api/book/SearchBook?query=${name}`);
  }

  getBookDetail = async bookId => {
    return request(`/api/book/GetBookDetail?bookId=${bookId}`);
  }

  getAddr = async () => {
    return request(`/api/addresses/GetAddr`);
  }

  //@params: new Addr. of current user
  addAddr = async params => {
    return request('/api/addresses/AddAddr', {
      method: 'POST',
      data: { ...params,},
    });
  }

  delAddr = async addrId => {
    return request('/api/addresses/DelAddr', {
      method: 'DELETE',
      data: { addrId: addrId, },
    });
  }

  editAddr = async addrId =>{
    return request(`/api/addresses/EditAddr/${addrId}`, {
      method: 'POST',
    })
  }  

  checkCart = async () => {
    return request('/api/cart/CheckCart');
  }

  addCart = async params => {
    return request('/api/cart/AddCart', {
      method: 'POST',
      data: { ...params, }
    });
  }

  delCart = async bookId => {
    return request('/api/cart/DelCart', {
      method: 'DELETE',
      data: { bookId: bookId },
    });
  }

  editCart = async params => {
    return request('/api/cart/EditCart/', {
      method: 'POST',
      data: { ...params }
    });
  }

  addOrder = async params => {
    return request('/api/order/addOrder', {
      method: 'POST',
      data: {...params},
    });
  }

  getOrders = async () => {
    return request('/api/order/GetOrders');
  }

  getOrderDetail = async orderId => {
    return request(`/api/order/GetOrderDetail?orderId=${orderId}`);
  }

  editOrder = async params => {
    return request('/api/order/EditOrder', {
      method: 'POST',
      data: { ...params },
    })
  }

  delOrder = async orderId => {
    return request('/api/order/DelOrder', {
      method: 'DELETE',
      data: { orderId },
    })
  }

  payOrder = async orderId => {
    return request(`/api/order/PayOrder?orderId=${orderId}`);
  }
}
export default new ApiUtil();
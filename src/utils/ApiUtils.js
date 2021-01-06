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
    return request(`/api/GetAddr`);
  }

  //@params: new Addr. of current user
  addAddr = async params => {
    return request('/api/AddAddr', {
      method: 'POST',
      data: { ...params,},
    });
  }

  delAddr = async addrId => {
    return request('/api/DelAddr', {
      method: 'DELETE',
      data: { addrId: addrId, },
    });
  }

  editAddr = async params =>{
    return request('/api/EditAddr', {
      method: 'POST',
      data: { ...params, },
    })
  }  

  checkCart = async () => {
    return request('/api/CheckCart');
  }

  addCart = async params => {
    return request('/api/AddCart', {
      method: 'POST',
      data: { ...params, }
    });
  }

  delCart = async bookId => {
    return request('/api/DelCart', {
      method: 'DELETE',
      data: { bookId: bookId },
    });
  }

  editCart = async params => {
    return request('/api/EditCart', {
      method: 'POST',
      data: { ...params }
    });
  }

  addOrder = async params => {
    return request('/api/addOrder', {
      method: 'POST',
      data: {...params},
    });
  }

  getOrders = async () => {
    return request('/api/GetOrders');
  }

  getOrderDetail = async orderId => {
    return request(`/api/GetOrderDetail?orderId=${orderId}`);
  }

  editOrder = async params => {
    return request('api/EditOrder', {
      method: 'POST',
      data: { ...params },
    })
  }

  delOrder = async orderId => {
    return request('/api/DelOrder', {
      method: 'DELETE',
      data: { orderId },
    })
  }

  payOrder = async orderId => {
    return request(`/api/PayOrder?orderId=${orderId}`);
  }

  userRegister = async params => {
    return request(`/api/user/register?username=${params.username}&password=${params.password}`);
  }

}
export default new ApiUtil();
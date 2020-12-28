import request from '@/utils/request';


const BASE_URL = 'http://mockjs.docway.net/mock/1b5MYNv513x'


export async function getAllItems(){
  return request(BASE_URL+'/api/getAllItems');
}
export async function getAllUser(){
  return request(BASE_URL+'/api/getAllUser');
}
export async function getAllOrder(){
  return request(BASE_URL+'/api/getAllOrders');
}
export async function queryRule(params) {
  return request(BASE_URL+'/api/getAllItems', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

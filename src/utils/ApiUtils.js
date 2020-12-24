import request from '@/utils/request';

export async function getAllItems(){
  return request('http://mockjs.docway.net/mock/1b5MYNv513x/api/getAllItems');
}

export async function queryRule(params) {
  return request('http://mockjs.docway.net/mock/1b5MYNv513x/api/getAllItems', {
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

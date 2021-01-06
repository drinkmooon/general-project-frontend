import request from '@/utils/request';

export async function userAccountLogin(data) {
  return request('/api/user/login/', {
    method: 'POST',
    data,
  })
}

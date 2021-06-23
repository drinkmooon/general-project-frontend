import request from '@/utils/request';
// ! unused file .
export async function userAccountLogin(data) {
  return request('/api/user/login', {
    method: 'POST',
    data,
  })
}

export async function userAccountLogout() {
  return request('/api/user/logout/', {
    method: 'DELETE',
  })
}

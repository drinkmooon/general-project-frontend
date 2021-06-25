import request from '@/utils/request';

export async function userAccountLogin(data) {
  return request('/api/LoginStatus/Login', {
    method: 'POST',
    data,
  })
}

export async function userAccountLogout() {
  return request('/api/LoginStatus/Logout', {
    method: 'POST',
  })
}

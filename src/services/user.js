import request from '@/utils/request';

export async function queryCurrent() {
  return request('/api/users/info');
}

export async function userAccountRegister(data) {
  return request('/api/users/register/', {
    method: 'POST',
    data,
  })
}

export async function userAccountLogin(data) {
  return request('/api/users/login', {
    method: 'POST',
    data,
  })
}

export async function userAccountLogout() {
  return request('/api/users/logout/', {
    method: 'POST',
  })
}

export async function getAllUserList() {
  return request(`/api/users/list`)
}

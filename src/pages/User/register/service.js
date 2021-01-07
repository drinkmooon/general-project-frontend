import request from '@/utils/request'

export async function userAccountRegister(data) {
  return request('/api/user/register/', {
    method: 'POST',
    data,
  })
}

import request from '@/utils/request'

export async function userAccountRegister(data) {
  return request('/api/LoginStatus/Register', {
    method: 'POST',
    data,
  })
}

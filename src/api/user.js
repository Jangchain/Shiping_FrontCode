import request from '@/utils/request'

export function getCode() {
  return request({
    url: '/common/auth/code'
  })
}

export function login(data) {
  return request({
    url: '/common/auth/acct/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/common/auth/acct/logout',
    method: 'post'
  })
}

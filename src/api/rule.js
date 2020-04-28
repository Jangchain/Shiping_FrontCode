import request from '@/utils/request'

// ?current=1&size=10&descs=modifyDate
export function pageRules(params) {
  return request({
    url: '/srd/tactic/rules/getRulesByPage',
    method: 'get',
    params
  })
}

import request from '@/utils/request'

function getTerminalGroupByPage(data) {
  return request.get('endpoint/source/depHostGroup/get/page', {
    params: data
  })
}
function getTerminalListByPage(data) {
  return request.get('endpoint/source/depHost/get/page', {
    params: data
  })
}
export default {
  getTerminalGroupByPage,
  getTerminalListByPage
}

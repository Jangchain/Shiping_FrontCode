import request from '@/utils/request'

function getTerminalByPage(data) {
  return request.get('/network/source/port/get/page', {
    params: data
  })
}
function singleDel(data) {
  return request.post('network/source/port/delete', {
    params: data
  })
}
function batchDel(data) {
  return request.post('network/source/port/delete/all', {
    data
  })
}
export default {
  getTerminalByPage,
  singleDel,
  batchDel
}

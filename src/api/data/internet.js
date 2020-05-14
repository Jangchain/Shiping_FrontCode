import request from '@/utils/request'

function getNetworkPortByPage(data) {
  return request.get('/network/source/port/get/page', {
    params: data
  })
}
function singleDelPort(data) {
  return request.post('network/source/port/delete', data)
}
function batchDelPort(data) {
  return request.post('network/source/port/delete/all', data)
}
export default {
  getNetworkPortByPage,
  singleDelPort,
  batchDelPort
}

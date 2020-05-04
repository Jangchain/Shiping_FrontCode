import request from '@/utils/request'

function getStorageSourceByPage(data) {
  return request.get('/storage/source/get/page', {
    params: data
  })
}
function singleDel(data) {
  return request.post('/storage/source/delete', {
    params: data
  })
}
function batchDel(data) {
  return request.post('/storage/source/delete/all', {
    data
  })
}
export default {
  getStorageSourceByPage,
  singleDel,
  batchDel
}

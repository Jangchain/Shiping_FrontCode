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
function singleIntelligentLearning(data) {
  return request.get('/srd/resource/machineLearning/get/page', {
    params: data
  })
}
function multiIntelligentLearning(data) {
  return request.get('/srd/resource/documentFingerprints/get/page', {
    params: data
  })
}
export default {
  getStorageSourceByPage,
  singleDel,
  batchDel
}

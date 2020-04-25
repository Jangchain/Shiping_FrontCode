import request from '@/utils/request'

export function getContentClassifierByPage(data) {
  return request.get('/srd/resource/contentClassifier/getContentClassifierByPage', {
    params: data
  })
}
export function getFingerPrintsByNativeSql(data) {
  return request.get('/srd/resource/fingerprintsClassifiers/getFingerPrintsByNativeSql', {
    params: data
  })
}
export function getDbFingerPrintsByNativeSql(data) {
  return request.get('/srd/resource/dbFinger/getDbFingerPrintsByNativeSql', {
    params: data
  })
}
export function singleIntelligentLearning(data) {
  return request.get('/srd/resource/machineLearning/get/page', {
    params: data
  })
}
export function multiIntelligentLearning(data) {
  return request.get('/srd/resource/documentFingerprints/get/page', {
    params: data
  })
}

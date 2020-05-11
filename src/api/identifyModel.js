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
export function getFileTypesGroupByFormatGroup(data) {
  return request.get('/srd/resource/contentClassifier/getFileTypesGroupByFormatGroup', {
    params: data
  })
}
export function getApplicationFileType(data) {
  return request.get('/srd/resource/contentClassifier/getApplicationFileType', {
    params: data
  })
}
export function duplicate(data) {
  return request.post('/common/validation/duplicate', data)
}
export function saveContentClassifier(data) {
  return request.post('/srd/resource/contentClassifier/saveContentClassifier', data)
}
export function storageSourceFile(data) {
  return request.get('/storage/source/get/file', {
    params: data
  })
}
export function saveFingerprint(data) {
  return request.post('/srd/resource/fingerprintsClassifiers/save/fingerprint', data)
}

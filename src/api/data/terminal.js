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
function singleDel(data) {
  return request({
    url: "endpoint/source/depHostGroup/delete",
    method: "post",
    params: data
  });
}
function batchDel(data) {
  return request({
    url: "endpoint/source/depHostGroup/delete/all",
    method: "post",
    params: data
  });
}
export default {
  getTerminalGroupByPage,
  getTerminalListByPage,
  singleDel,
  batchDel
}

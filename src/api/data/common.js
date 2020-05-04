import request from '@/utils/request'

function getOrgByPage(data) {
  return request.get('endpoint/source/accountDept/get/page', {
    params: data
  })
}
function getOrgTree(data) {
  return request.get('endpoint/source/get/accountDept/tree', {
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
export default {
  getOrgByPage,
  getOrgTree,
}

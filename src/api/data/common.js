import request from '@/utils/request'

function getOrgByPage(data) {
  return request.get('endpoint/source/accountDept/get/page', {
    params: data
  })
}
function getOrgById(data) {
  return request({
    url: "endpoint/source/accountDept/get",
    method: "post",
    params: data
  });
}
function getOrgTree(data) {
  return request.get('endpoint/source/get/accountDept/tree', {
    params: data
  })
}
function singleDelOrg(data) {
  return request({
    url: "endpoint/source/accountDept/delete",
    method: "post",
    params: data
  });
}
export default {
  getOrgByPage,
  getOrgById,
  getOrgTree,
  singleDelOrg
}

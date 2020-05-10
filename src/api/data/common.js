import request from '@/utils/request'

/* 组织架构 */
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
/* 用户账号 */
//获取用户组资源分页
function getAccountGroupByPage(data) {
  return request.get('endpoint/source/accountGroup/get/page', {
    params: data
  })
}
//获取单个用户组
function getAccountGroupSingle(id) {
  return request.get(`endpoint/source/accountGroup/get/${id}`)
}
function getAccountByPage(data) {
  return request.get('endpoint/source/account/get/page', {
    params: data
  })
}
function batchDelAccount(data) {
  return request.post('endpoint/source/account/delete/all', data)
}

/* 网络区间 */
function getNetWorkByPage(data) {
  return request.get('network/source/networks/get/page', {
    params: data
  })
}
function batchDelNetWork(data) {
  return request.post('network/source/networks/delete/all', data)
}

export default {
  getOrgByPage,
  getOrgById,
  getOrgTree,
  singleDelOrg,

  getNetWorkByPage,
  batchDelNetWork,

  getAccountGroupByPage,
  getAccountGroupSingle,
  getAccountByPage,
  batchDelAccount,
}

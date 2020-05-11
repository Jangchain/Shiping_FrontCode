import request from '@/utils/request'

export function getSiteelements(data) {
  return request.get('srd/system/siteelements/page', {
    params: data
  })
}


export function getSiteelementById(id) {
  return request.get(`srd/system/siteelements/${id}`)
}

export function updatesiteelement(data) {
  return request({
    url: 'srd/system/siteelements/update',
    method: 'post',
    data
  })
}

export function testConnect(ip) {
  return request({
    url: `srd/testConnect/component?ip=${ip}`,
    method: 'get'
  })
}

export function duplicate(data) {
  return request({
    url: 'common/validation/duplicate',
    method: 'post',
    data
  })
}

export function deleteSiteelements(data) {
  return request({
    url: 'srd/system/siteelements/delete',
    method: 'post',
    data
  })
}

export function insertSiteelements(data) {
  return request({
    url: 'srd/system/siteelements/insert',
    method: 'post',
    data
  })
}

export function getRoleList(data) {
  return request.get('common/auth/role/get/page', {
    params: data
  })
}

export function getMenuList() {
  return request.get('common/auth/role/get/menu/list/')
}

export function getRoleById(id) {
  return request.get(`common/auth/role/get/${id}`)
}

export function getMenuListById(id) {
  return request.get(`common/auth/role/get/menu/list/${id}`)
}

export function updateRole(data) {
  return request({
    url: 'common/auth/role/update',
    method: 'post',
    data
  })
}

export function insertRole(data) {
  return request({
    url: 'common/auth/role/insert',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `common/auth/role/delete/${id}`,
    method: 'post',
  })
}

export function deleteRolesAll(data) {
  return request({
    url: `common/auth/role/delete/all`,
    method: 'post',
    data,
  })
}

//获取主机白名单列表
export function getHostwhiteList(data) {
  return request.get('common/security/hostwhite/get/page', {
    params: data
  })
}

//获取详情信息
export function getHostwhiteById(id) {
  return request.get(`common/security/hostwhite/get/${id}`)
}

//更新主机信息
export function updateHostwhite(data) {
  return request({
    url: 'common/security/hostwhite/update',
    method: 'post',
    data
  })
}

//删除主机
export function deleteHostwhiteById(id) {
  return request({
    url: `common/security/hostwhite/delete/${id}`,
    method: 'post',
  })
}

//批量删除主机
export function deleteHostwhiteAll(data) {
  return request({
    url: `common/security/hostwhite/delete/all`,
    method: 'post',
    data,
  })
}

//添加主机
export function insertHostwhite(data) {
  return request({
    url: 'common/security/hostwhite/insert',
    method: 'post',
    data
  })
}

//获取日志列表
export function getEventSafetyLogsByPage(data) {
  return request.get('srd/eventSafety/getEventSafetyLogsByPage', {
    params: data
  })
}

//归档
export function archiveValid() {
  return request.get(`srd/eventSafety/archiveValid`)
}

//归档
export function setEventSafetyLogs(data) {
  return request({
    url: 'srd/eventSafety/setEventSafetyLogs',
    method: 'post',
    data
  })
}

//获取内网IP列表
export function queryIPAndMaskList(data) {
  return request.get('srd/dms/intranet/queryIPAndMaskList', {
    params: data
  })
}

//新建内网IP
export function setIPAndMark(data, id) {
  return request({
    url: `srd/dms/intranet/setIPAndMark?componentId=${id}`,
    method: 'post',
    data
  })
}

export function getDeptTree() {
  return request.get(`common/auth/dept/get/list/tree`)
}

export function getDeptTreeById(id) {
  return request.get(`common/auth/dept/get/list/tree/${id}`)
}

export function getAuthorityList(data, id) {
  return request.get(`common/auth/dept/get/authority/acct/list/${id}`, {
    params: data
  })
}

//添加部门
export function insertDept(data) {
  return request({
    url: `common/auth/dept/insert`,
    method: 'post',
    data
  }) 
}

//删除部门
export function deleteDept(id) {
  return request({
    url: `common/auth/dept/delete/${id}`,
    method: 'post',
  })
}

//获取部门信息
export function getDept(id) {
  return request.get(`common/auth/dept/get/${id}`)
}

//更新部门信息
export function updateDept(data) {
  return request({
    url: `common/auth/dept/update`,
    method: 'post',
    data
  })
}
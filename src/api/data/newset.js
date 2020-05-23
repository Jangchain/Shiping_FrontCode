import request from "@/utils/request";
import { encrypt } from "@/utils";

// 存储资源连接
export function targetResDataRequest(data) {
  if (data.password) {
    data.password = encrypt(data.password);
  }
  if (data.share_password) {
    data.share_password = encrypt(data.share_password);
  }
  return request({
    url: "/storage/source/targetResDataRequest",
    method: "post",
    data
  }).then(res => {
    return res.data
  });
}

// 增加端口资源
export function networkPortInsert({
  name,
  portStartValue,
  portEndValue,
  protocol,
  username,
  componentId,
  description
}) {
  return request({
    url: "network/source/port/insert",
    method: "post",
    data: {
      name,
      portStartValue,
      portEndValue,
      protocol,
      username,
      componentId,
      description
    }
  });
}

// 更新端口资源
export function networkPortUpdate({
  id,
  name,
  portStartValue,
  portEndValue,
  protocol,
  username,
  componentId,
  description
}) {
  return request({
    url: "network/source/port/update",
    method: "post",
    data: {
      id,
      name,
      portStartValue,
      portEndValue,
      protocol,
      username,
      componentId,
      description
    }
  });
}

// 根据ID查询存储资源
export function getTargetResById(id) {
  return request({
    url: `storage/source/getTargetResById/${id}`,
    method: "get",
    data: {}
  }).then(res => {
    return res.data
  });
}

// 保存（修改）存储资源
export function saveTargetRes(data) {
  return request({
    url: `storage/source/saveTargetRes`,
    method: "post",
    data
  }).then(res => {
    return res.data
  });
}

// 增加网络区间
export function publicNetWorkInsert(data) {
  return request.post('network/source/networks/insert', data)
}
// 更新网络区间
export function publicNetWorkUpdate(data) {
  return request.post('network/source/networks/update', data)
}
// 获取单个网络区间
export function publicNetWorkGetSingle(id) {
  return request.get(`network/source/networks/get/${id}`)
}
// 增加用户账号
export function publicAccountInsert(data) {
  return request.post('endpoint/source/account/insert', data)
}
// 更新用户账号
export function publicAccountUpdate(data) {
  return request.post('endpoint/source/account/update', data)
}
// 获取单个用户账号
export function publicAccountGetSingle(id) {
  return request.get(`endpoint/source/account/get/${id}`)
}
//获取部门树
export function getOrgTree(data) {
  return request.get(`endpoint/source/get/accountDept/tree`, {
    params: data
  })
}
//重名校验
export function publicDuplicate(data) {
  return request.post('common/validation/duplicate', data)
}

import request from "@/utils/request";

// 存储资源连接
export function targetResDataRequest({
  domain,
  fileType,
  iType,
  ip,
  password,
  path,
  type,
  username
}) {
  return request({
    url: "/storage/source/targetResDataRequest",
    method: "post",
    data: {
      domain,
      fileType,
      iType,
      ip,
      password,
      path,
      type,
      username
    }
  });
}

export function login(data) {
  return request({
    url: "/common/auth/acct/login",
    method: "post",
    data
  });
}

export function logout() {
  return request({
    url: "/common/auth/acct/logout",
    method: "post"
  });
}

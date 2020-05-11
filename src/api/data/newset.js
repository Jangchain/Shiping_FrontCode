import request from "@/utils/request";
import { encrypt } from "@/utils";

// 存储资源连接
export function targetResDataRequest({
  ip,
  port,
  username,
  password,
  iType,
  type,
  domain,
  databaseType,
  databaseName,
  path,
  sid,
  schemaName,
  serverAddress,
  exchangeEdition,
  lotusServerType,
  keyType,
  publicKey,
  publicKeyName,
  tableName,
  share_username,
  share_password,
  storageBackend,
  storageHostname,
  storageTable,
  indexSearchBackend,
  indexSearchHostname,
  fileType,
  anonymousLogin,
  readOnly,
  site,
  isScanAttachment
}) {
  if (password) {
    password = encrypt(password);
  }
  if (share_password) {
    share_password = encrypt(share_password);
  }
  return request({
    url: "/storage/source/targetResDataRequest",
    method: "post",
    data: {
      ip,
      port,
      username,
      password,
      iType,
      type,
      domain,
      databaseType,
      databaseName,
      path,
      sid,
      schemaName,
      serverAddress,
      exchangeEdition,
      lotusServerType,
      keyType,
      publicKey,
      publicKeyName,
      tableName,
      share_username,
      share_password,
      storageBackend,
      storageHostname,
      storageTable,
      indexSearchBackend,
      indexSearchHostname,
      fileType,
      anonymousLogin,
      readOnly,
      site,
      isScanAttachment
    }
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

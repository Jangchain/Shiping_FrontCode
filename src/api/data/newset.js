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

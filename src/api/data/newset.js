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
  indexSearchHostname
}) {
  return request({
    url: "/storage/source/targetResDataRequest",
    method: "post",
    data: {
      ip,
      port,
      username,
      password: encrypt(password),
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
      indexSearchHostname
    }
  });
}

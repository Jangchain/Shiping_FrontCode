export const tabs = [
  {
    label: "共享文档",
    name: "share",
    resType: "file"
  },
  {
    label: "数据库",
    name: "database",
    resType: "DATABASE"
  },
  {
    label: "FTP",
    name: "ftp",
    resType: "FTP"
  },
  {
    label: "Linux主机",
    name: "linux",
    resType: "SFTP"
  },
  {
    label: "Exchange",
    name: "exchange",
    resType: "EXCHANGE"
  },
  {
    label: "SharePoint",
    name: "sharePoint",
    resType: "SHARE_POINT"
  },
  {
    label: "Lotus",
    name: "lotus",
    resType: "LOTUS"
  },
  {
    label: "webDav",
    name: "webDav",
    resType: "WEBDAV"
  },
  {
    label: "云数据库",
    name: "cloudDatabase",
    resType: "CLOUD_DATABASE"
  },
  {
    label: "云对象存储",
    name: "cloudStorage",
    resType: "CLOUD_OBJECT_SAVE"
  }
];

//resType类型和路由对应关系
export const typeForRoute = {
  FILE_SYSTEM: "share",
  DATABASE: "database",
  FTP: "linux",
  SFTP: "ftp",
  EXCHANGE: "exchange",
  FTP: "ftp",
  SHARE_POINT: "sharePoint",
  LOTUS: "lotus",
  WEBDAV: "webDav",
  CLOUD_DATABASE: "cloudDatabase",
  CLOUD_OBJECT_SAVE: "cloudStorage",
}

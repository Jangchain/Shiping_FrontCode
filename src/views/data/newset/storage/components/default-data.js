import { SpValidators } from "./spValidators";

// 存储类型
export const storageTypeList = [
  {
    label: "阿里OSS",
    value: "ali_oss"
  },
  {
    label: "华为OBS",
    value: "huawei_obs"
  },
  {
    label: "腾讯COS",
    value: "tencent_cos"
  },
  {
    label: "Ceph S3",
    value: "s3"
  }
];

// 类型
export const fileTypeData = [
  {
    label: "Windows文件共享",
    value: "share"
  },
  {
    label: "虚拟机vmdk解析",
    value: "VMDK"
  }
];

// 数据库类型
export const databaseTypeList = [
  {
    label: "MySql",
    value: "MySql"
  },
  {
    label: "MariaDB",
    value: "MariaDB"
  },
  {
    label: "Oracle",
    value: "Oracle"
  },
  {
    label: "SqlServer",
    value: "SqlServer"
  },
  {
    label: "DB2",
    value: "DB2"
  },
  {
    label: "Informix",
    value: "Informix"
  },
  {
    label: "PostgreSql",
    value: "PostgreSql"
  },
  {
    label: "Greenplum",
    value: "Greenplum"
  },
  {
    label: "Sybase",
    value: "Sybase"
  },

  {
    label: "达梦",
    value: "DM"
  },
  {
    label: "金仓",
    value: "Kingbase"
  },
  {
    label: "瀚高",
    value: "HighGo"
  },
  {
    label: "南大通用",
    value: "Gbase"
  },
  {
    label: "神通",
    value: "Shentong"
  },
  {
    label: "神舟",
    value: "Shenzhou"
  },
  {
    label: "虚谷",
    value: "Xugu"
  },
  {
    label: "优炫",
    value: "ux"
  },
  {
    label: "Sqlite",
    value: "Sqlite"
  },
  {
    label: "Access",
    value: "Access"
  },
  {
    label: "Hbase",
    value: "Hbase"
  },
  {
    label: "Redis",
    value: "Redis"
  },
  {
    label: "MongoDB",
    value: "MongoDB"
  },
  {
    label: "Teradata",
    value: "Teradata"
  },
  {
    label: "Cassandra",
    value: "Cassandra"
  },
  {
    label: "图数据库",
    value: "Neo4jv3"
  },
  {
    label: "Orient",
    value: "orient"
  },
  {
    label: "hive",
    value: "hive"
  },
  {
    label: "ElasticSearch",
    value: "ElasticSearch"
  },
  {
    label: "JanusGraph03",
    value: "janusgraph03"
  }
];

export const cloudDatabaseTypeList = [
  {
    value: "MySql",
    label: "MySql"
  },
  {
    value: "Oracle",
    label: "PPAS(高度兼容oracle)"
  },
  {
    value: "SqlServer",
    label: "SqlServer"
  },
  {
    value: "PostgreSql",
    label: "PostgreSql"
  },
  {
    value: "Redis",
    label: "Redis"
  },
  {
    value: "MongoDB",
    label: "MongoDB"
  }
];

export const seMap = {
  FILE_SYSTEM: 'File',
  DATABASE: 'DB',
  EXCHANGE: 'Exchange',
  SHARE_POINT: 'SharePoint',
  LOTUS: 'Lotus',
  FTP: 'Ftp',
  SFTP: 'Sftp',
  DEP: 'DEP',
  WEBDAV: 'webdav',
  CLOUD_DATABASE: 'CloudDatabase',
  CLOUD_OBJECT_SAVE: 'CloudObjectSave',
  MaxCompute: 'MaxCompute'
};

export const portMap = {
  MySql: 3306,
  MariaDB: 3306,
  Oracle: 1521,
  SqlServer: 1433,
  DB2: 50000,
  Informix: 9088,
  FTP: 21,
  SFTP: 22,
  LOTUS: 63148,
  DM: 12345,
  DM6: 12345,
  DM7: 5236,
  Kingbase: 54321,
  Hbase: 9090,
  Redis: 6379,
  MongoDB: 27017,
  PostgreSql: 5432,
  ux: 5432,
  HighGo: 5866,
  Teradata: 1025,
  Greenplum: 5432,
  Sybase: 5000,
  Gbase: 9088,
  Cassandra: 9042,
  Shentong: 2003,
  Shenzhou: 2003,
  Xugu: 5138,
  Neo4j: 7474,
  Neo4jv3: 7687,
  orient: 2480,
  hive: 10000,
  ElasticSearch: 9200
};

// 默认验证规则
export const defalutRules = {
  name: [
    SpValidators.required("请输入信息源名称"),
    { min: 4, max: 50, message: "长度在 4 到 50 个字符", trigger: "blur" }
  ],
  username: [
    SpValidators.required(),
    SpValidators.userNameIllegal(),
    SpValidators.maxLength(255)
  ],
  password: [SpValidators.required()],
  ip: [SpValidators.required(), SpValidators.ip()],
  domain: [SpValidators.domain()],
  port: [SpValidators.required(), SpValidators.port()],
  fileType: [SpValidators.required("请选择类型", "change")],
  databaseType: [SpValidators.required("请选择数据库类型", "change")],
  sid: [SpValidators.required()],
  databaseName: [SpValidators.required()],
  passwordType: [SpValidators.required("请选择密码类型", "change")],
  publicKeyName: [SpValidators.required("请选择秘钥", "change")],
  site: [SpValidators.required()],
  lotusServerType: [SpValidators.required()],
  serverAddress: [SpValidators.required()]
};

import { seMap } from "./default-data";

// 格式化链接
export const formatTargetResData = formData => {
  let data;
  // 数据库和云数据库
  if (
    formData.taskType === "DATABASE" ||
    formData.taskType === "CLOUD_DATABASE"
  ) {
    if (
      [
        "MySql",
        "MariaDB",
        "Hbase",
        "Redis",
        "MongoDB",
        "Cassandra",
        "Neo4jv3",
        "orient",
        "hive",
        "ElasticSearch"
      ].includes(formData.databaseType)
    ) {
      data = {
        username: formData.username.trim(),
        password: formData.password,
        iType: "FetchSchemas",
        type: seMap[formData.taskType],
        databaseType: formData.databaseType,
        ip: formData.ip,
        port: formData.port,
        databaseName: ""
      };
      if (formData.databaseType === "Neo4jv3") {
        data.databaseType = formData.tuVersion;
        data.iType = "FetchTables";
      }
      if (formData.databaseType === "Hbase") {
        delete data.databaseName;
      }
    } else if (formData.databaseType === "Oracle") {
      data = {
        username: formData.username.trim(),
        password: formData.password,
        iType: "FetchSchemas",
        type: seMap[formData.taskType],
        databaseType: formData.databaseType,
        ip: formData.ip,
        port: formData.port,
        databaseName: "",
        sid: formData.sid
      };
    } else if (
      [
        "SqlServer",
        "DB2",
        "Informix",
        "DM",
        "DM6",
        "DM7",
        "Kingbase",
        "PostgreSql",
        "ux",
        "HighGo",
        "Teradata",
        "Greenplum",
        "Sybase",
        "Gbase",
        "Shentong",
        "Shenzhou",
        "Xugu"
      ].includes(formData.databaseType)
    ) {
      data = {
        username: formData.username.trim(),
        password: formData.password,
        iType: "FetchSchemas",
        type: seMap[formData.taskType],
        databaseType: formData.databaseType,
        ip: formData.ip,
        port: formData.port,
        databaseName: formData.databaseName
      };
      if (["DM", "DM6", "DM7"].includes(formData.databaseType)) {
        data.databaseType = formData.dmVersion;
        if (formData.dmVersion === "DM7") {
          delete data.databaseName;
        }
      }
      if (formData.databaseType === "Kingbase") {
        data.databaseType = formData.kingBaseVersion;
      }
    } else if (
      formData.databaseType === "Sqlite" ||
      formData.databaseType === "Access"
    ) {
      data = {
        share_username: formData.username.trim(),
        share_password: formData.password,
        iType: "ResourceList",
        type: "File",
        databaseType: formData.databaseType,
        ip: formData.ip
      };
    } else if (formData.databaseType === "janusgraph03") {
      data = {
        username: formData.username.trim(),
        password: formData.password,
        iType: "FetchTables",
        type: seMap[formData.taskType],
        databaseType: formData.databaseType,
        storageBackend: formData.storageBackend,
        storageHostname: formData.storageHostname,
        storageTable: formData.storageTable,
        indexSearchBackend: formData.indexSearchBackend,
        indexSearchHostname: formData.indexSearchHostname
      };
    }
  }

  // 共享文档
  if (formData.taskType === "FILE_SYSTEM") {
    data = {
      username: formData.username.trim(),
      password: formData.password,
      iType: "ResourceList",
      type: seMap[formData.taskType],
      ip: formData.ip,
      fileType: formData.fileType,
      path: "",
      domain: formData.domain
    };
    if (formData.fileType === "share") {
      data.fileType = "";
    }
  }

  // FTP
  if (formData.taskType === "FTP") {
    console.log(" formData.anonymousLogin", formData.anonymousLogin);
    data = {
      anonymousLogin: formData.anonymousLogin,
      iType: "ResourceList",
      port: formData.port,
      type: seMap[formData.taskType],
      ip: formData.ip,
      domain: formData.domain
    };
    if (formData.anonymousLogin === "1") {
      delete data.username;
      delete data.password;
    } else {
      data.username = formData.username.trim();
      data.password = formData.password;
    }
  }

  // Linux主机
  if (formData.taskType === "SFTP") {
    data = {
      username: formData.username.trim(),
      iType: "ResourceList",
      type: seMap[formData.taskType],
      ip: formData.ip,
      port: formData.port,
      domain: formData.domain,
      keyType: formData.keyType
    };
    if (formData.passwordType === "PUBLIC_KEY") {
      data.keyType = "rsa";
      data.publicKeyName = formData.publicKeyName;
      delete data.password;
    } else {
      data.keyType = "";
      data.password = formData.password;
      delete data.publicKeyName;
    }
  }

  if (formData.taskType === "EXCHANGE") {
    data = {
      username: formData.username.trim(),
      password: formData.password,
      iType: "TestConnection",
      type: seMap[formData.taskType],
      ip: formData.ip,
      domain: formData.domain,
      serverAddress: formData.serverAddress,
      exchangeEdition: formData.exchangeEdition,
      readOnly: "1"
    };
  }

  if (formData.taskType === "SHARE_POINT") {
    data = {
      username: formData.username.trim(),
      password: formData.password,
      iType: "TestConnection",
      site: formData.site,
      type: seMap[formData.taskType],
      ip: formData.ip,
      domain: formData.domain,
      readOnly: "1"
    };
  }

  if (formData.taskType === "LOTUS") {
    data = {
      username: formData.username.trim(),
      password: formData.password,
      iType: "ResourceList",
      type: seMap[formData.taskType],
      ip: formData.ip,
      port: formData.port,
      domain: formData.domain,
      lotusServerType: formData.lotusServerType,
      isScanAttachment: "1"
    };
  }

  if (formData.taskType === "WEBDAV") {
    data = {
      username: formData.username.trim(),
      password: formData.password,
      iType: "TestConnection",
      type: seMap[formData.taskType],
      ip: formData.ip,
      domain: formData.domain,
      serverAddress: formData.serverAddress
    };
  }

  if (formData.taskType === "CLOUD_OBJECT_SAVE") {
    data = {
      username: formData.accessKeyId,
      password: formData.accessKeySecret,
      iType: "ResourceList",
      type: formData.storageType,
      ip: "",
      serverAddress: ""
    };
    // if (this.id) {
    //   data.ip = formData.ip;
    //   data.serverAddress = formData.ip;
    // }
    if (formData.storageType === "ali_oss" || formData.storageType === "s3") {
      data["endPoint"] = formData.endPoint;
    }
  }

  return data;
};

<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      />
    </el-tabs>

    <div v-loading="loading" class="form-content">
      <h3>{{ id ? "编辑" : "新建" }}{{ formTitle }}信息源</h3>
      <el-scrollbar style="height:calc(100vh - 285px)">
        <component
          :is="activeName"
          :id="id"
          ref="strageForm"
          :connect-data="connectData"
          :info="info"
          @loading="handleLoading"
        />
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import share from "./share";
import database from "./database";
import ftp from "./ftp";
import linux from "./linux";
import exchange from "./exchange";
import lotus from "./lotus";
import webDav from "./webDav";
import cloudDatabase from "./cloudDatabase";
import cloudStorage from "./cloudStorage";
import sharePoint from "./sharePoint";
import { getTargetResById, targetResDataRequest } from "@/api/data/newset";
import { deepClone } from "@/utils/index";
const Api = {
  getTargetResById,
  targetResDataRequest
};
const tabs = [
  {
    label: "共享文档",
    name: "share"
  },
  {
    label: "数据库",
    name: "database"
  },
  {
    label: "FTP",
    name: "ftp"
  },
  {
    label: "Linux主机",
    name: "linux"
  },
  {
    label: "Exchange",
    name: "exchange"
  },
  {
    label: "SharePoint",
    name: "sharePoint"
  },
  {
    label: "Lotus",
    name: "lotus"
  },
  {
    label: "webDav",
    name: "webDav"
  },
  {
    label: "云数据库",
    name: "cloudDatabase"
  },
  {
    label: "云对象存储",
    name: "cloudStorage"
  }
];
export default {
  components: {
    share,
    database,
    ftp,
    linux,
    exchange,
    lotus,
    webDav,
    cloudDatabase,
    cloudStorage,
    sharePoint
  },
  data() {
    return {
      tabs,
      activeName: "share",
      errorDialogVisible: true,
      loading: false,
      id: "",
      info: {},
      connectData: {}
    };
  },

  created() {
    const type = this.$route.params.type;
    const tab = this.tabs.find(n => n.name === type);
    if (tab) {
      this.$route.meta.title = tab.label;
      this.formTitle = tab.label;
    }
    this.activeName = type;

    // 是否编辑
    const id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.getInfo(id);
    }
  },

  methods: {
    // tab切换
    handleClick(tab) {
      this.$route.meta.title = tab.label;
      this.$router.push(`/data/newset/storage/${tab.name}`);
    },

    // 处理页面loading
    handleLoading(value) {
      this.loading = value;
    },

    // 获取编辑信息
    getInfo(id) {
      this.loading = true;
      Api.getTargetResById(id)
        .then(res => {
          console.log("res", res);
          const info = res;
          const taskType =
            res.targetRes.resType === "File_VMDK" ||
            res.targetRes.resType === "FILE_SYSTEM"
              ? "FILE_SYSTEM"
              : res.targetRes.resType;

          let connectData = {};
          if (taskType !== "DEP") {
            connectData = {
              id: res.targetRes.id,
              name: res.targetRes.name,
              description: res.targetRes.description,
              // secretLevel: res.targetRes.secretLevel,
              targetId: res.targetResInfos[0].targetResId,
              databaseType: res.targetRes.databaseType,
              storageType: res.targetRes.databaseType,
              ip: res.targetRes.ip,
              lotusServerType: res.targetRes.lotusServerType,
              serverAddress: res.targetRes.serverAddress,
              site: res.targetRes.site,
              port: res.targetRes.port,
              sid: res.targetRes.sid,
              keyType: res.targetRes.keyType,
              passwordType: res.targetRes.passwordType,
              publicKeyName: res.targetRes.publicKeyName,
              databaseName: res.targetRes.databaseName,
              username:
                res.targetRes.databaseType === "Sqlite" ||
                res.targetRes.databaseType === "Access"
                  ? res.targetRes.share_username
                  : res.targetRes.username,
              accessKeyId: res.targetRes.username,
              domain: res.targetRes.domain,
              databaseVersion: res.targetRes.databaseVersion,
              storageHostname: res.targetRes.storageHostname,
              indexSearchHostname: res.targetRes.indexSearchHostname,
              indexSearchBackend: res.targetRes.indexSearchBackend,
              storageTable: res.targetRes.storageTable,
              storageBackend: res.targetRes.storageBackend,
              dmVersion: "",
              kingBaseVersion: "",
              tuVersion: "",
              userTreeChecked: "",
              systemTreeChecked: "",
              userFileTreeChecked: "",
              systemFileTreeChecked: "",
              resourceTreeChecked: "",
              lotusTreeChecked: "",
              linuxTreeChecked: "",
              endPoint: res.targetRes.endPoint || "",
              fileType: "",
              exchangeEdition: res.targetRes.exchangeEdition,
              anonymousLogin: res.targetRes.anonymousLogin,
              userFileTreeSearch: "",
              systemFileTreeSearch: "",
              userTreeSearch: "",
              systemTreeSearch: "",
              resourceTreeSearch: ""
            };
            if (
              connectData.databaseType === "DM6" ||
              connectData.databaseType === "DM7"
            ) {
              connectData.dmVersion = deepClone(connectData.databaseType);
              connectData.databaseType = "DM";
            }
            if (
              connectData.databaseType === "Neo4j" ||
              connectData.databaseType === "Neo4jv3"
            ) {
              connectData.tuVersion = deepClone(connectData.databaseType);
              connectData.databaseType === "Neo4jv3";
            }
            if (
              connectData.databaseType === "Kingbase" ||
              connectData.databaseType === "Kingbase4"
            ) {
              connectData.kingBaseVersion = deepClone(connectData.databaseType);
              connectData.databaseType = "Kingbase";
            }

            // this.form.reset(connectData);

            if (res.targetRes.resType === "File_VMDK") {
              this.$refs.strageForm.ruleForm.fileType = "VMDK";
            }
          }

          console.log("connectData", connectData);

          this.$refs.strageForm.rules.password = [];

          // if (taskType === "DATABASE" || taskType === "CLOUD_DATABASE") {
          //   // // 配置追加
          //   this.appendResourceList = deepClone(res.columnResInfos) || [];
          //   this.primaryKeyList =
          //     deepClone(res.columnPrimaryKeySetInfos) || [];
          //   this.primaryKeyObj = {};
          //   if (res.columnPrimaryKeySetInfos) {
          //     res.columnPrimaryKeySetInfos.forEach(item => {
          //       this.primaryKeyObj[item.tableNameForPrimaryKeySetting] =
          //         item.columnNameForPrimaryKeySetting;
          //     });
          //   }
          // }
          // this.titleForm.reset(res.targetRes);
          // this.cdf.detectChanges();
          // if (
          //   this.taskType !== "DEP" &&
          //   this.connectValid &&
          //   (this.isDraft ? this.info.isConnect === "1" : true)
          // ) {
          //   this.connect(false, false);
          // }

          this.connectData = connectData;

          this.info = info;

          console.log("connectData---info", this.info);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

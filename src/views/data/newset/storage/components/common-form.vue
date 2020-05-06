<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="newRules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <form-group-title title="基本信息" />

      <el-form-item v-if="showFormItem('name')" label="信息源名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入名称" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('description')"
        label="备注"
        prop="description"
      >
        <el-input
          v-model="ruleForm.description"
          resize="none"
          type="textarea"
          placeholder="输入备注"
        />
      </el-form-item>

      <form-group-title title="认证信息" />

      <el-form-item
        v-if="showFormItem('databaseType')"
        label="数据库类型"
        prop="databaseType"
      >
        <el-select
          v-model="ruleForm.databaseType"
          placeholder="请选择数据库类型"
        >
          <el-option
            v-for="item in databaseTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="showFormItem('fileType')"
        label="类型"
        prop="fileType"
      >
        <el-select v-model="ruleForm.fileType" placeholder="请选择类型">
          <el-option
            v-for="item in fileTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="showFormItem('anonymousLogin')"
        label="匿名登录"
        prop="anonymousLogin"
      >
        <el-select
          v-model="ruleForm.anonymousLogin"
          placeholder="请选择是否匿名登录"
        >
          <el-option label="是" value="1" />
          <el-option label="否" value="0" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="showFormItem('ip')" label="IP地址" prop="ip">
        <el-input v-model="ruleForm.ip" placeholder="输入IP地址" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('lotusServerType')"
        label="类型"
        prop="lotusServerType"
      >
        <el-select v-model="ruleForm.lotusServerType" placeholder="请选择类型">
          <el-option label="邮件系统" value="Mail" />
          <el-option label="文档系统" value="Document" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="showFormItem('site')" label="站点" prop="site">
        <el-input v-model="ruleForm.site" placeholder="请输入站点" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('serverAddress')"
        label="服务器地址"
        prop="serverAddress"
      >
        <el-input v-model="ruleForm.serverAddress" placeholder="服务器地址" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('exchangeEdition')"
        label="版本"
        prop="exchangeEdition"
      >
        <el-select v-model="ruleForm.exchangeEdition" placeholder="请选择版本">
          <el-option label="2003" value="2003" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>

      <!-- 图数据库 -->
      <el-form-item
        v-if="
          ruleForm.taskType == 'DATABASE' && ruleForm.databaseType == 'Neo4jv3'
        "
        label="版本"
        prop="tuVersion"
      >
        <el-select v-model="ruleForm.tuVersion" placeholder="请选择版本">
          <el-option label="Neo4j" value="Neo4j" />
          <el-option label="Neo4jv3" value="Neo4jv3" />
        </el-select>
      </el-form-item>

      <!-- 达梦 -->
      <el-form-item
        v-if="ruleForm.taskType == 'DATABASE' && ruleForm.databaseType == 'DM'"
        label="版本"
        prop="dmVersion"
      >
        <el-select v-model="ruleForm.dmVersion" placeholder="请选择版本">
          <el-option label="达梦6" value="DM6" />
          <el-option label="达梦7" value="DM7" />
        </el-select>
      </el-form-item>

      <!-- 金仓 -->
      <el-form-item
        v-if="
          ruleForm.taskType == 'DATABASE' && ruleForm.databaseType == 'Kingbase'
        "
        label="版本"
        prop="kingBaseVersion"
      >
        <el-select v-model="ruleForm.kingBaseVersion" placeholder="请选择版本">
          <el-option label="金仓" value="Kingbase" />
          <el-option label="金仓4" value="Kingbase4" />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="
          showFormItem('port') &&
            ruleForm.databaseType != 'Sqlite' &&
            ruleForm.databaseType != 'Access' &&
            ruleForm.databaseType != 'janusgraph03'
        "
        label="端口"
        prop="port"
      >
        <el-input v-model="ruleForm.port" placeholder="请输入端口" />
      </el-form-item>

      <!-- isJanusgraph03 -->
      <el-form-item
        v-if="isJanusgraph03"
        label="存储端类型"
        prop="storageBackend"
      >
        <el-select
          v-model="ruleForm.storageBackend"
          placeholder="请选择存储端类型"
        >
          <el-option label="Hbase" value="hbase" />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="isJanusgraph03"
        label="存储端地址"
        prop="storageHostname"
      >
        <el-input
          v-model="ruleForm.storageHostname"
          placeholder="请输入存储端地址"
        />
      </el-form-item>

      <el-form-item v-if="isJanusgraph03" label="存储端表" prop="storageTable">
        <el-input
          v-model="ruleForm.storageTable"
          placeholder="请输入存储端表"
        />
      </el-form-item>

      <el-form-item
        v-if="isJanusgraph03"
        label="索引端存储类型"
        prop="indexSearchBackend"
      >
        <el-select
          v-model="ruleForm.indexSearchBackend"
          placeholder="请选择索引端存储类型"
        >
          <el-option label="Elasticsearch" value="elasticsearch" />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="isJanusgraph03"
        label="索引端地址"
        prop="indexSearchHostname"
      >
        <el-input
          v-model="ruleForm.indexSearchHostname"
          placeholder="请输入索引端地址"
        />
      </el-form-item>

      <el-form-item
        v-if="ruleForm.databaseType == 'Oracle'"
        label="SID"
        prop="sid"
      >
        <el-input v-model="ruleForm.sid" placeholder="请输入SID" />
      </el-form-item>

      <el-form-item v-if="isDatabaseName" label="数据库" prop="databaseName">
        <el-input v-model="ruleForm.databaseName" placeholder="请输入数据库" />
      </el-form-item>

      <el-form-item
        v-if="
          ruleForm.taskType == 'FTP'
            ? ruleForm.anonymousLogin === '0'
            : ruleForm.taskType != 'CLOUD_OBJECT_SAVE'
        "
        label="用户名"
        prop="username"
      >
        <el-input v-model="ruleForm.username" placeholder="输入用户名" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('passwordType')"
        label="密码类型"
        prop="passwordType"
      >
        <el-select v-model="ruleForm.passwordType" placeholder="请选择密码类型">
          <el-option label="密码" value="PASSWORD" />
          <el-option label="秘钥" value="PUBLIC_KEY" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="isPassword" label="密码" prop="password">
        <el-input
          v-model.trim="ruleForm.password"
          placeholder="输入密码"
          type="password"
        />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('publicKeyName')"
        v-show="!isPassword"
        label="秘钥"
        prop="publicKeyName"
      >
        <el-select
          v-model="ruleForm.publicKeyName"
          placeholder="请选择秘钥"
          style="width:337px"
        >
          <el-option label="秘钥1" value="key1" />
          <el-option label="秘钥2" value="key2" />
        </el-select>
        <span class="pl-5 pr-5" />
        <el-button type="primary">秘钥管理</el-button>
      </el-form-item>

      <!-- 云对象存储 -->
      <el-form-item
        v-if="ruleForm.taskType == 'CLOUD_OBJECT_SAVE'"
        label="存储类型"
        label-width="180px"
        prop="storageType"
      >
        <el-select v-model="ruleForm.storageType" placeholder="请选择存储类型">
          <el-option
            v-for="item in storageTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="ruleForm.taskType == 'CLOUD_OBJECT_SAVE'"
        label-width="180px"
        label="Access Key ID"
        prop="accessKeyId"
      >
        <el-input
          v-model.trim="ruleForm.accessKeyId"
          placeholder="请输入Access Key ID"
        />
      </el-form-item>

      <el-form-item
        v-if="ruleForm.taskType == 'CLOUD_OBJECT_SAVE'"
        label-width="180px"
        label="Access Key Secret"
        prop="accessKeySecret"
      >
        <el-input
          v-model.trim="ruleForm.accessKeySecret"
          placeholder="请输入Access Key Secret"
        />
      </el-form-item>

      <el-form-item
        v-if="
          ruleForm.taskType == 'CLOUD_OBJECT_SAVE' &&
            (ruleForm.storageType == 'ali_oss' || ruleForm.storageType == 's3')
        "
        label-width="180px"
        label="endPoint"
        prop="endPoint"
      >
        <el-input
          v-model.trim="ruleForm.endPoint"
          placeholder="请输入endPoint"
        />
      </el-form-item>

      <el-form-item v-if="showFormItem('domain')" label="域名" prop="domain">
        <el-input v-model="ruleForm.domain" placeholder="请输入域名" />
      </el-form-item>

      <el-button
        class="test-connect-btn"
        type="primary"
        :loading="testConnectLoading"
        @click="testConnect"
      >测试链接</el-button>

      <el-form-item class="tree-form-item">
        <slot name="tree" />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :disabled="!saveable"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import formGroupTitle from "../../components/form-group-title";
import {
  storageTypeList,
  fileTypeData,
  databaseTypeList,
  cloudDatabaseTypeList,
  portMap,
  defalutRules
} from "./default-data";
import { targetResDataRequest } from "@/api/data/newset";
import { formatTargetResData } from "./common-form";

const Api = {
  targetResDataRequest
};
export default {
  components: {
    formGroupTitle
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      storageTypeList,
      fileTypeData,
      defalutRules,
      // newRules: {},
      ruleForm: {},
      testConnectLoading: false,
      saveable: false
    };
  },
  computed: {
    newRules() {
      return Object.assign({}, this.defalutRules, this.rules);
    },
    databaseTypeList() {
      return this.data.type === "DB" ? databaseTypeList : cloudDatabaseTypeList;
    },

    isPassword() {
      // return this.ruleForm.keyType !== "public_key";
      return this.ruleForm.taskType === "FTP"
        ? this.ruleForm.anonymousLogin === "0"
        : !(
            this.ruleForm.taskType === "SFTP" &&
            this.ruleForm.passwordType === "PUBLIC_KEY"
          ) && this.ruleForm.taskType !== "CLOUD_OBJECT_SAVE";
    },

    isJanusgraph03() {
      return (
        this.ruleForm.taskType === "DATABASE" &&
        this.ruleForm.databaseType === "janusgraph03"
      );
    },

    // 判断是否显示数据库名
    isDatabaseName() {
      const taskType = this.ruleForm.taskType;
      return (
        (taskType === "DATABASE" || taskType === "CLOUD_DATABASE") &&
        ((this.ruleForm.databaseType === "DM" &&
          this.ruleForm.dmVersion === "DM6") ||
          [
            "SqlServer",
            "DB2",
            "Informix",
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
          ].includes(this.ruleForm.databaseType))
      );
    }
  },
  watch: {
    "ruleForm.databaseType": {
      handler(val) {
        this.ruleForm.port = portMap[val];
      },
      immediate: true
    },
    ruleForm: {
      handler(val) {
        this.$emit("change", val);
      },
      deep: true
    },
    data: {
      handler(val) {
        this.ruleForm = this.data;
      },
      immediate: true
    }
  },

  created() {
    console.log("this.data", this.data);
  },
  mounted() {},

  methods: {
    // 测试连接
    testConnect() {
      console.log("测试连接");
      // this.$emit("test-connect", this.ruleForm);
      const connectKeys = Object.keys(this.ruleForm).filter(
        item => !["name", "description"].includes(item)
      );
      let validateStatus = true;
      this.$refs.ruleForm.validateField(connectKeys, errorMsg => {
        if (errorMsg) validateStatus = false;
      });
      if (validateStatus) {
        const formData = Object.assign({}, this.ruleForm);

        console.log("formData.fileType", formatTargetResData(formData));

        this.targetResDataRequest(formatTargetResData(formData));
      }
    },

    // 测试连接请求
    targetResDataRequest(data) {
      this.testConnectLoading = true;
      Api.targetResDataRequest(data)
        .then(res => {
          console.log(res);
        })
        .finally(() => {
          this.testConnectLoading = false;
          this.connectError();
        });
    },

    // 表单提交
    submitForm(formName) {
      console.log("ruleForm", this.ruleForm);
      // this.$emit('validated-data', this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("validated-data", this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 初始化表单
    showFormItem(prop) {
      if (Object.keys(this.data).length) {
        return Object.keys(this.data).includes(prop);
      }
      return true;
    },

    // 连接主机资源失败回调
    connectError() {
      this.$alert(
        `<div class='text-left'>连接失败！请根据以下可能原因进行排查：<br>
        &nbsp;&nbsp;1.目标信息是否填写正确。<br>
        &nbsp;&nbsp;2.未知的用户名或错误密码。<br>
        &nbsp;&nbsp;3.网络连接存在故障。<br>
        &nbsp;&nbsp;4.未知的目标或目标未启动。<br>
        &nbsp;&nbsp;5.端口未开放。<br>
        &nbsp;&nbsp;6.访问权限不足。</div>`,
        "错误",
        {
          dangerouslyUseHTMLString: true
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.test-connect-btn {
  left: 582px;
  top: -58px;
  position: relative;
}
</style>

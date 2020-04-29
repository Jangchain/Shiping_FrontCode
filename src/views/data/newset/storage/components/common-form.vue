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
        v-if="showFormItem('databaseType')"
        label="数据库类型"
        prop="databaseType"
      >
        <el-select v-model="ruleForm.databaseType" placeholder="请选择类型">
          <el-option
            v-for="item in databaseTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="showFormItem('storageType')"
        label="存储类型"
        prop="storageType"
      >
        <el-select v-model="ruleForm.storageType" placeholder="请选择存储类型">
          <el-option
            v-for="item in storageTypeData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
        v-if="showFormItem('anonymousLogin')"
        label="匿名登录"
        prop="anonymousLogin"
      >
        <el-select
          v-model="ruleForm.anonymousLogin"
          placeholder="请选择是否匿名登录"
          @change="handleAnonymousLogin"
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
        <el-select v-model="ruleForm.site" placeholder="请选择站点">
          <el-option label="qq" value="qq" />
          <el-option label="其他" value="other" />
        </el-select>
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
        <el-select
          v-model="ruleForm.exchangeEdition"
          placeholder="请选择是否匿名登录"
          @change="handleAnonymousLogin"
        >
          <el-option label="2003" value="2003" />
          <el-option label="其他" value="other" />
        </el-select>
      </el-form-item>

      <el-form-item v-if="showFormItem('port')" label="端口" prop="port">
        <el-input v-model="ruleForm.port" placeholder="输入端口" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('username')"
        v-show="!isAnonymousLogin"
        label="用户名"
        prop="username"
      >
        <el-input v-model="ruleForm.username" placeholder="输入用户名" />
      </el-form-item>

      <el-form-item
        v-if="showFormItem('keyType')"
        label="密码类型"
        prop="keyType"
      >
        <el-select
          v-model="ruleForm.keyType"
          placeholder="请选择密码类型"
          @change="handleKeyType"
        >
          <el-option label="密码" value="password" />
          <el-option label="秘钥" value="public_key" />
        </el-select>
      </el-form-item>

      <el-form-item
        v-if="showFormItem('password')"
        v-show="!isAnonymousLogin && isPassword"
        label="密码"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
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
          <el-option label="秘钥1" value="public_key" />
          <el-option label="秘钥2" value="password" />
        </el-select>
        <span class="pl-5 pr-5" />
        <el-button type="primary">秘钥管理</el-button>
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
  defalutRules,
  storageTypeData,
  fileTypeData,
  databaseTypeData
} from "./default-data";
import { targetResDataRequest } from "@/api/data/newset";
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
      storageTypeData,
      fileTypeData,
      databaseTypeData,
      defaultForm: {
        name: "", // 信息源名称
        description: "", // 备注
        storageType: "ali_oss", // 存储类型
        fileType: "", // 类型
        ip: "", // ip
        port: "", // 端口
        username: "", // 用户名
        password: "", // 密码
        domain: "", // 域名
        databaseType: "MySql", // 数据库类型
        anonymousLogin: "0", // 匿名登录
        keyType: "password", // 密码类型
        serverAddress: "", // 服务器地址
        exchangeEdition: "", // 版本号
        site: "", // 站点
        lotusServerType: ""
      },
      defalutRules,
      newRules: {},
      ruleForm: {},
      isAnonymousLogin: false,
      isPassword: true,
      testConnectLoading: false,
      saveable: false
    };
  },
  watch: {
    isPassword(val) {
      console.log(val);
    }
  },

  created() {
    this.newRules = Object.assign(this.defalutRules, this.rules);
    console.log("this.data", this.data);
    this.ruleForm = this.data;
  },
  mounted() {
    // this.initForm()
    this.handleAnonymousLogin();
    this.handleKeyType();
  },

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
        this.targetResDataRequest(this.ruleForm);
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

    // 处理匿名登录切换
    handleAnonymousLogin(val) {
      if (!val) {
        val = this.ruleForm.anonymousLogin;
      }
      this.isAnonymousLogin = val === "1";
    },

    // 处理密码类型
    handleKeyType(val) {
      if (!val) {
        val = this.ruleForm.keyType || "password";
      }
      this.isPassword = val === "password";
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

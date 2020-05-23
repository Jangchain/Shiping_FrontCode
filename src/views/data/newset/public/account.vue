<template>
  <div class="internet-create">
    <el-scrollbar style="height:calc(100vh - 285px)">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="internet-form">

        <form-group-title title="用户信息" />

        <el-form-item label="账号" prop="name">
          <el-input clearable v-model="ruleForm.name" placeholder="输入账号" />
        </el-form-item>

        <el-form-item label="姓名" prop="username">
          <el-input clearable v-model="ruleForm.username" placeholder="输入姓名" />
        </el-form-item>

        <el-form-item label="工号" prop="jobNum">
          <el-input clearable v-model="ruleForm.jobNum" placeholder="输入工号" />
        </el-form-item>

        <el-form-item label="手机号码" prop="phone">
          <el-input clearable v-model="ruleForm.phone" placeholder="输入手机号码" />
        </el-form-item>

        <el-form-item label="上级组织" prop="departmentId">
          <selectTree v-if="isShowTree" :options="treeData" :value="ruleForm.departmentId" @getValue="getSelectDepartment($event)" />
        </el-form-item>

        <el-form-item label="IP" prop="ip">
          <el-input clearable v-model="ruleForm.ip" placeholder="输入IP" />
        </el-form-item>

        <el-form-item label="电子邮箱" prop="mail">
          <el-input clearable v-model="ruleForm.mail" placeholder="输入电子邮箱" />
        </el-form-item>

        <el-form-item label="Mac地址" prop="mac">
          <el-input clearable v-model="ruleForm.mac" placeholder="输入Mac地址" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script>
import formGroupTitle from "../components/form-group-title";
import selectTree from "../../components/Tree-select";
import { SpValidators } from "../storage/components/spValidators";
import { publicAccountInsert, publicAccountUpdate, publicAccountGetSingle, getOrgTree } from "@/api/data/newset";
const Request = { publicAccountInsert, publicAccountUpdate, publicAccountGetSingle, getOrgTree }

export default {
  components: {
    formGroupTitle,
    selectTree
  },
  data() {
    return {
      id: "",
      ruleForm: {
        name: "",
        username: "",
        jobNum: "",
        phone: "",
        departmentId: '',
        ip: "",
        mail: "",
        mac: "",
      },
      rules: {
        name: [SpValidators.required(), SpValidators.maxLength(20), SpValidators.userNameIllegal(),
        SpValidators.duplicate({
          entityName: "account_resources",
          checkName: "name"
        })],
        username: [SpValidators.maxLength(20), SpValidators.userNameIllegal()],
        jobNum: [SpValidators.maxLength(128), SpValidators.userNameIllegal()],
        phone: [SpValidators.phone()],
        departmentId: [SpValidators.required()],
        ip: [SpValidators.required(), SpValidators.ip()],
        mail: [SpValidators.maxLength(100), SpValidators.mail()],
        mac: [SpValidators.required(), SpValidators.maxLength(30), SpValidators.mac(),
        SpValidators.duplicate({
          entityName: "account_resources",
          checkName: "mac"
        })],
      },
      treeData: [],
      isShowTree: false
    };
  },
  computed: {
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.updateData()
    }
    this.getOrgTreeData()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.ruleForm);
          data.networkType = this.networkType;
          if (this.id) {
            data.id = this.id;
            this.updateRequest(data);
          } else {
            this.insertRequest(data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 新增
    insertRequest(data) {
      Request.publicAccountInsert(data).then(res => {
        this.$refs['ruleForm'].resetFields();
        this.ruleForm.departmentId = '';
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '保存失败',
          type: 'error'
        });
      });
    },
    // 更新
    updateRequest(data) {
      Request.publicAccountUpdate(data).then(res => {
        this.$refs['ruleForm'].resetFields();
        this.ruleForm.departmentId = '';
        this.$message({
          showClose: true,
          message: '修改成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '修改失败',
          type: 'error'
        });
      });
    },
    //获取更新数据
    async updateData() {
      await Request.publicAccountGetSingle(this.id).then(res => {
        if (res.code === 0) {
          const detail = res.data
          this.ruleForm = {
            name: detail.name,
            username: detail.username,
            jobNum: detail.jobNum,
            phone: detail.phone,
            departmentId: detail.departmentId,
            ip: detail.ip,
            mail: detail.mail,
            mac: detail.mac,
          };
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '获取数据失败',
          type: 'error'
        });
      });
    },
    //获取组织竖表数据
    async getOrgTreeData(filter = {}) {
      await Request.getOrgTree(filter).then(res => {
        if (res.code === 0) {
          this.treeData = this.treeDataFormat(res.data);
          this.isShowTree = true
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '获取部门信息失败',
          type: 'error'
        });
      })
    },
    //竖表格式化
    treeDataFormat(data) {
      data.forEach(val => {
        val.icon = 'el-icon-folder'
        if (val.children && val.children.length > 0) {
          // val.icon = 'el-icon-folder'
          this.treeDataFormat(val.children)
        } else {
          // val.icon = 'el-icon-s-custom'
        }
      })
      return data
    },
    getSelectDepartment(value) {
      this.ruleForm.departmentId = value
    }
  }
};
</script>

<style lang="scss" scoped>
.internet-create {
  >>> .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.internet-form {
  overflow: hidden;
  .el-form--inline {
    >>> .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>

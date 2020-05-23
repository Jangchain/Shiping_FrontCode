<template>
  <div class="internet-create">
    <el-scrollbar style="height:calc(100vh - 285px)">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="internet-form">
        <form-group-title title="基本信息" />

        <el-form-item label="名称" prop="name">
          <el-input clearable v-model="ruleForm.name" placeholder="输入名称" />
        </el-form-item>

        <el-form-item label="类型" prop="networkType">
          <el-select clearable v-model="ruleForm.networkType" placeholder="请选择类型">
            <el-option v-for="item in selectType" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item :label="networkType==='MASK'?'网段':'起始IP'" prop="ipStart">
          <el-input clearable v-model="ruleForm.ipStart" :placeholder="networkType==='MASK'?'输入网段':'输入起始IP'" />
        </el-form-item>

        <el-form-item :label="networkType==='MASK'?'掩码':'结束IP'" prop="ipEnd">
          <el-input clearable v-model="ruleForm.ipEnd" :placeholder="networkType==='MASK'?'输入掩码':'输入结束IP'" />
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
import { SpValidators } from "../storage/components/spValidators";
import { publicNetWorkInsert, publicNetWorkUpdate, publicNetWorkGetSingle } from "@/api/data/newset";
const Request = { publicNetWorkInsert, publicNetWorkUpdate, publicNetWorkGetSingle }
const selectType = [
  { value: 'MASK', label: '网段' },
  { value: 'IP_ADDRESS', label: 'IP区间' },
]
export default {
  components: {
    formGroupTitle
  },
  data() {
    return {
      id: "",
      selectType,
      ruleForm: {
        name: "",
        networkType: "网段",//默认展示网段
        ipStart: "",
        ipEnd: "",
      },
      rules: {
        name: [
          SpValidators.required(),
          SpValidators.maxLength(30),
          SpValidators.userNameIllegal()
        ],
        networkType: [SpValidators.required()],
        ipStart: [SpValidators.required(), SpValidators.ip('请输入正确网段')],
        ipEnd: [SpValidators.required(), SpValidators.mask()],
      }
    };
  },
  computed: {
    networkType() {
      const type = selectType.find(item => item.label === this.ruleForm.networkType);
      return type ? type.value : ''
    }
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.updateData()
    }
    if (this.networkType === 'MASK') {
      this.ipStart = [SpValidators.required(), SpValidators.ip('请输入正确网段')]
      this.ipEnd = [SpValidators.required(), SpValidators.mask()]
    } else {
      this.ipStart = [SpValidators.required(), SpValidators.ip('请输入起始IP')]
      this.ipEnd = [SpValidators.required(), SpValidators.ip('请输入结束IP')]
    }
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
      Request.publicNetWorkInsert(data).then(res => {
        console.log("res", res);
        this.$refs['ruleForm'].resetFields(); this.$message({
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
      Request.publicNetWorkUpdate(data).then(res => {
        console.log("res", res);
        this.$refs['ruleForm'].resetFields();
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
    updateData() {
      Request.publicNetWorkGetSingle(this.id).then(res => {
        const detail = res.data
        this.ruleForm = {
          name: detail.name,
          networkType: detail.networkType === 'MASK' ? '网段' : 'IP区间',
          ipStart: detail.ipStart,
          ipEnd: detail.ipEnd,
        };
      }).catch(err => {
        console.log(err)
        this.$message({
          showClose: true,
          message: '获取数据失败',
          type: 'error'
        });
      });
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

<template>
  <div class="internet-create">
    <h3>新建网络信息源</h3>
    <el-scrollbar style="height:calc(100vh - 285px)">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="internet-form"
      >
        <form-group-title title="基本信息" />

        <el-form-item label="信息源名称" prop="name" required>
          <el-input v-model="ruleForm.name" placeholder="输入名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="ruleForm.remark" placeholder="输入备注" />
        </el-form-item>

        <form-group-title title="范围" />

        <el-form-item label="组织架构" prop="ip">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户账号" prop="username">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <div class="el-form--inline">
          <el-form-item label="IP">
            <el-select v-model="value" placeholder="请选择" style="width:320px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="网域">
            <el-select v-model="value" placeholder="请选择" style="width:188px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="端口区间">
          <el-select v-model="value" placeholder="请选择" style="width:200px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span style="padding:0 20px">到</span>
          <el-select v-model="value" placeholder="请选择" style="width:200px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <form-group-title title="协议" />
        <el-form-item label="用户账号" prop="username">
          <el-select v-model="value" placeholder="请选择" style="width:250px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="URL地址" prop="ip">
          <el-input
            v-model="ruleForm.ip"
            placeholder="输入URL地址"
            style="width:800px"
          />
          <span class="pl-5 pr-5" />
          <el-button type="primary">导入</el-button>
        </el-form-item>
        <el-form-item label="端口" prop="username">
          <el-input v-model="ruleForm.ip" placeholder="输入端口名称" />
        </el-form-item>
        <el-form-item label="相关属性描述" prop="ip">
          <el-input
            v-model="ruleForm.ip"
            placeholder="输入相关属性描述"
            style="width:800px"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >保存</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script>
import formGroupTitle from "../components/form-group-title";
export default {
  components: {
    formGroupTitle
  },
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        }
      ],
      value: ""
    };
  },

  created() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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

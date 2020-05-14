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

        <el-form-item label="信息源名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="输入名称" />
        </el-form-item>

        <el-form-item label="起止端口号" required>
          <el-form-item prop="portStartValue" style="display: inline-block">
            <el-input
              v-model="ruleForm.portStartValue"
              style="width:200px"
              placeholder="输入起始端口"
            />
          </el-form-item>
          <span style="padding: 0 18px">-</span>
          <el-form-item prop="portEndValue" style="display: inline-block">
            <el-input
              v-model="ruleForm.portEndValue"
              style="width:200px"
              placeholder="输入结束端口"
            />
          </el-form-item>
        </el-form-item>

        <el-form-item label="协议" prop="protocol">
          <el-select v-model="ruleForm.protocol" placeholder="请选择协议">
            <el-option
              v-for="item in protocols"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="description">
          <el-input
            v-model="ruleForm.description"
            resize="none"
            type="textarea"
            placeholder="输入备注"
          />
        </el-form-item>

        <!-- <form-group-title title="范围" />

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
        </el-form-item> -->

        <!-- <form-group-title title="协议" />

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
            style="width:600px"
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
            style="width:600px"
          />
        </el-form-item> -->
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
import { SpValidators } from "../storage/components/spValidators";
import { networkPortInsert, networkPortUpdate } from "@/api/data/newset";
const Api = {
  networkPortInsert,
  networkPortUpdate
};

const protocols = [
  {
    value: 21,
    label: "FTP"
  },
  {
    value: 20,
    label: "FTP-DATA"
  },
  {
    value: 990,
    label: "FTPS"
  },
  {
    value: 989,
    label: "FTPS-DATA"
  },
  {
    value: 23,
    label: "TELNET"
  },
  {
    value: 25,
    label: "SMTP"
  },
  {
    value: 110,
    label: "POP"
  },

  {
    value: 143,
    label: "IMAP"
  },
  {
    value: 1521,
    label: "TNS"
  },
  {
    value: 1863,
    label: "MSN"
  },
  {
    value: 80,
    label: "HTTP"
  },
  {
    value: 443,
    label: "HTTPS"
  },
  {
    value: 465,
    label: "SMTPS"
  },
  {
    value: 139,
    label: "SMB"
  },
  {
    value: 65535,
    label: "未知"
  }
];

export default {
  components: {
    formGroupTitle
  },
  data() {
    return {
      id: "",
      protocols,
      ruleForm: {
        name: "",
        portStartValue: "",
        portEndValue: "",
        protocol: "",
        description: ""
      },
      rules: {
        name: [
          SpValidators.required(),
          SpValidators.maxLength(30),
          SpValidators.userNameIllegal()
        ],
        description: [SpValidators.maxLength(80)],
        protocol: [SpValidators.required("请选择协议", "change")],
        portStartValue: [SpValidators.required(), SpValidators.number()],
        portEndValue: [SpValidators.required(), SpValidators.number()]
      }
    };
  },

  computed: {
    protocolValue() {
      const protocol = protocols.find(item => item.label === this.ruleForm.protocol);
      return protocol ? protocol.value : ''
    }
  },

  created() {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const data = Object.assign({}, this.ruleForm);
          if (this.id) {
            data.protocolValue = this.protocolMap[data.protocol];
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
      Api.networkPortInsert(data).then(res => {
        console.log("res", res);
      });
    },

    // 更新
    updateRequest(data) {
      Api.networkPortInsert(data).then(res => {
        console.log("res", res);
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

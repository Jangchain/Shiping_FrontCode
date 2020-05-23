<!-- 新建信息源数据库 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" @change="handleChange">
      <template v-slot:tree>
        <span />
      </template>
    </common-form>
  </div>
</template>
<script>
import commonForm from "./components/common-form";
import { SpValidators } from "./components/spValidators";
export default {
  name: "Database",
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        taskType: "DATABASE",
        type: "DB",
        iType: "FetchSchemas",
        name: "",
        description: "",
        databaseType: "MySql",
        ip: "",
        port: "3306",
        username: "",
        password: "",
        sid: "",
        storageBackend: "hbase",
        storageHostname: "",
        storageTable: "",
        indexSearchBackend: "elasticsearch",
        indexSearchHostname: "",
        tuVersion: "Neo4jv3",
        dmVersion: "DM6",
        databaseName: "",
        kingBaseVersion: "Kingbase"
      },
      rules: {
        username: [
          SpValidators.required(),
          SpValidators.userNameIllegal(),
          SpValidators.maxLength(255)
        ],
        password: [SpValidators.required()],
        storageBackend: [SpValidators.required("请选择存储端类型", "change")],
        storageHostname: [SpValidators.required()],
        storageTable: [SpValidators.required()],
        indexSearchBackend: [
          SpValidators.required("请选择索引端存储类型", "change")
        ],
        indexSearchHostname: [SpValidators.required()],
        tuVersion: [SpValidators.required("请选择版本", "change")],
        dmVersion: [SpValidators.required("请选择版本", "change")]
      }
    };
  },

  created() {},

  methods: {
    handleChange(value) {
      console.log("handleChange", value.databaseType);
      if (value.databaseType !== "MySql") {
        this.handleChangeRules(value.databaseType);
      }
    },

    handleChangeRules(databaseType) {
      if (
        ["Hbase", "Redis", "MongoDB", "ElasticSearch", "janusgraph03"].includes(
          databaseType
        )
      ) {
        this.rules.username = [
          SpValidators.userNameIllegal(),
          SpValidators.maxLength(255)
        ];
        this.rules.password = [SpValidators.maxLength(255)];
      } else {
        this.rules.username = [
          SpValidators.required(),
          SpValidators.userNameIllegal(),
          SpValidators.maxLength(255)
        ];
        this.rules.password = [SpValidators.required()];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.tree-form-item {
  padding: 25px 0;
  >>> .el-card__header {
    padding: 0 20px;
    background-color: #ededed;
  }
}
</style>

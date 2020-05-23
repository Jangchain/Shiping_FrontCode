<!-- 新建信息源共享文档 -->
<template>
  <div>
    <common-form
      ref="commonForm"
      :data="ruleForm"
      :rules="rules"
      @validated-data="handleValidatedData"
    >
      <template v-slot:tree>
        <el-col :span="11">
          <el-card v-if="defineTreeDataIsLoad" class="box-card">
            <div slot="header" class="clearfix">
              <span>自定义分享</span>
            </div>
            <el-scrollbar :vertical="true" style="height:300px;">
              <el-tree
                ref="defineTree"
                :props="defaultProps"
                :load="loadDefineTreeNode"
                :default-expanded-keys="['/']"
                node-key="path"
                lazy
                show-checkbox
                @check="handleDefaultTreeCheckChange"
              >
                <span slot-scope="{ node }" class="span-ellipsis">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col :span="1"><span class="pl-5" /></el-col>
        <el-col :span="11">
          <el-card v-if="defaultTreeDataIsLoad" class="box-card">
            <div slot="header" class="clearfix">
              <span>基础分享</span>
            </div>
            <el-scrollbar :vertical="true" style="height:300px;">
              <el-tree
                ref="defaultTree"
                :props="defaultProps"
                :load="loadDefaultTreeNode"
                :default-expanded-keys="['/']"
                node-key="path"
                lazy
                show-checkbox
                @check="handleDefaultTreeCheckChange"
              >
                <span slot-scope="{ node }" class="span-ellipsis">
                  <span :title="node.label">{{ node.label }}</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </el-card>
        </el-col>
      </template>
    </common-form>
  </div>
</template>
<script>
import commonForm from "./components/common-form";
import { getTargetResById, targetResDataRequest } from "@/api/data/newset";
const Api = {
  getTargetResById,
  targetResDataRequest
};
import { SpValidators } from "./components/spValidators";

export default {
  name: "Share",
  components: {
    commonForm
  },
  props: {
    id: {
      type: [Number, String],
      default: ""
    },

    connectData: {
      type: Object,
      default() {
        return {};
      }
    },

    info: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      ruleForm: {
        taskType: "FILE_SYSTEM",
        type: "File",
        name: "",
        description: "",
        fileType: "share",
        ip: "1.1.1.1",
        username: "admin",
        password: "",
        domain: "",
        iType: "ResourceList"
      },
      rules: {
        password: [SpValidators.required()]
      },
      defaultProps: {
        label: "name",
        children: "children",
        isLeaf: "leaf"
      },
      defaultTreeDataIsLoad: false,
      defaultTreeData: [],
      defineTreeDataIsLoad: false,
      defineTreeData: []
    };
  },

  watch: {
    connectData(val) {
      // 是否编辑
      if (this.id) {
        console.log("是否编辑", this.connectData);
        this.ruleForm = Object.assign({}, this.ruleForm, this.connectData);
        this.$nextTick(() => {
          this.$refs.commonForm.testConnect();
        });
      }
    }
  },

  created() {},

  methods: {
    handleValidatedData(data) {
      console.log("handleValidatedData", data);
    },

    // 编辑获取信息参数处理
    formatGetTreeData(data) {
      const { ip, domain, username } = data.targetRes;
      const formatData = {
        type: "File",
        fileType: "",
        ip,
        username,
        domain,
        targetId: data.targetResInfos[0].targetResId,
        path: "",
        iType: "ResourceList"
      };
      return formatData;
    },

    // 获取信息
    getInfo(id) {
      this.$emit("loading", true);
      Api.getTargetResById(id)
        .then(res => {
          console.log("res", res);
          this.info = res;
          const { name, description, password } = res.targetRes;
          const baseRuleForm = {
            name,
            description,
            password
          };
          const ruleForm = this.formatGetTreeData(res);
          this.ruleForm = Object.assign(
            {},
            this.ruleForm,
            ruleForm,
            baseRuleForm
          );
          this.getDefaultTreeData(ruleForm);

          if (!password) {
            this.rules.password = [SpValidators.maxLength(255)];
          }
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },

    // 获取默认树表信息
    getDefaultTreeData(data) {
      Api.targetResDataRequest(data).then(res => {
        if (res.errCode === 510000) {
          // 默认共享
          let defaultTreeData = [];
          defaultTreeData = this.formatTreeData(res.defaultDir);
          this.defaultTreeData = defaultTreeData;
          this.defaultTreeDataIsLoad = true;
          // 自定义共享
          let defineTreeData = [];
          defineTreeData = this.formatTreeData(res.definedDir);
          this.defineTreeData = defineTreeData;
          this.defineTreeDataIsLoad = true;
          // if (
          //   this.form.value.databaseType == "Access" ||
          //   this.form.value.databaseType == "Sqlite" ||
          //   (this.taskType == "FILE_SYSTEM" &&
          //     this.form.value.fileType == "VMDK")
          // ) {
          //   obj["nocheck"] = true;
          // }
        }
      });
    },

    // 格式化树表信息
    formatTreeData(data, leaf = false) {
      const formatTreeData = [];
      data.forEach((item, index) => {
        const nameArr = item.split("/");
        const obj = {
          name: nameArr[nameArr.length - 1],
          path: "/" + nameArr.slice(1, nameArr.length).join("/"),
          isParent: true,
          parentName: item,
          leaf
        };
        formatTreeData.push(obj);
      });
      return formatTreeData;
    },

    // 获取子节点树表信息
    getTreeData(path, treeName = "Default") {
      const data = this.formatGetTreeData(this.info);
      data.path = path;
      data.dirType = treeName;
      return Api.targetResDataRequest(data).then(res => {
        if (res.errCode === 510000) {
          let fileList = [];
          let dirList = [];
          if (res.fileList && res.fileList.length > 0) {
            fileList = this.formatTreeData(res.fileList, true);
          }
          dirList = this.formatTreeData(res.defaultDir);
          return [...dirList, ...fileList];
        }
      });
    },

    // 基础分享
    loadDefaultTreeNode(node, resolve) {
      this.loadTreeNode(node, resolve, "default");
    },

    // 自定义分享
    loadDefineTreeNode(node, resolve) {
      this.loadTreeNode(node, resolve, "define");
    },

    // 获取树表子元素
    async loadTreeNode(node, resolve, type) {
      if (node.level === 0) {
        return resolve([{ path: "/", name: "/" }]);
      }
      if (node.level === 1) {
        let data = [];
        if (type === "default") {
          data = this.defaultTreeData;
        }
        if (type === "define") {
          data = this.defineTreeData;
        }
        return resolve(data);
      }
      if (node.data) {
        const path = `${node.data.path}`;
        const data = await this.getTreeData(path);
        resolve(data);
      }
    },

    handleDefaultTreeCheckChange(data, checkedArr) {
      this.getCheckedNodes();
    },

    // 获取选择树节点
    getCheckedNodes() {
      const defaultCheckedArr = this.$refs.defaultTree.getCheckedNodes();
      const defineCheckedArr = this.$refs.defineTree.getCheckedNodes();
      const checkedArr = [...defaultCheckedArr, ...defineCheckedArr];
      const formatCheckData = [];
      checkedArr.forEach(item => {
        if (item.name !== "/") {
          formatCheckData.push({
            name: `${item.path}`,
            path: item.parentName
          });
        }
      });
      console.log(formatCheckData);
      return formatCheckData;
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
  .box-card {
    height: 400px;
  }
}
</style>
<style lang="scss">
.tree-form-item {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
    white-space: nowrap;
  }
  .el-tree {
    * {
      white-space: nowrap;
    }
  }
}
.span-ellipsis {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: block;
}
</style>

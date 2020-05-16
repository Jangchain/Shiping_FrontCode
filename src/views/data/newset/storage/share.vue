<!-- 新建信息源共享文档 -->
<template>
  <div>
    <common-form
      :data="ruleForm"
      :rules="rules"
      @validated-data="handleValidatedData"
      @test-connect="testConnect"
    >
      <template v-slot:tree>
        <el-col :span="11">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>自定义分享</span>
            </div>
            <el-tree
              :data="treeData"
              show-checkbox
              node-key="id"
              default-expand-all
              :props="defaultProps"
            />
          </el-card>
        </el-col>
        <el-col :span="1"><span class="pl-5" /></el-col>
        <el-col :span="11">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基础分享</span>
            </div>
            <el-tree
              :props="defaultProps"
              :load="loadDefaultTreeNode"
              lazy
              show-checkbox
              @check-change="handleDefaultTreeCheckChange"
            >
            </el-tree>
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

export default {
  name: "Share",
  components: {
    commonForm
  },
  data() {
    return {
      id: "",
      ruleForm: {
        taskType: "FILE_SYSTEM",
        type: "File",
        name: "",
        description: "",
        fileType: "share",
        ip: "1.1.1.1",
        username: "admin",
        password: "12345",
        domain: "",
        iType: "ResourceList"
      },
      rules: {
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
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1"
                },
                {
                  id: 10,
                  label: "三级 1-1-2"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1"
            },
            {
              id: 6,
              label: "二级 2-2"
            }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1"
            },
            {
              id: 8,
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        label: "label",
        children: "children"
      }
    };
  },

  created() {
    this.id = "7301ac98e27d4aa08f15628e314a6626";
    if (this.id) {
      this.getInfo(this.id);
    }
  },

  methods: {
    handleValidatedData(data) {
      console.log("handleValidatedData", data);
    },

    // 测试连接
    testConnect(data) {
      console.log("测试连接", data);
      // Api.targetResDataRequest(data).then(res => {
      //   console.log(res);
      // });
    },

    // 获取信息
    getInfo(id) {
      this.$emit("loading", true);
      Api.getTargetResById(id)
        .then(res => {
          console.log("res", res);
          this.info = res;
          const { ip, domain, username, name, description } = res.targetRes;
          const ruleForm = {
            taskType: "FILE_SYSTEM",
            type: "File",
            name,
            description,
            fileType: "share",
            ip,
            username,
            password: "",
            domain,
            targetId: res.targetResInfos[0].targetResId,
            path: "",
            iType: "ResourceList"
          };
          this.ruleForm = Object.assign({}, this.ruleForm, ruleForm);
          this.getTreeData(ruleForm);
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    },

    getTreeData(data) {
      if (data.fileType === "share") {
        data.fileType = "";
      }
      delete data.password;
      Api.targetResDataRequest(data).then(res => {
        if (res.errCode === 510000) {
          // 默认共享
          const defaultTreeData = [];
          // 默认共享
          res.defaultDir.forEach((item, index) => {
            const nameArr = item.split("/");
            const obj = {
              id: index + 1,
              pId: 0,
              name: nameArr.slice(1, nameArr.length).join("/"),
              isParent: true,
              parentName: item
            };
            defaultTreeData.push(obj);
            this.defaultTreeData = defaultTreeData;
            // if (
            //   this.form.value.databaseType == "Access" ||
            //   this.form.value.databaseType == "Sqlite" ||
            //   (this.taskType == "FILE_SYSTEM" &&
            //     this.form.value.fileType == "VMDK")
            // ) {
            //   obj["nocheck"] = true;
            // }
          });
          console.log("defaultData", defaultTreeData);
        }
        console.log("res---targetResDataRequest", res);
      });
    },

    loadDefaultTreeNode(node, resolve) {
      console.log(node);
      if (node.level === 0) {
        return resolve([{ label: "region1" }, { label: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.label === "region1") {
        hasChild = true;
      } else if (node.data.label === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              label: "zone" + this.count++
            },
            {
              label: "zone" + this.count++
            }
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },

    handleDefaultTreeCheckChange() {}
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

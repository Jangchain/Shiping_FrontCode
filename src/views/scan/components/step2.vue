<template>
  <div>
    <div id="top1">
      <ul>
        <li>
          <i style="background:#53d1ff;border:solid 3px #dcf6ff">step1</i>
          <i>基本信息</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#DF9DFF;border:solid 3px #f9e9ff">step2</i>
          <i>选取信息源</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#fff;border:solid 3px #5567CD">step3</i>
          <i>规则配置</i>
        </li>
      </ul>
    </div>
    <div id="btm1">
      <p id="txt">选取信息源</p>
      <div>
        <el-tabs type="border-card">
          <el-tab-pane label="存储类目标">
            <step5 />
          </el-tab-pane>
          <el-tab-pane label="终端类目标">
            <step6 />
          </el-tab-pane>
          <el-tab-pane label="网络类目标">
            <step7/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import step5 from "./step5";
import step6 from "./step6";
import step7 from "./step7";
import { sourceGetPage } from "@/api/scan";
export default {
  name: "step2",
  components: {
    step5,
    step6,
    step7,
  },
  data() {
    return {
      value: "",
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      tableHeaderData: [],
      total: 10,
      widthes: 0,
      typesStep2: 0,
      types: [
        {
          value: "file",
          label: "共享文件"
        },
        {
          value: "DATABASE",
          label: "数据库"
        },
        {
          value: "FTP",
          label: "FTP"
        },
        {
          value: "SFTP",
          label: "Linux主机"
        },
        {
          value: "EXCHANGE",
          label: "Exchange"
        },
        {
          value: "SHARE_POINT",
          label: "SharePoint"
        },
        {
          value: "LOTUS",
          label: "Lotus"
        },
        {
          value: "WEBDAV",
          label: "WebDAV"
        },
        {
          value: "CLOUD_DATABASE",
          label: "云数据库"
        },
        {
          value: "CLOUD_OBJECT_SAVE",
          label: "云对象存储"
        }
      ],
      title: [
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "databaseType",
            label: "数据库类型"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "port",
            label: "FTP端口"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "username",
            label: "登录名"
          },
          {
            name: "databaseType",
            label: "认证方式"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "username",
            label: "域名"
          },
          {
            name: "databaseType",
            label: "版本"
          },
          {
            name: "databaseType",
            label: "服务器地址"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "port",
            label: "域名"
          },
          {
            name: "username",
            label: "用户名"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "lotusServerType",
            label: "Lotus类型"
          },
          {
            name: "port",
            label: "端口"
          },
          {
            name: "username",
            label: "用户名"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "lotusServerType",
            label: "资源树"
          },
          {
            name: "username",
            label: "用户名"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "databaseType",
            label: "数据库类型"
          },
          {
            name: "port",
            label: "端口"
          },
          {
            name: "ip",
            label: "IP地址"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ],
        [
          {
            name: "name",
            label: "信息源名称"
          },
          {
            name: "databaseType",
            label: "存储类型"
          },
          {
            name: "Access Key ID",
            label: "id"
          },
          {
            name: "createDate",
            label: "创建时间"
          },
          {
            name: "creator",
            label: "创建者"
          },
          {
            name: "description",
            label: "备注"
          }
        ]
      ],
      list: {}
    };
  },
  methods: {
   /*  select(row) {
      console.log(row);
      this.list = row;
    },
    setCurrentRow(e) {
      console.log(e);
    },
    sourceList() {
      const data = {
        current: this.currentPage,
        size: this.pageSize,
        resType: this.value
      };
      sourceGetPage(data).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.tableData = res.data.records;
          (this.total = Number(res.data.total)),
            (this.currentPage = res.data.current);
        }
      });
    },
    selectChange(value) {
      let _this = this;
      this.types.forEach((item, index) => {
        console.log(index);
        if (item.value === value) {
          // _this.tableHeaderData[0].label = item.label
          _this.tableHeaderData = _this.title[index];
        }
      });
      this.sourceList();
    },
    modifyRowData(val) {
      console.log(val);
    },
    deleteRowData(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    },
    handleSizeChange(val) {
      console.log(val);
    } */
  },
  mounted() {
    this.tableHeaderData = [
      {
        name: "name",
        label: "存储信息源"
      },
      {
        name: "resType",
        label: "类型"
      }
      /* {
        name: "ip",
        label: "IP地址"
      },
      {
        name: "createDate",
        label: "创建时间"
      },
      {
        name: "creator",
        label: "创建者"
      },
      {
        name: "description",
        label: "备注"
      } */
    ];
    // this.sourceList();
    console.log(this.$refs.right)
  }
};
</script>

<style lang="scss" scoped>
#top1 {
  position: relative;
  width: 100%;
  height: 100px;
  background: #2a41c1;
  ul {
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgba(19, 18, 18, 0.123);
  }
  ul li {
    width: 240px;
    height: 120px;
    padding-top: 20px;
    margin-top: -20px;
    margin-right: 0;
    margin-left: 0;
    list-style: none;
    line-height: 100px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background: #fff;
    &:nth-of-type(1) {
      border-radius: 10px 0px 0 0;
    }
    &:nth-of-type(2) {
      border-radius: 0 10px 0 0;
    }
    i {
      &:nth-of-type(1) {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin-top: 20px;
        line-height: 60px;
        text-align: center;
        color: white;
      }
      em {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #fff;
        line-height: 100px;
        margin-top: 44px;
        color: #d4d4d4;
      }
    }
  }
  ul li:nth-child(3) {
    padding-top: 0;
    height: 100px;
    background: #2a41c1;
    margin-top: 0;
    i {
      color: #333;
    }
  }
  ul li:nth-child(4) {
    padding-top: 0;
    height: 100px;
    background: #2a41c1;
    margin-top: 0;
    i {
      color: #333;
    }
  }
}
i {
  font-style: normal;
}
#btm1 {
  width: 100%;
  margin-left: 40px;
  #txt {
    font-size: 24px;
    color: #101010;
    line-height: 2.5rem;
  }
}
</style>
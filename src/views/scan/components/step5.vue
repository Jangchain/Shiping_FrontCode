<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:16px">存储信息源</span>
            <el-select
              style="float: right; padding: 3px 0"
              v-model="value"
              placeholder="请选择"
              @change="selectChange(value)"
            >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <Datatable
            @select="select"
            @setCurrentRow="setCurrentRow"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :isStep2="true"
            :list="list"
            :tableData="tableData"
            :tableHeaderData="tableHeaderData"
            :total="total"
            :widthes="widthes"
            :typesStep2="typesStep2"
            :pageSize="pageSize"
            :currentPage="currentPage"
          ></Datatable>
        </el-card>
      </el-col>
      <el-col :span="2">
        <div id="transferStep">
          <i class="el-icon-arrow-left" @click="left()"></i>
          <i class="el-icon-arrow-right" @click="right()"></i>
        </div>
      </el-col>
      <el-col :span="11">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size:16px">已选信息源</span>
            <el-select
              style="float: right; padding: 3px 0"
              v-model="value"
              placeholder="请选择"
              @change="selectChange(value)"
            >
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <Datatable
            @select="select"
            @setCurrentRow="setCurrentRow"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :isStep2="true"
            :list="list"
            :tableData="tableData1"
            :tableHeaderData="tableHeaderData1"
            :total="total"
            :widthes="widthes"
            :typesStep2="typesStep2"
            :pageSize="pageSize"
            :currentPage="currentPage"
          ></Datatable>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { sourceGetPage } from "@/api/scan";
import Datatable from "../components/data-table";
export default {
  name: "step5",
  components: {
    Datatable
  },
  /* props:{
    select: {
      type: Object,
      default: {}
    }
  }, */
  data() {
    return {
      value: "",
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      tableData1: [],
      tableHeaderData: [],
      tableHeaderData1: [],
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
      list: {},
    };
  },
  methods: {
    select(row) {
      // console.log(row);
      this.list = row;
      // console.log(this.list)
    },
    setCurrentRow(e) {
      // console.log(e);
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
    },
    left(){
      // this.tableData1.splice(this.list,1)
      // sessionStorage.removeItem('storeMessageList')
    },
    right(){
      this.tableData1.push(this.list)
       const list1 = this.tableData1
       sessionStorage.setItem('storeMessageList',JSON.stringify(list1))
       this.$emit("select",list1)
    }
  },
  mounted() {
    this.tableHeaderData = [
      {
        name: "name",
        label: "信息源名称"
      },
      {
        name: "resType",
        label: "类型"
      }
    ];
    this.tableHeaderData1 = [
      {
        name: "name",
        label: "信息源名称"
      },
      {
        name: "resType",
        label: "类型"
      }
    ];
    this.sourceList();
    // this.tableData1 = JSON.parse(sessionStorage.getItem('storeMessageList'))
  }
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
#transferStep{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20vh;
  i{
    border: solid 1px #000;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 30px;
    }
}
</style>
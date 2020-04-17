<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      />
    </el-tabs>
    <h3>新建终端信息源</h3>

    <el-form :model="ruleForm" label-width="120px" class="demo-ruleForm">
      <form-group-title title="基本信息" />

      <el-form-item label="信息源名称" prop="name" required>
        <el-input v-model="ruleForm.name" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="ruleForm.remark"
          resize="none"
          type="textarea"
          placeholder="输入备注"
        />
      </el-form-item>

      <el-form-item label="类型" prop="remark">
        <el-select
          v-model="ruleForm.value"
          placeholder="请选择"
          style="width:250px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <form-group-title title="终端主机" />

      <el-form-item class="table-form-item">
        <el-col :span="11">
          <div class="table-toolbar">
            <div class="table-title">终端信息源列表</div>
            <div class="table-search">
              <el-input
                v-model="ruleForm.input2"
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
              />
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
          <el-table
            :data="tableData"
            border
            stripe
            size="small"
            max-height="520"
            style="width: 100%"
          >
            <el-table-column type="selection" width="40" />
            <el-table-column prop="date" label="信息源名称" />
            <el-table-column prop="address" label="Mac地址" />
            <el-table-column prop="date" label="IP地址" />
            <el-table-column prop="date" label="系统类型" />
            <el-table-column prop="date" label="创建者" />
          </el-table>
          <div class="table-footer">
            <el-button type="primary">添加到终端组</el-button>
          </div>
        </el-col>
        <el-col :span="1"><span class="pl-5" /></el-col>
        <el-col :span="11">
          <div class="table-toolbar">
            <div class="table-title">已选终端信息源</div>
            <div class="table-search">
              <el-input
                v-model="ruleForm.input2"
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
              />
              <el-button type="primary">搜索</el-button>
            </div>
          </div>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            max-height="520"
          >
            <el-table-column type="selection" width="40" />
            <el-table-column prop="date" label="信息源名称" />
            <el-table-column prop="address" label="Mac地址" />
            <el-table-column prop="date" label="IP地址" />
            <el-table-column prop="date" label="系统类型" />
            <el-table-column prop="date" label="创建者" />
          </el-table>
          <div class="table-footer">
            <el-button type="primary">删除</el-button>
          </div>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formGroupTitle from '../components/form-group-title'

const tabs = [
  {
    label: '终端信息源组1',
    name: '1'
  },
  {
    label: '终端信息源组2',
    name: 'database'
  },
  {
    label: '新建信息源组',
    name: 'ftp'
  }
]
export default {
  components: {
    formGroupTitle
  },
  data() {
    return {
      tabs,
      activeName: 'share',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '192.170.15.1',
          address: '00-0C-29-89-BD-1E'
        },
        {
          date: '2016-05-04',
          name: '192.170.15.1',
          address: '00-0C-29-89-BD-1E'
        },
        {
          date: '2016-05-01',
          name: '192.170.15.1',
          address: '00-0C-29-89-BD-1E'
        },
        {
          date: '2016-05-03',
          name: '192.170.15.1',
          address: '00-0C-29-89-BD-1E'
        }
      ]
    }
  },

  created() {
    const type = this.$route.params.type
    const tab = this.tabs.find(n => n.name === type)
    if (tab) {
      this.$route.meta.title = tab.label
      this.formTitle = tab.label
    }
    this.activeName = type
  },

  methods: {
    handleClick(tab) {
      // this.$router.push(`/data/newset/storage/${tab.name}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-form-item {
  >>> .el-table th {
    display: table-cell !important;
  }
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #e5e5e5;
  padding: 0 20px;
  .table-title {
    font-size: 18px;
  }
  .table-search {
    >>> .el-input {
      width: 220px;
      margin-right: 20px;
    }
  }
}
.table-footer {
  background-color: #e5e5e5;
  line-height: 60px;
  text-align: right;
  padding: 0 20px;
}
</style>

<!-- 新建信息源共享文档 -->
<template>
  <div>
    <common-form :data="ruleForm" :rules="rules" @validated-data="handleValidatedData">
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
              :data="treeData"
              show-checkbox
              node-key="id"
              default-expand-all
              :props="defaultProps"
            />
          </el-card>
        </el-col>
      </template>
    </common-form>
  </div>
</template>
<script>
import commonForm from './components/common-form'

export default {
  name: 'Share',
  components: {
    commonForm
  },
  data() {
    return {
      ruleForm: {
        name: '',
        description: '',
        fileType: '',
        ip: '',
        username: '',
        password: '',
        domain: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        storageType: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      },
      treeData: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1'
                },
                {
                  id: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1'
            },
            {
              id: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1'
            },
            {
              id: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },

  created() {},

  methods: {
    handleValidatedData(data) {
      console.log('handleValidatedData', data)
    }
  }
}
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

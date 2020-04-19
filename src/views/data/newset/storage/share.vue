<template>
  <div>
    <common-form />

    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <form-group-title title="基本信息" />

      <el-form-item label="信息源名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="ruleForm.remark" placeholder="输入备注" />
      </el-form-item>

      <form-group-title title="认证信息" />

      <el-form-item label="IP地址" prop="ip" required>
        <el-input v-model="ruleForm.ip" placeholder="输入IP地址" />
      </el-form-item>
      <el-form-item label="用户名" prop="username" required>
        <el-input v-model="ruleForm.username" placeholder="输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password" required>
        <el-input
          v-model="ruleForm.password"
          placeholder="输入密码"
          type="password"
        />
      </el-form-item>
      <el-form-item label="域名" prop="ip">
        <el-input v-model="ruleForm.ip" placeholder="输入域名" />
        <span class="pl-5 pr-5" />
        <el-button type="primary">测试链接</el-button>
      </el-form-item>

      <el-form-item class="tree-form-item">
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
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import formGroupTitle from '../components/form-group-title'
import commonForm from './components/common-form'

export default {
  name: 'Share',
  components: {
    formGroupTitle,
    commonForm
  },
  data() {
    return {
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
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

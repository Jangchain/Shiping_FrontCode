<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="规则名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="规则类型">
        <el-select v-model="form.subsystem">
          <el-option v-for="(v, k) in subSystemList" :key="k" :label="v.title" :value="v.val" />
        </el-select>
      </el-form-item>
      <el-form-item label="严重性">
        <el-select v-model="form.sensitivity">
          <el-option v-for="(v, k) in sensitivityList" :key="k" :label="v.title" :value="v.val" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRulesById } from '@/api/rule'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      formType: 'create',
      form: {
        name: '',
        subsystem: '',
        sensitivity: '',
        description: ''
      },
      subSystemList: [
        { title: '终端扫描规则', val: 0 },
        { title: '存储检测规则', val: 1 },
        { title: '网络监控规则', val: 9 }
      ],
      sensitivityList: [
        { val: 1, title: '很低' },
        { val: 2, title: '低' },
        { val: 3, title: '中等' },
        { val: 4, title: '高' },
        { val: 5, title: '很高' }
      ],
      ruleTypes: ['DiscoveryScan', 'ViolationDetection', '', '', '', '', '', '', '', 'NetworkMonitoring']
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeCreate() {
    if (this.$route.query.id) {
      if (this.$route.query.type === 'ext') {
        this.formType = 'ext'
      } else {
        this.formType = 'edit'
      }
    }
    this.$route.meta.title = {
      create: '新建规则',
      edit: '编辑规则',
      ext: '规则-派生'
    }[this.formType]
    document.title = getPageTitle(this.$route.meta.title)
  },
  created() {
    if (this.$route.query.id) {
      const id = this.$route.query.id
      getRulesById(id).then((r) => {
        this.form.name = r.data.spPlcRules.name
        this.form.subsystem = r.data.spPlcRules.subsystem
        this.form.sensitivity = r.data.spPlcRules.sensitivity
        this.form.description = r.data.spPlcRules.description
      })
    }
  },
  methods: {
    onSubmit() {
    //   if (!this.form.sn) {
    //     this.$message.error('请先填写设备SN')
    //     return false
    //   }
    //   if (this.$route.query.id) {
    //     const id = Number(this.$route.query.id)
    //     const data = _.assign({}, this.form, { id })
    //     delete data.sn
    //     api.device.update(data).then((r) => {
    //       this.$alert('提交成功', '提示', {
    //         callback: () => {
    //           this.$router.push('index')
    //         }
    //       })
    //     })
    //   } else {
    //     this.form.hotelId = this.user.hotelId
    //     api.device.create(this.form).then((r) => {
    //       this.$alert('提交成功', '提示', {
    //         callback: () => {
    //           this.$router.push('index')
    //         }
    //       })
    //     })
    //   }
    }
  }
}
</script>

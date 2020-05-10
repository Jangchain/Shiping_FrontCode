<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="起止时间">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="归档范围">
        <el-select v-model="form.eventType" placeholder="归档范围">
          <el-option v-for="(item,key) in eventTypeMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否删除原记录">
        <el-select v-model="form.isDel" placeholder="是否删除原记录">
          <el-option label="全部" value=""></el-option>
          <el-option v-for="(item,key) in isDelMap" :key="key" :label="item" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="form.comments">
        </el-input>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setEventSafetyLogs } from '@/api/admin'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      form: {
        isDel: '',
        eventType: '',
        comments: '',
        date: ''
      },
      defaultCheckedKeys: [],
      eventTypeMap: {
        1: '网络监控',
        2: '终端扫描',
        3: '存储检查'
      },
      isDelMap: {
        0: '是',
        1: '否'
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeCreate() {
    document.title = getPageTitle('日志归档')
  },
  created() {
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.form.startTime = this.form.date ? this.form.date[0] + ' 00:00:00' : '';
      this.form.endTime = this.form.date ? this.form.date[1] + ' 24:00:00' : '';
      delete(this.form['date'])
      setEventSafetyLogs(this.form).then(r => {
        this.$message.error(r.message)
      })
    },
  }
}
</script>

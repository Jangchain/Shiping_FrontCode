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
      <el-form-item label="生效时间">
        <el-col :span="24"><el-select v-model="form.effictiveTime">
          <el-option v-for="(v, k) in effictiveTimeList" :key="k" :label="v.name" :value="k" />
        </el-select>
        </el-col>
        <template v-if="form.effictiveTime > 2">
          <el-col :span="14">
            <el-checkbox-group v-model="form.weeklyTime">
              <el-checkbox v-for="(v, k) in ['周一', '周二', '周三', '周四', '周五', '周六', '周日']" :key="k" :label="v">{{ v }}</el-checkbox>
            </el-checkbox-group>
          </el-col>
          <el-col :span="10">
            <el-time-picker
              v-model="form.timeRange"
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-col>
        </template>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <p style="margin: 0;">识别模型列表</p>
          <el-form :inline="true">
            <el-form-item style="width: 150px;">
              <el-select v-model="query.queryType" size="mini" placeholder="请选择模型类型">
                <el-option v-for="(v, k) in queryTypeList" :key="k" :label="v.name" :value="k" />
              </el-select>
            </el-form-item>
            <el-form-item style="width: 100px;">
              <el-input v-model="query.name" size="mini" placeholder="模型名称" />
            </el-form-item>
            <el-form-item>
              <el-button size="mini" type="primary" icon="el-icon-search" @click="getList(1)">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table ref="multipleTable" :data="list">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="模型名称" />
            <el-table-column prop="modifiedBy" label="创建者" />
          </el-table>
          <div class="f-ar"><el-pagination :total="pager.total" :page-size="pager.size" background layout="prev,pager,next" @current-change="getList" /></div>
          <div class="f-ar">
            <el-button size="mini" type="primary" @click="select">批量选择</el-button>
          </div>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <p style="margin: 0;">已选识别模型</p>
          <el-form :inline="true">
            <el-form-item label="模式类型">
              <el-select v-model="form.statefulCountType" size="mini">
                <el-option key="0" label="匹配模式" value="MATCHES" />
              </el-select>
            </el-form-item>
            <el-form-item label="匹配方式">
              <el-radio v-model="form.conditionRelationType" label="AND">匹配所有</el-radio>
              <el-radio v-model="form.conditionRelationType" label="OR">匹配任一</el-radio>
              <el-radio v-model="form.conditionRelationType" label="CUSTOMISED">自定义</el-radio>
            </el-form-item>
          </el-form>
          <el-table :data="listSelected">
            <el-table-column prop="name" label="模型名称" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-plus" @click="add(scope.row.id)">加入表达式</el-button>
                <el-button size="mini" type="danger" plain icon="el-icon-delete" @click="remove(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import http from '@/api/http'
import { getRulesById } from '@/api/rule'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'
import _ from 'lodash'

export default {
  data() {
    return {
      formType: 'create',
      form: {
        name: '',
        subsystem: '',
        sensitivity: '',
        description: '',
        effictiveTime: 0,
        weeklyTime: []
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
      ruleTypes: ['DiscoveryScan', 'ViolationDetection', '', '', '', '', '', '', '', 'NetworkMonitoring'],
      effictiveTimeList: [{
          name: '全天生效',
          value: 'ALLDAY'
        }, {
          name: '工作日（默认周一到周五8:00～18:00）',
          value: 'WORKDAY'
        }, {
          name: '非工作日（工作日以外的其他时间）',
          value: 'NOWORKDAY'
        }, {
          name: '自定义',
          value: 'CUSTOM'
        }
      ],
      list: [],
      listSelected: [],
      pager: {
        total: 0,
        size: 10
      },
      query: {
        queryType: 0
      },
      queryTypeList: [{
          name: '匹配模式',
          value: 'PRECICEID_PATTERN',
          url: 'srd/resource/contentClassifier/getContentClassifierByPage'
        }, {
          name: '关键字',
          value: 'KEY_PHRASES',
          url: 'srd/resource/contentClassifier/getContentClassifierByPage'
        }, {
          name: '文档特征',
          value: 'FILE_CHARACTERISTIC',
          url: 'srd/resource/contentClassifier/getContentClassifierByPage'
        }, {
          name: '文档指纹',
          value: 'FILE_FINGERPRINT',
          url: 'srd/resource/fingerprintsClassifiers/getFingerPrintsByNativeSql'
        }, {
          name: '数据库指纹',
          value: 'DATABASE_FINGERPRINT',
          url: 'srd/resource/dbFinger/getDbFingerPrintsByNativeSql'
        }, {
          name: '数据识别',
          value: 'IDENTIFY_DATA',
          url: 'srd/resource/preciseIdNlps/get/page'
        }
      ]
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
      create: '新建数据规则',
      edit: '编辑数据规则',
      ext: '数据规则-派生'
    }[this.formType]
    document.title = getPageTitle(this.$route.meta.title)
  },
  created() {
    if (this.formType !== 'create') {
      const id = this.$route.query.id
      getRulesById(id).then((r) => {
        this.form.name = r.data.spPlcRules.name
        this.form.subsystem = r.data.spPlcRules.subsystem
        this.form.sensitivity = r.data.spPlcRules.sensitivity
        this.form.description = r.data.spPlcRules.description
      })
    }
    this.getList(1)
  },
  methods: {
    getList(page) {
      const query = {
        size: this.pager.size,
        current: page || 1
      }
      if (this.query && this.query.name) {
        query.name = this.query.name
      }
      const queryType = this.queryTypeList[parseInt((this.query || {}).queryType || 0)] || {}
      query.queryType = queryType.value
      http.get('/' + queryType.url, query).then(r => {
        this.pager.total = Number(r.data.total)
        if (['srd/resource/contentClassifier/getContentClassifierByPage', 'srd/resource/preciseIdNlps/get/page'].indexOf(queryType.url) > -1) {
          this.list = _.map(r.data.records, 'spPlcCcContentClassifiers')
        } else {
          this.list = r.data.records
        }
      }).catch(e => {
        console.log(e)
      })
    },
    select() {
      console.log(this.$refs.multipleTable.selection)
      const ids = _.map(this.listSelected, 'id')
      this.$refs.multipleTable.selection.forEach(v => {
        console.log(v, ids)
        if (ids.indexOf(v.id) < 0) {
          ids.push(v.id)
          this.listSelected.push(v)
        }
      })
    },
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

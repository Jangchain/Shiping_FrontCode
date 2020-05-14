<template>
  <div class="app-container">
    <p class="f-ar"><router-link :to="{ path: './' }"><el-button size="mini">返回</el-button></router-link></p>
    <el-form :model="form" label-width="120px">
      <el-form-item label="内网IP">
        <el-input v-model="form.ip" @input="checkInput" />
      </el-form-item>
      <el-form-item label="掩码">
        <el-input v-model="form.mask" @input="checkInput" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="btnDisabled" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setIPAndMark, queryIPAndMaskList } from '@/api/admin'
import { mapGetters } from 'vuex'
import getPageTitle from '@/utils/get-page-title'

export default {
  data() {
    return {
      form: {
        ip: '',
        mask: ''
      },
      btnDisabled: true,
      list: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  beforeCreate() {
    document.title = getPageTitle('新建内网IP')
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log('aaa')
      const post = {
        current: 1,
        size: 10,
        componentId: this.$route.query.id,
      }
      queryIPAndMaskList(post).then(r => {
        this.list = r.data;
      })
    },
    checkInput() {
      const ip = this.form.ip;
      const mask = this.form.mask;

      const ipReg = '^((25[0-5]|2[0-4]\\d|[1]{1}\\d{1}\\d{1}|[1-9]{1}\\d{1}|\\d{1})($|(?!\\.$)\\.)){4}$';
      const maskReg = '^((128|192)|2(24|4[08]|5[245]))(\.(0|(128|192)|2((24)|(4[08])|(5[245])))){3}$';

      const patt1=new RegExp(ipReg);
      const patt2 = new RegExp(maskReg);
      if (patt1.test(ip) && patt2.test(mask)) {
        this.btnDisabled = false
      }
    },
    onSubmit() {
      const post = {};
      post.arrayStr = this.list;
      post.arrayStr.push({
        pszMask: this.form.mask,
        pszIP: this.form.ip
      })
      const id = this.$route.query.id
      setIPAndMark(post, id).then(r => {
        if (r.code === '000') {
          this.$alert('提交成功', '提示', {
            callback: () => {
              this.$router.go(-1)
            }
          })
        }
      }).catch(err => {
        console.log(err);
      });
    },
  }
}
</script>

<template>
  <div>
    <div id="stepall">
      <el-steps :active="active" finish-status="success">
        <el-step>
          <template slot="description">
            <Step7 :form="form" v-if="active == 0" ref="aaa" />
          </template>
        </el-step>
        <el-step>
          <template slot="description">
            <Step5 ref="select" v-if="active == 1" />
          </template>
        </el-step>
        <el-step>
          <template slot="description">
            <Step3 ref="selects" v-if="active == 2" />
          </template>
        </el-step>
        <el-step>
          <template slot="description">
            <Step6 v-if="active == 3" />
          </template>
        </el-step>
      </el-steps>
    </div>
    <div id="btms">
      <el-button
        style="margin-top: 12px;"
        @click="prev"
        v-if="active == 1 || active == 2 ||active == 3"
      >上一步</el-button>
      <el-button
        style="margin-top: 12px;"
        @click="next"
        v-if="active == 0 || active == 1 ||active == 2"
      >下一步</el-button>
      <el-button style="margin-top: 12px;" @click="finish" v-if="active == 3">完成</el-button>
    </div>
  </div>
</template>

<script>
import Step5 from "../components/step5";
import Step3 from "../components/step3";
import Step6 from "../components/step6";
import Step7 from "../components/step7";
import { discoveryTaskSave } from "@/api/scan";
export default {
  components: {
    Step5,
    Step3,
    Step6,
    Step7
  },
  data() {
    return {
      active: 0,
      value: "",
      activename: "",
      form: {},
    };
  },
  methods: {
    prev() {
      --this.active;
      if (this.active < 0) this.active = 0;
      if (this.active == 0) {
        console.log(this.form);
      }
    },
    next() {
      if (this.active++ > 3) this.active = 0;
      if(this.active == 1){
        
        console.log(this.$refs.aaa.form,'-------');
        this.form = this.$refs.aaa.form
      }
       if(this.active == 2){
        console.log(this.$refs.select.list,'+++++++++')
        
      }
      if(this.active == 3){
        console.log(this.$refs.selects.arr)
      }
      
    },
    finish() {
      
    }
  },
  created(){
      
  }
};
</script>
<style lang="scss">
#stepall {
  border-top: solid 20px #031e5e;
  .el-steps {
    width: 100%;
    height: 100px;
    background: #2a41c1;
    display: inline-block;
  }
  .el-step__main {
    margin-top: -30px;
  }
  .el-step__line-inner {
    border: none;
  }
  .el-icon-check:before {
    content: none;
  }
  .el-step__description.is-process {
    width: 90vw;
  }
  .el-step__icon.is-text {
    width: 0px !important;
    height: 0px;
  }
  .el-step.is-horizontal .el-step__line {
    height: 0;
  }
  .el-step__icon-inner {
    color: #2a41c1;
  }
  .el-step__head.is-success {
    color: #2a41c1;
    background: #2a41c1;
  }
  .el-step__icon.is-text {
    border: none;
  }
  .el-step:last-of-type.is-flex {
    max-width: 100%;
  }
}
#btms {
  margin-top: 20px;
  position: fixed;
  top: 90vh;
  left: 200px;
  height: 60px;
  width: 100%;
  z-index: 11;
  .el-button {
    margin-left: 40px;
  }
}
</style>
<style lang="scss" scoped>
</style>
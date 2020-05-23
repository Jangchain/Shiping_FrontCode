<template>
  <div>
    <div id="stepall">
      <el-steps :active="active" finish-status="success">
        <el-step>
          <template slot="description">
            <Step1 :form="form" v-if="active == 0" ref="aaa" />
          </template>
        </el-step>
        <el-step>
          <template slot="description">
            <Step2 ref="select" v-if="active == 1" />
          </template>
        </el-step>
        <el-step>
          <template slot="description">
            <Step3 ref="selects" v-if="active == 2" />
          </template>
        </el-step>
      </el-steps>
    </div>
    <div id="btms">
      <el-button
      type="primary"
        style="margin-top: 12px;"
        @click="prev"
        v-if="active == 1 || active == 2 "
      >上一步</el-button>
      <el-button
        style="margin-top: 12px;"
        @click="next"
        v-if="active == 0 || active == 1"
        type="primary"
      >下一步</el-button>
      <el-button style="margin-top: 12px;" @click="finish" v-if="active == 2">完成</el-button>
    </div>
  </div>
</template>

<script>
import Step1 from "../components/step1";
import Step2 from "../components/step2";
import Step3 from "../components/step3";
import { discoveryTaskUpdate } from "@/api/scan";
export default {
  components: {
    Step1,
    Step2,
    Step3,
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
        console.log(this.$refs,'+++++++++')
        const list = JSON.parse(sessionStorage.getItem('storeMessageList')) 
        console.log(list)
      }
      
        
      
    },
    finish() {
      console.log(this.$refs.selects,"@@@@")
      if(this.$refs.selects.checked){
        this.$refs.selects.checked = 0
      }else{
        this.$refs.selects.checked = 1
      }
      const data = {
        spPlcDiscoveryTasks: {
          blobScan: 1,
          busyBandwidthEnabled: 0,
          busyBandwidthEnd: this.$refs.selects.busyEndTime,
          busyBandwidthLimit: this.$refs.selects.busyBand,
          busyBandwidthStart: this.$refs.selects.busyStartTime,
          checkDate: this.form.data,
          checkOrgName: this.form.unit,
          checkUser: this.form.inspector,
          commonOrCustom: "0",
          definitionType: "C_USER_DEFINE",
          description: this.form.description,
          disc: "FileSystemDiscoveryTask",
          discoveryAgentId: "1258337698578485249",
          discoveryTaskType: "NETWORK_DISCOVERY_TASK",
          elementStatus: "UNSYNCHRONIZED_NEW",
          freeBandwidthEnabled: 0,
          freeBandwidthEnd: this.$refs.selects.leisureEndTime,
          freeBandwidthLimit: this.$refs.selects.leiBand,
          freeBandwidthStart: this.$refs.selects.leisureStartTime,
          fullScanFrequencyType: "ON_POLICY_AND_FP_VERSION_UPDATE",
          guid: "0",
          id: "",
          isAllPolicies: 0,
          isCpuLimitEnabled: 0,
          isEnabled: 1,
          isFileAgeEnabled: this.$refs.selects.isFileAgeEnabled,
          isFileNameEnabled: 0,
          isLargerThanEnabled: this.$refs.selects.isLargerThanEnabled,
          isSmallerThanEnalbed: "0",
          isTableFilterEnabled: 1,
          isTcpProtocolUsed: "1",
          modifiedMonthsAgo: this.$refs.selects.mouth2,
          modifiedWithinMonths: this.$refs.selects.mouth1,
          modifiedFromDate: this.$refs.selects.mouth3,
          modifiedToDate: this.$refs.selects.mouth4,
          name: this.form.name,
          networkScanType: "FILE_SYSTEM",
          ocrPreProcess: 0,
          ocrenabled: 0,
          optlock: 0,
          percentAge: "100",
          percentEnabled: 0,
          scanPeriodType: "WITHIN",
          secretLevel: "",
          sizeLargerThan: this.$refs.selects.maxVolumn,
          sizeSmallerThan: this.$refs.selects.minVolumn,
          subsystem: 1,
          timerAge: "1",
          timerEnabled: 0,
          urlEnabled: this.$refs.selects.checked
          },
        schedulingData: {
          spSchedulingData: {
            continuousStopInterval: 30,
            dayOfWeek: 0,
            endTime: "",
            frequencyType: "ONCE",
            startDate: "2020-05-10 16:48:42",
            startTime: "",
            useInitialRecur: 0,
          },
          dayTimeMap: {}
        },
        rulesGroupIds: ["323f291427764742b612822f331b1383"],
        targetTypeDatas: [
          {
            id: "ad612b56a7574e2b829e0b8034baac5d",
            selectionType: "INCLUDE",
            name: "file",
            entityName: "SpRepoTargetRes"
          }
        ],
        spPolicyOcr: {}
      };
      //添加储存任务
      discoveryTaskUpdate(data).then(res => {
        console.log(res);
      }).catch(err=>err);
      
    }
  },
  mounted(){
  console.log(this.$route.query.list)  
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
  // position: absolute;
  // top: 90vh;
  // left: 200px;
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
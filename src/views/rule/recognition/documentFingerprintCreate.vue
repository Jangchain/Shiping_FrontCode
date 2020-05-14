<template>
  <div class="document-fingerprint-create">
    <div class="create-title"><i class="el-icon-arrow-left" @click="$router.back()"></i> | 文档指纹</div>
    <div class="create-content">
      <el-form label-position="left" label-width="100px">
        <el-divider content-position="left" class="form-article">基本信息</el-divider>
        <el-form-item label="名称">
          <el-input v-model="form.name" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.description" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="指纹类型">
          <el-select v-model="form.isContentSimilarity" placeholder="请选择">
            <el-option value="">请选择</el-option>
            <el-option v-for="(item,key) in types" :key="key" :label="item" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间">
          <effect-time v-model="form"></effect-time>
        </el-form-item>
        <el-divider content-position="left" class="form-article">认证信息</el-divider>
        <el-form-item label="">
          <verify-table v-model="form"></verify-table>
        </el-form-item>
        <el-divider content-position="left" class="form-article">高级配置</el-divider>
        <el-form-item label="">
          <el-button @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import EffectTime from "./components/effectTime";
import VerifyTable from "./components/verifyTable";
import { saveFingerprint } from "@/api/identifyModel";
export default {
  components: { EffectTime, VerifyTable },
  data() {
    return {
      form: {
        frequencyType: "ONCE",
        startDate: new Date(),
        continuousStopInterval: 30,
        dayOfweek: [],
        incldPath: [],
        targetTypeDatas: []
      },
      types: { "0": "精确指纹", "1": "相似指纹", "2": "图片指纹" }
    };
  },
  methods: {
    save() {
      let data = {
        fileFingerprints: {
          id: this.form.id || null,
          isScheduleRunningMode: this.form.frequencyType === "ONCE" ? 0 : 1,
          scanPeriodType: this.form.scanPeriodType,
          isFileNameEnabled: this.form.isFileNameEnabled ? 1 : 0,
          isFileAgeEnabled: this.form.isFileAgeEnabled ? 1 : 0,
          fingerprintAgentId: "1",
          modifiedWithinMonths: this.form.modifiedWithinMonths,
          modifiedMonthsAgo: this.form.modifiedMonthsAgo,
          modifiedFromDate: this.form.dateFilterModifiedFromDate,
          modifiedToDate: this.form.dateFilterModifiedToDate,
          isLargerThanEnabled: this.form.isLargerThanEnabled ? 1 : 0,
          sizeLargerThan: this.form.sizeLargerThan,
          isSmallerThanEnalbed: this.form.isSmallerThanEnalbed ? 1 : 0,
          sizeSmallerThan: this.form.sizeSmallerThan,
          isContentSimilarity: this.form.isContentSimilarity,
          isIgnoreSection: "0" // TODO 指纹匹配模式 是否忽略 1 -->忽略 精确匹配 0 -->不忽略 暂时无用，不知道以后会不会删掉
        },
        schedulingData: {
          spSchedulingData: {
            frequencyType: this.form.frequencyType,
            useInitialRecur: this.form.isCheckedDate ? 1 : 0,
            continuousStopInterval: this.form.continuousStopInterval,
            startDate:
              this.form.frequencyType === "ONCE" ||
              this.form.frequencyType === "CONTINUOUSLY"
                ? this.form.startDate
                : "",
            dayOfWeek: 0,
            startTime: this.form.effectTime[0],
            endTime: this.form.effectTime[1]
          }
          // 'dayTimeMap': { // TODO

          // }
        },
        spPlcCcContentClassifiers: {
          // 'modifiedBy': 'secadmin',
          // 'createdBy': 'dd6d23ebc37e435c9215228269790542',
          id: this.form.id || null,
          optlock: this.form.id ? this.form.optlock : "",
          elementStatus: this.form.id
            ? "UNSYNCHRONIZED_EDIT"
            : "UNSYNCHRONIZED_NEW",
          name: this.form.name,
          description: this.form.description
        },
        targetTypeDatas: this.form.targetTypeDatas,
        incldFilePropertys: [],
        excldFilePropertys: [],
        incldPath: this.form.incldPath,
        excldPath: [],
        incldDisplayedPath: [],
        excldDisplayedPath: []
      };
      this.form.incldPath.forEach(item => {
        const index = item.indexOf("/");
        const el = item.slice(index);
        data.incldDisplayedPath.push(el);
      });
      if (this.form.frequencyType === "WEEKLY") {
        const num = this.form.dayOfweek.reduce((a, b) => {
          return a + b;
        });
        data.schedulingData.spSchedulingData.dayOfWeek = num;
      }

      // 类型过滤
      if (this.form.isFileNameEnabled) {
        let fileType = "";
        if (this.form.fileTypeList) {
          fileType = this.form.fileTypeList.join(";");
        }
        if (this.form.includeFileType === "include") {
          if (fileType === "") {
            data["incldFilePropertys"] = [];
          } else {
            data["incldFilePropertys"] = [
              {
                fileType: fileType || ""
              }
            ];
          }
          data["excldFilePropertys"] = [];
        } else {
          if (fileType === "") {
            data["excldFilePropertys"] = [];
          } else {
            data["excldFilePropertys"] = [
              {
                fileType: fileType || ""
              }
            ];
          }
          data["incldFilePropertys"] = [];
        }
      } else {
        data["excldFilePropertys"] = [];
        data["incldFilePropertys"] = [];
      }

      // 日期过滤
      if (this.form.fileDateType === 1) {
        data["fileFingerprints"][
          "modifiedWithinMonths"
        ] = this.form.modifiedWithinMonths;
        data["fileFingerprints"]["scanPeriodType"] = "WITHIN";
      } else if (this.form.fileDateType === 2) {
        data["fileFingerprints"]["scanPeriodType"] = "MORE_THAN";
        data["fileFingerprints"][
          "modifiedMonthsAgo"
        ] = this.form.modifiedMonthsAgo;
      } else {
        data["fileFingerprints"]["scanPeriodType"] = "BETWEEN";
        data["fileFingerprints"][
          "modifiedFromDate"
        ] = this.form.dateFilterModifiedFromDate;
        data["fileFingerprints"][
          "modifiedToDate"
        ] = this.form.dateFilterModifiedToDate;
      }

      // this.http.post(
      //   "srd/resource/fingerprintsClassifiers/save/fingerprint",
      //   data,
      //   resp => {
      //     if (resp) {
      //       this.deploy(resp);
      //     } else {
      //       this.back();
      //     }
      //   }
      // );
      saveFingerprint(data).then(res => {
        if (res) {
          this.$router.back();
        } else {
          this.$router.back();
        }
      });
      console.log(data);
    }
  }
};
</script>
<style lang="scss">
.document-fingerprint-create{
  .create-title {
    background: rgb(255, 190, 93);
  }
}
</style>

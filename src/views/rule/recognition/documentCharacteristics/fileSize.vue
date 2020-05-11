<template>
  <div>
    <el-form :model="form" class="form" label-width="0">
      <el-form-item label="">
        <el-col :span="2">
          <el-radio v-model="form.compareType" label="CHECK_GREATER_THAN" @change="changeType">最小>=</el-radio>
        </el-col>
        <el-col :span="22">
          <el-input v-model="CHECK_GREATER_THAN.value1" placeholder="大小">
            <i slot="suffix">KB</i>
          </el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="">
        <el-col :span="2">
          <el-radio v-model="form.compareType" label="CHECK_IN_RANGE" @change="changeType">范围</el-radio>
        </el-col>
        <el-col :span="10">
          <el-input v-model="CHECK_IN_RANGE.value1" placeholder="最小">
            <i slot="suffix">KB</i>
          </el-input>
        </el-col>
        <el-col class="line" :span="2" style="text-align:center">至</el-col>
        <el-col :span="10">
          <el-input v-model="CHECK_IN_RANGE.value2" placeholder="最大">
            <i slot="suffix">KB</i>
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        compareType: "CHECK_GREATER_THAN"
      },
      CHECK_GREATER_THAN: { value1: "", value2: "" },
      CHECK_IN_RANGE: { value1: "", value2: "" }
    };
  },
  watch: {
    "CHECK_GREATER_THAN.value1": function(val) {
      this.$emit("merge", "spPlcCcFileTypes", {
        compareType: this.form.compareType,
        value1: val,
        value2: ""
      });
    },
    "CHECK_IN_RANGE.value1": function(val) {
      this.$emit("merge", "spPlcCcFileTypes", {
        compareType: this.form.compareType,
        value1: val,
        value2: this.CHECK_IN_RANGE.value2
      });
    },
    "CHECK_IN_RANGE.value2": function(val) {
      this.$emit("merge", "spPlcCcFileTypes", {
        compareType: this.form.compareType,
        value1: this.CHECK_IN_RANGE.value1,
        value2: val
      });
    }
  },
  methods: {
    changeType(type) {
      switch (type) {
        case "CHECK_GREATER_THAN":
          this.CHECK_IN_RANGE = { value1: "", value2: "" };
          break;
        case "CHECK_IN_RANGE":
          this.CHECK_GREATER_THAN = { value1: "", value2: "" };
          break;
      }
    }
  }
};
</script>

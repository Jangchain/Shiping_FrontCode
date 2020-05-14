<template>
  <div>
    <el-form :model="form" class="form" label-width="100px">
      <el-form-item label="文件创建时间">
        <el-col :span="2">
          <el-checkbox v-model="form.create" @change="combineData"></el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-select v-model="createForm.createTimeCondition" placeholder="请选择" :disabled="!form.create" @change="combineData">
            <el-option v-for="(item,key) in conditionMap" :key="key" :label="item" :value="key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-date-picker v-model="createForm.createTime" :disabled="!form.create" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="combineData">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="文件修改时间">
        <el-col :span="2">
          <el-checkbox v-model="form.modify" @change="combineData"></el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-select v-model="modifyForm.modifyTimeCondition" placeholder="请选择" :disabled="!form.modify" @change="combineData">
            <el-option v-for="(item,key) in conditionMap" :key="key" :label="item" :value="key">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-date-picker v-model="modifyForm.modifyTime" :disabled="!form.modify" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" @change="combineData">
          </el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: { create: false, modify: false },
      conditionMap: { "0": "早于", "1": "晚于" },
      createForm: {
        createEndTime: null,
        createTime: null,
        createTimeCondition: "0"
      },
      modifyForm: {
        modifyEndTime: null,
        modifyTime: null,
        modifyTimeCondition: "0"
      }
    };
  },
  methods: {
    combineData() {
      let obj = {};
      if (this.form.create) {
        obj = Object.assign(obj, this.createForm);
      }
      if (this.form.modify) {
        obj = Object.assign(obj, this.modifyForm);
      }
      this.$emit("merge", "fileTime", obj);
    }
  }
};
</script>

<template>
  <div>
    <div><i class="el-icon-arrow-left" @click="$router.back()"></i> 关键字</div>
    <div>
      <el-form inline :model="form.spPlcCcContentClassifiers" class="form">
        <el-form-item label="名称">
          <el-input v-model="form.spPlcCcContentClassifiers.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.spPlcCcContentClassifiers.contentClassifierType" placeholder="类型" @change="changeType">
            <el-option v-for="(item,key) in contentClassifierTypeMap" :key="key" :label="item" :value="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.spPlcCcContentClassifiers.description" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div v-if="form.spPlcCcContentClassifiers.contentClassifierType == 'KEY_PHRASES'">

      </div>
      <div v-else-if="form.spPlcCcContentClassifiers.contentClassifierType == 'KEY_PHRASES_COUPLE'">
        <label>关键字对配置</label>
        <el-form :model="form.keyPhrasesCouple" class="form" style="width:500px" label-position="top">
          <el-form-item>
            <el-col :span="11">
              <el-input v-model="form.keyPhrasesCouple.value1" placeholder="关键字1"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align:center">至</el-col>
            <el-col :span="11">
              <el-input v-model="form.keyPhrasesCouple.value2" placeholder="关键字2"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="词组间距">
            <div>
              <el-slider v-model="form.spPlcCcContentClassifiers.phrasesSpacing" :min="1" :max="50">
              </el-slider>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-else-if="form.spPlcCcContentClassifiers.contentClassifierType == 'LEXICON'">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        spPlcCcContentClassifiers: {
          name: "",
          description: "",
          contentClassifierType: "KEY_PHRASES"
        }
      },
      contentClassifierTypeMap: {
        KEY_PHRASES: "单个关键字",
        KEY_PHRASES_COUPLE: "关键字对",
        LEXICON: "关键字组"
      }
    };
  },
  methods: {
    changeType(type) {
      switch (type) {
        case "KEY_PHRASES":
          this.form.keyPhrases = {};
          break;
        case "KEY_PHRASES_COUPLE":
          this.form.keyPhrasesCouple = {
            value1: "",
            value2: "",
            phrasesSpacing: 1
          };
          break;
        case "LEXICON":
          this.form.lexiconsItemList = [];
          break;
      }
    }
  }
};
</script>

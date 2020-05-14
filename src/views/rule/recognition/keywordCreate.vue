<template>
  <div class="keyword-create">
    <div class="create-title"><i class="el-icon-arrow-left" @click="$router.back()"></i> | 关键字</div>
    <div class="create-content">
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
        <label>单个关键词</label>
        <el-form :model="form.keyPhrases" class="form" style="width:500px" label-position="left" label-width="100px">
          <el-form-item>
            <el-checkbox v-model="form.keyPhrases.isMatchWhole" true-label="1" false-label="0">是否精确匹配</el-checkbox>
          </el-form-item>
          <el-form-item label="关键字">
            <el-input v-model="form.keyPhrases.value" placeholder="关键字"></el-input>
          </el-form-item>
          <el-form-item label="字符间距">
            <el-input-number v-model="form.keyPhrases.letterSpace" controls-position="right" :min="0" :max="5"></el-input-number>
          </el-form-item>
        </el-form>
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
        <label>关键字组</label>
        <div>
          <el-button @click="addKeyword">添加行</el-button>
        </div>
        <el-form class="form" style="width:500px" label-position="left" label-width="100px">
          <el-form-item v-for="(item,key) in form.lexiconsItemList" :key="key">
            <el-col :span="6">
              <el-input v-model="item.value" placeholder="关键字"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="item.isCaseSensitive" placeholder="是否精确匹配">
                <el-option v-for="(val,index) in ['否','是']" :key="index" :label="val" :value="Number(index)"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <el-input-number v-model="item.weight" controls-position="right" :min="1" :max="999"></el-input-number>
            </el-col>
            <el-col :span="6">
            </el-col>
          </el-form-item>
        </el-form>
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
        },
        keyPhrases: {
          isSegmentation: "0",
          isMatchWhole: "0",
          value: "",
          letterSpace: 0
        }
      },
      contentClassifierTypeMap: {
        KEY_PHRASES: "单个关键字",
        KEY_PHRASES_COUPLE: "关键字对",
        LEXICON: "关键字组"
      }
    };
  },
  created() {},
  methods: {
    changeType(type) {
      switch (type) {
        case "KEY_PHRASES":
          delete this.form.keyPhrasesCouple;
          delete this.form.lexiconsItemList;
          this.form.keyPhrases = {
            isSegmentation: "0",
            isMatchWhole: "0",
            value: "",
            letterSpace: 0
          };
          break;
        case "KEY_PHRASES_COUPLE":
          delete this.form.keyPhrases;
          delete this.form.lexiconsItemList;
          this.form.keyPhrasesCouple = {
            value1: "",
            value2: "",
            phrasesSpacing: 1
          };
          break;
        case "LEXICON":
          delete this.form.keyPhrases;
          delete this.form.keyPhrasesCouple;
          this.$set(this.form, "lexiconsItemList", []);
          this.form.lexiconsItemList.push({
            pccLexiconId: "",
            elementIndex: 0,
            weight: 1,
            lexiconType: "Phrase",
            value: "",
            isCaseSensitive: 0
          });
          break;
      }
    },
    addKeyword() {
      const index = this.form.lexiconsItemList.length;
      this.form.lexiconsItemList.push({
        pccLexiconId: "",
        elementIndex: index,
        weight: 1,
        lexiconType: "Phrase",
        value: "",
        isCaseSensitive: 0
      });
    }
  }
};
</script>
<style lang="scss">
.keyword-create{
  .create-title{
     background: rgb(223, 145, 255);
  }
}
</style>

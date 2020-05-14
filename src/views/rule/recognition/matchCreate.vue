<template>
  <div class="match-create">
    <div class="create-title"><i class="el-icon-arrow-left" @click="$router.back()"></i> | 匹配模式</div>
    <div class="create-content">
      <el-form label-width="100px" label-position="left">
        <el-form-item label="名称">
          <el-input v-model="form.spPlcCcContentClassifiers.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.spPlcCcContentClassifiers.description" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="正则表达式">
          <el-input v-model="form.pattern.value" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-radio-group v-model="excludeType" @change="excludeChange">
            <el-radio :label="1">普通排除模式</el-radio>
            <el-radio :label="2">短语排除模式</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="excludeType === 1 && form.excludItemList[0]" label="">
          <el-input v-model="form.excludItemList[0].value" type="textarea"></el-input>
        </el-form-item>
        <el-form-item v-if="excludeType === 2" label="">
          <el-row>
            <el-col :span="10">
              <el-input v-model="tmpWord" placeholder="关键字"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" :disabled="!tmpWord" @click="addNewWord">添加</el-button>
            </el-col>
          </el-row>
          <div>
            <el-tag v-for="(item,key) in form.excludItemList" :key="key" closable>{{ item.value }}</el-tag>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        spPlcCcContentClassifiers: {
          contentClassifierType: "PRECICEID_PATTERN",
          description: "",
          name: "",
          hasExcludeValue: "1"
        },
        pattern: { value: "" },
        excludItemList: [
          {
            ccId: "",
            lexiconType: "PATTERN",
            value: "",
            weight: 0,
            elementIndex: 0
          }
        ]
      },
      excludeType: 1,
      tmpWord: ""
    };
  },
  methods: {
    excludeChange(value) {
      switch (value) {
        case 1:
          this.$set(this.form, "excludItemList", [
            {
              ccId: "",
              lexiconType: "PATTERN",
              value: "",
              weight: 0,
              elementIndex: 0
            }
          ]);
          break;
        case 2:
          this.form.excludItemList = [];
          break;
      }
    },
    addNewWord() {
      const tmp = {
        ccId: "",
        lexiconType: "PHRASE",
        value: this.tmpWord,
        weight: 1
      };
      this.form.excludItemList.push(tmp);
      this.tmpWord = "";
    },
    save() {
      if (this.excludeType === 1 && this.form.excludItemList[0].value === "") {
        this.form.spPlcCcContentClassifiers.hasExcludeValue = "0";
      }
      if (this.excludeType === 2) {
        let i = 0;
        this.form.excludItemList.map(e => {
          e.elementIndex = i;
          i++;
        });
      }
      console.log(this.form);
    }
  }
};
</script>
<style lang="scss">
.match-create {
  .create-title {
    background: rgb(122, 225, 121);
  }
}
</style>

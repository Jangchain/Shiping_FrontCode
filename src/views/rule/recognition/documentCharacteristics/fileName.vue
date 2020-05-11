<template>
  <div>
    <el-form inline :model="form" class="form">
      <el-form-item label="名称">
        <el-input v-model="form.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" :disabled="dynamicTags.length >= 15" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    <div class="tag-wrap">
      <el-tag v-for="(tag,key) in dynamicTags" :key="key" closable :disable-transitions="true" @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      dynamicTags: []
    };
  },
  methods: {
    add() {
      if (this.dynamicTags.includes(this.form.name)) {
        return false;
      }
      this.dynamicTags.push(this.form.name);
      this.form.name = "";
      this.$emit("merge", "fileTypeIdArrs", this.dynamicTags);
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.$emit("merge", "fileTypeIdArrs", this.dynamicTags);
    }
  }
};
</script>
<style lang="scss" scoped>
.tag-wrap {
  display: flex;
  .el-tag {
    margin-right: 10px;
  }
}
</style>

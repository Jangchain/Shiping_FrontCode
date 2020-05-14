<template>
  <div>
    <el-form inline :model="form" class="form">
      <el-form-item label="文件作者">
        <el-input v-model="form.author" placeholder="文件作者"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  watch: {
    "form.author": function(val) {
      this.$emit("merge", "fileOwner", { author: val });
    }
  }
};
</script>

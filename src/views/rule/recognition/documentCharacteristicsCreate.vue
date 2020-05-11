<template>
  <div class="document-characteristics-create">
    <div class="create-title">
      <i class="el-icon-arrow-left" @click="$router.back()"></i>
      | 文档特征
    </div>
    <div class="create-content">
      <el-form inline ref="ruleForm" :model="form.spPlcCcContentClassifiers" :rules="rules" class="form">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.spPlcCcContentClassifiers.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.spPlcCcContentClassifiers.description" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="文件类型" name="fileType">

          </el-tab-pane>
          <el-tab-pane label="文件名称" name="fileName">

          </el-tab-pane>
          <el-tab-pane label="文件大小" name="fileSize">

          </el-tab-pane>
          <el-tab-pane label="文件作者" name="fileOwner">

          </el-tab-pane>
          <el-tab-pane label="文件时间" name="fileTime">

          </el-tab-pane>
        </el-tabs>
        <file-type v-if="activeName === 'fileType'" @merge="mergeData"></file-type>
        <file-name v-else-if="activeName === 'fileName'" @merge="mergeData"></file-name>
        <file-size v-else-if="activeName === 'fileSize'" @merge="mergeData"></file-size>
        <file-author v-else-if="activeName === 'fileOwner'" @merge="mergeData"></file-author>
        <file-time v-else-if="activeName === 'fileTime'" @merge="mergeData"></file-time>
      </div>
      <div>
        <el-button type="primary" :disabled="saveDisabled" @click="save()">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import fileType from "./documentCharacteristics/fileType";
import fileName from "./documentCharacteristics/fileName";
import fileAuthor from "./documentCharacteristics/fileAuthor";
import fileSize from "./documentCharacteristics/fileSize";
import fileTime from "./documentCharacteristics/fileTime";
import { duplicate, saveContentClassifier } from "@/api/identifyModel";
export default {
  components: { fileType, fileName, fileAuthor, fileSize, fileTime },
  data() {
    var validateName = async (rule, value, callback) => {
      const result = await duplicate({
        entityName: "sp_plc_cc_content_classifiers",
        checkName: "name",
        checkValue: value,
        conditions: {
          CONTENT_CLASSIFIER_TYPE: this.form.spPlcCcContentClassifiers
            .contentClassifierType
        }
      });
      if (result.data === true) {
        callback();
      } else {
        callback(new Error("输入内容已存在，请修改"));
      }
    };
    return {
      activeName: "fileType",
      form: {
        spPlcCcContentClassifiers: {
          contentClassifierType: "FILE_TYPE",
          description: "",
          name: ""
        }
      },
      saveDisabled: true,
      rules: {
        name: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "fileType":
          this.form.spPlcCcContentClassifiers.contentClassifierType =
            "FILE_TYPE";
          this.form = {
            spPlcCcContentClassifiers: this.form.spPlcCcContentClassifiers,
            fileTypeIdArrs: []
          };
          break;
        case "fileName":
          this.form.spPlcCcContentClassifiers.contentClassifierType =
            "FILE_NAME";
          this.form = {
            spPlcCcContentClassifiers: this.form.spPlcCcContentClassifiers,
            fileTypeIdArrs: []
          };
          break;
        case "fileSize":
          this.form.spPlcCcContentClassifiers.contentClassifierType =
            "FILE_SIZE";
          this.form = {
            spPlcCcContentClassifiers: this.form.spPlcCcContentClassifiers,
            spPlcCcFileTypes: {}
          };
          break;
        case "fileOwner":
          this.form.spPlcCcContentClassifiers.contentClassifierType =
            "FILE_OWNER";
          this.form = {
            spPlcCcContentClassifiers: this.form.spPlcCcContentClassifiers,
            fileOwner: { author: "" }
          };
          break;
        case "fileTime":
          this.form.spPlcCcContentClassifiers.contentClassifierType =
            "FILE_TIME";
          this.form = {
            spPlcCcContentClassifiers: this.form.spPlcCcContentClassifiers,
            fileTime: {}
          };
          break;
      }
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.saveDisabled = false;
        } else {
          this.saveDisabled = true;
          return false;
        }
      });
    },
    mergeData(field, data) {
      this.form[field] = data;
    },
    save() {
      saveContentClassifier(this.form).then(res => {
        if (res.code === 0) {
          this.$router.push({ name: "documentCharacteristics" });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.document-characteristics-create {
  .create-title {
    background: rgb(84, 209, 255);
  }
}
</style>

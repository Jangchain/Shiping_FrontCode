<template>
  <div class="file-type-wrap">
    <div class="file-type-opt">
      <el-button type="primary" @click="createExt">新建文档扩展名</el-button>
      <el-input v-model="searchForm.q" style="width:200px">
        <i slot="suffix" class="el-icon-edit el-input__icon" @click="getDefaultConfig">
        </i>
      </el-input>
    </div>
    <div class="file-type-content">
      <ul class="list-items">
        <li v-for="(item,key) in items" :key="key" :class="{'active':key === activeKey}" @click="selectItem(key,item)">
          {{item.text}} <span v-show="categoryCount(item.extensionArray) > 0">({{categoryCount(item.extensionArray)}})</span>
        </li>
      </ul>
      <div class="list-extension">
        <el-checkbox-group v-model="selected" @change="extensionChange">
          <el-checkbox v-for="ext in extensions" :key="ext.id" :label="ext.id">{{ext.extension}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <el-dialog title="新建文档扩展名" :visible.sync="modelVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="文件类型名称">
          <el-select v-model="form.region" placeholder="">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件扩展名">

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getFileTypesGroupByFormatGroup,
  getApplicationFileType
} from "@/api/identifyModel";
export default {
  data() {
    return {
      activeKey: 0,
      searchForm: { q: "" },
      items: [],
      extensions: [],
      selected: [],
      modelVisible: false,
      form: {},
      createExtensions: []
    };
  },
  created() {
    this.getDefaultConfig();
  },
  methods: {
    getDefaultConfig() {
      getFileTypesGroupByFormatGroup(this.searchForm).then(res => {
        if (res.code === 0) {
          this.items = res.data;
          this.extensions = this.items[0].extensionArray;
        }
      });
    },
    selectItem(key, item) {
      this.activeKey = key;
      this.extensions = item.extensionArray;
    },
    categoryCount(extensions) {
      let c = 0;
      extensions.forEach(e => {
        if (this.selected.includes(e.id)) {
          c++;
        }
      });
      return c;
    },
    extensionChange(values) {
      this.$emit("merge", "fileTypeIdArrs", values);
    },
    createExt() {
      getApplicationFileType().then(res => {
        if (res.code === 0) {
          this.createExtensions = res.data;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.file-type-wrap {
  display: flex;
  flex-direction: column;
  .file-type-opt {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .file-type-content {
    display: flex;
    flex-direction: row;
    .list-items {
      width: 200px;
      overflow-y: auto;
      list-style: none;
      margin: 0;
      padding: 0;
      border-right: 1px solid #eee;
      li {
        padding: 4px;
        border-bottom: 1px solid #eee;
        &:hover {
          color: royalblue;
          cursor: pointer;
        }
      }
      .active {
        color: royalblue;
      }
    }
    .list-extension {
      flex: 1;
    }
  }
}
</style>

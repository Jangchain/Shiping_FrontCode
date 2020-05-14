<template>
  <div>
     <div id="top1">
      <ul>
        <li>
          <i style="background:#53d1ff;border:solid 3px #dcf6ff">step1</i>
          <i>基本信息</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#fff;border:solid 3px #5567CD">step2</i>
          <i>选取信息源</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#fff;border:solid 3px #5567CD">step3</i>
          <i>规则配置</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#fff;border:solid 3px #5567CD">step4</i>
          <i>管控配置</i>
        </li>
      </ul>
    </div>
    <div id="bts">
      <p>添加基本信息</p>
      <el-form ref="form" :model="form" label-width="130px" :label-position="labelPosition">
        <el-form-item label="组件">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="SP132" value="SP132"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" placeholder="输入名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="检测日期">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="检查单位" placeholder="输入检查单位">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>
        <el-form-item label="检查人" placeholder="输入检查人名">
          <el-input v-model="form.inspector"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "step1",
 props: {
    form: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      // form: {},
      labelPosition: "left",
    };
  },
};
</script>

<style lang="scss">
#bts {
  margin-left: 40px;
  width: 1000px;
  p {
    font-size: 24px;
    font-weight: bold;
    color: rgba(16, 16, 16, 1);
  }
  #btn1{
    width: 200px;
    height: 60px;
    padding: 0;
  }
  .el-form{
    height: 50vh;
    overflow-y: scroll;
    border: solid 1px rgba(128, 128, 128, 0.308);
    padding: 20px;
    margin-bottom: 50px;
  }
}
</style>
<style lang="scss" scoped>
#top1 {
  position: relative;
  width: 100%;
  height: 100px;
  background: #2a41c1;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul{
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgba(19, 18, 18, 0.123);
  }
 ul li{
   width: 240px;
   height: 120px;
   padding-top: 20px;
   margin-top: -20px;
   background: blueviolet;
   margin-right: 0;
   margin-left: 0;
   list-style: none;
   border-radius: 10px 10px 0 0;
   line-height: 100px;
   display: flex;
   flex-direction: row;
   justify-content: space-around;
   background: #fff;
   i{
     &:nth-of-type(1){
     width: 60px;
     height: 60px;
     border-radius: 30px;
      margin-top: 20px;
    line-height: 60px;
    text-align: center;
   }
   em{
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #fff;
      line-height: 100px;
      margin-top: 44px;
      color: #D4D4D4;
   }
   }
 }
 ul li:nth-child(2){
   padding-top: 0;
   height: 100px;
   background: #2a41c1;
   margin-top: 0;
 }
 ul li:nth-child(3){
   padding-top: 0;
   height: 100px;
   background: #2a41c1;
   margin-top: 0;
 }
 ul li:nth-child(4){
   padding-top: 0;
   height: 100px;
   background: #2a41c1;
   margin-top: 0;
 }
}
i {
  font-style: normal;
}
</style>
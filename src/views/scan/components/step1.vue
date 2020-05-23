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
      </ul>
    </div>
    <div id="bts">
      <p>填写基本信息</p>
      <el-form ref="form" :model="form" label-width="130px" :label-position="labelPosition">
        <el-form-item label="策略名称" placeholder="输入名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="检查单位" placeholder="输入检查单位">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>
        <el-form-item label="检查人" placeholder="输入检查人名">
          <el-input v-model="form.inspector"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.types" placeholder="请选择">
            <el-option label="存储检查策略" value="0"></el-option>
            <el-option label="终端扫描策略" value="1"></el-option>
            <el-option label="网络监控策略" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组件">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="SP132" value="SP132"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受检单位">
          <el-select v-model="form.region1" placeholder="请选择">
            <el-option label="受检单位" value="one"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
          <p id="tactics">策略形式</p>
           <el-radio-group v-model="form.radio" @change="radioChange(form.radio)">
            <el-radio label="1">周期检测策略</el-radio>
            <el-radio label="2">单次任务</el-radio>
           </el-radio-group>
          <div v-if="weekes">
            <el-select label="生效时间" v-model="form.time" @change="selectChange(form.time)">
              <el-option
                v-for="item in times"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div v-if="time1">
             <el-time-picker
              is-range
              v-model="dateTime1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
          <div v-if="time2">
            <span>周设置：</span>
            <el-checkbox-group v-model="dates" @change="timeChange">
              <el-checkbox v-for="itemTime in datesTime" :label="itemTime" :key="itemTime">{{itemTime}}</el-checkbox>
            </el-checkbox-group>
            时间设置：
            <el-time-picker
              is-range
              v-model="dateTime1"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
          <div id="time3" v-if="time3">
            <el-checkbox v-model="checked">
              <span>开始日期</span>
              <el-date-picker
                v-model="value1"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-checkbox>
            间隔
            <el-input v-model="interval"></el-input>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
const arrTimeLists = ["一","二","三","四","五","六","日"]
export default {
  name: "step1",
  props: {
    form: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      labelPosition: "left",
      radio: "",
      times: [
        {
          value: "0",
          label: "每天"
        },
        {
          value: "1",
          label: "每周"
        },
        {
          value: "2",
          label: "循环"
        }
      ],
      weekes:false,
      dateTime1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      time1:false,
      time2:false,
      time3:false,
      dates:[],
      datesTime:arrTimeLists,
      checked: false,
      value1:'',
      interval:''
    };
  },
  methods: {
    selectChange(time) {
        console.log(time)
        // this.time3 = true
        this.time1 = false
        this.time2 = false
        this.time3 = false
      switch(time){
        case '0':
          this.time1 = true;
          break;
        case '1':
          this.time2 = true;
          break;
        case '2':
          this.time3 = true
          break;
        default:
          break;
      }
    },
    radioChange(radio){
      // console.log(radio)
      if(radio == 1){
        this.weekes = true
      }else{
        this.weekes = false
      }
    },
    timeChange(value){
      console.log(value)
        
    },
  }
};
</script>
<style lang="scss" scoped>
#top1 {
  position: relative;
  width: 100%;
  height: 100px;
  background: #2a41c1;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul {
    display: flex;
    flex-direction: row;
    border-bottom: solid 1px rgba(19, 18, 18, 0.123);
  }
  ul li {
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
    i {
      &:nth-of-type(1) {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        margin-top: 20px;
        line-height: 60px;
        text-align: center;
      }
      em {
        display: inline-block;
        width: 10px;
        height: 10px;
        background: #fff;
        line-height: 100px;
        margin-top: 44px;
        color: #d4d4d4;
      }
    }
  }
  ul li:nth-child(2) {
    padding-top: 0;
    height: 100px;
    background: #2a41c1;
    margin-top: 0;
  }
  ul li:nth-child(3) {
    padding-top: 0;
    height: 100px;
    background: #2a41c1;
    margin-top: 0;
  }
  ul li:nth-child(4) {
    padding-top: 0;
    height: 100px;
    background: #2a41c1;
    margin-top: 0;
  }
}
i {
  font-style: normal;
}
#tactics{
      font-size: 24px;
      font-weight: bold;
}
#bts {
  margin-left: 40px;
  width: 1000px;
 >p {
    font-size: 24px;
    font-weight: bold;
    color: rgba(16, 16, 16, 1);
  }
}
#time3{
  .el-select{
    margin-bottom: 10px;
  }
  .el-input--medium{
    width: 200px;
  }
}
</style>
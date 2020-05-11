<template>
  <div>
    <div id="top1">
      <ul>
        <li>
          <i>step1</i>
          <i>基本信息</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#DF9DFF;border:solid 3px #f9e9ff">step2</i>
          <i>选取信息源</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#7AE179;border:solid 3px #e3f8e3">step3</i>
          <i>规则配置</i>
        </li>
        <li>
          <em>></em>
          <i style="background:#FFBE5D;border:solid 3px #fff1de">step4</i>
          <i>管控配置</i>
        </li>
      </ul>
    </div>
    <div id="btss">
      <span>生效时间</span>
      <el-select v-model="time" placeholder="请选择" @change="selectChange1(time)">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div id="one">
        <el-checkbox v-if="time1" v-model="checked">
          <el-date-picker clearable v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-checkbox>
        <div id="time2" v-if="time2">
          <span>开始时间：</span>
          <el-time-picker
            v-model="value1"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
          <span>结束时间：</span>
          <el-time-picker
            v-model="value1"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
        </div>
        <div v-if="time3">
          <span>周设置:</span>

          <span>开始时间：</span>
          <el-time-picker
            v-model="value1"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
          <span>结束时间：</span>
          <el-time-picker
            v-model="value1"
            :picker-options="{
      selectableRange: '18:30:00 - 20:30:00'
    }"
            placeholder="任意时间点"
          ></el-time-picker>
        </div>
        <div v-if="time4">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="开始日期">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formInline.user" placeholder="间隔"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <p style="font-weight:bold">OCR设置：</p>
      <ul style="border:solid 1px #e5e5e5;padding-left:0;">
        <li style="border-bottom:solid 1px #e5e5e5;padding:25px;background:#fafafa">
         <!-- ocrEnabled -->
          <el-checkbox v-model="checked">启用OCR</el-checkbox>
        </li>
        <li style="padding:25px">
          <el-select clearable v-model="value" placeholder="请选择" @change="selectChange(value)">
            <el-option label="快速识别" value="0"></el-option>
            <el-option label="均衡识别" value="1"></el-option>
            <el-option label="精确识别" value="2"></el-option>
            <el-option label="自定义识别" value="3"></el-option>
          </el-select>
          <el-checkbox-group clearable v-if="ocrs" v-model="checkedCities">
            <el-checkbox v-for="city in ocres" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>
        </li>
      </ul>
      <p style="font-weight:bold;font-size:14px">过滤设置：</p>
      <div id="two">
        <span>配置项：</span>
        <el-checkbox-group clearable v-model="checkboxGroup1" @change="change">
          <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox-button>
        </el-checkbox-group>
        <el-tabs id="type" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane v-if="show1" label="类型过滤" name="first">
            <el-radio v-model="radio" label="1">
              常用类型
              *.doc,*.pdf,*.xls,*.ppt,*.pptx,*.xlsx,*.docx,*.adp,*.txt,INSTALL,KEYS,Makefile,README,*.xwelcome
            </el-radio>
            <el-radio v-model="radio" label="2">
              自定义
              <el-radio id="aa" v-model="radio1" :disabled="radio === '1'" label="1">包含</el-radio>
              <el-radio id="bb" v-model="radio1" :disabled="radio === '1'" label="2">不包含</el-radio>
            </el-radio>
          </el-tab-pane>
          <el-tab-pane v-if="show2" label="日期过滤" name="second">
            <el-radio-group v-model="isFileAgeEnabled">
              <el-radio :label="3">
                <span>最近：</span>
              </el-radio>
              <el-radio :label="6">
                <span>超过：</span>
              </el-radio>
              <el-radio :label="9">
                <span>检查开始日期：</span>
                <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                <span>检查结束日期：</span>
                <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane v-if="show3" label="文件大小过滤" name="third">
            <el-radio-group v-model="isLargerThanEnabled">
              <el-radio :label="3">
                <span>最小</span>
              </el-radio>
              <el-radio :label="6">
                <span>最大</span>
              </el-radio>
            </el-radio-group>
          </el-tab-pane>
          <el-tab-pane v-if="show4" label="带宽过滤" name="fourth">
            <el-radio-group v-model="regin">
              <el-radio :label="3">
                <span>闲时带宽（Mbps）</span>
              </el-radio>
              <el-radio :label="6">
                <span>忙时带宽（Mbps）</span>
              </el-radio>
            </el-radio-group>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
const cityOptions = ["类型过滤", "日期过滤", "文件大小过滤", "带宽过滤"];

export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "单次"
        },
        {
          value: "1",
          label: "每天"
        },
        {
          value: "2",
          label: "每周"
        },
        {
          value: "3",
          label: "循环"
        }
      ],
      modules: [
        {
          value: "选项1",
          label: "快速识别"
        },
        {
          value: "选项2",
          label: "均衡识别"
        },
        {
          value: "选项3",
          label: "精确识别"
        },
        {
          value: "选项4",
          label: "自定义识别"
        }
      ],
      value: "",
      time: "",
      value1: "",
      checked: false,
      checkboxGroup1: [],
      checkedCities: [],
      cities: cityOptions,
      ocres: [
        "识别GIF",
        "识别身份证",
        "识别源码",
        "识别印章",
        "识别红头文件",
        "政府机关公文识别",
        "数字二次精准识别"
      ],
      regin: 3,
      activeName: "",
      show1: false,
      time1: false,
      show2: false,
      time2: false,
      show3: false,
      time3: false,
      show4: false,
      time4: false,
      radio: "1",
      radio1: "1",
      ocrs: false,
      checked: true,
      formInline: {}
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    change(e) {
      console.log(e);
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      this.show4 = false;
      e.forEach(item => {
        console.log(item);
        switch (item) {
          case "类型过滤":
            this.show1 = true;
            break;
          case "日期过滤":
            this.show2 = true;
            break;
          case "文件大小过滤":
            this.show3 = true;
            break;
          case "带宽过滤":
            this.show4 = true;
            break;
          default:
            break;
        }
      });
    },
    selectChange(value) {
      if (value == 3) {
        console.log(value);
        this.ocrs = true;
      } else {
        this.ocrs = false;
      }
    },
    selectChange1(time) {
      console.log(time);
      if (time == 0) {
        this.time1 = true;
        this.time2 = false;
        this.time3 = false;
        this.time4 = false;
      } else if (time == 1) {
        this.time2 = true;
        this.time1 = false;
        this.time3 = false;
        this.time4 = false;
      } else if (time == 2) {
        this.time1 = false;
        this.time2 = false;
        this.time3 = true;
        this.time4 = false;
      } else if (time == 3) {
        this.time1 = false;
        this.time2 = false;
        this.time3 = false;
        this.time4 = true;
      }
    }
  }
};
</script>

<style lang="scss">
#type {
  .el-radio {
    width: 100%;
    #aa {
      position: absolute;
      margin-left: 30px;
    }
    #bb {
      position: absolute;
      margin-left: 100px;
    }
  }
}
</style>
<style lang="scss" scoped>
ul {
  li {
    list-style: none;
  }
}
#deploy {
  display: flex;
  flex-direction: row;
  padding: 0 10px;
  margin: 0 10px;
  li {
    background: gray;
    padding: 10px;
    margin: 0 10px;
  }
}
#top1 {
  width: 100%;
  height: 100px;
  background: #2a41c1;
  margin-top: 12px;
  border-bottom: solid 1px rgba(255, 0, 0, 0);
  ul {
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 960px;
    height: 120px;
    margin-top: -20px;
    background: rgba(255, 255, 255, 1);
    margin-left: 40px;
    padding-top: 0;
    border-radius: 10px 10px 0px 0px;
    border-bottom: solid 1px rgba(19, 18, 18, 0.123);
    li {
      list-style: none;
      display: flex;
      align-items: center;
      width: 240px;
      height: 120px;
      i {
        &:nth-of-type(1) {
          display: inline-block;
          width: 60px;
          height: 60px;
          background-color: #53d1ff;
          text-align: center;
          border: 1px solid #dcf6ff;
          margin-left: 30px;
          margin-top: 10px;
          font-size: 12px;
          text-align: center;
          color: white;
          border-radius: 30px;
          margin-right: 0;
          height: 60px;
          line-height: 60px;
          //   opacity: 0.6;
        }
        &:nth-of-type(2) {
          margin-left: 20px;
          line-height: 80px;
        }
      }
      em {
        color: #ccc;
        display: inline-block;
        width: 30px;
        line-height: 120px;
      }
    }
  }
}
#tre {
  font-size: 18px;
  margin-left: 159px;
  margin-bottom: 8px;
  color: rgba(51, 51, 51, 1);
  font-weight: normal;
}
i {
  font-style: normal;
}
#btss {
  margin-top: 30px;
  width: 95%;
  margin-left: 50px;
}
#one {
  padding: 20px;
  padding-left: 30px;
  background: #fafafa;
}
#two {
  border: solid 1px #e5e5e5;
  padding: 10px;
}
</style>
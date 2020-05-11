<template>
  <div>
    <el-select v-model="value.frequencyType" placeholder="请选择">
      <el-option v-for="(item,key) in types" :key="key" :label="item" :value="key">
      </el-option>
    </el-select>
    <div>
      <div v-if="value.frequencyType === 'ONCE' || value.frequencyType === 'CONTINUOUSLY'">
        <el-checkbox v-model="value.isCheckedDate" :true-value="1" :false-value="0"></el-checkbox>
        <el-date-picker v-model="value.startDate" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始日期" :disabled="!value.isCheckedDate" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div v-if="value.frequencyType === 'WEEKLY'">
        <el-checkbox-group v-model="value.dayOfweek" size="mini">
          <el-checkbox-button v-for="item in effectWeek" :key="item.index" :label="item.dayOfWeek">{{item.name}}</el-checkbox-button>
        </el-checkbox-group>
      </div>
      <div v-if="value.frequencyType === 'DAILY' || value.frequencyType === 'WEEKLY'">
        <el-time-picker v-model="value.effectTime" value-format="HH:mm" format="HH:mm" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
        </el-time-picker>
      </div>
      <div v-if="value.frequencyType === 'CONTINUOUSLY'">
        <el-input v-model="value.continuousStopInterval" placeholder="间隔">
          <i slot="suffix">分</i>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      types: {
        ONCE: "一次",
        DAILY: "每天",
        WEEKLY: "每周",
        CONTINUOUSLY: "循环"
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      effectWeek: [
        {
          name: "一",
          enName: "MONDAY",
          checked: false,
          dayOfWeek: 1,
          index: 1
        },
        {
          name: "二",
          enName: "TUESDAY",
          checked: false,
          dayOfWeek: 2,
          index: 2
        },
        {
          name: "三",
          enName: "WEDNESDAY",
          checked: false,
          dayOfWeek: 4,
          index: 3
        },
        {
          name: "四",
          enName: "THURSDAY",
          checked: false,
          dayOfWeek: 8,
          index: 4
        },
        {
          name: "五",
          enName: "FRIDAY",
          checked: false,
          dayOfWeek: 16,
          index: 5
        },
        {
          name: "六",
          enName: "SATURDAY",
          checked: false,
          dayOfWeek: 32,
          index: 6
        },
        {
          name: "日",
          enName: "SUNDAY",
          checked: false,
          dayOfWeek: 64,
          index: 7
        }
      ]
    };
  },
  methods: {
  }
};
</script>

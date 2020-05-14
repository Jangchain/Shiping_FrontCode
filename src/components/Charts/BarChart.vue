<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.initCharts();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$el);
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
         itemStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#51C9F9'},
                        {offset: 0.5, color: '#2BCB71'},
                        {offset: 1, color: '#17AE48'}
                    ]
                )
            }
        }, 
        dataset: {
          source: [
            [/* "score", */ "amount", "product"],
            [/* 89.3, */ 819, "个人信息-风险探知"],
            [/* 57.1, */ 661, "信息安全术语-风险探知"],
            [/* 74.4, */ 581, "数据分析安全"],
            [/* 50.1, */ 532, "信息安全术语-风险探知1"],
            [/* 50.1, */ 388, "数据分析安全1"]
          ]
        },
        xAxis: {},
        yAxis: {
          type: "category"
        },
        series: [
          {
            type: "bar",
            encode: {
              // Map the "amount" column to X axis.
              x: "amount",
              // Map the "product" column to Y axis
              y: "product"
            }
          }
        ]
      });
    }
  }
};
</script>

<template>
  <div :class="className" :style="{height:'300px',width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "@/components/Charts/mixins/resize";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "columnarschart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "320px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ expectedData, actualData } = {}) {
      var myColor = ["#2e46aa"];
      this.chart.setOption({
         title: {
          text: "分区风险排行",
        //   left: "center"
        },
        grid: {
          left: "10%",
          top: "15%",
          right: "10%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: "none",
            axisLine: "none",
            offset: "20",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              }
            },
            data: [
              "北京",
              "浙江杭州",
              "上海",
              "广东广州",
              "广东深圳",
              "江西南昌",
              "江苏苏州",
              "陕西西安",
              "山东青岛",
              "江苏南京"
            ]
          },
          {
            axisTick: "none",
            axisLine: "none",
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12"
              }
            },
            data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72]
          },
          {
            nameGap: "50",
            nameTextStyle: {
              color: "#ffffff",
              fontSize: "12"
            },
            axisLine: {
              lineStyle: {
                color: "rgba(0,0,0,0)"
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: "条",
            type: "bar",
            yAxisIndex: 0,
            data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
            barWidth: 5,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                }
              }
            },
            z: 2
          },
          {
            name: "白框",
            type: "bar",
            yAxisIndex: 1,
            barGap: "-100%",
            data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: 5,
            itemStyle: {
              normal: {
                color: "#0e2147",
                barBorderRadius: 1
              }
            },
            z: 1
          },
          {
            name: "外圆",
            type: "scatter",
            hoverAnimation: false,
            data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
            yAxisIndex: 2,
            symbolSize: 10,
            itemStyle: {
              normal: {
                color: function(params) {
                  var num = myColor.length;
                  return myColor[params.dataIndex % num];
                },
                opacity: 0.8
              }
            },
            z: 2
          }
        ]
      });
    }
  }
};
</script>
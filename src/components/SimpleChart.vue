<template>
  <div class="chart-wrap">
    <div ref="chart" class="chart" />
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'SimpleChart',
  props: {
    option: Object,
    onClick: Function
  },
  data() {
    return {
      chart: null,
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight
    }
  },
  watch: {
    option: {
      deep: true,
      handler(newVal, oldVal) {
        //  alert(1);
        console.log('new', newVal)
        this.chart.setOption(newVal, true)
      }
    },
    onClick(val) {
      if (val) {
        this.chart.on('click', this.onClick)
      }
    },
    screenWidth(val) {
      console.log(val)
    },
    screenHeight(val) {
      console.log(val)
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.chart.setOption(this.option)
    if (this.onClick) {
      this.chart.on('click', this.onClick)
    }
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleResize() {
      this.chart.resize()
    }
  }
}
</script>

<style scoped>
  .chart {
    width: 100%;
    height: 100%;
  }

  .chart-wrap {
    width: 100%;
    height: 100%;
  }
</style>

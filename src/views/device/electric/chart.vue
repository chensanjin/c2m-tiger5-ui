<template>
  <div class="app-container main-chart">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="chats">
        <span slot="label"><i class="el-icon-data-analysis" /></span>
      </el-tab-pane>
      <el-tab-pane name="grid">
        <span slot="label"><i class="el-icon-s-grid" /></span>
      </el-tab-pane>
    </el-tabs>

    <div v-if="activeName === 'chats'" class="nowEcharts">
      <simple-chart :option="option" />
    </div>
    <div v-if="activeName === 'grid'&& isIntelligence==='1' " class="app-container">
      <Hour :electric-code="electricCode" />
    </div>
    <div v-if="activeName === 'grid'&& isIntelligence==='2' " class="app-container">
      <History :electric-code="electricCode" />
    </div>

  </div>
</template>

<script>
import SimpleChart from '@/components/SimpleChart'
import { listHistoryNoPage } from '@/api/device/history'
import Hour from '../../phygrid/hour/index'
import History from '../../device/history/index1'

export default {
  components: { SimpleChart, Hour, History },
  // props: [],
  data() {
    return {
      activeName: 'chats',
      electricCode: this.$route.query.electricCode,
      isIntelligence: this.$route.query.isIntelligence,
      energyType: this.$route.query.energyType,
      listHistoryOptions: [],
      timeAxis: [],
      valueYxis: [],
      queryParams: {

      },
      option: {
        title: {
          text: '历史报表统计',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        /* legend: {
                    data: ['最高气温', '最低气温']
                },*/
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          position: 'left',
          lineStyle: {
            color: ['#315070'],
            width: 0,
            type: 'solid'
          },
          axisLabel: {
            formatter: '{value} ¥'
          }
        },
        series: [
          {
            name: '消耗电费',
            type: 'line',
            data: [],
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }

        ]
      }
    }
  },
  computed: {},
  mounted: function() {
    // this.initWebSocket();
  },
  created() {
    this.initDtableOptions()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },

    initDtableOptions() {
      this.queryParams.equipmentCode = this.electricCode
      this.queryParams.isIntelligence = this.isIntelligence
      listHistoryNoPage(this.queryParams).then(response => {
        this.listHistoryOptions = response.data

        this.listHistoryOptions.forEach(item => {
          this.timeAxis.push(item.readTimeString)
          console.log(item.readTimeString)
          this.valueYxis.push(item.totalPrice)
        })
        this.option.xAxis.data = this.timeAxis
        this.option.series[0].data = this.valueYxis
      })
      console.log(this.isIntelligence)
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bridgesclass {
    //background-image: url("");
    max-width: 100%;
    position: relative;
    font-size: 9px;

    .bridges-img {
      height: 400px;
      background-repeat: no-repeat;
      width: 630px;
      background-size: contain;
    }

    .ele01 {
      position: absolute;
      left: 34%;
      top: 28%;
    }

    .ele02 {
      position: absolute;
      left: 34%;
      top: 43%;
    }

    .ele03 {
      position: absolute;
      left: 34%;
      top: 74%;
    }

    .ele04 {
      position: absolute;
      left: 34%;
      top: 90%;
    }

    .ele05 {
      position: absolute;
      left: 34%;
      top: 90%;
    }

    .ele06 {
      position: absolute;
      left: 34%;
      top: 90%;
    }

    .ele07 {
      position: absolute;
      left: 34%;
      top: 90%;
    }
  }

  .el-card {
    min-width: 100%;
    height: auto;
    margin-right: 20px;
    transition: all .5s;
    margin-bottom: 20px;
  }

  .nowEcharts {
    width: 100%;
    height: 90%;
  }

  table {
    border-collapse: collapse;
    border: none;
    width: 200px;
  }

  td {
    border: solid #EBEEF5 1px;
  }

  th {
    border: solid #EBEEF5 1px;
    height: 41px;
  }
</style>
<style scoped>
  .main-chart {
    height: 840px;
    background-color: white;
  }
</style>

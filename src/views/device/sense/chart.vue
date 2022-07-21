<template>
  <div class="app-container">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="chats">
        <span slot="label"><i class="el-icon-data-analysis" /></span>
      </el-tab-pane>
      <el-tab-pane name="grid">
        <span slot="label"><i class="el-icon-s-grid" /></span>
      </el-tab-pane>
    </el-tabs>
    <div v-if="activeName === 'chats'" class="nowEcharts main-chart">
      <simple-chart :option="option" />
    </div>
    <div v-if="activeName === 'grid' && senseType==='AirCleanliness'" class="app-container">
      <airhistory :sense-code="senseCode" />
    </div>
    <div v-if="activeName === 'grid' && senseType==='O3'" class="app-container">
      <o3history :sense-code="senseCode" />
    </div>
    <div v-if="activeName === 'grid' && senseType==='Thermometer'" class="app-container">
      <thhistory :sense-code="senseCode" />
    </div>
  </div>
</template>

<script>
import SimpleChart from '@/components/SimpleChart'
import { getChatsData } from '@/api/device/senseChats'
import Airhistory from './griddata/airhistory/index'
import O3history from './griddata/o3history/index'
import Thhistory from './griddata/thhistory/index'

export default {
  components: { Thhistory, O3history, Airhistory, SimpleChart },
  props: [],
  /*    watch:{
      option:{
        handler(newVal,oldVale) {

        },
        deep: true,
        immediate:true
      },
    },*/
  data() {
    return {
      activeName: 'chats',
      senseType: '',
      senseCode: this.$route.query.senseCode,
      senseName: this.$route.query.senseName,
      Thermometer: {
        title: this.$route.query.senseName + '历史',
        legend: {
          data: ['温度', '湿度']
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            min: -20,
            max: 60,
            name: '温度',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          {
            type: 'value',
            position: 'left',
            name: '湿度',
            min: 0,
            max: 100,
            offset: 80, // 偏移
            axisLabel: {
              formatter: '{value} %RH'
            }
          }
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 0
          },
          {
            name: '湿度',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 1
          }
        ]
      },
      O3: {
        title: this.$route.query.senseName + '历史',
        legend: {
          data: ['臭氧']
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: 100,
            name: '臭氧',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {
            name: '臭氧',
            type: 'line',
            data: []// 10, 11, 13, 11, 12, 12, 9
          }
        ]
      },
      AirCleanliness: {
        title: this.$route.query.senseName + '历史',
        legend: {
          data: ['数值', '氧气含量', '静压差', '换气次数', '尘埃粒子(≥0.5um)', '尘埃粒子(≥5um)', '沉降菌(cfu/皿·30min)', '浮游菌(cfu/m³)']
        },
        series: [
          {
            name: '数值',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 0
          },
          {
            name: '氧气含量',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 1
          },
          {
            name: '静压差',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 2
          },
          {
            name: '换气次数',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 3
          },
          {
            name: '尘埃粒子(≥0.5um)',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 4
          },
          {
            name: '尘埃粒子(≥5um)',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 5
          },
          {
            name: '沉降菌(cfu/皿·30min)',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 6
          },
          {
            name: '浮游菌(cfu/m³)',
            type: 'line',
            data: [], // 10, 11, 13, 11, 12, 12, 9
            yAxisIndex: 7
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: 100,
            name: '数值',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: 100,
            name: '氧气',
            offset: 40, // 偏移
            axisLabel: {
              formatter: '{value} %'
            }
          },
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: 1000,
            name: '静压差',
            offset: 80, // 偏移
            axisLabel: {
              formatter: '{value} Pa'
            }
          },
          {
            type: 'value',
            position: 'left',
            min: 0,
            max: 1000,
            name: '换气',
            offset: 120, // 偏移
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            position: 'right',
            min: 0,
            max: 1000,
            name: '尘埃>0.5um',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            position: 'right',
            min: 0,
            max: 1000,
            offset: 60,
            name: '尘埃>5um',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            position: 'right',
            min: 0,
            max: 1000,
            offset: 120,
            name: '沉降菌',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            position: 'right',
            min: 0,
            max: 1000,
            offset: 180,
            name: '浮游菌',
            axisLabel: {
              formatter: '{value}'
            }
          }

        ]
      },
      option: {
        title: {
          text: '',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: []
        },
        /*          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
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
          data: [] // '周一', '周二', '周三', '周四', '周五', '周六', '周日'
        },
        yAxis: [],
        series: []
      }
    }
  },
  computed: {},
  mounted: function() {

  },
  created() {
    this.initChartsData()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    initChartsData: function() {
      getChatsData(this.senseCode).then(response => {
        if (response.data) {
          // this.option.title.subtext = this.senseName
          const data = response.data
          this.senseType = data.senseType
          if (this.senseType === 'AirCleanliness') {
            this.option.series = this.AirCleanliness.series
            this.option.yAxis = this.AirCleanliness.yAxis
            this.option.title.text = this.AirCleanliness.title
            this.option.legend.data = this.AirCleanliness.legend.data
            this.option.xAxis.data = data.xAxis
            this.option.series[0].data = data.yAxis.yAxisDegreesAvgValue
            this.option.series[1].data = data.yAxis.yAxisOxygenAvgValue
            this.option.series[2].data = data.yAxis.yAxisPaAvgValue
            this.option.series[3].data = data.yAxis.yAxisBreatheAvgValue
            this.option.series[4].data = data.yAxis.yAxisDustAvgValue
            this.option.series[5].data = data.yAxis.yAxisDustfiveAvgValue
            this.option.series[6].data = data.yAxis.yAxisCfuAvgValue
            this.option.series[7].data = data.yAxis.yAxisFfuAvgValue
          }
          if (this.senseType === 'Thermometer') {
            this.option.series = this.Thermometer.series
            this.option.yAxis = this.Thermometer.yAxis
            this.option.title.text = this.Thermometer.title
            this.option.legend.data = this.Thermometer.legend.data
            this.option.xAxis.data = data.xAxis
            this.option.series[0].data = data.yAxis.yAxisTeAvgValue
            this.option.series[1].data = data.yAxis.yAxisHuAvgValue
          }
          if (this.senseType === 'O3') {
            this.option.series = this.O3.series
            this.option.yAxis = this.O3.yAxis
            this.option.title.text = this.O3.title
            this.option.legend.data = this.O3.legend.data
            this.option.xAxis.data = data.xAxis
            this.option.series[0].data = data.yAxis.yAxisO3
          }
        }
      })
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
    height: 100%;
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

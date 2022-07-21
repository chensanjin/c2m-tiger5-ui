<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item>
        <el-date-picker
          v-model="searchDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <!--<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>-->
      </el-form-item>
      <el-form-item>
        <el-tooltip class="item" effect="dark" content="显隐列" placement="top">
          <el-button size="mini" circle icon="el-icon-menu" @click="open=!open" />
        </el-tooltip>
      </el-form-item>
    </el-form>
    <!--  <div class="top-right-btn">
      <el-row>
        <el-tooltip class="item" effect="dark" content="显隐列" placement="top" >
          <el-button size="mini" circle icon="el-icon-menu" @click="open=!open" />
        </el-tooltip>
      </el-row>
      </div>-->
    <el-dialog title="选择需要显示的车间" :visible.sync="open" width="700px" append-to-body>
      <template>
        <el-transfer
          v-model="needColumns"
          :data="columns"
          :titles="['所有车间', '需要显示车间']"
          :button-texts="['取出', '加入']"
          @change="handlerChangeColumns"
        />
      </template>
    </el-dialog>
    <!--  <el-button @click="shiftWorkshops">shift</el-button>-->
    <el-table
      v-loading="loading"
      :data="tableData"
    >
      <el-table-column label="日期" prop="accTime" width="100" fixed="left" header-align="center" align="center" />
      <el-table-column label="室外温湿度" width="300" fixed="left" header-align="center" align="center">
        <el-table-column :label="subColumn.subLabel.tp.name" header-align="center" align="center" width="150">
          <el-table-column width="50" :label="subColumn.subLabel.tp.tpSub.tpMax" prop="tpMax" header-align="center" align="center" :formatter="getOutData" />
          <el-table-column width="50" :label="subColumn.subLabel.tp.tpSub.tpMin" prop="tpMin" header-align="center" align="center" :formatter="getOutData" />
          <el-table-column width="50" :label="subColumn.subLabel.tp.tpSub.tpAvg" prop="tpAvg" header-align="center" align="center" :formatter="getOutData" />
        </el-table-column>
        <el-table-column width="150" :label="subColumn.subLabel.hu.name" header-align="center" align="center">
          <el-table-column width="50" :label="subColumn.subLabel.hu.huSub.huMax" prop="huMax" header-align="center" align="center" :formatter="getOutData" />
          <el-table-column width="50" :label="subColumn.subLabel.hu.huSub.huMin" prop="huMin" header-align="center" align="center" :formatter="getOutData" />
          <el-table-column width="50" :label="subColumn.subLabel.hu.huSub.huAvg" prop="huAvg" header-align="center" align="center" :formatter="getOutData" />
        </el-table-column>
      </el-table-column>
      <el-table-column
        v-for="col in columns"
        v-if="col.status==='show'"
        :key="col.workshopId"
        header-align="center"
        align="center"
        :label="col.label"
        width="300"
      >
        <el-table-column :label="subColumn.subLabel.tp.name" header-align="center" align="center"><!--温度-->
          <el-table-column :label="subColumn.subLabel.tp.tpSub.tpMax" :prop="'tpMax_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
          <el-table-column :label="subColumn.subLabel.tp.tpSub.tpMin" :prop="'tpMin_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
          <el-table-column :label="subColumn.subLabel.tp.tpSub.tpAvg" :prop="'tpAvg_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
        </el-table-column>
        <el-table-column :label="subColumn.subLabel.hu.name" header-align="center" align="center"><!--湿度-->
          <el-table-column :label="subColumn.subLabel.hu.huSub.huMax" :prop="'huMax_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
          <el-table-column :label="subColumn.subLabel.hu.huSub.huMin" :prop="'huMin_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
          <el-table-column :label="subColumn.subLabel.hu.huSub.huAvg" :prop="'huAvg_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
        </el-table-column>
        <el-table-column :label="subColumn.subLabel.o3.name" header-align="center" align="center"><!--臭氧-->
          <el-table-column :label="subColumn.subLabel.o3.o3Sub.o3Max" :prop="'o3Max_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
          <el-table-column :label="subColumn.subLabel.o3.o3Sub.o3Min" :prop="'o3Min_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
          <el-table-column :label="subColumn.subLabel.o3.o3Sub.o3Avg" :prop="'o3Avg_'+col.workshopId" header-align="center" align="center" :formatter="getData" />
        </el-table-column>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script type="text/jsx">
import { listData, getHead } from '@/api/enviroment/statistics'
import render from '../../../utils/generator/render'
export default {
  /*    render: function (h) {
          return (<span>Hello</span>)
        },*/
  data() {
    return {
      needColumns: [],
      open: false,
      searchDate: [],
      // 显示搜索条件
      showSearch: true,
      loading: true,
      // 总条数
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        startDate: '',
        endDate: ''
      },
      pickerOptions: {
        disabledDate: function(time) {
          return time.getTime() >= (Date.now() - (24 * 60 * 60 * 1000)) || time.getTime() <= (Date.now() - 24 * 60 * 60 * 1000 - 3600 * 1000 * 24 * 60)
        },
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            end.setTime(end.getTime() - 24 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            end.setTime(end.getTime() - 24 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近二个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 60)
            end.setTime(end.getTime() - 24 * 60 * 60 * 1000)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      columns: [],
      showColumns: [],
      subColumn: {
        subLabel: {
          tp: {
            name: '温度(℃)',
            tpSub: {
              tpMax: '高',
              tpMin: '低',
              tpAvg: '均'
            }
          },
          hu: {
            name: '湿度(%RH)',
            huSub: {
              huMax: '高',
              huMin: '低',
              huAvg: '均'
            }
          },
          o3: {
            name: '臭氧浓度(%)',
            o3Sub: {
              o3Max: '高',
              o3Min: '低',
              o3Avg: '均'
            }
          }
        }
      },
      tableData: []
    }
  },
  created() {
    this.initDateRange()
    this.getHeads()
    this.getList()
  },
  methods: {
    dateFormat(fmt, date) {
      let ret
      const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        }
      }
      return fmt
    },
    initDateRange() {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      end.setTime(end.getTime() - 24 * 60 * 60 * 1000)
      this.searchDate.push(this.dateFormat('YYYY-mm-dd', start))
      this.searchDate.push(this.dateFormat('YYYY-mm-dd', end))
    },
    handlerChangeColumns(options) {
      console.info(options)
      for (const index in this.columns) {
        if (options.indexOf(this.columns[index].key) >= 0) {
          // 选中的id里面存在这个车间
          this.columns[index].status = 'show'
        } else {
          this.columns[index].status = 'hidden'
        }
      }
    },
    /*      getDefaultDateRange(){
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime()  - 3600 * 1000 * 24 * 30);
              end.setTime(end.getTime() - 24*60*60*1000)
              return [start,end]
            },*/
    /** 重置按钮操作 */
    /*      resetQuery() {
              this.resetForm("queryForm");
              this.handleQuery();
            },*/
    getHeads() {
      getHead().then(response => {
        this.columns = response.data
        /*          for(let index in this.columns){
                      this.showColumns.push({
                        key: this.columns[index].workshopId,
                        label: this.columns[index].label,
                      });
                    }*/
      })
    },
    getList() {
      console.info(this.searchDate)
      const startDate = this.searchDate.toString()
      this.queryParams.startDate = startDate.substring(0, 10)
      this.queryParams.endDate = startDate.substring(11)
      this.loading = true
      listData(this.queryParams).then(response => {
        this.tableData = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /*      getData(row,colomun,cellv){
              console.info("i will do ？",colomun)
              return "1"
            },*/
    getData(row, column) {
      // console.info(workshopId)
      const type = column.property.split('_')[0]
      const workshopId = column.property.split('_')[1]
      if (!row.data[workshopId]) {
        return '-'
      }
      if (type === 'tpMax') {
        if (row.data[workshopId].te) {
          if (row.data[workshopId].te.maxS === '1') {
            return (<span style='color:red'>{row.data[workshopId].te.max}</span>)
          } else {
            return row.data[workshopId].te.max
          }
        } else {
          return '-'
        }
      }
      if (type === 'tpMin') {
        if (row.data[workshopId].te) {
          if (row.data[workshopId].te.minS === '1') {
            return (<span style='color:red'>{row.data[workshopId].te.min}</span>)
          } else {
            return row.data[workshopId].te.min
          }
        } else {
          return '-'
        }
      }
      if (type === 'tpAvg') {
        if (row.data[workshopId].te) {
          if (row.data[workshopId].te.avgS === '1') {
            return (<span style='color:red'>{row.data[workshopId].te.avg}</span>)
          } else {
            return row.data[workshopId].te.avg
          }
        } else {
          return '-'
        }
      }
      if (type === 'huMax') {
        if (row.data[workshopId].hu) {
          if (row.data[workshopId].hu.maxS === '1') {
            return (<span style='color:red'>{row.data[workshopId].hu.max}</span>)
          } else {
            return row.data[workshopId].hu.max
          }
        } else {
          return '-'
        }
      }
      if (type === 'huMin') {
        if (row.data[workshopId].hu) {
          if (row.data[workshopId].hu.minS === '1') {
            return (<span style='color:red'>{row.data[workshopId].hu.min}</span>)
          } else {
            return row.data[workshopId].hu.min
          }
        } else {
          return '-'
        }
      }
      if (type === 'huAvg') {
        if (row.data[workshopId].hu) {
          if (row.data[workshopId].hu.avgS === '1') {
            return (<span style='color:red'>{row.data[workshopId].hu.avg}</span>)
          } else {
            return row.data[workshopId].hu.avg
          }
        } else {
          return '-'
        }
      }
      if (type === 'o3Max') {
        if (row.data[workshopId].o3) {
          if (row.data[workshopId].o3.maxS === '1') {
            return (<span style='color:red'>{row.data[workshopId].o3.max}</span>)
          } else {
            return row.data[workshopId].o3.max
          }
        } else {
          return '-'
        }
      }
      if (type === 'o3Min') {
        if (row.data[workshopId].o3) {
          if (row.data[workshopId].o3.minS === '1') {
            return (<span style='color:red'>{row.data[workshopId].o3.min}</span>)
          } else {
            return row.data[workshopId].o3.min
          }
        } else {
          return '-'
        }
      }
      if (type === 'o3Avg') {
        if (row.data[workshopId].o3) {
          if (row.data[workshopId].o3.avgS === '1') {
            return (<span style='color:red'>{row.data[workshopId].o3.avg}</span>)
          } else {
            return row.data[workshopId].o3.avg
          }
        } else {
          return '-'
        }
      }
    },
    getOutData: function(row, column) {
      if (column.property === 'tpMax') {
        if (row.outdata.te) {
          return row.outdata.te.max
        } else {
          return '-'
        }
      }
      if (column.property === 'tpMin') {
        if (row.outdata.te) {
          return row.outdata.te.min
        } else {
          return '-'
        }
      }
      if (column.property === 'tpAvg') {
        if (row.outdata.te) {
          return row.outdata.te.avg
        } else {
          return '-'
        }
      }
      if (column.property === 'huMax') {
        if (row.outdata.hu) {
          return row.outdata.hu.max
        } else {
          return '-'
        }
      }
      if (column.property === 'huMin') {
        if (row.outdata.hu) {
          return row.outdata.hu.min
        } else {
          return '-'
        }
      }
      if (column.property === 'huAvg') {
        if (row.outdata.hu) {
          return row.outdata.hu.avg
        } else {
          return '-'
        }
      }
    }
  }

}
</script>

<style scoped>
  .exceed{
    color:red;
  }
  .el-table:not(.el-table–scrollable-x) .el-table__fixed-right{
    height: 100% !important;
  }
</style>

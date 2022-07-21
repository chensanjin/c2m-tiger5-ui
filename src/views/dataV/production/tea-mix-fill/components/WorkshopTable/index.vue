<template>
  <div class="table-main">
    <el-table
      :data="tableData"
      height="100%"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="序号" align="center">
        <template slot-scope="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="produceDate" label="生产日期 " align="center" />
      <el-table-column label="开机时间" align="center">
        <template slot-scope="{ row }">
          {{ filterTime(row.startupTime) }}
        </template>
      </el-table-column>
      <el-table-column label="收机时间" align="center">
        <template slot-scope="{ row }">
          {{ filterTime(row.shutdownTime) }}
        </template>
      </el-table-column>

      <el-table-column prop="materialCode" label="物料编码" align="center" />
      <el-table-column prop="materialNameCn" label="物料名称" align="center" />
      <el-table-column label="原料使用" align="center">
        <el-table-column prop="rowMaterialBatch" label="批次" align="center" />
        <el-table-column prop="input" label="重量" align="center" />
      </el-table-column>

      <el-table-column label="产出" align="center">
        <el-table-column prop="Output" label="重量(kg)" align="center" />
      </el-table-column>

      <el-table-column label="不良品" align="center">
        <el-table-column prop="rejects" label="重量(kg)" align="center" />
        <el-table-column prop="lossRate" label="损耗率" align="center" />
      </el-table-column>
      <el-table-column prop="laborHours" label="人工工时(h)" align="center" />
      <el-table-column prop="machineHours" label="机器工时(h)" align="center" />
      <el-table-column prop="electric" label="电耗(Kw.h)" align="center" />
      <el-table-column
        prop="ratedPower"
        label="额定功率(Kw.h)"
        align="center"
      />
      <el-table-column prop="programHours" label="程序耗时(h)" align="center" />
      <el-table-column prop="netEfficiency" label="净效率" align="center" />
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatDateTime } from '@/utils'
import { getReportDetail } from '@/api/datav/index.js'
export default {
  name: 'DryWetTime',
  data() {
    return {
      tableData: [],
      queryParams: {
        workshopCode: this.$route.meta.workshopCode,
        productCode: 'gangshinaicha'
      }
    }
  },
  computed: {
    ...mapState({
      planInfo: state => state.planInfo.info
    })
  },
  watch: {
    planInfo: {
      handler(info) {
        if (Object.keys(info).length > 0) {
          this.queryParams.productCode = info.productCode
          this.changeWorkshopList()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchWorkshopList()
  },

  methods: {
    filterTime(time) {
      return formatDateTime(time)
    },
    /**
     * @description: 单元格样式
     * @param {*}
     * @return {*}
     */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return { color: '#7C9CB5 !important' }
        // if (rowIndex % 2 === 1) {
        //   return { background: '#223141 !important' }
        // }
      }
      if (rowIndex % 2 === 1) {
        return { background: '#223141 !important' }
      }
    },
    fetchWorkshopList() {
      getReportDetail({
        workshopCode: this.queryParams.workshopCode,
        procedureCode: 'T-03',
        planNo: this.$store.state.planInfo.info.planCode
      }).then(res => {
        if (res.data) {
          this.tableData = [...res.data.content]
          this.$store.commit('SET_TEA_TABLE_ID', res.data.id)
        } else {
          this.tableData = []
          this.$store.commit('SET_TEA_TABLE_ID', null)
        }

        this.$store.dispatch('setTeaTabList', this.tableData)
      })
    },
    changeWorkshopList() {
      getReportDetail({
        workshopCode: this.queryParams.workshopCode,
        procedureCode: 'T-03',
        // productCode: this.$store.state.planInfo.info.productCode,
        planNo: this.$store.state.planInfo.info.planCode
      }).then(res => {
        if (res.data) {
          this.tableData = [...res.data.content]
          this.$store.commit('SET_TEA_TABLE_ID', res.data.id)
        } else {
          this.tableData = []
          this.$store.commit('SET_TEA_TABLE_ID', null)
        }
        this.$store.dispatch('setTeaTabList', this.tableData)
      })
    },

    // 合并行
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // const length = this.tableData.length
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleCurrentChange(val) {
      // this.$store.dispatch('setTableRow', val)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/styles/table.scss';
//表头样式修改
.table-main ::v-deep .el-table th {
  color: #7c9cb5;
  background-color: #2d4355 !important;
}
.table-main {
  width: 100%;
  height: 99%;
}
</style>

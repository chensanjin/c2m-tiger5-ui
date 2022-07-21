<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-06 13:59:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <el-table
      :data="tableData"
      style="width:100%;height:100%"
      height="100%"
      :header-cell-style="headMerge"
      :span-method="objectSpanMethod"
      :header-row-class-name="tableRowClassName"
    >
      <el-table-column ref="hongbei" label="烘焙" align="center">
        <el-table-column
          prop="productName"
          label="统计\单品"
          align="center"
          width="100"
        />
        <el-table-column
          prop="planPotNum"
          label="计划锅数(锅)"
          align="center"
          width="150"
        />
        <el-table-column
          prop="actualPotNum"
          label="实际锅数(锅)"
          align="center"
          width="150"
        />
        <el-table-column
          prop="assortment"
          label="每锅拼配(kg)"
          align="center"
          width="150"
        />
        <el-table-column
          prop="totalNum"
          label="生产总用量(kg)"
          align="center"
          width="150"
        />
        <el-table-column
          prop="cookedbeans"
          label="熟豆用量(kg)"
          align="center"
          width="150"
        />
        <el-table-column
          prop="lossWater"
          label="烘焙失水率"
          align="center"
          width="100"
        >
          <template slot-scope="{ row }">
            <span>{{ typeof row.lossWater === 'number' ? (row.lossWater * 100).toFixed(1) + '%' : '/' }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import { mapState } from 'vuex'
import { coffeePretreatment } from '@/api/datav/index.js'
export default {
  name: 'GrindSuger',
  data() {
    return {
      tableData: [],
      queryParams: {
        planNo: this.$store.state.planInfo.info.planCode,
        workshopCode: this.$route.meta.workshopCode,
        procedureCode: 'CO-02',
        productCode: this.$store.state.planInfo.info.productCode,
        planTime: this.$store.state.planInfo.time
      }
    }
  },
  watch: {
    planInfo: {
      handler(info) {
        if (Object.keys(info).length > 0) {
          this.queryParams.planNo = info.planCode
          this.queryParams.productCode = info.productCode
          this.getCoffeePretreatment()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.getCoffeePretreatment()
    this.$nextTick(() => {
      document.getElementsByClassName('success-row')[0].style.height = (document.getElementsByClassName('success-row')[0].clientHeight + 2) * 2 + 'px'
    })
  },
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    })
  },
  methods: {
    getCoffeePretreatment() {
      coffeePretreatment(this.queryParams).then(res => {
        this.tableData = res.data
      })
    },
    /**
     * @description: 合并头部单元格
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     * @return {*}
     */
    headMerge({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return { color: '#fffff', fontSize: '1.8rem !important' }
      }
      if (rowIndex === 1) {
        return { color: '#7C9CB5', background: '#3E556B !important' }
      }
    },
    /**
       * @description: 合并行
       * @param {*}
       * @return {*}
       */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      const dataProvider = this.tableData
      const cellValue = row[column.property]
      if (columnIndex !== 1 && columnIndex !== 2 && columnIndex !== 3) {
        if (cellValue) {
        // 上一条数据
          const prevRow = dataProvider[rowIndex - 1]
          // 下一条数据
          let nextRow = dataProvider[rowIndex + 1]
          // 当上一条数据等于下一条数据
          if (prevRow && prevRow[column.property] === cellValue) {
            return { rowspan: 0, colspan: 0 }
          } else {
            let rowspan = 1
            while (nextRow && nextRow[column.property] === cellValue) {
              rowspan++
              nextRow = dataProvider[rowspan + rowIndex]
            }
            if (rowspan > 1) {
              return { rowspan, colspan: 1 }
            }
          }
        }
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'success-row'
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped >
.table-main{
  width: 100%;
  height: 100%;
}
// 表头不换行
// .table-main ::v-deep .el-table th > .cell{
// white-space: nowrap !important;
// }

  @media screen and (max-width: 1920px) {
    ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type:before,
    ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type:after {
      font-size: 1.8rem;
    }
  }

</style>

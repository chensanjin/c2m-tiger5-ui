<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-12 09:51:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <el-table
      v-if="this.queryParams.planNo"
      :data="tableData"
      style="width: 100%; height: 100%"
      height="100%"
      :header-cell-style="headMerge"
      :span-method="objectSpanMethod"
    >
      <el-table-column :label="this.queryParams.planNo" align="center">
        <el-table-column
          prop="materialNameCn"
          label="统计\咖啡豆种类"
          align="center"
        />
      </el-table-column>
      <el-table-column label="生豆清洗" align="center">
        <el-table-column prop="lastDayBalance" label="上日结余(kg)" align="center" />
        <el-table-column prop="input" label="投入量(kg)" align="center" />
        <el-table-column
          prop="manufactureDate"
          label="生豆生产日期"
          align="center"
        />

        <el-table-column prop="water" label="水分" align="center" />
        <el-table-column label="清理剔除" align="center">
          <el-table-column prop="magnetEliminate" label="磁选" align="center" />
          <el-table-column prop="metalEliminate" label="金检" align="center" />
          <el-table-column prop="stockEliminate" label="去石" align="center" />
          <el-table-column
            prop="vibrationEliminate"
            label="振动筛"
            align="center"
          />
          <el-table-column prop="colorEliminate" label="色选" align="center" />
        </el-table-column>
        <el-table-column prop="lossRate" label="损耗率" align="center">
          <template slot-scope="{ row }">
            <span>{{ typeof row.lossRate === 'number' ? (row.lossRate * 100).toFixed(1) + '%' : '/' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="beanNum" label="本日清洁生豆用量(kg)" align="center" />
        <el-table-column prop="tankBalance" label="罐内结余(kg)" align="center">
          <!-- <template slot-scope="{ row }">
             <span>{{row.tankBalance*100+'%'}}</span>
          </template> -->
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
        procedureCode: 'CO-01',
        productCode: this.$store.state.planInfo.info.productCode,
        planTime: this.$store.state.planInfo.time
      }
    }
  },
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    })
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
  },
  methods: {
    getCoffeePretreatment() {
      coffeePretreatment(this.queryParams).then((res) => {
        this.tableData = res.data
        console.log(this.tableData, 'table')
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
      if (rowIndex === 1 || rowIndex === 2) {
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
      if (rowIndex === dataProvider.length - 1) {
        if (columnIndex === 5) {
          return [1, 5]
        } else if (columnIndex === 6 || columnIndex === 7 || columnIndex === 8 || columnIndex === 9) {
          return [0, 0]
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped >
.table-main {
  width: 100%;
  height: 100%;
}
// // 表头不换行
// .table-main ::v-deep .el-table th > .cell {
//   white-space: nowrap !important;
// }

@media screen and (max-width: 1920px) {
  ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type:before,
  ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type:after {
    font-size: 1.8rem;
  }
}
</style>

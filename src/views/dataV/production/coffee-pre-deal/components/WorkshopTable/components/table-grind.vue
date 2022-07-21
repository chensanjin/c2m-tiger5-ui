<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-06 13:34:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <el-table
      :data="tableData"
      style="width: 100%; height: 100%"
      height="100%"
      :header-cell-style="headMerge"
      :span-method="objectSpanMethod"
      :header-row-class-name="tableRowClassName"
    >
      <el-table-column label="研磨" align="center">
        <el-table-column prop="productName" label="统计\单品" align="center" />
        <el-table-column prop="powderOutput" label="出粉量(kg)" align="center" />
        <el-table-column prop="loss" label="标准损耗" align="center" />
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
        procedureCode: 'CO-03',
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
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    })
  },

  mounted() {
    this.getCoffeePretreatment()
    this.$nextTick(() => {
      document.getElementsByClassName('warning-row')[0].style.height =
          (document.getElementsByClassName('warning-row')[0].clientHeight + 2) *
            2 +
          'px'
    })
  },
  methods: {
    getCoffeePretreatment() {
      coffeePretreatment(this.queryParams).then((res) => {
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
      if (columnIndex === 0 || columnIndex === 2) {
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
        return 'warning-row'
      }
      return ''
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

// ::v-deep.el-table thead.is-group tr:nth-of-type(2) th {
//   overflow: hidden;
// }

// ::v-deep.el-table thead.is-group tr:nth-of-type(2) th:first-of-type:before {
//   content: "单品";
//   display: inline-block;
//   text-align: left;
//   position: absolute;
//   width: 15rem;
//   // height: 100%;
//   /* height: 1px; */
//   bottom: 0;
//   left: -3.5rem;
//   font-size: 1.6rem;
//   font-weight: normal;
//   padding-left: 5rem;
//   padding-bottom: 1rem;
// }

// ::v-deep.el-table thead.is-group tr:nth-of-type(2) th:first-of-type:after {
//   content: "统计";
//   display: inline-block;
//   text-align: right;
//   position: absolute;
//   width: 15rem;
//   // height: 100%;
//   // top: 1rem;
//   right: -4rem;
//   top: 0;
//   font-size: 1.6rem;
//   font-weight: normal;
//   padding-right: 5rem;
//   padding-top: 1rem;
// }

// ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type .cell {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 60rem;
//   height: 1px;
//   background-color: rgba(233, 238, 243, 0.2);
//   display: block;
//   text-align: center;
//   transform: rotate(48deg);
//   transform-origin: top left;
// }
// @media screen and (max-width: 1920px) {
//   ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type:before,
//   ::v-deep .el-table thead.is-group tr:nth-of-type(2) th:first-of-type:after {
//     font-size: 1.8rem;
//   }
// }
</style>

<template>
  <div class="table-main">
    <el-table
      :data="tableData"
      style="width:100%;height:100%"
      height="100%"
      :header-cell-style="headMerge"
      :span-method="objectSpanMethod"
    >
      <el-table-column label="混料" align="center">
        <el-table-column
          prop="mixingPotNo"
          label="统计\指标"
          align="center"
        />
        <el-table-column
          prop="potNo"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="mixingWeight"
          label="混料重量(kg)"
          align="center"
          width="120"
        />
        <el-table-column
          prop="startTime"
          label="开始时间"
          align="center"
        />
        <el-table-column
          prop="endTime"
          label="结束时间"
          align="center"
        />
        <el-tooltip content="混料标准时间" placement="top">
          <el-table-column
            prop="duration"
            label="混料标准时间"
            align="center"
            width="150"
          />
        </el-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { preFillingList } from '@/api/datav'
export default {
  name: 'MixTable',
  data() {
    return {
      params: {
        planNo: this.$store.state.planInfo.info.planCode,
        workshopCode: this.$route.meta.workshopCode,
        procedureCode: 'MO-03',
        productCode: this.$store.state.planInfo.info.productCode,
        planTime: this.$store.state.planInfo.time
      },
      tableData: []
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
          this.params.planNo = info.planCode,
          this.params.productCode = info.productCode
          this.getDryMixTable()
        }
      },
      immediate: true
    }
  },

  created() {
    this.getDryMixTable()
  },
  methods: {
    /**
     * @description: 获取干混-混料的值
     * @param {*}
     * @return {*}
     */
    getDryMixTable() {
      preFillingList(this.params).then((res) => {
        if (res.data) {
          const data = [...res.data]
          this.tableData = [...data]
        } else {
          this.tableData = []
        }
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
      if (columnIndex === 0) {
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
.table-main ::v-deep .el-table th > .cell{
white-space: nowrap !important;
}

</style>

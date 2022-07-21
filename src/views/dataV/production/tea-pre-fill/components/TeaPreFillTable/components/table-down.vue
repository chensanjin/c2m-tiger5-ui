<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-08 17:46:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <el-table
      :data="tableList"
      height="100%"
      :cell-style="cellStyle"
      :header-cell-style="headMerge"
      :span-method="objectSpanMethod"
    >
      <el-table-column label="" align="center">
        <el-table-column
          label=""
          prop="lineName"
          width="150"
          align="center"
        />
        <el-table-column
          label=""
          prop="model"
          width="150"
          align="center"
        />
      </el-table-column>
      <el-table-column prop="laborHours" label="人工工时(h)" align="center" />
      <el-table-column prop="machineHours" label="机器工时(h)" align="center" />
      <el-table-column prop="electric" label="电(kw.h)" align="center" />
      <el-table-column prop="startupTime" label="开机时间" align="center" />
      <el-table-column prop="shutdownTime" label="收机时间" align="center" />
      <el-table-column prop="consumeTime" label="程序耗时间(h)" align="center" />
      <!-- <el-table-column
        prop="realEffeRatio"
        label="真实效率(t/h)"
        align="center"
      >
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'DryWetTime',
  props: {
    tableList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      CONSTANT: {
        M1CODE: 'pl20210005',
        M2CODE: 'pl20210006',
        TOTALCODE: 'total'
      },

      tableData: [
      ]
    }
  },
  created() {
  },
  methods: {
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
        if (columnIndex === 0) {
          this.$nextTick(() => {
            if (document.getElementsByClassName(column.id).length !== 0) {
              document
                .getElementsByClassName(column.id)[0]
                .setAttribute('rowSpan', 4)
              return false
            }
          })
          return column
        }
        return { color: '#7C9CB5', background: '#223141 !important' }
      }
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
      const dataProvider = this.tableList
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
      if (rowIndex === dataProvider.length - 1) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";

.table-main {
  width: 100%;
  height: 99%;
  ::v-deep thead.has-gutter > tr:last-child {
    display: none;
  }
}
</style>

<template>
  <div class="table-main">
    <el-table
      :data="tableList"
      height="100%"
      :header-cell-style="headMerge"
      :cell-style="cellStyle"
      :span-method="objectSpanMethod"
      cell-class-name="cell-item"
    >
      <el-table-column label="" align="center">
        <el-table-column
          label=""
          prop="name"
          align="center"
          width="100%"
        />
        <el-table-column
          label=""
          prop="model"
          align="center"
          width="100%"
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

      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      position: 0,
      contentSpanArr: []
    }
  },
  watch: {
    tableList: {
      handler(list) {
        if (list.length > 0) {
          this.getList()
        }
      },
      immediate: true
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
        //   return { background: "#223141 !important" };
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
      if (columnIndex === 0 || columnIndex === 1 || rowIndex === 1) {
        return { display: 'none' }
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
      if (rowIndex === dataProvider.length - 1) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.contentSpanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getList() {
      // 设定一个数组spanArr/contentSpanArr来存放要合并的格数，同时还要设定一个变量pos/position来记录
      this.spanArr = []
      this.contentSpanArr = []

      for (let i = 0; i < this.tableList.length; i += 1) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
          this.contentSpanArr.push(1)
          this.position = 0
        } else {
          // 判断当前元素与上一个元素是否相同(第1和第2列)
          if (this.tableList[i].index === this.tableList[i - 1].index) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
          this.contentSpanArr.push(1)
          this.position = i
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
  height: 100%;

  ::v-deep thead.has-gutter > tr:last-child {
    display: none;
  }
}

</style>

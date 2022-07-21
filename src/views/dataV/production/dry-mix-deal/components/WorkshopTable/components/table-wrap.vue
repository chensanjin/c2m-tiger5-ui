<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-09 11:36:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <el-table
      :data="tableData.tableBody"
      style="width: 100%"
      height="100%"
      :header-cell-style="headMerge"
    >
      <el-table-column label="包配" align="center">
        <template v-for="item in tableData.tableHeader">
          <el-table-column
            :key="item.id"
            :label="item.meterNameEn?item.materialNameCn+'('+item.meterNameEn+')':item.materialNameCn"
            align="center"
          >
            <template slot-scope="scope">
              <span v-for=" v in scope.row" :key="v.id">
                {{ v.materialCode===item.materialCode?v.value:'' }}
              </span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import Vuex from 'vuex'
import { preFillingList } from '@/api/datav'

export default {
  name: 'GrindSuger',
  data() {
    return {
      tableData: {},
      params: {
        planNo: this.$store.state.planInfo.info.planCode,
        workshopCode: this.$route.meta.workshopCode,
        procedureCode: 'MO-02',
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
          this.params.planNo = info.planCode,
          this.params.productCode = info.productCode
          this.getDryMixWarp()
        }
      },
      immediate: true
    }
  },
  created() {
    this.getDryMixWarp()
  },
  methods: {
    /**
     * @description: 获取干混-包配
     * @param {*}
     * @return {*}
     */
    getDryMixWarp() {
      preFillingList(this.params).then((res) => {
        if (res.data) {
          this.tableData = { ...res.data }
        } else {
          this.tableData = {}
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
    }
  }
}
</script>
<style lang="scss" >
.table-main {
  width: 100%;
  height: 100%;
}
</style>

<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-08 13:55:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <el-table :data="tableData" style="width:100%;" height="100%" :header-cell-style="headMerge">
      <el-table-column :label="planNo" align="center">
        <el-table-column prop="name" label="原料\统计" width="150" align="center" />
      </el-table-column>
      <el-table-column label="磨糖" align="center">
        <el-table-column prop="input" label="投入量" align="center" />
        <el-table-column prop="output" label="出粉量" align="center" />
        <el-table-column prop="wastage" label="标准损耗" align="center" />
      </el-table-column>
    </el-table>
    <!-- <div>{{this.planInfo}}</div> -->
  </div>
</template>
<script>
import {
  mapState
} from 'vuex'
import {
  preFillingList
} from '@/api/datav'
export default {
  name: 'GrindSuger',
  data() {
    return {
      tableData: [],
      params: {
        planNo: this.$store.state.planInfo.info.planCode,
        workshopCode: this.$route.meta.workshopCode,
        procedureCode: 'MO-01',
        productCode: this.$store.state.planInfo.info.productCode,
        planTime: this.$store.state.planInfo.time
      },
      planNo: ''
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
          this.planNo = info.planCode
          this.params.productCode = info.productCode
          this.getDryMixSuger()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.getDryMixSuger()
    })
  },

  methods: {
    /**
       * @description: 获取干混-磨糖的值
       * @param {*}
       * @return {*}
       */
    getDryMixSuger() {
      preFillingList(this.params).then((res) => {
        this.tableData = []
        if (res.data) {
          const list = {
            name: '白糖',
            wastage: '13',
            input: res.data[0].input,
            output: res.data[0].output
          }
          this.tableData[0] = { ...list }
        } else {
          const list = {
            name: '白糖',
            wastage: '13',
            input: 0,
            output: 0
          }
          this.tableData[0] = { ...list }
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
    headMerge({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (rowIndex === 0) {
        return {
          color: '#fffff',
          fontSize: '1.8rem !important'
        }
      }
      if (rowIndex === 1) {
        return {
          color: '#7C9CB5',
          background: '#3E556B !important'
        }
      }
    },

    // 合并行
    arraySpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
    },
    objectSpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      // const  length=this.tableData.length
      // if (columnIndex === 0) {
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    }
  }

}

</script>
<style lang="scss" scoped>
  @import '~@/assets/styles/table.scss';

  .table-main {
    width: 100%;
    height: 100%;
  }

</style>

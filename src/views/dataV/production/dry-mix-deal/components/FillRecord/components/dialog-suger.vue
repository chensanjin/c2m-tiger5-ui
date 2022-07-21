<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-07-02 11:31:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\FillRecord\components\PreTableForm.vue
-->
<template>
  <div class="table-main">
    <el-form ref="form" :model="tableData.workStatistics[0]">
      <el-form-item label="单号:">
        <template>
          <el-select v-model="this.tableData.planNo" disabled size="mini" placeholder="请选择单号">
            <el-option v-for="item in numbers" :key="item.id" :label="item.planNum" :value="item.planNum" />
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.content" style="width: 100%" :header-cell-style="headMerge">
      <el-table-column prop="input" label="投入量(kg)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.input" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="output" label="出粉量(kg)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.output" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
    </el-table>
    <div class="table-main-line" />
    <el-form ref="form" label-position="right" label-width="10rem" :model="form">
      <el-form-item label="人工工时(h):">
        <el-input v-model="tableData.workStatistics[0].laborHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label="机器工时(h):">
        <el-input v-model="tableData.workStatistics[0].machineHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label="电(kw/h):">
        <el-input v-model="tableData.workStatistics[0].electric" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label="开机时间:" label-position="right" label-width="10rem">
        <el-date-picker
          v-model="tableData.workStatistics[0].startupTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:10%"
          placeholder="选择开机时间"
        />
      </el-form-item>
      <el-form-item label="收机时间:" label-position="right" label-width="10rem">
        <el-date-picker
          v-model="tableData.workStatistics[0].shutdownTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:10%"
          placeholder="选择收机时间"
        />
      </el-form-item>
      <el-form-item label="程序耗时:" label-position="right" label-width="10rem">
        <el-input v-model="tableData.workStatistics[0].consumeTime" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import Vuex from 'vuex'
import {
  saveWorkRecord,
  getListNoPage,
  getReportDetail,
  getPotQuantity
} from '@/api/datav'
export default {
  data() {
    return {
      tableData: {
        planNo: this.$store.state.planInfo.info.planCode,
        orderNo: null,
        workshopCode: this.$route.meta.workshopCode,
        workshopName: this.$route.meta.title,
        procedureCode: 'MO-01',
        procedureName: '磨糖',
        productCode: this.$store.state.planInfo.info.productCode,
        productName: this.$store.state.planInfo.info.productName,
        technology: 'MT-01',
        content: [],
        workStatistics: [{
          laborHours: 0,
          machineHours: 0,
          electric: 0,
          startupTime: '',
          shutdownTime: '',
          consumeTime: 0
        }]
      },
      form: {},
      numbers: []
    }
  },
  mounted() {
    this.getlastData()
    /**
       * @description: 获取单号
       * @param {*}
       * @return {*}
       */
    getListNoPage().then(res => {
      this.numbers = res.data
    })
  },
  methods: {
    /**
       * @description: 数据回显
       * @param {*}
       * @return {*}
       */
    getlastData() {
      const params = {
        workshopCode: this.$route.meta.workshopCode,
        procedureCode: 'MO-01',
        productCode: this.$store.state.planInfo.info.productCode,
        planNo: this.$store.state.planInfo.info.planCode,
        planTime: this.$store.state.planInfo.time
      }
      getReportDetail(params).then((res) => {
        if (res.data) {
          this.tableData = {
            ...res.data
          }
        } else {
          const data = {
            input: 0,
            output: 0
          }
          this.tableData.content.push(data)
        }
      })
    },
    /**
       * @description: 数据处理
       * @param {*}
       * @return {*}
       */
    handleSubmit() {
      const data = this.tableData
      saveWorkRecord(data).then((res) => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
          this.$emit('ok')
        }
      }).catch((err) => {
        this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
        console.log(err)
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
      if (rowIndex === 1 && columnIndex >= 2 && columnIndex <= 9) {
        return {
          color: '#7C9CB5',
          background: '#3E556B !important'
        }
      }
      if (rowIndex === 1) {
        return {
          color: '#7C9CB5',
          background: '#3E556B !important'
        }
        if (columnIndex === 0 || columnIndex === 1) {
          return {
            display: 'none'
          }
        }
      } else {
        return {
          color: '#7C9CB5'
        }
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~@/views/dataV/styles/form.scss'; //form css
  @import '~@/views/dataV/styles/table.scss'; //table css

  .table-main {
    width: 100%;
    height: 100%;

    &-line {
      width: 100%;
      height: .1rem;
      background-color: #576F85;
      margin: 2rem 0;
    }
  }

</style>

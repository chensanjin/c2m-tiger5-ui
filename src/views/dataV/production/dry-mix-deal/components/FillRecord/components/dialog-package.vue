<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-07-05 17:58:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\FillRecord\components\Suger.vue
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
      <el-table :data="tableData.content" style="width: 100%">
        <el-table-column label="实际锅数" align="center">
          <template slot-scope="scope">
            第{{ scope.$index + 1 }}锅
          </template>
        </el-table-column>
        <el-table-column v-for="item in labelList" :key="item.id" :label="item.materialNameCn" :prop="item.materialCode">
          <template slot-scope="{ row }">
            <el-input v-model="row[item.materialCode]" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
      </el-table>
      <div class="table-main-line" />
      <el-form-item label-position="right" label-width="11rem" label="人工工时(h):">
        <el-input v-model="tableData.workStatistics[0].laborHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label-position="right" label-width="11rem" label="机器工时(h):">
        <el-input v-model="tableData.workStatistics[0].machineHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label-position="right" label-width="11rem" label="电(kw/h):">
        <el-input v-model="tableData.workStatistics[0].electric" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <div class="table-main-line" />
      <el-form-item label-position="right" label-width="11rem" label="开机时间:">
        <el-date-picker
          v-model="tableData.workStatistics[0].startupTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
          style="width:10%"
        />
      </el-form-item>
      <el-form-item label-position="right" label-width="11rem" label="收机时间:">
        <el-date-picker
          v-model="tableData.workStatistics[0].shutdownTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          size="small"
          style="width:10%"
        />
      </el-form-item>
      <el-form-item label-position="right" label-width="11rem" label="程序耗时间(h):">
        <el-input v-model="tableData.workStatistics[0].consumeTime" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:10%" />
      </el-form-item>
      <!--      <el-form-item label="开机时间:">-->
      <!--        <el-input v-model="form.laborHours" size="small" style="width:10%" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="收机时间:">-->
      <!--        <el-input v-model="form.machineHour" size="small" style="width:10%" />-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="程序耗时间(h):">-->
      <!--        <el-input v-model="form.electricityNumber" size="small" style="width:10%" />-->
      <!--      </el-form-item>-->
    </el-form>
  </div>

</template>

<script>
import {
  getCapsulebatchNum,
  getPotQuantity,
  getWorkRecord,
  getListNoPage,
  getReportDetail,
  getMixmaterialpot,
  saveWorkRecord
} from '@/api/datav'
import Vuex from 'vuex'

export default {
  data() {
    return {
      tableData: {
        planNo: this.$store.state.planInfo.info.planCode,
        orderNo: null,
        workshopCode: this.$route.meta.workshopCode,
        workshopName: this.$route.meta.title,
        procedureCode: 'MO-02',
        procedureName: '包配',
        productCode: this.$store.state.planInfo.info.productCode,
        productName: this.$store.state.planInfo.info.productName,
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
      labelList: [],
      mixpotList: [],
      numbers: []
    }
  },
  created() {
    this.getWorkRecordList()
    this.getMixpotList()
    this.getNoList()
  },
  mounted() {
  },
  methods: {
    /**
     * @description: 获取单号
     * @param {*}
     * @return {*}
     */
    getNoList() {
      getListNoPage().then(res => {
        this.numbers = res.data
      })
    },
    /**
     * @description: 获取表头
     * @param {*}
     * @return {*}
     */
    getWorkRecordList() {
      const data = {
        procedureCode: 'MO-02',
        productCode: this.$store.state.planInfo.info.productCode
      }
      getWorkRecord(data).then((res) => {
        this.labelList = [...res.data]
        const params = {
          workshopCode: this.$route.meta.workshopCode,
          procedureCode: 'MO-02',
          productCode: this.$store.state.planInfo.info.productCode,
          planNo: this.$store.state.planInfo.info.planCode,
          planTime: this.$store.state.planInfo.time
        }
        getReportDetail(params).then((res) => {
          if (res.data.id) {
            this.tableData = { ...res.data }
          } else {
            this.tableData.content = [...res.data.content]
          }
          // } else {
          //   const data = {
          //     procedureCode: "MO-02",
          //     planNo: this.$store.state.planInfo.info.planCode,
          //     // planTime:moment().format("YYYY-MM-DD"),
          //     planTime: this.$store.state.planInfo.time
          //   }
          //   getPotQuantity(data).then((res) => {
          //     if (res.data > 0) {
          //       let data = {}
          //       this.labelList.map((item) => {
          //         data[item.materialCode] = 0
          //       })
          //       for (let i = 0; i < res.data; i++) {
          //         this.tableData.content.push(data)
          //       }
          //     } else {
          //       let data = {}
          //       this.labelList.map((item) => {
          //         data[item.materialCode] = 0
          //       })
          //       this.tableData.content.push(data)
          //     }
          //   })
          // }
        })
      })
    },
    /**
     * @description:获取混料锅列表
     * @param {*}
     * @return {*}
     */
    getMixpotList() {
      getMixmaterialpot().then((res) => {
        this.mixpotList = [...res.data]
      }).catch((err) => {
        console.log(err)
      })
    },

    /**
     * @description:数据提交
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
    labelHead(h, { column, index }) {
      // 将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('span', { class: 'table-head', style: { width: '100%' }}, [column.label])
    },
    checkEditSaveOk(row) {
      row.edit = !row.edit
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/views/dataV/styles/form.scss';
//form css
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


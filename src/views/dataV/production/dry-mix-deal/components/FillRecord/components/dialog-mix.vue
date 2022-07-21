<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-07-12 10:50:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\FillRecord\components\PreTableForm.vue
-->
<template>
  <div class="table-main">
    <el-form ref="form" :model="form">
      <el-form-item label="单号:">
        <template>
          <el-select v-model="this.tableData.planNo" disabled size="mini" placeholder="请选择单号">
            <el-option v-for="item in numbers" :key="item.id" :label="item.planNum" :value="item.planNum" />
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.content" style="width: 100%">
      <el-table-column prop="potNo" label="锅号" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.potNo" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          <!-- <el-select v-model="row.potNo" size="mini" placeholder="请选择锅号" style="width: 100%">
          <el-option v-for="item in codes" :key="item" :label="item" :value="item"/>
        </el-select> -->
        </template>
      </el-table-column>
      <el-table-column prop="mixingPotNo" label="混料锅" align="center">
        <template slot-scope="{ row }">
          <el-select v-model="row.mixingPotNo" size="mini" placeholder="请选择混料锅" style="width: 100%">
            <el-option v-for="item in mixpotList" :key="item.id" :label="item.dictLabel" :value="item.dictLabel" />
          </el-select>
          <!-- <el-input v-model="row.mixingPotNo" size="small" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="mixingWeight" label="混料重量(kg)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.mixingWeight" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center">
        <template slot-scope="{ row }">
          <el-date-picker
            v-model="row.startTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开始时间"
          />
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center">
        <template slot-scope="{ row }">
          <el-date-picker
            v-model="row.endTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择结束时间"
          />
        </template>
      </el-table-column>
    </el-table>
    <div class="table-break-line" />
    <el-table :data="tableData.workStatistics" style="width: 100%">
      <el-table-column prop="mixingPotNo" label="混料锅" align="center" width="180">
        <template slot-scope="{ row }">
          <el-select v-model="row.mixingPotNo" size="mini" placeholder="请选择混料锅">
            <el-option v-for="item in mixpotList" :key="item.id" :label="item.dictLabel" :value="item.dictLabel" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="laborHours" label="人工工时(h)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.laborHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="machineHours" label="机器工时(h)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.machineHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="electric" label="电(kw.h)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.electric" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="startupTime" label="开机时间" align="center">
        <template slot-scope="{ row }">
          <el-date-picker
            v-model="row.startupTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开机时间"
          />
        </template>
      </el-table-column>
      <el-table-column prop="shutdownTime" label="收机时间" align="center">
        <template slot-scope="{ row }">
          <el-date-picker
            v-model="row.shutdownTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择收机时间"
          />
        </template>
      </el-table-column>
      <el-table-column prop="consumeTime" label="程序耗时间(h)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model="row.consumeTime" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vuex from 'vuex'
import {
  getMixmaterialpot,
  saveWorkRecord,
  getPotQuantity,
  getListNoPage,
  getReportDetail
} from '@/api/datav'
export default {
  data() {
    return {
      tableData: {
        planNo: this.$store.state.planInfo.info.planCode,
        orderNo: null,
        workshopCode: this.$route.meta.workshopCode,
        workshopName: this.$route.meta.title,
        procedureCode: 'MO-03',
        procedureName: '混料',
        productCode: this.$store.state.planInfo.info.productCode,
        productName: this.$store.state.planInfo.info.productName,
        content: [],
        workStatistics: [
          {
            mixingPotNo: '',
            laborHours: 0,
            machineHours: 0,
            electric: 0,
            startupTime: '',
            shutdownTime: '',
            consumeTime: 0
          },
          {
            mixingPotNo: '',
            laborHours: 0,
            machineHours: 0,
            electric: 0,
            startupTime: '',
            shutdownTime: '',
            consumeTime: 0
          }
        ]
      },
      form: {},
      mixpotList: [],
      numbers: []
    }
  },
  created() {
    this.getMixpotList(),
    this.getNoList()
    this.getlastData()
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
        procedureCode: 'MO-03',
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
            procedureCode: 'MO-03',
            planNo: this.$store.state.planInfo.info.planCode,
            planTime: this.$store.state.planInfo.time
          }
          getPotQuantity(data).then((res) => {
            if (res.data > 0) {
              for (let i = 0; i < res.data; i++) {
                this.tableData.content.push({
                  potNo: '',
                  mixingPotNo: '',
                  mixingWeight: '',
                  startTime: '',
                  endTime: ''
                })
              }
            } else {
              this.tableData.content.push({
                potNo: '',
                mixingPotNo: '',
                mixingWeight: '',
                startTime: '',
                endTime: ''
              })
            }
          })
        }
      })
    },
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
       * @description:获取混料锅列表
       * @param {*}
       * @return {*}
       */
    getMixpotList() {
      getMixmaterialpot().then((res) => {
        this.mixpotList = [...res.data]
      })
    },
    /**
       * @description:数据提交
       * @param {*}
       * @return {*}
       */
    handleSubmit() {
      const data = this.tableData
      debugger
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

  .table-break {
    width: 100%;
    height: 100%;

    &-line {
      width: 100%;
      height: 5rem;
      background-color: #576F8500;
      margin: 2rem 0;
    }
  }

</style>

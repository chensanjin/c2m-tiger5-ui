<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-08-12 18:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\FillRecord\components\PreTableForm.vue
-->
<template>
  <div class="table-main">
    <el-form ref="form" :model="form">
      <el-form-item label="单号:">
        <span>{{ form.planNo }}</span>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.content" style="width: 100%">
      <el-table-column prop="lineCode" label="线体">
        <template slot-scope="{ row, $index }">
          <span>{{ lineList[$index].lineName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalNum" label="总生产量(PCS)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.totalNum"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="qualifiedNum" label="合格数(PCS)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.qualifiedNum"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="defectiveNum" label="次品数量(PCS)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.defectiveNum"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="unqualifiedNum" label="不合规数(PCS)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.unqualifiedNum"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="samplingNum" label="品质取样(PCS)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.samplingNum"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="cupBody" label="杯体(PCS)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.cupBody"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="滤纸(PCS)"  >
      <template slot-scope="{ row }">
        <el-input v-model="row.address" size="small" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="滤水盘(PCS)"  >
      <template slot-scope="{ row }">
        <el-input v-model="row.edit" size="small" />
      </template>
    </el-table-column>
     <el-table-column prop="name" label="铝箔(PCS)"  >
      <template slot-scope="{ row }">
        <el-input v-model="row.edit" size="small" />
      </template>
    </el-table-column> -->
    </el-table>
    <div class="table-main-line" />
    <el-table :data="tableData.workStatistics" style="width: 100%">
      <el-table-column prop="lineCode" label="线体">
        <template slot-scope="{ row, $index }">
          <span>{{ lineList[$index].lineName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="laborHours" label="人工工时(h)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.laborHours"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="machineHours" label="机器工时(h)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.machineHours"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="electric" label="电(kw.h)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.electric"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
      <el-table-column prop="startupTime" label="开机时间">
        <template slot-scope="{ row }">
          <el-date-picker
            v-model="row.startupTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择开机时间"
          />
          <!-- <el-input v-model="row.startupTime" size="small" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="shutdownTime" label="收机时间">
        <template slot-scope="{ row }">
          <el-date-picker
            v-model="row.shutdownTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择收机时间"
          />
          <!-- <el-input v-model="row.shutdownTime" size="small" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="consumeTime" label="程序耗时(h)">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.consumeTime"
            type="number"
            oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
            size="small"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  getLines,
  getListNoPage,
  saveWorkRecord,
  backDisplay
} from '@/api/datav'
import Vuex from 'vuex'

export default {
  data() {
    return {
      tableData: {
        planNo: this.$store.state.planInfo.info.planCode,
        orderNo: 'SF10086-20210624',
        workshopCode: this.$route.meta.workshopCode,
        workshopName: this.$route.meta.title,
        procedureCode: 'CO-04',
        procedureName: '咖啡预置',
        productCode: this.$store.state.planInfo.info.productCode,
        productName: this.$store.state.planInfo.info.productName,
        technologyCode: 'TT-02',
        content: [
          {
            lineCode: '',
            lineName: '',
            totalNum: 0,
            qualifiedNum: 0,
            defectiveNum: 0,
            unqualifiedNum: 0,
            samplingNum: 0,
            cupBody: 0
          },
          {
            lineCode: '',
            lineName: '',
            totalNum: 0,
            qualifiedNum: 0,
            defectiveNum: 0,
            unqualifiedNum: 0,
            samplingNum: 0,
            cupBody: 0
          }
        ],
        workStatistics: [
          {
            lineCode: '',
            lineName: '',
            laborHours: 0,
            machineHours: 0,
            electric: 0,
            startupTime: '',
            shutdownTime: '',
            consumeTime: 0
          },
          {
            lineCode: '',
            lineName: '',
            laborHours: 0,
            machineHours: 0,
            electric: 0,
            startupTime: '',
            shutdownTime: '',
            consumeTime: 0
          }
        ]
      },
      lineList: [
        {
          lineCode: '',
          lineName: ''
        },
        {
          lineCode: '',
          lineName: ''
        }
      ],
      planNoList: [],
      form: {
        planNo: this.$store.state.planInfo.info.planCode
      }
    }
  },
  created() {
    // this.getListNo()
    const param = {
      planNo: this.$store.state.planInfo.info.planCode,
      workshopCode: this.$route.meta.workshopCode,
      productCode: this.$store.state.planInfo.info.productCode,
      procedureCode: 'CO-04',
      technologyCode: 'TT-02',
      planTime: this.$store.state.planInfo.time
    }
    backDisplay(param).then(res => {
      if (res.data) {
        this.tableData.content = res.data.content
        this.tableData.workStatistics = res.data.workStatistics
        this.tableData.id = res.data.id
      }
    })
    this.getLineList()
  },
  methods: {
    /**
     * @description: 数据处理
     * @param {*}
     * @return {*}
     */
    handleSubmit() {
      const data = this.tableData
      this.lineList.map(item => {
        if (data.content.length > 0) {
          data.content.map(el => {
            if (item.lineCode === el.lineCode) {
              el.lineName = item.lineName
            }
          })
        }
        if (data.workStatistics.length > 0) {
          data.workStatistics.map(v => {
            if (item.lineCode === v.lineCode) {
              v.lineName = item.lineName
            }
          })
        }
      })
      saveWorkRecord(data)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
            this.$emit('ok')
          }
        })
        .catch(err => {
          this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
          console.log(err)
        })
    },
    /**
     * @description: 获取单号
     * @param {*}
     * @return {*}
     */
    //  getListNo(){
    //       getListNoPage().then((res)=>{
    //       this.planNoList=[...res.data]
    //     }).catch((err)=>{
    //       console.log(err)
    //     })
    //   },
    /**
     * @description: 获取线体
     * @param {*}
     * @return {*}
     */
    getLineList() {
      const workshopCode = 'TD-02'
      getLines({ workshopCode })
        .then(res => {
          this.lineList = [...res.data]
          res.data.forEach((item, index) => {
            this.tableData.content[index].lineCode = item.lineCode
            this.tableData.content[index].lineName = item.lineName
            this.tableData.workStatistics[index].lineCode = item.lineCode
            this.tableData.workStatistics[index].lineName = item.lineName
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkEditSaveOk(row) {
      row.edit = !row.edit
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
    height: 0.1rem;
    background-color: #576f85;
    margin: 2rem 0;
  }
}
</style>

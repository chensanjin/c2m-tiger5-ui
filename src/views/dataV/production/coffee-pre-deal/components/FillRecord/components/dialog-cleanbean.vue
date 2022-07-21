<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-07-12 09:53:36
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
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="materialNameCn" label="咖啡豆种类">
          <template slot-scope="{ row }">
            <span>{{ row.materialNameCn }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="input" label="投入量(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.input" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="beanNum" label="用豆数量(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.beanNum" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="manufactureDate" label="生豆生产日期" width="220">
          <template slot-scope="{ row }">
            <el-date-picker
              v-model="row.manufactureDate"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择生豆生产日期"
              style="width:100%"
            />
            <!-- <el-input v-model="row.manufactureDate" size="small" /> -->
          </template>
        </el-table-column>
        <el-table-column prop="water" label="水分" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.water" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="magnetEliminate" label="磁选剔除(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.magnetEliminate" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="metalEliminate" label="金检剔除(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.metalEliminate" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="stockEliminate" label="去石剔除(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.stockEliminate" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="vibrationEliminate" label="震动剔除(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.vibrationEliminate" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="vibrationEliminate" label="色选剔除(kg)" width="180">
          <template slot-scope="{ row }">
            <el-input v-model="row.colorEliminate" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" />
          </template>
        </el-table-column>
      </el-table>
      <div class="table-main-line" />
      <el-form-item label="人工工时(h):" label-position="right" label-width="10rem">
        <el-input v-model="form.laborHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:15%" />
      </el-form-item>
      <el-form-item label="机器工时(h):" label-position="right" label-width="10rem">
        <el-input v-model="form.machineHours" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:15%" />
      </el-form-item>
      <el-form-item label="电(kw.h):" label-position="right" label-width="10rem">
        <el-input v-model="form.electric" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:15%" />
      </el-form-item>
      <el-form-item label="开机时间:" label-position="right" label-width="10rem">
        <el-date-picker
          v-model="form.startupTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:15%"
          placeholder="选择开机时间"
        />
      </el-form-item>
      <el-form-item label="收机时间:" label-position="right" label-width="10rem">
        <el-date-picker
          v-model="form.shutdownTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width:15%"
          placeholder="选择收机时间"
        />
      </el-form-item>
      <el-form-item label="程序耗时:" label-position="right" label-width="10rem">
        <el-input v-model="form.consumeTime" type="number" oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value" size="small" style="width:15%" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMaterial, getListNoPage, backDisplay } from '@/api/datav/index.js'
export default {
  data() {
    return {
      tableData: [{
        beanNum: 0,
        colorEliminate: 0,
        input: 0,
        lastDayBalance: 0,
        lossRate: 0,
        magnetEliminate: 0,
        manufactureDate: '',
        materialCode: '',
        materialNameCn: '',
        metalEliminate: 0,
        stockEliminate: 0,
        tankBalance: 0,
        vibrationEliminate: 0,
        water: 0
      }],
      form: {
        laborHours: 0,
        machineHours: 0,
        electric: 0,
        startupTime: '',
        shutdownTime: '',
        consumeTime: 0,
        planNo: this.$store.state.planInfo.info.planCode
      },
      numbers: []
    }
  },
  mounted() {
    const param = {
      planNo: this.$store.state.planInfo.info.planCode,
      workshopCode: this.$route.meta.workshopCode,
      productCode: this.$store.state.planInfo.info.productCode,
      procedureCode: 'CO-01',
      planTime: this.$store.state.planInfo.time
    }
    backDisplay(param).then((res) => {
      if (res.data) {
        this.tableData = res.data.content
        Object.assign(this.form, res.data.workStatistics[0])
        this.form.id = res.data.id
      } else {
        getMaterial({ procedureCode: 'CO-01', productCode: this.$store.state.planInfo.info.productCode }).then(res => {
          res.data.forEach(item => {
            item = Object.assign(item, {
              beanNum: 0,
              colorEliminate: 0,
              input: 0,
              lastDayBalance: 0,
              lossRate: 0,
              magnetEliminate: 0,
              manufactureDate: '',
              metalEliminate: 0,
              stockEliminate: 0,
              tankBalance: 0,
              vibrationEliminate: 0,
              water: 0
            })
          })
          this.tableData = res.data
        })
      }
    })
    getListNoPage().then(res => {
      this.numbers = res.data
    })
  },
  methods: {
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
      height: .1rem;
      background-color: #576F85;
      margin: 2rem 0;
    }
  }

</style>

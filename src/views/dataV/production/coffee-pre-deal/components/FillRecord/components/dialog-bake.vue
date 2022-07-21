<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-07-12 10:27:10
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
        <el-table-column prop="potNo" label="锅数">
          <template slot-scope="{ row }">
            <div>第{{ row.potNo }}锅</div>
          </template>
        </el-table-column>
        <el-table-column prop="assortment" label="每锅拼配">
          <template slot-scope="{ row }">
            <el-select v-model.number="row.assortment" placeholder="请选择拼配">
              <el-option
                v-for="item in options"
                :key="item.dictCode"
                :label="item.dictLabel"
                :value="item.dictLabel"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="cookedbeans" label="熟豆数量">
          <template slot-scope="{ row }">
            <el-input v-model="row.cookedbeans" size="small" />
          </template>
        </el-table-column>
      </el-table>
      <div class="table-main-line" />
      <el-form-item
        label="人工工时(h):"
        label-position="right"
        label-width="10rem"
      >
        <el-input
          v-model="form.laborHours"
          size="small"
          style="width: 15%"
          type="number"
        />
      </el-form-item>
      <el-form-item
        label="机器工时(h):"
        label-position="right"
        label-width="10rem"
      >
        <el-input
          v-model="form.machineHours"
          type="number"
          oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
          size="small"
          style="width: 15%"
        />
      </el-form-item>
      <el-form-item
        label="电(kw.h):"
        label-position="right"
        label-width="10rem"
      >
        <el-input
          v-model="form.electric"
          type="number"
          oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
          size="small"
          style="width: 15%"
        />
      </el-form-item>
      <el-form-item
        label="天然气(m³):"
        label-position="right"
        label-width="10rem"
      >
        <el-input
          v-model="form.naturalGas"
          type="number"
          oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
          size="small"
          style="width: 15%"
        />
      </el-form-item>
      <el-form-item
        label="开机时间:"
        label-position="right"
        label-width="10rem"
      >
        <el-date-picker
          v-model="form.startupTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 15%"
          placeholder="选择开机时间"
        />
      </el-form-item>
      <el-form-item
        label="收机时间:"
        label-position="right"
        label-width="10rem"
      >
        <el-date-picker
          v-model="form.shutdownTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          style="width: 15%"
          placeholder="选择收机时间"
        />
      </el-form-item>
      <el-form-item
        label="程序耗时:"
        label-position="right"
        label-width="10rem"
      >
        <el-input
          v-model="form.consumeTime"
          type="number"
          oninput="value=value.indexOf('.') > -1?value.slice(0, value.indexOf('.') + 3):value"
          size="small"
          style="width: 15%"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getPotQuantity,
  getRatioPerPot,
  getListNoPage,
  backDisplay
} from '@/api/datav/index.js'
export default {
  data() {
    return {
      tableData: [],
      form: {
        laborHours: 0,
        machineHours: 0,
        electric: 0,
        startupTime: '',
        shutdownTime: '',
        consumeTime: 0,
        naturalGas: 0,
        planNo: this.$store.state.planInfo.info.planCode
      },
      options: [],
      numbers: []
    }
  },
  mounted() {
    const param = {
      planNo: this.$store.state.planInfo.info.planCode,
      workshopCode: this.$route.meta.workshopCode,
      productCode: this.$store.state.planInfo.info.productCode,
      procedureCode: 'CO-02',
      planTime: this.$store.state.planInfo.time
    }
    backDisplay(param).then((res) => {
      if (res.data) {
        this.tableData = res.data.content
        Object.assign(this.form, res.data.workStatistics[0])
        this.form.id = res.data.id
      } else {
        getPotQuantity({
          procedureCode: 'CO-02',
          planNo: this.$store.state.planInfo.info.planCode,
          planTime: this.$store.state.planInfo.time
        }).then((res) => {
          for (let i = 0; i < res.data; i++) {
            this.tableData.push({
              potNo: i + 1,
              assortment: null,
              cookedbeans: 0
            })
          }
        })
      }
    })

    getRatioPerPot().then((res) => {
      this.options = res.data
    })
    getListNoPage().then((res) => {
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
<style lang="scss" scoped >
@import "~@/views/dataV/styles/form.scss"; //form css
@import "~@/views/dataV/styles/table.scss"; //table css
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

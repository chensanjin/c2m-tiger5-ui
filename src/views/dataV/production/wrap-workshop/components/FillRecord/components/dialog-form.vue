<!--
 * @Author: your name
 * @Date: 2021-06-23 16:47:20
 * @LastEditTime: 2021-07-12 15:01:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\FillRecord\components\PreTableForm.vue
-->
<template>
  <div class="table-main">
    <el-form ref="form" :model="form">
      <el-form-item label="单号:">
        <template>
          <span>{{ form.planCode }}</span>
        </template>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%" :header-cell-style="headMerge">
      <el-table-column prop="productName" label="产品名称" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="单粒胶囊批号" align="center" width="180">
        <template slot-scope="{ row }">
          <el-select v-model="form.capsuleNumber[0]" size="mini" placeholder="请选择胶囊批号">
            <el-option v-for="item in codes" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="包装线" align="center" width="180">
        <template slot-scope="{ row }">
          <el-select v-model="form.lineCode" size="mini" placeholder="请选择包装线">
            <el-option v-for="item in lines" :key="item.lineCode" :label="item.lineName" :value="item.lineCode" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="collectPCS" label="领用数量(PCS)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model.number="row.collectPCS" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="monitorInferiorProducts" label="品控检测次品数量(PCS)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model.number="row.monitorInferiorProducts" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="fillInferiorProducts" label="填充次品数量(PCS)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model.number="row.fillInferiorProducts" size="small" />
        </template>
      </el-table-column>
      <el-table-column label="包装不良(PCS)" align="center">
        <el-table-column prop="poorPackingEquip" label="设备" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.poorPackingEquip" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="poorPackingOther" label="其他" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.poorPackingOther" size="small" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="包装损耗" align="center">
        <el-table-column prop="materialLossBag" label="袋" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.materialLossBag" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="materialLossBox" label="盒" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.materialLossBox" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="materialLossCase" label="箱" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.materialLossCase" size="small" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="累计包装" align="center">
        <el-table-column prop="totlePackageBag" label="袋" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.totlePackageBag" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="totlePackageBox" label="盒" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.totlePackageBox" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="totlePackageCase" label="箱" align="center">
          <template slot-scope="{ row }">
            <el-input v-model.number="row.totlePackageCase" size="small" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="granular" label="累计散粒(psc)" align="center">
        <template slot-scope="{ row }">
          <el-input v-model.number="row.granular" size="small" />
        </template>
      </el-table-column>
    </el-table>
    <div class="table-main-line" />
    <el-form ref="form" label-position="right" label-width="10rem" :model="form">
      <el-form-item label="人工工时(h):">
        <el-input-number v-model="form.laborHours" :controls="false" type="number" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label="机器工时(h):">
        <el-input-number v-model="form.machineHour" :controls="false" type="number" size="small" style="width:10%" />
      </el-form-item>
      <el-form-item label="电(kw/h):">
        <el-input-number v-model="form.electricityNumber" :controls="false" type="number" size="small" style="width:10%" />
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { getCapsulebatchNum, getLines, getListNoPage, getWorkshopBackDisplay } from '@/api/datav/index.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      tableData: [{
        productName: this.$store.state.planInfo.info.productName,
        productCode: this.$store.state.planInfo.info.productCode,
        workshopCode: this.$route.meta.workshopCode,
        lineName: '申克',
        collectPCS: 0, // 领用数量PCS
        monitorInferiorProducts: 0, // 品控监测次品数量PCS
        fillInferiorProducts: 0, // 填充次品数量PCS
        poorPackingEquip: 0, // 包装不良设备PCS
        poorPackingOther: 0,			// 包装不良其他PCS
        materialLossBag: 0,			// 包材损耗袋
        materialLossBox: 0,			// 包材损耗盒
        materialLossCase: 0,			// 包材损耗箱
        totlePackageBag: 0,		// 累计包装袋
        totlePackageBox: 0,		// 累计包装盒
        totlePackageCase: 0,		// 累计包装箱
        granular: 0			// 累计散粒PCS
      }],
      form: {
        planCode: this.$store.state.tableRow.currentRow.planCode || '-',
        capsuleNumber: [],
        lineCode: '',
        laborHours: 0,			// 人工工时
        machineHour: 0,			// 机器工时
        electricityNumber: 0		// 电量
      },
      codes: [],
      lines: [],
      numbers: []
    }
  },
  watch: {
    currentRow: {
      handler(currentRow) {
        if (currentRow) {
          this.form.capsuleNumber = currentRow.capsuleNumber ? currentRow.capsuleNumber : []
          this.form.lineCode = currentRow.lineCode
          this.tableData = [Object.assign({}, currentRow)]
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.$store.state.tableRow.currentRow) {
      console.log(this.$store.state.tableRow.currentRow.planCode, 'cr')
      this.form.capsuleNumber = this.$store.state.tableRow.currentRow.capsuleNumber ? this.$store.state.tableRow.currentRow.capsuleNumber : []
      this.form.lineCode = this.$store.state.tableRow.currentRow.lineCode
      this.form.laborHours = this.$store.state.tableRow.currentRow.laborHours
      this.form.machineHour = this.$store.state.tableRow.currentRow.machineHour
      this.form.electricityNumber = this.$store.state.tableRow.currentRow.electricityNumber
      this.tableData = [Object.assign({}, this.$store.state.tableRow.currentRow)]
    }
    getCapsulebatchNum({ productCode: this.tableData[0].productCode }).then(res => {
      this.codes = res.data
    })
    getLines({ workshopCode: 'XD-01' }).then(res => {
      this.lines = res.data
    })
    // getListNoPage().then(res => {
    //   this.numbers = res.data
    // })
  },
  computed: {
    ...mapState({
      currentRow: (state) => state.tableRow.currentRow
    })
  },
  methods: {
    /**
     * @description: 合并头部单元格
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     * @return {*}
     */
    headMerge({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1 && columnIndex >= 2 && columnIndex <= 9) {
        return { color: '#7C9CB5', background: '#3E556B !important' }
      }
      if (rowIndex === 1) {
        return { color: '#7C9CB5', background: '#3E556B !important' }
        if (columnIndex === 0 || columnIndex === 1) {
          return { display: 'none' }
        }
      } else {
        return { color: '#7C9CB5' }
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

::v-deep .el-input-number div input {
  text-align: left;
}

</style>

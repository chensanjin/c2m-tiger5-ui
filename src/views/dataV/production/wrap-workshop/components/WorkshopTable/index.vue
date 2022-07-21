<template>
  <div class="table-main">
    <el-table :data="tableData" height="100%" :highlight-current-row="true" @current-change="handleCurrentChange">
      <el-table-column prop="planCode" label="NO" align="center" />
      <el-table-column prop="productName" label="产品名称 " align="center" />
      <el-table-column prop="planNumbers" label="计划数量(psc)" align="center" />
      <el-table-column prop="capsuleNumber" label="单粒胶囊批号" align="center" />
      <el-table-column prop="lineName" label="包装线" align="center" />
      <el-table-column prop="collectPCS" label="领用数量(pcs)" align="center" />
      <!-- <el-table-column prop="zip" label="袋装良品" align="center" />
      <el-table-column prop="zip" label="散粒良品" align="center" /> -->
      <el-table-column
        prop="monitorInferiorProducts"
        label="品控检测 次品数量(psc)"
        align="center"
      />
      <el-table-column
        prop="fillInferiorProducts"
        label="填充 次品数量(psc)"
        align="center"
      />
      <el-table-column
        label="包装不良(psc)"
        align="center"
      >
        <el-table-column
          prop="poorPackingEquip"
          label="设备"
          align="center"
        />
        <el-table-column
          prop="poorPackingOther"
          label="其他"
          align="center"
        />
      </el-table-column>
      <el-table-column
        label="包材损耗"
        align="center"
      >
        <el-table-column
          prop="materialLossBag"
          label="袋"
          align="center"
        />
        <el-table-column
          prop="materialLossBox"
          label="盒"
          align="center"
        />
        <el-table-column
          prop="materialLossCase"
          label="箱"
          align="center"
        />
      </el-table-column>
      <el-table-column label="累计包装" align="center">
        <el-table-column prop="totlePackageBag" label="袋" align="center" />
        <el-table-column prop="totlePackageBox" label="盒" align="center" />
        <el-table-column prop="totlePackageCase" label="箱" align="center" />
      </el-table-column>
      <el-table-column prop="granular" label="累计散粒(pcs)" align="center" />
      <el-table-column prop="laborHours" label="人工(h)" align="center" />
      <el-table-column prop="machineHour" label="机器(h)" align="center" />
      <el-table-column prop="electricityFees" label="电费(元)" align="center" />
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getWorkshopList, switchWorkshopList } from '@/api/datav/index.js'
export default {
  name: 'DryWetTime',
  data() {
    return {
      tableData: [],
      queryParams: {
        workshopCode: this.$route.meta.workshopCode,
        productCode: 'gangshinaicha'
      }
    }
  },
  watch: {
    planInfo: {
      handler(info) {
        if (Object.keys(info).length > 0) {
          this.queryParams.productCode = info.productCode
          this.changeWorkshopList()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchWorkshopList()
  },
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    })
  },

  methods: {
    fetchWorkshopList() {
      getWorkshopList({ workshopCode: this.queryParams.workshopCode }).then((res) => {
        if (res.data) {
          console.log(res.data, 'data')
          this.tableData = [...res.data]
        } else {
          this.tableData = []
        }
      })
    },
    changeWorkshopList() {
      switchWorkshopList({ workshopCode: this.queryParams.workshopCode, productCode: this.$store.state.planInfo.info.productCode }).then((res) => {
        if (res.data) {
          this.tableData = [...res.data]
        } else {
          this.tableData = []
        }
      })
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
      const length = this.tableData.length
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
    },
    handleCurrentChange(val) {
      this.$store.dispatch('setTableRow', val)
    }
  }
}
</script>
<style lang="scss" scoped >
@import "~@/assets/styles/table.scss";
//表头样式修改
.table-main ::v-deep .el-table th {
  color: #7c9cb5;
  background-color: #2d4355 !important;
}
.table-main {
  width: 100%;
  height: 99%;
}
</style>

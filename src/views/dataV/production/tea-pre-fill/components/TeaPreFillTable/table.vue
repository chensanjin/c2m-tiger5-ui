<!--
 * @Author: wj
 * @Date: 2021-06-22 11:03:29
 * @LastEditTime: 2021-08-12 17:11:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\index.vue
-->
<template>
  <div class="table">
    <div class="table-left">
      <PlanTable />
    </div>
    <div class="table-center">
      <dry-wet-time :table-list="tableList" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { energyConsumptionStatistics } from '@/api/datav'
import PlanTable from './components/table-up.vue'
import DryWetTime from './components/table-down.vue'
import { planTableList } from './components/_data.js'

export default {
  name: 'DryWetTable',
  components: {
    PlanTable,
    DryWetTime
  },
  data() {
    return {
      tableList: [

      ],
      CONSTANT: {
        M1CODE: 'pl20210005',
        M2CODE: 'pl20210006',
        M4CODE: 'pl20210007',
        TOTALCODE: 'total'
      },
      queryParams: {
        planNo: this.$store.state.planInfo.info.planCode,
        planTime: this.$store.state.planInfo.time,
        workshopCode: this.$route.meta.workshopCode,
        productCode: this.$store.state.planInfo.info.productCode,
        technologyCode: 'TT-02'
      }
    }
  },
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    }),
    basePlanTableList() {
      return [...planTableList]
    }
  },
  watch: {
    planInfo: {
      handler(info) {
        if (Object.keys(info).length > 0) {
          this.queryParams.planNo = info.planCode
          this.queryParams.productCode = info.productCode
          this.getEnergyConsumptionStatistics()
        }
      },
      immediate: true
    }
  },

  created() {
    this.getEnergyConsumptionStatistics()
  },
  methods: {
    async getEnergyConsumptionStatistics() {
      const res = await energyConsumptionStatistics(this.queryParams)
      if (res.data) {
        res.data.forEach(item => {
          if (item.procedureCode === 'CO-05') {
            item.model = '填充'
          } else if (item.procedureCode === 'CO-04') {
            item.model = '预制'
          } else {
            item.model = '合计'
          }
        })
        this.tableList = res.data
      } else {
        this.tableList = Object.assign([], this.basePlanTableList)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  &-left {
    // height: 100px;
    margin-bottom: 1.9rem;
    width: 100%;
    height: 70%;
    // flex:1
    // width: 16.7%;
    // height: 100%;
  }

  &-center {
    width: 100%;
    height: 29%;
    // flex:0
  }
}
</style>

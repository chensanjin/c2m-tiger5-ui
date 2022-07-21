<!--
 * @Author: your name
 * @Date: 2021-06-22 11:03:29
 * @LastEditTime: 2021-07-05 16:34:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\index.vue
-->
<template>
  <div class="table">
    <div class="table-left">
      <Table />
    </div>
    <div class="table-center">
      <table-time :table-list="tableList" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Table from './components/table'
import TableTime from './components/TableTime'
import { energyConsumptionStatistics } from '@/api/datav'
export default {
  name: 'DryWetTable',
  components: {
    TableTime,
    Table
  },
  data() {
    return {
      tableList: [],
      queryParams: {
        planNo: this.$store.state.planInfo.info.planCode,
        planTime: this.$store.state.planInfo.time,
        workshopCode: this.$route.meta.workshopCode,
        productCode: this.$store.state.planInfo.info.productCode,
        technologyCode: 'CT-01'
      }
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
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    })
  },

  created() {
    this.getEnergyConsumptionStatistics()
  },
  methods: {
    async getEnergyConsumptionStatistics() {
      const res = await energyConsumptionStatistics(this.queryParams)
      console.log(res, 'resdata')
      this.tableList = res.data
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

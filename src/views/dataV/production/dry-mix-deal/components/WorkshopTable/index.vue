<!--
 * @Author: your name
 * @Date: 2021-06-22 11:03:29
 * @LastEditTime: 2021-07-09 11:31:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\index.vue
-->
<template>
  <div class="table">
    <div class="table-left">
      <base-table />
    </div>
    <div class="table-center">
      <table-time v-if="this.show" :table-list="tableList" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { energyConsumptionStatistics } from '@/api/datav'
import BaseTable from './components/table'
import TableTime from './components/TableTime'

export default {
  name: 'DryWetTable',
  components: {
    BaseTable,
    TableTime
  },
  data() {
    return {
      show: false,
      tableList: [],
      queryParams: {
        planNo: this.$store.state.planInfo.info.planCode,
        planTime: this.$store.state.planInfo.time,
        workshopCode: this.$route.meta.workshopCode,
        productCode: this.$store.state.planInfo.info.productCode,
        technologyCode: 'MT-01'
      }
    }
  },
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    })
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
  //   const  res=this.findPlantInfo.getFindInfo('包装车间')
    // const  res1=this.findPlantInfo.getProcess('咖啡前处理')
    // const  res2=this.findPlantInfo.getProcedure('生豆清洗')
    // console.log(res,'res1111')
    // this.getEnergyConsumptionStatistics();
  },
  methods: {
    getEnergyConsumptionStatistics() {
      this.show = false
      energyConsumptionStatistics(this.queryParams).then((res) => {
        this.tableList = res.data
        this.show = true
      }).catch((err) => {
        console.log(err)
      })
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

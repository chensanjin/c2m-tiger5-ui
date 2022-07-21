<!--
 * @Author: your name
 * @Date: 2021-06-22 11:03:29
 * @LastEditTime: 2021-07-12 17:04:50
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
      <table-time v-if="tableList" :table-list="tableList" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { energyConsumptionStatistics } from '@/api/datav'
import Table from './components/table'
import TableTime from './components/TableTime'

export default {
  name: 'DryFillTable',
  components: {
    Table,
    TableTime
  },
  data() {
    return {
      tableList: [
        {
          index: 0,
          code: 'ML-02M1',
          name: 'M1',
          procedureCode: 'MO-04',
          model: '预制'
        },
        {
          index: 0,
          code: 'ML-02M1',
          procedureCode: 'MO-05',
          name: 'M1',
          model: '填充'
        },
        {
          index: 1,
          code: 'ML-02M2',
          name: 'M2',
          model: '预制',
          procedureCode: 'MO-04'
        },
        {
          index: 1,
          code: 'ML-02M2',
          procedureCode: 'MO-05',
          name: 'M2',
          model: '填充'
        },
        {
          index: 2,
          code: 'total',
          model: '合计',
          name: '合计',
          procedureCode: 'total'
        }
      ],
      CONSTANT: {
        M1CODE: 'pl20210005',
        M2CODE: 'pl20210006',
        TOTALCODE: 'total'
      },
      queryParams: {
        planNo: this.$store.state.planInfo.info.planCode,
        planTime: this.$store.state.planInfo.time,
        workshopCode: this.$route.meta.workshopCode,
        productCode: this.$store.state.planInfo.info.productCode,
        technologyCode: 'MT-02'
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
          this.queryParams.productCode = info.productCode
          this.queryParams.planNo = info.planCode
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
        const newList = [...this.tableList]
        newList.forEach(it => {
          res.data.forEach(item => {
            if (it.code === item.lineCode) {
              if (item.procedureCode === it.procedureCode) {
                it = Object.assign(it, item)
              }
            }
          })
        })
        this.tableList = [...newList]
        console.log(this.tableList, 'xsxs')
      } else {
        const data = [
          {
            index: 0,
            code: 'ML-02M1',
            name: 'M1',
            procedureCode: 'MO-04',
            model: '预制'
          },
          {
            index: 0,
            code: 'ML-02M1',
            procedureCode: 'MO-05',
            name: 'M1',
            model: '填充'
          },
          {
            index: 1,
            code: 'ML-02M2',
            name: 'M2',
            model: '预制',
            procedureCode: 'MO-04'
          },
          {
            index: 1,
            code: 'ML-02M2',
            procedureCode: 'MO-05',
            name: 'M2',
            model: '填充'
          },
          {
            index: 2,
            code: 'total',
            model: '合计',
            name: '合计',
            procedureCode: 'total'
          }]
        this.tableList = [...data]
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
  box-sizing: border-box;
  &-left {
    // height: 100px;
    margin-bottom: 1.9rem;
    width: 100%;
    height: 70%;
    // flex:1
    // width: 16.7%;
    // height: 100%;
    box-sizing: border-box;
  }

  &-center {
    width: 100%;
    height: 30%;
    // flex:0
  }
}
</style>

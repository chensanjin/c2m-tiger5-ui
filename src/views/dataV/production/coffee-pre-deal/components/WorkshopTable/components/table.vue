<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-05 16:37:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <div class="table-main-warp">
      <table-clean-bean />
    </div>
    <div class="table-main-mix">
      <table-bake />
    </div>
    <div class="table-main-grind">
      <table-grind />
    </div>
  </div>
</template>

<script>
import TableCleanBean from './table-cleanbean'
import TableBake from './table-bake'
import TableGrind from './table-grind'
export default {
  name: 'GrindSuger',
  components: {
    TableCleanBean,
    TableBake,
    TableGrind
  },
  data() {
    return {
    }
  },
  methods: {
  }
}

</script>
<style lang="scss" scoped>
 @import '~@/assets/styles/table.scss';

  .table-main {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    &-warp{
      flex: 2
    }
    &-mix{
      flex: 1
    }
    &-grind{
      flex: 1
    }
  }
</style>

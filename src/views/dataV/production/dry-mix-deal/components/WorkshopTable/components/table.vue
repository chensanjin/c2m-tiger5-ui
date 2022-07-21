<!--
 * @Author: your name
 * @Date: 2021-06-22 11:10:12
 * @LastEditTime: 2021-07-08 17:53:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
, * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Table\DryWetTable\components\GrindSuger.vue
-->
<template>
  <div class="table-main">
    <div class="table-main-suger">
      <table-suger />
    </div>
    <div class="table-main-warp">
      <table-wrap />
    </div>
    <div class="table-main-mix">
      <table-mix />
    </div>
  </div>
</template>

<script>
import TableWrap from './table-wrap'
import TableMix from './table-mix'
import TableSuger from './table-suger'

export default {
  name: 'GrindSuger',
  components: {
    TableWrap,
    TableMix,
    TableSuger
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
    // justify-content: center;
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    &-suger{
      // flex: 2
      // width: 20%;
      flex: 1;
    }
    &-warp{
      // flex: 4
      //  width: 50%;
       flex: 2;
    }
    &-mix{
      // flex: 2
      // width: 30%;
       flex: 1;
    }
  }
</style>

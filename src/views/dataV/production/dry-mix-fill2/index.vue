<!--
 * @Author: your name
 * @Date: 2021-06-16 17:04:42
 * @LastEditTime: 2021-07-12 10:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\index.vue
-->
<template>
  <div class="container">
    <Header />
    <div class="main-wrap">
      <div class="main-wrap-header">
        <div class="main-wrap-header-left">
          <the-plan />
        </div>
        <div class="main-wrap-header-right">
          <workshop-environment />
        </div>
      </div>
      <div class="main-wrap-content">
        <div class="main-wrap-content-table">
          <dry-fill-table v-if="this.$route.meta.workshopCode==='MD-02a'" />
          <dry-fill-table2 v-else />
        </div>
        <div class="main-wrap-content-list">
          <fill-record class="main-wrap-content-list-plan" />
          <SOP class="main-wrap-content-list-sop" />
          <Manager class="main-wrap-content-list-footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 适配flex
import '@/utils/flexible.js'
// 当日计划
import Header from '../components/Header/index'
// 车间信息
import ThePlan from '../components/ThePlan/index.vue'
import WorkshopEnvironment from '../components/WorkshopEnvironment/index.vue'
import FillRecord from './components/FillRecord'
import SOP from '../components/SOP/index.vue'
import Manager from '../components/Manager/index.vue'
import DryFillTable from './components/DryFillTable'
import DryFillTable2 from './components/DryFillTable2'

export default {
  name: 'DryMixFill',
  components: {
    Header,
    ThePlan,
    WorkshopEnvironment,
    FillRecord,
    SOP,
    Manager,
    DryFillTable,
    DryFillTable2
  }
}
</script>
<style scoped lang="scss">
.main-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 6.28rem);
  padding: 3.8rem 2.2rem 2.9rem 3rem;
  box-sizing: border-box;

  &-header {
    flex: 0 0 12.4rem;
    width: 100%;
    height: 12.4rem;
    display: flex;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 1.6rem;

    &-left {
      width: 55%;
      margin-right: 1.4rem;
    }

    &-right {
      width: 44%;
    }
  }

  &-content {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // height: calc(100% - 10rem);
    display: flex;

    &-table {
      flex: 1;
      // flex: auto;
      // width: 100%;
      // width:calc(100%-17.2rem);
      // border: 0.1rem solid rgba(233, 238, 243, 0.2);
      margin-right: 2rem;
      overflow: hidden;
    }

    &-list {
      flex: 0 0 37.2rem;
      display: flex;
      flex-direction: column;
      // width: 37.2rem;
      height: 100%;

      &-sop {
         flex: .21;
        // flex: 0;
        margin-bottom: 1.9rem;
      }

      &-plan {
        height: 100px;
        flex: 1;
        margin-bottom: 1.9rem;
      }

      &-footer {
        flex: 0;
      }
    }
  }

  &-daily {
    flex: auto;
    margin-right: 2rem;
  }
}

.container {
  width: 100%;
  height: 100vh;
  background-image: url("~@/assets/images/background/energy.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

.footer {
  height: 5.7rem;
}
</style>

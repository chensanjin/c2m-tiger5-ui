<!--
 * @Author: your name
 * @Date: 2021-06-21 13:45:09
 * @LastEditTime: 2021-08-18 14:00:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\ThePlan\index.vue
-->
<template>
  <div class="theplan-main">
    <div class="theplan-main-title">
      <div class="theplan-main-title-img" />
    </div>
    <div class="theplan-main-card">
      <div
        v-for="(item, index) in datalist"
        :key="item.id"
        class="theplan-main-card-content"
        :class="activeIndex === index ? 'active' : ''"
        @click="handleClick(item, index)"
      >
        <!-- <el-card> -->
        <div class="theplan-main-card-content-number">{{ item.planCode }}</div>
        <div class="theplan-main-card-content-name">
          <img
            class="theplan-main-card-content-name-img"
            :src="item.logoUrl"
            alt=""
            srcset=""
          >
          <div class="theplan-main-card-content-name-des">
            {{ item.productName }}
          </div>
          <div class="theplan-main-card-content-name-number">
            <div>{{ item.orderNumber }}</div>
          </div>
          <div class="theplan-main-card-content-name-des">
            {{ item.meterNameCn }}
          </div>
        </div>
        <!-- </el-card> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getPlanDeatils } from '@/api/datav'

export default {
  data() {
    return {
      datalist: [],
      activeIndex: 0
    }
  },
  created() {
    this.getPlanList()
  },
  methods: {
    /**
     * @description: 获取列表
     * @param {*}
     * @return {*}
     */
    async getPlanList() {
      const workshopCode = this.$route.meta.workshopCode
      const res = await getPlanDeatils({ workshopCode })
      const data = res.data
      this.datalist = [...data]
      await this.$store.dispatch('setPlanInfo', this.datalist[0])
    },
    /**
     * @description: 点击获取值
     * @param {*}
     * @return {*}
     */
    handleClick(item, index) {
      this.activeIndex = index
      this.$store.dispatch('setPlanInfo', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.theplan-main {
  // padding: 1.5rem 1.6rem 1.5rem 2.6rem;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/background/thePlanBg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  &-title {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    &-img {
      width: 11.6rem;
      height: 2.2rem;
      background-image: url('~@/assets/images/theplan.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  &-card {
    width: 80%;
    height: 100%;
    padding: 1.5rem;
    display: flex;
    overflow-x: auto;
    cursor: pointer;
    // justify-content: space-between;
    &-content {
      margin-right: 1rem;
      padding: 1.7rem 0.1em;
      text-align: center;
      width: 24.2rem;
      height: 9.4rem;
      border: 0.1rem solid rgba(233, 238, 243, 0.2);

      &-number {
        color: #7c9cb5;
        font-size: 1.8rem;
        font-weight: 400;
        margin-bottom: 1.3rem;
      }

      &-name {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.8rem;
        font-weight: 400;
        color: #ffffff;

        &-img {
          width: 2.5rem;
          height: 2.5rem;
        }
        &-number {
          padding-top: 0.5rem;
          font-size: 1.6rem;
          font-weight: 400;
          color: #e94716;
          margin-left: 0.9rem;
        }
        &-des {
          font-size: 1.6rem;
          font-weight: 400;
          color: #ffffff;
          margin-left: 0.9rem;
          white-space: nowrap;
        }
      }
    }
  }
  .active {
    border: 0.1rem solid #ff6644;
  }
}
</style>

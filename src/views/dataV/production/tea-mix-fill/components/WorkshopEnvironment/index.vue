<!--
 * @Author: your name
 * @Date: 2021-06-21 13:45:09
 * @LastEditTime: 2021-08-19 09:32:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\workshop\index.vue
-->
<template>
  <div class="workshop-main">
    <div class="workshop-main-title">
      <div class="workshop-main-title-img" />
    </div>
    <div class="workshop-main-card">
      <div
        v-for="item in datalist"
        :key="item.id"
        class="workshop-main-card-content"
      >
        <div class="workshop-main-card-content-number">{{ item.number }}</div>
        <div class="workshop-main-card-content-name">
          <div class="workshop-main-card-content-name-des">
            {{ item.name }}
            <template v-if="item.name !== '-'">
              <img
                v-if="item.isUp === 1"
                src="@/assets/icons/icon-up.png"
                alt=""
              >
              <img
                v-else-if="item.isUp !== 3"
                src="@/assets/icons/icon-down.png"
                alt=""
              >
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="workshop-main-card-th">
      <div>
        <span class="workshop-main-card-th-label">投料区温度标准</span>
        <span class="workshop-main-card-th-value">15 - 25℃</span>
      </div>
      <div>
        <span class="workshop-main-card-th-label">投料区湿度标准</span>
        <span class="workshop-main-card-th-value">30 - 50%</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getLastWorkShopEnv } from '@/api/datav'

export default {
  data() {
    return {
      datalist: [
        {
          number: '温度',
          name: '-'
        },
        {
          number: '湿度',
          name: '-'
        }
      ]
    }
  },
  created() {
    this.getWorkShopEnv()
  },
  methods: {
    /**
     * @description: 获取车间温度相关信息
     * @param {*}
     * @return {*}
     */
    getWorkShopEnv() {
      const workshopCode = this.$route.meta.workshopCode
      getLastWorkShopEnv({ workshopCode }).then(res => {
        const data = res.data
        this.datalist.map(item => {
          if (data.length > 0) {
            if (item.number === '温度' && data[0].TP !== '') {
              item.name = data[0].TP + '℃' || ''
              item.isUp = data[0].TPStandard
            } else if (item.number === '湿度' && data[0].HU !== '') {
              item.name = data[0].HU + '%' || ''
              item.isUp = data[0].HUStandard
            }
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.workshop-main {
  // padding: 1.5rem 1.6rem 1.5rem 2.6rem;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/images/background/EnvironmentBg.png');
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
      background-image: url('~@/assets/images/Environment.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
    }
    .workshop-main-title-img::after {
      content: '';
      position: absolute;
      top: -3rem;
      left: 13.3rem;
      width: 0.1rem;
      height: 8.6rem;
      background-color: rgba(233, 238, 243, 0.2);
    }
  }
  .workshop-main-card-th {
    width: 30%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    // align-content: center;
    justify-content: space-evenly;
    font-size: 1.6rem;
    .workshop-main-card-th-label {
      margin-right: 2.5rem;
      color: #7c9cb5;
    }
  }
  .workshop-main-card-th::after {
    content: '';
    position: absolute;
    left: 0;
    // top: 0.7rem;
    // left: -4.8rem;
    width: 0.1rem;
    height: 8.6rem;
    background-color: rgba(233, 238, 243, 0.2);
  }

  &-card {
    width: 50%;
    height: 100%;
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    &-content {
      margin-right: 1rem;
      padding: 1.7rem 0;
      text-align: center;
      width: 24.2rem;
      height: 9.4rem;
      &-number {
        color: #7c9cb5;
        font-size: 1.6rem;
        font-weight: 400;
        margin-bottom: 2.3rem;
      }
      &-name {
        display: flex;
        justify-content: center;
        font-size: 1.8rem;
        font-weight: 400;
        color: #ffffff;
        &-des {
          font-size: 1.6rem;
          font-weight: 400;
          color: #ffffff;
          // margin-left: 0.9rem;
        }
      }
    }
  }
}
</style>

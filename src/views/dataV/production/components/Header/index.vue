<!--
 * @Author: xwj
 * @Date: 2021-06-16 17:04:42
 * @LastEditTime: 2021-08-18 10:44:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Header.vue
-->
<template>
  <div class="header-wrap">
    <div class="logo">
      <img src="@/assets/logo/logo-datav.png" alt="">
    </div>
    <div class="title">
      {{ this.$route.meta.title }}
    </div>
    <div class="right-wrap">
      <span>{{ time }}</span>
      <span>温度{{ weatherList.TP }}℃</span>
      <span>湿度{{ weatherList.HU }}%</span>
      <!-- <el-tooltip class="item" effect="dark" content="全屏" placement="top"> -->
      <i class="el-icon-full-screen right-wrap-icon" @click="screen" />
      <!-- </el-tooltip> -->
    </div>
  </div>
</template>
<script>
import screenfull from 'screenfull'
import { getLastWeather } from '@/api/datav'
import moment from 'moment'

export default {
  data() {
    return {
      show: 'true',
      weatherList: {},
      time: ''
    }
  },
  created() {
    this.getWeather()
    setInterval(() => {
      this.getTime()
    }, 1000)
  },
  mounted() {
    this.$nextTick(() => {
      // this.screen()
    })
  },
  methods: {
    /**
     * @description: 手动全屏
     * @param {*}
     * @return {*}
     */
    screen() {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '您的浏览器不支持全屏!',
          type: 'warning'
        })
        return false
      }
      screenfull.request()
    },
    /**
     * @description: 获取实时时间
     * @param {*}
     * @return {*}
     */
    getTime() {
      this.time = moment().format('YYYY-MM-DD HH:mm:ss')
    },
    /**
     * @description: 获取外界温度
     * @param {*}
     * @return {*}
     */
    getWeather() {
      getLastWeather().then(res => {
        this.weatherList = { ...res.data }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 6.28rem;
  line-height: 6.28rem;
  padding: 0 3rem;
  background-image: url('~@/assets/images/background/header-top.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-shadow: 0px 7px 15px 0px rgba(0, 0, 0, 0.35);
  .logo {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      width: 8.2rem;
    }
  }

  .title {
    flex: 1;
    text-align: center;
    font-weight: 700;
    font-size: 2.6rem;
    color: #fff;
    letter-spacing: 2rem;
  }
  .right-wrap {
    flex: 1;
    color: #7c9cb5;
    font-size: 1.8rem;
    text-align: right;
    span:not(:last-child) {
      margin-right: 2rem;
    }
    &-icon {
      cursor: pointer;
    }
  }
}
</style>

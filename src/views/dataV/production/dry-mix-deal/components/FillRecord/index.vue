<!--
 * @Author: your name
 * @Date: 2021-06-16 17:43:16
 * @LastEditTime: 2021-07-12 10:39:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\DailyPlan.vue
-->
<template>
  <div class="plan-main">
    <div class="plan-main-content">
      <div class="plan-main-content-title">
        <span class="plan-main-content-title-content">当日填报记录</span>
      </div>
      <ul ref="contentEventRef" class="plan-main-content-event">
        <li v-for="item in OperationRecordList" :key="item.id">
          <span>{{ item.nickName }}</span>
          <span class="plan-main-content-event-color">{{ item.createTime }}</span>
          <span>进行了</span>
          <span class="plan-main-content-event-color">{{ item.procedureName }}</span>
          <span>数据填报</span>
        </li>
      </ul>
      <div class="plan-main-content-button">
        <div class="plan-main-content-button-name" @click="handleDeclare">数据填报</div>
      </div>
    </div>
    <Dialog ref="declareDialogref" @ok="updata" />
  </div>
</template>
<script>
import Dialog from './components/dialog.vue'
import { getOperationRecord } from '@/api/datav'
import Vuex from 'vuex'

export default {
  name: 'PlanDetail',
  components: {
    Dialog
  },
  data() {
    return {
      listNumber: 0,
      workshopCode: this.$route.meta.workshopCode,
      OperationRecordList: []
    }
  },
  mounted() {
    this.getOperationRecordList()
    setTimeout(() => {
      this.listNumber = 30
      this.$nextTick(() => {
        const content = this.$refs.contentEventRef
        content.scrollTop = content.scrollHeight
      })
    }, 500)
  },
  methods: {
    /**
   * @description: 关闭弹窗
   * @param {*}
   * @return {*}
   */
    updata() {
      this.getOperationRecordList()
    },
    /**
    * @description: 获取操作记录列表
    * @param {*}
    * @return {*}
    */
    getOperationRecordList() {
      const workshopCode = this.workshopCode
      getOperationRecord({ workshopCode }).then((res) => {
        this.OperationRecordList = [...res]
      }).catch((err) => {
        console.log(err)
      })
    },
    /**
  * @description: 数据填报
  * @param {*}
  * @return {*}
  */
    handleDeclare() {
      const planNo = this.$store.state.planInfo.info.planCode
      if (planNo) {
        this.$refs.declareDialogref.openDialog()
      } else {
        this.$message.error('当前没有计划无法填报')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 @import '~@/assets/styles/scrollbar.scss';

.plan-main{
//  width: 100%;
//  height: 70%;
  &-content{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height:100%;
    color: #E9EEF3;
    background-color: #263442;
    padding-bottom: 1.8rem;
    &-title{
      // flex: 0 0 4.6rem;
      height: 4.6rem;
      line-height: 4.6rem;
      padding-left: 4.6rem;
      font-size: 1.6rem;
      background-image: url("~@/assets/images/background/planBg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
    }
    &-event{
      // height: 33vh;
      flex: 1;
      font-size: 1.2rem;
      padding-right: 1rem;
      // max-height: 100%;
     overflow-y: scroll;
      &-color{
        padding: 0 .3rem;
        color: #62EBFF;
      }
      li {
        margin-bottom: 1rem;
      }
    }
    &-button{
      // position: absolute;
      // bottom: 1.8rem;
      height: 3.8rem;
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
      &-name{
      width: 80%;
      height: 3.8rem;
      line-height: 3.8rem;
      color: #ffffff;
      font-size: 1.2rem;
      background-color: #E94716;
      cursor: pointer;
      }
    }
    .plan-main-content-title-content::before{
     content: '';
     position: absolute;
     top: 30%;
     left: 2.2rem;
     width: 0.2rem;
     height: 1.8rem;
     line-height: 2.3rem;
     background-color:#E94716;
    }
  }
}
</style>


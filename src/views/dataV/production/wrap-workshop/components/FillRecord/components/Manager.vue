<!--
 * @Author: xwj
 * @Date: 2021-06-16 17:04:42
 * @LastEditTime: 2021-07-02 11:57:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Header.vue
-->
<template>
  <div class="footer-wrap">
    <div class="footer-content">
      <div class="footer-content-leader">
        <el-row :getter="10">
          <el-col :span="4">车间主任:</el-col>
          <el-col v-if="userList.supervisor" :span="20">{{ userList.supervisor.nickName }}</el-col>
        </el-row>
      </div>
      <div class="footer-content-operators">
        <p>操作人员:</p>
        <div>
          <el-row v-if="userList.operators" :getter="20">
            <el-col v-for="item in userList.operators" :key="item.id" class="footer-content-operator-item" :span="12">{{ item.nickName }}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPeopleList } from '@/api/datav'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      workshopCode: this.$route.meta.workshopCode,
      userList: {

      }
    }
  },
  watch: {
    planInfo: {
      handler(info) {
        if (Object.keys(info).length > 0) {
          this.getUserList()
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
  mounted() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      const workshopCode = this.workshopCode
      getPeopleList({ workshopCode }).then((res) => {
        this.userList = { ...res }
      }).catch((err) => {
        console.log(err)
      })
    }

  }
}
</script>
<style scoped lang="scss">
@import '~@/assets/styles/scrollbar.scss';

.footer-wrap {
   width: 100%;
   height: 10%;
   display: flex;
   align-items: center;
   padding: 1.5rem 0 1.5rem 0;
   .footer-content{
     width: 100%;
     height: 100%;
     overflow: auto;
     font-size: 1.2rem;
    //  display: flex;
     color: #7C9CB5;
     &-operator{
       &-item{
       margin-bottom: 1rem;
     }
     }
   }
}
</style>

<!--
 * @Author: xwj
 * @Date: 2021-06-16 17:04:42
 * @LastEditTime: 2021-07-12 10:27:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\Header.vue
-->
<template>
  <div class="footer-wrap">
    <div class="footer-title">SOP</div>
    <div class="footer-right">
      <div v-for="item in userList" :key="item.id" class="footer-content">
        <!-- <a :href="item.url" target="_blank"> -->
        <div @click="() => openSopDialog(item.url)">
          <div class="footer-content-img">
            <img :src="item.img" alt="" srcset="">
          </div>
          <div class="footer-content-name">{{ item.fileName }}</div>
        </div>
        <!-- </a> -->
      </div>
    </div>
    <el-dialog
      title="手册"
      :visible.sync="sopDialogVisible"
      fullscreen
      center
    >
      <iframe :src="docUrl" frameborder="0" style="width: 100%; height: 90vh" />
    </el-dialog>
  </div>
</template>

<script>
import { getOperationManual } from '@/api/datav/index.js'
export default {
  data() {
    return {
      sopDialogVisible: false,
      userList: [],
      docUrl: ''
    }
  },
  mounted() {
    getOperationManual({ workshopCode: this.$route.meta.workshopCode }).then((res) => {
      res.data.forEach((item) => {
        item.img = require('@/assets/images/manual.png')
      })
      this.userList = res.data
    })
  },
  methods: {
    /**
     * @description: 打开文档地址
     * @param {*} url
     * @return {*}
     */
    openSopDialog(url) {
      this.sopDialogVisible = true
      this.docUrl = url
    }
  }
}
</script>

<style  lang="scss" scoped>
@import "~@/assets/styles/scrollbar.scss";

.footer-wrap {
  width: 100%;
  //  height: 18%;
  display: flex;
  align-items: center;
  padding: 1.5rem 0 1.5rem 3.2rem;
  border: 0.1rem solid rgba(233, 238, 243, 0.2);
  .footer-right {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: auto;
    .footer-content {
      width: 45%;
      height: 50%;
      color: #7c9cb5;
      font-size: 1.4rem;
      text-align: center;
      cursor: pointer;
      &-img {
      }
      &-name {
        font-size: 1.2rem;
        color: #7c9cb5;
      }
    }
  }

  .footer-title {
    font-size: 2rem;
    text-align: center;
    padding-right: 2.5rem;
    color: #ffffff;
    position: relative;
  }

  .footer-title::after {
    content: "";
    position: absolute;
    top: -6rem;
    right: 0;
    width: 0.1rem;
    //  height: 15rem;
    background-color: rgba(233, 238, 243, 0.2);
  }
}
</style>

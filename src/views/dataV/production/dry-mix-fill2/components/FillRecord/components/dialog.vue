<!--
 * @Author: your name
 * @Date: 2021-06-21 13:18:44
 * @LastEditTime: 2021-07-07 14:37:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\DeclareDialog.vue
-->
<template>
  <div class="dialog">
    <el-dialog
      title="干混预制填充车间报工"
      :visible.sync="dialogVisible"
      width="80vw"
      :close-on-click-modal="false"
      class="dialog-main"
    >
      <el-tabs v-if="dialogVisible" v-model="activeName">
        <el-tab-pane label="预置" name="1">
          <dialog-pre ref="pretableRef" @ok="handleUpdata" />
        </el-tab-pane>
        <el-tab-pane label="填充" name="2">
          <dialog-fill ref="filltableRef" @ok="handleUpdata" />
        </el-tab-pane>
        <el-tab-pane label="人员" name="3">
          <user-form ref="userformRef" @ok="handleUpdata" />
        </el-tab-pane>
      </el-tabs>
      <span v-if="dialogVisible" slot="footer" class="dialog-footer">
        <div class="buttonok" @click="handleOk">
          <span class="buttonok-title">确认</span>
        </div>
        <div class="buttoncancel" @click="dialogVisible = false">
          <span class="buttoncancel-title">取消</span>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import DialogFill from './dialog-fill'
import UserForm from '@/views/dataV/production/components/UserForm'
import DialogPre from './dialog-pre'
export default {
  components: {
    DialogFill,
    UserForm,
    DialogPre
  },
  data() {
    return {
      activeName: '1',
      dialogVisible: false
    }
  },
  methods: {
    /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */
    openDialog() {
      this.dialogVisible = true
    },
    handleOk() {
      if (this.activeName === '1') {
        this.$refs.pretableRef.handleSubmit()
      } else if (this.activeName === '2') {
        this.$refs.filltableRef.handleSubmit()
      } else if (this.activeName === '3') {
        this.$refs.userformRef.handleSubmit()
      }
    },
    handleUpdata() {
      this.dialogVisible = false
      this.$emit('ok')
    }
  }
}
</script>
<style lang="scss" scoped>
 @import '~@/assets/styles/dialog.scss';//dialog css
 @import '~@/views/dataV/styles/tabs.scss';//dialog css
 .dialog-main{
   padding: 2rem;
   &-pre{
     width: 100%;
     height: 100%;
   }
 }
 .dialog-footer{
   display: flex;
   justify-content: flex-end;
   .buttonok{
      width: 12.4rem;
      height: 3.9rem;
      font-size: 1.6rem;
      margin-left:1.6rem;
      font-weight: 400;
      cursor: pointer;
      background-color: #E94716;
      text-align: center;
      line-height: 3.9rem;
      &-title{
      color: #fff;
      }
    }
     .buttoncancel{
      width: 12.4rem;
      height: 3.9rem;
      font-size: 1.6rem;
      margin-left:1.6rem;
      font-weight: 400;
      cursor: pointer;
      background-color: transparent;
      border: 0.1rem solid #E94716;
      text-align: center;
      line-height: 3.9rem;
      &-title{
      color: #E94716;
      }
    }
 }
</style>

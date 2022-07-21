<!--
 * @Author: your name
 * @Date: 2021-06-21 13:18:44
 * @LastEditTime: 2021-07-07 14:30:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\DeclareDialog.vue
-->
<template>
  <div class="dialog">
    <el-dialog
      title="新增填报信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="60vw"
      class="dialog-main"
      :before-close="handleClose"
    >
      <el-tabs v-if="dialogVisible" v-model="activeName">
        <el-tab-pane label="生豆清洗" name="CO-01,生豆清洗,cleanBean">
          <dialog-clean-bean ref="cleanBean" />
        </el-tab-pane>
        <el-tab-pane label="烘焙" name="CO-02,烘焙,bakeTable">
          <dialog-bake ref="bakeTable" />
        </el-tab-pane>
        <el-tab-pane label="研磨" name="CO-03,研磨,grindTable">
          <dialog-grind ref="grindTable" />
        </el-tab-pane>
        <el-tab-pane label="人员" name="RY">
          <user-form ref="userFormRef" @ok="handleUpdata" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <div class="buttonok" @click="confirm">
          <span class="buttonok-title">确认</span>
        </div>
        <div class="buttoncancel" @click="dialogVisible = false">
          <span class="buttoncancel-title">取消</span>
        </div>
        <!-- <el-button size="mini" @click="dialogVisible = false">取 消</el-button> -->
        <!-- <el-button size="mini" type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>
<script>
import DialogBake from './dialog-bake'
import DialogCleanBean from './dialog-cleanbean'
import UserForm from '@/views/dataV/production/components/UserForm'
import DialogGrind from './dialog-grind'
import { saveBeanClean } from '@/api/datav'

export default {
  components: {
    DialogBake,
    UserForm,
    DialogGrind,
    DialogCleanBean
  },
  data() {
    return {
      activeName: 'CO-01,生豆清洗,cleanBean',
      dialogVisible: false
    }
  },
  methods: {
    // 手动刷新
    handleUpdata() {
      this.$emit('ok')
    },
    /**
       * @description: 初始化
       * @param {*}
       * @return {*}
       */
    openDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    confirm() {
      if (this.activeName === 'RY') {
        this.$refs.userFormRef.handleSubmit()
      } else {
        this.dialogVisible = false
        const param = {
          planNo: this.$refs[this.activeName.split(',')[2]].form.planNo,
          orderNo: null,
          workshopCode: this.$route.meta.workshopCode,
          workshopName: '咖啡前处理车间',
          procedureCode: this.activeName.split(',')[0],
          procedureName: this.activeName.split(',')[1],
          productCode: this.$store.state.planInfo.info.productCode,
          productName: this.$store.state.planInfo.info.productName,
          content: this.$refs[this.activeName.split(',')[2]].tableData,
          workStatistics: [this.$refs[this.activeName.split(',')[2]].form]
        }
        if (this.$refs[this.activeName.split(',')[2]].form.id) {
          param.id = this.$refs[this.activeName.split(',')[2]].form.id
        }
        saveBeanClean(param).then(res => {
          if (res.code === 200) {
            this.msgSuccess('填报成功')
            this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
            this.$emit('ok')
          }
        }).catch((err) => {
          this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
          console.log(err)
        })
      }
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

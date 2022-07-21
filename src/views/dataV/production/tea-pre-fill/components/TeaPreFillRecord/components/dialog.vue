<template>
  <div class="dialog">
    <el-dialog
      title="新增填报信息"
      :visible.sync="dialogVisible"
      width="60vw"
      :close-on-click-modal="false"
      class="dialog-main"
    >
      <el-tabs v-if="dialogVisible" v-model="activeName">
        <el-tab-pane label="预置" name="first">
          <pre-table-form ref="pretableRef" @ok="update" />
        </el-tab-pane>
        <el-tab-pane label="填充" name="second">
          <fill-table ref="fill" @ok="update" />
        </el-tab-pane>
        <el-tab-pane label="人员" name="third">
          <user-form ref="managerTable" @ok="update" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <div class="buttonok" @click="handleOk">
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
import PreTableForm from './dialog-pre'
import UserForm from '@/views/dataV/production/components/UserForm'
import FillTable from './dialog-fill'
export default {
  components: {
    PreTableForm,
    UserForm,
    FillTable
  },
  data() {
    return {
      activeName: 'first',
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
    handleClose(done) {
      this.dialogVisible = false
    },
    handleOk() {
      if (this.activeName === 'first') {
        this.$refs.pretableRef.handleSubmit()
      } else if (this.activeName === 'second') {
        this.$refs.fill.handleSubmit()
      } else if (this.activeName === 'third') {
        this.$refs.managerTable.handleSubmit()
      }
    },
    update() {
      this.dialogVisible = false
      this.$emit('update')
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

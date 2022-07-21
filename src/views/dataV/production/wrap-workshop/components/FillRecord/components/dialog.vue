<!--
 * @Author: your name
 * @Date: 2021-06-21 13:18:44
 * @LastEditTime: 2021-07-07 14:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \鼎加大屏\c2matica-ui\src\views\dataV\production\components\DeclareDialog.vue
-->
<template>
  <div class="dialog">
    <el-dialog
      title="包装车间报工"
      :visible.sync="dialogVisible"
      width="80vw"
      :close-on-click-modal="false"
      class="dialog-main"
    >
      <el-tabs v-if="dialogVisible" v-model="activeName">
        <el-tab-pane label="包装" name="first">
          <dialog-form ref="packageForm" />
        </el-tab-pane>
        <el-tab-pane label="人员" name="third">
          <user-form ref="managerTable" @ok="handleUpdata" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <div class="buttonok" @click="handleOk()">
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
import UserForm from '@/views/dataV/production/components/UserForm'
import DialogForm from './dialog-form.vue'
import { getStaff, saveStaff, savePackage } from '@/api/datav'

export default {
  components: {
    // PreTableForm,
    UserForm,
    DialogForm
  },
  data() {
    return {
      activeName: 'first',
      dialogVisible: false,
      userList: [],
      userForm: {}
    }
  },
  methods: {
    handleUpdata() {
      this.dialogVisible = false
      this.$emit('ok')
    },
    /**
     * @description: 初始化
     * @param {*}
     * @return {*}
     */
    openDialog() {
      this.getStaffList()
      this.dialogVisible = true
    },
    /**
     * @description: 获取人员列表
     * @param {*}
     * @return {*}
     */
    getStaffList() {
      getStaff({ workshopCode: this.$route.meta.workshopCode }).then((res) => {
        const data = res.data
        const managerList = []
        data.map((item) => {
          managerList.push({
            nickName: item.nickName,
            userId: item.userId
          })
        })
        this.userList = [...managerList]
      })
    },
    /**
     * @description: 弹窗确认
     * @param {*}
     * @return {*}
     */
    handleOk() {
      this.dialogVisible = false
      if (this.activeName === 'third') {
        //  人员处理
        const peopleList = this.$refs.managerTable.form
        const supervisor = {}
        const operators = []
        this.userList.map((item) => {
          if (peopleList.supervisor) {
            if (peopleList.supervisor === item.userId) {
              (supervisor.nickName = item.nickName),
              (supervisor.userId = item.userId)
            }
          }
          if (peopleList.operators.length > 0) {
            peopleList.operators.map((v) => {
              if (v === item.userId) {
                operators.push({
                  nickName: item.nickName,
                  userId: item.userId
                })
              }
            })
          }
        })
        this.userForm = {
          workshopCode: this.$route.meta.workshopCode,
          workshopName: this.$route.meta.title,
          supervisor: supervisor,
          operators: operators
        }
        saveStaff(this.userForm)
          .then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg)
            }
            this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
            this.$emit('ok')
          })
          .catch((err) => {
            this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
            console.log(err)
          })
      } else if (this.activeName === 'first') {
        // 包装
        console.log(this.$refs.packageForm.tableData[0], this.$refs.packageForm.form)
        savePackage(
          Object.assign(
            this.$refs.packageForm.tableData[0],
            this.$refs.packageForm.form
          )
        ).then((res) => {
          this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
          this.$emit('ok')
        })
          .catch((err) => {
            this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
            console.log(err)
          })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/styles/dialog.scss"; //dialog css
@import "~@/views/dataV/styles/tabs.scss"; //dialog css
.dialog-main {
  padding: 0 2rem;
  &-pre {
    width: 100%;
    height: 100%;
  }
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  .buttonok {
    width: 12.4rem;
    height: 3.9rem;
    font-size: 1.6rem;
    margin-left: 1.6rem;
    font-weight: 400;
    cursor: pointer;
    background-color: #e94716;
    text-align: center;
    line-height: 3.9rem;
    &-title {
      color: #fff;
    }
  }
  .buttoncancel {
    width: 12.4rem;
    height: 3.9rem;
    font-size: 1.6rem;
    margin-left: 1.6rem;
    font-weight: 400;
    cursor: pointer;
    background-color: transparent;
    border: 0.1rem solid #e94716;
    text-align: center;
    line-height: 3.9rem;
    &-title {
      color: #e94716;
    }
  }
}
</style>


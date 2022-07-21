<template>
  <div class="table-main">
    <el-form ref="form" :model="form" label-width="8rem">
      <el-form-item label="车间主管:">
        <el-select
          v-model="form.supervisor"
          size="mini"
          placeholder="请选择车间主管"
        >
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.nickName"
            :value="item.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="操作人员:">
        <el-checkbox-group v-model="form.operators">
          <el-checkbox
            v-for="item in userList"
            :key="item.userId"
            :label="item.userId"
          >{{ item.nickName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getStaff, saveStaff, getLastPeople } from '@/api/datav'
export default {
  data() {
    return {
      userList: [],
      form: {
        id: '',
        supervisor: '',
        operators: [],
        userForm: []
      }
    }
  },
  created() {
    this.getStaffList()
    this.getLastInfo()
  },
  methods: {
    /**
     * @description: 获取人员得回显
     * @param {*}
     * @return {*}
     */
    getLastInfo() {
      const params = {
        workshopCode: this.$route.meta.workshopCode,
        planTime: this.$store.state.planInfo.time
      }
      getLastPeople(params)
        .then(res => {
          if (res) {
            const data = res.operators
            data.map(item => {
              this.form.operators.push(item.userId)
            })
            this.form.supervisor = res.supervisor.userId
            if (res.id) {
              this.form.id = res.id
            }
          } else {
            this.form.operators = []
            this.form.supervisor = ''
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @description: 获取人员列表
     * @param {*}
     * @return {*}
     */
    getStaffList() {
      const workshopCode = this.$route.meta.workshopCode
      getStaff({ workshopCode }).then(res => {
        const data = res.data
        const managerList = []
        data.map(item => {
          managerList.push({
            nickName: item.nickName,
            userId: item.userId
          })
        })
        this.userList = [...managerList]
      })
    },
    /**
     * @description: 提交
     * @param {*}
     * @return {*}
     */
    handleSubmit() {
      const peopleList = this.form
      const supervisor = {}
      const operators = []
      this.userList.map(item => {
        if (peopleList.supervisor) {
          if (peopleList.supervisor === item.userId) {
            (supervisor.nickName = item.nickName),
            (supervisor.userId = item.userId)
          }
        }
        if (peopleList.operators.length > 0) {
          peopleList.operators.map(v => {
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
      if (peopleList.id) {
        this.userForm.id = peopleList.id
      }
      saveStaff(this.userForm)
        .then(res => {
          if (res.code === 200) {
            this.$message.success(res.msg)
            this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
            this.$emit('ok')
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
          this.$store.dispatch('setPlanInfo', this.$store.state.planInfo.info)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/views/dataV/styles/table.scss'; //table css
@import '~@/views/dataV/styles/form.scss'; //table css
</style>

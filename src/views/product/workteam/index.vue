<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="区域名称" prop="teamName">
        <el-input
          v-model="queryParams.teamName"
          placeholder="请输入区域名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:workteam:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:workteam:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:workteam:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:workteam:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="workteamList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="班组编码" align="center" prop="teamCode" />
      <el-table-column label="班组名称" align="center" prop="teamName" />
      <el-table-column label="所属工厂" align="center" prop="factoryIdText" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['product:workteam:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:workteam:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改班组管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="班组编码" prop="teamCode">
          <el-input v-model="form.teamCode" placeholder="请输入班组编码" />
        </el-form-item>
        <el-form-item label="班组名称" prop="teamName">
          <el-input v-model="form.teamName" placeholder="请输入班组名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">班组管理信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddWorkteamUser">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteWorkteamUser">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="workteamUser" :data="workteamUserList" :row-class-name="rowWorkteamUserIndex" @selection-change="handleWorkteamUserSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="工组成员" prop="userId">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.userId" placeholder="请输入" />-->
              <el-autocomplete
                v-model="scope.row.userIdText"
                popper-class="my-autocomplete"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="((item)=>{handleSelect(item, scope)})"
              >
                <i
                  slot="suffix"
                  class="el-icon-edit el-input__icon"
                  @click="((val)=>{handleIconClick(val, scope)})"
                />
                <template slot-scope="{ item }">
                  <div class="name">{{ item.nickName }}</div>
                  <span class="addr">{{ item.email }}</span>
                </template>
              </el-autocomplete>
            </template>
          </el-table-column>
          <!--          <el-table-column label="所属工厂" prop="factoryId">
            <template slot-scope="scope">
              <el-input v-model="scope.row.factoryId" placeholder="请输入所属工厂" />
            </template>
          </el-table-column>-->
          <el-table-column label="备注" prop="remark">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="请输入备注" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
  /* .my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .addr {
    font-size: 12px;
    color: #b4b4b4;
  }

  .highlighted .addr {
    color: #ddd;
  }
  }
  } */
</style>
<script>
import { listWorkteam, getWorkteam, delWorkteam, addWorkteam, updateWorkteam, exportWorkteam } from '@/api/product/workteam'
import { listCurrentFactoryUsers } from '@/api/system/user'

export default {
  name: 'Workteam',
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      currentFactoryUsersOptions: [],
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedWorkteamUser: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 班组管理表格数据
      workteamList: [],
      // 班组管理表格数据
      workteamUserList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teamName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        teamName: [
          { required: true, message: '区域名称不能为空', trigger: 'blur' }
        ]
      },
      currentDeptOptions: []
    }
  },
  created() {
    this.getList()
    this.listCurrentFactoryUsers()
  },
  methods: {
    handleSelect(item, scope) {
      console.log('handleSelect', item)
      scope.row.userIdText = item.nickName
      scope.row.userId = item.userId
    },
    handleIconClick(item, scope) {
      console.info('handleIconClick', item)
    },
    querySearch(queryString, cb) {
      const users = this.currentFactoryUsersOptions
      const results = queryString ? users.filter(this.createFilter(queryString)) : users
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (user) => {
        return (user.nickName.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || user.userName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    listCurrentFactoryUsers() {
      listCurrentFactoryUsers().then(response => {
        this.currentFactoryUsersOptions = response.data
      })
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      }
    },
    /** 查询班组管理列表 */
    getList() {
      this.loading = true
      listWorkteam(this.queryParams).then(response => {
        this.workteamList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        teamCode: null,
        teamName: null,
        factoryId: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.workteamUserList = []
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加班组管理'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getWorkteam(id).then(response => {
        this.form = response.data
        this.workteamUserList = response.data.workteamUserList
        this.open = true
        this.title = '修改班组管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.workteamUserList = this.workteamUserList
          if (this.form.id != null) {
            updateWorkteam(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addWorkteam(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除班组管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delWorkteam(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 班组管理序号 */
    rowWorkteamUserIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 班组管理添加按钮操作 */
    handleAddWorkteamUser() {
      const obj = {}
      // obj.deptId="",
      obj.userId = ''
      obj.factoryId = ''
      obj.remark = ''
      this.workteamUserList.push(obj)
    },
    /** 班组管理删除按钮操作 */
    handleDeleteWorkteamUser() {
      if (this.checkedWorkteamUser.length == 0) {
        this.$alert('请先选择要删除的班组管理数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.workteamUserList.splice(this.checkedWorkteamUser[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleWorkteamUserSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.workteamUser.clearSelection()
        this.$refs.workteamUser.toggleRowSelection(selection.pop())
      } else {
        this.checkedWorkteamUser = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有班组管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportWorkteam(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>


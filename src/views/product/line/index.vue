<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="线体编码" prop="prodLineCode">
        <el-input
          v-model="queryParams.prodLineCode"
          placeholder="请输入线体编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="线体名称" prop="prodLineName">
        <el-input
          v-model="queryParams.prodLineName"
          placeholder="请输入线体名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="车间" prop="workshopId">
        <el-select v-model="queryParams.workshopId" placeholder="请选择车间" clearable size="small">
          <el-option
            v-for="op in workshopIdTableOptions"
            :key="op.id"
            :label="op.workshopName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:line:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:line:edit']"
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
          v-hasPermi="['product:line:remove']"
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
          v-hasPermi="['product:line:export']"
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

    <el-table v-loading="loading" :data="lineList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="线体编码" align="center" prop="prodLineCode" />
      <el-table-column label="线体名称" align="center" prop="prodLineName" />
      <el-table-column label="车间" align="center" prop="workshopIdText" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['product:line:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:line:remove']"
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

    <!-- 添加或修改线体对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="线体编码" prop="prodLineCode">
          <el-input v-model="form.prodLineCode" placeholder="请输入线体编码" />
        </el-form-item>
        <el-form-item label="线体名称" prop="prodLineName">
          <el-input v-model="form.prodLineName" placeholder="请输入线体名称" />
        </el-form-item>
        <el-form-item label="车间" prop="workshopId">
          <el-select v-model="form.workshopId" placeholder="请选择车间">
            <el-option
              v-for="op in workshopIdTableOptions"
              :key="op.id"
              :label="op.workshopName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">工序-线体关系管理信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddProcedureProduceLine">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteProcedureProduceLine">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="procedureProduceLine" :data="procedureProduceLineList" :row-class-name="rowProcedureProduceLineIndex" @selection-change="handleProcedureProduceLineSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="工序" prop="prodProcedureId">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.procedureName"
                popper-class="my-autocomplete"
                :fetch-suggestions="querySearch"
                placeholder="请选择工序"
                @select="((item)=>{handleSelect(item, scope)})"
              >
                <i
                  slot="suffix"
                  class="el-icon-edit el-input__icon"
                  @click="((val)=>{handleIconClick(val, scope)})"
                />
                <template slot-scope="{ item }">
                  <div class="name">{{ item.procedureName }}</div>
                </template>
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark" placeholder="请输入备注" />
            </template>
          </el-table-column>
          <el-table-column label="显示顺序" prop="orderNum">
            <template slot-scope="scope">
              <el-input v-model="scope.row.orderNum" placeholder="请输入显示顺序" />
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

<script>
import { listLine, getLine, delLine, addLine, updateLine, exportLine, getProProcedures } from '@/api/product/line'
import { listWorkshopNoPage } from '@/api/phygrid/workshop'

export default {
  name: 'Line',
  components: {
  },
  data() {
    return {
      prodprocedureOptions: [],
      workshopIdTableOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedProcedureProduceLine: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 线体表格数据
      lineList: [],
      // 工序-线体关系管理表格数据
      procedureProduceLineList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prodLineCode: null,
        prodLineName: null,
        workshopId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        prodLineName: [
          { required: true, message: '线体名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
  },
  methods: {
    initDtableOptions() {
      listWorkshopNoPage({}).then(response => {
        this.workshopIdTableOptions = response.data
      })
      getProProcedures().then(response => {
        this.prodprocedureOptions = response.data
      })
    },
    // 线体捞工序值
    querySearch(queryString, cb) {
      const users = this.prodprocedureOptions
      const results = queryString ? users.filter(this.createFilter(queryString)) : users
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (user) => {
        return (user.procedureName.toLowerCase().indexOf(queryString.toLowerCase()) === 0 || user.procedureName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item, scope) {
      console.log('handleSelect', item)
      scope.row.procedureName = item.procedureName
      scope.row.prodProcedureId = item.id
    },
    /** 查询线体列表 */
    getList() {
      this.loading = true
      listLine(this.queryParams).then(response => {
        this.lineList = response.rows
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
        factoryId: null,
        prodLineCode: null,
        prodLineName: null,
        workshopId: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
      }
      this.procedureProduceLineList = []
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
      this.title = '添加线体'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getLine(id).then(response => {
        this.form = response.data
        this.procedureProduceLineList = response.data.procedureProduceLineList
        this.open = true
        this.title = '修改线体'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.procedureProduceLineList = this.procedureProduceLineList
          if (this.form.id != null) {
            updateLine(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLine(this.form).then(response => {
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
      this.$confirm('是否确认删除线体编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delLine(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 工序-线体关系管理序号 */
    rowProcedureProduceLineIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 工序-线体关系管理添加按钮操作 */
    handleAddProcedureProduceLine() {
      const obj = {}
      obj.prodProcedureId = ''
      obj.remark = ''
      obj.orderNum = ''
      this.procedureProduceLineList.push(obj)
    },
    /** 工序-线体关系管理删除按钮操作 */
    handleDeleteProcedureProduceLine() {
      if (this.checkedProcedureProduceLine.length == 0) {
        this.$alert('请先选择要删除的工序-线体关系管理数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.procedureProduceLineList.splice(this.checkedProcedureProduceLine[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleProcedureProduceLineSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.procedureProduceLine.clearSelection()
        this.$refs.procedureProduceLine.toggleRowSelection(selection.pop())
      } else {
        this.checkedProcedureProduceLine = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有线体数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportLine(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

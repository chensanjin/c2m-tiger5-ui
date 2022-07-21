<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="品类名称" prop="categoryName">
        <el-input
          v-model="queryParams.categoryName"
          placeholder="请输入品类名称"
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
          v-hasPermi="['product:category:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:category:edit']"
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
          v-hasPermi="['product:category:remove']"
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
          v-hasPermi="['product:category:export']"
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

    <el-table v-loading="loading" :data="categoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="所属工厂" align="center" prop="factoryIdText" />
      <el-table-column label="品类编码" align="center" prop="categoryCode" />
      <el-table-column label="品类名称" align="center" prop="categoryName" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['product:category:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:category:remove']"
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

    <!-- 添加或修改品类管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="560px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品类编码" prop="categoryCode">
          <el-input v-model="form.categoryCode" placeholder="请输入品类编码" />
        </el-form-item>
        <el-form-item label="品类名称" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入品类名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">工艺-品类关系管理信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddCategoryTechnology">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteCategoryTechnology">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="categoryTechnology" :data="categoryTechnologyList" :row-class-name="rowCategoryTechnologyIndex" @selection-change="handleCategoryTechnologySelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="工艺名称" align="center" prop="technologyId">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.technologyName"
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
                  <div class="name">{{ item.technologyName }}</div>
                </template>
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column label="占比" prop="percent" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.percent" placeholder="请输入占比" />
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="orderNum" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.orderNum" placeholder="请输入排序" />
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
import { listCategory, getCategory, delCategory, addCategory, updateCategory, exportCategory, loadTechnologyList } from '@/api/product/category'
import { listCurrentFactoryUsers } from '@/api/system/user'

export default {
  name: 'Category',
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedCategoryTechnology: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 品类管理表格数据
      categoryList: [],
      // 工艺-品类关系管理表格数据
      categoryTechnologyList: [],
      technologyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        categoryName: [
          { required: true, message: '品类名称不能为空', trigger: 'blur' }
        ]
      },
      technologyId: null
    }
  },
  created() {
    this.loadTechnologyList()
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
  },
  methods: {
    handleSelect(item, scope) {
      console.log('handleSelect', item)
      scope.row.technologyId = item.id
      scope.row.technologyName = item.technologyName
    },
    handleIconClick(item, scope) {
      console.info('handleIconClick', item)
    },
    initDtableOptions() {
    },
    /** 查询品类管理列表 */
    getList() {
      this.loading = true
      listCategory(this.queryParams).then(response => {
        this.categoryList = response.rows
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
        categoryCode: null,
        categoryName: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
      }
      this.categoryTechnologyList = []
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
      this.title = '添加品类管理'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCategory(id).then(response => {
        this.form = response.data
        this.categoryTechnologyList = response.data.categoryTechnologyList
        this.open = true
        this.title = '修改品类管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.categoryTechnologyList = this.categoryTechnologyList
          if (this.form.id != null) {
            console.log(this.form, '54545454')
            updateCategory(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addCategory(this.form).then(response => {
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
      this.$confirm('是否确认删除品类管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCategory(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 工艺-品类关系管理序号 */
    rowCategoryTechnologyIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 工艺-品类关系管理添加按钮操作 */
    handleAddCategoryTechnology() {
      const obj = {}
      obj.technologyId = ''
      obj.percent = ''
      obj.orderNum = ''
      this.categoryTechnologyList.push(obj)
    },
    /** 工艺-品类关系管理删除按钮操作 */
    handleDeleteCategoryTechnology() {
      if (this.checkedCategoryTechnology.length == 0) {
        this.$alert('请先选择要删除的工艺-品类关系管理数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.categoryTechnologyList.splice(this.checkedCategoryTechnology[0].index - 1, 1)
      }
    },

    /** 获取所有工艺 */
    querySearch(queryString, cb) {
      var technologyList = this.technologyList
      var results = queryString ? technologyList.filter(this.createFilter(queryString)) : technologyList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (technologyList) => {
        return (technologyList.technologyName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    loadTechnologyList() {
      loadTechnologyList().then(response => {
        this.technologyList = response.data
      })
    },
    /** 单选框选中数据 */
    handleCategoryTechnologySelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.categoryTechnology.clearSelection()
        this.$refs.categoryTechnology.toggleRowSelection(selection.pop())
      } else {
        this.checkedCategoryTechnology = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有品类管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportCategory(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

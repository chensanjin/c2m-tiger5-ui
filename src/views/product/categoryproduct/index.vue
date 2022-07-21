<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="品类" prop="categoryId">
        <el-select v-model="queryParams.categoryId" placeholder="请选择品类" clearable size="small">
          <el-option
            v-for="op in categoryIdTableOptions"
            :key="op.id"
            :label="op.categoryName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="产品编码" prop="productCode">
        <el-input
          v-model="queryParams.productCode"
          placeholder="请输入产品编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="产品名称" prop="productName">
        <el-input
          v-model="queryParams.productName"
          placeholder="请输入产品名称"
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
          v-hasPermi="['product:categoryproduct:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:categoryproduct:edit']"
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
          v-hasPermi="['product:categoryproduct:remove']"
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
          v-hasPermi="['product:categoryproduct:export']"
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

    <el-table v-loading="loading" :data="categoryproductList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="品类" align="center" prop="categoryIdText" />
      <el-table-column label="产品编码" align="center" prop="productCode" />
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['product:categoryproduct:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:categoryproduct:remove']"
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

    <!-- 添加或修改产品管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="720px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择品类" @change="handleChanged">
            <el-option
              v-for="op in categoryIdTableOptions"
              :key="op.id"
              :label="op.categoryName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品编码" prop="productCode">
          <el-input v-model="form.productCode" placeholder="请输入产品编码" />
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="form.productName" placeholder="请输入产品名称" />
        </el-form-item>
        <el-form-item label="产品logo">
          <imageUpload v-model="form.logoUrl" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">工序-产品关系管理信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddProcedureProduct">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteProcedureProduct">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="procedureProduct" :data="procedureProductList" :row-class-name="rowProcedureProductIndex" @selection-change="handleProcedureProductSelectionChange">
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
          <el-table-column label="占比" prop="percent">
            <template slot-scope="scope">
              <el-input v-model="scope.row.percent" placeholder="请输入占比" />
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
import {
  listCategoryproduct,
  getCategoryproduct,
  delCategoryproduct,
  addCategoryproduct,
  updateCategoryproduct,
  exportCategoryproduct,
  prodprocedureOptions
} from '@/api/product/categoryproduct'
import { listCategoryNoPage } from '@/api/product/category'
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'Categoryproduct',
  components: {
    ImageUpload
  },
  data() {
    return {
      prodprocedureOptionsCopy: [],
      prodprocedureOptions: [],
      categoryIdTableOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedProcedureProduct: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 产品管理表格数据
      categoryproductList: [],
      // 工序-产品关系管理表格数据
      procedureProductList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        categoryId: null,
        productCode: null,
        productName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        productName: [
          { required: true, message: '产品名称不能为空', trigger: 'blur' }
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
      listCategoryNoPage({}).then(response => {
        this.categoryIdTableOptions = response.data
      })
      prodprocedureOptions().then(response => {
        this.prodprocedureOptions = response.data
        this.prodprocedureOptionsCopy = response.data
      })
    },
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
    handleChanged(val) {
      const result = this.prodprocedureOptionsCopy.filter(item => { return item.categoryId === val })
      this.prodprocedureOptions = result
    },
    handleSelect(item, scope) {
      console.log('handleSelect', item)
      scope.row.procedureName = item.procedureName
      scope.row.prodProcedureId = item.id
    },

    /** 查询产品管理列表 */
    getList() {
      this.loading = true
      listCategoryproduct(this.queryParams).then(response => {
        this.categoryproductList = response.rows
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
        categoryId: null,
        productCode: null,
        productName: null,
        logoUrl: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
      }
      this.procedureProductList = []
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
      this.title = '添加产品管理'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCategoryproduct(id).then(response => {
        this.form = response.data
        this.procedureProductList = response.data.procedureProductList
        this.open = true
        this.title = '修改产品管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.procedureProductList = this.procedureProductList
          if (this.form.id != null) {
            updateCategoryproduct(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addCategoryproduct(this.form).then(response => {
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
      this.$confirm('是否确认删除产品管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCategoryproduct(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 工序-产品关系管理序号 */
    rowProcedureProductIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 工序-产品关系管理添加按钮操作 */
    handleAddProcedureProduct() {
      const obj = {}
      obj.prodProcedureId = ''
      obj.percent = ''
      obj.remark = ''
      obj.orderNum = ''
      this.procedureProductList.push(obj)
    },
    /** 工序-产品关系管理删除按钮操作 */
    handleDeleteProcedureProduct() {
      if (this.checkedProcedureProduct.length == 0) {
        this.$alert('请先选择要删除的工序-产品关系管理数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.procedureProductList.splice(this.checkedProcedureProduct[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleProcedureProductSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.procedureProduct.clearSelection()
        this.$refs.procedureProduct.toggleRowSelection(selection.pop())
      } else {
        this.checkedProcedureProduct = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有产品管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportCategoryproduct(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

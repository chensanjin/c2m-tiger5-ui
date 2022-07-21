<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="产品名称" prop="productId">
        <el-select v-model="queryParams.productId" placeholder="请选择产品名称" clearable size="small">
          <el-option
            v-for="op in productIdTableOptions"
            :key="op.id"
            :label="op.productName"
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
          v-hasPermi="['material:materialratio:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['material:materialratio:edit']"
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
          v-hasPermi="['material:materialratio:remove']"
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
          v-hasPermi="['material:materialratio:export']"
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

    <el-table v-loading="loading" :data="materialratioList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="品类" align="center" prop="categoryName" />
      <el-table-column label="产品名称" align="center" prop="productIdText" />
      <el-table-column label="工序名称" align="center" prop="procedureIdText" />
      <el-table-column label="所属工厂" align="center" prop="factoryIdText" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['material:materialratio:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['material:materialratio:remove']"
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

    <!-- 添加或修改工序物料配比对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="品类名称" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择品类" @change="handlerSelectCategoryId">
            <el-option
              v-for="op in productCategoryOptions"
              :key="op.id"
              :label="op.categoryName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称" prop="productId">
          <el-select v-model="form.productId" placeholder="请选择产品名称" @change="handlerSelectProductId">
            <el-option
              v-for="op in form.subProductIdTableOptions"
              :key="op.id"
              :label="op.productName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工序名称" prop="procedureId">
          <el-select v-model="form.procedureId" placeholder="请选择工序名称">
            <el-option
              v-for="op in form.procedureIdTableOptions"
              :key="op.prodProcedureId"
              :label="op.procedureName"
              :value="op.prodProcedureId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">工序物料关联信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddProcedureMaterialRelation">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteProcedureMaterialRelation">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="procedureMaterialRelation" :data="procedureMaterialRelationList" :row-class-name="rowProcedureMaterialRelationIndex" @selection-change="handleProcedureMaterialRelationSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="物料分类" prop="materialCategoryId">
            <template slot-scope="scope">
              <treeselect v-model="scope.row.materialCategoryId" append-to-body z-index="9999" :options="materialCategoryOptions" :normalizer="normalizer" placeholder="选择物料分类" @select="((val)=>{handlerMaterialCategoryChanged(val, scope)})" />
            </template>
          </el-table-column>
          <el-table-column label="物料名称" prop="materialId">
            <template slot-scope="scope">
              <el-select v-model="scope.row.materialId" placeholder="请选择物料名称">
                <el-option
                  v-for="op in scope.row.materialOptions"
                  :key="op.id"
                  :label="op.materialNameCn"
                  :value="op.id"
                />
              </el-select>
            </template>
          </el-table-column>
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

<script>
import { listMaterialratio, getMaterialratio, delMaterialratio, addMaterialratio, updateMaterialratio, exportMaterialratio } from '@/api/material/materialratio'
import { listCategoryproductNoPage, prodproceduresByProduct } from '@/api/product/categoryproduct'
import { listProcedureNoPage } from '@/api/product/procedure'
import { listCategoryNoPage } from '@/api/material/category'
import { listMaterialNoPage } from '@/api/material/material'
import { listCategoryNoPage as listProductCategoryNoPage } from '@/api/product/category'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Materialratio',
  components: {
    Treeselect
  },
  data() {
    return {
      productCategoryOptions: [],
      materialCategoryOptions: [],
      productIdTableOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedProcedureMaterialRelation: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 工序物料配比表格数据
      materialratioList: [],
      // 工序物料关联表格数据
      procedureMaterialRelationList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        productId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        delFlag: [
          { required: true, message: '备注不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.listMaterialCategory()
  },
  methods: {
    handlerSelectCategoryId(id) {
      listCategoryproductNoPage({ 'categoryId': id }).then(response => {
        this.$set(this.form, 'subProductIdTableOptions', response.data)
      })
    },
    handlerSelectProductId(id) {
      prodproceduresByProduct(id).then(response => {
        this.$set(this.form, 'procedureIdTableOptions', response.data)
      })
    },
    handlerMaterialCategoryChanged(node, scope) {
      listMaterialNoPage({ 'materialGroupId': node.id }).then(response => {
        this.$set(scope.row, 'materialOptions', response.data)
      })
    },
    /*    initMaterialCategory(id){
      if(!id){
        return null;
      }
      console.info("MaterialCategoryId",id)
      let data=[]
      this.$nextTick(function(){
        data = listMaterialNoPage({"materialGroupId":id}).then(response => {
          return  response.data;
        });

      });
      console.info(data)
      return data
    },*/
    listMaterialCategory() {
      listCategoryNoPage().then(response => {
        this.materialCategoryOptions = this.handleTree(response.data, 'id')
      })
    },
    /** 转换分类数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.cateName,
        children: node.children
      }
    },
    initDtableOptions() {
      listCategoryproductNoPage({}).then(response => {
        this.productIdTableOptions = response.data
      })
      /*     listProcedureNoPage({}).then(response => {
         this.procedureIdTableOptions = response.data;
     });*/
      listProductCategoryNoPage({}).then(response => {
        this.productCategoryOptions = response.data
      })
    },
    /** 查询工序物料配比列表 */
    getList() {
      this.loading = true
      listMaterialratio(this.queryParams).then(response => {
        this.materialratioList = response.rows
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
        subProductIdTableOptions: [],
        procedureIdTableOptions: [],
        categoryId: null,
        productId: null,
        procedureId: null,
        factoryId: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.procedureMaterialRelationList = []
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
      this.title = '添加工序物料配比'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMaterialratio(id).then(response => {
        this.form = response.data
        this.procedureMaterialRelationList = response.data.procedureMaterialRelationList
        this.open = true
        this.title = '修改工序物料配比'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.procedureMaterialRelationList = this.procedureMaterialRelationList
          console.info(this.form)
          if (this.form.id != null) {
            updateMaterialratio(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMaterialratio(this.form).then(response => {
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
      this.$confirm('是否确认删除工序物料配比编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMaterialratio(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 工序物料关联序号 */
    rowProcedureMaterialRelationIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 工序物料关联添加按钮操作 */
    handleAddProcedureMaterialRelation() {
      const obj = {}
      obj.materialId = ''
      obj.remark = ''
      this.procedureMaterialRelationList.push(obj)
    },
    /** 工序物料关联删除按钮操作 */
    handleDeleteProcedureMaterialRelation() {
      if (this.checkedProcedureMaterialRelation.length == 0) {
        this.$alert('请先选择要删除的工序物料关联数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.procedureMaterialRelationList.splice(this.checkedProcedureMaterialRelation[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleProcedureMaterialRelationSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.procedureMaterialRelation.clearSelection()
        this.$refs.procedureMaterialRelation.toggleRowSelection(selection.pop())
      } else {
        this.checkedProcedureMaterialRelation = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有工序物料配比数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportMaterialratio(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

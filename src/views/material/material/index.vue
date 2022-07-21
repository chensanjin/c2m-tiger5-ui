<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <!--分类树-->
        <div class="head-container">
          <el-input
            v-model="materialCategoryName"
            placeholder="请输入物料分类名称"
            clearable
            size="small"
            prefix-icon="el-icon-search"
            style="margin-bottom: 20px"
          />
        </div>
        <div class="head-container">
          <el-tree
            ref="tree"
            :data="materialCategoryTreeOptions"
            :props="defaultProps"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            default-expand-all
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="20" :xs="24">
        <!--物料table-->
        <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
          <el-form-item label="中文名称" prop="materialNameCn">
            <el-input
              v-model="queryParams.materialNameCn"
              placeholder="请输入中文名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="英文名称" prop="materialNameEn">
            <el-input
              v-model="queryParams.materialNameEn"
              placeholder="请输入英文名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="通用名称" prop="generlName">
            <el-input
              v-model="queryParams.generlName"
              placeholder="请输入通用名称"
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
          <el-tag>所查询分类：{{ currentCategory === ''?'全部':currentCategory }}</el-tag>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['material:material:add']"
              type="primary"
              plain
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-hasPermi="['material:material:edit']"
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
              v-hasPermi="['material:material:remove']"
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
              v-hasPermi="['material:material:export']"
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

        <el-table v-loading="loading" :data="materialList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="物料编码">
                  <span>{{ props.row.materialCode }}</span>
                </el-form-item>
                <el-form-item label="中文名称">
                  <span>{{ props.row.materialNameCn }}</span>
                </el-form-item>
                <el-form-item label="英文名称">
                  <span>{{ props.row.materialNameEn }}</span>
                </el-form-item>
                <el-form-item label="罐内余量">
                  <span>{{ props.row.storage }}</span>
                </el-form-item>
                <el-form-item label="通用名称">
                  <span>{{ props.row.generlName }}</span>
                </el-form-item>
                <el-form-item label="助记码">
                  <span>{{ props.row.helpCode }}</span>
                </el-form-item>
                <el-form-item label="规格">
                  <span>{{ props.row.specs }}</span>
                </el-form-item>
                <el-form-item label="主计量单位">
                  <span>{{ props.row.mainUnitText }}</span>
                </el-form-item>
                <el-form-item label="库存计量单位">
                  <span>{{ props.row.storageUnitText }}</span>
                </el-form-item>
                <el-form-item label="生产计量单位">
                  <span>{{ props.row.produceUnitText }}</span>
                </el-form-item>
                <el-form-item label="销售计量单位">
                  <span>{{ props.row.saleUnitText }}</span>
                </el-form-item>
                <el-form-item label="采购计量单位">
                  <span>{{ props.row.purchaseUnitText }}</span>
                </el-form-item>
                <el-form-item label="计量组">
                  <span>{{ findMeteringGroupValueFromDictLabel(props.row.meteringGroup) }}</span>
                  <!--<span>{{meteringGroupOptions}}</span>-->
                </el-form-item>
                <el-form-item label="成本默认辅计量">
                  <span>{{ props.row.defaultCostAuxiliary }}</span>
                </el-form-item>
                <el-form-item label="生产国家">
                  <span>{{ props.row.fromCountry }}</span>
                </el-form-item>
                <el-form-item label="生产地">
                  <span>{{ props.row.produceAddress }}</span>
                </el-form-item>
                <el-form-item label="生产厂家">
                  <span>{{ props.row.produceFactory }}</span>
                </el-form-item>
                <el-form-item label="海关编码">
                  <span>{{ props.row.customsCode }}</span>
                </el-form-item>
                <el-form-item label="海关单位换算率">
                  <span>{{ props.row.customsExchangeRate }}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="ID" align="center" prop="id" />
          <el-table-column label="物料分类" align="center" prop="materialGroupIdText" />
          <el-table-column label="物料编码" align="center" prop="materialCode" />
          <el-table-column label="中文名称" align="center" prop="materialNameCn" />
          <el-table-column label="罐内余量" align="center" prop="storage" />
          <el-table-column label="通用名称" align="center" prop="generlName" />
          <el-table-column label="备注" align="center" prop="remark" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button
                v-hasPermi="['material:material:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                v-hasPermi="['material:material:remove']"
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
      </el-col>
    </el-row>
    <!-- 添加或修改物料管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="220px" label-position="right">
        <el-input v-show="false" v-model="form.materialGroupId" />
        <el-form-item label="物料编码" prop="materialCode">
          <el-input v-model="form.materialCode" placeholder="请输入物料编码" />
        </el-form-item>
        <el-form-item label="中文名称" prop="materialNameCn">
          <el-input v-model="form.materialNameCn" placeholder="请输入中文名称" />
        </el-form-item>
        <el-form-item label="英文名称" prop="materialNameEn">
          <el-input v-model="form.materialNameEn" placeholder="请输入英文名称" />
        </el-form-item>
        <el-form-item label="通用名称" prop="generlName">
          <el-input v-model="form.generlName" placeholder="请输入通用名称" />
        </el-form-item>
        <el-form-item label="罐内余量" prop="storage">
          <el-input v-model="form.storage" placeholder="请输入罐内余量" />
        </el-form-item>
        <el-form-item label="助记码" prop="helpCode">
          <el-input v-model="form.helpCode" placeholder="请输入助记码" />
        </el-form-item>
        <el-form-item label="规格" prop="specs">
          <el-input v-model="form.specs" placeholder="请输入规格" />
        </el-form-item>
        <el-form-item label="主计量单位" prop="mainUnit">
          <el-select v-model="form.mainUnit" placeholder="请选择主计量单位">
            <el-option
              v-for="op in meteringUnitTableOptions"
              :key="op.id"
              :label="op.meterNameCn"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="库存计量单位" prop="storageUnit">
          <el-select v-model="form.storageUnit" placeholder="请选择库存计量单位">
            <el-option
              v-for="op in meteringUnitTableOptions"
              :key="op.id"
              :label="op.meterNameCn"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="生产计量单位" prop="produceUnit">
          <el-select v-model="form.produceUnit" placeholder="请选择生产计量单位">
            <el-option
              v-for="op in meteringUnitTableOptions"
              :key="op.id"
              :label="op.meterNameCn"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="销售计量单位" prop="saleUnit">
          <el-select v-model="form.saleUnit" placeholder="请选择销售计量单位">
            <el-option
              v-for="op in meteringUnitTableOptions"
              :key="op.id"
              :label="op.meterNameCn"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="采购计量单位" prop="purchaseUnit">
          <el-select v-model="form.purchaseUnit" placeholder="请选择采购计量单位">
            <el-option
              v-for="op in meteringUnitTableOptions"
              :key="op.id"
              :label="op.meterNameCn"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="计量组" prop="meteringGroup">
          <el-select v-model="form.meteringGroup" placeholder="请选择计量组">
            <el-option
              v-for="dict in meteringGroupOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="成本默认辅计量" prop="defaultCostAuxiliary">
          <el-input v-model="form.defaultCostAuxiliary" placeholder="请输入成本默认辅计量" />
        </el-form-item>
        <el-form-item label="生产国家" prop="fromCountry">
          <el-input v-model="form.fromCountry" placeholder="请输入生产国家" />
        </el-form-item>
        <el-form-item label="生产地" prop="produceAddress">
          <el-input v-model="form.produceAddress" placeholder="请输入生产地" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="produceFactory">
          <el-input v-model="form.produceFactory" placeholder="请输入生产厂家" />
        </el-form-item>
        <el-form-item label="海关编码" prop="customsCode">
          <el-input v-model="form.customsCode" placeholder="请输入海关编码" />
        </el-form-item>
        <el-form-item label="海关单位换算率" prop="customsExchangeRate">
          <el-input v-model="form.customsExchangeRate" placeholder="请输入海关单位换算率" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listMaterial, getMaterial, delMaterial, addMaterial, updateMaterial, exportMaterial } from '@/api/material/material'
import { treeselect } from '@/api/material/category'
import { listMeteringunitNoPage } from '@/api/material/meteringunit'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'Material',
  components: {
    Treeselect
  },
  data() {
    return {
      currentCategory: '',
      currentCategoryId: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 树对象
      materialCategoryTreeOptions: undefined,
      // 分类名称
      materialCategoryName: undefined,
      meteringUnitTableOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 物料管理表格数据
      materialList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 计量组字典
      meteringGroupOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialNameCn: null,
        materialNameEn: null,
        generlName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getTreeselect()
    this.getDicts('metering_group').then(response => {
      this.meteringGroupOptions = response.data
    })
  },
  methods: {
    // 过滤数组，找到需要判断得dictValue
    findMeteringGroupValueFromDictLabel(dictValue) {
      const ob = this.meteringGroupOptions.find(ob => ob.dictValue == dictValue)
      if (ob) {
        return ob.dictLabel
      } else {
        return ''
      }
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 节点单击事件
    handleNodeClick(data) {
      console.info(data)
      this.queryParams.materialGroupId = data.id
      this.currentCategoryId = data.id
      this.currentCategory = data.label
      this.getList()
    },
    initDtableOptions() {
      listMeteringunitNoPage({}).then(response => {
        this.meteringUnitTableOptions = response.data
      })
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.materialCategoryTreeOptions = response.data
      })
    },
    /** 查询物料管理列表 */
    getList() {
      this.loading = true
      listMaterial(this.queryParams).then(response => {
        this.materialList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 计量组字典翻译
    meteringGroupFormat(row, column) {
      return this.selectDictLabel(this.meteringGroupOptions, row.meteringGroup)
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
        materialCode: null,
        materialNameCn: null,
        materialNameEn: null,
        generlName: null,
        helpCode: null,
        specs: null,
        materialGroupId: this.currentCategoryId,
        mainUnit: null,
        storageUnit: null,
        produceUnit: null,
        saleUnit: null,
        purchaseUnit: null,
        meteringGroup: null,
        defaultCostAuxiliary: null,
        fromCountry: null,
        produceAddress: null,
        produceFactory: null,
        customsCode: null,
        customsExchangeRate: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
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
      if (!this.currentCategoryId) {
        this.$message({
          message: '选择分类后新增',
          type: 'warning'
        })
        return
      }
      this.reset()
      this.open = true
      this.title = '添加物料管理'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getMaterial(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改物料管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateMaterial(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addMaterial(this.form).then(response => {
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
      this.$confirm('是否确认删除物料管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delMaterial(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有物料管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportMaterial(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="标识" prop="stdName">
        <el-input
          v-model="queryParams.stdName"
          placeholder="输入每小时标准产出标识"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否有效" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择是否有效" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
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
          v-hasPermi="['product:stdOutConfig:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:stdOutConfig:edit']"
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
          v-hasPermi="['product:stdOutConfig:remove']"
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
          v-hasPermi="['product:stdOutConfig:export']"
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

    <el-table v-loading="loading" :data="stdOutConfigList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="每小时标准产出标识" align="center" prop="stdName" />
      <el-table-column label="每小时标准产出编码" align="center" prop="stdCode" />
      <el-table-column label="所属工厂" align="center" prop="factoryIdText" />
      <el-table-column label="是否有效" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='1'"
            v-hasPermi="['product:stdOutConfig:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:stdOutConfig:remove']"
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

    <!-- 添加或修改每小时标准产出对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1200px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-form-item label="每小时标准产出标识" prop="stdName">
          <el-input v-model="form.stdName" placeholder="请输入每小时标准产出标识" />
        </el-form-item>
        <el-form-item label="每小时标准产出编码" prop="stdCode">
          <el-input v-model="form.stdCode" placeholder="请输入每小时标准产出编码" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">产品每小时标准产出</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddStdOutpotProductRelation">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteStdOutpotProductRelation">删除</el-button>
          </el-col>
        </el-row>
        <el-table ref="stdOutpotProductRelation" :data="stdOutpotProductRelationList" :row-class-name="rowStdOutpotProductRelationIndex" @selection-change="handleStdOutpotProductRelationSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="产品名称" prop="productId">
            <template slot-scope="scope">
              <el-select v-model="scope.row.productId" placeholder="请选择是否有效" clearable size="small">
                <el-option
                  v-for="op in productOptions"
                  :key="op.id"
                  :label="op.productName"
                  :value="op.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="工序" prop="procedureId">
            <template slot-scope="scope">
              <el-select v-model="scope.row.procedureId" placeholder="请选择工序" clearable size="small">
                <el-option
                  v-for="op in procedureOptions"
                  :key="op.id"
                  :label="op.optionLable"
                  :value="op.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单位" prop="unitId">
            <template slot-scope="scope">
              <el-select v-model="scope.row.unitId" placeholder="请选择单位" clearable size="small">
                <el-option
                  v-for="op in unitOptions"
                  :key="op.id"
                  :label="op.meterNameCn"
                  :value="op.id"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="每小时标准产出" prop="stdValue">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stdValue" placeholder="请输入每小时标准产出" />
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
import { listStdOutConfig, getStdOutConfig, delStdOutConfig, addStdOutConfig, updateStdOutConfig, exportStdOutConfig } from '@/api/product/stdOutConfig'
import { listCategoryproductNoPage } from '@/api/product/categoryproduct'
import { listProcedure4Select } from '@/api/product/procedure'
import { listMeteringunitNoPage } from '@/api/material/meteringunit'

export default {
  name: 'StdOutConfig',
  components: {
  },
  data() {
    return {
      productOptions: [],
      unitOptions: [],
      procedureOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedStdOutpotProductRelation: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 每小时标准产出表格数据
      stdOutConfigList: [],
      // 每小时标准产出与产品关联表格数据
      stdOutpotProductRelationList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否有效字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stdName: null,
        status: null
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
    this.getDicts('if_effective').then(response => {
      this.statusOptions = response.data
    })
    listCategoryproductNoPage().then(response => {
      this.productOptions = response.data
    })
    listProcedure4Select().then(response => {
      this.procedureOptions = response.data
    })
    listMeteringunitNoPage().then(response => {
      this.unitOptions = response.data
    })
  },
  methods: {
    initDtableOptions() {
    },
    /** 查询每小时标准产出列表 */
    getList() {
      this.loading = true
      listStdOutConfig(this.queryParams).then(response => {
        this.stdOutConfigList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 是否有效字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
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
        stdName: null,
        stdCode: null,
        factoryId: null,
        status: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null
      }
      this.stdOutpotProductRelationList = []
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
      this.title = '添加每小时标准产出'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getStdOutConfig(id).then(response => {
        this.form = response.data
        this.stdOutpotProductRelationList = response.data.stdOutpotProductRelationList
        this.open = true
        this.title = '修改每小时标准产出'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.stdOutpotProductRelationList = this.stdOutpotProductRelationList
          if (this.form.id != null) {
            updateStdOutConfig(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addStdOutConfig(this.form).then(response => {
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
      this.$confirm('是否确认删除每小时标准产出编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delStdOutConfig(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 每小时标准产出与产品关联序号 */
    rowStdOutpotProductRelationIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 每小时标准产出与产品关联添加按钮操作 */
    handleAddStdOutpotProductRelation() {
      const obj = {}
      obj.stdValue = ''
      obj.productId = ''
      obj.unitId = ''
      obj.procedureId = ''
      obj.remark = ''
      this.stdOutpotProductRelationList.push(obj)
    },
    /** 每小时标准产出与产品关联删除按钮操作 */
    handleDeleteStdOutpotProductRelation() {
      if (this.checkedStdOutpotProductRelation.length == 0) {
        this.$alert('请先选择要删除的每小时标准产出与产品关联数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.stdOutpotProductRelationList.splice(this.checkedStdOutpotProductRelation[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleStdOutpotProductRelationSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.stdOutpotProductRelation.clearSelection()
        this.$refs.stdOutpotProductRelation.toggleRowSelection(selection.pop())
      } else {
        this.checkedStdOutpotProductRelation = selection
      }
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有每小时标准产出数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportStdOutConfig(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

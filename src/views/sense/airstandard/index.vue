<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="检验项" prop="checkTerm">
        <el-input
          v-model="queryParams.checkTerm"
          placeholder="请输入检验项"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input
          v-model="queryParams.unit"
          placeholder="请输入单位"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准最小值" prop="standardMin">
        <el-input
          v-model="queryParams.standardMin"
          placeholder="请输入标准最小值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标准最大值" prop="standardMax">
        <el-input
          v-model="queryParams.standardMax"
          placeholder="请输入标准最大值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检验项编码" prop="checkTermCode">
        <el-input
          v-model="queryParams.checkTermCode"
          placeholder="请输入检验项编码"
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
      <el-form-item label="类别" prop="checkType">
        <el-select v-model="queryParams.checkType" placeholder="请选择类别" clearable size="small">
          <el-option
            v-for="dict in checkTypeOptions"
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
          v-hasPermi="['sense:standard:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sense:standard:edit']"
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
          v-hasPermi="['sense:standard:remove']"
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
          v-hasPermi="['sense:standard:export']"
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

    <el-table v-loading="loading" :data="standardList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="类别" align="center" prop="id" />
      <el-table-column label="检验项" align="center" prop="checkTerm" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="标准最小值" align="center" prop="standardMin" />
      <el-table-column label="标准最大值" align="center" prop="standardMax" />
      <el-table-column label="检验项编码" align="center" prop="checkTermCode" />
      <el-table-column label="车间" align="center" prop="workshopIdText" />
      <el-table-column label="类别" align="center" prop="checkType" :formatter="checkTypeFormat" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['sense:standard:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['sense:standard:remove']"
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

    <!-- 添加或修改环监达标检验项对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="检验项" prop="checkTerm">
          <el-input v-model="form.checkTerm" placeholder="请输入检验项" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="标准最小值" prop="standardMin">
          <el-input v-model="form.standardMin" placeholder="请输入标准最小值" />
        </el-form-item>
        <el-form-item label="标准最大值" prop="standardMax">
          <el-input v-model="form.standardMax" placeholder="请输入标准最大值" />
        </el-form-item>
        <el-form-item label="是否删除 0 未删除 1 已删除" prop="delFlag">
          <el-input v-model="form.delFlag" placeholder="请输入是否删除 0 未删除 1 已删除" />
        </el-form-item>
        <el-form-item label="检验项编码" prop="checkTermCode">
          <el-input v-model="form.checkTermCode" placeholder="请输入检验项编码" />
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
        <el-form-item label="类别" prop="checkType">
          <el-select v-model="form.checkType" placeholder="请选择类别">
            <el-option
              v-for="dict in checkTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
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
import { listStandard, getStandard, delStandard, addStandard, updateStandard, exportStandard } from '@/api/sense/airstandard'
import { listWorkshopNoPage } from '@/api/phygrid/workshop'

export default {
  name: 'Standard',
  components: {
  },
  data() {
    return {
      workshopIdTableOptions: [],
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
      // 环监达标检验项表格数据
      standardList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类别字典
      checkTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        checkTerm: null,
        unit: null,
        standardMin: null,
        standardMax: null,
        checkTermCode: null,
        workshopId: null,
        checkType: null
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
    this.getDicts('bus_equip_type').then(response => {
      this.checkTypeOptions = response.data
    })
  },
  methods: {
    initDtableOptions() {
      listWorkshopNoPage({}).then(response => {
        this.workshopIdTableOptions = response.data
      })
    },
    /** 查询环监达标检验项列表 */
    getList() {
      this.loading = true
      listStandard(this.queryParams).then(response => {
        this.standardList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 类别字典翻译
    checkTypeFormat(row, column) {
      return this.selectDictLabel(this.checkTypeOptions, row.checkType)
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
        checkTerm: null,
        unit: null,
        standardMin: null,
        standardMax: null,
        createTime: null,
        delFlag: null,
        checkTermCode: null,
        workshopId: null,
        checkType: null
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
      this.reset()
      this.open = true
      this.title = '添加环监达标检验项'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getStandard(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改环监达标检验项'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStandard(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addStandard(this.form).then(response => {
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
      this.$confirm('是否确认删除环监达标检验项编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delStandard(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有环监达标检验项数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportStandard(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

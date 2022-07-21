<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:expend:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:expend:edit']"
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
          v-hasPermi="['product:expend:remove']"
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
          v-hasPermi="['product:expend:export']"
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

    <el-table v-loading="loading" :data="expendList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="产品" align="center" prop="productName" />
      <el-table-column label="滤水盘比例" align="center" prop="filterWaterDiscRatio" />
      <el-table-column label="铝箔比例" align="center" prop="aluminumFoilRatio" />
      <el-table-column label="滤纸比例" align="center" prop="filterPaperRatio" />
      <el-table-column label="封口膜比例" align="center" prop="parafilmRatio" />
      <el-table-column label="分水膜比例" align="center" prop="waterMembrane" />
      <el-table-column label="是否有效" align="center" prop="status" :formatter="statusFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==='1'"
            v-hasPermi="['product:expend:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:expend:remove']"
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

    <!-- 添加或修改耗用比例对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="产品" prop="productId">
          <el-select v-model="form.productId" placeholder="请选择产品" clearable size="small">
            <el-option
              v-for="op in productIdTableOptions"
              :key="op.id"
              :label="op.productName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="滤水盘比例" prop="filterWaterDiscRatio">
          <el-input v-model="form.filterWaterDiscRatio" placeholder="请输入滤水盘比例" />
        </el-form-item>
        <el-form-item label="铝箔比例" prop="aluminumFoilRatio">
          <el-input v-model="form.aluminumFoilRatio" placeholder="请输入铝箔比例" />
        </el-form-item>
        <el-form-item label="滤纸比例" prop="filterPaperRatio">
          <el-input v-model="form.filterPaperRatio" placeholder="请输入滤纸比例" />
        </el-form-item>
        <el-form-item label="封口膜比例" prop="parafilmRatio">
          <el-input v-model="form.parafilmRatio" placeholder="请输入封口膜比例" />
        </el-form-item>
        <el-form-item label="分水膜比例" prop="waterMembrane">
          <el-input v-model="form.waterMembrane" placeholder="请输入分水膜比例" />
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
import { listExpend, getExpend, delExpend, addExpend, updateExpend, exportExpend } from '@/api/product/expend'
import { listCategoryproductNoPage } from '@/api/product/categoryproduct'

export default {
  name: 'Expend',
  components: {
  },
  data() {
    return {
      productIdTableOptions: [],
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
      // 耗用比例表格数据
      expendList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 是否有效字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
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
  },
  methods: {
    initDtableOptions() {
      listCategoryproductNoPage({}).then(response => {
        this.productIdTableOptions = response.data
      })
    },
    /** 查询耗用比例列表 */
    getList() {
      this.loading = true
      listExpend(this.queryParams).then(response => {
        this.expendList = response.rows
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
        filterWaterDiscRatio: null,
        aluminumFoilRatio: null,
        filterPaperRatio: null,
        parafilmRatio: null,
        waterMembrane: null,
        status: null,
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
      this.reset()
      this.open = true
      this.title = '添加耗用比例'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getExpend(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改耗用比例'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateExpend(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addExpend(this.form).then(response => {
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
      this.$confirm('是否确认删除耗用比例编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delExpend(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有耗用比例数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportExpend(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

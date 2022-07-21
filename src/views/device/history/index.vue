<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px" @submit.native.prevent>
      <el-form-item label="设备名称" prop="equipmentName">
        <el-input
          v-model="queryParams.equipmentName"
          placeholder="请输入设备名称"
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
          v-hasPermi="['device:history:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:history:edit']"
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
          v-hasPermi="['device:history:remove']"
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
          v-hasPermi="['device:history:export']"
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

    <el-table v-loading="loading" :data="historyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="设备编码" align="center" prop="equipmentCode" />
      <el-table-column label="设备名称" align="center" prop="equipmentName" />
      <el-table-column label="车间" align="center" prop="workshopIdText" />
      <el-table-column label="表计类型" align="center" prop="equipmentType" :formatter="equipmentTypeFormat" />
      <el-table-column label="表计周期" align="center" prop="equipmentPeriod" :formatter="equipmentPeriodFormat" />
      <el-table-column label="抄表时间" align="center" prop="readTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.readTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="表读计数" align="center" prop="readCount" />
      <el-table-column label="用电总价" align="center" prop="totalPrice" />
      <el-table-column label="用量" align="center" prop="useCount" />
      <el-table-column label="创建者" align="center" prop="createByText" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['device:history:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['device:history:remove']"
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

    <!-- 添加或修改设备历史记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备编码" prop="equipmentCode">
          <el-input v-model="form.equipmentCode" placeholder="请输入设备编码" />
        </el-form-item>
        <el-form-item label="表计周期" prop="equipmentPeriod">
          <el-select v-model="form.equipmentPeriod" placeholder="请选择表计周期">
            <el-option
              v-for="dict in equipmentPeriodOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="抄表时间" prop="readTime">
          <el-date-picker
            v-model="form.readTime"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择抄表时间"
          />
        </el-form-item>
        <el-form-item label="表读计数" prop="readCount">
          <el-input v-model="form.readCount" placeholder="请输入表读计数" />
        </el-form-item>
        <el-form-item label="用电总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="用电总价" />
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
import { listHistory, getHistory, delHistory, addHistory, updateHistory, exportHistory } from '@/api/device/history'
import { listUserNoPage } from '@/api/system/user'

export default {
  name: 'History',
  components: {
  },
  data() {
    return {
      createByTableOptions: [],
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
      // 设备历史记录表格数据
      historyList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 表计类型字典
      equipmentTypeOptions: [],
      // 表计周期字典
      equipmentPeriodOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        equipmentCode: [
          { required: true, message: '设备编码不能为空', trigger: 'blur' }
        ],
        equipmentPeriod: [
          { required: true, message: '表计周期不能为空', trigger: 'change' }
        ],
        readTime: [
          { required: true, message: '抄表时间不能为空', trigger: 'blur' }
        ],
        readCount: [
          { required: true, message: '表读计数不能为空', trigger: 'blur' }
        ],
        totalPrice: [
          { required: true, message: '用电总价不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getDicts('equipment_period').then(response => {
      this.equipmentPeriodOptions = response.data
    })
    this.getDicts('energy_device_category').then(response => {
      this.equipmentTypeOptions = response.data
    })
  },
  methods: {
    initDtableOptions() {
      // listUserNoPage({}).then(response => {
      //     this.createByTableOptions = response.data;
      // });
    },
    /** 查询设备历史记录列表 */
    getList() {
      this.loading = true
      listHistory(this.queryParams).then(response => {
        this.historyList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 表计类型字典翻译
    equipmentTypeFormat(row, column) {
      return this.selectDictLabel(this.equipmentTypeOptions, row.equipmentType)
    },
    // 表计周期字典翻译
    equipmentPeriodFormat(row, column) {
      return this.selectDictLabel(this.equipmentPeriodOptions, row.equipmentPeriod)
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
        equipmentCode: null,
        equipmentName: null,
        equipmentPeriod: null,
        readTime: null,
        readCount: null,
        totalPrice: null,
        useCount: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
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
      this.title = '添加设备历史记录'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getHistory(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改设备历史记录'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHistory(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addHistory(this.form).then(response => {
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
      this.$confirm('是否确认删除设备历史记录编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delHistory(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有设备历史记录数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportHistory(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sense:sensethreport:export']"
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

    <el-table v-loading="loading" :data="sensethreportList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="设备编号" align="center" prop="senseCodeText" />
      <el-table-column label="温度" align="center" prop="teAvgValue" />
      <el-table-column label="湿度" align="center" prop="huAvgValue" />
      <el-table-column label="手抄时间" align="center" prop="accTime" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.accTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['sense:sensethreport:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['sense:sensethreport:remove']"
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

    <!-- 添加或修改温湿度设备手抄对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="设备编号" prop="senseCode">
          <el-select v-model="form.senseCode" placeholder="请选择设备编号">
            <el-option
              v-for="op in senseCodeTableOptions"
              :key="op.senseCode"
              :label="op.senseName"
              :value="op.senseCode"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="温度" prop="teAvgValue">
          <el-input v-model="form.teAvgValue" placeholder="请输入温度" />
        </el-form-item>
        <el-form-item label="湿度" prop="huAvgValue">
          <el-input v-model="form.huAvgValue" placeholder="请输入湿度" />
        </el-form-item>
        <el-form-item label="统计时间，根据duration来计算时间精度" prop="accTime">
          <el-date-picker
            v-model="form.accTime"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择统计时间，根据duration来计算时间精度"
          />
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
import { listSensethreport, getSensethreport, delSensethreport, addSensethreport, updateSensethreport, exportSensethreport } from '@/api/sense/sensethreport'
import { listSenseNoPage } from '@/api/device/sense'

export default {
  name: 'Sensethreport',
  components: {
  },
  data() {
    return {
      senseCodeTableOptions: [],
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
      // 温湿度设备手抄表格数据
      sensethreportList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        senseCode: this.$route.query.energyCode,
        orderByColumn: 'accTime',
        isAsc: 'desc'
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
  },
  methods: {
    initDtableOptions() {
      listSenseNoPage({}).then(response => {
        this.senseCodeTableOptions = response.data
      })
    },
    /** 查询温湿度设备手抄列表 */
    getList() {
      this.loading = true
      listSensethreport(this.queryParams).then(response => {
        this.sensethreportList = response.rows
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
        senseCode: null,
        teAvgValue: null,
        huAvgValue: null,
        accTime: null,
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
      this.title = '添加温湿度设备手抄'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSensethreport(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改温湿度设备手抄'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSensethreport(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSensethreport(this.form).then(response => {
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
      this.$confirm('是否确认删除温湿度设备手抄编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delSensethreport(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有温湿度设备手抄数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportSensethreport(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['sense:senseairreport:export']"
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

    <el-table v-loading="loading" :data="senseairreportList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="设备编号" align="center" prop="senseCodeText" />
      <el-table-column label="静压差" align="center" prop="paAvgValue" />
      <el-table-column label="尘埃粒子大于0.5" align="center" prop="dustAvgValue" />
      <el-table-column label="沉降菌" align="center" prop="cfuAvgValue" />
      <el-table-column label="浮游菌" align="center" prop="ffuAvgValue" />
      <el-table-column label="尘埃粒子大于5" align="center" prop="dustfiveAvgValue" />
      <el-table-column label="换气次数" align="center" prop="breatheAvgValue" />
      <el-table-column label="氧气含量" align="center" prop="oxygenAvgValue" />
      <el-table-column label="手抄时间" align="center" prop="accTime" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.accTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['sense:senseairreport:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['sense:senseairreport:remove']"
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

    <!-- 添加或修改空气洁净度设备手抄对话框 -->
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
        <el-form-item label="静压差" prop="paAvgValue">
          <el-input v-model="form.paAvgValue" placeholder="请输入静压差" />
        </el-form-item>
        <el-form-item label="尘埃粒子大于0.5" prop="dustAvgValue">
          <el-input v-model="form.dustAvgValue" placeholder="请输入尘埃粒子大于0.5" />
        </el-form-item>
        <el-form-item label="沉降菌" prop="cfuAvgValue">
          <el-input v-model="form.cfuAvgValue" placeholder="请输入沉降菌" />
        </el-form-item>
        <el-form-item label="浮游菌" prop="ffuAvgValue">
          <el-input v-model="form.ffuAvgValue" placeholder="请输入浮游菌" />
        </el-form-item>
        <el-form-item label="尘埃粒子大于5" prop="dustfiveAvgValue">
          <el-input v-model="form.dustfiveAvgValue" placeholder="请输入尘埃粒子大于5" />
        </el-form-item>
        <el-form-item label="换气次数" prop="breatheAvgValue">
          <el-input v-model="form.breatheAvgValue" placeholder="请输入换气次数" />
        </el-form-item>
        <el-form-item label="氧气含量" prop="oxygenAvgValue">
          <el-input v-model="form.oxygenAvgValue" placeholder="请输入氧气含量" />
        </el-form-item>
        <el-form-item label="统计时间，根据duration来计算时间精度" prop="accTime">
          <el-date-picker
            v-model="form.accTime"
            clearable
            size="small"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="手抄时间"
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
import { listSenseairreport, getSenseairreport, delSenseairreport, addSenseairreport, updateSenseairreport, exportSenseairreport } from '@/api/sense/senseairreport'
import { listSenseNoPage } from '@/api/device/sense'

export default {
  name: 'Senseairreport',
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
      // 空气洁净度设备手抄表格数据
      senseairreportList: [],
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
    /** 查询空气洁净度设备手抄列表 */
    getList() {
      this.loading = true
      listSenseairreport(this.queryParams).then(response => {
        this.senseairreportList = response.rows
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
        paAvgValue: null,
        dustAvgValue: null,
        cfuAvgValue: null,
        ffuAvgValue: null,
        dustfiveAvgValue: null,
        breatheAvgValue: null,
        oxygenAvgValue: null,
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
      this.title = '添加空气洁净度设备手抄'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSenseairreport(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改空气洁净度设备手抄'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSenseairreport(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSenseairreport(this.form).then(response => {
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
      this.$confirm('是否确认删除空气洁净度设备手抄编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delSenseairreport(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有空气洁净度设备手抄数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportSenseairreport(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="airhistoryList" @selection-change="handleSelectionChange">
      <el-table-column type="index" width="55" align="center" />
      <el-table-column label="设备编号" align="center" prop="senseCode" />
      <el-table-column label="设备名称" align="center" prop="senseCodeText" />
      <el-table-column label="数采方式" align="center" prop="senseCategory" :formatter="senseCategoryFormat" />
      <el-table-column label="静压差" align="center" prop="paAvgValue" />
      <el-table-column label="尘埃粒子>0.5" align="center" prop="dustAvgValue" />
      <el-table-column label="沉降菌" align="center" prop="cfuAvgValue" />
      <el-table-column label="浮游菌" align="center" prop="ffuAvgValue" />
      <el-table-column label="尘埃粒子>5" align="center" prop="dustfiveAvgValue" />
      <el-table-column label="换气次数" align="center" prop="breatheAvgValue" />
      <el-table-column label="空气洁净度" align="center" prop="degreesAvgValue" />
      <el-table-column label="氧气含量" align="center" prop="oxygenAvgValue" />
      <el-table-column label="统计时间" align="center" prop="accTime" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.duration==='year'">{{ parseTime(scope.row.accTime, '{y}') }}</span>
          <span v-if="scope.row.duration==='month'">{{ parseTime(scope.row.accTime, '{y}-{m}') }}</span>
          <span v-if="scope.row.duration==='day'">{{ parseTime(scope.row.accTime, '{y}-{m}-{d}') }}</span>
          <span v-if="scope.row.duration==='hour'">{{ parseTime(scope.row.accTime, '{y}-{m}-{d} {h}') }}</span>
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
  </div>
</template>

<script>
import { listAirhistory, getAirhistory, delAirhistory, addAirhistory, updateAirhistory, exportAirhistory } from '@/api/task/airhistory'
import { listSenseNoPage } from '@/api/device/sense'

export default {
  name: 'Airhistory',
  components: {
  },
  props: {
    senseCode: {
      type: String,
      default: ''
    }
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
      // 空气洁净度历史数据表格数据
      airhistoryList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 手动自动字典
      senseCategoryOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        senseCode: this.senseCode,
        senseCategory: null
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
    this.getDicts('device_category').then(response => {
      this.senseCategoryOptions = response.data
    })
  },
  methods: {
    initDtableOptions() {
      listSenseNoPage({}).then(response => {
        this.senseCodeTableOptions = response.data
      })
    },
    /** 查询空气洁净度历史数据列表 */
    getList() {
      this.loading = true
      listAirhistory(this.queryParams).then(response => {
        this.airhistoryList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 手动自动字典翻译
    senseCategoryFormat(row, column) {
      return this.selectDictLabel(this.senseCategoryOptions, row.senseCategory)
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
        senseCategory: null,
        paAvgValue: null,
        dustAvgValue: null,
        cfuAvgValue: null,
        ffuAvgValue: null,
        dustfiveAvgValue: null,
        breatheAvgValue: null,
        degreesAvgValue: null,
        oxygenAvgValue: null,
        accTime: null,
        duration: null,
        factoryId: null,
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
      this.title = '添加空气洁净度历史数据'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getAirhistory(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改空气洁净度历史数据'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAirhistory(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addAirhistory(this.form).then(response => {
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
      this.$confirm('是否确认删除空气洁净度历史数据编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delAirhistory(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有空气洁净度历史数据数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportAirhistory(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

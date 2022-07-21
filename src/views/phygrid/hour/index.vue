<template>
  <div class="app-container">

    <el-table v-loading="loading" :data="hourList" @selection-change="handleSelectionChange">
      <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
      <el-table-column label="类别" align="center" prop="category" />
      <el-table-column label="SN" align="center" prop="sn" />
      <el-table-column label="单位时间首笔数据" align="center" prop="hourFirst" />
      <el-table-column label="单位时间首尾数据" align="center" prop="hourLast" />
      <el-table-column label="使用量" align="center" prop="difference" />
      <el-table-column label="总价" align="center" prop="totalPrice" />
      <el-table-column label="时间" align="center" prop="day" />
      <el-table-column label="时点" align="center" prop="hour" />
      <el-table-column label="所属工艺" align="center" prop="tecCatName" />
      <el-table-column label="所属车间" align="center" prop="workshopId" />
      <el-table-column label="所属工艺" align="center" prop="workshopName" />
      <el-table-column label="所属部门" align="center" prop="deptName" />
      <el-table-column label="所属线体" align="center" prop="prodLineName" />
      <el-table-column label="生产设备" align="center" prop="prodDeviceName" />
      <el-table-column label="设备用途" align="center" prop="energyPurpose" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改【中间】按小时清洗influxdb能耗数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类别" prop="category">
          <el-input v-model="form.category" placeholder="请输入类别" />
        </el-form-item>
        <el-form-item label="SN" prop="sn">
          <el-input v-model="form.sn" placeholder="请输入SN" />
        </el-form-item>
        <el-form-item label="单位时间首笔数据" prop="hourFirst">
          <el-input v-model="form.hourFirst" placeholder="请输入单位时间首笔数据" />
        </el-form-item>
        <el-form-item label="单位时间首尾数据" prop="hourLast">
          <el-input v-model="form.hourLast" placeholder="请输入单位时间首尾数据" />
        </el-form-item>
        <el-form-item label="使用量" prop="difference">
          <el-input v-model="form.difference" placeholder="请输入使用量" />
        </el-form-item>
        <el-form-item label="单价" prop="perPrice">
          <el-input v-model="form.perPrice" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="总价" prop="totalPrice">
          <el-input v-model="form.totalPrice" placeholder="请输入总价" />
        </el-form-item>
        <el-form-item label="时间" prop="day">
          <el-input v-model="form.day" placeholder="请输入时间" />
        </el-form-item>
        <el-form-item label="时点" prop="hour">
          <el-input v-model="form.hour" placeholder="请输入时点" />
        </el-form-item>
        <el-form-item label="所属工艺" prop="tecCatId">
          <el-input v-model="form.tecCatId" placeholder="请输入所属工艺" />
        </el-form-item>
        <el-form-item label="所属工艺名称" prop="tecCatName">
          <el-input v-model="form.tecCatName" placeholder="请输入所属工艺名称" />
        </el-form-item>
        <el-form-item label="所属车间" prop="workshopId">
          <el-input v-model="form.workshopId" placeholder="请输入所属车间" />
        </el-form-item>
        <el-form-item label="所属工艺名称" prop="workshopName">
          <el-input v-model="form.workshopName" placeholder="请输入所属工艺名称" />
        </el-form-item>
        <el-form-item label="所属部门" prop="deptId">
          <el-input v-model="form.deptId" placeholder="请输入所属部门" />
        </el-form-item>
        <el-form-item label="所属部门名称" prop="deptName">
          <el-input v-model="form.deptName" placeholder="请输入所属部门名称" />
        </el-form-item>
        <el-form-item label="所属线体" prop="prodLineId">
          <el-input v-model="form.prodLineId" placeholder="请输入所属线体" />
        </el-form-item>
        <el-form-item label="所属线体名称" prop="prodLineName">
          <el-input v-model="form.prodLineName" placeholder="请输入所属线体名称" />
        </el-form-item>
        <el-form-item label="生产设备" prop="prodDeviceId">
          <el-input v-model="form.prodDeviceId" placeholder="请输入生产设备" />
        </el-form-item>
        <el-form-item label="生产设备名称" prop="prodDeviceName">
          <el-input v-model="form.prodDeviceName" placeholder="请输入生产设备名称" />
        </el-form-item>
        <el-form-item label="设备用途" prop="energyPurpose">
          <el-input v-model="form.energyPurpose" placeholder="请输入设备用途" />
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
import { listHour, getHour, delHour, addHour, updateHour, exportHour } from '@/api/phygrid/hour'

export default {
  name: 'Hour',
  components: {
  },
  props: {
    electricCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
      // 【中间】按小时清洗influxdb能耗数据表格数据
      hourList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sn: this.electricCode,
        category: null,
        hourFirst: null,
        hourLast: null,
        difference: null,
        perPrice: null,
        totalPrice: null,
        day: null,
        hour: null,
        tecCatId: null,
        tecCatName: null,
        workshopId: null,
        workshopName: null,
        deptId: null,
        deptName: null,
        prodLineId: null,
        prodLineName: null,
        prodDeviceId: null,
        prodDeviceName: null,
        energyPurpose: null
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
    },
    /** 查询【中间】按小时清洗influxdb能耗数据列表 */
    getList() {
      this.loading = true
      listHour(this.queryParams).then(response => {
        this.hourList = response.rows
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
        category: null,
        sn: null,
        hourFirst: null,
        hourLast: null,
        difference: null,
        perPrice: null,
        totalPrice: null,
        day: null,
        hour: null,
        tecCatId: null,
        tecCatName: null,
        workshopId: null,
        workshopName: null,
        deptId: null,
        deptName: null,
        prodLineId: null,
        prodLineName: null,
        prodDeviceId: null,
        prodDeviceName: null,
        energyPurpose: null,
        createTime: null
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
      this.title = '添加【中间】按小时清洗influxdb能耗数据'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getHour(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改【中间】按小时清洗influxdb能耗数据'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateHour(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addHour(this.form).then(response => {
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
      this.$confirm('是否确认删除【中间】按小时清洗influxdb能耗数据编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delHour(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有【中间】按小时清洗influxdb能耗数据数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportHour(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

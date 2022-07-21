<template>
  <div class="app-container">

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['phygrid:plan:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['phygrid:plan:edit']"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['phygrid:plan:remove']"
        >删除
        </el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['phygrid:plan:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="planList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
      <!--      <el-table-column label="年份" align="center" prop="year" />-->
      <el-table-column label="年/周" align="center" prop="weekNo">
        <!--<template slot-scope="scope">
          <router-link :to="'/phygrid/prodPlanDetail/index/' + scope.row.id" class="link-type">
            <span>{{ scope.row.dictType }}</span>
          </router-link>
        </template>-->
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新者" align="center" prop="updateBy" />
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['phygrid:plan:edit']"
          >修改
          </el-button>-->

          <router-link :to="{path:'/plan/prodPlanDetail/'+scope.row.id,query: {id:scope.row.id,weekNo:scope.row.weekNo}}" class="link-type">
            <span>详情</span>

          </router-link>
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="planDetail(scope.row)"
            v-hasPermi="['phygrid:plan:edit']"
            >详情

          </el-button>-->

          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['phygrid:plan:remove']"
          >删除
          </el-button>-->
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

    <!-- 添加或修改生产计划主对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!--<el-form-item label="年份" prop="year">
          <el-input v-model="form.year" placeholder="请输入年份" />
        </el-form-item>-->

        <el-form-item label="年/周" prop="weekNo">
          <el-date-picker
            v-model="form.time"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
            @change="changeTime"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listPlan, getPlan, delPlan, addPlan, updatePlan, exportPlan } from '@/api/phygrid/plan'
import moment from 'moment'

export default {
  name: 'Plan',
  components: {},
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
      // 生产计划主表格数据
      planList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        year: null
      },
      // 表单参数
      form: {
        id: null,
        year: null,
        time: null,
        weekNo: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null
      },
      // 表单校验
      rules: {
        delFlag: [
          { required: true, message: '是否删除(0 未删除 1 已删除)不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
  },
  methods: {
    planDetail(row) {
      this.$router.push({ path: '/plan/prodPlanDetail', query: { id: row.id, weekNo: row.weekNo }})

      console.log(row.id)
    },
    changeTime() {
      if (this.form.time) {
        this.form.weekNo = moment(this.form.time).format('YYYYWW')
        console.log(moment(this.form.time).format('YYYYWW'), '111')
        console.log(this.form.time, '222')
      } else {
        this.form.weekNo = ''
      }
      // console.log(this.form.weekNo)
    },
    initDtableOptions() {
    },
    /** 查询生产计划主列表 */
    getList() {
      this.loading = true
      listPlan(this.queryParams).then(response => {
        this.planList = response.rows
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
        year: null,
        time: null,
        weekNo: null,
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
      this.title = '添加生产计划'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPlan(id).then(response => {
        this.form = response.data
        // this.form.time = moment(response.data.weekNo).format('YYYY-MM-DD');
        console.log(this.form.time)
        this.open = true
        this.title = '修改生产计划'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePlan(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              console.log('weekNo', this.form.weekNo)
              this.getList()
            })
          } else {
            addPlan(this.form).then(response => {
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
      this.$confirm('是否确认删除生产计划编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delPlan(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有生产计划数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportPlan(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {
      })
    }
  }
}
</script>

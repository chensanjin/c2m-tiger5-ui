<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="所属区域" prop="areaId">
        <el-select v-model="queryParams.areaId" placeholder="请选择所属区域" clearable size="small">
          <el-option
            v-for="op in areaIdTableOptions"
            :key="op.id"
            :label="op.areaName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="车间名称" prop="workshopName">
        <el-input
          v-model="queryParams.workshopName"
          placeholder="请输入车间名称"
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
          v-hasPermi="['phygrid:workshop:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['phygrid:workshop:edit']"
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
          v-hasPermi="['phygrid:workshop:remove']"
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
          v-hasPermi="['phygrid:workshop:export']"
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

    <el-table v-loading="loading" :data="workshopList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户ID" align="center" prop="id" />
      <el-table-column label="所属区域" align="center" prop="areaIdText" />
      <el-table-column label="所属楼层" align="center" prop="floor" />
      <el-table-column label="车间编码" align="center" prop="workshopCode" />
      <el-table-column label="车间名称" align="center" prop="workshopName" />
      <el-table-column label="车间工艺" align="center" prop="technologyIdText" />
      <el-table-column label="所属工厂" align="center" prop="factoryIdText" />
      <el-table-column label="负责人" align="center" prop="leaderText" />
      <el-table-column label="工厂区域" align="center" prop="factoryArea" />
      <el-table-column label="所属产线" align="center" prop="produceLine" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['phygrid:workshop:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['phygrid:workshop:remove']"
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

    <!-- 添加或修改车间管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择所属区域">
            <el-option
              v-for="op in areaIdTableOptions"
              :key="op.id"
              :label="op.areaName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车间编码" prop="workshopCode">
          <el-input v-model="form.workshopCode" placeholder="请输入车间编码" />
        </el-form-item>
        <el-form-item label="车间名称" prop="workshopName">
          <el-input v-model="form.workshopName" placeholder="请输入车间名称" />
        </el-form-item>
        <el-form-item label="车间工艺" prop="technologyId">
          <el-select v-model="form.technologyId" placeholder="请选择车间工艺">
            <el-option
              v-for="op in technologyIdTableOptions"
              :key="op.id"
              :label="op.technologyName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-select v-model="form.leader" placeholder="请选择负责人">
            <el-option
              v-for="op in leaderTableOptions"
              :key="op.userId"
              :label="op.nickName"
              :value="op.userId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属楼层" prop="floor">
          <el-input v-model="form.floor" placeholder="请输入所属楼层" />
        </el-form-item>
        <el-form-item label="工厂区域" prop="factoryArea">
          <el-input v-model="form.factoryArea" placeholder="请输入工厂区域" />
        </el-form-item>
        <el-form-item label="所属产线" prop="produceLine">
          <el-input v-model="form.produceLine" placeholder="请输入所属产线" />
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
import { listWorkshop, getWorkshop, delWorkshop, addWorkshop, updateWorkshop, exportWorkshop } from '@/api/phygrid/workshop'
import { listFactoryareaNoPage } from '@/api/phygrid/factoryarea'
import { listTechnologyNoPage } from '@/api/product/technology'
import { listCurrentFactoryUsers } from '@/api/system/user'

export default {
  name: 'Workshop',
  components: {
  },
  data() {
    return {
      areaIdTableOptions: [],
      technologyIdTableOptions: [],
      leaderTableOptions: [],
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
      // 车间管理表格数据
      workshopList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        areaId: null,
        workshopName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        workshopName: [
          { required: true, message: '车间名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
  },
  methods: {
    initDtableOptions() {
      listFactoryareaNoPage({}).then(response => {
        this.areaIdTableOptions = response.data
      })
      listTechnologyNoPage({}).then(response => {
        this.technologyIdTableOptions = response.data
      })
      listCurrentFactoryUsers({}).then(response => {
        this.leaderTableOptions = response.data
      })
    },
    /** 查询车间管理列表 */
    getList() {
      this.loading = true
      listWorkshop(this.queryParams).then(response => {
        this.workshopList = response.rows
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
        areaId: null,
        workshopCode: null,
        workshopName: null,
        technologyId: null,
        factoryId: null,
        leader: null,
        delFlag: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        floor: null,
        factoryArea: null,
        produceLine: null
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
      this.title = '添加车间管理'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getWorkshop(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改车间管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWorkshop(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addWorkshop(this.form).then(response => {
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
      this.$confirm('是否确认删除车间管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delWorkshop(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有车间管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportWorkshop(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="部门" prop="deptId">
        <el-select v-model="queryParams.deptId" placeholder="请选择部门" clearable size="small">
          <el-option
            v-for="op in deptIdTableOptions"
            :key="op.deptId"
            :label="op.deptName"
            :value="op.deptId"
          />
        </el-select>
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
      <el-form-item label="线体" prop="produceLineId">
        <el-select v-model="queryParams.produceLineId" placeholder="请选择线体" clearable size="small">
          <el-option
            v-for="op in produceLineIdTableOptions"
            :key="op.id"
            :label="op.prodLineName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工序" prop="prodProcedureId">
        <el-select v-model="queryParams.prodProcedureId" placeholder="请选择工序" clearable size="small">
          <el-option
            v-for="op in prodProcedureIdTableOptions"
            :key="op.id"
            :label="op.procedureName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备编码" prop="equipmentCode">
        <el-input
          v-model="queryParams.equipmentCode"
          placeholder="请输入设备编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
          v-hasPermi="['product:equipment:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['product:equipment:edit']"
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
          v-hasPermi="['product:equipment:remove']"
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
          v-hasPermi="['product:equipment:export']"
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

    <el-table v-loading="loading" :data="equipmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!--      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="部门" align="center" prop="deptIdText" />
      <el-table-column label="区域" align="center" prop="areaIdText" />
      <el-table-column label="车间" align="center" prop="workshopIdText" />
      <el-table-column label="线体" align="center" prop="produceLineIdText" />
      <el-table-column label="工序" align="center" prop="prodProcedureIdText" />-->
      <el-table-column label="设备类别" align="center" prop="prodEquipmentType" :formatter="equipmentTypeFormat" />
      <el-table-column label="设备编码" align="center" prop="equipmentCode" />
      <el-table-column label="设备名称" align="center" prop="equipmentName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['product:equipment:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['product:equipment:remove']"
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

    <!-- 添加或修改生产设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">

        <el-form-item label="设备类别" prop="prodEquipmentType">
          <el-select v-model="form.prodEquipmentType" placeholder="请选择设备类别">
            <el-option
              v-for="dict in prodEquipmentTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="部门" prop="deptId">
          <el-select v-model="form.deptId" placeholder="请选择部门">
            <el-option
              v-for="op in deptIdTableOptions"
              :key="op.deptId"
              :label="op.deptName"
              :value="op.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="areaId">
          <el-select v-model="form.areaId" placeholder="请选择区域">
            <el-option
              v-for="op in areaIdTableOptions"
              :key="op.id"
              :label="op.areaName"
              :value="op.id"
            />
          </el-select>
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
        <el-form-item label="线体" prop="produceLineId">
          <el-select v-model="form.produceLineId" placeholder="请选择线体">
            <el-option
              v-for="op in produceLineIdTableOptions"
              :key="op.id"
              :label="op.prodLineName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工序" prop="prodProcedureId">
          <el-select v-model="form.prodProcedureId" placeholder="请选择工序">
            <el-option
              v-for="op in prodProcedureIdTableOptions"
              :key="op.id"
              :label="op.procedureName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备编码" prop="equipmentCode">
          <el-input v-model="form.equipmentCode" placeholder="请输入设备编码" />
        </el-form-item>
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="form.equipmentName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="规格型号" prop="equipmentSpec">
          <el-input v-model="form.equipmentSpec" placeholder="请输入规格型号" />
        </el-form-item>
        <el-form-item label="设备图片">
          <imageUpload v-model="form.picUrl" />
        </el-form-item>
        <el-form-item label="数量" prop="equipmentNum">
          <el-input v-model="form.equipmentNum" placeholder="请输入数量" />
        </el-form-item>
        <el-form-item label="功耗" prop="equipmentPower">
          <el-input v-model="form.equipmentPower" placeholder="请输入功耗" />
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
import { listEquipment, getEquipment, delEquipment, addEquipment, updateEquipment, exportEquipment, loaddeptList } from '@/api/product/equipment'
// import { listDeptNoPage } from "@/api/system/dept";
import { listFactoryareaNoPage } from '@/api/phygrid/factoryarea'
import { listWorkshopNoPage } from '@/api/phygrid/workshop'
import { listLineNoPage } from '@/api/product/line'
import { listProcedureNoPage } from '@/api/product/procedure'
import ImageUpload from '@/components/ImageUpload'

export default {
  name: 'Equipment',
  components: {
    ImageUpload
  },
  data() {
    return {
      deptIdTableOptions: [],
      areaIdTableOptions: [],
      workshopIdTableOptions: [],
      produceLineIdTableOptions: [],
      prodProcedureIdTableOptions: [],
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
      prodEquipmentType: null,
      // 生产设备类型
      prodEquipmentTypeOptions: [],
      // 总条数
      total: 0,
      // 生产设备表格数据
      equipmentList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        deptId: null,
        workshopId: null,
        produceLineId: null,
        prodProcedureId: null,
        equipmentCode: null,
        equipmentName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        equipmentName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ]/*,
        equipmentSpec: [
          { required: true, message: "规格型号不能为空", trigger: "blur" }
        ],
        delFlag: [
          { required: true, message: "是否删除(0 未删除 1 已删除)不能为空", trigger: "blur" }
        ]*/
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getDicts('prod_equipment_type').then(response => {
      this.prodEquipmentTypeOptions = response.data
    })
  },
  methods: {
    initDtableOptions() {
      loaddeptList({}).then(response => {
        this.deptIdTableOptions = response.data
      })
      listFactoryareaNoPage({}).then(response => {
        this.areaIdTableOptions = response.data
      })
      listWorkshopNoPage({}).then(response => {
        this.workshopIdTableOptions = response.data
      })
      listLineNoPage({}).then(response => {
        this.produceLineIdTableOptions = response.data
      })
      listProcedureNoPage({}).then(response => {
        this.prodProcedureIdTableOptions = response.data
      })
    },
    /** 查询生产设备列表 */
    getList() {
      this.loading = true
      listEquipment(this.queryParams).then(response => {
        this.equipmentList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 设备类别翻译
    equipmentTypeFormat(row, column) {
      return this.selectDictLabel(this.prodEquipmentTypeOptions, row.prodEquipmentType)
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
        factoryId: null,
        deptId: null,
        areaId: null,
        workshopId: null,
        produceLineId: null,
        prodProcedureId: null,
        equipmentCode: null,
        equipmentName: null,
        equipmentSpec: null,
        equipmentNum: null,
        equipmentPower: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null,
        picUrl: null
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
      this.title = '添加生产设备'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getEquipment(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改生产设备'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateEquipment(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addEquipment(this.form).then(response => {
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
      this.$confirm('是否确认删除生产设备编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delEquipment(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有生产设备数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportEquipment(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

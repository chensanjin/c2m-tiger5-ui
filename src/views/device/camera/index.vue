<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="摄像头" prop="cameraName">
        <el-input
          v-model="queryParams.cameraName"
          placeholder="请输入摄像头"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备类型" prop="cameraType">
        <el-select v-model="queryParams.cameraType" placeholder="请选择设备类型" clearable size="small">
          <el-option
            v-for="dict in cameraTypeOptions"
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
          v-hasPermi="['device:camera:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:camera:edit']"
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
          v-hasPermi="['device:camera:remove']"
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
          v-hasPermi="['device:camera:export']"
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

    <el-table v-loading="loading" :data="cameraList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" align="center" prop="id" />
      <el-table-column label="摄像头" align="center" prop="cameraName" />
      <el-table-column label="设备类型" align="center" prop="cameraType" :formatter="cameraTypeFormat" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['device:camera:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['device:camera:remove']"
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

    <!-- 添加或修改监控设备对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="监控编码" prop="cameraIndexcode">
          <el-input v-model="form.cameraIndexcode" placeholder="请输入摄像头编码" />
        </el-form-item>
        <el-form-item label="监控名称" prop="cameraName">
          <el-input v-model="form.cameraName" placeholder="请输入摄像头名称" />
        </el-form-item>
        <el-form-item label="设备类型" prop="cameraType">
          <el-select v-model="form.cameraType" placeholder="请选择设备类型">
            <el-option
              v-for="dict in cameraTypeOptions"
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
          <el-select v-model="form.workshopId" placeholder="请选择所属车间">
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
        <el-form-item label="ip" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入ip地址" />
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="form.port" placeholder="请输入端口" />
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="通道名称" prop="channel">
          <el-input v-model="form.channel" placeholder="请输入通道名称" />
        </el-form-item>
        <el-form-item label="码流类型" prop="subtype">
          <el-input v-model="form.subtype" placeholder="请输入码流类型" />
        </el-form-item>
        <el-form-item label="编码解码" prop="codec">
          <el-input v-model="form.codec" placeholder="请输入编码解码方式" />
        </el-form-item>
        <el-form-item label="回放视频" prop="replayUrl">
          <el-input v-model="form.replayUrl" placeholder="请输入回放视频链接" />
        </el-form-item>
        <el-form-item label="视频流" prop="protocolUrl">
          <el-input v-model="form.protocolUrl" placeholder="请输入取流协议获取播放流" />
        </el-form-item>
        <el-form-item label="位置" prop="address">
          <el-input v-model="form.address" placeholder="请输入位置" />
        </el-form-item>
        <el-form-item label="作用" prop="work">
          <el-input v-model="form.work" placeholder="请输入作用" />
        </el-form-item>
        <el-form-item label="最佳配置" prop="bestConf">
          <el-input v-model="form.bestConf" placeholder="请输入最佳配置" />
        </el-form-item>
        <el-form-item label="管控要求" prop="controlRequire">
          <el-input v-model="form.controlRequire" placeholder="请输入管控要求" />
        </el-form-item>
        <el-form-item label="三维定位" prop="position3d">
          <el-input v-model="form.position3d" placeholder="请输入三维定位" />
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
import { listCamera, getCamera, delCamera, addCamera, updateCamera, exportCamera } from '@/api/device/camera'
import { loaddeptList } from '@/api/product/equipment'
// import { listDeptNoPage } from "@/api/system/dept";
import { listFactoryareaNoPage } from '@/api/phygrid/factoryarea'
import { listLineNoPage } from '@/api/product/line'
import { listProcedureNoPage } from '@/api/product/procedure'
import { listWorkshopNoPage } from '@/api/phygrid/workshop'

export default {
  name: 'Camera',
  components: {
  },
  data() {
    return {
      deptIdTableOptions: [],
      areaIdTableOptions: [],
      produceLineIdTableOptions: [],
      prodProcedureIdTableOptions: [],
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
      // 监控设备表格数据
      cameraList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 设备类型字典
      cameraTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        cameraName: null,
        cameraType: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        cameraName: [
          { required: true, message: '摄像头不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getDicts('bus_camera_type').then(response => {
      this.cameraTypeOptions = response.data
    })
  },
  methods: {
    initDtableOptions() {
      // listDeptNoPage({}).then(response => {
      //     this.deptIdTableOptions = response.data;
      // });
      loaddeptList({}).then(response => {
        this.deptIdTableOptions = response.data
      })
      listFactoryareaNoPage({}).then(response => {
        this.areaIdTableOptions = response.data
      })
      listLineNoPage({}).then(response => {
        this.produceLineIdTableOptions = response.data
      })
      listProcedureNoPage({}).then(response => {
        this.prodProcedureIdTableOptions = response.data
      })
      listWorkshopNoPage({}).then(response => {
        this.workshopIdTableOptions = response.data
      })
    },
    /** 查询监控设备列表 */
    getList() {
      this.loading = true
      listCamera(this.queryParams).then(response => {
        this.cameraList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 设备类型字典翻译
    cameraTypeFormat(row, column) {
      return this.selectDictLabel(this.cameraTypeOptions, row.cameraType)
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
        cameraIndexcode: null,
        deptId: null,
        cameraName: null,
        areaId: null,
        cameraType: null,
        ip: null,
        produceLineId: null,
        port: null,
        prodProcedureId: null,
        username: null,
        password: null,
        channel: null,
        subtype: null,
        codec: null,
        replayUrl: null,
        protocolUrl: null,
        workshopId: null,
        address: null,
        work: null,
        bestConf: null,
        controlRequire: null,
        position3d: null,
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
      this.title = '添加监控设备'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCamera(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改监控设备'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCamera(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addCamera(this.form).then(response => {
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
      this.$confirm('是否确认删除监控设备编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCamera(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有监控设备数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportCamera(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

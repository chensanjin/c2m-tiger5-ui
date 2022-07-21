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
      <el-form-item label="所属车间" prop="workshopId">
        <el-select v-model="queryParams.workshopId" placeholder="请选择所属车间" clearable size="small">
          <el-option
            v-for="op in workshopIdTableOptions"
            :key="op.id"
            :label="op.workshopName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备编码" prop="senseCode">
        <el-input
          v-model="queryParams.senseCode"
          placeholder="请输入设备编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备名称" prop="senseName">
        <el-input
          v-model="queryParams.senseName"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备类型" prop="senseType">
        <el-select v-model="queryParams.senseType" placeholder="请选择设备类型" clearable size="small">
          <el-option
            v-for="dict in senseTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类别" prop="senseCategory">
        <el-select v-model="queryParams.senseCategory" placeholder="请选择设备类别" clearable size="small">
          <el-option
            v-for="dict in senseCategoryOptions"
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
          v-hasPermi="['device:sense:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:sense:edit']"
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
          v-hasPermi="['device:sense:remove']"
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
          v-hasPermi="['device:sense:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:sense:remove']"
          type="danger"
          plain
          icon="el-icon-refresh"
          size="mini"
          @click="handleRefreshSenseCache"
        >刷新缓存</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="senseList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="ID" align="center" prop="id" width="55" />
      <el-table-column label="所属区域" align="center" prop="areaIdText" />
      <el-table-column label="所属车间" align="center" prop="workshopIdText" />
      <el-table-column label="设备编码" align="center" prop="senseCode" />
      <el-table-column label="设备名称" align="center" prop="senseName" />
      <!--      <el-table-column label="设备IP" align="center" prop="ip" />-->
      <el-table-column label="设备类型" align="center" prop="senseType" :formatter="senseTypeFormat" />
      <el-table-column label="设备类别" align="center" prop="senseCategory" :formatter="senseCategoryFormat" />
      <el-table-column label="二维码" align="center" width="70">
        <template v-if="scope.row.senseCategory === '2'" slot-scope="scope">
          <el-tooltip content="预览二维码" placement="top-start">
            <span @click="handleQRCode(scope)">
              <!--            <span @click="downloadImg(scope.row.id,scope.row.senseCode)">-->
              <vue-qr
                :ref="'Qrcode' + scope.row.id"
                :text="JSON.stringify({senseCode:scope.row.senseCode,senseType:scope.row.senseType,equipmentName:scope.row.workshopIdText})"
                :margin="10"
                :size="500"
                :dot-scale="qrCodeConfig.dotScale"
                :color-dark="qrCodeConfig.colorDark"
                :width="30"
              />
            </span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleForm(scope.row)"
          >填报</el-button>-->
          <el-button
            v-if="scope.row.senseCategory === '2'"
            size="mini"
            type="text"
            icon="el-icon-s-data"
            @click="handleHistory(scope.row)"
          >历史</el-button>
          <el-button
            v-hasPermi="['device:sense:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['device:sense:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
          <el-button
            v-hasPermi="['device:electric:chart']"
            size="mini"
            type="text"
            icon="el-icon-share"
            @click="handleChart(scope.row)"
          >报表</el-button>
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

    <el-dialog :title="qrTitle" :visible.sync="openQRCode" width="28%" append-to-body>
      <div ref="imageWrapper">
        <!--<div class="img">
          <img class="img-icon">
          <p style="font-weight: 700; font-size: 18px;margin-left: 15px ">设备二维码</p>
        </div>-->
        <div>
          <el-row>
            <el-col :span="12">
              <el-tooltip content="点击下载二维码" placement="top-start">
                <span @click="downloadImg()">
                  <vue-qr
                    :ref="'Qrcode' + this.id"
                    :text="JSON.stringify({senseCode:this.senseCode,senseType:this.senseType,equipmentName:this.equipmentName})"
                    :margin="20"
                    :size="500"
                    :dot-scale="qrCodeConfig.dotScale"
                    :color-dark="qrCodeConfig.colorDark"
                    :width="240"
                  />
                </span>
              </el-tooltip>
            </el-col>

            <el-col :span="12">
              <el-row>
                <el-col :span="24" class="col-left-suc" style="margin-left: 15px; font-size: 15px;margin-top: 10px">设备名称:</el-col>
                <el-col :span="24" class="col-right" style="font-weight: 600; font-size: 18px;margin-left: 15px;margin-top: 10px">{{ this.senseName }}</el-col>

                <el-col :span="24" class="col-left-suc" style="margin-left: 15px;margin-top: 10px; font-size: 15px">设备编码:</el-col>
                <el-col :span="24" class="col-right" style="font-weight: 900; font-size: 18px;margin-left: 15px;margin-top: 10px">{{ this.senseCode }}</el-col>

                <el-col :span="24" class="col-left-suc" style="margin-left: 15px;margin-top: 10px; font-size: 15px">设备类型:</el-col>
                <el-col :span="24" class="col-right" style="font-weight: 900; font-size: 18px;margin-left: 15px;margin-top: 10px">{{ this.senseCodeName }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--<el-row style="margin-top: 10px;">
            <el-col :span="15" class="col-left-suc" style="margin-left: 15px">设备名称:</el-col>
            <el-col :span="16" class="col-right" style="font-weight: 600; font-size: 18px;margin-left: 15px;margin-top: 10px">{{this.senseName}}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="15" class="col-left-suc" style="margin-left: 15px">设备编码:</el-col>
            <el-col :span="16" class="col-right" style="font-weight: 600; font-size: 18px;margin-left: 15px;margin-top: 10px">{{this.senseCode}}
            </el-col>
          </el-row>-->
        </div>
      </div>
      <div class="button">
        <el-button style="width: 100%;margin-top: 10px" type="success" align="center" size="small" @click="toImage">下载截图</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="subTitle" :visible.sync="openSubForm" width="500px" append-to-body>
      <el-form ref="subForm" label-width="150px" :model="subForm">
        <el-form-item v-if="subFormParam.senseType !== 'Thermometer'" label="输入数值">
          <el-input v-model="subForm.Degrees" placeholder="请输入值" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="氧气含量">
          <el-input v-model="subForm.Oxygen" placeholder="请输入氧气含量" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="静压差(Pa)">
          <el-input v-model="subForm.Pa" placeholder="请输入静压差" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="换气次数(次/h)">
          <el-input v-model="subForm.Breathe" placeholder="请输入换气次数" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="尘埃粒子(≥0.5um)">
          <el-input v-model="subForm.Dust" placeholder="请输入尘埃粒子" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="尘埃粒子(≥5um)">
          <el-input v-model="subForm.DustFive" placeholder="请输入尘埃粒子" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="沉降菌(cfu/皿·30min)">
          <el-input v-model="subForm.Cfu" placeholder="请输入沉降菌" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'AirCleanliness'" label="浮游菌(cfu/m³)">
          <el-input v-model="subForm.Ffu" placeholder="请输入浮游菌" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'Thermometer'" label="输入湿度">
          <el-input v-model="subForm.HU" placeholder="请输入湿度" />
        </el-form-item>
        <el-form-item v-if="subFormParam.senseType === 'Thermometer'" label="输入温度">
          <el-input v-model="subForm.TP" placeholder="请输入温度" />
        </el-form-item>
        <el-form-item label="选择日期">
          <el-date-picker
            v-model="subFormTime"
            type="date"
            placeholder="请选择日期"
            format="yyyy-MM-dd"
            value-format="timestamp"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subSubmitForm">确 定</el-button>
        <el-button @click="subCancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改传感设备管理对话框 -->
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
        <el-form-item label="所属车间" prop="workshopId">
          <el-select v-model="form.workshopId" placeholder="请选择所属车间">
            <el-option
              v-for="op in workshopIdTableOptions"
              :key="op.id"
              :label="op.workshopName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备编码" prop="senseCode">
          <el-input v-model="form.senseCode" placeholder="请输入设备编码" />
        </el-form-item>
        <el-form-item label="设备名称" prop="senseName">
          <el-input v-model="form.senseName" placeholder="请输入设备名称" />
        </el-form-item>
        <el-form-item label="设备类型" prop="senseType">
          <el-select v-model="form.senseType" placeholder="请选择设备类型">
            <el-option
              v-for="dict in senseTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类别" prop="senseCategory">
          <el-select v-model="form.senseCategory" placeholder="请选择设备类别">
            <el-option
              v-for="dict in senseCategoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="ip" prop="ip">
                  <el-input v-model="form.ip" placeholder="请输入ip地址" />
                </el-form-item>
                <el-form-item label="modbus" prop="modbus">
                  <el-input v-model="form.modbus" placeholder="请输入modbus" />
                </el-form-item>-->
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
import { listSense, getSense, delSense, addSense, updateSense, exportSense, getSN, handleRefreshSenseCache } from '@/api/device/sense'
import { datacoller } from '@/api/device/electric'
import { listFactoryareaNoPage } from '@/api/phygrid/factoryarea'
import { listWorkshopNoPage } from '@/api/phygrid/workshop'
import vueQr from 'vue-qr'
import html2canvas from 'html2canvas'

export default {
  name: 'Sense',
  components: {
    vueQr
  },
  data() {
    return {
      qrCodeConfig: '',
      areaIdTableOptions: [],
      workshopIdTableOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      id: '',
      senseCode: '',
      senseType: '',
      senseName: '',
      senseCodeName: '',
      equipmentName: '',
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 传感设备管理表格数据
      senseList: [],
      // 弹出层标题
      title: '',
      subTitle: '',
      qrTitle: '',
      // 是否显示弹出层
      open: false,
      // 设备类型字典
      senseTypeOptions: [],
      // 设备类别字典
      senseCategoryOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        areaId: null,
        workshopId: null,
        senseName: null,
        senseType: null,
        senseCategory: null
      },
      // 表单参数
      form: {},
      subForm: {},
      subFormTime: null,
      openSubForm: false,
      openQRCode: false,
      subFormParam: { senseType: '1' },
      // 表单校验
      rules: {
        senseName: [
          { required: true, message: '设备名称不能为空', trigger: 'blur' }
        ],
        delFlag: [
          { required: true, message: '是否删除(0 未删除 1 已删除)不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getDicts('bus_equip_type').then(response => {
      this.senseTypeOptions = response.data
    })
    this.getDicts('device_category').then(response => {
      this.senseCategoryOptions = response.data
    })
  },
  methods: {
    handleChart(row) {
      this.$router.push({ path: '/device/sense/' + row.id, query: { senseCode: row.senseCode, senseName: row.senseName }})
      console.log(row.id)
    },
    handleHistory(row) {
      console.info(row.senseCode)
      if (row.senseType === 'Thermometer') {
        // this.$router.push({path:'/device/sense/'+row.id,query: {senseCode:row.senseCode,senseName:row.senseName} })
        this.$router.push({ path: '/device/threport/' + row.id, query: { senseCode: row.senseCode, senseName: row.senseName }})
      }
      if (row.senseType === 'AirCleanliness') {
        this.$router.push({ path: '/device/airreport/' + row.id, query: { senseCode: row.senseCode, senseName: row.senseName }})
      }
      if (row.senseType === 'O3') {
        this.$router.push({ path: '/device/o3report/' + row.id, query: { senseCode: row.senseCode, senseName: row.senseName }})
      }
    },
    downloadImg() {
      console.log('id', this.id)
      const iconUrl = this.$refs['Qrcode' + this.id].$el.src
      console.log('senseCode', this.senseCode)
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = this.senseCode
      a.href = iconUrl
      a.dispatchEvent(event)
    },
    toImage() {
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        const dataURL = canvas.toDataURL('image/png')
        if (dataURL !== '') {
          /** 下载图片*/
          const alink = document.createElement('a')
          alink.href = dataURL
          alink.download = this.senseCode
          alink.click()
        }
      })
    },

    initDtableOptions() {
      listFactoryareaNoPage({}).then(response => {
        this.areaIdTableOptions = response.data
      })
      listWorkshopNoPage({}).then(response => {
        this.workshopIdTableOptions = response.data
      })
    },
    /** 查询传感设备管理列表 */
    getList() {
      this.loading = true
      listSense(this.queryParams).then(response => {
        this.senseList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 设备类型字典翻译
    senseTypeFormat(row, column) {
      return this.selectDictLabel(this.senseTypeOptions, row.senseType)
    },
    // 设备类别字典翻译
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
        areaId: null,
        workshopId: null,
        senseCode: null,
        senseName: null,
        senseType: null,
        senseCategory: null,
        createBy: null,
        ip: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        position3d: null
      }
      this.resetForm('form')

      this.subForm = {
        SN: null,
        Type: null,
        Timestamp: null,
        Degrees: null,
        Oxygen: null,
        HU: null,
        TP: null,
        Breathe: null,
        Pa: null,
        Dust: null,
        DustFive: null,
        Cfu: null,
        Ffu: null
      }
      this.resetForm('subForm')
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
      this.title = '添加传感设备管理'
      // getSN().then(response => {
      //   this.form.senseCode = response.data;
      // });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getSense(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改传感设备管理'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSense(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addSense(this.form).then(response => {
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
      this.$confirm('是否确认删除传感设备管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delSense(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有传感设备管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportSense(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    },
    handleForm(row) {
      this.subFormParam = row
      this.openSubForm = true
    },
    handleQRCode(row) {
      this.id = row.row.id
      this.senseCode = row.row.senseCode
      this.senseType = row.row.senseType
      this.senseName = row.row.senseName
      this.senseCodeName = this.selectDictLabel(this.senseTypeOptions, row.row.senseType)

      if (row.row.senseName === null) {
        this.equipmentName = ''
      } else {
        this.equipmentName = encodeURIComponent(row.row.senseName)
      }

      console.log(row)
      this.openQRCode = true
    },
    subSubmitForm() {
      this.openSubForm = false
      this.subForm.SN = this.subFormParam.senseCode
      this.subForm.Type = this.subFormParam.senseType
      this.subForm.Timestamp = this.subFormTime / 1000
      datacoller(this.subForm).then(response => {
        if (response.Code === 0) {
          this.$message({
            message: '填报成功',
            type: 'success'
          })
        }
      })
      this.subFormTime = null
      this.subForm = {}
    },
    subCancel() {
      this.openSubForm = false
      this.subFormTime = null
      this.subForm = {}
    },
    /** 刷新缓存按钮操作 */
    handleRefreshSenseCache() {
      handleRefreshSenseCache().then(() => {
        this.msgSuccess('刷新传感设备成功')
      })
    }
  }
}
</script>

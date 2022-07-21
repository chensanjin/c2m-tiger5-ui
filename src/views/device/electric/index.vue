<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="所属工艺" prop="tecCatId">
        <el-select v-model="queryParams.tecCatId" placeholder="请选择所属工艺" clearable size="small">
          <el-option
            v-for="op in tecCatIdTableOptions"
            :key="op.id"
            :label="op.technologyName"
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
      <el-form-item label="所属线体" prop="prodLineId">
        <el-select v-model="queryParams.prodLineId" placeholder="请选择所属线体" clearable size="small">
          <el-option
            v-for="op in prodLineIdTableOptions"
            :key="op.id"
            :label="op.prodLineName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称" prop="electricName">
        <el-input
          v-model="queryParams.electricName"
          placeholder="请输入设备名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备编码" prop="electricCode">
        <el-input
          v-model="queryParams.electricCode"
          placeholder="请输入设备编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="设备用途" prop="energyPurpose">
        <el-select v-model="queryParams.energyPurpose" placeholder="请选择设备用途" clearable size="small">
          <el-option
            v-for="dict in energyPurposeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类别" prop="energyType">
        <el-select v-model="queryParams.energyType" placeholder="请选择设备类别" clearable size="small">
          <el-option
            v-for="dict in energyTypeOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="数采方式" prop="isIntelligence">
        <el-select v-model="queryParams.isIntelligence" placeholder="请选择数采方式" clearable size="small">
          <el-option
            v-for="dict in isIntelligenceOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="表计类型" prop="meterType">
        <el-select v-model="queryParams.meterType" placeholder="请选择表计类型" clearable size="small">
          <el-option
            v-for="dict in meterTypeOptions"
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
          v-hasPermi="['device:electric:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:electric:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:electric:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:electric:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          :loading="exportLoading"
          @click="handleExport"
        >导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['device:sense:remove']"
          type="danger"
          plain
          icon="el-icon-refresh"
          size="mini"
          @click="handleRedis"
        >刷新缓存
        </el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="electricList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
      <el-table-column label="所属工艺" align="center" prop="tecCatIdText" />
      <el-table-column label="所属车间" align="center" prop="workshopIdText" />
      <el-table-column label="所属线体" align="center" prop="prodLineIdText" />
      <el-table-column label="所属生产设备" align="center" prop="prodDeviceIdText" width="150" />
      <el-table-column label="设备编码" align="center" prop="electricCode" width="250" />
      <el-table-column label="设备名称" align="center" prop="electricName" />
      <el-table-column label="设备用途" align="center" prop="energyPurpose" :formatter="energyPurposeFormat" width="100" />
      <el-table-column label="设备类别" align="center" prop="energyType" :formatter="energyTypeFormat" width="100" />
      <el-table-column label="数采方式" align="center" prop="isIntelligence" :formatter="isIntelligenceFormat" width="100" />
      <el-table-column label="表计类型" align="center" prop="meterType" :formatter="meterTypeFormat" width="100" />
      <el-table-column label="二维码" align="center" width="70">
        <template v-if="scope.row.isIntelligence === '2'" slot-scope="scope">
          <el-tooltip content="预览二维码" placement="top-start">
            <span @click="handleQRCode(scope)">
              <!--            <span @click="downloadImg(scope.row.id,scope.row.senseCode)">-->
              <vue-qr
                :ref="'Qrcode' + scope.row.id"
                :text="JSON.stringify({senseCode:scope.row.electricCode,senseType:scope.row.energyType,equipmentName:scope.row.workshopIdText})"
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
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="250">
        <template slot-scope="scope">
          <!--          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            v-if="scope.row.isIntelligence === '2'"
            @click="handleForm(scope.row)"

          >填报</el-button>-->
          <el-button
            v-hasPermi="['device:electric:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改
          </el-button>
          <el-button
            v-hasPermi="['device:electric:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
          <el-button
            v-hasPermi="['device:electric:chart']"
            size="mini"
            type="text"
            icon="el-icon-share"
            @click="handleChart(scope.row)"
          >报表
          </el-button>
          <el-button
            v-if="scope.row.isIntelligence === '2'"
            v-hasPermi="['device:electric:chart']"
            size="mini"
            type="text"
            icon="el-icon-warning-outline"
            @click="updateRecord(scope.row)"
          >补录
          </el-button>
          <!--<router-link :to="{path:'/device/electric/chart'}"  class="link-type" icon="el-icon-share">
            <span>详情</span>

          </router-link>-->
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
                    :text="JSON.stringify({senseCode:this.electricCode,senseType:this.energyType,equipmentName:this.equipmentName})"
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
                <el-col :span="24" class="col-right" style="font-weight: 900; font-size: 18px;margin-left: 15px;margin-top: 10px">{{ this.electricName }}
                </el-col>
                <el-col :span="24" class="col-left-suc" style="margin-left: 15px;margin-top: 10px; font-size: 15px">设备编码:</el-col>

                <el-col :span="24" class="col-right" style="font-weight: 900; font-size: 18px;margin-left: 15px;margin-top: 10px">{{ this.electricCode }}
                </el-col>
                <el-col :span="24" class="col-left-suc" style="margin-left: 15px;margin-top: 10px; font-size: 15px">设备类型:</el-col>
                <el-col :span="24" class="col-right" style="font-weight: 900; font-size: 18px;margin-left: 15px;margin-top: 10px">{{ this.energyName }}
                </el-col>
              </el-row>
            </el-col>

          </el-row>
          <!--<el-row style="margin-top: 10px;float: right" >
            <el-col :span="15" class="col-left-suc" style="margin-left: 15px">设备编码:</el-col>
            <el-col :span="16" class="col-right" style="font-weight: 600; font-size: 18px;margin-left: 15px;margin-top: 10px">{{this.electricCode}}
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;float: right" >
            <el-col :span="15" class="col-left-suc" style="margin-left: 15px">设备类型:</el-col>
            <el-col :span="16" class="col-right" style="font-weight: 600; font-size: 18px;margin-left: 15px;margin-top: 10px">{{this.energyType}}
            </el-col>
          </el-row>-->
        </div>
      </div>
      <div class="button">
        <el-button style="width: 100%;margin-top: 10px" type="success" align="center" size="small" @click="toImage">下载截图</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="subTitle" :visible.sync="openSubForm" width="500px" append-to-body>
      <el-form ref="subForm" label-width="80px" :model="subForm">
        <el-form-item label="差量">
          <el-input v-model="subForm.difference" placeholder="请输入值差量" />
        </el-form-item>
        <el-form-item label="费用">
          <el-input v-model="subForm.Degrees" placeholder="请输入值费用" />
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
    <!-- 添加或修改能耗设备管理对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="所属工艺" prop="tecCatId">
          <el-select v-model="form.tecCatId" placeholder="请选择所属工艺">
            <el-option
              v-for="op in tecCatIdTableOptions"
              :key="op.id"
              :label="op.technologyName"
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
        <el-form-item label="所属线体" prop="prodLineId">
          <el-select v-model="form.prodLineId" placeholder="请选择所属线体">
            <el-option
              v-for="op in prodLineIdTableOptions"
              :key="op.id"
              :label="op.prodLineName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="所属生产设备" prop="prodDeviceId">
          <el-select v-model="form.prodDeviceId" placeholder="请所属生产设备">
            <el-option
              v-for="op in prodDeviceIdTableOptions"
              :key="op.id"
              :label="op.equipmentName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备编码" prop="electricCode">
          <el-input v-model="form.electricCode" placeholder="请输入设备编码" />
        </el-form-item>
        <el-form-item label="设备名称" prop="electricName">
          <el-input v-model="form.electricName" placeholder="请输入设备名称" />
        </el-form-item>
        <!--        <el-form-item label="设备IP" prop="electricIp">
          <el-input v-model="form.electricIp" placeholder="请输入设备IP" />
        </el-form-item>
        <el-form-item label="modbus" prop="modbus">
          <el-input v-model="form.modbus" placeholder="请输入设备modbus" />
        </el-form-item>-->
        <el-form-item label="设备类别" prop="energyType">
          <el-select v-model="form.energyType" placeholder="请选择设备类别">
            <el-option
              v-for="dict in energyTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="form.energyType=='ElectricityMeter'" label="设备用途" prop="energyPurpose">
          <el-select v-model="form.energyPurpose" placeholder="请选择设备用途">
            <el-option
              v-for="dict in energyPurposeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="三维定位" prop="position3d">
          <el-input v-model="form.position3d" placeholder="请输入三维定位" />
        </el-form-item>
        <el-form-item label="是否公共" prop="isShare">
          <el-select v-model="form.isShare" placeholder="请选择是否公共">
            <el-option
              v-for="dict in isShareOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <!--<el-form-item label="手自动类型" prop="isIntelligence">
          <template>
            <el-radio v-model="form.isIntelligence" label="0">自动</el-radio>
            <el-radio v-model="form.isIntelligence" label="1">手动</el-radio>
          </template>
        </el-form-item>-->

        <el-form-item label="数采方式" prop="isIntelligence">
          <el-select v-model="form.isIntelligence" placeholder="请选择数采方式">
            <el-option
              v-for="dict in isIntelligenceOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="表计类型" prop="meterType">
          <el-select v-model="form.meterType" placeholder="请选择表计类型">
            <el-option
              v-for="dict in meterTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-divider content-position="center">设备-部门关系管理信息</el-divider>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddElectricDept">添加</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteElectricDept">删除</el-button>
          </el-col>
        </el-row>
        <el-table
          ref="electricDept"
          :data="electricDeptList"
          :row-class-name="rowElectricDeptIndex"
          @selection-change="handleElectricDeptSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column label="序号" align="center" prop="index" width="50" />
          <el-table-column label="部门名称" prop="deptId">
            <template slot-scope="scope">
              <el-autocomplete
                v-model="scope.row.deptName"
                popper-class="my-autocomplete"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="((item)=>{handleSelect(item, scope)})"
              >
                <i
                  slot="suffix"
                  class="el-icon-edit el-input__icon"
                  @click="((val)=>{handleIconClick(val, scope)})"
                />
                <template slot-scope="{ item }">
                  <div class="name">{{ item.deptName }}</div>
                </template>
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column label="占比" prop="percent">
            <template slot-scope="scope">
              <el-input v-model="scope.row.percent" placeholder="请输入占比" />
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listElectric,
  getElectric,
  delElectric,
  addElectric,
  updateElectric,
  exportElectric,
  loaddeptList,
  datacoller,
  getSN,
  handleRedis
} from '@/api/device/electric'
import { listTechnologyNoPage } from '@/api/product/technology'
import { listWorkshopNoPage } from '@/api/phygrid/workshop'
import { listLineNoPage } from '@/api/product/line'
import { listEquipmentNoPage } from '@/api/product/equipment'
import vueQr from 'vue-qr'
import html2canvas from 'html2canvas'

export default {
  name: 'Electric',
  components: {
    vueQr
  },
  data() {
    return {
      qrCodeConfig: '',
      id: '',
      electricCode: '',
      electricName: '',
      energyType: '',
      energyName: '',
      equipmentName: '',
      workshopIdText: '',
      openQRCode: false,
      tecCatIdTableOptions: [],
      workshopIdTableOptions: [],
      prodLineIdTableOptions: [],
      prodDeviceIdTableOptions: [],
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      // 子表选中数据
      checkedElectricDept: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 能耗设备管理表格数据
      electricList: [],
      // 设备-部门关系管理表格数据
      electricDeptList: [],
      // 弹出层标题
      title: '',
      subTitle: '',
      qrTitle: '',
      // 是否显示弹出层
      open: false,
      openSubForm: false,
      // 能耗设备用途字典
      energyPurposeOptions: [],
      // 是否公共字典
      isShareOptions: [],
      // 设备类别
      energyTypeOptions: [],

      // 是否智能设备
      isIntelligenceOptions: [],

      // 表计类型
      meterTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10
        /* tecCatId: null,
        workshopId: null,
        prodLineId: null,
        electricName: null,
        energyPurpose: null,
        isShare: null,
        energyType:null*/
      },
      // 表单参数
      form: {},
      subForm: {},
      subFormTime: null,
      // 表单校验
      rules: {
        electricName: [
          { required: true, message: '能耗设备名称不能为空', trigger: 'blur' }
        ]
      },
      deptList: []
    }
  },
  created() {
    this.loaddeptList()
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getDicts('device_purpose').then(response => {
      this.energyPurposeOptions = response.data
    })
    this.getDicts('devide_share').then(response => {
      this.isShareOptions = response.data
    })
    this.getDicts('energy_device_category').then(response => {
      this.energyTypeOptions = response.data
    })
    this.getDicts('device_category').then(response => {
      this.isIntelligenceOptions = response.data
    })
    this.getDicts('meter_type').then(response => {
      this.meterTypeOptions = response.data
    })
  },
  methods: {
    downloadImg() {
      console.log('id', this.id)
      const iconUrl = this.$refs['Qrcode' + this.id].$el.src
      console.log('electricCode', this.electricCode)
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = this.electricCode
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
          alink.download = this.electricCode
          alink.click()
        }
      })
    },

    handleQRCode(row) {
      this.id = row.row.id
      this.electricCode = row.row.electricCode
      this.energyType = row.row.energyType
      this.electricName = row.row.electricName
      this.energyName = this.selectDictLabel(this.energyTypeOptions, this.energyType)
      console.log(2, this.selectDictLabel(this.energyTypeOptions, this.energyType))
      if (row.row.electricName === null) {
        this.equipmentName = ''
      } else {
        this.equipmentName = encodeURIComponent(row.row.electricName)
      }
      this.openQRCode = true
    },
    handleChart(row) {
      this.$router.push({
        path: '/device/electric/' + row.id,
        query: {
          electricCode: row.electricCode,
          energyType: row.energyType,
          isIntelligence: row.isIntelligence
        }
      })
      console.log(row.isIntelligence)
    },
    updateRecord(row) {
      this.$router.push({
        path: '/device/updateEnergyRecord/' + row.id,
        query: {
          energyCode: row.electricCode,
          energyType: row.energyType,
          isIntelligence: row.isIntelligence
        }
      })
      console.log(row.isIntelligence)
    },
    handleSelect(item, scope) {
      scope.row.deptId = item.deptId
      scope.row.deptName = item.deptName
    },
    handleIconClick(item, scope) {
      console.info('handleIconClick', item)
    },
    initDtableOptions() {
      listTechnologyNoPage({}).then(response => {
        this.tecCatIdTableOptions = response.data
      })
      listWorkshopNoPage({}).then(response => {
        this.workshopIdTableOptions = response.data
      })
      listLineNoPage({}).then(response => {
        this.prodLineIdTableOptions = response.data
      })
      listEquipmentNoPage({}).then(response => {
        this.prodDeviceIdTableOptions = response.data
      })
    },
    /** 查询能耗设备管理列表 */
    getList() {
      this.loading = true
      listElectric(this.queryParams).then(response => {
        this.electricList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 能耗设备用途字典翻译
    energyPurposeFormat(row, column) {
      return this.selectDictLabel(this.energyPurposeOptions, row.energyPurpose)
    },
    // 是否公共字典翻译
    isShareFormat(row, column) {
      return this.selectDictLabel(this.isShareOptions, row.isShare)
    },
    // 设备类别翻译
    energyTypeFormat(row, column) {
      return this.selectDictLabel(this.energyTypeOptions, row.energyType)
    },

    isIntelligenceFormat(row, column) {
      return this.selectDictLabel(this.isIntelligenceOptions, row.isIntelligence)
    },

    meterTypeFormat(row, column) {
      return this.selectDictLabel(this.meterTypeOptions, row.meterType)
    },

    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },

    subSubmitForm() {
      this.openSubForm = false
      this.subForm.SN = this.subFormParam.electricCode // SN
      this.subForm.Type = this.subFormParam.energyType // 类别
      this.subForm.Timestamp = this.subFormTime / 1000
      this.subForm.readTime = this.subFormTime // 时间
      this.subForm.totalPrice = this.subForm.Degrees // 总价
      this.subForm.difference = this.subForm.difference // 差值

      this.subForm.tecCatId = this.subFormParam.tecCatId // 所属工艺
      this.subForm.workshopId = this.subFormParam.workshopId // 所属车间
      this.subForm.deptId = this.subFormParam.deptId
      this.subForm.prodLineId = this.subFormParam.prodLineId
      this.subForm.prodDeviceId = this.subFormParam.prodDeviceId
      this.subForm.energyPurpose = this.subFormParam.energyPurpose

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

    // 表单重置
    reset() {
      this.form = {
        id: null,
        tecCatId: null,
        workshopId: null,
        deptId: null,
        areaId: null,
        prodLineId: null,
        electricCode: null,
        electricIp: null,
        modbus: null,
        electricName: null,
        energyPurpose: null,
        energyType: null,
        price: null,
        isShare: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        position3d: null,
        prodDeviceId: null,
        isIntelligence: null,
        readTime: null,
        meterType: null
      }
      this.electricDeptList = []
      this.resetForm('form')
      this.subForm = {
        SN: null,
        Type: null,
        Timestamp: null,
        Degrees: null,
        difference: null,
        totalPrice: null,
        Oxygen: null,
        HU: null,
        TP: null,
        Breathe: null,
        Pa: null,
        Dust: null,
        Cfu: null,
        Ffu: null,
        tecCatId: null,
        workshopId: null,
        deptId: null,
        prodLineId: null,
        prodDeviceId: null,
        energyPurpose: null

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
      this.subTitle = '添加能耗设备管理'
      // getSN().then(response => {
      //   this.form.electricCode = response.data;
      // });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getElectric(id).then(response => {
        this.form = response.data
        this.electricDeptList = response.data.electricDeptList
        this.open = true
        this.title = '修改能耗设备管理'
      })
    },
    handleForm(row) {
      this.openSubForm = true
      this.subFormParam = row
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.electricDeptList = this.electricDeptList
          if (this.form.id != null) {
            updateElectric(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addElectric(this.form).then(response => {
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
      this.$confirm('是否确认删除能耗设备管理编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delElectric(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    handleRedis() {
      handleRedis().then(response => {
        this.msgSuccess('更新成功')
      })
    },
    /** 设备-部门关系管理序号 */
    rowElectricDeptIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 设备-部门关系管理添加按钮操作 */
    handleAddElectricDept() {
      const obj = {}
      obj.deptId = ''
      obj.percent = ''
      this.electricDeptList.push(obj)
    },
    /** 设备-部门关系管理删除按钮操作 */
    handleDeleteElectricDept() {
      if (this.checkedElectricDept.length == 0) {
        this.$alert('请先选择要删除的设备-部门关系管理数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.electricDeptList.splice(this.checkedElectricDept[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleElectricDeptSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.electricDept.clearSelection()
        this.$refs.electricDept.toggleRowSelection(selection.pop())
      } else {
        this.checkedElectricDept = selection
      }
    },
    /** 获取所有工艺 */
    querySearch(queryString, cb) {
      var deptList = this.deptList
      var results = queryString ? deptList.filter(this.createFilter(queryString)) : deptList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (technologyList) => {
        return (technologyList.deptName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },

    loaddeptList() {
      loaddeptList().then(response => {
        this.deptList = response.data
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有能耗设备管理数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportElectric(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

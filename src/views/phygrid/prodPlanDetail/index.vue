<template>
  <div class="app-container">
    <!--<el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>-->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['phygrid:prodPlanDetail:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <!--<el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['phygrid:prodPlanDetail:edit']"
        >修改</el-button>
      </el-col>-->
      <!--<el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['phygrid:prodPlanDetail:remove']"
        >删除</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['phygrid:prodPlanDetail:export']"
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

    <el-table v-loading="loading" :data="prodPlanDetailList" :span-method="objectSpanMethod" border @selection-change="handleSelectionChange">
      <!--      <el-table-column type="selection" width="55" align="center" />-->
      <!--      <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag"/>-->
      <el-table-column label="类别" align="center" prop="categoryIdText" />
      <el-table-column label="序号" type="index" min-width="5%" class-name="allowDrag" />
      <el-table-column label="订单类别" align="center" prop="orderType" :formatter="orderTypeFormat" />
      <el-table-column label="产品名称" align="center" prop="productIdText" />
      <el-table-column label="订单数量" align="center" prop="orderNumber" />
      <el-table-column label="已完成数量" align="center" prop="completedNumber" />
      <el-table-column label="单位" align="center" prop="meteringUnitIdText" />
      <el-table-column label="生产线" align="center" prop="lineIdText" />
      <el-table-column label="工序" align="center" prop="procedureIdText" />
      <!--      <el-table-column label="车间" align="center" prop="workshopIdText" />-->
      <el-table-column label="生产日期" align="center">
        <el-table-column :label="timeData[0]" align="center">
          <el-table-column label="周一" align="center" prop="mondayNumb" />
        </el-table-column>

        <el-table-column :label="timeData[1]" align="center">
          <el-table-column label="周二" align="center" prop="tuesdayNumb" />
        </el-table-column>

        <el-table-column :label="timeData[2]" align="center">
          <el-table-column label="周三" align="center" prop="wednesdayNumb" />
        </el-table-column>

        <el-table-column :label="timeData[3]" align="center">
          <el-table-column label="周四" align="center" prop="thursdayNumb" />
        </el-table-column>

        <el-table-column :label="timeData[4]" align="center">
          <el-table-column label="周五" align="center" prop="fridayNumb" />
        </el-table-column>

        <el-table-column :label="timeData[5]" align="center">
          <el-table-column label="周六" align="center" prop="saturdayNumb" />
        </el-table-column>

        <el-table-column :label="timeData[6]" align="center">
          <el-table-column label="周日" align="center" prop="sundayNumb" />
        </el-table-column>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['phygrid:prodPlanDetail:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <!--<el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['phygrid:prodPlanDetail:remove']"
          >删除</el-button>-->
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

    <!-- 添加或修改计划详细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="90px">

        <el-form-item v-if="isPackageVisible" label="是否包装">
          <el-radio-group v-model="form.ifPackage" @change="ifPackageChange">
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="categoryVisible" label="品类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择品类" @change="categoryChange">
            <el-option
              v-for="op in categoryIdTableOptions"
              :key="op.id"
              :label="op.categoryName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单类别" prop="orderType">
          <el-select v-model="form.orderType" placeholder="请选择订单类别">
            <el-option
              v-for="dict in orderTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品" prop="productId">
          <el-select v-model="form.productId" placeholder="请选择产品">
            <el-option
              v-for="op in productIdTableOptions"
              :key="op.id"
              :label="op.productName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="订单数量" prop="orderNumber">
          <el-input v-model="form.orderNumber" placeholder="请输入订单数量" />
        </el-form-item>
        <el-form-item label="已完成数量" prop="completedNumber">
          <el-input v-model="form.completedNumber" placeholder="请输入已完成数量" />
        </el-form-item>
        <el-form-item label="单位" prop="meteringUnitId">
          <el-select v-model="form.meteringUnitId" placeholder="请选择单位">
            <el-option
              v-for="op in meteringUnitIdTableOptions"
              :key="op.id"
              :label="op.meterNameCn"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="车间" prop="workshopId">
          <el-select v-model="form.workshopId" placeholder="请选择车间" @change="workshopChange">
            <el-option
              v-for="op in workshopTableOptions"
              :key="op.id"
              :label="op.workshopName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="产线" prop="lineId">
          <el-select v-model="form.lineId" placeholder="请选择产线" @change="lineChange">
            <el-option
              v-for="op in lineIdTableOptions"
              :key="op.id"
              :label="op.prodLineName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="工序" prop="procedureId">
          <el-select v-model="form.procedureId" placeholder="请选择工序">
            <el-option
              v-for="op in procedureIdTableOptions"
              :key="op.id"
              :label="op.procedureName"
              :value="op.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="周一数量" prop="mondayNumb">
          <el-input v-model="form.mondayNumb" placeholder="请输入周一数量" />
        </el-form-item>
        <el-form-item label="周二数量" prop="tuesdayNumb">
          <el-input v-model="form.tuesdayNumb" placeholder="请输入周二数量" />
        </el-form-item>
        <el-form-item label="周三数量" prop="wednesdayNumb">
          <el-input v-model="form.wednesdayNumb" placeholder="请输入周三数量" />
        </el-form-item>
        <el-form-item label="周四数量" prop="thursdayNumb">
          <el-input v-model="form.thursdayNumb" placeholder="请输入周四数量" />
        </el-form-item>
        <el-form-item label="周五数量" prop="fridayNumb">
          <el-input v-model="form.fridayNumb" placeholder="请输入周五数量" />
        </el-form-item>
        <el-form-item label="周六数量" prop="saturdayNumb">
          <el-input v-model="form.saturdayNumb" placeholder="请输入周六数量" />
        </el-form-item>
        <el-form-item label="周日数量" prop="sundayNumb">
          <el-input v-model="form.sundayNumb" placeholder="请输入周日数量" />
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
import { listProdPlanDetailNoPage, listProdPlanDetail, getProdPlanDetail, delProdPlanDetail, addProdPlanDetail, updateProdPlanDetail, exportProdPlanDetail } from '@/api/phygrid/prodPlanDetail'
import { listCategoryNoPage } from '@/api/product/category'
import { listCategoryproductNoPage } from '@/api/product/categoryproduct'
import { listMeteringunitNoPage } from '@/api/material/meteringunit'
import { listLineNoPage } from '@/api/product/line'
import { listNoPageByLine } from '@/api/product/procedure'
import { listNoPageByCategory } from '@/api/phygrid/workshop'
import moment from 'moment'

export default {
  name: 'ProdPlanDetail',
  components: {
  },
  data() {
    return {
      planDetailId: this.$route.query.id,
      planDetailWeekNo: this.$route.query.weekNo,
      categoryIdTableOptions: [],
      productIdTableOptions: [],
      meteringUnitIdTableOptions: [],
      lineIdTableOptions: [],
      procedureIdTableOptions: [],
      workshopTableOptions: [],
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
      // 计划详细表格数据
      prodPlanDetailList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 订单类别字典
      orderTypeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10

      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      timeData: [],
      timeList: [],

      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      position: 0,
      productSpanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      productPos: 0, // spanArr 的索引
      orderNumSpanArr: [],
      orderNumPos: 0,
      completeOrderNumSpanArr: [],
      completeOrderOrderNumPos: 0,
      lineSpanArr: [],
      linePos: 0,
      procedureSpanArr: [],
      procedurePos: 0,
      categoryVisible: true,
      isPackageVisible: true

    }
  },
  created() {
    const timeData = []
    const timeList = []
    for (let i = 0; i < 7; i++) {
      timeData.push(moment(moment(this.planDetailWeekNo, 'YYYYWW').format('YYYYMMDD')).add(i, 'days').format('M月D日'))
      timeList.push(moment(moment(this.planDetailWeekNo, 'YYYYWW').format('YYYYMMDD')).add(i, 'days').format('YYYY-MM-DD'))
    }
    this.timeData = timeData
    this.timeList = timeList
    console.log(this.timeData)
    this.initDtableOptions()// 初始化外联数据表
    this.getList()
    this.getDicts('order_type').then(response => {
      this.orderTypeOptions = response.data
    })
  },
  methods: {
    ifPackageChange() {
      if (this.form.ifPackage === '0') {
        this.categoryVisible = false
        listNoPageByCategory({ categoryId: 0 }).then(response => {
          this.workshopTableOptions = response.data
        })
        listCategoryproductNoPage({}).then(response => {
          this.productIdTableOptions = response.data
        })
      } else {
        this.categoryVisible = true
        this.productIdTableOptions = []
        listNoPageByCategory({}).then(response => {
          this.workshopTableOptions = response.data
        })
      }
      this.form.categoryId = null
      this.form.productId = null
      this.form.workshopId = null
      this.form.lineId = null
      this.form.procedureId = null
    },
    lineChange() {
      listNoPageByLine({ produceLineId: this.form.lineId }).then(response => {
        this.procedureIdTableOptions = response.data
      })
      this.form.procedureId = null
      console.log(this.form.lineId, 'produceLineId')
    },
    categoryChange() {
      listCategoryproductNoPage({ categoryId: this.form.categoryId }).then(response => {
        this.productIdTableOptions = response.data
      })
      listNoPageByCategory({ categoryId: this.form.categoryId }).then(response => {
        this.workshopTableOptions = response.data
      })
      this.form.productId = null
      this.form.workshopId = null
      this.form.lineId = null
      this.form.procedureId = null
      console.log(this.form.categoryId, 'categoryId')
    },
    workshopChange() {
      listLineNoPage({ workshopId: this.form.workshopId }).then(response => {
        this.lineIdTableOptions = response.data
      })
      this.form.lineId = null
      this.form.procedureId = null
      console.log(this.form.workshopId, 'workshopId')
    },
    initDtableOptions() {
      listCategoryNoPage({}).then(response => {
        this.categoryIdTableOptions = response.data
      })

      listMeteringunitNoPage({}).then(response => {
        this.meteringUnitIdTableOptions = response.data
      })
      /* listCategoryproductNoPage({}).then(response => {
          this.productIdTableOptions = response.data;
      });
     listLineNoPage({}).then(response => {
         this.lineIdTableOptions = response.data;
     });
     listNoPageByCategory({}).then(response => {
         this.workshopTableOptions = response.data;
     });
     listNoPageByLine({isPlan:1}).then(response => {
         this.procedureIdTableOptions = response.data;
     });
      listNoPageByCategory({}).then(response => {
          this.workshopTableOptions = response.data;
      });*/
    },
    /** 查询计划详细列表 */
    getList() {
      this.loading = true
      this.queryParams.planId = this.planDetailId
      listProdPlanDetailNoPage(this.queryParams).then(response => {
        const data = response.data
        data.forEach(x => {
          x.categoryIdText = x.categoryIdText ? x.categoryIdText : '包装'
          console.log(x)
        })
        this.prodPlanDetailList = data
        this.getSpanArr(this.prodPlanDetailList)
        this.loading = false
      })
    },
    // 订单类别字典翻译
    orderTypeFormat(row, column) {
      return this.selectDictLabel(this.orderTypeOptions, row.orderType)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    getSpanArr(data) {
      this.spanArr = []
      this.contentSpanArr = []
      this.productSpanArr = []
      this.orderNumSpanArr = []
      this.contentSpanArr = []
      this.completeOrderNumSpanArr = []
      this.lineSpanArr = []
      this.procedureSpanArr = []
      this.pos = 0
      this.position = 0
      this.productPos = 0
      this.orderNumPos = 0
      this.completeOrderOrderNumPos = 0
      this.linePos = 0
      this.procedurePos = 0
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
          this.contentSpanArr.push(1)
          this.position = 0
          this.productSpanArr.push(1)
          this.productPos = 0
          this.orderNumSpanArr.push(1)
          this.orderNumPos = 0
          this.completeOrderNumSpanArr.push(1)
          this.completeOrderOrderNumPos = 0
          this.lineSpanArr.push(1)
          this.linePos = 0
          this.procedureSpanArr.push(1)
          this.procedurePos = 0
        } else {
          // 判断当前元素与上一个元素是否相同(第1和第2列)
          if (data[i].categoryIdText === data[i - 1].categoryIdText) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          if (data[i].orderType === data[i - 1].orderType) {
            this.contentSpanArr[this.position] += 1
            this.contentSpanArr.push(0)
          } else {
            this.contentSpanArr.push(1)
            this.position = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          if (data[i].productIdText === data[i - 1].productIdText) {
            this.productSpanArr[this.productPos] += 1
            this.productSpanArr.push(0)
          } else {
            this.productSpanArr.push(1)
            this.productPos = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          if (data[i].orderNumber === data[i - 1].orderNumber) {
            this.orderNumSpanArr[this.orderNumPos] += 1
            this.orderNumSpanArr.push(0)
          } else {
            this.orderNumSpanArr.push(1)
            this.orderNumPos = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          if (data[i].completedNumber === data[i - 1].completedNumber) {
            this.completeOrderNumSpanArr[this.completeOrderOrderNumPos] += 1
            this.completeOrderNumSpanArr.push(0)
          } else {
            this.completeOrderNumSpanArr.push(1)
            this.completeOrderOrderNumPos = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          if (data[i].lineIdText === data[i - 1].lineIdText) {
            this.lineSpanArr[this.linePos] += 1
            this.lineSpanArr.push(0)
          } else {
            this.lineSpanArr.push(1)
            this.linePos = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          if (data[i].procedureId === data[i - 1].procedureId) {
            this.procedureSpanArr[this.procedurePos] += 1
            this.procedureSpanArr.push(0)
          } else {
            this.procedureSpanArr.push(1)
            this.procedurePos = i
          }
        }
      }
    },
    objectSpanMethod({
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }/* else if (columnIndex === 2){
              const _row = this.contentSpanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                  rowspan: _row,
                  colspan: _col
              }
          }else if (columnIndex === 3){
              const _row = this.productSpanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                  rowspan: _row,
                  colspan: _col
              }
          }else if (columnIndex === 4){
              const _row = this.orderNumSpanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                  rowspan: _row,
                  colspan: _col
              }
          }else if (columnIndex === 5){
              const _row = this.completeOrderNumSpanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                  rowspan: _row,
                  colspan: _col
              }
          }else if (columnIndex === 7){
              const _row = this.lineSpanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                  rowspan: _row,
                  colspan: _col
              }
          }else if (columnIndex === 8){
              const _row = this.procedureSpanArr[rowIndex];
              const _col = _row > 0 ? 1 : 0;
              return {
                  rowspan: _row,
                  colspan: _col
              }
          }*/
      // if (columnIndex === 0  || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 8|| columnIndex === 1 ) {
      //     const _row = this.spanArr[rowIndex];
      //     const _col = _row > 0 ? 1 : 0;
      //     return {
      //         rowspan: _row,
      //         colspan: _col,
      //     };
      // }else {
      //     return {
      //         rowspan: 0,
      //         colspan: 0,
      //     };
      // }
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        planId: null,
        categoryId: null,
        ifPackage: '1',
        orderType: null,
        productId: null,
        orderNumber: null,
        completedNumber: null,
        meteringUnitId: null,
        lineId: null,
        procedureId: null,
        mondayNumb: null,
        tuesdayNumb: null,
        wednesdayNumb: null,
        thursdayNumb: null,
        fridayNumb: null,
        saturdayNumb: null,
        sundayNumb: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        delFlag: null

      }
      this.categoryVisible = true
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
      this.isPackageVisible = true
      this.open = true
      this.title = '添加计划详细'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      this.isPackageVisible = false
      getProdPlanDetail(id).then(response => {
        this.form = response.data
        // this.form.workshopId = parseInt(response.data.workshopId)
        this.open = true
        this.title = '修改计划详细'
        if (this.form.categoryId === 0) {
          this.categoryVisible = false

          listCategoryproductNoPage({}).then(response => {
            this.productIdTableOptions = response.data
            console.log('this.form.categoryId', this.form.categoryId)
          })
        } else {
          listCategoryproductNoPage({ categoryId: this.form.categoryId }).then(response => {
            this.productIdTableOptions = response.data
            console.log('this.form.categoryId', this.form.categoryId)
          })
        }
        listNoPageByCategory({ categoryId: this.form.categoryId }).then(response => {
          // console.log( response.data,"22")
          this.workshopTableOptions = response.data
        })
        listNoPageByLine({ produceLineId: this.form.lineId }).then(response => {
          this.procedureIdTableOptions = response.data
        })
        listLineNoPage({ workshopId: this.form.workshopId }).then(response => {
          this.lineIdTableOptions = response.data
        })
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.planId = this.planDetailId
          this.form.timeList = this.timeList
          if (this.form.id != null) {
            updateProdPlanDetail(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              console.log('formUpdate', this.form)
              this.getList()
            })
          } else {
            addProdPlanDetail(this.form).then(response => {
              this.msgSuccess('新增成功')
              this.open = false
              console.log('form', this.form)
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除计划详细编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delProdPlanDetail(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有计划详细数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportProdPlanDetail(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

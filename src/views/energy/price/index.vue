<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="类别" prop="category">
        <el-select v-model="queryParams.category" placeholder="请选择类别" clearable size="small">
          <el-option
            v-for="dict in categoryOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="价格单位" prop="priceUnit">
        <el-input
          v-model="queryParams.priceUnit"
          placeholder="请输入价格单位"
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
          v-hasPermi="['energy:price:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['energy:price:edit']"
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
          v-hasPermi="['energy:price:remove']"
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
          v-hasPermi="['energy:price:export']"
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

    <el-table ref="priceTable" v-loading="loading" :data="priceList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />\
      <el-table-column type="expand" width="0">
        <template slot-scope="scope">
          <energy-item-price-multi :price-id="scope.row.id" :scope-row-data="scope.row" />
        </template>
      </el-table-column>
      <el-table-column label="ID" align="center" prop="id" />
      <el-table-column label="类别" align="center" prop="category" :formatter="categoryFormat" />
      <el-table-column label="价格名称" align="center" prop="priceName" />
      <el-table-column label="常用单价" align="center" prop="normalPrice" />
      <el-table-column label="价格单位" align="center" prop="priceUnit" />
      <el-table-column label="所属工厂" align="center" prop="factoryIdText" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['energy:price:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['energy:price:edit']"
            size="mini"
            type="text"
            icon="el-icon-time"
            @click="handleSettingQuery(scope.row)"
          >设定峰谷</el-button>
          <el-button
            v-hasPermi="['energy:price:remove']"
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

    <!-- 添加或修改能耗价格对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="类别" prop="category">
          <el-select v-model="form.category" placeholder="请选择类别">
            <el-option
              v-for="dict in categoryOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格名称" prop="priceName">
          <el-input v-model="form.priceName" placeholder="请输入价格名称" />
        </el-form-item>
        <el-form-item label="常用单价" prop="normalPrice">
          <el-input v-model="form.normalPrice" placeholder="请输入常用单价" />
        </el-form-item>
        <el-form-item label="价格单位" prop="priceUnit">
          <el-input v-model="form.priceUnit" placeholder="请输入价格单位" />
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
import { listPrice, getPrice, delPrice, addPrice, updatePrice, exportPrice } from '@/api/energy/price'
import EnergyItemPriceMulti from '../item/multi'

export default {
  name: 'Price',
  components: {
    EnergyItemPriceMulti
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
      // 能耗价格表格数据
      priceList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类别字典
      categoryOptions: [],
      // 是否禁用字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        category: null,
        priceUnit: null
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
    this.getDicts('energy_device_category').then(response => {
      this.categoryOptions = response.data
    })
    this.getDicts('sys_yes_no').then(response => {
      this.statusOptions = response.data
    })
  },
  methods: {
    handleSettingQuery: function(row) {
      const $table = this.$refs.priceTable
      $table.toggleRowExpansion(row)
    },
    initDtableOptions() {
    },
    /** 查询能耗价格列表 */
    getList() {
      this.loading = true
      listPrice(this.queryParams).then(response => {
        this.priceList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 类别字典翻译
    categoryFormat(row, column) {
      return this.selectDictLabel(this.categoryOptions, row.category)
    },
    // 是否禁用字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status)
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
        priceName: null,
        normalPrice: null,
        priceUnit: null,
        factoryId: null,
        status: null,
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
      this.title = '添加能耗价格'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getPrice(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改能耗价格'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePrice(this.form).then(response => {
              this.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addPrice(this.form).then(response => {
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
      this.$confirm('是否确认删除能耗价格编号为"' + ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delPrice(ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams
      this.$confirm('是否确认导出所有能耗价格数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.exportLoading = true
        return exportPrice(queryParams)
      }).then(response => {
        this.download(response.msg)
        this.exportLoading = false
      }).catch(() => {})
    }
  }
}
</script>

<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="股票代码sh、sz" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入股票代码sh、sz"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易日期" prop="date">
        <el-date-picker clearable size="small"
          v-model="queryParams.date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择交易日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="涨跌幅" prop="change">
        <el-input
          v-model="queryParams.change"
          placeholder="请输入涨跌幅"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成交量" prop="volume">
        <el-input
          v-model="queryParams.volume"
          placeholder="请输入成交量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成交额" prop="money">
        <el-input
          v-model="queryParams.money"
          placeholder="请输入成交额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流通市值" prop="tradedMarketValue">
        <el-input
          v-model="queryParams.tradedMarketValue"
          placeholder="请输入流通市值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总市值" prop="marketValue">
        <el-input
          v-model="queryParams.marketValue"
          placeholder="请输入总市值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="换手率" prop="turnover">
        <el-input
          v-model="queryParams.turnover"
          placeholder="请输入换手率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="近期财告日期" prop="reportDate">
        <el-date-picker clearable size="small"
          v-model="queryParams.reportDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="近期财告日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="市盈率" prop="peTtm">
        <el-input
          v-model="queryParams.peTtm"
          placeholder="请输入市盈率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市销率" prop="psTtm">
        <el-input
          v-model="queryParams.psTtm"
          placeholder="请输入市销率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市现率" prop="pcTtm">
        <el-input
          v-model="queryParams.pcTtm"
          placeholder="请输入最近12个月市现率，股价/最近12个月每股经营现金流"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市净率，股价/最近期财报每股净资产" prop="pb">
        <el-input
          v-model="queryParams.pb"
          placeholder="请输入市净率，股价/最近期财报每股净资产"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="复权开始时间为股票最近一个交易日" prop="adjustPriceF">
        <el-input
          v-model="queryParams.adjustPriceF"
          placeholder="请输入复权开始时间为股票最近一个交易日"
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
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['stockck:stockck:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['stockck:stockck:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['stockck:stockck:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['stockck:stockck:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stockckList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="股票的代码，上证股票以sh开头，深证股票以sz开头" align="center" prop="code" />
      <el-table-column label="交易日期" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最近一期财务报告实际发布的日期" align="center" prop="reportDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.reportDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="	最近12个月市盈率，股价/最近12个月归属母公司的每股收益" align="center" prop="peTtm" />
      <el-table-column label="最近12个月市销率，股价/最近12个月每股营业收入" align="center" prop="psTtm" />
      <el-table-column label="最近12个月市现率，股价/最近12个月每股经营现金流" align="center" prop="pcTtm" />
      <el-table-column label="市净率，股价/最近期财报每股净资产" align="center" prop="pb" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['stockck:stockck:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['stockck:stockck:remove']"
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

    <!-- 添加或修改单票历史对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="股票的代码，上证股票以sh开头，深证股票以sz开头" prop="code">
          <el-input v-model="form.code" placeholder="请输入股票的代码，上证股票以sh开头，深证股票以sz开头" />
        </el-form-item>
        <el-form-item label="交易日期" prop="date">
          <el-date-picker clearable size="small"
            v-model="form.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择交易日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开盘价" prop="open">
          <el-input v-model="form.open" placeholder="请输入开盘价" />
        </el-form-item>
        <el-form-item label="最高价" prop="high">
          <el-input v-model="form.high" placeholder="请输入最高价" />
        </el-form-item>
        <el-form-item label="最低价" prop="low">
          <el-input v-model="form.low" placeholder="请输入最低价" />
        </el-form-item>
        <el-form-item label="收盘价" prop="close">
          <el-input v-model="form.close" placeholder="请输入收盘价" />
        </el-form-item>
        <el-form-item label="复权之后的真实涨跌幅" prop="change">
          <el-input v-model="form.change" placeholder="请输入复权之后的真实涨跌幅" />
        </el-form-item>
        <el-form-item label="成交量" prop="volume">
          <el-input v-model="form.volume" placeholder="请输入成交量" />
        </el-form-item>
        <el-form-item label="成交额" prop="money">
          <el-input v-model="form.money" placeholder="请输入成交额" />
        </el-form-item>
        <el-form-item label="流通市值" prop="tradedMarketValue">
          <el-input v-model="form.tradedMarketValue" placeholder="请输入流通市值" />
        </el-form-item>
        <el-form-item label="总市值" prop="marketValue">
          <el-input v-model="form.marketValue" placeholder="请输入总市值" />
        </el-form-item>
        <el-form-item label="换手率，成交量/流通股本" prop="turnover">
          <el-input v-model="form.turnover" placeholder="请输入换手率，成交量/流通股本" />
        </el-form-item>
        <el-form-item label="复权开始时间为股票上市日" prop="adjustPrice">
          <el-input v-model="form.adjustPrice" placeholder="请输入复权开始时间为股票上市日" />
        </el-form-item>
        <el-form-item label="最近一期财务报告的类型" prop="reportType">
          <el-select v-model="form.reportType" placeholder="请选择最近一期财务报告的类型">
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="最近一期财务报告实际发布的日期" prop="reportDate">
          <el-date-picker clearable size="small"
            v-model="form.reportDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择最近一期财务报告实际发布的日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="	最近12个月市盈率，股价/最近12个月归属母公司的每股收益" prop="peTtm">
          <el-input v-model="form.peTtm" placeholder="请输入	最近12个月市盈率，股价/最近12个月归属母公司的每股收益" />
        </el-form-item>
        <el-form-item label="最近12个月市销率，股价/最近12个月每股营业收入" prop="psTtm">
          <el-input v-model="form.psTtm" placeholder="请输入最近12个月市销率，股价/最近12个月每股营业收入" />
        </el-form-item>
        <el-form-item label="最近12个月市现率，股价/最近12个月每股经营现金流" prop="pcTtm">
          <el-input v-model="form.pcTtm" placeholder="请输入最近12个月市现率，股价/最近12个月每股经营现金流" />
        </el-form-item>
        <el-form-item label="市净率，股价/最近期财报每股净资产" prop="pb">
          <el-input v-model="form.pb" placeholder="请输入市净率，股价/最近期财报每股净资产" />
        </el-form-item>
        <el-form-item label="复权开始时间为股票最近一个交易日" prop="adjustPriceF">
          <el-input v-model="form.adjustPriceF" placeholder="请输入复权开始时间为股票最近一个交易日" />
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
import { listStockck, getStockck, delStockck, addStockck, updateStockck, exportStockck } from "@/api/stockck/stockck";


export default {
  name: "Stockck",
  components: {
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
      // 单票历史表格数据
      stockckList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        date: null,
        change: null,
        volume: null,
        money: null,
        tradedMarketValue: null,
        marketValue: null,
        turnover: null,
        reportDate: null,
        peTtm: null,
        psTtm: null,
        pcTtm: null,
        pb: null,
        adjustPriceF: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.initDtableOptions();//初始化外联数据表
    this.getList();
  },
  methods: {
    initDtableOptions(){
    },
    /** 查询单票历史列表 */
    getList() {
      this.loading = true;
      listStockck(this.queryParams).then(response => {
        this.stockckList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        code: null,
        date: null,
        open: null,
        high: null,
        low: null,
        close: null,
        change: null,
        volume: null,
        money: null,
        tradedMarketValue: null,
        marketValue: null,
        turnover: null,
        adjustPrice: null,
        reportType: null,
        reportDate: null,
        peTtm: null,
        psTtm: null,
        pcTtm: null,
        pb: null,
        adjustPriceF: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.code)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加单票历史";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const code = row.code || this.ids
      getStockck(code).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单票历史";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.code != null) {
            updateStockck(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStockck(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const codes = row.code || this.ids;
      this.$confirm('是否确认删除单票历史编号为"' + codes + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStockck(codes);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有单票历史数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportStockck(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

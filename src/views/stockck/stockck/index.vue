<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="ex-code" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入ex-code"
          clearable
           class="inputWidth"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易日期">
        <el-date-picker
          v-model="daterangeDate"
          size="small"
          class="inputWidth"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="开盘价" prop="open">
        <el-input
          v-model="queryParams.open"
          placeholder="请输入开盘价"
          clearable
          class="inputWidth"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最高价" prop="high">
        <el-input
          v-model="queryParams.high"
          class="inputWidth"
          placeholder="请输入最高价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最低价" prop="low">
        <el-input
          v-model="queryParams.low"
          class="inputWidth"
          placeholder="请输入最低价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收盘价" prop="close">
        <el-input
          v-model="queryParams.close"
          class="inputWidth"
          placeholder="请输入收盘价"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涨跌幅" prop="change">
        <el-input
          v-model="queryParams.change"
          class="inputWidth"
          placeholder="请输入涨跌幅"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成交量" prop="volume">
        <el-input
          v-model="queryParams.volume"
          class="inputWidth"
          placeholder="请输入成交量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="成交额" prop="money">
        <el-input
          v-model="queryParams.money"
          class="inputWidth"
          placeholder="请输入成交额"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="流通市值" prop="tradedMarketValue">
        <el-input
          v-model="queryParams.tradedMarketValue"
          class="inputWidth"
          placeholder="请输入流通市值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="总市值" prop="marketValue">
        <el-input
          v-model="queryParams.marketValue"
          class="inputWidth"
          placeholder="请输入总市值"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="换手率" prop="turnover">
        <el-input
          v-model="queryParams.turnover"
          class="inputWidth"
          placeholder="请输入换手率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="pe" prop="peTtm">
        <el-input
          v-model="queryParams.peTtm"
          class="inputWidth"
          placeholder="请输入pe"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市销率" prop="psTtm">
        <el-input
          v-model="queryParams.psTtm"
          class="inputWidth"
          placeholder="请输入市销率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市现率" prop="pcTtm">
        <el-input
          v-model="queryParams.pcTtm"
          class="inputWidth"
          placeholder="请输入市现率"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市净率" prop="pb">
        <el-input
          v-model="queryParams.pb"
          class="inputWidth"
          placeholder="市净率"
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
      <!-- <el-col :span="1.5">
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
      </el-col> -->
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
      <el-table-column label="ex-code" align="center" prop="code" />
      <el-table-column label="交易日期" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开盘价" align="center" prop="open" />
      <el-table-column label="最高价" align="center" prop="high" />
      <el-table-column label="最低价" align="center" prop="low" />
      <el-table-column label="收盘价" align="center" prop="close" />
      <el-table-column label="涨跌幅" show-overflow-tooltip align="center" prop="change" />
      <el-table-column label="成交量(W)" align="center" prop="volume" />
      <el-table-column label="成交额(W)" show-overflow-tooltip align="center" prop="money" />
      <el-table-column label="流通市值(E)" show-overflow-tooltip align="center" prop="tradedMarketValue" />
      <el-table-column label="总市值(E)" show-overflow-tooltip align="center" prop="marketValue" />
      <el-table-column label="换手率" align="center" show-overflow-tooltip prop="turnover" />
      <el-table-column label="pe" align="center" prop="peTtm" />
      <el-table-column label="市销率" align="center" show-overflow-tooltip prop="psTtm" />
      <el-table-column label="市现率" align="center" show-overflow-tooltip prop="pcTtm" />
      <el-table-column label="市净率" align="center" show-overflow-tooltip prop="pb" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
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
      </el-table-column> -->
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
      // 交易日期时间范围
      daterangeDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
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
        peTtm: null,
        psTtm: null,
        pcTtm: null,
        pb: null,
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
    //获取当前时间，格式YYYY-MM-DD
    getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    initDtableOptions(){
      this.daterangeDate[0] = this.getNowFormatDate();
      this.daterangeDate[1] = this.daterangeDate[0];
    },
    /** 查询单票历史列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeDate && '' != this.daterangeDate) {
        this.queryParams.params["beginDate"] = this.daterangeDate[0];
        this.queryParams.params["endDate"] = this.daterangeDate[1];
      }
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
      this.daterangeDate = [];
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
<style>
.inputWidth{
  width: 150px /*!important*/;
}
</style>

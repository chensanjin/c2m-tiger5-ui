<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="date">
        <el-date-picker
          v-model="daterangeDate"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="code" prop="stockcode">
        <el-input
          v-model="queryParams.stockcode"
          placeholder="请输入code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="open" prop="open">
        <el-input
          v-model="queryParams.open"
          placeholder="请输入open"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="high" prop="high">
        <el-input
          v-model="queryParams.high"
          placeholder="请输入high"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="low" prop="low">
        <el-input
          v-model="queryParams.low"
          placeholder="请输入low"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="close" prop="close">
        <el-input
          v-model="queryParams.close"
          placeholder="请输入close"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="preClose" prop="preclose">
        <el-input
          v-model="queryParams.preclose"
          placeholder="请输入preClose"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="volume" prop="volume">
        <el-input
          v-model="queryParams.volume"
          placeholder="请输入volume"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="amount" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入amount"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma5" prop="ma5">
        <el-input
          v-model="queryParams.ma5"
          placeholder="请输入ma5"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma10" prop="ma10">
        <el-input
          v-model="queryParams.ma10"
          placeholder="请输入ma10"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma20" prop="ma20">
        <el-input
          v-model="queryParams.ma20"
          placeholder="请输入ma20"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma30" prop="ma30">
        <el-input
          v-model="queryParams.ma30"
          placeholder="请输入ma30"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma60" prop="ma60">
        <el-input
          v-model="queryParams.ma60"
          placeholder="请输入ma60"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma120" prop="ma120">
        <el-input
          v-model="queryParams.ma120"
          placeholder="请输入ma120"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma200" prop="ma200">
        <el-input
          v-model="queryParams.ma200"
          placeholder="请输入ma200"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma250" prop="ma250">
        <el-input
          v-model="queryParams.ma250"
          placeholder="请输入ma250"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="volume120" prop="volume120">
        <el-input
          v-model="queryParams.volume120"
          placeholder="请输入volume120"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="k" prop="k">
        <el-input
          v-model="queryParams.k"
          placeholder="请输入k"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="d" prop="d">
        <el-input
          v-model="queryParams.d"
          placeholder="请输入d"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="j" prop="j">
        <el-input
          v-model="queryParams.j"
          placeholder="请输入j"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="dif" prop="dif">
        <el-input
          v-model="queryParams.dif"
          placeholder="请输入dif"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="dea" prop="dea">
        <el-input
          v-model="queryParams.dea"
          placeholder="请输入dea"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd" prop="macd">
        <el-input
          v-model="queryParams.macd"
          placeholder="请输入macd"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rsi6" prop="rsi6">
        <el-input
          v-model="queryParams.rsi6"
          placeholder="请输入rsi6"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rsi12" prop="rsi12">
        <el-input
          v-model="queryParams.rsi12"
          placeholder="请输入rsi12"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rsi24" prop="rsi24">
        <el-input
          v-model="queryParams.rsi24"
          placeholder="请输入rsi24"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="wr6" prop="wr6">
        <el-input
          v-model="queryParams.wr6"
          placeholder="请输入wr6"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="wr10" prop="wr10">
        <el-input
          v-model="queryParams.wr10"
          placeholder="请输入wr10"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="均线" prop="macross">
        <el-input
          v-model="queryParams.macross"
          placeholder="请输入均线"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="均线补齐" prop="macrosspre">
        <el-input
          v-model="queryParams.macrosspre"
          placeholder="请输入均线补齐"
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
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
		  :loading="exportLoading"
          @click="handleExport"
          v-hasPermi="['wu:stockdayinfo:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stockdayinfoList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="dayinfoid" />
      <el-table-column label="date" align="center" prop="date" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.date, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="code" align="center" prop="stockcode" />
      <el-table-column label="open" align="center" prop="open" />
      <el-table-column label="high" align="center" prop="high" />
      <el-table-column label="low" align="center" prop="low" />
      <el-table-column label="close" align="center" prop="close" />
      <el-table-column label="preClose" align="center" prop="preclose" />
      <el-table-column label="volume" align="center" prop="volume" />
      <el-table-column label="amount" align="center" prop="amount" />
      <el-table-column label="ma5" align="center" prop="ma5" />
      <el-table-column label="ma10" align="center" prop="ma10" />
      <el-table-column label="ma20" align="center" prop="ma20" />
      <el-table-column label="ma30" align="center" prop="ma30" />
      <el-table-column label="ma60" align="center" prop="ma60" />
      <el-table-column label="ma120" align="center" prop="ma120" />
      <el-table-column label="ma200" align="center" prop="ma200" />
      <el-table-column label="ma250" align="center" prop="ma250" />
      <el-table-column label="volume120" align="center" prop="volume120" />
      <el-table-column label="k" align="center" prop="k" />
      <el-table-column label="d" align="center" prop="d" />
      <el-table-column label="j" align="center" prop="j" />
      <el-table-column label="dif" align="center" prop="dif" />
      <el-table-column label="dea" align="center" prop="dea" />
      <el-table-column label="macd" align="center" prop="macd" />
      <el-table-column label="rsi6" align="center" prop="rsi6" />
      <el-table-column label="rsi12" align="center" prop="rsi12" />
      <el-table-column label="rsi24" align="center" prop="rsi24" />
      <el-table-column label="wr6" align="center" prop="wr6" />
      <el-table-column label="wr10" align="center" prop="wr10" />
      <el-table-column label="均线" align="center" prop="macross" />
      <el-table-column label="均线补齐" align="center" prop="macrosspre" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改技术历史对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="date" prop="date">
          <el-date-picker clearable size="small"
            v-model="form.date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="code" prop="stockcode">
          <el-input v-model="form.stockcode" placeholder="请输入code" />
        </el-form-item>
        <el-form-item label="open" prop="open">
          <el-input v-model="form.open" placeholder="请输入open" />
        </el-form-item>
        <el-form-item label="high" prop="high">
          <el-input v-model="form.high" placeholder="请输入high" />
        </el-form-item>
        <el-form-item label="low" prop="low">
          <el-input v-model="form.low" placeholder="请输入low" />
        </el-form-item>
        <el-form-item label="close" prop="close">
          <el-input v-model="form.close" placeholder="请输入close" />
        </el-form-item>
        <el-form-item label="preClose" prop="preclose">
          <el-input v-model="form.preclose" placeholder="请输入preClose" />
        </el-form-item>
        <el-form-item label="volume" prop="volume">
          <el-input v-model="form.volume" placeholder="请输入volume" />
        </el-form-item>
        <el-form-item label="amount" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入amount" />
        </el-form-item>
        <el-form-item label="ma5" prop="ma5">
          <el-input v-model="form.ma5" placeholder="请输入ma5" />
        </el-form-item>
        <el-form-item label="ma10" prop="ma10">
          <el-input v-model="form.ma10" placeholder="请输入ma10" />
        </el-form-item>
        <el-form-item label="ma20" prop="ma20">
          <el-input v-model="form.ma20" placeholder="请输入ma20" />
        </el-form-item>
        <el-form-item label="ma30" prop="ma30">
          <el-input v-model="form.ma30" placeholder="请输入ma30" />
        </el-form-item>
        <el-form-item label="ma60" prop="ma60">
          <el-input v-model="form.ma60" placeholder="请输入ma60" />
        </el-form-item>
        <el-form-item label="ma120" prop="ma120">
          <el-input v-model="form.ma120" placeholder="请输入ma120" />
        </el-form-item>
        <el-form-item label="ma200" prop="ma200">
          <el-input v-model="form.ma200" placeholder="请输入ma200" />
        </el-form-item>
        <el-form-item label="ma250" prop="ma250">
          <el-input v-model="form.ma250" placeholder="请输入ma250" />
        </el-form-item>
        <el-form-item label="volume120" prop="volume120">
          <el-input v-model="form.volume120" placeholder="请输入volume120" />
        </el-form-item>
        <el-form-item label="k" prop="k">
          <el-input v-model="form.k" placeholder="请输入k" />
        </el-form-item>
        <el-form-item label="d" prop="d">
          <el-input v-model="form.d" placeholder="请输入d" />
        </el-form-item>
        <el-form-item label="j" prop="j">
          <el-input v-model="form.j" placeholder="请输入j" />
        </el-form-item>
        <el-form-item label="dif" prop="dif">
          <el-input v-model="form.dif" placeholder="请输入dif" />
        </el-form-item>
        <el-form-item label="dea" prop="dea">
          <el-input v-model="form.dea" placeholder="请输入dea" />
        </el-form-item>
        <el-form-item label="macd" prop="macd">
          <el-input v-model="form.macd" placeholder="请输入macd" />
        </el-form-item>
        <el-form-item label="rsi6" prop="rsi6">
          <el-input v-model="form.rsi6" placeholder="请输入rsi6" />
        </el-form-item>
        <el-form-item label="rsi12" prop="rsi12">
          <el-input v-model="form.rsi12" placeholder="请输入rsi12" />
        </el-form-item>
        <el-form-item label="rsi24" prop="rsi24">
          <el-input v-model="form.rsi24" placeholder="请输入rsi24" />
        </el-form-item>
        <el-form-item label="wr6" prop="wr6">
          <el-input v-model="form.wr6" placeholder="请输入wr6" />
        </el-form-item>
        <el-form-item label="wr10" prop="wr10">
          <el-input v-model="form.wr10" placeholder="请输入wr10" />
        </el-form-item>
        <el-form-item label="均线" prop="macross">
          <el-input v-model="form.macross" placeholder="请输入均线" />
        </el-form-item>
        <el-form-item label="均线补齐" prop="macrosspre">
          <el-input v-model="form.macrosspre" placeholder="请输入均线补齐" />
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
import { listStockdayinfo, getStockdayinfo, delStockdayinfo, addStockdayinfo, updateStockdayinfo, exportStockdayinfo } from "@/api/wu/stockdayinfo";


export default {
  name: "Stockdayinfo",
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
      // 技术历史表格数据
      stockdayinfoList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // date时间范围
      daterangeDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        date: null,
        stockcode: null,
        open: null,
        high: null,
        low: null,
        close: null,
        preclose: null,
        volume: null,
        amount: null,
        ma5: null,
        ma10: null,
        ma20: null,
        ma30: null,
        ma60: null,
        ma120: null,
        ma200: null,
        ma250: null,
        volume120: null,
        k: null,
        d: null,
        j: null,
        dif: null,
        dea: null,
        macd: null,
        rsi6: null,
        rsi12: null,
        rsi24: null,
        wr6: null,
        wr10: null,
        macross: null,
        macrosspre: null
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
    /** 查询技术历史列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeDate && '' != this.daterangeDate) {
        this.queryParams.params["beginDate"] = this.daterangeDate[0];
        this.queryParams.params["endDate"] = this.daterangeDate[1];
      }
      listStockdayinfo(this.queryParams).then(response => {
        this.stockdayinfoList = response.rows;
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
        dayinfoid: null,
        date: null,
        stockid: null,
        stockcode: null,
        open: null,
        high: null,
        low: null,
        close: null,
        preclose: null,
        volume: null,
        amount: null,
        ma5: null,
        ma10: null,
        ma20: null,
        ma30: null,
        ma60: null,
        ma120: null,
        ma200: null,
        ma250: null,
        volume120: null,
        k: null,
        d: null,
        j: null,
        dif: null,
        dea: null,
        macd: null,
        rsi6: null,
        rsi12: null,
        rsi24: null,
        wr6: null,
        wr10: null,
        macross: null,
        macrosspre: null
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
      this.ids = selection.map(item => item.dayinfoid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加技术历史";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dayinfoid = row.dayinfoid || this.ids
      getStockdayinfo(dayinfoid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改技术历史";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.dayinfoid != null) {
            updateStockdayinfo(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStockdayinfo(this.form).then(response => {
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
      const dayinfoids = row.dayinfoid || this.ids;
      this.$confirm('是否确认删除技术历史编号为"' + dayinfoids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delStockdayinfo(dayinfoids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有技术历史数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportStockdayinfo(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

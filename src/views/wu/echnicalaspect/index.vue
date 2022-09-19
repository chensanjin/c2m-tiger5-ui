<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="代码" prop="stocknum">
        <el-input
          v-model="queryParams.stocknum"
          placeholder="请输入代码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma金叉" prop="deathcross">
        <el-input
          v-model="queryParams.deathcross"
          placeholder="请输入ma金叉"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="ma死叉" prop="goldencross">
        <el-input
          v-model="queryParams.goldencross"
          placeholder="请输入ma死叉"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!--<el-form-item label="ma技术回档" prop="technicalreturn">
        <el-input
          v-model="queryParams.technicalreturn"
          placeholder="请输入ma技术回档"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd空头行情" prop="bearmarket">
        <el-input
          v-model="queryParams.bearmarket"
          placeholder="请输入macd空头行情"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd多头行情" prop="bullmarket">
        <el-input
          v-model="queryParams.bullmarket"
          placeholder="请输入macd多头行情"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd上升趋势" prop="uptrend">
        <el-input
          v-model="queryParams.uptrend"
          placeholder="请输入macd上升趋势"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd下降趋势" prop="downtrend">
        <el-input
          v-model="queryParams.downtrend"
          placeholder="请输入macd下降趋势"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd顶背离" prop="topdivergence">
        <el-input
          v-model="queryParams.topdivergence"
          placeholder="请输入macd顶背离"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="macd底背离" prop="lowdivergence">
        <el-input
          v-model="queryParams.lowdivergence"
          placeholder="请输入macd底背离"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rsi牛始" prop="cattlestart">
        <el-input
          v-model="queryParams.cattlestart"
          placeholder="请输入rsi牛始"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="rsi市场热度" prop="prosperitylevel">
        <el-input
          v-model="queryParams.prosperitylevel"
          placeholder="请输入rsi市场热度"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="kdj金叉" prop="kdjgoldencross">
        <el-input
          v-model="queryParams.kdjgoldencross"
          placeholder="请输入kdj金叉"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="kdj死叉" prop="kdjdeathcross">
        <el-input
          v-model="queryParams.kdjdeathcross"
          placeholder="请输入kdj死叉"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="kdj超买" prop="overbought">
        <el-input
          v-model="queryParams.overbought"
          placeholder="请输入kdj超买"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="kdj超卖" prop="oversold">
        <el-input
          v-model="queryParams.oversold"
          placeholder="请输入kdj超卖"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="kdj向上趋势" prop="shortupwardtrend">
        <el-input
          v-model="queryParams.shortupwardtrend"
          placeholder="请输入kdj向上趋势"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="kdj向下趋势" prop="shortdownwardtrend">
        <el-input
          v-model="queryParams.shortdownwardtrend"
          placeholder="请输入kdj向下趋势"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="A区面积" prop="areaa">
        <el-input
          v-model="queryParams.areaa"
          placeholder="请输入A区面积"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="B区面积" prop="areab">
        <el-input
          v-model="queryParams.areab"
          placeholder="请输入B区面积"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="A区成交量" prop="volumea">
        <el-input
          v-model="queryParams.volumea"
          placeholder="请输入A区成交量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="B区成交量" prop="volumeb">
        <el-input
          v-model="queryParams.volumeb"
          placeholder="请输入B区成交量"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="酒田" prop="jiutian">
        <el-input
          v-model="queryParams.jiutian"
          placeholder="请输入酒田"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="均线补齐" prop="jiutianbak">
        <el-input
          v-model="queryParams.jiutianbak"
          placeholder="请输入均线解读"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="回溯" prop="replaydesc">
        <el-input
          v-model="queryParams.replaydesc"
          placeholder="请输入macd回溯"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button type="danger" size="max">0是【否】，1是【是】;目前放一年数据;排序权重【面积】、【成交量】各50%</el-button>
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
          v-hasPermi="['wu:echnicalaspect:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="echnicalaspectList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="代码" align="center" prop="stocknum" />
      <el-table-column label="A面积" align="center" prop="areaa" />
      <el-table-column label="B面积" align="center" prop="areab" />
      <el-table-column label="A成交量(万)" align="center" prop="volumea" />
      <el-table-column label="B成交量(万)" align="center" prop="volumeb" />
      <el-table-column label="均线补齐" align="center" prop="jiutianbak" />
      <el-table-column label="回溯说明" align="center" prop="replaydesc" />
      <el-table-column label="更新时间" align="center" prop="updatedate" />
      <el-table-column label="ma金叉" align="center" prop="deathcross" />
      <el-table-column label="ma死叉" align="center" prop="goldencross" />
      <el-table-column label="ma技术回档" align="center" prop="technicalreturn" />
      <el-table-column label="macd空头行情" align="center" prop="bearmarket" />
      <el-table-column label="macd多头行情" align="center" prop="bullmarket" />
      <!--<el-table-column label="macd上升趋势" align="center" prop="uptrend" />
      <el-table-column label="macd下降趋势" align="center" prop="downtrend" />-->
      <el-table-column label="macd顶背离" align="center" prop="topdivergence" />
      <el-table-column label="macd底背离" align="center" prop="lowdivergence" />
      <el-table-column label="rsi牛始" align="center" prop="cattlestart" />
      <el-table-column label="rsi市场热度" align="center" prop="prosperitylevel" />
      <el-table-column label="kdj金叉" align="center" prop="kdjgoldencross" />
      <el-table-column label="kdj死叉" align="center" prop="kdjdeathcross" />
      <el-table-column label="kdj超买" align="center" prop="overbought" />
      <el-table-column label="kdj超卖" align="center" prop="oversold" />
      <el-table-column label="kdj向上趋势" align="center" prop="shortupwardtrend" />
      <el-table-column label="kdj向下趋势" align="center" prop="shortdownwardtrend" />
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改技术现状对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="代码" prop="stocknum">
          <el-input v-model="form.stocknum" placeholder="请输入代码" />
        </el-form-item>
        <el-form-item label="ma金叉" prop="deathcross">
          <el-input v-model="form.deathcross" placeholder="请输入ma金叉" />
        </el-form-item>
        <el-form-item label="ma死叉" prop="goldencross">
          <el-input v-model="form.goldencross" placeholder="请输入ma死叉" />
        </el-form-item>
        <el-form-item label="ma技术回档" prop="technicalreturn">
          <el-input v-model="form.technicalreturn" placeholder="请输入ma技术回档" />
        </el-form-item>
        <el-form-item label="macd空头行情" prop="bearmarket">
          <el-input v-model="form.bearmarket" placeholder="请输入macd空头行情" />
        </el-form-item>
        <el-form-item label="macd多头行情" prop="bullmarket">
          <el-input v-model="form.bullmarket" placeholder="请输入macd多头行情" />
        </el-form-item>
        <el-form-item label="macd上升趋势" prop="uptrend">
          <el-input v-model="form.uptrend" placeholder="请输入macd上升趋势" />
        </el-form-item>
        <el-form-item label="macd下降趋势" prop="downtrend">
          <el-input v-model="form.downtrend" placeholder="请输入macd下降趋势" />
        </el-form-item>
        <el-form-item label="macd顶背离" prop="topdivergence">
          <el-input v-model="form.topdivergence" placeholder="请输入macd顶背离" />
        </el-form-item>
        <el-form-item label="macd底背离" prop="lowdivergence">
          <el-input v-model="form.lowdivergence" placeholder="请输入macd底背离" />
        </el-form-item>
        <el-form-item label="rsi牛始" prop="cattlestart">
          <el-input v-model="form.cattlestart" placeholder="请输入rsi牛始" />
        </el-form-item>
        <el-form-item label="rsi市场热度" prop="prosperitylevel">
          <el-input v-model="form.prosperitylevel" placeholder="请输入rsi市场热度" />
        </el-form-item>
        <el-form-item label="kdj金叉" prop="kdjgoldencross">
          <el-input v-model="form.kdjgoldencross" placeholder="请输入kdj金叉" />
        </el-form-item>
        <el-form-item label="kdj死叉" prop="kdjdeathcross">
          <el-input v-model="form.kdjdeathcross" placeholder="请输入kdj死叉" />
        </el-form-item>
        <el-form-item label="kdj超买" prop="overbought">
          <el-input v-model="form.overbought" placeholder="请输入kdj超买" />
        </el-form-item>
        <el-form-item label="kdj超卖" prop="oversold">
          <el-input v-model="form.oversold" placeholder="请输入kdj超卖" />
        </el-form-item>
        <el-form-item label="kdj向上趋势" prop="shortupwardtrend">
          <el-input v-model="form.shortupwardtrend" placeholder="请输入kdj向上趋势" />
        </el-form-item>
        <el-form-item label="kdj向下趋势" prop="shortdownwardtrend">
          <el-input v-model="form.shortdownwardtrend" placeholder="请输入kdj向下趋势" />
        </el-form-item>
        <el-form-item label="A区面积" prop="areaa">
          <el-input v-model="form.areaa" placeholder="请输入A区面积" />
        </el-form-item>
        <el-form-item label="B区面积" prop="areab">
          <el-input v-model="form.areab" placeholder="请输入B区面积" />
        </el-form-item>
        <el-form-item label="A区成交量" prop="volumea">
          <el-input v-model="form.volumea" placeholder="请输入A区成交量" />
        </el-form-item>
        <el-form-item label="B区成交量" prop="volumeb">
          <el-input v-model="form.volumeb" placeholder="请输入B区成交量" />
        </el-form-item>
        <el-form-item label="酒田" prop="jiutian">
          <el-input v-model="form.jiutian" placeholder="请输入酒田" />
        </el-form-item>
        <el-form-item label="预留" prop="jiutianbak">
          <el-input v-model="form.jiutianbak" placeholder="请输入预留" />
        </el-form-item>
        <el-form-item label="回溯说明" prop="replaydesc">
          <el-input v-model="form.replaydesc" placeholder="请输入回溯说明" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedate">
          <el-input v-model="form.updatedate" placeholder="请输入更新时间" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listEchnicalaspect, getEchnicalaspect, delEchnicalaspect, addEchnicalaspect, updateEchnicalaspect, exportEchnicalaspect } from "@/api/wu/echnicalaspect";


export default {
  name: "Echnicalaspect",
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
      // 技术现状表格数据
      echnicalaspectList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stocknum: null,
        deathcross: null,
        goldencross: null,
        technicalreturn: null,
        bearmarket: null,
        bullmarket: null,
        uptrend: null,
        downtrend: null,
        topdivergence: null,
        lowdivergence: null,
        cattlestart: null,
        prosperitylevel: null,
        kdjgoldencross: null,
        kdjdeathcross: null,
        overbought: null,
        oversold: null,
        shortupwardtrend: null,
        shortdownwardtrend: null,
        areaa: null,
        areab: null,
        volumea: null,
        volumeb: null,
        jiutian: null,
        jiutianbak: null,
        replaydesc: null,
        updatedate: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        volumea: [
          { required: true, message: "A区成交量不能为空", trigger: "blur" }
        ],
        volumeb: [
          { required: true, message: "B区成交量不能为空", trigger: "blur" }
        ],
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
    /** 查询技术现状列表 */
    getList() {
      this.loading = true;
      listEchnicalaspect(this.queryParams).then(response => {
        this.echnicalaspectList = response.rows;
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
        echnicalaspectid: null,
        stocknum: null,
        deathcross: null,
        goldencross: null,
        technicalreturn: null,
        bearmarket: null,
        bullmarket: null,
        uptrend: null,
        downtrend: null,
        topdivergence: null,
        lowdivergence: null,
        cattlestart: null,
        prosperitylevel: null,
        kdjgoldencross: null,
        kdjdeathcross: null,
        overbought: null,
        oversold: null,
        shortupwardtrend: null,
        shortdownwardtrend: null,
        areaa: null,
        areab: null,
        volumea: null,
        volumeb: null,
        jiutian: null,
        jiutianbak: null,
        replaydesc: null,
        updatedate: null,
        remark: null
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
      this.ids = selection.map(item => item.echnicalaspectid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加技术现状";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const echnicalaspectid = row.echnicalaspectid || this.ids
      getEchnicalaspect(echnicalaspectid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改技术现状";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.echnicalaspectid != null) {
            updateEchnicalaspect(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEchnicalaspect(this.form).then(response => {
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
      const echnicalaspectids = row.echnicalaspectid || this.ids;
      this.$confirm('是否确认删除技术现状编号为"' + echnicalaspectids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delEchnicalaspect(echnicalaspectids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有技术现状数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportEchnicalaspect(queryParams);
        }).then(response => {
          this.download(response.msg);
          this.exportLoading = false;
        }).catch(() => {});
    }
  }
};
</script>

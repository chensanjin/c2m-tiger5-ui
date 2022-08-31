<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="code" prop="code">
        <el-input
          v-model="queryParams.code"
          placeholder="请输入code"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="涨跌>=" prop="rate">
        <el-input
          v-model="queryParams.rate"
          placeholder="请输入涨跌"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开始时间" prop="startTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable size="small"
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="排名" prop="rank">
        <el-input
          v-model="queryParams.rank"
          placeholder="请输入排名"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        <el-button icon="el-icon-search" size="mini" @click="changeDiog">每期图</el-button>
        <el-button icon="el-icon-search" size="mini" @click="changeDiog2">净值图</el-button>
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
          v-hasPermi="['selectedrank:sam:add']"
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
          v-hasPermi="['selectedrank:sam:edit']"
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
          v-hasPermi="['selectedrank:sam:remove']"
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
          v-hasPermi="['selectedrank:sam:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="samList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="code" align="center" prop="code" />
      <el-table-column label="涨跌" align="center" prop="rate" />
      <el-table-column label="开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排名" align="center" prop="rank" />
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['selectedrank:sam:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['selectedrank:sam:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改rank票对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="code" prop="code">
          <el-input v-model="form.code" placeholder="请输入code" />
        </el-form-item>
        <el-form-item label="涨跌" prop="rate">
          <el-input v-model="form.rate" placeholder="请输入涨跌" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker clearable size="small"
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker clearable size="small"
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  <el-dialog
  title="每期图"
  :visible.sync="echartsDialogVisible"
  width=500px;
  height=500px;
  >
  <div ref="macarons" style="width: 100%; height: 200px;"></div>
  <span slot="footer" class="dialog-footer">
    <el-input  v-model="st" label-width="120px" class="inputWidth"
               placeholder="st"
               clearable></el-input>
    <el-input  v-model="et" label-width="120px" class="inputWidth"
               placeholder="et"
               clearable></el-input>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="initEcharts">确 定</el-button>
  </span>
</el-dialog>
    <el-dialog
      title="净值图"
      :visible.sync="echartsDialogVisible2"
      width=500px;
      height=500px;
    >
      <div ref="macarons2" style="width: 100%; height: 200px;"></div>
      <span slot="footer" class="dialog-footer">
    <el-input  v-model="st2" label-width="120px" class="inputWidth"
               placeholder="st2"
               clearable></el-input>
    <el-input  v-model="et2" label-width="120px" class="inputWidth"
               placeholder="et2"
               clearable></el-input>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="initEcharts2">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { listSam, getSam, delSam, addSam, updateSam, exportSam, getEcharts, getEcharts2 } from "@/api/stockck/sam";
import echarts from 'echarts'
export default {
  name: "Sam",
  components: {
  },
  data() {
    return {
      echartsDialogVisible:false,
      echartsDialogVisible2:false,
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 选中数组
      ids: [],
      st: '',
      et: '',
      st2: '',
      et2: '',
      echartsData:[],
        echartsData2:[],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // rank票表格数据
      samList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        code: null,
        rate: null,
        startTime: null,
        endTime: null,
        rank: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        code: [
          { required: true, message: "code不能为空", trigger: "blur" }
        ],
        startTime: [
          { required: true, message: "开始时间不能为空", trigger: "blur" }
        ],
        endTime: [
          { required: true, message: "结束时间不能为空", trigger: "blur" }
        ],
        rank: [
          { required: true, message: "排名不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changeDiog(){
      this.echartsDialogVisible=true
      this.$nextTick(()=>{
        this.initChart()
      })
    },
      changeDiog2(){
          this.echartsDialogVisible2=true
          this.$nextTick(()=>{
              this.initChart2()
          })
      },
 initChart() {
      this.chart = echarts.init(this.$refs.macarons)
      this.initEcharts()
    },
      initChart2() {
          this.chart = echarts.init(this.$refs.macarons2)
          this.initEcharts2()
      },

      initEcharts2(){
          this.queryParams.st=this.st2
          this.queryParams.et=this.et2
          getEcharts2(this.queryParams).then(response => {
              let s = response.data;
              let x = 1;
              for (let i = 0; i < s.length; i++) {
                  x = x*s[i].rate;
                  this.echartsData2.push([s[i].start_time, x]);
              }
              const option = {
                  tooltip: {
                      trigger: 'axis',
                      position: function (pt) {
                          return [pt[0], '10%'];
                      }
                  },
                  title: {
                      left: 'center',
                      text: 'Large Ara Chart'
                  },
                  toolbox: {
                      feature: {
                          dataZoom: {
                              yAxisIndex: 'none'
                          },
                          restore: {},
                          saveAsImage: {}
                      }
                  },
                  xAxis: {
                      type: 'time',
                      boundaryGap: false
                  },
                  yAxis: {
                      type: 'value',
                      boundaryGap: [0, '100%']
                  },
                  dataZoom: [
                      {
                          type: 'inside',
                          start: 0,
                          end: 20
                      },
                      {
                          start: 0,
                          end: 20
                      }
                  ],
                  series: [
                      {
                          name: 'Fake Data',
                          type: 'line',
                          smooth: true,
                          symbol: 'none',
                          areaStyle: {},
                          data: this.echartsData2
                      }
                  ]
              };
              this.chart.setOption(option)
          });
      },

    initEcharts(){
        this.queryParams.st=this.st
        this.queryParams.et=this.et
        getEcharts(this.queryParams).then(response => {
            this.echartsData = response.data;
            const option = {
                title: {
                    text: 'Stacked Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['rank1','rank2','rank3','rank4','rank5']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.echartsData.xAxis
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'rank1',
                        type: 'line',
                        stack: 'Total',
                        data: this.echartsData.rank1
                    },
                    {
                        name: 'rank2',
                        type: 'line',
                        stack: 'Total',
                        data: this.echartsData.rank2
                    },
                    {
                        name: 'rank3',
                        type: 'line',
                        stack: 'Total',
                        data: this.echartsData.rank3
                    },
                    {
                        name: 'rank4',
                        type: 'line',
                        stack: 'Total',
                        data: this.echartsData.rank4
                    },
                    {
                        name: 'rank5',
                        type: 'line',
                        stack: 'Total',
                        data: this.echartsData.rank5
                    }
                ]
            };
            this.chart.setOption(option)
        });
    },
    /** 查询rank票列表 */
    getList() {
      this.loading = true;
      listSam(this.queryParams).then(response => {
        this.samList = response.rows;
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
        id: null,
        code: null,
        rate: null,
        startTime: null,
        endTime: null,
        key: null,
        rank: null,
        type: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加rank票";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getSam(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改rank票";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateSam(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSam(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$confirm('是否确认删除rank票编号为"' + ids + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delSam(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有rank票数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.exportLoading = true;
          return exportSam(queryParams);
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

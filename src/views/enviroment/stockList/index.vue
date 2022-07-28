<template>
  <div class="app-container">

    <div style="margin-bottom: 20px;">
      <div class="selectBox">
        <div class="selectBoxLeft">
          是否刷缓存
        </div>
        <div class="selectBoxRight">
          <el-select v-model="queryParams.cacheFlag" placeholder="是否刷缓存" @change="getList">
            <el-option v-for="item in options" :key="item.value" :label="item.label" 
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="selectBoxTitle">
          谨慎刷新，15秒以上，建议一个月刷一次
        </div>
        <el-input  v-model="st" label-width="120px"></el-input>
        <el-input  v-model="et" label-width="120px"></el-input>
      </div>
    </div>
    <el-table :data="cameraList" v-loading="loading">
      <el-table-column label="code" align="center" prop="code" />
      <el-table-column label="factor2" align="center" prop="factor2" />
      <el-table-column label="marketv2" align="center" prop="marketv2" />
      <el-table-column label="tvsum" align="center" prop="tvsum" />
      <el-table-column label="volumeSTD5" align="center" prop="volumeSTD5" />
      <el-table-column label="vwapavg" align="center" prop="vwapavg" />
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
import { getMonthValue3 } from '@/api/device/camera'
export default {
  name: 'stockList',
  components: {
  },
  data() {
    return {
      st: '',
      et: '',
      options: [{ value: 'y', lable: '是否' }, { value: 'n', lable: '是否' }],
      loading: false,

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
        cacheFlag: 'n'
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
    this.getList()
    this.st = this.getNowFormatDate();
    this.et = this.getNowFormatDate();
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
    /** 查询监控设备列表 */
    getList() {
      this.loading = true
      this.queryParams.st=this.st
      this.queryParams.et=this.et
      getMonthValue3(this.queryParams).then(response => {
        this.loading = false
        this.cameraList = response
      })
    },
  }
}
</script>

<style>
.selectBox {
  display: flex;
}

.selectBox .selectBoxLeft {
  line-height: 34px;
  margin-right: 15px;
  font-size: 18px;
}

.selectBox .selectBoxRight {}

.selectBox .selectBoxTitle {
  line-height: 34px;
  margin-left: 15px;
  font-size: 14px;
  color: red;
}
</style>

<template>
  <div class="app-container">
    <el-table :data="cameraList" v-loading="loading">
      <el-table-column label="description" align="center" prop="description" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="name" align="center" prop="name" />
      <el-table-column label="startTime" align="center" prop="startTime" />
      <el-table-column label="state" align="center" prop="state" />
      <el-table-column label="completeTime" align="center" prop="completeTime" />
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="executeTask(scope.row.id)" type="text" size="small">
            执行
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
  </div>
</template>

<script>
import { taskList, executeTask } from '@/api/device/camera'
export default {
  name: 'stockList',
  components: {
  },
  data() {
    return {
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

  },
  methods: {
    /** 查询监控设备列表 */
    getList() {
      this.loading = true
      taskList(this.queryParams).then(response => {
        this.loading = false
        this.cameraList = response.data
      })
    },

    executeTask(id) {
      this.loading = true
      executeTask({ id: id }).then(response => {
        this.loading = false
        this.$message({
          message: '执行【'+id+'】号定时器成功!',
          type: 'success'
        });
        this.getList()
      })
    }
  }
}
</script>

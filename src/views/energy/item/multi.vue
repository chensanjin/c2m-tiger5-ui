<template>
  <div class="" style="width: 100%">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddEnergyPriceItem">添加</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDeleteEnergyPriceItem">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" icon="el-icon-success" size="mini" @click="handleSaveEnergyPriceItem">保存</el-button>
      </el-col>
    </el-row>
    <el-table ref="energyPriceItem" :data="energyPriceItemList" :row-class-name="rowEnergyPriceItemIndex" @selection-change="handleEnergyPriceItemSelectionChange">
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column label="序号" align="center" prop="index" width="50" />
      <el-table-column label="峰谷平类型" prop="type">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" placeholder="请输入峰谷平类型">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="开始时间点" prop="startHour">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.startHour" placeholder="请输入开始时间点" />
        </template>
      </el-table-column>
      <el-table-column label="结束时间点" prop="endHour">
        <template slot-scope="scope">
          <el-input v-model.number="scope.row.endHour" placeholder="请输入结束时间点" />
        </template>
      </el-table-column>
      <el-table-column label="单价" prop="perPrice">
        <template slot-scope="scope">
          <el-input v-model="scope.row.perPrice" placeholder="请输入单价" />
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark">
        <template slot-scope="scope">
          <el-input v-model="scope.row.remark" placeholder="请输入备注" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { addPriceItem, listPriceItemNoPage } from '@/api/energy/priceItem'

export default {
  name: 'EnergyItemPriceMulti',
  components: {
  },
  props: {
    priceId: {
      type: Number
    },
    scopeRowData: {
      type: Object
    }
  },
  data() {
    return {
      typeOptions: [],
      // 能耗价格谷峰平详情表格数据
      energyPriceItemList: [],
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
    listPriceItemNoPage({ priceId: this.priceId }).then(response => {
      this.energyPriceItemList = response.data
    })
    this.getDicts('energy_device_category').then(response => {
      this.categoryOptions = response.data
    })
    this.getDicts('elec_top_low_normal').then(response => {
      this.typeOptions = response.data
    })
  },
  methods: {
    /** 能耗价格谷峰平详情序号 */
    rowEnergyPriceItemIndex({ row, rowIndex }) {
      row.index = rowIndex + 1
    },
    /** 能耗价格谷峰平详情添加按钮操作 */
    handleAddEnergyPriceItem() {
      const obj = {}
      obj.priceId = this.priceId
      obj.type = ''
      // obj.startHour = "";
      // obj.endHour = "";
      // obj.perPrice = "";
      obj.remark = ''
      obj.delFlag = '0'
      this.energyPriceItemList.push(obj)
    },
    handleSaveEnergyPriceItem() {
      addPriceItem(this.energyPriceItemList).then(response => {
        this.$emit('handleSettingQuery', this.scopeRowData)
        console.info(this.scopeRowData)
        this.$message.success(response.msg)
      })
    },
    /** 能耗价格谷峰平详情删除按钮操作 */
    handleDeleteEnergyPriceItem() {
      if (this.checkedEnergyPriceItem.length == 0) {
        this.$alert('请先选择要删除的能耗价格谷峰平详情数据', '提示', { confirmButtonText: '确定' })
      } else {
        this.energyPriceItemList.splice(this.checkedEnergyPriceItem[0].index - 1, 1)
      }
    },
    /** 单选框选中数据 */
    handleEnergyPriceItemSelectionChange(selection) {
      if (selection.length > 1) {
        this.$refs.energyPriceItem.clearSelection()
        this.$refs.energyPriceItem.toggleRowSelection(selection.pop())
      } else {
        this.checkedEnergyPriceItem = selection
      }
    }
  }
}
</script>
<style scoped>

</style>

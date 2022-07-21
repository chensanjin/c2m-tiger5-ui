<template>
  <div class="table-main">
    <el-form ref="form" :model="form">
      <el-form-item label="单号:">
        <span>{{ form.planNo }}</span>
      </el-form-item>
    </el-form>

    <el-form ref="ruleForm" :model="ruleForm" label-width="0" inline-message>
      <el-table
        :data="ruleForm.tableData"
        :header-cell-style="headMerge"
        class="table-wrap"
      >
        <el-table-column label="开机时间" align="center" width="250">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.startupTime'"
              :rules="{
                required: true,
                message: '请输入开机时间',
                trigger: 'change'
              }"
            >
              <el-time-picker
                :key="$index"
                v-model="row.startupTime"
                placeholder="开机时间"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="收机时间" align="center" width="250">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.shutdownTime'"
              :rules="{
                required: true,
                message: '请输入收机时间',
                trigger: 'change'
              }"
            >
              <el-time-picker
                :key="$index"
                v-model="row.shutdownTime"
                :picker-options="{
                  minTime: row.startupTime
                }"
                placeholder="收机时间"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="物料名称" align="center" width="180">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.materialCode'"
              :rules="{
                required: true,
                message: '请输入物料名称',
                trigger: 'change'
              }"
            >
              <el-select
                :key="$index"
                v-model="row.materialCode"
                size="mini"
                placeholder="请选择物料"
              >
                <el-option
                  v-for="item in materialList"
                  :key="item.materialCode"
                  :label="item.materialNameCn"
                  :value="item.materialCode"
                />
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column
          label="原料批次"
          prop="rowMaterialBatch"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <el-form-item
              :key="scope.row.key"
              :prop="'tableData.' + scope.$index + '.rowMaterialBatch'"
              :rules="{
                required: true,
                message: '请输入原料批次',
                trigger: 'change'
              }"
            >
              <el-input
                v-model="scope.row.rowMaterialBatch"
                v-enter-number
                size="small"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="原料投入量(kg)" align="center">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.input'"
              :rules="{
                required: true,
                message: '请输入原料投入量',
                trigger: 'change'
              }"
            >
              <el-input v-model="row.input" v-enter-number size="small" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="产出(kg)" align="center" width="180">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.Output'"
              :rules="{
                required: true,
                message: '请输入产品',
                trigger: 'change'
              }"
            >
              <el-input v-model="row.Output" v-enter-number size="small" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="不良品重量(kg)" align="center">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.rejects'"
              :rules="{
                required: true,
                message: '请输入不良品重量',
                trigger: 'change'
              }"
            >
              <el-input v-model="row.rejects" v-enter-number size="small" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="人工工时(h)" align="center">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.laborHours'"
              :rules="{
                required: true,
                message: '请输入人工工时',
                trigger: 'change'
              }"
            >
              <el-input v-model="row.laborHours" v-enter-number size="small" />
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column label="机器工时(h)" align="center">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.machineHours'"
              :rules="{
                required: true,
                message: '请输入机器工时',
                trigger: 'change'
              }"
            >
              <el-input
                v-model="row.machineHours"
                v-enter-number
                size="small"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="程序耗时(h)" align="center">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.programHours'"
              :rules="{
                required: true,
                message: '请输入程序耗时',
                trigger: 'change'
              }"
            >
              <el-input
                v-model="row.programHours"
                v-enter-number
                size="small"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="额定功率(kw.h)" align="center">
          <template slot-scope="{ row, $index }">
            <el-form-item
              :key="row.key"
              :prop="'tableData.' + $index + '.ratedPower'"
              :rules="{
                required: true,
                message: '请输入额定功率',
                trigger: 'change'
              }"
            >
              <el-input v-model="row.ratedPower" v-enter-number size="small" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot-scope="{ $index }">
            <div class="btn-wrap">
              <i
                class="el-icon-circle-plus-outline icon"
                @click="handleAddDomain"
              />
              <i
                v-if="ruleForm.tableData.length !== 1"
                class="el-icon-remove-outline icon"
                @click.prevent="() => handleRemoveDomain($index)"
              />
              <!-- <el-button
                type="primary"
                @click="submitForm('ruleForm')"
              >保存</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { getMaterial } from '@/api/datav/index.js'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      materialList: [],
      ruleForm: {
        tableData: [
          {
            productName: this.$store.state.planInfo.info.productName,
            productCode: this.$store.state.planInfo.info.productCode,
            workshopCode: this.$route.meta.workshopCode,

            startupTime: '',
            shutdownTime: '',
            materialCode: '',
            // materialNameCn: '',
            rowMaterialBatch: '',
            input: '',
            Output: '',
            rejects: '',
            laborHours: '',
            machineHours: '',
            ratedPower: '',
            programHours: '',
            key: Date.now()
          }
        ]
      },
      rules: {
        rowMaterialBatch: [
          { required: true, message: '原料批次', trigger: 'change' }
        ]
      },
      form: {
        id: this.$store.state.tableRow.teaTableId,
        planNo: this.$store.state.planInfo.info.planCode,
        workshopCode: 'TD-01',
        procedureCode: 'T-03',
        productCode: this.$store.state.planInfo.info.productCode,
        content: ''
      },
      codes: [],
      lines: [],
      numbers: []
    }
  },
  computed: {
    ...mapState({
      teaTableList: state => state.tableRow.teaTableList
    })
  },
  watch: {
    teaTableList: {
      handler(teaTableList) {
        if (teaTableList?.length > 0) {
          this.ruleForm.tableData = JSON.parse(JSON.stringify(teaTableList))
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.$store.state.tableRow.teaTableList?.length > 0) {
      this.ruleForm.tableData = JSON.parse(JSON.stringify(this.teaTableList))
    }

    this.fetchMaterialList()
  },

  methods: {
    /**
     * @description: 小数点后两位number
     * @param {*} e
     * @return {*}
     */
    filterInputOnlyFloat(e) {
      console.log(e.target.value)
      // e.target.value.replace(/[^\d.]/g, '')
      e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      // e.target.value = e.target.value.match(/^\d*(\.?\d{0,1})/g)[0] || null
    },
    submitForm() {
      let isValid = false
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          isValid = true
        } else {
          isValid = false
        }
      })
      return isValid
    },
    async fetchMaterialList() {
      const _this = this
      const res = await getMaterial({
        procedureCode: 'T-03',
        productCode: this.$store.state.planInfo.info.productCode
      })
      this.$nextTick(() => {
        this.materialList = [...res.data]
      })
      _this.$forceUpdate()
    },
    handleRemoveDomain(index) {
      this.ruleForm.tableData.splice(index, 1)
    },
    handleAddDomain() {
      if (!this.ruleForm.tableData) {
        this.ruleForm.tableData = []
      }
      const tableRecord = {
        startupTime: '',
        shutdownTime: '',
        materialCode: '',
        materialNameCn: '',
        rowMaterialBatch: '',
        input: '',
        Output: '',
        rejects: '',
        laborHours: '',
        machineHours: '',
        ratedPower: '',
        programHours: '',
        key: Date.now()
      }

      this.ruleForm.tableData.push(tableRecord)
    },
    /**
     * @description: 合并头部单元格
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     * @return {*}
     */
    headMerge({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 1 && columnIndex >= 2 && columnIndex <= 9) {
        return { color: '#7C9CB5', background: '#3E556B !important' }
      }
      if (rowIndex === 1) {
        return { color: '#7C9CB5', background: '#3E556B !important' }
        // if (columnIndex === 0 || columnIndex === 1) {
        //   return { display: 'none' }
        // }
      } else {
        return { color: '#7C9CB5' }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/views/dataV/styles/form.scss'; //form css
@import '~@/views/dataV/styles/table.scss'; //table css

.table-main {
  width: 100%;
  height: 100%;

  &-line {
    width: 100%;
    height: 0.1rem;
    background-color: #576f85;
    margin: 2rem 0;
  }

  .table-wrap {
    ::v-deep .el-table__row td:last-child,
    .el-table__header-wrapper tr th:last-child {
      border: none;
    }
    ::v-deep .el-table__header-wrapper tr th:nth-last-child(2) {
      border: none;
    }
    .btn-wrap {
      display: flex;
      justify-content: space-evenly;
      .icon {
        font-size: 2.3rem;
        cursor: pointer;
      }
    }
  }
}

::v-deep .el-input-number div input {
  text-align: left;
}
</style>

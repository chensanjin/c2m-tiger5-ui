<template>
  <div class="table-main">
    <el-form
      ref="dynamicValidateForm"
      :model="dynamicValidateForm"
      class="dynamic-table"
      label-width="0"
    >
      <el-table
        :data="dynamicValidateForm.domains"
        :span-method="objectSpanMethod"
        :header-cell-style="headMerge"
        :cell-style="cellStyle"
        cell-class-name="cell-item"
        height="100%"
      >
        <el-table-column label="" align="center">
          <el-table-column
            label=""
            prop="SCORE"
            width="150"
            align="center"
          />
          <el-table-column
            label=""
            prop="CONTENT"
            width="150"
            align="center"
          />
        </el-table-column>
        <!-- <el-table-column
          label="主体"
          prop="INDEX"
          width="60"
          align="center"
        ></el-table-column> -->

        <el-table-column label="C1" align="center">
          <el-table-column label="预制" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.m1.yz">
                {{ scope.row.m1.yz[scope.row.key] }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="填充" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.m1.tc">
                {{ scope.row.m1.tc[scope.row.key] }}
              </template>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="C2" align="center">
          <el-table-column label="预制" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.m2.yz">
                {{ scope.row.m2.yz[scope.row.key] }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="填充" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.m2.tc">
                {{ scope.row.m2.tc[scope.row.key] }}
              </template>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="总" align="center">
          <el-table-column label="预制" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.total.yz">
                {{ scope.row.total.yz[scope.row.key] }}
              </template>
            </template>
          </el-table-column>
          <el-table-column label="填充" align="center">
            <template slot-scope="scope">
              <template v-if="scope.row.total.tc">
                {{ scope.row.total.tc[scope.row.key] }}
              </template>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { preFillingList } from '@/api/datav'
import { planTableList } from './_data'
export default {
  data() {
    return {
      queryParams: {
        planNo: this.$store.state.planInfo.info.planCode, // 计划单号
        technologyCode: 'CT-02', // 车间编号
        workshopCode: this.$route.meta.workshopCode, // 工艺编号（例如干混预置填充的编号）
        productCode: this.$store.state.planInfo.info.productCode, // 产品编号
        planTime: this.$store.state.planInfo.time // 计划生产日期
      },
      CONSTANT: {
        M1CODE: 'pl20210005',
        M2CODE: 'pl20210006',

        TOTALCODE: 'total'
      },

      list: [],
      listLoading: true,
      dynamicValidateForm: {
        domains: []
      },
      spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
      pos: 0, // spanArr 的索引
      contentSpanArr: [],
      position: 0,
      tableData: []
    }
  },
  computed: {
    ...mapState({
      planInfo: (state) => state.planInfo.info
    }),
    basePlanTableList() {
      return [...planTableList]
    }
  },
  watch: {
    planInfo: {
      handler(info) {
        if (Object.keys(info).length > 0) {
          this.queryParams.planNo = info.planCode
          this.queryParams.productCode = info.productCode
          this.getPreFillingList()
        }
      },
      immediate: true
    }
  },

  created() {
    this.tableData = JSON.parse(JSON.stringify(this.basePlanTableList))
  },
  methods: {
    async getPreFillingList() {
      const res = await preFillingList(this.queryParams)
      const tableList = JSON.parse(JSON.stringify(this.basePlanTableList))
      // const { M1CODE, M2CODE, TOTALCODE } = this.CONSTANT
      const result = res.data
      if (result) {
        tableList.forEach((item, index) => {
          for (const key in result) {
            if (key === item.INDEX) {
              result[key].forEach((it) => {
                if (it.procedureCode === 'CO-04') {
                  if (it.lineCode === 'CL-02C1') {
                    item.m1.yz = it
                  } else if (it.lineCode === 'CL-02C2') {
                    item.m2.yz = it
                  } else if (it.lineCode === 'total') {
                    item.total.yz = it
                  }
                } else {
                  if (it.lineCode === 'CL-02C1') {
                    item.m1.tc = it
                  } else if (it.lineCode === 'CL-02C2') {
                    item.m2.tc = it
                  } else if (it.lineCode === 'total') {
                    item.total.tc = it
                  }
                }
              })
            }
          }
        })
        this.tableData = Object.assign([], tableList)
      } else {
        this.tableData = Object.assign([], this.basePlanTableList)
      }
      this.getList()
    },
    /**
     * @description: 单元格样式
     * @param {*}
     * @return {*}
     */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 1 && columnIndex > 0) {
        if (columnIndex === 1) {
          return { color: '#7C9CB5', background: '#131F2C' }
        }
        return { background: '#131F2C' }
      }
      if (columnIndex === 1) {
        return { color: '#7C9CB5' }
      }
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
        return { color: '#7C9CB5', background: '#223141 !important' }
      }
      if (rowIndex === 0 && columnIndex >= 1 && columnIndex <= 9) {
        return { fontSize: '1.8rem !important' }
      }

      if (rowIndex === 1) {
        if (columnIndex >= 2 && columnIndex <= 9) {
          return { color: '#7C9CB5', background: '#223141 !important' }
        }
        if (columnIndex === 0 || columnIndex === 1) {
          return { display: 'none' }
        }
      }

      if (rowIndex === 0) {
        if (columnIndex === 0) {
          this.$nextTick(() => {
            if (document.getElementsByClassName(column.id).length !== 0) {
              document
                .getElementsByClassName(column.id)[0]
                .setAttribute('rowSpan', 4)
              return false
            }
          })
          return column
        }
      }
    },
    // 合并单元格
    objectSpanMethod({ rowIndex, columnIndex, ...data }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if (columnIndex === 1) {
        const _row = this.contentSpanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    getList() {
      this.dynamicValidateForm.domains = this.tableData || []
      // 设定一个数组spanArr/contentSpanArr来存放要合并的格数，同时还要设定一个变量pos/position来记录
      this.spanArr = []
      this.contentSpanArr = []
      for (let i = 0; i < this.tableData.length; i += 1) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
          this.contentSpanArr.push(1)
          this.position = 0
        } else {
          // 判断当前元素与上一个元素是否相同(第1和第2列)
          if (this.tableData[i].INDEX === this.tableData[i - 1].INDEX) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
          // 判断当前元素与上一个元素是否相同(第3列)
          this.contentSpanArr.push(1)
          this.position = i
          // if (this.tableData[i].SCORE === this.tableData[i - 1].SCORE) {
          //   this.contentSpanArr[this.position] += 1;
          //   this.contentSpanArr.push(0);
          // } else {
          //   this.contentSpanArr.push(1);
          //   this.position = i;
          // }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/table.scss";

.table-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .dynamic-table {
    height: 100px;
    flex: 1;
    margin-bottom: 1.9rem;
  }

  // ::v-deep .cell-item {
  //   padding: 0.3rem 0;
  //   height: 1.2rem;
  // }
  ::v-deep.el-table thead.is-group th {
    background: rgba(233, 238, 243, 0.2);
  }
  ::v-deep.el-table thead.is-group tr:first-of-type th {
    overflow: hidden;
  }

  ::v-deep.el-table thead.is-group tr:first-of-type th:first-of-type:before {
    content: "统计";
    display: inline-block;
    text-align: left;
    position: absolute;
    width: 15rem;
    // height: 100%;
    /* height: 1px; */
    bottom: 0;
    left: 0;
    font-size: 1.6rem;
    font-weight: normal;
    padding-left: 5rem;
    padding-bottom: 1rem;
  }

  ::v-deep.el-table thead.is-group tr:first-of-type th:first-of-type:after {
    content: "工序";
    display: inline-block;
    text-align: right;
    position: absolute;
    width: 15rem;
    // height: 100%;
    // top: 1rem;
    right: 0;
    top: 0;
    font-size: 1.6rem;
    font-weight: normal;
    padding-right: 5rem;
    padding-top: 1rem;
  }

  ::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type .cell {
    position: absolute;
    top: 0;
    left: 0;
    width: 60rem;
    height: 1px;
    background-color: rgba(233, 238, 243, 0.2);
    display: block;
    text-align: center;
    transform: rotate(16deg);
    transform-origin: top left;
  }
  @media screen and (max-width: 1920px) {
    ::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type:before,
    ::v-deep .el-table thead.is-group tr:first-of-type th:first-of-type:after {
      font-size: 1.8rem;
    }
  }
}
</style>

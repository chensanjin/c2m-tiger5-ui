<template>
  <div class="app-container">
    <el-button type="default" @click="edit">补录编辑</el-button>
    <el-calendar v-if="refresh" ref="cal" v-model="nowDate">
      <template
        slot="dateCell"
        slot-scope="{date, data}"
      >
        <div :class="existDay(data.day) ? 'is-selected' : ''" style="position:relative;height: 100%;width: 70%" @click="togglePickUp(date,data)">
          {{ data.day.split('-').slice(1).join('-') }} {{ existDay(data.day) ? '✔️' : '' }}
          <p v-show="false">{{ initGird(data) }}</p>
          <br>
          <span v-if="data.extend" class="sp">表计读数：{{ data.extend.readCount }}
            {{ energyType==='ElectricityMeter'?'kw/h':'' }}
            {{ energyType==='WaterMeter'?'t':'' }}
            {{ energyType==='NaturalGasMeter'?'m³':'' }}
            {{ energyType==='SteamMeter'?'t':'' }}
          </span>
          <br>
          <span v-if="data.extend" class="sp">用量：{{ data.extend.useCount }}
            {{ energyType==='ElectricityMeter'?'kw/h':'' }}
            {{ energyType==='WaterMeter'?'t':'' }}
            {{ energyType==='NaturalGasMeter'?'m³':'' }}
            {{ energyType==='SteamMeter'?'t':'' }}
          </span>
        </div>
        <div v-if="data.extend" :class="'rtp_'+data.extend.state"><span style="font-size: 10px;">{{ stateOptions(data.extend.state) }}</span></div>
        <!--        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
        </p>-->
      </template>
    </el-calendar>
    <el-dialog title="补录编辑" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" label-width="80px" :model="form">
        <el-row
          v-for="(day,index) in form.pickList"
          :key="day.readTime"
          :label="day.readTime"
          :value="day.readTime"
        >
          <el-col :span="12">
            <el-form-item label="日期" prop="readTime">
              <el-input v-model="form.pickList[index].readTime" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表计读数" prop="readCount">
              <el-input v-model="form.pickList[index].readCount" placeholder="请填写表计度数" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGirdData, supplement } from '@/api/device/history'

export default {
  components: {},
  // props: [],
  data() {
    return {
      refresh: true,
      form: {
        equipmentCode: this.$route.query.energyCode,
        equipmentType: this.$route.query.energyType,
        pickList: []
      },
      open: false,
      energyCode: this.$route.query.energyCode,
      energyType: this.$route.query.energyType,
      items: [], // 存储着所有数据的地方
      nowDate: ''

    }
  },
  computed: {},

  mounted: function() {
    getGirdData(this.energyCode, this.energyType, 'day', this.$refs.cal.curMonthDatePrefix).then(response => {
      this.items = response.data
    })
  },
  created() {
    this.$nextTick(() => {
      // 点击前一个月
      const prevBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(1)'
      )
      prevBtn.addEventListener('click', e => {
        /*          let d = new Date(this.timeValue);
          let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1));//2020-08*/
        console.info('上个月', this.$refs.cal.curMonthDatePrefix)
        this.initAll(this.$refs.cal.curMonthDatePrefix)
      })
      // 点击下一个月
      const nextBtn = document.querySelector(
        '.el-calendar__button-group .el-button-group>button:nth-child(3)'
      )
      nextBtn.addEventListener('click', e => {
        console.info('下个月', this.$refs.cal.curMonthDatePrefix)
        this.initAll(this.$refs.cal.curMonthDatePrefix)
        /*          let d = new Date(this.timeValue);
          let resDate = d.getFullYear() + '-' + this.handleTime((d.getMonth() + 1));//2020-10*/
      })
      // 点击今天
      /*        let todayBtn = document.querySelector(
          ".el-calendar__button-group .el-button-group>button:nth-child(2)"
        );
        todayBtn.addEventListener("click", e => {
          this.initAll(this.$refs.cal.curMonthDatePrefix)
          //this.$forceUpdate()
        })*/
    })
  },
  methods: {
    cancel() {
      this.open = false
    },
    initAll: function(month) {
      getGirdData(this.energyCode, this.energyType, 'day', month).then(response => {
        for (const index in response.data) {
          for (const iIndex in this.items) {
            if (this.items[iIndex].readTime === response.data[index].readTime) {
              this.items[iIndex] = response.data[index]
            }
          }
          // 判断当前回传的response中是否存在item.readTime一样的数据，如果存在就不插入了，如果不存在，就插入，
          // 说白了，是为了下个月上个月操作
          const newArr = this.items.filter(function(item) {
            return item.readTime === response.data[index].readTime
          })
          if (newArr.length === 0) {
            this.items.push(response.data[index])
          }
        }

        console.info('dsdsdsdsds', this.items)
      })
    },
    initGird: function(data) {
      // console.info("has i init?",data.day)
      for (const index in this.items) {
        if (this.items[index].readTime == data.day) {
          this.$set(data, 'extend', this.items[index])
          return
        }
      }
    },
    stateOptions(state) {
      if (state) {
        if (state === 1) {
          return '待补'
        }
        if (state === 2) {
          return '正常'
        }
        if (state === 3) {
          return '已补'
        }
        if (state === 4) {
          return '修改'
        }
      } else {
        return ''
      }
    },
    up(readTime) {
      return function(obj1, obj2) {
        /*          let val1 = obj1[name]
          let val2 = obj2[name]*/
        const val2 = new Date(obj2[readTime])
        const val1 = new Date(obj1[readTime])
        return val1 - val2
      }
    },
    edit: function() {
      if (this.form.pickList.length < 1) {
        this.$message.warning('请选择需要补录或编辑的日期')
        return
      }
      const _days = this.form.pickList.sort().map((d, i) => {
        // console.info(i)
        const dt = new Date(d['readTime'])
        dt.setDate(dt.getDate() + 4 - i) // 处理为相同日期
        return +dt
      })
      let temp_d = _days[0]
      for (const d in _days) {
        if (temp_d != _days[d]) {
          this.$message.error('编辑时间周期不能断层')
          return
        }
        temp_d = _days[d]
      }
      this.open = true
    },
    togglePickUp: function(date, data) {
      if (this.existDay(data.day)) {
        this.form.pickList.splice(this.form.pickList.map((d, i) => {
          return d['readTime']
        }).indexOf(data.day), 1)
      } else {
        let d = {
          'readTime': data.day
        }
        if (data.extend) {
          d = {
            'readTime': data.day,
            'readCount': data.extend.readCount
          }
        }
        this.form.pickList.push(d)
        this.form.pickList.sort(this.up('readTime'))
      }
    },
    existDay: function(targetDay) {
      return this.form.pickList.map((d, i) => {
        return d['readTime']
      }).indexOf(targetDay) >= 0
    },
    /** 提交按钮 */
    submitForm() {
      if (this.form.equipmentCode != null) {
        supplement(this.form).then(response => {
          this.msgSuccess('修改成功')
          this.open = false
          this.refresh = false
          this.initAll(this.$refs.cal.curMonthDatePrefix)
          setTimeout(() => {
            this.$nextTick(() => {
              console.info('has i do???')
              this.refresh = true
            })
          }, 100)
        })
      }
    }

  }
}
</script>
<style scoped>
  .is-selected {
    color: #1989FA;
  }
  .sp{
    font-size:14px
  }
  .radius{
    border-radius:50%
  }
  .rtp_4{
    position:relative;
    width: 30px;
    height: 30px;
    top:-70px;
    right:-185px;
    border-radius:50%;
    background-color: #40FFA3;
    vertical-align:middle;
    text-align:center
  }
  .rtp_3{
    position:relative;
    width: 30px;
    height: 30px;
    top:-70px;
    right:-185px;
    border-radius:50%;
    background-color: #40DFFF;
    vertical-align:middle;
    text-align:center
  }
  .rtp_1{
    position:relative;
    width: 30px;
    height: 30px;
    top:-70px;
    right:-185px;
    border-radius:50%;
    background-color: #FF9C40;
    vertical-align:middle;
    text-align:center
  }
  .rtp_2{
    position:relative;
    width: 30px;
    height: 30px;
    top:-70px;
    right:-185px;
    border-radius:50%;
    background-color: #A6FF40;
    vertical-align:middle;
    text-align:center
  }
</style>

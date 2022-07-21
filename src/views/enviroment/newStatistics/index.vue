<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">

      <el-form-item label="所属工厂" prop="areaId">
        <el-select v-model="queryParams.areaId" placeholder="请选择所属工厂" style="width: 200px">
          <el-option
            v-for="op in areaIdTableOptions"
            :key="op.id"
            :label="op.areaName"
            :value="op.id"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-date-picker
          v-model="searchDate"
          @change="timeChange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-tooltip class="item" effect="dark" content="显隐列" placement="top">
          <el-button size="mini" circle icon="el-icon-menu" @click="open=!open" />
        </el-tooltip>
      </el-form-item>

      <el-form-item>
        <el-checkbox-group v-model="checkList" @change="changeClick">
          <el-checkbox label="温度"></el-checkbox>
          <el-checkbox label="湿度"></el-checkbox>
          <el-checkbox label="洁净度"></el-checkbox>
          <el-checkbox label="沉降菌"></el-checkbox>
          <el-checkbox label="浮游菌"></el-checkbox>
          <el-checkbox label="尘埃粒子(≥0.5um)"></el-checkbox>
          <el-checkbox label="尘埃粒子(≥1um)"></el-checkbox>
          <el-checkbox label="尘埃粒子(≥5um)"></el-checkbox>
          <el-checkbox label="臭氧浓度"></el-checkbox>
          <el-checkbox label="氧气浓度"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <!--<el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        &lt;!&ndash;<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>&ndash;&gt;
      </el-form-item>-->

    </el-form>

    <el-dialog title="选择需要显示的车间" :visible.sync="open" width="700px" append-to-body>
      <template>
        <el-transfer
          v-model="needColumns"
          :data="columns"
          :titles="['所有车间', '需要显示车间']"
          :props="{
              key: 'workshopId',
              label: 'workshopName'
            }"
          :button-texts="['取出', '加入']"
          @change="handlerChangeColumns"
        />
      </template>
    </el-dialog>

    <el-table v-loading="loading"
              :data="leftData" :span-method="objectSpanMethod" border style="height: 100%">
      <el-table-column label="区域\数值\日期" prop="accTime" width="350" fixed="left" header-align="center" align="center">
        <el-table-column label="区域" header-align="center" align="center" width="30" prop="area"></el-table-column>
        <el-table-column label="产线" header-align="center" align="center" width="90" prop="line"></el-table-column>
        <el-table-column label="车间" header-align="center" align="center" width="230"
                         prop="workshopName"></el-table-column>

      </el-table-column>

      <el-table-column label="历史数据" width=35% header-align="center" align="center" v-if="envHistory.length>0">
        <el-table-column v-for="col in envHistory"
                         header-align="center"
                         align="center"
                         :label="col.time"
                         width="300"
                         :key="col.time">
          <el-table-column :label="col.week" header-align="center" align="center">
            <el-table-column label="温度" header-align="center" align="center" :prop="'his_te_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('温度') !== -1" width="140"
                             :formatter="getData"></el-table-column>
            <el-table-column label="湿度" header-align="center" align="center" :prop="'his_hu_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('湿度') !== -1" width="140"
                             :formatter="getData"></el-table-column>
            <el-table-column label="洁净度" header-align="center" align="center" :prop="'his_ifStandard_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('洁净度') !== -1" width="140"
                             :formatter="getData"></el-table-column>
            <el-table-column label="沉降菌(cfu/皿·30min)" header-align="center" :prop="'his_cfu_'+col.time" width="150"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('沉降菌') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="浮游菌(cfu/m³)" header-align="center" :prop="'his_ffu_'+col.time" width="120"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('浮游菌') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="尘埃粒子(≥0.5um)" header-align="center" :prop="'his_dust_'+col.time" width="130"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥0.5um)') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="尘埃粒子(≥1um)" header-align="center" :prop="'his_dust_'+col.time" width="120"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥1um)') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="尘埃粒子(≥5um)" header-align="center" :prop="'his_dustfive_'+col.time" width="120"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥5um)') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="臭氧浓度" header-align="center" :prop="'his_o3_'+col.time" align="center"
                             v-if="checkList.length === 0 || checkList.indexOf('臭氧浓度') !== -1"></el-table-column>
            <el-table-column label="氧气浓度" header-align="center" :prop="'his_oxygen_'+col.time" align="center"
                             v-if="checkList.length === 0 || checkList.indexOf('氧气浓度') !== -1"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column label="实时数据" width=20% header-align="center" align="center" v-if="envNow.length>0">
        <el-table-column v-for="col in envNow" header-align="center" align="center"
                         :label="col.time" width="300" :key="col.time">
          <el-table-column :label="col.week" header-align="center" align="center">
            <el-table-column label="温度" header-align="center" align="center" :prop="'re_te_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('温度') !== -1" width="250"
                             :formatter="getData"></el-table-column>
            <el-table-column label="湿度" header-align="center" align="center" :prop="'re_hu_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('湿度') !== -1" width="160"
                             :formatter="getData"></el-table-column>
            <el-table-column label="洁净度" header-align="center" align="center" :prop="'re_ifStandard_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('洁净度') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="沉降菌(cfu/皿·30min)" header-align="center" :prop="'re_cfu_'+col.time" width="150"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('沉降菌') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="浮游菌(ffu/m³)" header-align="center" :prop="'re_ffu_'+col.time" width="120"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('浮游菌') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="尘埃粒子(≥0.5um)" header-align="center" :prop="'re_dust_'+col.time" width="130"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥0.5um)') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="尘埃粒子(≥1um)" header-align="center" :prop="'re_dust_'+col.time" width="120"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥1um)') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="尘埃粒子(≥5um)" header-align="center" :prop="'re_dustfive_'+col.time" width="120"
                             align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥5um)') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="臭氧浓度" header-align="center" :prop="'re_o3_'+col.time" align="center"
                             v-if="checkList.length === 0 || checkList.indexOf('臭氧浓度') !== -1"
                             :formatter="getData"></el-table-column>
            <el-table-column label="氧气浓度" header-align="center" :prop="'re_oxygen_'+col.time" align="center"
                             v-if="checkList.length === 0 || checkList.indexOf('氧气浓度') !== -1"
                             :formatter="getData"></el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>

      <el-table-column label="预测数据" width=35% header-align="center" align="center" v-if="envFuture.length>0">
        <el-table-column v-for="col in envFuture" header-align="center" align="center"
                         :label="col.time" width="300" :key="col.time">
          <el-table-column :label="col.week" header-align="center" align="center">
            <el-table-column label="温度" header-align="center" align="center" :prop="'pre_te_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('温度') !== -1" width="160"
                             :formatter="getData"></el-table-column>
            <el-table-column label="湿度" header-align="center" align="center" :prop="'pre_hu_'+col.time"
                             v-if="checkList.length === 0 || checkList.indexOf('湿度') !== -1" width="160"
                             :formatter="getData"></el-table-column>
            <!--<el-table-column label="洁净度" header-align="center" align="center" :prop="'pre_ifStandard_'+col.time" v-if="checkList.length === 0 || checkList.indexOf('洁净度') !== -1"></el-table-column>
            <el-table-column label="沉降菌(cfu/皿·30min)" header-align="center" :prop="'pre_cfu_'+col.time" width="150"  align="center" v-if="checkList.length === 0 || checkList.indexOf('沉降菌') !== -1"></el-table-column>
            <el-table-column label="浮游菌(ffu/m³)" header-align="center" :prop="'pre_ffu_'+col.time"  width="120" align="center" v-if="checkList.length === 0 || checkList.indexOf('浮游菌') !== -1"></el-table-column>
            <el-table-column label="尘埃粒子(≥0.5um)" header-align="center" :prop="'pre_dust_'+col.time" width="130" align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥0.5um)') !== -1"></el-table-column>
            <el-table-column label="尘埃粒子(≥1um)" header-align="center" :prop="'pre_dust_'+col.time" width="120" align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥1um)') !== -1"></el-table-column>
            <el-table-column label="尘埃粒子(≥5um)" header-align="center" :prop="'pre_dustfive_'+col.time" width="120" align="center" v-if="checkList.length === 0 || checkList.indexOf('尘埃粒子(≥5um)') !== -1"></el-table-column>
            <el-table-column label="臭氧浓度" header-align="center" :prop="'pre_o3_'+col.time" align="center" v-if="checkList.length === 0 || checkList.indexOf('臭氧浓度') !== -1"></el-table-column>
            <el-table-column label="氧气浓度" header-align="center" :prop="'pre_oxygen_'+col.time" align="center" v-if="checkList.length === 0 || checkList.indexOf('氧气浓度') !== -1"></el-table-column>
          --></el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/jsx">
    import {getHeadLists, getLists} from "@/api/enviroment/statistics";
    import {listFactoryareaNoPage} from '@/api/phygrid/factoryarea';
    import moment from "moment"

    export default {
        data() {
            return {
                checkList: [ "温度", "湿度", "洁净度"],
                areaIdTableOptions: [],
                needColumns: [],
                open: false,
                searchDate: [],
                // 显示搜索条件
                showSearch: true,
                loading: true,
                // 总条数
                total: 0,

                spanArr: [], // 一个空的数组，用于存放每一行记录的合并数
                pos: 0, // spanArr 的索引
                contentSpanArr: [],
                position: 0,

                queryParams: {
                    /*pageNum: 1,
                    pageSize: 20,*/
                    startDate: '',
                    endDate: '',
                },
                pickerOptions: {
                    disabledDate: function (time) {
                        //时间比60天前大                                                     //时间比40天后肖
                        return time.getTime() <= (Date.now() - (24 * 60 * 60 * 1000*60)) || time.getTime() -Date.now() >= 40*1000*24*3600
                    },

                },
                columns: [],
                workshopIds: [],
                column: [],
                leftData: [],
                enviromentData: [],
                showColumns: [],
                tableData: [],
                timeList: [],
                envHistory: [],
                envNow: [],
                envFuture: [],
            }
        },
        mounted() {
            this.getEnviromentList();
        },
        created() {
            // this.checkList:[];
            this.getHeadsList('','All');
            this.initDtableOptions()// 初始化外联数据表
            this.getTime();
        },
        methods: {
            handlerChangeColumns(options) {
                // console.log(options)
                // for (const index in this.columns) {
                //     if (options.indexOf(this.columns[index].key) >= 0) {
                //         this.workshopIds.push(this.columns[index].key)
                //         console.info(this.workshopIds);
                //     }
                // }
                // let produceLineIds =[];
                // if(this.workshopIds){
                //     produceLineIds =this.workshopIds ;
                // }
                console.info("workshopIds",options.join(','));
                this.getEnviromentList(options);
                this.getHeadsList(options.join(','));
            },

            objectSpanMethod({
                                 rowIndex,
                                 columnIndex
                             }) {
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                } else if (columnIndex === 1) {
                    const _row = this.contentSpanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }

            },
            changeClick() {
                console.log(this.checkList)
            },
            timeChange() {
                if (this.searchDate && this.searchDate.length > 0) {
                    const history = [];
                    const now = [];
                    const futur = [];
                    let number = moment(this.searchDate[1]).diff(moment(this.searchDate[0]), 'days');
                    console.log(number)
                    for (let i = 0; i <= number; i++) {
                        let time = moment(this.searchDate[0]).add(i, 'days');
                        const obj = {
                            time: time.format('YYYY年MM月DD日'),
                            week: time.format('周d') === '周0' ? '周日' : time.format('周d') === '周1' ? '周一' : time.format('周d') === '周2' ? '周二' : time.format('周d') === '周3' ? '周三'
                                : time.format('周d') === '周4' ? '周四' : time.format('周d') === '周5' ? '周五' : time.format('周d') === '周6' ? '周六'
                                    : time.format('周d')
                        };
                        // console.log(i,time.format('YYYYMMDD'),time.diff(moment(), 'hours'))
                        if (time.format('YYYYMMDD') === moment().format('YYYYMMDD')) {
                            now.push(obj);
                        } else if (time.format('YYYYMMDD') > moment().format('YYYYMMDD')) {
                            futur.push(obj);
                        } else if(time.format('YYYYMMDD') < moment().format('YYYYMMDD')){
                            history.push(obj);
                        }
                    }
                    console.log(111)
                    console.log(futur,history,now)
                    this.envFuture = futur;
                    this.envHistory = history;
                    this.envNow = now;
                } else {
                    this.getTime();
                }
                this.getHeadsList();
                this.initDtableOptions();
                this.getEnviromentList();
            },
            getTime() {
                const history = [];
                const now = [];
                const futur = [];
                for (let i = -1; i < 8; i++) {
                    let time = moment().add(i, 'days');
                    if (i < 0) {
                        history.push({
                            time: time.format('YYYY年MM月DD日'),
                            week: time.format('周d') === '周0' ? '周日' : time.format('周d') === '周1' ? '周一' : time.format('周d') === '周2' ? '周二' : time.format('周d') === '周3' ? '周三'
                                : time.format('周d') === '周4' ? '周四' : time.format('周d') === '周5' ? '周五' : time.format('周d') === '周6' ? '周六'
                                    : time.format('周d')
                        })
                    } else if (i === 0) {
                        now.push({
                            time: time.format('YYYY年MM月DD日'),
                            week: time.format('周d') === '周0' ? '周日' : time.format('周d') === '周1' ? '周一' : time.format('周d') === '周2' ? '周二' : time.format('周d') === '周3' ? '周三'
                                : time.format('周d') === '周4' ? '周四' : time.format('周d') === '周5' ? '周五' : time.format('周d') === '周6' ? '周六'
                                    : time.format('周d')
                        })
                    } else {
                        futur.push({
                            time: time.format('YYYY年MM月DD日'),
                            week: time.format('周d') === '周0' ? '周日' : time.format('周d') === '周1' ? '周一' : time.format('周d') === '周2' ? '周二' : time.format('周d') === '周3' ? '周三'
                                : time.format('周d') === '周4' ? '周四' : time.format('周d') === '周5' ? '周五' : time.format('周d') === '周6' ? '周六'
                                    : time.format('周d')
                        })
                    }

                }
                ;
                this.envFuture = futur;
                this.envHistory = history;
                this.envNow = now;
            },
            initDtableOptions() {
                listFactoryareaNoPage({}).then(response => {
                    this.areaIdTableOptions = response.data
                })
            },
            getHeadsList(workshopIds,type) {
                let list = '';
                if (type !== 'All'){
                    list = workshopIds;
                }
                getHeadLists(list).then(response => {
                    if (type === 'All'){
                        this.columns = response.data;
                    }
                    this.leftData = response.data;
                    this.getSpanArr(this.leftData)
                });
            },
            getSpanArr(data) {
                this.spanArr = []
                this.contentSpanArr = []
                this.pos = 0
                this.position = 0

                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1)
                        this.pos = 0
                        this.contentSpanArr.push(1)
                        this.position = 0

                    } else {
                        // 判断当前元素与上一个元素是否相同(第1和第2列)
                        if (data[i].area === data[i - 1].area) {
                            this.spanArr[this.pos] += 1
                            this.spanArr.push(0)
                        } else {
                            this.spanArr.push(1)
                            this.pos = i
                        }
                        // 判断当前元素与上一个元素是否相同(第3列)
                        if (data[i].line === data[i - 1].line) {
                            this.contentSpanArr[this.position] += 1
                            this.contentSpanArr.push(0)
                        } else {
                            this.contentSpanArr.push(1)
                            this.position = i
                        }
                    }
                }
            },
            getEnviromentList(workshopIds) {
                this.loading = true;
                let startTime;
                let endTime;

                if (this.searchDate){
                    startTime = this.searchDate[0];
                    endTime = this.searchDate[1];
                }

                getLists(startTime,endTime,workshopIds).then(response => {
                    this.enviromentData = response.data;
                    this.loading = false
                });
            },
            handleQuery() {
                console.info("执行无效查询")
            },
            getData(row, column) {
                //.info(column.property)
                const workshopId = row.workshopId
                const category = column.property.split('_')[0]
                const type = column.property.split('_')[1]
                const time = column.property.split('_')[2]
                if (category === "pre") {
                    return this.preData(type, time, workshopId)
                }
                if (category === "re") {
                    return this.realData(type, time, workshopId)
                }
                if (category === "his") {
                    return this.hisData(type, time, workshopId)
                }
            },
            preData(type, time, workshopId) {
                // console.log(this.enviromentData.envFuture.)
                if (!this.enviromentData.envFuture) {
                    return "-"
                }
                if (type === 'ifStandard') {
                    if (-1 === this.enviromentData.envFuture[time][workshopId][type]) {
                        return "-"
                    }
                    if (0 === this.enviromentData.envFuture[time][workshopId][type]) {
                        return (<span style="color:#ff5a5a">{"达标"}</span>)
                    }
                    if (1 === this.enviromentData.envFuture[time][workshopId][type]) {
                        return (<span style="color:#29ed65">{"未达标"}</span>)
                    }
                } else {
                   // let envFuture = this.enviromentData.envFuture[time][workshopId][type];
                   //  let split = envFuture.split("/");
                    // split.get(0)
                    return this.enviromentData.envFuture[time][workshopId][type];
                     // return (<span style='color:red'>{split[0]}</span>)
                }
            },
            hisData(type, time, workshopId) {
                // if (!this.enviromentData.envHistory&&this.enviromentData.envHistory.length>0) {
                if (!this.enviromentData.envHistory) {
                    return "-"
                }

                if (type === 'ifStandard') {
                    //console.info(this.enviromentData.envHistory[time][workshopId][type])
                    if (-1 === this.enviromentData.envHistory[time][workshopId][type]) {
                        return "-"
                    }
                    if (0 === this.enviromentData.envHistory[time][workshopId][type]) {
                        // return "达标"
                        return (<span style="color:#ff5a5a">{"达标"}</span>)
                    }
                    if (1 === this.enviromentData.envHistory[time][workshopId][type]) {
                        // return "未达标"
                        return (<span style="color:#29ed65">{"未达标"}</span>)
                    }
                } else {
                    let envHistoryElementElementElement = this.enviromentData.envHistory[time][workshopId][type];
                    if(envHistoryElementElementElement.indexOf('/') !== -1){
                        let split = envHistoryElementElementElement.split("/");
                        if(split[2].indexOf('-')){    //负偏差
                            return (<div><span style="color:#696969">{split[0]}</span>/<span style='color:#e4a41b'>{split[1]}</span>/<span style='color:#ff5a5a'>{split[2]}</span></div>)
                        }else {
                            return (<div><span style="color:#696969">{split[0]}</span>/<span style='color:#e4a41b'>{split[1]}</span>/<span style='color:#00e4ff'>{split[2]}</span></div>)
                        }

                    }else {
                        return this.enviromentData.envHistory[time][workshopId][type]
                    }
                    // return this.enviromentData.envHistory[time][workshopId][type]
                }
            },
            realData(type, time, workshopId) {
                // if (!this.enviromentData.envNow&&this.enviromentData.envNow.length>0) {
                if (!this.enviromentData.envNow) {
                    return "-"
                }
                if (type === 'ifStandard') {
                    if (-1 === this.enviromentData.envNow[time][workshopId][type]) {
                        return "-"
                    }
                    if (0 === this.enviromentData.envNow[time][workshopId][type]) {
                        return (<span style="color:#ff5a5a">{"达标"}</span>)
                    }
                    if (1 === this.enviromentData.envNow[time][workshopId][type]) {
                        return (<span style="color:#29ed65">{"未达标"}</span>)
                    }
                } else {
                    let envNowElementElementElement = this.enviromentData.envNow[time][workshopId][type];
                    if(envNowElementElementElement.indexOf('/') !== -1){
                        if(envNowElementElementElement.indexOf('~') !== -1){
                            let split1 = envNowElementElementElement.split('~');
                            let split2 = split1[0].split('/');
                            let split3 = split1[1].split('/');
                            if(split1[1].split('/')[1].indexOf('-') !== -1){    //负偏差
                                return (<div><span style="color:#696969">{split2[0]}</span>/<span style='color:#d8e600'>{split2[1]}</span>~<span style='color:#e4a41b'>{split3[0]}</span>/<span style='color:#00e4ff'>{split3[1]}</span>/<span style='color:#3e9dff'>{split3[2]}</span></div>)
                            }else {
                                return (<div><span style="color:#696969">{split2[0]}</span>/<span style='color:#d8e600'>{split2[1]}</span>~<span style='color:#e4a41b'>{split3[0]}</span>/<span style='color:#ff5a5a'>{split3[1]}</span>/<span style='color:#3e9dff'>{split3[2]}</span></div>)
                            }

                        }else {
                            let split = envNowElementElementElement.split("/");
                            if(split[2].indexOf('-')){    //负偏差
                                return (<div><span style="color:#696969">{split[0]}</span>/<span style='color:#e4a41b'>{split[1]}</span>/<span style='color:#00e4ff'>{split[2]}</span>/<span style='color:#3e9dff'>{split[3]}</span></div>)
                            }else {
                                return (<div><span style="color:#696969">{split[0]}</span>/<span style='color:#e4a41b'>{split[1]}</span>/<span style='color:#ff5a5a'>{split[2]}</span>/<span style='color:#3e9dff'>{split[3]}</span></div>)
                            }
                        }

                    }else {
                        return this.enviromentData.envNow[time][workshopId][type]
                    }
                    // return this.enviromentData.envNow[time][workshopId][type]
                }
            }
        }
    }
</script>

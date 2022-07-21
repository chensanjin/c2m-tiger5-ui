import request from '@/utils/request'

/**
 * @description: 咖啡前处理
 * @param {*} planNo
 * @param {*} workshopCode
 * @param {*} procedureCode
 * @param {*} productCode
 * @return {*}
 */
export function coffeePretreatment({
  planNo,
  workshopCode,
  procedureCode,
  productCode,
  planTime
}) {
  return request({
    url: 'api/scream/getDetail/list',
    method: 'post',
    data: {
      planNo,
      workshopCode,
      procedureCode,
      productCode,
      planTime
    }
  })
}
/**
 * @description: 干混-预置填充
 * @param {*} planNo
 * @param {*} workshopCode
 * @param {*} technologyCode
 * @param {*} productCode
 * @param {*} planTime
 * @return {*}
 */
export function preFillingList({
  planNo,
  workshopCode,
  technologyCode,
  procedureCode,
  productCode,
  planTime
}) {
  return request({
    url: '/api/scream/getDetail/list',
    method: 'post',
    data: {
      planNo,
      workshopCode,
      technologyCode,
      productCode,
      planTime,
      procedureCode
    }
  })
}
/**
 * @description: 车间获取当日计划
 * @param {*}  workshopCode
 * @return {*}
 */
export function getPlanDeatils({
  workshopCode
}) {
  return request({
    url: `api/scream/planReport/getPlanDeatils`,
    method: 'post',
    data: {
      workshopCode
    }
  })
}
/**
 * @description: 干混-预置提交
 * @param {*} data
 * @return {*}
 */
export function saveWorkRecord(data) {
  return request({
    url: 'api/scream/workRecord/save',
    method: 'put',
    data: data
  })
}
/**
 * @description: 操作记录
 * @param {*}  workshopCode
 * @return {*}
 */
export function getOperationRecord({
  workshopCode
}) {
  return request({
    url: `api/scream/reportRecord/getRecord?workshopCode=${workshopCode}`,
    method: 'get'
  })
}

/**
 * @description: 车间操作记录
 * @param {*}  workshopCode
 * @return {*}
 */
export function getWorkshopRecord({
  workshopCode
}) {
  return request({
    url: 'api/scream/planReport/getRecords',
    method: 'post',
    data: {
      workshopCode
    }
  })
}

/**
 * @description: 人员
 * @param {*}  workshopCode
 * @return {*}
 */
export function getPeopleList({
  workshopCode
}) {
  return request({
    url: `api/scream/reportPeople/getPeople?workshopCode=${workshopCode}`,
    method: 'get'
  })
}

/**
 * @description: 车间操作手册接口
 * @param {*}  workshopCode
 * @return {*}
 */
export function getOperationManual({
  workshopCode
}) {
  return request({
    url: `api/scream/manual/list/${workshopCode}`,
    method: 'get'
  })
}

/**
 * @description: 生产大屏耗能统计-干混预置填充
 * @param {*} planNo
 * @param {*} planTime
 * @param {*} workshopCode
 * @param {*} productCode
 * @param {*} technologyCode
 * @return {*}
 */
export function energyConsumptionStatistics({
  planNo,
  planTime,
  workshopCode,
  productCode,
  technologyCode
}) {
  return request({
    url: 'api/scream/getDetail/listStatistics',
    method: 'post',
    data: {
      planNo,
      planTime,
      workshopCode,
      productCode,
      technologyCode
    }
  })
}

// /**
//  * @description: 获取人员内容
//  * @return {*}
//  */
//  export function getStaff () {
//   return request({
//     url: 'system/user/listCurrentFactoryUsers',
//     method: 'get'
//   })
// }
/**
 * @description: 获取人员内容
 * @return {*}
 */
export function getStaff({
  workshopCode
}) {
  return request({
    url: `system/user/listByWorkshopCode/${workshopCode}`,
    method: 'get'
  })
}

/**
 * @description: 人员保存
 * @param {*} workshopCode
 * @param {*} workshopName
 * @param {*} planNo
 * @param {*} supervisor
 * @param {*} operators
 * @return {*}
 */
export function saveStaff(data) {
  return request({
    url: 'api/scream/workRecord/savePeople',
    method: 'put',
    data: data
  })
}

/**
 * @description: 包装车间列表
 * @param {*} workshopCode
 * @param {*} productCode
 * @return {*}
 */
export function getWorkshopList({
  workshopCode
}) {
  return request({
    url: 'api/scream/planReport/getPlanReports',
    method: 'post',
    data: {
      workshopCode
    }
  })
}

/**
 * @description: 切换包装车间列表
 * @param {*} workshopCode
 * @param {*} productCode
 * @return {*}
 */
export function switchWorkshopList({
  workshopCode,
  productCode
}) {
  return request({
    url: 'api/scream/planReport/getPlanReports',
    method: 'post',
    data: {
      workshopCode,
      productCode
    }
  })
}

/**
 * @description: 包装车间回显
 * @param {*} workshopCode
 * @param {*} planCode
 * @return {*}
 */
export function getWorkshopBackDisplay({
  workshopCode,
  planCode
}) {
  return request({
    url: 'api/scream/planReport/getPlanReports',
    method: 'post',
    data: {
      workshopCode,
      planCode
    }
  })
}

/**
 * @description: 获取外界温度
 * @param {*}
 * @return {*}
 */
export function getLastWeather() {
  return request({
    url: 'api3D/scream/environment/getLastWeather',
    method: 'get'
  })
}
/**
 * @description: 获取车间温度
 * @param {*}
 * @return {*}
 */
export function getLastWorkShopEnv({
  workshopCode
}) {
  return request({
    url: `api3D/scream/environment/getLastWorkShopEnv/${workshopCode}`,
    method: 'get'
  })
}
/**
 * @description: 胶囊批次
 * @param {*} productCode
 * @return {*}
 */
export function getCapsulebatchNum({
  productCode
}) {
  return request({
    url: `api/scream/workRecord/getCapsulebatchNum?productCode=${productCode}`,
    method: 'get'
  })
}

/**
 * @description: 获取线体
 * @param {*} workshopCode
 * @return {*}
 */
export function getLines({
  workshopCode
}) {
  return request({
    url: `product/line/getLines?workshopCode=${workshopCode}`,
    method: 'get'
  })
}

/**
 * @description: 获取单号
 * @return {*}
 */
export function getListNoPage() {
  return request({
    url: '/api/scream/planReport/listNoPage',
    method: 'get'
  })
}

/**
 * @description: 填报包装
 * @param {*} data
 * @return {*}
 */
export function savePackage(data) {
  return request({
    url: '/api/scream/planReport/save',
    method: 'put',
    data: data
  })
}
/**
 * @description: 获取物料
 * @param {*} procedureCode
 * @param {*} productCode
 * @return {*}
 */
export function getMaterial({
  procedureCode,
  productCode
}) {
  return request({
    url: `api/scream/workRecord/selectByProcedureCodeAndProductCode?procedureCode=${procedureCode}&productCode=${productCode}`,
    method: 'get'
  })
}

/**
 * @description: 填报生豆清洗、研磨、烘焙
 * @param {*} data
 * @return {*}
 */
export function saveBeanClean(data) {
  return request({
    url: 'api/scream/workRecord/save',
    method: 'put',
    data: data
  })
}

/**
 * @description: 获取锅数
 * @param {*} procedureCode
 * @param {*} planNo
 * @param {*} planTime
 * @return {*}
 */
export function getPotQuantity({
  procedureCode,
  planNo,
  planTime
}) {
  return request({
    url: `api/scream/workRecord/getByPlanNoAndTime?procedureCode=${procedureCode}&planNo=${planNo}&planTime=${planTime}`,
    method: 'get'
  })
}

/**
 * @description: 获取每锅拼配
 * @return {*}
 */
export function getRatioPerPot() {
  return request({
    url: 'system/dict/data/type/coffee_baking_ratio_per_pot',
    method: 'get'
  })
}
/**
 * @description: 获取物料
 * @return {*}
 */
export function getWorkRecord({
  procedureCode,
  productCode
}) {
  return request({
    url: `/api/scream/workRecord/selectByProcedureCodeAndProductCode?procedureCode=${procedureCode}&productCode=${productCode}`,
    method: 'get'
  })
}

/**
 * @description: 回显
 * @param {*} workshopCode
 * @param {*} procedureCode
 * @param {*} productCode
 * @param {*} planNo
 * @param {*} planTime
 * @return {*}
 */
export function backDisplay({
  workshopCode,
  procedureCode,
  productCode,
  planNo,
  planTime
}) {
  return request({
    url: `api/scream/workRecord/getReportDetail?workshopCode=${workshopCode}&procedureCode=${procedureCode}&productCode=${productCode}&planNo=${planNo}&planTime=${planTime}`,
    method: 'get'
  })
}
/**
 * @description: 混料锅字典接口
 * @return {*}
 */
export function getMixmaterialpot() {
  return request({
    url: `/system/dict/data/type/mix_material_pot `,
    method: 'get'
  })
}

/**
 * @description: 回显接口
 * @return {*}
 */
export function getReportDetail({
  workshopCode,
  procedureCode,
  productCode,
  planNo,
  planTime
}) {
  return request({
    url: `api/scream/workRecord/getReportDetail`,
    method: 'get',
    params: {
      workshopCode,
      procedureCode,
      productCode,
      planNo,
      planTime
    }
  })
}
/**
 * @description: 人员回显
 * @return {*}
 */
export function getLastPeople({
  workshopCode,
  planTime
}) {
  return request({
    url: `api/scream/reportPeople/getPeople`,
    method: 'get',
    params: {
      workshopCode,
      planTime
    }
  })
}

/**
 * @description: 包装车间获取人员
 * @param {*} workshopCode
 * @return {*}
 */
export function getWorkshopPeoples({
  workshopCode
}) {
  return request({
    url: '/api/scream/planReport/getPeoples',
    method: 'post',
    data: {
      workshopCode
    }
  })
}

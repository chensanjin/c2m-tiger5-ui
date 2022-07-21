import request from '@/utils/request'

// 查询【中间】按小时清洗influxdb能耗数据列表
export function listHour(query) {
  return request({
    url: '/phygrid/hour/list',
    method: 'get',
    params: query
  })
}

// 查询【中间】按小时清洗influxdb能耗数据列表，非分页
export function listHourNoPage(query) {
  return request({
    url: '/phygrid/hour/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询【中间】按小时清洗influxdb能耗数据详细
export function getHour(id) {
  return request({
    url: '/phygrid/hour/' + id,
    method: 'get'
  })
}

// 新增【中间】按小时清洗influxdb能耗数据
export function addHour(data) {
  return request({
    url: '/phygrid/hour',
    method: 'post',
    data: data
  })
}

// 修改【中间】按小时清洗influxdb能耗数据
export function updateHour(data) {
  return request({
    url: '/phygrid/hour',
    method: 'put',
    data: data
  })
}

// 删除【中间】按小时清洗influxdb能耗数据
export function delHour(id) {
  return request({
    url: '/phygrid/hour/' + id,
    method: 'delete'
  })
}

// 导出【中间】按小时清洗influxdb能耗数据
export function exportHour(query) {
  return request({
    url: '/phygrid/hour/export',
    method: 'get',
    params: query
  })
}
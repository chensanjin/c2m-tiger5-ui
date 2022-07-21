import request from '@/utils/request'

// 查询设备历史记录列表
export function listHistory(query) {
  return request({
    url: '/device/history/list',
    method: 'get',
    params: query
  })
}

// 查询设备历史记录列表，非分页
export function listHistoryNoPage(query) {
  return request({
    url: '/device/history/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询设备历史记录详细
export function getHistory(id) {
  return request({
    url: '/device/history/' + id,
    method: 'get'
  })
}

// 新增设备历史记录
export function addHistory(data) {
  return request({
    url: '/device/history',
    method: 'post',
    data: data
  })
}

// 修改设备历史记录
export function updateHistory(data) {
  return request({
    url: '/device/history',
    method: 'put',
    data: data
  })
}

// 删除设备历史记录
export function delHistory(id) {
  return request({
    url: '/device/history/' + id,
    method: 'delete'
  })
}

// 导出设备历史记录
export function exportHistory(query) {
  return request({
    url: '/device/history/export',
    method: 'get',
    params: query
  })
}

export function getGirdData(equipmentCode,equipmentType,equipmentPeriod,readTime){
  return request({
    url:'/device/history/'+equipmentCode+'/'+equipmentType+'/'+equipmentPeriod+'/'+readTime,
    method:'get'
  })
}
export function supplement(data) {
  return request({
    url: '/device/history/supplement',
    method: 'post',
    data: data
  })
}


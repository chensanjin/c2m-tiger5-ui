import request from '@/utils/request'

// 查询传感设备管理列表
export function listSense(query) {
  return request({
    url: '/device/sense/list',
    method: 'get',
    params: query
  })
}

// 查询传感设备管理列表，非分页
export function listSenseNoPage(query) {
  return request({
    url: '/device/sense/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询传感设备管理详细
export function getSense(id) {
  return request({
    url: '/device/sense/' + id,
    method: 'get'
  })
}

// 新增传感设备管理
export function addSense(data) {
  return request({
    url: '/device/sense',
    method: 'post',
    data: data
  })
}

// 修改传感设备管理
export function updateSense(data) {
  return request({
    url: '/device/sense',
    method: 'put',
    data: data
  })
}

// 删除传感设备管理
export function delSense(id) {
  return request({
    url: '/device/sense/' + id,
    method: 'delete'
  })
}

// 导出传感设备管理
export function exportSense(query) {
  return request({
    url: '/device/sense/export',
    method: 'get',
    params: query
  })
}

export function getSN(){
  return request({
    url: '/device/sense/sn',
    method: 'get'
  })
}

// 刷新设备缓存
export function handleRefreshSenseCache() {
  return request({
    url: '/device/sense/refreshSenseCache',
    method: 'delete'
  })
}

import request from '@/utils/request'

// 查询臭氧设备手抄列表
export function listSenseo3report(query) {
  return request({
    url: '/v2/sense/o3history/list',
    method: 'get',
    params: query
  })
}

// 查询臭氧设备手抄列表，非分页
export function listSenseo3reportNoPage(query) {
  return request({
    url: '/v2/sense/o3history/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询臭氧设备手抄详细
export function getSenseo3report(id) {
  return request({
    url: '/v2/sense/o3history/' + id,
    method: 'get'
  })
}

// 新增臭氧设备手抄
export function addSenseo3report(data) {
  return request({
    url: '/v2/sense/o3history',
    method: 'post',
    data: data
  })
}

// 修改臭氧设备手抄
export function updateSenseo3report(data) {
  return request({
    url: '/v2/sense/o3history',
    method: 'put',
    data: data
  })
}

// 删除臭氧设备手抄
export function delSenseo3report(id) {
  return request({
    url: '/v2/sense/o3history/' + id,
    method: 'delete'
  })
}

// 导出臭氧设备手抄
export function exportSenseo3report(query) {
  return request({
    url: '/v2/sense/o3history/export',
    method: 'get',
    params: query
  })
}
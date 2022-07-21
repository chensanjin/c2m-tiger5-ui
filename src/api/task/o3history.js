import request from '@/utils/request'

// 查询臭氧历史数据列表
export function listO3history(query) {
  return request({
    url: '/sense/o3history/list',
    method: 'get',
    params: query
  })
}

// 查询臭氧历史数据列表，非分页
export function listO3historyNoPage(query) {
  return request({
    url: '/sense/o3history/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询臭氧历史数据详细
export function getO3history(id) {
  return request({
    url: '/sense/o3history/' + id,
    method: 'get'
  })
}

// 新增臭氧历史数据
export function addO3history(data) {
  return request({
    url: '/sense/o3history',
    method: 'post',
    data: data
  })
}

// 修改臭氧历史数据
export function updateO3history(data) {
  return request({
    url: '/sense/o3history',
    method: 'put',
    data: data
  })
}

// 删除臭氧历史数据
export function delO3history(id) {
  return request({
    url: '/sense/o3history/' + id,
    method: 'delete'
  })
}

// 导出臭氧历史数据
export function exportO3history(query) {
  return request({
    url: '/sense/o3history/export',
    method: 'get',
    params: query
  })
}

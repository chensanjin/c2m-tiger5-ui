import request from '@/utils/request'

// 查询班组管理列表
export function listWorkteam(query) {
  return request({
    url: '/product/workteam/list',
    method: 'get',
    params: query
  })
}

// 查询班组管理列表，非分页
export function listWorkteamNoPage(query) {
  return request({
    url: '/product/workteam/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询班组管理详细
export function getWorkteam(id) {
  return request({
    url: '/product/workteam/' + id,
    method: 'get'
  })
}

// 新增班组管理
export function addWorkteam(data) {
  return request({
    url: '/product/workteam',
    method: 'post',
    data: data
  })
}

// 修改班组管理
export function updateWorkteam(data) {
  return request({
    url: '/product/workteam',
    method: 'put',
    data: data
  })
}

// 删除班组管理
export function delWorkteam(id) {
  return request({
    url: '/product/workteam/' + id,
    method: 'delete'
  })
}

// 导出班组管理
export function exportWorkteam(query) {
  return request({
    url: '/product/workteam/export',
    method: 'get',
    params: query
  })
}
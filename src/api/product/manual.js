import request from '@/utils/request'

// 查询操作手册列表
export function listManual(query) {
  return request({
    url: '/product/manual/list',
    method: 'get',
    params: query
  })
}

// 查询操作手册列表，非分页
export function listManualNoPage(query) {
  return request({
    url: '/product/manual/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询操作手册详细
export function getManual(id) {
  return request({
    url: '/product/manual/' + id,
    method: 'get'
  })
}

// 新增操作手册
export function addManual(data) {
  return request({
    url: '/product/manual',
    method: 'post',
    data: data
  })
}

// 修改操作手册
export function updateManual(data) {
  return request({
    url: '/product/manual',
    method: 'put',
    data: data
  })
}

// 删除操作手册
export function delManual(id) {
  return request({
    url: '/product/manual/' + id,
    method: 'delete'
  })
}

// 导出操作手册
export function exportManual(query) {
  return request({
    url: '/product/manual/export',
    method: 'get',
    params: query
  })
}
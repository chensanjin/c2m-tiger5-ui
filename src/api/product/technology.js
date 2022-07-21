import request from '@/utils/request'

// 查询工艺管理列表
export function listTechnology(query) {
  return request({
    url: '/product/technology/list',
    method: 'get',
    params: query
  })
}

// 查询工艺管理列表，非分页
export function listTechnologyNoPage(query) {
  return request({
    url: '/product/technology/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询工艺管理详细
export function getTechnology(id) {
  return request({
    url: '/product/technology/' + id,
    method: 'get'
  })
}

// 新增工艺管理
export function addTechnology(data) {
  return request({
    url: '/product/technology',
    method: 'post',
    data: data
  })
}

// 修改工艺管理
export function updateTechnology(data) {
  return request({
    url: '/product/technology',
    method: 'put',
    data: data
  })
}

// 删除工艺管理
export function delTechnology(id) {
  return request({
    url: '/product/technology/' + id,
    method: 'delete'
  })
}

// 导出工艺管理
export function exportTechnology(query) {
  return request({
    url: '/product/technology/export',
    method: 'get',
    params: query
  })
}
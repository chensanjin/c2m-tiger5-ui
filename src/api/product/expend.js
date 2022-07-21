import request from '@/utils/request'

// 查询耗用比例列表
export function listExpend(query) {
  return request({
    url: '/product/expend/list',
    method: 'get',
    params: query
  })
}

// 查询耗用比例列表，非分页
export function listExpendNoPage(query) {
  return request({
    url: '/product/expend/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询耗用比例详细
export function getExpend(id) {
  return request({
    url: '/product/expend/' + id,
    method: 'get'
  })
}

// 新增耗用比例
export function addExpend(data) {
  return request({
    url: '/product/expend',
    method: 'post',
    data: data
  })
}

// 修改耗用比例
export function updateExpend(data) {
  return request({
    url: '/product/expend',
    method: 'put',
    data: data
  })
}

// 删除耗用比例
export function delExpend(id) {
  return request({
    url: '/product/expend/' + id,
    method: 'delete'
  })
}

// 导出耗用比例
export function exportExpend(query) {
  return request({
    url: '/product/expend/export',
    method: 'get',
    params: query
  })
}
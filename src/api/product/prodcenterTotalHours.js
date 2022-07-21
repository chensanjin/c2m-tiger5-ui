import request from '@/utils/request'

// 查询工时填报列表
export function listProdcenterTotalHours(query) {
  return request({
    url: '/product/prodcenterTotalHours/list',
    method: 'get',
    params: query
  })
}

// 查询工时填报列表，非分页
export function listProdcenterTotalHoursNoPage(query) {
  return request({
    url: '/product/prodcenterTotalHours/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询工时填报详细
export function getProdcenterTotalHours(id) {
  return request({
    url: '/product/prodcenterTotalHours/' + id,
    method: 'get'
  })
}

// 新增工时填报
export function addProdcenterTotalHours(data) {
  return request({
    url: '/product/prodcenterTotalHours',
    method: 'post',
    data: data
  })
}

// 修改工时填报
export function updateProdcenterTotalHours(data) {
  return request({
    url: '/product/prodcenterTotalHours',
    method: 'put',
    data: data
  })
}

// 删除工时填报
export function delProdcenterTotalHours(id) {
  return request({
    url: '/product/prodcenterTotalHours/' + id,
    method: 'delete'
  })
}

// 导出工时填报
export function exportProdcenterTotalHours(query) {
  return request({
    url: '/product/prodcenterTotalHours/export',
    method: 'get',
    params: query
  })
}
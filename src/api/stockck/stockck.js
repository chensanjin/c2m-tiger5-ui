import request from '@/utils/request'

// 查询单票历史列表
export function listStockck(query) {
  return request({
    url: '/stockck/stockck/list',
    method: 'get',
    params: query
  })
}

// 查询单票历史列表，非分页
export function listStockckNoPage(query) {
  return request({
    url: '/stockck/stockck/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询单票历史详细
export function getStockck(code) {
  return request({
    url: '/stockck/stockck/' + code,
    method: 'get'
  })
}

// 新增单票历史
export function addStockck(data) {
  return request({
    url: '/stockck/stockck',
    method: 'post',
    data: data
  })
}

// 修改单票历史
export function updateStockck(data) {
  return request({
    url: '/stockck/stockck',
    method: 'put',
    data: data
  })
}

// 删除单票历史
export function delStockck(code) {
  return request({
    url: '/stockck/stockck/' + code,
    method: 'delete'
  })
}

// 导出单票历史
export function exportStockck(query) {
  return request({
    url: '/stockck/stockck/export',
    method: 'get',
    params: query
  })
}
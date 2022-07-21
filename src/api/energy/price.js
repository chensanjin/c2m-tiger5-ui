import request from '@/utils/request'

// 查询能耗价格列表
export function listPrice(query) {
  return request({
    url: '/energy/price/list',
    method: 'get',
    params: query
  })
}

// 查询能耗价格列表，非分页
export function listPriceNoPage(query) {
  return request({
    url: '/energy/price/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询能耗价格详细
export function getPrice(id) {
  return request({
    url: '/energy/price/' + id,
    method: 'get'
  })
}

// 新增能耗价格
export function addPrice(data) {
  return request({
    url: '/energy/price',
    method: 'post',
    data: data
  })
}

// 修改能耗价格
export function updatePrice(data) {
  return request({
    url: '/energy/price',
    method: 'put',
    data: data
  })
}

// 删除能耗价格
export function delPrice(id) {
  return request({
    url: '/energy/price/' + id,
    method: 'delete'
  })
}

// 导出能耗价格
export function exportPrice(query) {
  return request({
    url: '/energy/price/export',
    method: 'get',
    params: query
  })
}
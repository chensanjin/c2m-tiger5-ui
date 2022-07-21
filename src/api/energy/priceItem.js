import request from '@/utils/request'

// 查询能耗价格谷峰平详情列表
export function listPriceItem(query) {
  return request({
    url: '/energy/priceItem/list',
    method: 'get',
    params: query
  })
}

// 查询能耗价格谷峰平详情列表，非分页
export function listPriceItemNoPage(query) {
  return request({
    url: '/energy/priceItem/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询能耗价格谷峰平详情详细
export function getPriceItem(id) {
  return request({
    url: '/energy/priceItem/' + id,
    method: 'get'
  })
}

// 新增能耗价格谷峰平详情
export function addPriceItem(data) {
  return request({
    url: '/energy/priceItem',
    method: 'post',
    data: data
  })
}

// 修改能耗价格谷峰平详情
export function updatePriceItem(data) {
  return request({
    url: '/energy/priceItem',
    method: 'put',
    data: data
  })
}

// 删除能耗价格谷峰平详情
export function delPriceItem(id) {
  return request({
    url: '/energy/priceItem/' + id,
    method: 'delete'
  })
}

// 导出能耗价格谷峰平详情
export function exportPriceItem(query) {
  return request({
    url: '/energy/priceItem/export',
    method: 'get',
    params: query
  })
}
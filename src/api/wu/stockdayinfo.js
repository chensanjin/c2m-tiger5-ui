import request from '@/utils/request'

// 查询技术历史列表
export function listStockdayinfo(query) {
  return request({
    url: '/wu/stockdayinfo/list',
    method: 'get',
    params: query
  })
}

// 查询技术历史列表，非分页
export function listStockdayinfoNoPage(query) {
  return request({
    url: '/wu/stockdayinfo/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询技术历史详细
export function getStockdayinfo(dayinfoid) {
  return request({
    url: '/wu/stockdayinfo/' + dayinfoid,
    method: 'get'
  })
}

// 新增技术历史
export function addStockdayinfo(data) {
  return request({
    url: '/wu/stockdayinfo',
    method: 'post',
    data: data
  })
}

// 修改技术历史
export function updateStockdayinfo(data) {
  return request({
    url: '/wu/stockdayinfo',
    method: 'put',
    data: data
  })
}

// 删除技术历史
export function delStockdayinfo(dayinfoid) {
  return request({
    url: '/wu/stockdayinfo/' + dayinfoid,
    method: 'delete'
  })
}

// 导出技术历史
export function exportStockdayinfo(query) {
  return request({
    url: '/wu/stockdayinfo/export',
    method: 'get',
    params: query
  })
}
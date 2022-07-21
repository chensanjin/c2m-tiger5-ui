import request from '@/utils/request'

// 查询计划详细列表
export function listProdPlanDetail(query) {
  return request({
    url: '/phygrid/prodPlanDetail/list',
    method: 'get',
    params: query
  })
}

// 查询计划详细列表，非分页
export function listProdPlanDetailNoPage(query) {
  return request({
    url: '/phygrid/prodPlanDetail/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询计划详细详细
export function getProdPlanDetail(id) {
  return request({
    url: '/phygrid/prodPlanDetail/' + id,
    method: 'get'
  })
}

// 新增计划详细
export function addProdPlanDetail(data) {
  return request({
    url: '/phygrid/prodPlanDetail',
    method: 'post',
    data: data
  })
}

// 修改计划详细
export function updateProdPlanDetail(data) {
  return request({
    url: '/phygrid/prodPlanDetail',
    method: 'put',
    data: data
  })
}

// 删除计划详细
export function delProdPlanDetail(id) {
  return request({
    url: '/phygrid/prodPlanDetail/' + id,
    method: 'delete'
  })
}

// 导出计划详细
export function exportProdPlanDetail(query) {
  return request({
    url: '/phygrid/prodPlanDetail/export',
    method: 'get',
    params: query
  })
}

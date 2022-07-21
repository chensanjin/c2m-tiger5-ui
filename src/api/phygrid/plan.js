import request from '@/utils/request'

// 查询生产计划主列表
export function listPlan(query) {
  return request({
    url: '/phygrid/plan/list',
    method: 'get',
    params: query
  })
}

// 查询生产计划主列表，非分页
export function listPlanNoPage(query) {
  return request({
    url: '/phygrid/plan/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询生产计划主详细
export function getPlan(id) {
  return request({
    url: '/phygrid/plan/' + id,
    method: 'get'
  })
}

// 新增生产计划主
export function addPlan(data) {
  return request({
    url: '/phygrid/plan',
    method: 'post',
    data: data
  })
}

// 修改生产计划主
export function updatePlan(data) {
  return request({
    url: '/phygrid/plan',
    method: 'put',
    data: data
  })
}

// 删除生产计划主
export function delPlan(id) {
  return request({
    url: '/phygrid/plan/' + id,
    method: 'delete'
  })
}

// 导出生产计划主
export function exportPlan(query) {
  return request({
    url: '/phygrid/plan/export',
    method: 'get',
    params: query
  })
}
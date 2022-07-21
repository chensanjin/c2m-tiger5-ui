import request from '@/utils/request'

// 查询车间管理列表
export function listWorkshop(query) {
  return request({
    url: '/phygrid/workshop/list',
    method: 'get',
    params: query
  })
}

// 查询车间管理列表，非分页
export function listWorkshopNoPage(query) {
  return request({
    url: '/phygrid/workshop/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询车间管理列表，非分页
export function listNoPageByCategory(query) {
  return request({
    url: '/phygrid/workshop/listNoPageByCategory',
    method: 'get',
    params: query
  })
}

// 查询车间管理详细
export function getWorkshop(id) {
  return request({
    url: '/phygrid/workshop/' + id,
    method: 'get'
  })
}

// 新增车间管理
export function addWorkshop(data) {
  return request({
    url: '/phygrid/workshop',
    method: 'post',
    data: data
  })
}

// 修改车间管理
export function updateWorkshop(data) {
  return request({
    url: '/phygrid/workshop',
    method: 'put',
    data: data
  })
}

// 删除车间管理
export function delWorkshop(id) {
  return request({
    url: '/phygrid/workshop/' + id,
    method: 'delete'
  })
}

// 导出车间管理
export function exportWorkshop(query) {
  return request({
    url: '/phygrid/workshop/export',
    method: 'get',
    params: query
  })
}

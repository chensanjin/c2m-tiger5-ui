import request from '@/utils/request'

// 查询环监达标检验项列表
export function listStandard(query) {
  return request({
    url: '/sense/standard/list',
    method: 'get',
    params: query
  })
}

// 查询环监达标检验项列表，非分页
export function listStandardNoPage(query) {
  return request({
    url: '/sense/standard/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询环监达标检验项详细
export function getStandard(id) {
  return request({
    url: '/sense/standard/' + id,
    method: 'get'
  })
}

// 新增环监达标检验项
export function addStandard(data) {
  return request({
    url: '/sense/standard',
    method: 'post',
    data: data
  })
}

// 修改环监达标检验项
export function updateStandard(data) {
  return request({
    url: '/sense/standard',
    method: 'put',
    data: data
  })
}

// 删除环监达标检验项
export function delStandard(id) {
  return request({
    url: '/sense/standard/' + id,
    method: 'delete'
  })
}

// 导出环监达标检验项
export function exportStandard(query) {
  return request({
    url: '/sense/standard/export',
    method: 'get',
    params: query
  })
}

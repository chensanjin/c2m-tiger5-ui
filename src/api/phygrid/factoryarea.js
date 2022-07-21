import request from '@/utils/request'

// 查询区域管理列表
export function listFactoryarea(query) {
  return request({
    url: '/phygrid/factoryarea/list',
    method: 'get',
    params: query
  })
}

// 查询区域管理列表，非分页
export function listFactoryareaNoPage(query) {
  return request({
    url: '/phygrid/factoryarea/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询区域管理详细
export function getFactoryarea(id) {
  return request({
    url: '/phygrid/factoryarea/' + id,
    method: 'get'
  })
}

// 新增区域管理
export function addFactoryarea(data) {
  return request({
    url: '/phygrid/factoryarea',
    method: 'post',
    data: data
  })
}

// 修改区域管理
export function updateFactoryarea(data) {
  return request({
    url: '/phygrid/factoryarea',
    method: 'put',
    data: data
  })
}

// 删除区域管理
export function delFactoryarea(id) {
  return request({
    url: '/phygrid/factoryarea/' + id,
    method: 'delete'
  })
}

// 导出区域管理
export function exportFactoryarea(query) {
  return request({
    url: '/phygrid/factoryarea/export',
    method: 'get',
    params: query
  })
}
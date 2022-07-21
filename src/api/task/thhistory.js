import request from '@/utils/request'

// 查询温湿度历史数据列表
export function listThhistory(query) {
  return request({
    url: '/sense/thhistory/list',
    method: 'get',
    params: query
  })
}

// 查询温湿度历史数据列表，非分页
export function listThhistoryNoPage(query) {
  return request({
    url: '/sense/thhistory/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询温湿度历史数据详细
export function getThhistory(id) {
  return request({
    url: '/sense/thhistory/' + id,
    method: 'get'
  })
}

// 新增温湿度历史数据
export function addThhistory(data) {
  return request({
    url: '/sense/thhistory',
    method: 'post',
    data: data
  })
}

// 修改温湿度历史数据
export function updateThhistory(data) {
  return request({
    url: '/sense/thhistory',
    method: 'put',
    data: data
  })
}

// 删除温湿度历史数据
export function delThhistory(id) {
  return request({
    url: '/sense/thhistory/' + id,
    method: 'delete'
  })
}

// 导出温湿度历史数据
export function exportThhistory(query) {
  return request({
    url: '/sense/thhistory/export',
    method: 'get',
    params: query
  })
}

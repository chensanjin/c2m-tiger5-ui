import request from '@/utils/request'

// 查询空气洁净度历史数据列表
export function listAirhistory(query) {
  return request({
    url: '/sense/airhistory/list',
    method: 'get',
    params: query
  })
}

// 查询空气洁净度历史数据列表，非分页
export function listAirhistoryNoPage(query) {
  return request({
    url: '/sense/airhistory/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询空气洁净度历史数据详细
export function getAirhistory(id) {
  return request({
    url: '/sense/airhistory/' + id,
    method: 'get'
  })
}

// 新增空气洁净度历史数据
export function addAirhistory(data) {
  return request({
    url: '/sense/airhistory',
    method: 'post',
    data: data
  })
}

// 修改空气洁净度历史数据
export function updateAirhistory(data) {
  return request({
    url: '/sense/airhistory',
    method: 'put',
    data: data
  })
}

// 删除空气洁净度历史数据
export function delAirhistory(id) {
  return request({
    url: '/sense/airhistory/' + id,
    method: 'delete'
  })
}

// 导出空气洁净度历史数据
export function exportAirhistory(query) {
  return request({
    url: '/sense/airhistory/export',
    method: 'get',
    params: query
  })
}

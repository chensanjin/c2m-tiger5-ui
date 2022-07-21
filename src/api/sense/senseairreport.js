import request from '@/utils/request'

// 查询空气洁净度设备手抄列表
export function listSenseairreport(query) {
  return request({
    url: '/v2/sense/airhistory/list',
    method: 'get',
    params: query
  })
}

// 查询空气洁净度设备手抄列表，非分页
export function listSenseairreportNoPage(query) {
  return request({
    url: '/v2/sense/airhistory/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询空气洁净度设备手抄详细
export function getSenseairreport(id) {
  return request({
    url: '/v2/sense/airhistory/' + id,
    method: 'get'
  })
}

// 新增空气洁净度设备手抄
export function addSenseairreport(data) {
  return request({
    url: '/v2/sense/airhistory',
    method: 'post',
    data: data
  })
}

// 修改空气洁净度设备手抄
export function updateSenseairreport(data) {
  return request({
    url: '/v2/sense/airhistory',
    method: 'put',
    data: data
  })
}

// 删除空气洁净度设备手抄
export function delSenseairreport(id) {
  return request({
    url: '/v2/sense/airhistory/' + id,
    method: 'delete'
  })
}

// 导出空气洁净度设备手抄
export function exportSenseairreport(query) {
  return request({
    url: '/v2/sense/airhistory/export',
    method: 'get',
    params: query
  })
}
import request from '@/utils/request'

// 查询温湿度设备手抄列表
export function listSensethreport(query) {
  return request({
    url: '/v2/sense/thhistory/list',
    method: 'get',
    params: query
  })
}

// 查询温湿度设备手抄列表，非分页
export function listSensethreportNoPage(query) {
  return request({
    url: '/v2/sense/thhistory/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询温湿度设备手抄详细
export function getSensethreport(id) {
  return request({
    url: '/v2/sense/thhistory/' + id,
    method: 'get'
  })
}

// 新增温湿度设备手抄
export function addSensethreport(data) {
  return request({
    url: '/v2/sense/thhistory',
    method: 'post',
    data: data
  })
}

// 修改温湿度设备手抄
export function updateSensethreport(data) {
  return request({
    url: '/v2/sense/thhistory',
    method: 'put',
    data: data
  })
}

// 删除温湿度设备手抄
export function delSensethreport(id) {
  return request({
    url: '/v2/sense/thhistory/' + id,
    method: 'delete'
  })
}

// 导出温湿度设备手抄
export function exportSensethreport(query) {
  return request({
    url: '/v2/sense/thhistory/export',
    method: 'get',
    params: query
  })
}
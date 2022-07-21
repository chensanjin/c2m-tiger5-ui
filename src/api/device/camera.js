import request from '@/utils/request'

// 查询监控设备列表
export function listCamera(query) {
  return request({
    url: '/device/camera/list',
    method: 'get',
    params: query
  })
}

// 查询监控设备列表，非分页
export function listCameraNoPage(query) {
  return request({
    url: '/device/camera/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询监控设备详细
export function getCamera(id) {
  return request({
    url: '/device/camera/' + id,
    method: 'get'
  })
}

// 新增监控设备
export function addCamera(data) {
  return request({
    url: '/device/camera',
    method: 'post',
    data: data
  })
}

// 修改监控设备
export function updateCamera(data) {
  return request({
    url: '/device/camera',
    method: 'put',
    data: data
  })
}

// 删除监控设备
export function delCamera(id) {
  return request({
    url: '/device/camera/' + id,
    method: 'delete'
  })
}

// 导出监控设备
export function exportCamera(query) {
  return request({
    url: '/device/camera/export',
    method: 'get',
    params: query
  })
}
//获取备选股票
export function getMonthValue3(query) {
  return request({
    url: '/api/stock/getMonthValue3',
    method: 'get',
    params: query
  })
}

//定时器列表
export function taskList(query) {
  return request({
    url: 'api/stock/taskList',
    method: 'get',
    params: query
  })
}

//执行定时器
export function executeTask(data) {
  return request({
    url: 'api/stock/executeTask',
    method: 'post',
    data: data
  })
}


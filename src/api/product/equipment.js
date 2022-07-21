import request from '@/utils/request'

// 查询生产设备列表
export function listEquipment(query) {
  return request({
    url: '/product/equipment/list',
    method: 'get',
    params: query
  })
}

// 查询生产设备列表，非分页
export function listEquipmentNoPage(query) {
  return request({
    url: '/product/equipment/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询生产设备详细
export function getEquipment(id) {
  return request({
    url: '/product/equipment/' + id,
    method: 'get'
  })
}

// 新增生产设备
export function addEquipment(data) {
  return request({
    url: '/product/equipment',
    method: 'post',
    data: data
  })
}

// 修改生产设备
export function updateEquipment(data) {
  return request({
    url: '/product/equipment',
    method: 'put',
    data: data
  })
}

// 删除生产设备
export function delEquipment(id) {
  return request({
    url: '/product/equipment/' + id,
    method: 'delete'
  })
}

// 导出生产设备
export function exportEquipment(query) {
  return request({
    url: '/product/equipment/export',
    method: 'get',
    params: query
  })
}

// 加载部门
export function loaddeptList(){
  return request({
    url:'/system/dept/listByCurrentFactory',
    method:'get'
  })
}

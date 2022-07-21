import request from '@/utils/request'

// 查询计量单位列表
export function listMeteringunit(query) {
  return request({
    url: '/material/meteringunit/list',
    method: 'get',
    params: query
  })
}

// 查询计量单位列表，非分页
export function listMeteringunitNoPage(query) {
  return request({
    url: '/material/meteringunit/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询计量单位详细
export function getMeteringunit(id) {
  return request({
    url: '/material/meteringunit/' + id,
    method: 'get'
  })
}

// 新增计量单位
export function addMeteringunit(data) {
  return request({
    url: '/material/meteringunit',
    method: 'post',
    data: data
  })
}

// 修改计量单位
export function updateMeteringunit(data) {
  return request({
    url: '/material/meteringunit',
    method: 'put',
    data: data
  })
}

// 删除计量单位
export function delMeteringunit(id) {
  return request({
    url: '/material/meteringunit/' + id,
    method: 'delete'
  })
}

// 导出计量单位
export function exportMeteringunit(query) {
  return request({
    url: '/material/meteringunit/export',
    method: 'get',
    params: query
  })
}
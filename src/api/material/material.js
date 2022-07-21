import request from '@/utils/request'

// 查询物料管理列表
export function listMaterial(query) {
  return request({
    url: '/material/material/list',
    method: 'get',
    params: query
  })
}

// 查询物料管理列表，非分页
export function listMaterialNoPage(query) {
  return request({
    url: '/material/material/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询物料管理详细
export function getMaterial(id) {
  return request({
    url: '/material/material/' + id,
    method: 'get'
  })
}

// 新增物料管理
export function addMaterial(data) {
  return request({
    url: '/material/material',
    method: 'post',
    data: data
  })
}

// 修改物料管理
export function updateMaterial(data) {
  return request({
    url: '/material/material',
    method: 'put',
    data: data
  })
}

// 删除物料管理
export function delMaterial(id) {
  return request({
    url: '/material/material/' + id,
    method: 'delete'
  })
}

// 导出物料管理
export function exportMaterial(query) {
  return request({
    url: '/material/material/export',
    method: 'get',
    params: query
  })
}
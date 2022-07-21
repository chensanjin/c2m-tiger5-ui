import request from '@/utils/request'

// 查询工序物料配比列表
export function listMaterialratio(query) {
  return request({
    url: '/material/materialratio/list',
    method: 'get',
    params: query
  })
}

// 查询工序物料配比列表，非分页
export function listMaterialratioNoPage(query) {
  return request({
    url: '/material/materialratio/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询工序物料配比详细
export function getMaterialratio(id) {
  return request({
    url: '/material/materialratio/' + id,
    method: 'get'
  })
}

// 新增工序物料配比
export function addMaterialratio(data) {
  return request({
    url: '/material/materialratio',
    method: 'post',
    data: data
  })
}

// 修改工序物料配比
export function updateMaterialratio(data) {
  return request({
    url: '/material/materialratio',
    method: 'put',
    data: data
  })
}

// 删除工序物料配比
export function delMaterialratio(id) {
  return request({
    url: '/material/materialratio/' + id,
    method: 'delete'
  })
}

// 导出工序物料配比
export function exportMaterialratio(query) {
  return request({
    url: '/material/materialratio/export',
    method: 'get',
    params: query
  })
}
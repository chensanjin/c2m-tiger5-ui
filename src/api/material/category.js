import request from '@/utils/request'

// 查询物料分类列表
export function listCategory(query) {
  return request({
    url: '/material/category/list',
    method: 'get',
    params: query
  })
}

// 查询物料分类列表，非分页
export function listCategoryNoPage(query) {
  return request({
    url: '/material/category/listNoPage',
    method: 'get',
    params: query
  })
}

export function treeselect(query) {
  return request({
    url: '/material/category/treeselect',
    method: 'get',
    params: query
  })
}
// 查询物料分类详细
export function getCategory(id) {
  return request({
    url: '/material/category/' + id,
    method: 'get'
  })
}

// 新增物料分类
export function addCategory(data) {
  return request({
    url: '/material/category',
    method: 'post',
    data: data
  })
}

// 修改物料分类
export function updateCategory(data) {
  return request({
    url: '/material/category',
    method: 'put',
    data: data
  })
}

// 删除物料分类
export function delCategory(id) {
  return request({
    url: '/material/category/' + id,
    method: 'delete'
  })
}

// 导出物料分类
export function exportCategory(query) {
  return request({
    url: '/material/category/export',
    method: 'get',
    params: query
  })
}

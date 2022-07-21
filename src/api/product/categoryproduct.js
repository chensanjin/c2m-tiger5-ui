import request from '@/utils/request'

// 查询产品管理列表
export function listCategoryproduct(query) {
  return request({
    url: '/product/categoryproduct/list',
    method: 'get',
    params: query
  })
}

// 查询产品管理列表，非分页
export function listCategoryproductNoPage(query) {
  return request({
    url: '/product/categoryproduct/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询产品管理详细
export function getCategoryproduct(id) {
  return request({
    url: '/product/categoryproduct/' + id,
    method: 'get'
  })
}

// 新增产品管理
export function addCategoryproduct(data) {
  return request({
    url: '/product/categoryproduct',
    method: 'post',
    data: data
  })
}

// 修改产品管理
export function updateCategoryproduct(data) {
  return request({
    url: '/product/categoryproduct',
    method: 'put',
    data: data
  })
}

// 删除产品管理
export function delCategoryproduct(id) {
  return request({
    url: '/product/categoryproduct/' + id,
    method: 'delete'
  })
}

// 导出产品管理
export function exportCategoryproduct(query) {
  return request({
    url: '/product/categoryproduct/export',
    method: 'get',
    params: query
  })
}

// 查询工序管理列表，非分页
export function listProdprocedure(query) {
  return request({
    url: '/product/procedure/listNoPage',
    method: 'get',
    params: query
  })
}

export function prodprocedureOptions(query) {
  return request({
    url: '/product/categoryproduct/prodprocedureOptions',
    method: 'get',
    params: query
  })
}

export function prodproceduresByProduct(id) {
  return request({
    url: '/product/categoryproduct/prodproceduresByProduct/'+id,
    method: 'get',
    // params: query
  })
}

import request from '@/utils/request'

// 查询品类管理列表
export function listCategory(query) {
  return request({
    url: '/product/category/list',
    method: 'get',
    params: query
  })
}

// 查询品类管理列表，非分页
export function listCategoryNoPage(query) {
  return request({
    url: '/product/category/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询品类管理详细
export function getCategory(id) {
  return request({
    url: '/product/category/' + id,
    method: 'get'
  })
}

// 新增品类管理
export function addCategory(data) {
  return request({
    url: '/product/category',
    method: 'post',
    data: data
  })
}

// 修改品类管理
export function updateCategory(data) {
  return request({
    url: '/product/category',
    method: 'put',
    data: data
  })
}

// 删除品类管理
export function delCategory(id) {
  return request({
    url: '/product/category/' + id,
    method: 'delete'
  })
}

// 导出品类管理
export function exportCategory(query) {
  return request({
    url: '/product/category/export',
    method: 'get',
    params: query
  })
}
export function loadTechnologyList(){
    return request({
      url: '/product/technology/listNoPage',
      method: 'get',
    })
}

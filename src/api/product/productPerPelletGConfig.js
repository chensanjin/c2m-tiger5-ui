import request from '@/utils/request'

// 查询每粒克重列表
export function listProductPerPelletGConfig(query) {
  return request({
    url: '/product/productPerPelletGConfig/list',
    method: 'get',
    params: query
  })
}

// 查询每粒克重列表，非分页
export function listProductPerPelletGConfigNoPage(query) {
  return request({
    url: '/product/productPerPelletGConfig/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询每粒克重详细
export function getProductPerPelletGConfig(id) {
  return request({
    url: '/product/productPerPelletGConfig/' + id,
    method: 'get'
  })
}

// 新增每粒克重
export function addProductPerPelletGConfig(data) {
  return request({
    url: '/product/productPerPelletGConfig',
    method: 'post',
    data: data
  })
}

// 修改每粒克重
export function updateProductPerPelletGConfig(data) {
  return request({
    url: '/product/productPerPelletGConfig',
    method: 'put',
    data: data
  })
}

// 删除每粒克重
export function delProductPerPelletGConfig(id) {
  return request({
    url: '/product/productPerPelletGConfig/' + id,
    method: 'delete'
  })
}

// 导出每粒克重
export function exportProductPerPelletGConfig(query) {
  return request({
    url: '/product/productPerPelletGConfig/export',
    method: 'get',
    params: query
  })
}
import request from '@/utils/request'

// 查询线体列表
export function listLine(query) {
  return request({
    url: '/product/line/list',
    method: 'get',
    params: query
  })
}

// 查询线体列表，非分页
export function listLineNoPage(query) {
  return request({
    url: '/product/line/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询线体详细
export function getLine(id) {
  return request({
    url: '/product/line/' + id,
    method: 'get'
  })
}

// 新增线体
export function addLine(data) {
  return request({
    url: '/product/line',
    method: 'post',
    data: data
  })
}

// 修改线体
export function updateLine(data) {
  return request({
    url: '/product/line',
    method: 'put',
    data: data
  })
}

// 删除线体
export function delLine(id) {
  return request({
    url: '/product/line/' + id,
    method: 'delete'
  })
}

// 导出线体
export function exportLine(query) {
  return request({
    url: '/product/line/export',
    method: 'get',
    params: query
  })
}

// 工序
export function getProProcedures(query) {
  return request({
    url: '/product/procedure/listNoPage',
    method: 'get',
    params: query
  })
}

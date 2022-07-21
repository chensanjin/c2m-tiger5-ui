import request from '@/utils/request'

// 查询工序管理列表
export function listProcedure(query) {
  return request({
    url: '/product/procedure/list',
    method: 'get',
    params: query
  })
}


export function listProcedure4Select() {
  return request({
    url: '/product/procedure/select4SelectOptions',
    method: 'get'
  })
}
// 查询工序管理列表，非分页
export function listProcedureNoPage(query) {
  return request({
    url: '/product/procedure/listNoPage',
    method: 'get',
    params: query
  })
}

export function listNoPageByLine(query) {
  return request({
    url: '/product/procedure/listNoPageByLine',
    method: 'get',
    params: query
  })
}

// 查询工序管理详细
export function getProcedure(id) {
  return request({
    url: '/product/procedure/' + id,
    method: 'get'
  })
}

// 新增工序管理
export function addProcedure(data) {
  return request({
    url: '/product/procedure',
    method: 'post',
    data: data
  })
}

// 修改工序管理
export function updateProcedure(data) {
  return request({
    url: '/product/procedure',
    method: 'put',
    data: data
  })
}

// 删除工序管理
export function delProcedure(id) {
  return request({
    url: '/product/procedure/' + id,
    method: 'delete'
  })
}

// 导出工序管理
export function exportProcedure(query) {
  return request({
    url: '/product/procedure/export',
    method: 'get',
    params: query
  })
}

import request from '@/utils/request'

// 查询每小时标准产出列表
export function listStdOutConfig(query) {
  return request({
    url: '/product/stdOutConfig/list',
    method: 'get',
    params: query
  })
}

// 查询每小时标准产出列表，非分页
export function listStdOutConfigNoPage(query) {
  return request({
    url: '/product/stdOutConfig/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询每小时标准产出详细
export function getStdOutConfig(id) {
  return request({
    url: '/product/stdOutConfig/' + id,
    method: 'get'
  })
}

// 新增每小时标准产出
export function addStdOutConfig(data) {
  return request({
    url: '/product/stdOutConfig',
    method: 'post',
    data: data
  })
}

// 修改每小时标准产出
export function updateStdOutConfig(data) {
  return request({
    url: '/product/stdOutConfig',
    method: 'put',
    data: data
  })
}

// 删除每小时标准产出
export function delStdOutConfig(id) {
  return request({
    url: '/product/stdOutConfig/' + id,
    method: 'delete'
  })
}

// 导出每小时标准产出
export function exportStdOutConfig(query) {
  return request({
    url: '/product/stdOutConfig/export',
    method: 'get',
    params: query
  })
}
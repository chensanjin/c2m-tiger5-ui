import request from '@/utils/request'

// 查询rank票列表
export function getEcharts(query) {
  return request({
    url: '/selectedrank/sam/getEcharts',
    method: 'get',
    params: query
  })
}

export function getEcharts2(query) {
  return request({
    url: '/selectedrank/sam/getEcharts2',
    method: 'get',
    params: query
  })
}

export function getEcharts99(query) {
  return request({
    url: '/selectedrank/sam/getEcharts99',
    method: 'get',
    params: query
  })
}

// 查询rank票列表
export function listSam(query) {
  return request({
    url: '/selectedrank/sam/list',
    method: 'get',
    params: query
  })
}

// 查询rank票列表，非分页
export function listSamNoPage(query) {
  return request({
    url: '/selectedrank/sam/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询rank票详细
export function getSam(id) {
  return request({
    url: '/selectedrank/sam/' + id,
    method: 'get'
  })
}

// 新增rank票
export function addSam(data) {
  return request({
    url: '/selectedrank/sam',
    method: 'post',
    data: data
  })
}

// 修改rank票
export function updateSam(data) {
  return request({
    url: '/selectedrank/sam',
    method: 'put',
    data: data
  })
}

// 删除rank票
export function delSam(id) {
  return request({
    url: '/selectedrank/sam/' + id,
    method: 'delete'
  })
}

// 导出rank票
export function exportSam(query) {
  return request({
    url: '/selectedrank/sam/export',
    method: 'get',
    params: query
  })
}

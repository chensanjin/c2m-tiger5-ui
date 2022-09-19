import request from '@/utils/request'

// 查询技术现状列表
export function listEchnicalaspect(query) {
  return request({
    url: '/wu/echnicalaspect/list',
    method: 'get',
    params: query
  })
}

// 查询技术现状列表，非分页
export function listEchnicalaspectNoPage(query) {
  return request({
    url: '/wu/echnicalaspect/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询技术现状详细
export function getEchnicalaspect(echnicalaspectid) {
  return request({
    url: '/wu/echnicalaspect/' + echnicalaspectid,
    method: 'get'
  })
}

// 新增技术现状
export function addEchnicalaspect(data) {
  return request({
    url: '/wu/echnicalaspect',
    method: 'post',
    data: data
  })
}

// 修改技术现状
export function updateEchnicalaspect(data) {
  return request({
    url: '/wu/echnicalaspect',
    method: 'put',
    data: data
  })
}

// 删除技术现状
export function delEchnicalaspect(echnicalaspectid) {
  return request({
    url: '/wu/echnicalaspect/' + echnicalaspectid,
    method: 'delete'
  })
}

// 导出技术现状
export function exportEchnicalaspect(query) {
  return request({
    url: '/wu/echnicalaspect/export',
    method: 'get',
    params: query
  })
}
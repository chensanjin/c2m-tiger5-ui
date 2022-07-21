import request from '@/utils/request'
import request2 from '@/utils/request2'

// 查询电表管理列表
export function listElectric(query) {
  return request({
    url: '/device/electric/list',
    method: 'get',
    params: query
  })
}

// 查询电表管理列表，非分页
export function listElectricNoPage(query) {
  return request({
    url: '/device/electric/listNoPage',
    method: 'get',
    params: query
  })
}

// 查询电表管理详细
export function getElectric(id) {
  return request({
    url: '/device/electric/' + id,
    method: 'get'
  })
}

// 新增电表管理
export function addElectric(data) {
  return request({
    url: '/device/electric',
    method: 'post',
    data: data
  })
}

// 修改电表管理
export function updateElectric(data) {
  return request({
    url: '/device/electric',
    method: 'put',
    data: data
  })
}

// 删除电表管理
export function delElectric(id) {
  return request({
    url: '/device/electric/' + id,
    method: 'delete'
  })
}

// 导出电表管理
export function exportElectric(query) {
  return request({
    url: '/device/electric/export',
    method: 'get',
    params: query
  })
}

export function loaddeptList(){
  return request({
    url:'/system/dept/listByCurrentFactory',
    method:'get'
  })
}

export function datacoller(data){
  return request({
  //return request2({
    //url:'/c2m/api/v2/datacoller/upload',
    url:'/api3D/go/v1/influxDB/upload',
    method:'post',
    data: data
  })
}

export function getSN(){
  return request({
    url:'/device/electric/sn',
    method:'get'
  })
}

export function handleRedis(){
  return request({
    url:'/device/electric/updateRedis',
    method:'put'
  })
}



import request from '@/utils/request'


export function listData(query) {
  return request({
    url: '/enviroment/statistics/list',
    method: 'get',
    params: query
  })
}

export function getHead() {
  return request({
    url: '/enviroment/statistics/getHead',
    method: 'get'
  })

}

export function getHeadLists(workshopIds) {
  return request({
    url: '/enviroment/statistics/v2/getHead',
    method: 'get',
    params:{workshopIds : workshopIds}
  })
}

export function getLists(startTime,endTime,workshopIds) {
  return request({
    url: '/enviroment/statistics/v2/list',
    method: 'get',
    params: {startTime,endTime,workshopIds}
  })
}



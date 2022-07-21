import request from '@/utils/request'

// 查询传感设备管理列表
export function getChatsData(senseCode) {
  return request({
    url: '/sense/cycleconfig/history/'+senseCode,
    method: 'get'
  })
}

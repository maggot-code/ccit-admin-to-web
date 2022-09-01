import request from '@/utils/request'

// 获取待办
export function getTaskList(data) {
  return request({
    url: '/api/task/agency/getTaskList',
    method: 'GET',
    data
  })
}

// 获取已办
export function getCompleteList(data) {
  return request({
    url: '/api/task/agency/getCompleteTaskList',
    method: 'GET',
    data
  })
}

// 查询待办数量
export function getTaskListNum(data) {
  return request({
    url: '/api/task/uniontask/task/getTaskListNum',
    method: 'POST',
    data
  })
}
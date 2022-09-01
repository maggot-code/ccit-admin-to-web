import request from '@/utils/request'
// 获取接口数据
export function getInterfaceData(id) {
  return request({
    url: `/api/system/Base/DataInterface/${id}/Actions/Response`,
    method: 'GET'
  })
}

// 获取我的待办
export function getFlowTodoCount() {
  return request({
    url: '/api/visualdev/Dashboard/FlowTodoCount',
    method: 'get'
  })
}
// 获取通知公告
export function getNotice() {
  return request({
    url: '/api/visualdev/Dashboard/Notice',
    method: 'get'
  })
}
// 获取未读邮件
export function getEmail() {
  return request({
    url: '/api/visualdev/Dashboard/Email',
    method: 'get'
  })
}
// 获取待办事项
export function getFlowTodo(data) {
  return request({
    url: `/api/workflow/Engine/FlowBefore/List/1`,
    method: 'get',
    data
  })
}
// 获取我的待办事项
export function getMyFlowTodo() {
  return request({
    url: '/api/visualdev/Dashboard/MyFlowTodo',
    method: 'get'
  })
}

export function getWeather(data) {
  return request({
    url: 'https://devapi.qweather.com/v7/weather/3d',
    method: 'get',
    data
  })
}

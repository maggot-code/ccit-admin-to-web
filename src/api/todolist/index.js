import request from '@/utils/request'
// 获取用户信息的接口
export function getUser(data) {
  return request({
    url: '/api/sso/oam/getLoginUser',
    method: 'get',
    hedercookie: data.cookie
  })
}
//获取用户信息的接口

// 获取cookie
export function getMyToDoList(data) {
  return request({
    url: `/api/sso/sso/getOamCookieValue/${data.userId}`,
    method: 'get',
  })
}
// 获取cookie

// 获取待办列表 http://localhost:30100/oam/getTaskList?num=9&state=0&userCn=portal&appId=oaid
export function getMyToDoList2(data) {
  return request({
    url: `/api/sso/oam/getTaskList?num=${data.size}&state=${data.state}&userCn=${data.portal}&appId=${data.appId}`,
    method: 'get',
    hedercookie: data.cookie
  })
}
// 获取待办列表

//获取待学习表数据  http://localhost:30100/oam/getLearnList?page=1&sysId=oaid&taskName&pageSize=7&state=0&userCn=portal&typeId=jtcyjgl
export function toBeLearn(data) {
  return request({
    url: `/api/sso/oam/getLearnList?page=1&sysId=oaid&taskName&pageSize=${data.size}&state=${data.state}&userCn=${data.portal}&typeId=jtcyjgl`,
    method: 'get',
    hedercookie: data.cookie
  })
}
//获取待学习表数据

//会议事项待办数据  http://localhost:30100/oam/getMeetList?page=1&sysId=oaid&taskName=&pageSize=9&state=4&userCn=portal&typeId=dyzmxxhytz
export function toBeMatter(data) {
  return request({
    url: `/api/sso/oam/getMeetList?page=1&sysId=oaid&taskName=&pageSize=${data.size}&state=${data.state}&userCn=${data.portal}&typeId=dyzmxxhytz`,
    method: 'get',
    hedercookie: data.cookie
  })
}
//会议待办数据


//获取待阅表数据 http://localhost:30100/oam/getUnionReadList?page=1&sysId=oaid&taskName&pageSize=9&state=4&userCn=portal
export function toBeRead(data) {
  return request({
    url: `/api/sso/oam/getUnionReadList?page=1&sysId=oaid&taskName&pageSize=${data.size}&state=${data.state}&userCn=${data.portal}`,
    // url: `/api/sso/oam/getUnionReadList?page=1&sysId=oaid&taskName&pageSize=${data.size}&state=${data.state}&userCn=1000412`,
    method: 'get',
    hedercookie: data.cookie
  })
}
//获取待阅表数据


//获取邮件的数据  http://localhost:30100/oam/getTaskOAMailList/portal/10/1
export function toBeMaill(data) {
  return request({
    url: `/api/sso/oam/getTaskOAMailList/${data.portal}/${data.size}/1`,
    // url: `/api/sso/oam/getTaskOAMailList/portal/${data.size}/1`,
    method: 'get',
    hedercookie: data.cookie
  })
}

//获取邮件的数据


// 待阅读已读接口 http://localhost:30100/oam/batchUpdateReadState
export function batchUpdateReadState(data, cookie) {
  return request({
    url: '/api/sso/oam/batchUpdateReadState',
    method: 'post',
    hederOAcookie: cookie,
    data
  })
}
// 待阅读已读接口


// 邮件已阅（全部） http://localhost:30100/oam/batchReadMail
export function batchReadMail(data, cookie) {
  return request({
    url: '/api/sso/oam/batchReadMail',
    method: 'post',
    hedercookie: cookie,
    data
  })
}
// 邮件已阅（全部） 


